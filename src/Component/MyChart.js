import React, { useEffect, useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';



const MyChart = ({ weather, idxDay }) => {
    const [forecastDay,setForecastDay] = useState(weather);
    console.log("forecastday")
    console.log(idxDay)
    
    const [day, setDay] = useState(forecastDay[idxDay]);
    console.log(day)
    // const newData = day.hour.map((item) => {
    //         return { name: item.tittle, uv: item.uv, temp: item.temp_c, humid: item.humidity };
    //     });
    const [data, setData] = useState([])
    const [nameChart,setNameChart]=useState("temp")
    
    useEffect(() => {
        const newData = day.hour.map((item, index) => {
            const name = index<10 ? "0"+index+":00" : index+":00";
            return {
                name: name,
                uv: item.uv,
                temp: item.temp_c,
                humid: item.humidity
            };
        });
        setData(newData);
    
    }, [day]);
    
    function handleUV() {
        setNameChart("uv");
    }
    function handleTemp() {
        setNameChart("temp");
    }
    function handleHumid() {
        setNameChart("humid");
    }
    return (
        <div style={
            {
                width: "100%",
                height: "30%",
                marginBottom:"10px",
                paddingBottom: "30px",
               
            }
      }>
            {nameChart == "temp" ? <h1 onClick={()=> handleUV()}>Temperature</h1> : nameChart=="uv"?<h1 onClick={()=> handleHumid()}>UV</h1>:<h1 onClick={()=> handleTemp()}>Humidity</h1>}
            
            {/* <h1 onClick={()=>handleUV()}>UV</h1>
            <h1 onClick={() => handleHumid()}>Humid</h1> */}
            <ResponsiveContainer fontSize={10} width="100%" height="80%">
                <AreaChart
                
                width={700}
                height={400}
                data={data}
                margin={{
                top: 0,
                right: 30,
                left: 0,
                bottom: 0,
                }}
            >
                <CartesianGrid fontSize={10} strokeDasharray="0" />
                <XAxis fontSize={10} dataKey="name" />
                <YAxis fontSize={10} />
                <Tooltip fontSize={10} />
                <Area type="monotone" dataKey={nameChart} stroke="#8884d8" fill="#8884d8" />
            </AreaChart>
            </ResponsiveContainer>
        </div>
  );
};

export default MyChart;
