// import React, { useState, useEffect } from 'react'
// import SampleListData from './SampleListData';
// import SampleData from './SampleData';
// import Table from 'react-bootstrap/Table';
// import axios from 'axios';

// function SampleList() {
//     const column = Object.keys(SampleListData[0]);
    
//     const [samples, setSamples] = useState([])

    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             const samples = await getSamples()
    //             setSamples(samples)
    //         } catch(e) {
    //             console.log(e)
    //             setSamples(SampleListData)
    //         }
    //     }
    //     fetchData()
    // }, [])
 

// const ThData =()=>{
//      return column.map((data)=>{
//          return( 
//          <th key={data}>{data}</th>
//          )
//      })
//  }


// const getSamples = async () => {
//     let config = {
//         headers: {
//             "Content-Type": "application/json",
//             "Authorization": "Token ce3b119c6856ae942772f8c1693ddff40d574959",
//         }
//     }

//     const response =  await axios.get("http://127.0.0.1:8000/api/v1/samples/", config)

//     const promises = response.data.map(async (element) => {
//         var sample = element
//         var sampleview = {
//             id: sample.id,
//             origin: sample.origin,
//             date_of_collection: sample.date_collected,
//             predictedLabel: sample.predicted_label,
//             humanLabel: sample.human_label
//         }

//         const response = await axios.get(`http://127.0.0.1:8000/api/v1/patients/${sample.patient}`, config)
//         var patient = response.data
//         sampleview.patientName = patient.name
//         sampleview.age = 11

//         return sampleview
//     });

//     const samples = await Promise.all(promises)
//     return samples
// }

// const tdData = () =>{  
//     return samples.map((data, id)=>{
//         return(
//             <tr id={id}>
//                 <td>{data.id}</td>
//                 <td>{data.patientName}</td>
//                 <td>{data.age}</td>
//                 <td>{data.origin}</td>
//                 <td>{data.date_of_collection}</td>
//                 <td>{data.predictedLabel}</td>
//                 <td>{data.humanLabel}</td>
//                 <td>
//                     <a href="">
//                         See more
//                     </a>
//                 </td>
//             </tr>
//         )
//     })
    
    
// }
//   return (
//       <div>
//       <h4 className='mb-4'>Samples List</h4>
//       <Table className='shadow border border-1 rounded bg-light ps-5' hover responsive='sm'>
//         <thead >
//          <tr className='bg-secondary' >{ThData()}</tr>
//         </thead>
//         <tbody >
//             {tdData()}
//         </tbody>
//        </Table>
//        </div>
//   )
  
// }

// export default SampleList