// import { hover } from "@testing-library/user-event/dist/hover";
import { useEffect, useState, useReducer } from "react";
import '..';
// import MyChart from "./MyChart";
// import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';



function Forecast(props) {
    const [forecastday, setForecastDay] = useState(props.data);
    const [idxDay, setIdxDay] = useState(0);
    const [hour, setHour] = useState(forecastday[0].hour);
    const [maxtemp_c,setMaxtemp_c] = useState(hour[0].maxtemp_c);
    const [date, setDate] = useState(forecastday[0].date)
    const [detailHour, setDetailHour] = useState(hour[0])
    const [changeDisplay, setChangeDisplay] = useState('none')
   

    //Tao bang phan tich 
    function MyChart() {
        // const [forecastDay,setForecastDay] = useState(weather);
        
        
        const [day, setDay] = useState(forecastday[idxDay]);
       
        // const newData = day.hour.map((item) => {
        //         return { name: item.tittle, uv: item.uv, temp: item.temp_c, humid: item.humidity };
        //     });
        const [data, setData] = useState([])
        const [nameChart, setNameChart] = useState("temp")
        const [colorChart, setColorChart]=useState("#ead93b")
        
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
            setColorChart("#de553a")
        }
        function handleTemp() {
            setNameChart("temp");
            setColorChart("#ead93b")
        }
        function handleHumid() {
            setNameChart("humid");
            setColorChart("#8884d8")
        }
        return (
            <div style={
                {
                    width: "100%",
                    height: "150px",
                    marginTop: "0px",
                    paddingBottom: "30px",
                    position:"relative"
                    
                
                }
                }>
                
        <ResponsiveContainer width="100%" height="100%">
                    
            <LineChart
            width={500}
            height={300}
            data={data}
            margin={{
                top: 0,
                right: 0,
                left: 0,
                bottom: 0,
            }}
            >
            {/* <CartesianGrid strokeDasharray="3 3" /> */}
            {/* <XAxis dataKey="name" />
            <YAxis /> */}
                            
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="humid" stroke="#8884d8" activeDot={{ r: 8 }} />
                            <Line type="monotone" dataKey="temp" stroke="#82ca9d" />
                            <Line type="monotone" dataKey="uv" stroke="#282828" />
            </LineChart>
      </ResponsiveContainer>
            </div>
    );
    };

    // Phan tich theo gio
   

    const changeHour = (state, action) => {
        switch (action.type) {
            case 'CHANGE_HOUR':
                const { index, hour } = action.payload;
                return {
                    hour : (index<10? `0${index}:00`: `${index}:00`),
                    icon: hour[index].condition.icon,
                    text: hour[index].condition.text,
                    temp_c: hour[index].temp_c,
                    feelslike: hour[index].feelslike_c,
                    temp_f: hour[index].temp_f,
                    humid: hour[index].humidity,
                    uv: hour[index].uv,
                    wind: hour[index].wind_kph,
                    snow: hour[index].snow_cm,
                };
            default:
                return state;
        }
    };

    function ForecastHourItem(props) {
        const hour = props.hour;
      
        const [changeDisplay, setChangeDisplay] = useState('none');
        const [infoHour, infoHourDispatch] = useReducer(changeHour, {});

        function handleChangeDisplay(index) {
            setChangeDisplay('flex');
            infoHourDispatch({ type: 'CHANGE_HOUR', payload: { index, hour } });
        }

        function handleChangeDisplayNone() {
            setChangeDisplay('none');
        }

        function DetailWeather() {
            return (
                <div className="detail-hour-block" style={{ display: changeDisplay }}>
                    <div style={{
                        backgroundColor: '#96C9F4',
                        width: "100%",
                        height:'70px',
                        textAlign: 'left',
                        color: 'black',
                        // border: '1px solid white',
                        
                        
                    }}>
                        <h1>Weather Details</h1>
                        <div style={{
                            position: 'absolute',
                            right: '10px',
                            top: '-30px',
                            cursor: 'pointer',
                            
                            // width: '40px',
                            // height: '40px',
                            marginTop:'30px',
                            paddingBottom: '5px',
                            textAlign:'center'
                            
                        }} onClick={handleChangeDisplayNone}><img src='./img/reject.png'></img></div>
                    </div>
                    <div>
                        <div className="detail-hour-item">
                            <p>Time: {infoHour.hour}</p>
                            <div style={{
                                display: 'flex',
                                flexDirection: 'row',
                                gap:'15px'
                            }}>
                                <img src={infoHour.icon} alt="weather icon" />
                                <h1>{infoHour.text}</h1>
                            </div>
                        </div>
                        
                        <div className="detail-hour-item">
                            <p>Temperature: {infoHour.temp_c}°C</p>
                            <p>Feels Like: {infoHour.feelslike}°C</p>
                            <p>Humidity: {infoHour.humid}%</p>
                            <p>UV: {infoHour.uv}</p>
                        
                        <p>Wind Speed: {infoHour.wind} kph</p>
                            <p>Snow: {infoHour.snow}%</p>
                            </div>
                    </div>
                </div>
            );
        }

        return (
            <div >
                <div style={{
                    display: "flex",
                    flexDirection: "row",
                    overflow: "scroll",
                    msOverflowStyle: "none",
                    scrollbarWidth: "none"

                }}>
                    {hour.map((item, index) => (
                        <div className="forecast-hour-item" key={index} onDoubleClick={() => handleChangeDisplay(index)}>
                            <p style={{ marginBottom: "0", marginTop: "0" }}>{item.dewpoint_f}°F</p>
                            <img style={{ marginBottom: "0", marginTop: "0" }} src={item.condition.icon} alt="weather icon" />
                            {index < 10 ? <p style={{ marginBottom: "0", marginTop: "0" }}>0{index}:00</p> : <p style={{ marginBottom: "0", marginTop: "0" }}>{index}:00</p>}
                        </div>
                    ))}
                </div>
                <DetailWeather />
            </div>
        );
    }
    
    function handleChangeForecastHour(index) {
        setHour(forecastday[index].hour);   
        setIdxDay(index);
    }

    //Du bao theo ngay
    function ForcastDay(props) {
        const forecastday = props.forecastday;
        
        return (
            forecastday.map((item, index) => {
                
                return (
                    <div style={{ marginBottom: "0", marginTop: "0" }} key={index} className="forecastDay" onClick={() => { handleChangeForecastHour(index); }}>
                        <img style={{ marginBottom: "0", marginTop: "0" }} src={item.day.condition.icon} />
                        <p style={{ marginBottom: "0", marginTop: "0" }}>Humidity</p>
                        <p style={{ marginBottom: "0", marginTop: "0" }}>{item.day.avghumidity}%</p>
                    </div>
                );
            } )
            
        );
    }
    //thay doi du lieu theo gio khi du lieu ngay thay doi
    useEffect(() => {
        setHour(forecastday[0].hour)
    }, [forecastday])
    
    return (
        <div style={
            {
                width: "100%",
                height:"100%",
                marginTop: "0",
                
                

            }} className="weather-forecast">
            
            <MyChart weather={forecastday} idxDay={idxDay}/>
            <div style={
                {   
                    position:"relative",
                    display: "flex",
                    flexDirection: "row",
                    overflow: "scroll",
                    msOverflowStyle: "none",
                    scrollbarWidth: "none"
                }
            }>
                <ForecastHourItem hour={hour} />
                
            </div>
            <div  style={
                {
                    display: "flex",
                    flexDirection: "row",
                    justifyContent:"space-between",
                    overflow: "scroll",
                    msOverflowStyle: "none",
                    scrollbarWidth: "none",
                    cursor: "pointer",
                    padding:"0"
                    

                }
                
            }> 
                
                <ForcastDay forecastday={forecastday} />
               
            </div>
             
        </div>
        
        
    );
}
export default Forecast;