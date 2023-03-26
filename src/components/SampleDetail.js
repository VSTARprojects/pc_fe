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
                {/* <CornerstoneElement stack={{ ...stack }} toolData={'{"probe":{"data":[{"visible":true,"active":false,"handles":{"end":{"x":92.015625,"y":326.25,"highlight":true,"active":false}},"invalidated":true},{"visible":true,"active":false,"handles":{"end":{"x":446.015625,"y":234.75,"highlight":true,"active":false}},"invalidated":true},{"visible":true,"active":false,"handles":{"end":{"x":467.015625,"y":444.75,"highlight":true,"active":false}},"invalidated":true},{"visible":true,"active":false,"handles":{"end":{"x":230.015625,"y":518.25,"highlight":true,"active":false}},"invalidated":true}]},"ellipticalRoi":{"data":[{"visible":true,"active":false,"invalidated":false,"handles":{"start":{"x":176.015625,"y":116.25,"highlight":true,"active":false},"end":{"x":267.515625,"y":180.75,"highlight":true,"active":false},"textBox":{"active":false,"hasMoved":false,"movesIndependently":false,"drawnIndependently":true,"allowedOutsideImage":true,"hasBoundingBox":true,"x":267.515625,"y":148.5,"boundingBox":{"width":159.21908569335938,"height":25,"left":212.42051885538862,"top":146.00328100133248}}},"area":4696.681017116741}]}}'} viewport={'{"scale":0.31716134507293714,"translation":{"x":-20.920393335149583,"y":-71.9041667222919},"voi":{"windowWidth":317.255859375,"windowCenter":293.3515625},"invert":false,"pixelReplication":false,"rotation":0,"hflip":false,"vflip":false,"labelmap":false}'}/> */}
                <CornerstoneElement stack={{ ...stack }} />
            </Grid>
       </Box>
    </div>
  )
}
