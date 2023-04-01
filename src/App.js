import React from 'react'
import './App.css';
import {Routes,Route} from 'react-router-dom'
// import { BrowserRouter as Router, Route } from 'react-router-dom'
import PrivateRoute from './components/PrivateRoute'
import Auth from './components/Auth';
import NavBar from './components/NavBar'
import Predict from './components/Predict';
import SampleTable from './components/SampleTable';
import SampleData from './components/SampleData';
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
      <Route path="/sad" element={<SampleData />} />
        <Route path="/login" element={<Auth/>} />
        <Route path="/predict" element={<Predict />} />
        <Route path="/sample" element={<SampleDetail id={20}/>} />
        <Route path="/upload" element={<PrivateRoute component={<SampleCreation />}/>} />
        <Route path="/upload/patient" element={<PrivateRoute component={<PatientForm />}/>} />
        <Route path="/upload/sample" element={<PrivateRoute component={<FormDetail />} />}/>
        <Route path="/sampledetail/:id" element={<SampleData />} />
        <Route path="/samplelist" element={<SampleTable />} />
        <Route path="/*" element={<SampleTable />}  />
      </Routes>
 
    </div>
    
  );
}

export default App;
