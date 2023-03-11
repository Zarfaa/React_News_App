import './App.css';
import React, { Component } from "react"
import { NavBar } from './components/NavBar';
import { News } from './components/News';
import LoadingBar from 'react-top-loading-bar'
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

export default class App extends Component {
  pageSize = 12
  apiKey = '8a80ebbbf2284877812f82a12945f594'

  state = {
    progress: 0
  }

  setProgress = (progress) =>{
    this.setState({ progress: progress })
  }
  render() {
    return (
      <div>
        <BrowserRouter>
          <LoadingBar
            color='#f11946'
            progress={this.state.progress}
          />
          <NavBar />
          <Routes>
            <Route path="/" element={<News SetProgress={this.setProgress} apiKey={this.apiKey}  key="general" pageSize={this.pageSize} country="sa" category="general" />}></Route>
            <Route path="/general" element={<News SetProgress={this.setProgress} apiKey={this.apiKey} key="general" pageSize={this.pageSize} country="sa" category="general" />}></Route>
            <Route path="/business" element={<News SetProgress={this.setProgress} apiKey={this.apiKey} key="business" pageSize={this.pageSize} country="sa" category="business" />}></Route>
            <Route path="/entertainment" element={<News SetProgress={this.setProgress} apiKey={this.apiKey}  key="entertainment" pageSize={this.pageSize} country="sa" category="entertainment" />}></Route>
            <Route path="/health" element={<News SetProgress={this.setProgress} apiKey={this.apiKey}  key="health" pageSize={this.pageSize} country="sa" category="health" />}></Route>
            <Route path="/science" element={<News SetProgress={this.setProgress} apiKey={this.apiKey}  key="science" pageSize={this.pageSize} country="sa" category="science" />}></Route>
            <Route path="/sports" element={<News SetProgress={this.setProgress} apiKey={this.apiKey}  key="sports" pageSize={this.pageSize} country="sa" category="sports" />}></Route>
            <Route path="/technology" element={<News SetProgress={this.setProgress} apiKey={this.apiKey}  key="technology" pageSize={this.pageSize} country="sa" category="technology" />}></Route>
          </Routes>
        </BrowserRouter>
      </div>
    )
  }
}
