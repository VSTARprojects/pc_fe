import { Box, Button, Grid } from "@material-ui/core";
import { AnnouncementSharp } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";
import React, { useEffect, useState } from "react";
import SampleService from "../services/SampleService";
import CornerstoneElement from "./CornerstoneElement";
import Loading from "./Loading";
import { Link } from "react-router-dom";
import { List, ListItem, Typography } from "@mui/material";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: "5rem",
    flexGrow: 1,
  },

  listContainer: {
    width: "50%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.black,
  },
  listItem: {
    backgroundColor: "#00ffff",
    marginTop: "0.5rem",
    "&:hover": {
      backgroundColor: theme.palette.primary.light,
    },
  },
  imageContainer: {
    margin: theme.spacing(1),
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    marginBottom: "1rem",
    color: "#4caf50",
    fontWeight: "bold",
  },
}));

const imageId = "http://localhost:8000/media/uploads/colonca979_ikAC9JD.jpeg";
// "https://tse2.explicit.bing.net/th?id=OIP.gzDN6kdW6f32-AyA3_ndZgHaFi&pid=Api&P=0";

const defaultStack = {
  imageIds: [imageId],
  currentImageIdIndex: 0,
};

export default function SampleDetail({ id }) {
  const classes = useStyles();
  const [data, setData] = useState({});
  const [stack, setStack] = useState(defaultStack);
  const [loading, setLoading] = useState(true);
  const [annots, setAnnots] = useState([]);
  const [currAnnot, setCurrAnnot] = useState({});

  const setAnnotations = (new_annots) => {
    console.log("hmmmmmmmmmm", new_annots);
    // setCurrAnnot(new_annots)
    setAnnots([...annots, new_annots]);
  };

  useEffect(() => {
    if (annots.length > 0) {
      console.log(annots);
      SampleService.setAnnotations(id, JSON.stringify(annots));
    }
  }, [annots]);

  useEffect(() => {
    console.log("currAnnot", currAnnot);
  }, [currAnnot]);

  useEffect(() => {
    async function fetchData() {
      SampleService.get_sample(id)
        .then((response) => {
          setStack({
            imageIds: [imageId],
            currentImageIdIndex: 0,
          });
          setAnnots(JSON.parse(response.data.annotations));

          setLoading(false);
        })
        .catch((error) => {
          alert("Something went wrong while fetching sample details");
          console.log(error);
        });
    }
    fetchData();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <div>
      <Box className={classes.root}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <Box className={classes.listContainer}>
              <Typography className={classes.title}>File Names</Typography>
              <List component="nav">
                <ListItem
                  Button
                  onClick={() => setCurrAnnot({})}
                  className={classes.listItem}
                >
                  original
                </ListItem>
                {annots.map((annot, index) => {
                  return (
                    <ListItem
                      Button
                      key={index}
                      onClick={() => setCurrAnnot(annot)}
                      className={classes.listItem}
                    >
                      {annot["fileName"]}
                    </ListItem>
                  );
                })}
              </List>
            </Box>
          </Grid>
          <Grid item xs={12} sm={8}>
            <Box className={classes.imageContainer}>
              <CornerstoneElement
                stack={{ ...stack }}
                setAnnotations={setAnnotations}
                annotations={currAnnot}
              />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}
