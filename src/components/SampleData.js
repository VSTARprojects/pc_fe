import React from 'react';

function SampleData ({ sample})  {
  return (
    <div className="card">
      <img src={sample.wsi_image} alt="card image" />
      <div className="card-body">
        <h5 className="card-title">ID: {sample.id}</h5>
        <p className="card-text">Collection Date: {sample.collection_datetime}</p>
              <h2 className='card-text'>type : {sample.type}</h2>
        <p className="card-text">Diagnosis Code: {sample.diagnosis_code}</p>
        <h2 className="card-text">Origin: {sample.origin}</h2> 
        <p className="card-text">Symptoms: {sample.symptoms}</p>
        
      </div>
    </div>
  );
};

export default SampleData