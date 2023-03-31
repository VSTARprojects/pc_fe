import React from "react";
import * as cornerstone from "cornerstone-core";
import * as cornerstoneMath from "cornerstone-math";
import * as cornerstoneTools from "cornerstone-tools";
import Hammer from "hammerjs";
import * as cornerstoneWebImageLoader from "cornerstone-web-image-loader";
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import { Grid, TextField } from "@mui/material";
import ContrastIcon from '@mui/icons-material/Contrast';
import PanToolIcon from '@mui/icons-material/PanTool';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import GpsFixedIcon from '@mui/icons-material/GpsFixed';
import PanoramaFishEyeIcon from '@mui/icons-material/PanoramaFishEye';
import CropDinIcon from '@mui/icons-material/CropDin';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import GestureIcon from '@mui/icons-material/Gesture';
import UndoIcon from '@mui/icons-material/Undo';
import ReplayIcon from '@mui/icons-material/Replay';
import Tooltip from '@mui/material/Tooltip';
import StraightenIcon from '@mui/icons-material/Straighten';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import SaveAsModal from "./SaveAsModal";
import SampleService from "../services/SampleService";


cornerstoneTools.external.cornerstone = cornerstone;
cornerstoneTools.external.cornerstoneMath = cornerstoneMath;
cornerstoneWebImageLoader.external.cornerstone = cornerstone;
cornerstoneTools.external.Hammer = Hammer;

const divStyle = {
  width: "512px",
  height: "512px",
  position: "relative",
  color: "white"
};

const bottomLeftStyle = {
  bottom: "5px",
  left: "5px",
  position: "absolute",
  color: "white"
};

const bottomRightStyle = {
  bottom: "5px",
  right: "5px",
  position: "absolute",
  color: "white"
};

const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

