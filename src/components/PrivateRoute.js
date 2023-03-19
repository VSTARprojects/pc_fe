import React from 'react'
import AuthService from '../services/AuthService'
import { Navigate, Route } from 'react-router-dom'

const PrivateRoute = ({ component: Component}) => {

  // Check if the user is logged in
  const isLoggedIn = AuthService.isLoggedIn()

  // If the user is not logged in, redirect to the login page
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />
  }

  // If the user is logged in, render the component
  return Component
}

export default PrivateRoute