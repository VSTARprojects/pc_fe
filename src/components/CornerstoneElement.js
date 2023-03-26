import React from "react";
import { render } from "react-dom";
import * as cornerstone from "cornerstone-core";
import * as cornerstoneMath from "cornerstone-math";
import * as cornerstoneTools from "cornerstone-tools";
import Hammer from "hammerjs";
import * as cornerstoneWebImageLoader from "cornerstone-web-image-loader";

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

class CornerstoneElement extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stack: props.stack,
      viewport: cornerstone.getDefaultViewport(null, undefined),
      imageId: props.stack.imageIds[0],
      toolStack: []
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

    if(lastTool == "wwwc") {
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

  render() {
    return (
      <div>
        <div
          className="viewportElement"
          style={divStyle}
          ref={input => {
            this.element = input;
          }}
        >
          <canvas className="cornerstone-canvas" />
          <div style={bottomLeftStyle}>Zoom: {this.state.viewport.scale}</div>
          <div style={bottomRightStyle}>
            WW/WC: {this.state.viewport.voi.windowWidth} /{" "}
            {this.state.viewport.voi.windowCenter}
          </div>
        </div>
        <button
          onClick={() => {
            this.enableTool("wwwc", 1);
          }}
          className="list-group-item"
        >
          WW/WC
        </button>
        <button
          onClick={() => {
            this.enableTool("pan", 3);
          }}
          className="list-group-item"
        >
          Pan
        </button>
        <button
          onClick={() => {
            this.enableTool("zoom", 5);
          }}
          className="list-group-item"
        >
          Zoom
        </button>
        <button
          onClick={() => {
            this.enableTool("probe", 1);
          }}
          className="list-group-item"
        >
          Probe
        </button>
        <button
          onClick={() => {
            this.enableTool("ellipticalRoi", 1);
          }}
          className="list-group-item"
        >
          Elliptical ROI
        </button>
        <button
          onClick={() => {
            this.enableTool("rectangleRoi", 1);
          }}
          className="list-group-item"
        >
          Rectangle ROI
        </button>
        <button
          onClick={() => {
            this.enableTool("angle", 1);
          }}
          className="list-group-item"
        >
          Angle
        </button>
        <button
          onClick={() => {
            this.enableTool("highlight", 1);
          }}
          className="list-group-item"
        >
          Highlight
        </button>
        <button
          onClick={() => {
            this.enableTool("freehand", 1);
          }}
          className="list-group-item"
        >
          Freeform ROI
        </button>
        <button
          onClick={() => {
            this.undo()
          }}
          className="list-group-item"
        >
          undo
        </button>
        <button
          onClick={() => {
            this.redo()
          }}
          className="list-group-item"
        >
          Reset
        </button>
      </div>
    );
  }

  onWindowResize() {
    cornerstone.resize(this.element);
  }

  onImageRendered() {
    const viewport = cornerstone.getViewport(this.element);
   
    this.setState({
      viewport
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
    const stack = stackData.data[0];
    stack.currentImageIdIndex = this.state.stack.currentImageIdIndex;
    stack.imageIds = this.state.stack.imageIds;
    cornerstoneTools.addToolState(this.element, "stack", stack);

    //const imageId = stack.imageIds[stack.currentImageIdIndex];
    //cornerstoneTools.scrollToIndex(this.element, stack.currentImageIdIndex);
  }
}

export default CornerstoneElement;