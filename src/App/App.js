import './App.css';
import React, {useState} from 'react';
import HomePage from '../HomePage/HomePage';
import { Routes, Route} from "react-router-dom";
import ResultPage from '../ResultPage/ResultPage';

import {LinkOutlined} from '@ant-design/icons';
import { DataProvider } from '../data';

function App() {
  const [author,setAuthor] =  useState("Yuchen Pu")
 
  return (
    <DataProvider>
      <div id="App">
        <a id="backgroundImageAttribution" href="https://github.com/yucpu">
          <div>
              <LinkOutlined/> 
              <span style={{padding:'5px'}}>Photo by {author}</span>
          </div>
        </a>
        <Routes>
          <Route path="/*" element={<HomePage props/>} />
          <Route path="/search" element={<ResultPage props/>}/>
        </Routes>
  
      </div>
    </DataProvider>
  )
}

export default App
