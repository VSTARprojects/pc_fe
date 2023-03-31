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
function App() {
  return (
    <div >
      <NavBar/>

      <Routes>
        {/* <Route path="/login" element={<Auth/>} />
        <Route path="/predict" element={<Predict />} />
        <Route path="/*" element={<PrivateRoute component={<SampleTable />} />} /> */}
        <Route path="/sampledetail/:id" element={<SampleData />} />
        <Route path="/samplelist" element={<SampleTable />} />
        <Route path="/sample" element={<SampleDetail />} />
        
      </Routes>
 
    </div>
    
  );
}

export default App;
