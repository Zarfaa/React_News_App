import './App.css';
import React from "react"
import  NavBar  from './components/NavBar';
import News  from './components/News';
import LoadingBar from 'react-top-loading-bar'
import { BrowserRouter, Routes, Route} from "react-router-dom";
import { useState } from 'react';

const App = () =>{
  const pageSize = 12
  const apiKey = '8a80ebbbf2284877812f82a12945f594'

  const[progress , setProgress] = useState(0)

    return (
      <div>
        <BrowserRouter>
          <LoadingBar
            color='#f11946'
            progress={progress}
          />
          <NavBar />
          <Routes>
            <Route path="/" element={<News setProgress={setProgress} apiKey={apiKey}  key="general" pageSize={pageSize} country="sa" category="general" />}></Route>
            <Route path="/general" element={<News setProgress={setProgress} apiKey={apiKey} key="general" pageSize={pageSize} country="sa" category="general" />}></Route>
            <Route path="/business" element={<News setProgress={setProgress} apiKey={apiKey} key="business" pageSize={pageSize} country="sa" category="business" />}></Route>
            <Route path="/entertainment" element={<News setProgress={setProgress} apiKey={apiKey}  key="entertainment" pageSize={pageSize} country="sa" category="entertainment" />}></Route>
            <Route path="/health" element={<News setProgress={setProgress} apiKey={apiKey}  key="health" pageSize={pageSize} country="sa" category="health" />}></Route>
            <Route path="/science" element={<News setProgress={setProgress} apiKey={apiKey}  key="science" pageSize={pageSize} country="sa" category="science" />}></Route>
            <Route path="/sports" element={<News setProgress={setProgress} apiKey={apiKey}  key="sports" pageSize={pageSize} country="sa" category="sports" />}></Route>
            <Route path="/technology" element={<News setProgress={setProgress} apiKey={apiKey}  key="technology" pageSize={pageSize} country="sa" category="technology" />}></Route>
          </Routes>
        </BrowserRouter>
      </div>
    )
  }

export default App