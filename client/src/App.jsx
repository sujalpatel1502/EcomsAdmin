import React from 'react'
import Home from './pages/Home'
import ProductList from './pages/ProductList'
import Product from './pages/Product'
import Register from './pages/Register'
import Login from './pages/Login'
import Cart from './pages/Cart'
import {createBrowserRouter,RouterProvider,Route, Outlet, Navigate,Routes,Router, BrowserRouter} from "react-router-dom"

const App = () => {
  const user=true;
  const ProtectedRoute=({children})=>{
    if(!user){
      return <Navigate to="/login"/>
    }else{
      return children
    }
  }

  

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
    }
  ])

  return (
    <div>
    <RouterProvider router={router}/>
    </div>

  )
}

export default App