import React from 'react'
import SampleListData from './SampleListData';
import SampleData from './SampleData';
import Table from 'react-bootstrap/Table';
function SampleList() {
 
    
 const column = Object.keys(SampleListData[0]);
 

 const ThData =()=>{
    
     return column.map((data)=>{
         return( 
         <th key={data}>{data}</th>
         )
     })
 }

const tdData =() =>{
   
     return SampleListData.map((data)=>{
       return(
           <tr>
                {
                   column.map((v,index)=>{
                        if(index!==column.length-1)
                        {
                            return( 
                                <td>{data[v]}</td>
                              )
                        }
                       
                   })
                }
                <td><a href={column.map((t)=>{
                    return(
                        <td>{data[t]}</td>
                    )
                })}>See more</a> </td>
           </tr>
       )
     })
}
  return (
      <div>
      <h4 className='mb-4'>Samples List</h4>
      <Table className='shadow border border-1 rounded bg-light ps-5' hover responsive='sm'>
        <thead >
         <tr className='bg-secondary' >{ThData()}</tr>
        </thead>
        <tbody >
            {tdData()}
        </tbody>
       </Table>
       </div>
  )
  
}

export default SampleList