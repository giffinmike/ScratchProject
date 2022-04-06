import React, { useEffect, useState } from 'react';
import Search from "./components/Search.jsx";
import Home from "./components/Home.jsx";

export default function App() {

  console.log(Home)
  return (
    <div>
      <Search />
      <div className="cardWrap">
  
      <Home/>
      <Home />
      <Home/>
      <Home/>
      <Home />
      </div>

    </div>
  );
}
