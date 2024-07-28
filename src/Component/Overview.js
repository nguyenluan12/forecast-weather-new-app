import React, { useState,useEffect } from "react";


function Overview(props) {
    
    const current = props.data.current;
    // Xử lý hiển thị thời gian thực .
    const days =[
    "Sun",
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat"
    ]   
    const Months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
    ]
    function handleRealTime() {
        const now = new Date();
        const hours = now.getHours();
        const minutes = now.getMinutes();
        const seconds = now.getSeconds();
        const day = days[now.getDay()];
        const month = Months[now.getMonth()];
        const year = now.getFullYear();
        const date = now.getDate();
        const hours_apm = hours <=12 ? "AM" : "PM";
        const dateString =`${hours}:${minutes} ${hours_apm}, ${day},${month} ${date}, ${year}`;
        return dateString;
    }
    
    const [realTime, setRealTime] = useState(handleRealTime());

    useEffect(() => {
        setTimeout(() => {
            setRealTime(()=>handleRealTime());
            }, 1000);
    },);
    
    
    
    return (
        <div style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            width: '100%',
            height: '400px',
           
            }}>
            
            <div>{realTime}</div>
            <div style={
                {
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems:"Center",
                    
                    maxWidth: "100%",
                    gap:"15px"
                }
                }>
                <img style={{
                    width: '50px',
                }}
                    src={current.condition.icon} />
                <div>{current.temp_c}°C</div>
             
            </div>
            <h1>{current.condition.text}</h1>
            <div className="forecastToday" style={
                {
                    display: "flex",
                    flexDirection: "row",
                    justifyContent:"center",
                   
                    gap:"15px"
                }
            }>
                <div>
                    <p>Humidity</p>
                    <p>{current.humidity } %</p>
                </div>
                <div>
                    <p>Wind Speed</p>
                    <p>{current.wind_kph } km/h</p>
                </div>
            </div>
        </div>
    );
}

export default Overview;