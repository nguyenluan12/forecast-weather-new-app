import axios from 'axios';
import MyChart from './Component/MyChart';
import Forecast from './Component/Forecast';
import './App.css';
import Overview from './Component/Overview';
import { useEffect, useState } from 'react';

function App() {
  // Xử lý thẻ input
  const [city, setCity] = useState("hanoi");
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isExistCity, setExistCity] = useState(true);

  
  async function handleFetchData(city) {
    setIsLoading(true); 
    try {
        const response = await axios.get(`https://api.weatherapi.com/v1/forecast.json?key=f5ac4be4a19c47d8a3e42522222112&q=${city}&days=10&aqi=no&alerts=yes`);
        const res = response.data;
        setData(res); 
        setIsLoading(false); // Dữ liệu đã tải xong
        setExistCity(true);
    } catch (error) {
        console.log(error);
        setExistCity(false);
        setIsLoading(false);
        alert("Nhập sai thành phố !");
        setCity('hanoi');
    }
}


  // Cập nhật dữ liệu khi thành phố thay đổi
  useEffect(() => {
    handleFetchData(city);
  }, [city]);
  
  // Hàm xử lý sự kiện khi nhấn Enter trong input
  function handleChangeInput(e) {
    if (e.key === 'Enter') {
      setCity(e.target.value);
      handleFetchData(e.target.value); // Gọi lại dữ liệu từ API
    }
  }

  // Nếu đang tải dữ liệu, hiển thị loading
  if (isLoading) {
    return <p>Loading...</p>;
  }

  
  return (
    <div id='app-container' style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      height: "800px",
      backgroundColor: "rgb(238, 238, 238)"
    }}>
      <div className="App" style={{
        display: "flex",
        flexDirection: "row",
        gap: "15px",
        width: "800px",
        borderRadius: "10px",
        boxShadow: "10px lightblue",
        backgroundColor: "white"
      }}>
        <div className='overView' style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: "40%"
        }}>
          <div style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}>
            <p>Your City:</p>
            <input
              style={{ height: "20px" }}
              type="text"
              placeholder='Enter the city ...'
              onKeyDown={handleChangeInput} 
            />
          </div>
          {isExistCity ? <h1>{city.toUpperCase()}</h1> : <></>}
          <Overview data={data} /> 
        </div>
        <div className='analyst-and-forcast' style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "15px",
          width: "60%"
        }}>
          <Forecast data={data?.forecast.forecastday} /> 
        </div>
      </div>
    </div>
  );
}

export default App;
