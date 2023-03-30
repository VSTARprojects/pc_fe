import { Box, Grid } from '@material-ui/core';
import { AnnouncementSharp } from '@material-ui/icons';
import React, { useEffect, useState } from 'react'
import SampleService from '../services/SampleService';
import CornerstoneElement from './CornerstoneElement';
import Loading from './Loading';

const imageId =
  "http://localhost:8000/media/uploads/colonca979_ikAC9JD.jpeg";

const defaultStack = {
    imageIds: [imageId],
    currentImageIdIndex: 0
};

export default function SampleDetail({id}) {
    const [data, setData] = useState({})
    const [stack, setStack] = useState(defaultStack)
    const [loading, setLoading] = useState(true);
    const [annots, setAnnots] = useState([])
    const [currAnnot, setCurrAnnot] = useState({})

    const setAnnotations = (new_annots) => {
        console.log("hmmmmmmmmmm", new_annots)
        // setCurrAnnot(new_annots)
        setAnnots([...annots, new_annots])
    }

    useEffect(() => {
        if(annots.length > 0) {
            console.log(annots)
            SampleService.setAnnotations(id, JSON.stringify(annots))
        }
    }, [annots])

    useEffect(() => {
        console.log("currAnnot", currAnnot)
    }, [currAnnot])
 
    useEffect(() => {
        async function fetchData() {
            SampleService.get_sample(id).then((response) => {
                setStack({
                    imageIds: [imageId],
                    currentImageIdIndex: 0
                });
                setAnnots(JSON.parse(response.data.annotations))
   
                setLoading(false);
            })
            .catch((error) => {
                alert("Something went wrong while fetching sample details")
                console.log(error)
            })
        }
        fetchData()    
    }, []);

    

    


    if (loading) {
        return <Loading/>;
      } 


  return (
    <div>
        <Box sx={{m:5, p:5}}>
            <Grid container justifyContent='center'>
                <Grid item sm={6}>
                    <button onClick={()=> setCurrAnnot({})}>
                        original
                    </button>
                    {annots.map((annot, index) => {
                        return (
                            <button key={index} onClick={() => setCurrAnnot(annot)}>
                                {annot["fileName"]}
                            </button>
                        )                        
                    })}
                </Grid>
                {/* <CornerstoneElement stack={{ ...stack }} annotations={'\"{\"toolData\":{},\"viewport\":{\"scale\":1.6,\"translation\":{\"x\":0,\"y\":0},\"voi\":{\"windowWidth\":331.69921875,\"windowCenter\":334.4404296875},\"invert\":false,\"pixelReplication\":false,\"rotation\":0,\"hflip\":false,\"vflip\":false,\"labelmap\":false}}\"'}/> */}
                <CornerstoneElement stack={{ ...stack }} setAnnotations={setAnnotations} annotations={currAnnot}/>
            </Grid>
       </Box>
    </div>
  )
}
