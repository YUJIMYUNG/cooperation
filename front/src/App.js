import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';

function App() {

  const [data, setData] = useState("");

  useEffect(()=>{
    const fetchData = async () => {
      try {
        const res = await fetch("/hello", {
          method: "GET",
          headers: {
            "content-type": "application/json",
          },
        });
        console.log(res);
        const result = await res.text();  // 응답을 JSON으로 파싱

        setData(result);  // 받은 데이터를 상태로 저장
        console.log(result);
      } catch (e) {
        console.log(e);  // 에러가 발생하면 콘솔에 출력
      }
    };
    
    fetchData();  // 함수 호출
  }, []);  // 의존성 배열을 추가하여 컴포넌트가 마운트될 때 한 번만 실행

  return (
    <div className="text-4xl m-2 bg-slate-500 font-serif">
      {data}
    </div>
  );
}

export default App;
