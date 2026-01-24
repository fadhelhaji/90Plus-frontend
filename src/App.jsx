import React from 'react'
import {Routes, Route} from 'react-router'
import SignInForm from './Components/User/SignIn/SignInForm'
import SignUpForm from './Components/User/SignUp/SignUpForm'
import Navbar from './Components/Navbar/Navbar'
import Landing from './Components/Landing/Landing'

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/landing' element={<Landing />} />
        <Route path='/auth/sign-in' element={<SignInForm />} />
        <Route path='/auth/sign-up' element={<SignUpForm />} />
      </Routes>
    </>
  )
}

export default App