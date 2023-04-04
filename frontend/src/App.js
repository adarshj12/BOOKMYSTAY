import './App.css';
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import Register from './pages/user/Register';
import Login from './pages/user/Login';
import Mobile from './pages/user/Mobile';
import Home from './pages/user/Home/Home';
import ClientHome from './pages/client/Home/ClientHome';
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import ClientLogin from './pages/client/ClientLogin';
import ClientRegister from './pages/client/ClientRegister';


import AuthorizeClient from './middlewares/clientPath/ClientAuth';
import PublicRouteClient from './middlewares/clientPath/ClientPublic';
import AuthorizeAdmin from './middlewares/adminPath/AdminAuth';
import PublicRouteAdmin from './middlewares/adminPath/AdmnPublic';
import AuthorizeUser from './middlewares/userPath/UserAuth';
import PublicRouteUser from './middlewares/userPath/PublicPath';
import Properties from './pages/client/Properties/Properties';
import List from './pages/user/List/List';
import Hotel from './pages/user/Hotel/Hotel';



function App() {
  return (
    <Router>
      <Routes>
        {/* <Route path = '/register' element={<Register/>}/>
        <Route path = '/login' element={<Login/>}/>
        <Route path = '/mobile' element={<Mobile/>}/>
        <Route path = '/' element={<Home/>}/>
        <Route path = '/client' element={<ClientHome/>}/>
        <Route path = '/clientregister' element={<ClientRegister/>}/>
        <Route path = '/clientlogin' element={<ClientLogin/>}/>
        <Route path = '/admin' element={<AdminLogin/>}/>
        <Route path = '/admin/adminDashboard' element={<AdminDashboard/>}/> */}


        {/* USER */}
        

        <Route path = '/register' element={<Register/>}/>
        <Route path = '/login' element={<Login/>}/>
        <Route path = '/mobile' element={<Mobile/>}/>
        <Route path = '/' element={<Home/>}/>
        <Route path = '/search' element={<List/>}/>
        <Route path = '/hotel' element={<Hotel/>}/>
        

        {/* CLIENT */}

        <Route path = '/client' 
        element={
          <AuthorizeClient>
                <ClientHome/>
          </AuthorizeClient>
        
        }/>
        <Route path = '/clientregister'
        element={
          <PublicRouteClient>
                <ClientRegister/>
          </PublicRouteClient>
        
        }/>
        <Route path = '/clientlogin' 
        element={
          <PublicRouteClient>
              <ClientLogin/>
          </PublicRouteClient>
        
        }/>

        <Route path = '/client/property' 
        element={
          <AuthorizeClient>
               <Properties/>
          </AuthorizeClient>
        
        }/> 

        {/* ADMIN */}


        <Route path = '/admin' 
        element={
          <PublicRouteAdmin>
              <AdminLogin/>
          </PublicRouteAdmin>
        
        }/>
        <Route path = '/admin/adminDashboard' 
        element={
          <AuthorizeAdmin>
              <AdminDashboard/>
          </AuthorizeAdmin>
        
        }/>
    </Routes>
     </Router> 
    
  );
}

export default App;
