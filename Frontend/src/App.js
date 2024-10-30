import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserList from './components/cruds/UserList';
import HeaderComponent from './components/styleComponents/HeaderComponent';
import FooterComponent from './components/styleComponents/FooterComponent';
import AddUser from './components/cruds/AddUser';
import UpdateUser from './components/cruds/UpdateUser';
import LoginComponent from "./components/login/LoginComponent"
import CreateUser from './components/login/CreateUser';
import ItemList from './components/Main/ItemList';
import LocationList from './components/cruds/LocationList';
import AddLocation from './components/cruds/AddLocation';
import AddItem from './components/cruds/AddItem';
import Profile from './components/Main/Profile';
import Jobs from './components/Main/Jobs';
import Shop from './components/Main/Shop';
import Fishing from './components/jobs/Fishing';
import Fight from './components/Main/Fight';

function App() {


  return (
    <div className='body'>
      <Router>
        <HeaderComponent />
        <div className='content'>
          <Routes>
            <Route exact path="/" Component={UserList}></Route>
            <Route path="/login" Component={LoginComponent}></Route>
            <Route path="/users" Component={UserList}></Route>
            <Route path="/items" Component={ItemList}></Route>
            <Route path='/locations' Component={LocationList}></Route>
            <Route path="/add-user" Component={AddUser}></Route>
            <Route path="/add-item" Component={AddItem}></Route>
            <Route path="/add-location/:id" Component={AddLocation}></Route>
            <Route path="/edit-user/:id" Component={UpdateUser}></Route>
            <Route path="/create-account" Component={CreateUser}></Route>
            <Route path="profile" Component={Profile}></Route>
            <Route path="fight" Component={Fight}></Route>
            <Route path="jobs" Component={Jobs}></Route>
            <Route path='inventory' Component={ItemList}></Route>
            <Route path='shop' Component={Shop}></Route>
            <Route path='jobs/fishing' Component={Fishing}></Route>
          </Routes>
        </div>
        <FooterComponent />
      </Router>
    </div>
  );
}

export default App;
