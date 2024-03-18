import React from 'react'
import Home from './pages/Home'
import ProductList from './pages/ProductList'
import Product from './pages/Product'
import Register from './pages/Register'
import Login from './pages/Login'
import Cart from './pages/Cart'
import {createBrowserRouter,RouterProvider,Route, Outlet, Navigate,Routes,Router, BrowserRouter} from "react-router-dom"
import Sucess from './pages/Sucess'
import { useSelector } from 'react-redux'

const App = () => {
  const user=useSelector(state=>state.user.currentUser);
  console.log("userrrrrrr",user);
  const ProtectedRoute=({children})=>{
    if(!user){
      return <Navigate to="/login"/>
    }else{
      return children
    }
  }

  // <Route path="/" element={<Navigate replace to="/home" />} />

  const router=createBrowserRouter([
    {
      path:"/",
      element:<ProtectedRoute><Home/></ProtectedRoute>,
      // to decide which outlet we are using
    },
    {
      path:"/login",
      element:<Login/>
    },
    {
      path:"/register",
      element:<Register/>
    },
    {
      path:'/products/:category', element:<ProtectedRoute><ProductList/></ProtectedRoute>
    },
    {
      path:'/product/:id', element:<ProtectedRoute><Product/></ProtectedRoute>
    },
    {
      path:'/cart', element:<ProtectedRoute><Cart/></ProtectedRoute>
    },
    {
      path:'/sucess', element:<ProtectedRoute><Sucess/></ProtectedRoute>
    },

  ])

 

  return (
    <div>
    <RouterProvider router={router}/>
    </div>

  )
}

export default App