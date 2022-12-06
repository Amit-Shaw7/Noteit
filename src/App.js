import React from 'react';
import Home from './components/Home';
import Navbar from './components/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import About from './components/About';
import NoteState from './context/NoteState';
import Login from './components/Login';
import Signup from './components/Signup';

const App = () => {
  return (
    <NoteState>
      <BrowserRouter>
        <Navbar />
        <div className="container">
          <Routes>
            <Route exact path='/' element={<Home />}></Route>
            <Route exact path='/about' element={<About />}></Route>
            <Route exact path='/login' element={<Login/>}></Route>
            <Route exact path='/signup' element={<Signup/>}></Route>
          </Routes>
        </div>
      </BrowserRouter>
    </NoteState>
  )
}

export default App