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
import Profile from './components/Profile';
import Home from './components/Home';
import { Navigate } from 'react-router-dom';
import BarGraph from './components/BarGraph';
function App() {
  return (
    <div >
      <NavBar/>

      <Routes>
        <Route path="/login" element={<Auth/>} />
        {/* <Route path="/upload" element={<PrivateRoute component={<SampleCreation />}/>} />
        <Route path="/upload/patient" element={<PrivateRoute component={<PatientForm />}/>} />
        <Route path="/upload/sample" element={<PrivateRoute component={<FormDetail />} />}/> */}
        <Route path="/sampledetail/:id" element={<SampleData />} />
        <Route path="/samplelist" element={<SampleTable />} />
        <Route path="/sample" element={<SampleDetail id={18}/>} />
        <Route path="/sampleCreation" element={<SampleCreation />} />
        <Route path="/patientForm" element={<PatientForm />} />
        <Route path="/formDetail" element={<FormDetail />} />
        <Route path="/predict" element={<Predict />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/home" element={<Home />} />
        <Route path="/barGraph" element={<BarGraph />} />
        <Route path="/*" element={<PrivateRoute component={<SampleTable />} />} />
      
      </Routes>
 
    </div>
    
  );
}

export default App;
