import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState } from 'react'
import Header from './components/layout/header'
import Footer from './components/layout/footer'
import Sidebar from './components/layout/sidebar'
import Main from './components/layout/main'

const App = () => {
  return (
    <BrowserRouter>
      <div className="p-6 m-0 flex flex-col h-screen w-screen overflow-hidden">
        <Header />
        <div className="flex flex-row h-full w-full">
          <Sidebar />
        <Routes>
          {/* Redirect from / to /flex */}
          <Route path="/" element={<Navigate to="/flex" replace />} />
          <Route path="/flex" element={<Main />} />
          <Route path="/grid" element={<Main />} />
        </Routes>
        </div>
      </div>
    </BrowserRouter>
  )
}

export default App;
