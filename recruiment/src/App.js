import logo from './logo.svg';
import './App.css';
// import Login from './pages/login/login.js';
// import RegisterUser from './pages/register/RegisterUser';
import Navbar from './layouts/navbar/navbar';
import NavbarCompany from './layouts/navbar/navbar-company';
import NavbarAdmin from './layouts/navbar/navbar-admin';
import Footer from './layouts/footer/footer';
import Career from './pages/admin/career/list-career/list-career';
import CreateCareer from './pages/admin/career/create-career/create-career';
import UpdateCareer from './pages/admin/career/update-career/update-career';
import Branch from './pages/admin/branch/list-branch/list-branch';
import CreateBranch from './pages/admin/branch/create-branch/create-branch';
import UpdateBranch from './pages/admin/branch/update-branch/update-branch';
import Account from './pages/admin/account/list-account/list-account';
import ChangePassword from './pages/admin/account/change-password/change-password';
import ProfileCompany from './pages/company/profile/profile-company';
import ProfileUser from './pages/user/profile/profile-user';
import Register from './pages/register/register';
import Login from './pages/login/login';
import DetailRecruitment from './pages/recruitment/detail-recruitment/detail-recruitment';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

function App() {
  return (
    
    <Routes>
      <Route path="/" element={<Career />}></Route>
      <Route path="/create-career" element={<CreateCareer />}></Route>
      <Route path="/update-career/:id" element={<UpdateCareer />}></Route>
      <Route path="/branch" element={<Branch />}></Route>
      <Route path="/branch/create-branch" element={<CreateBranch />}></Route>
      <Route path="/branch/update-branch/:id" element={<UpdateBranch />}></Route>
      <Route path="/account" element={<Account />}></Route>
      <Route path="/account/change-password/:id" element={<ChangePassword />}></Route>
      <Route path="/company/profile" element={<ProfileCompany />}></Route>
      <Route path="/user/profile" element={<ProfileUser />}></Route>
      <Route path="/register" element={<Register />}></Route>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/recruitment/detail/:id" element={<DetailRecruitment />}></Route>
    </Routes>

  );
}

export default App;