class CornerstoneElement extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stack: props.stack,
      viewport: cornerstone.getDefaultViewport(null, undefined),
      imageId: props.stack.imageIds[0],
      toolStack: [],
      modalOpen: false,
      fileName: '',
      toolData: {},
    };

    this.onImageRendered = this.onImageRendered.bind(this);
    this.onNewImage = this.onNewImage.bind(this);
    this.onWindowResize = this.onWindowResize.bind(this);
  }

  enableTool = (toolName, mouseButtonNumber) => {
    this.disableAllTools();
    cornerstoneTools[toolName].activate(this.element, mouseButtonNumber);

    const toolStack = [...this.state.toolStack, toolName];
    this.setState({toolStack})
  };
  // helper function used by the tool button handlers to disable the active tool
  // before making a new tool active
  disableAllTools = () => {
    cornerstoneTools.wwwc.disable(this.element);
    cornerstoneTools.pan.activate(this.element, 2); // 2 is middle mouse button
    cornerstoneTools.zoom.activate(this.element, 4); // 4 is right mouse button
    cornerstoneTools.probe.deactivate(this.element, 1);
    cornerstoneTools.length.deactivate(this.element, 1);
    cornerstoneTools.ellipticalRoi.deactivate(this.element, 1);
    cornerstoneTools.rectangleRoi.deactivate(this.element, 1);
    cornerstoneTools.angle.deactivate(this.element, 1);
    cornerstoneTools.highlight.deactivate(this.element, 1);
    cornerstoneTools.freehand.deactivate(this.element, 1);
  };

  undo = () => {
    //TODO: @khssupriya very bad logic, please get back
    const toolStack = this.state.toolStack
    const lastTool = toolStack.pop()
    cornerstoneTools.clearToolState(this.element, lastTool);
    this.disableAllTools();
    this.setState({toolStack})

    if(lastTool === "wwwc") {
      cornerstone.reset(this.element);
    }
  }

  redo = () => {
    cornerstoneTools.clearToolState(this.element, "probe");
    cornerstoneTools.clearToolState(this.element, "length");
    cornerstoneTools.clearToolState(this.element, "ellipticalRoi");
    cornerstoneTools.clearToolState(this.element, "rectangleRoi");
    cornerstoneTools.clearToolState(this.element, "angle");
    cornerstoneTools.clearToolState(this.element, "highlight");
    cornerstoneTools.clearToolState(this.element, "freehand");
    this.disableAllTools();
    cornerstone.reset(this.element);
  }

  save = () => {    
    const modalOpen = true;
    this.setState({modalOpen});
  }

  modalOnSave = (fileName) => {
    // this.setState({fileName: fileName, modalOpen: false});

    var allToolData = {};
    var toolTypes = ['probe', 'ellipticalRoi', 'rectangleRoi', 'highlight', 'freehand' ,'length', 'angle'];
    for (var i = 0; i < toolTypes.length; i++) {
        var toolType = toolTypes[i];
        var toolData = cornerstoneTools.getToolState(this.element, toolType);
        if (toolData !== undefined) {
            allToolData[toolTypes[i]] = toolData;
        }
    }
    const viewport = cornerstone.getViewport(this.element);

    const annot = {fileName: fileName, toolData: allToolData, viewport: viewport}
    this.props.setAnnotations(annot);

    this.setState({modalOpen: false})
  }

 
  render() {
    return (
      <div>
        <Grid container >
            <Grid item xs={1} sx={{m:1}}>
                <Paper sx={{ width: '50px', maxWidth: '100%' }}>
                    <MenuList>
                        <Tooltip title='WW/WC' placement="left-start">
                            <MenuItem onClick={() => {this.enableTool("wwwc", 1);}}>
                                <ListItemIcon >
                                    <ContrastIcon fontSize="small" />
                                </ListItemIcon>
                                {/* <ListItemText>WW/WC</ListItemText> */}
                            </MenuItem>
                        </Tooltip>
                        
                        <Tooltip title='Pan' placement="left-start">
                            <MenuItem onClick={() => {this.enableTool("pan", 3);}}>
                                <ListItemIcon>
                                    <PanToolIcon fontSize="small" />
                                </ListItemIcon>
                                {/* <ListItemText>Pan</ListItemText> */}
                            </MenuItem>
                        </Tooltip>
                        
                        <Tooltip title='Zoom' placement="left-start">
                            <MenuItem onClick={() => {this.enableTool("zoom", 5);}}>
                                <ListItemIcon>
                                    <ZoomInIcon fontSize="small" />
                                </ListItemIcon>
                                {/* <ListItemText>Zoom</ListItemText> */}
                            </MenuItem>
                        </Tooltip>
                        
                        <Tooltip title='Probe' placement="left-start">
                            <MenuItem onClick={() => {this.enableTool("probe", 1);}}>
                                <ListItemIcon>
                                    <GpsFixedIcon fontSize="small" />
                                </ListItemIcon>
                                {/* <ListItemText>Probe</ListItemText> */}
                            </MenuItem>
                        </Tooltip>

                        <Tooltip title='Length' placement="left-start">
                            <MenuItem onClick={() => {this.enableTool("length", 1);}}>
                                <ListItemIcon>
                                    <StraightenIcon fontSize="small" />
                                </ListItemIcon>
                                {/* <ListItemText>Probe</ListItemText> */}
                            </MenuItem>
                        </Tooltip>
                        
                        <Tooltip title='Elliptical ROI' placement="left-start">
                            <MenuItem onClick={() => {this.enableTool("ellipticalRoi", 1);}}>
                                <ListItemIcon>
                                    <PanoramaFishEyeIcon fontSize="small" />
                                </ListItemIcon>
                                {/* <ListItemText>Elliptical ROI</ListItemText> */}
                            </MenuItem>
                        </Tooltip>
                        
                        <Tooltip title='Rectangle ROI' placement="left-start">
                            <MenuItem onClick={() => {this.enableTool("rectangleRoi", 1);}}>
                                <ListItemIcon>
                                    <CropDinIcon fontSize="small" />
                                </ListItemIcon>
                                {/* <ListItemText>Rectangle ROI</ListItemText> */}
                            </MenuItem>
                        </Tooltip>
                        
                        <Tooltip title='Angle' placement="left-start">
                            <MenuItem onClick={() => {this.enableTool("angle", 1);}}>
                                <ListItemIcon>
                                    <ChevronLeftIcon fontSize="small" />
                                </ListItemIcon>
                                {/* <ListItemText>Angle</ListItemText> */}
                            </MenuItem>
                        </Tooltip>

                        <Tooltip title='Highlight' placement="left-start">
                            <MenuItem onClick={() => {this.enableTool("highlight", 1);}}>
                                <ListItemIcon>
                                    <AutoFixHighIcon fontSize="small" />
                                </ListItemIcon>
                                {/* <ListItemText>Highlight</ListItemText> */}
                            </MenuItem>
                        </Tooltip>
                        
                        <Tooltip title='Freeform ROI' placement="left-start">
                            <MenuItem onClick={() => {this.enableTool("freehand", 1);}}>
                                <ListItemIcon>
                                    <GestureIcon fontSize="small" />
                                </ListItemIcon>
                                {/* <ListItemText>Freeform ROI</ListItemText> */}
                            </MenuItem>
                        </Tooltip>
                        
                        <Divider />
                        <Tooltip title='Undo' placement="left-start">
                            <MenuItem onClick={() => {this.undo();}}>
                                <ListItemIcon>
                                    <UndoIcon fontSize="small" />
                                </ListItemIcon>
                                {/* <ListItemText>Undo</ListItemText> */}
                            </MenuItem>
                        </Tooltip>
                        
                        <Tooltip title='Reset' placement="left-start">
                            <MenuItem onClick={() => {this.redo();}}>
                                <ListItemIcon>
                                    <ReplayIcon fontSize="small" />
                                </ListItemIcon>
                                {/* <ListItemText>Reset</ListItemText> */}
                            </MenuItem>
                        </Tooltip>

                        <Tooltip title='Save' placement="left-start">
                            <MenuItem onClick={() => {this.save();}}>
                                <ListItemIcon>
                                    <SaveAltIcon fontSize="small" />
                                </ListItemIcon>
                                {/* <ListItemText>Reset</ListItemText> */}
                            </MenuItem>
                        </Tooltip>
                    </MenuList>
                </Paper>
            </Grid>
            <Grid item xs={8}>
                <div
                    className="viewportElement"
                    style={divStyle}
                    ref={input => {
                        this.element = input;
                    }}
                    >
                    <canvas className="cornerstone-canvas"/>
                    <div style={bottomLeftStyle}>Zoom: {this.state.viewport.scale}</div>
                    <div style={bottomRightStyle}>
                        WW/WC: {this.state.viewport.voi.windowWidth} /{" "}
                        {this.state.viewport.voi.windowCenter}
                    </div>
                </div>
            </Grid>
        </Grid>
        <SaveAsModal open={this.state.modalOpen} onSave={(fileName) => {this.modalOnSave(fileName)}} onCancel={() => {this.setState({modalOpen: false})}}/>
      </div>
    );
  }

  onWindowResize() {
    cornerstone.resize(this.element);
  }

  onImageRendered() {
    const viewportt = cornerstone.getViewport(this.element);
    this.setState({
      viewportt
    });    
  }

  onNewImage() {
    const enabledElement = cornerstone.getEnabledElement(this.element);
    this.setState({
      imageId: enabledElement.image.imageId
    });    
  }

  componentDidMount() {
    const element = this.element;

    // Enable the DOM Element for use with Cornerstone
    cornerstone.enable(element);

    // Load the first image in the stack
    cornerstone.loadImage(this.state.imageId).then(image => {
      // Display the first image
      cornerstone.displayImage(element, image);

      // Add the stack tool state to the enabled element
      const stack = this.props.stack;
      cornerstoneTools.addStackStateManager(element, ["stack"]);
      cornerstoneTools.addToolState(element, "stack", stack);

      cornerstoneTools.mouseInput.enable(element);
      cornerstoneTools.mouseWheelInput.enable(element);
      cornerstoneTools.wwwc.activate(element, 1); // ww/wc is the default tool for left mouse button
      cornerstoneTools.pan.activate(element, 2); // pan is the default tool for middle mouse button
      cornerstoneTools.zoom.activate(element, 4); // zoom is the default tool for right mouse button
      cornerstoneTools.zoomWheel.activate(element); // zoom is the default tool for middle mouse wheel
      
      cornerstoneTools.touchInput.enable(element);
      cornerstoneTools.panTouchDrag.activate(element);
      cornerstoneTools.zoomTouchPinch.activate(element);

      cornerstoneTools.probe.enable(element);
      cornerstoneTools.length.enable(element);
      cornerstoneTools.ellipticalRoi.enable(element);
      cornerstoneTools.rectangleRoi.enable(element);
      cornerstoneTools.angle.enable(element);
      cornerstoneTools.highlight.enable(element);

      element.addEventListener(
        "cornerstoneimagerendered",
        this.onImageRendered
      );
      element.addEventListener("cornerstonenewimage", this.onNewImage);
      window.addEventListener("resize", this.onWindowResize);    
    });
  }

  componentWillUnmount() {
    const element = this.element;
    element.removeEventListener(
      "cornerstoneimagerendered",
      this.onImageRendered
    );

    element.removeEventListener("cornerstonenewimage", this.onNewImage);

    window.removeEventListener("resize", this.onWindowResize);

    cornerstone.disable(element);
  }

  componentDidUpdate(prevProps, prevState) {
    const stackData = cornerstoneTools.getToolState(this.element, "stack");
    if(stackData) {
        const stack = stackData.data[0];
        stack.currentImageIdIndex = this.state.stack.currentImageIdIndex;
        stack.imageIds = this.state.stack.imageIds;
        cornerstoneTools.addToolState(this.element, "stack", stack);
    }

    
    

    //const imageId = stack.imageIds[stack.currentImageIdIndex];
    //cornerstoneTools.scrollToIndex(this.element, stack.currentImageIdIndex);
  }

  componentWillReceiveProps(nextProps) {
    this.setState(nextProps, () => {
        const receivedAnnotations = this.props.annotations
        console.log("received", receivedAnnotations)
        if(receivedAnnotations) {
            // this.redo()           
    
            const toolData = receivedAnnotations["toolData"]
            const viewport = receivedAnnotations["viewport"]
    
            if(toolData) {
                var allToolData = toolData;
                for (var toolType in allToolData) {
                    if (allToolData.hasOwnProperty(toolType)) {
                        for (var i = 0; i < allToolData[toolType].data.length; i++) {
                            var tData = allToolData[toolType].data[i];
                            cornerstoneTools.addToolState(this.element, toolType, tData);
                        }
                    }
                }
                cornerstone.updateImage(this.element);
                // this.setState({toolData: toolData})
                console.log(toolData)
            }
    
            if(viewport) {
                cornerstone.setViewport(this.element, viewport);
                cornerstone.updateImage(this.element);
                this.setState({viewport: viewport})
            }

            
        }
    })
    return nextProps
  }
  
}

export default CornerstoneElement;