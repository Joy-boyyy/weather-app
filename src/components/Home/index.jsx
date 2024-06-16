import SearchComponent from "../Searchbar";
import { useEffect, useState } from "react";
import Citycard from "../Citycard";
import { MdDarkMode } from "react-icons/md";
import { CiLight } from "react-icons/ci";
import "./index.css";

const HomeFun = () => {
  const [curentTime, updateTime] = useState(new Date().toLocaleTimeString());
  const [darkmode, darkModeToggleFun] = useState(true);
  const [sampleData, updateData] = useState({});

  const[isTrue,isTrueFun] =useState(true);

  useEffect(() => {
    const intervalVar = setInterval(() => {
      const date = new Date().toLocaleTimeString();

      updateTime(date);
    }, 1000);

    return () => {
      clearInterval(intervalVar);
    };
  }, []);

  useEffect(() => {
    const dataFetching = async () => {
      const fetchVar = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=delhi&appid=aceebc76eda61735507da2b2ba35677a`
      );

      const jsonData = await fetchVar.json();
      const { temp, feels_like, temp_min, temp_max, pressure, humidity } =
        jsonData.main;
      const { country, sunrise, sunset } = jsonData.sys;
      const weathericon = jsonData.weather[0].icon;
      const longitude = jsonData.coord.lon;
      const lattitude = jsonData.coord.lat;

      const objConversion = {
        temprature: temp,
        feelslike: feels_like,
        mintemp: temp_min,
        maxtemp: temp_max,
        pressure: pressure,
        humidity: humidity,
        cityname: jsonData.name,
        country,
        sunrise,
        sunset,
        weathericon,
        longitude,
        lattitude,
      };

      updateData(objConversion);
    };

    dataFetching();
  }, []);

  const recDataFromSearch = async (searchData) => {
    const fetchVar = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${searchData}&appid=aceebc76eda61735507da2b2ba35677a`
    );

    console.log(fetchVar);

    if(fetchVar.ok === true)
        {


            const jsonData = await fetchVar.json();
            const { temp, feels_like, temp_min, temp_max, pressure, humidity } =
              jsonData.main;
            const { country, sunrise, sunset } = jsonData.sys;
            const weathericon = jsonData.weather[0].icon;
        
            const longitude = jsonData.coord.lon;
            const lattitude = jsonData.coord.lat;
        
            const objConversion = {
              temprature: temp,
              feelslike: feels_like,
              mintemp: temp_min,
              maxtemp: temp_max,
              pressure: pressure,
              humidity: humidity,
              cityname: jsonData.name,
              country,
              sunrise,
              sunset,
              weathericon,
              longitude,
              lattitude,
            };
        
            updateData(objConversion);
            isTrueFun(true); 

        }
        else
        {
            isTrueFun(false)

}
  };


  const errShowFun=()=>{

    return(
        <div className="errDiv">

            <img className="errImg" src="https://img.freepik.com/free-vector/oops-404-error-with-broken-robot-concept-illustration_114360-1932.jpg?w=740&t=st=1718562088~exp=1718562688~hmac=542bee4d3b74f34127bedae92c8460e84bc76ba10021357db99272dad38a2e7d" alt="" />
            
            <h1 className="h1Err">Please Check for Spelling Error or Give Correct City Location</h1>
        </div>
    )
  }

  return (
    <div className="parenDiv">
      <div className={`firstChild ${darkmode ? "Lightmode" : "Darkmode"}`}>
        <nav className="navBar">
          <div className="timeAndDataDiv">
            <p className="hlwUser">Hello User !</p>
            <h1>
              {new Date().toLocaleDateString("default", { weekday: "long" })},{" "}
              {new Date().getDate()}{" "}
              {new Date().toLocaleString("default", { month: "long" })},{" "}
              {new Date().getFullYear()} {curentTime}
            </h1>
          </div>

          <div className="btnWithSearchDiv">
            <button
              className="bgChangeBtn"
              type="button"
              onClick={(e) => {
                darkModeToggleFun(!darkmode);
              }}
            >
              {darkmode ? (
                <CiLight size={50} />
              ) : (
                <MdDarkMode size={50} color="white" />
              )}
            </button>
            <SearchComponent recDataFromSearch={recDataFromSearch} />
          </div>
        </nav>

        <div className="cityDiv">
          {isTrue ? (<Citycard cityInfo={sampleData} />) : errShowFun()}
        </div>
      </div>
    </div>
  );
};

export default HomeFun;
