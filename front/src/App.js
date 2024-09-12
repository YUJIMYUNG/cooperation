import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';

function App() {

  const [data, setData] = useState("");



  return (
    <div className="text-4xl m-2 bg-slate-500 font-serif">
      {data}
    </div>
  );
}

export default App;
