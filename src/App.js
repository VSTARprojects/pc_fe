import React from 'react'
import './App.css';
import {Routes,Route,NavLink} from 'react-router-dom'
// import { BrowserRouter as Router, Route } from 'react-router-dom'
import PrivateRoute from './components/PrivateRoute'
import FormDetail from './components/FormDetail';
import Auth from './components/Auth';
import NavBar from './components/NavBar'
import Predict from './components/Predict';
import SampleTable from './components/SampleTable';
import SampleDetail from './components/SampleDetail';

function App() {
  return (
    <div >
      <NavBar/>

      <Routes>
        <Route path="/login" element={<Auth/>} />
        <Route path="/predict" element={<Predict />} />
        <Route path="/sample" element={<SampleDetail />} />
        <Route path="/*" element={<PrivateRoute component={<SampleTable />} />} />
      </Routes>
 
    </div>
    
  );
}

export default App;
