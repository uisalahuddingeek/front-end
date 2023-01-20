import { Route, Routes } from 'react-router-dom';
import './App.css';
import AddProduct from './components/AddProduct';
import Login from './components/Login';
import Nav from './components/Nav';
import PrivateRoute from './components/PrivateRoute';
import ProductList from './components/ProductList';
import SignUp from './components/SignUp';
import UpdateProduct from './components/UpdateProduct';

function App() {
  return (
    <div className="App">
      <Nav></Nav>
      <Routes>
        <Route element={<PrivateRoute />}>
        <Route path="/" element={<ProductList />}></Route>
        <Route path="/add-product" element={<AddProduct />}></Route>
        <Route path="/update/:id" element={<UpdateProduct />}></Route>
        <Route path="/profile" element={<h1>Profile</h1>}></Route>
        </Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/signup" element={<SignUp />}></Route>
      </Routes>
    </div>
  );
}

export default App;
