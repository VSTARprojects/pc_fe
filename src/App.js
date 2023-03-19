import React from 'react'
import './App.css';
import Login from './components/Login'
import Register from './components/Register'
import Profile from './components/Profile'
import SampleList from './components/SampleList';
import SampleData from './components/SampleData';
import {Routes,Route,NavLink} from 'react-router-dom'
// import { BrowserRouter as Router, Route } from 'react-router-dom'
import PrivateRoute from './components/PrivateRoute'
import FormDetail from './components/FormDetail';
import Auth from './components/Auth';
import NavBar from './components/NavBar'
import Predict from './components/Predict';

function App() {
  return (
    <div >
      <NavBar/>

      <Routes>
        <Route path="/login" element={<Auth/>} />
        <Route path="/predict" element={<Predict />} />
        <Route path="/*" element={<PrivateRoute component={<Predict />} />} />
      </Routes>
 
    </div>
    
  );
}

export default App;
