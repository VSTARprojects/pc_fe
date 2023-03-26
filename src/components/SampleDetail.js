import { Box, Grid } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import CornerstoneElement from './CornerstoneElement';
import Loading from './Loading';

const imageId =
  "https://rawgit.com/cornerstonejs/cornerstoneWebImageLoader/master/examples/Renal_Cell_Carcinoma.jpg";

const defaultStack = {
    imageIds: [imageId],
    currentImageIdIndex: 0
};

export default function SampleDetail() {
    const [data, setData] = useState({})
    const [stack, setStack] = useState(defaultStack)
    const [loading, setLoading] = useState(true);
 
    useEffect(() => {
        async function fetchData() {
            // Can hardcode data here for building ui
            setData({
                image: imageId,
            })

            setStack({
                imageIds: [imageId],
                currentImageIdIndex: 0
            });

            setLoading(false);
        }
        fetchData()
        // JSON.parse(teststr)        
    }, []);

    if (loading) {
        return <Loading/>;
      }


  return (
    <div>
        <Box sx={{m:5, p:5}}>
            <Grid container justifyContent='center'>
                {/* <CornerstoneElement stack={{ ...stack }} annotations={'\"{\"toolData\":{},\"viewport\":{\"scale\":1.6,\"translation\":{\"x\":0,\"y\":0},\"voi\":{\"windowWidth\":331.69921875,\"windowCenter\":334.4404296875},\"invert\":false,\"pixelReplication\":false,\"rotation\":0,\"hflip\":false,\"vflip\":false,\"labelmap\":false}}\"'}/> */}
                <CornerstoneElement stack={{ ...stack }}/>
            </Grid>
       </Box>
    </div>
  )
}
