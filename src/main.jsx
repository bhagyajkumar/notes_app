import React, { useState } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import 'bootstrap/dist/css/bootstrap.min.css'
import {
  createBrowserRouter, RouterProvider, Route, Link
} from 'react-router-dom';
import Home from './pages/Home'
import { Login } from './pages/Login';
import { Signup } from './pages/Signup';
import { userContext } from './context';
import supabase from './lib/supabase';


const router = createBrowserRouter([
  {
    path: "/",
    element: (<Home />)
  },
  {
    path: "/login",
    element: (<Login />)
  },
  {
    path: "/signup",
    element: (<Signup />)
  }
])



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <RouterProvider router={router} />
  </React.StrictMode>
)
