
import './App.css';
import Login from './components/Login'
import Register from './components/Register'
import Profile from './components/Profile'
import SampleList from './components/SampleList';
import SampleData from './components/SampleData';
import {Routes,Route,NavLink} from 'react-router-dom'
import {Navbar,Container} from 'react-bootstrap'

function App() {
  return (
    <div >
     <Navbar className="m-4 border shadow"  collapseOnSelect expand="lg" bg="light" variant="">
        <Container>
          <Navbar.Brand href="#home" className="text-dark">Pathology</Navbar.Brand>
          <div className="ms-auto">
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="">
            <NavLink className="nav-link me-5" to="/">Home</NavLink>
            <NavLink className="nav-link me-5" to="/register">Register</NavLink>
            <NavLink className="nav-link me-5" to="/login">Login</NavLink>
            <NavLink className="nav-link me-5" to="/samplelist">Samples</NavLink>
            <NavLink className="nav-link" to="/profile">Profile</NavLink>
           
          </Navbar.Collapse>
          </div>
        </Container>
      </Navbar>
      
      <div className='m-5'>
      <Routes>
        <Route  path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/samplelist" element={<SampleList />} />
        <Route path="/sampledata" element={<SampleData />} />
        <Route path="/profile" element={<Profile />} />
        
      </Routes>
      </div>
      </div>
    
  );
}

export default App;
