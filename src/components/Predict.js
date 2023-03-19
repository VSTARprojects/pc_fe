import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {Grid, Button, Box} from "@material-ui/core";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import CircularProgress from "@material-ui/core/CircularProgress";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import SampleService from "../services/SampleService";

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
  input: {
    display: "none",
  },
  previewContainer: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    margin: "20px 0",
  },
  previewItem: {
    position: "relative",
    width: "100%",
    maxWidth: "200px",
    margin: "10px",
    textAlign: "center",
  },
  previewImage: {
    width: "100%",
    height: "auto",
  },
  removeButton: {
    position: "absolute",
    top: 0,
    right: 0,
  },
}));

export default function Predict() {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const [files, setFiles] = useState([]);
  const [labels, setLabels] = useState([]);

  useEffect(() => {
    if (loading) {
      const timeoutId = setTimeout(() => {
        // simulate label prediction delay
        const predictedLabels = files.map((file, index) => "pending");
        setLabels(predictedLabels);
        setLoading(false);
      }, 2000);
      return () => clearTimeout(timeoutId);
    }
  }, [loading, files]);

  const handleFileUpload = (event) => {
    const uploadedFiles = Array.from(event.target.files);
    setFiles((prevFiles) => [...prevFiles, ...uploadedFiles]);
    setLabels((prevLabels) => [...prevLabels, ...Array(uploadedFiles.length).fill("pending")])
  };

  const handleRemoveFile = (fileIndex) => {
    const updatedFiles = [...files];
    updatedFiles.splice(fileIndex, 1);
    setFiles(updatedFiles);
    setLabels((prevLabels) => {
      const updatedLabels = [...prevLabels];
      updatedLabels.splice(fileIndex, "1");
      return updatedLabels;
    });
  };

  const handleLabelPredict = () => {
    setLoading(true);
    files.forEach((file, index) => {
        SampleService.predict(file).then(
            (response) => {
                if(index == files.length - 1) {
                    setLoading(false)
                }
                const newLabel = response.data.predictedLabel
                setLabels((prevLabels) => {
                    var updatedLabels = [...prevLabels]
                    updatedLabels[index] = newLabel
                    return updatedLabels
                })
            }
        ).catch((error) => {
            alert("Something went wrong while predicting")
            console.log(error)
        })
    })
    
  };

  return (
    <Box sx={{m:5}}>
       <Grid container justifyContent='center'>
        <input
          accept="image/*"
          className={classes.input}
          id="contained-button-file"
          multiple
          type="file"
          onChange={handleFileUpload}
        />
        <label htmlFor="contained-button-file">
          <Button
            variant="contained"
            color="default"
            component="span"
            className={classes.button}
            startIcon={<CloudUploadIcon />}
            disabled={loading}
          >
            Upload File
          </Button>
        </label>
      </Grid>
      
      {files.length > 0 && (
        <>
        <Grid container justifyContent='center'>
          <div className={classes.previewContainer}>
              {files.map((file, index) => (
                <div key={index} className={classes.previewItem}>
                  <img
                    className={classes.previewImage}
                    src={URL.createObjectURL(file)}
                    alt={`Preview of file ${index}`}
                  />
                  <IconButton
                    aria-label="remove file"
                    className={classes.removeButton}
                    onClick={() => handleRemoveFile(index)}
                  >
                    <CloseIcon />
                  </IconButton>
                  <p>label: {labels[index]}</p>
                </div>
              ))}
          </div>
        </Grid>
        <Grid container justifyContent='center'>
          <Button
              variant="contained"
              color="blue"
              disabled={loading}
              onClick={handleLabelPredict}
            >
              {loading ? <CircularProgress size={24} /> : "Predict Label"}
          </Button>
        </Grid>
          
        </>
      )}
    </Box>
  );
              }

