import React from 'react'
import './App.css'
import Navbar from './components/Navbar/Navbar.jsx'
import Header from './components/Header/Header.jsx'
import MainBody from './components/MainBody/MainBody.jsx'
import Footer from './components/Footer/Footer.jsx'

const App = () => {
  return (
    <div>
      <Navbar/>
      <Header/>
      <MainBody/>
      <Footer/>
    </div>
  )
}

export default App
