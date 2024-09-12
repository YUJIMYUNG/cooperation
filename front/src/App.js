import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import Header from './components/header/header';
import { Route, BrowserRouter as Router, Routes} from 'react-router-dom';
import ProjectPage from './Pages/project/project_page';


function App() {
  return (
    <div className="box-border">
      <Header />
      <div className="pt-14">
        <Routes>
          <Route path='/' element={<ProjectPage/>} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
