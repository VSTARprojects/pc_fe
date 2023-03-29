import React from 'react'
import './App.css';
import {Routes,Route} from 'react-router-dom'
// import { BrowserRouter as Router, Route } from 'react-router-dom'
import PrivateRoute from './components/PrivateRoute'
import Auth from './components/Auth';
import NavBar from './components/NavBar'
import Predict from './components/Predict';
import SampleTable from './components/SampleTable';
import SampleDetail from './components/SampleDetail';
import SampleCreation from './components/SampleCreation';
import FormDetail from './components/FormDetail';
import PatientForm from './components/PatientForm';
import { Navigate } from 'react-router-dom';

function App() {
  return (
    <div >
      <NavBar/>

      <Routes>
        <Route path="/login" element={<Auth/>} />
        <Route path="/predict" element={<Predict />} />
        <Route path="/sample" element={<SampleDetail />} />
        <Route path="/sampleCreation" element={<SampleCreation />} >
        </Route>
        <Route path="/patientForm" element={<PatientForm />} />
        <Route path="/formDetail" element={<FormDetail />} />
        <Route path="/*" element={ <SampleTable />}  />
      </Routes>
 
    </div>
    
  );
}

export default App;
