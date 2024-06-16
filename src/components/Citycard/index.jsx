import "./index.css";
import { FaTemperatureArrowDown } from "react-icons/fa6";
import { FaTemperatureArrowUp } from "react-icons/fa6";
import { FaTachometerAlt } from "react-icons/fa";
import { WiHumidity } from "react-icons/wi";
import { FaTemperatureHigh } from "react-icons/fa";
import { LiaTemperatureHighSolid } from "react-icons/lia";
// import WeatherComponent from '../Geolocation'

const Citycard = (props) => {
  const { cityInfo } = props;

  const {
    temprature,
    feelslike,
    mintemp,
    maxtemp,
    pressure,
    humidity,
    cityname,
    country,
    sunrise,
    sunset,
    weathericon,
    // longitude,
    // lattitude
  } = cityInfo;

  // Convert Unix timestamps to Date objects
  const sunriseDate = new Date(sunrise * 1000); // Multiply by 1000 to convert seconds to milliseconds
  const sunsetDate = new Date(sunset * 1000);

  function formatDate(date) {
    const options = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    };
    return date.toLocaleString("en-GB", options);
  }

  // Convert the temperature
  function convertTemperature(kelvin) {
    const celsius = kelvin - 273.15;
    const fahrenheit = ((kelvin - 273.15) * 9) / 5 + 32;

    return {
      celsius: celsius.toFixed(2), // rounding to 2 decimal places
      fahrenheit: fahrenheit.toFixed(2), // rounding to 2 decimal places
    };
  }

  // Convert the temperature
  const convertedTemps = convertTemperature(temprature);

  const minTemp = convertTemperature(mintemp);
  const maxTemp = convertTemperature(maxtemp);

  function convertPressure(hPa) {
    const atm = hPa * 0.000986923;
    const psi = hPa * 0.0145038;
    const inHg = hPa * 0.02953;

    return {
      atm: atm.toFixed(4), // rounding to 4 decimal places
      psi: psi.toFixed(4), // rounding to 4 decimal places
      inHg: inHg.toFixed(4), // rounding to 4 decimal places
    };
  }

  // Convert the pressure
  const convertedPressure = convertPressure(pressure);

  return (
    <div className="card-Parent">
      <div className="cardParentChild">
        <div className="mainDetail">
          <div className="cmnMargin">
            <div className="cmnMargin">
              <img
                src={`https://openweathermap.org/img/wn/${weathericon}.png`}
                alt={`${weathericon}`}
              />
            </div>

            <div>
              <h1>{cityname} </h1>
              <p>{country}</p>
            </div>
          </div>

          <div>
            <p>
              <span className="bolsCss">Sunrise:</span>{" "}
              {formatDate(sunriseDate)}
            </p>
            <p>
              <span className="bolsCss"> Sunset:</span> {formatDate(sunsetDate)}
            </p>
          </div>
        </div>

        <div className="citydetail">
          <p>
            <span className="bolsCss">Temprature:</span>

            <span>
              <FaTemperatureHigh />
              {convertedTemps.celsius}°C
            </span>

            <span>
              <FaTemperatureHigh />
              {convertedTemps.fahrenheit}°F
            </span>
          </p>

          <p>
            <span className="bolsCss">Feelslike: </span>{" "}
            <LiaTemperatureHighSolid /> {feelslike}
          </p>

          <p>
            <span className="bolsCss">Min-Temp:</span>

            <span>
              <FaTemperatureArrowDown />
              {minTemp.celsius}°C
            </span>

            <span>
              <FaTemperatureArrowDown />
              {minTemp.fahrenheit}°F
            </span>
          </p>

          <p>
            <span className="bolsCss">Max-Temp:</span>

            <span>
              <FaTemperatureArrowUp />
              {maxTemp.celsius}°C
            </span>

            <span>
              <FaTemperatureArrowUp />
              {maxTemp.fahrenheit}°F
            </span>
          </p>
          <p>
            <span className="bolsCss">Pressure:</span>

            <span>
              <FaTachometerAlt />
              {convertedPressure.atm} atm
            </span>

            <span>
              <FaTachometerAlt />
              {convertedPressure.psi} psi
            </span>

            <span>
              <FaTachometerAlt />
              {convertedPressure.inHg} inHg
            </span>
          </p>

          <p>
            <span className="bolsCss">Humidity:</span> <WiHumidity /> {humidity}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Citycard;
