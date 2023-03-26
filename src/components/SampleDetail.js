import { Box, Grid } from '@material-ui/core';
import React from 'react'
import CornerstoneElement from './CornerstoneElement';

const imageId =
  "http://127.0.0.1:8000/media/uploads/colonn999.jpeg";

const stack = {
    imageIds: [imageId],
    currentImageIdIndex: 0
};

export default function SampleDetail() {
  return (
    <div>
        <Box sx={{m:5, p:5}}>
            <Grid container justifyContent='center'>
                <CornerstoneElement stack={{ ...stack }}/>
            </Grid>
       </Box>
    </div>
  )
}
