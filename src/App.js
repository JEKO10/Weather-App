import React, { useEffect, useState } from "react";
import { BiSun, BiWind } from "react-icons/bi";
import { FiSunrise, FiSunset } from "react-icons/fi";
import { WiCloudy } from "react-icons/wi";
import { RiDrizzleLine, RiFoggyLine, RiSnowyLine } from "react-icons/ri";
import { IoRainyOutline, IoThunderstormOutline } from "react-icons/io5";

const api = {
  key: "30eb85b09f9584e4d9c77aee8b3aaf05",
  base: "https://api.openweathermap.org/data/2.5/",
};

function App() {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState([]);
  const inputFocus = React.useRef(null);

  const fetchData = async () => {
    try {
      const response = await fetch(
        `${api.base}weather?q=${query}&appid=${api.key}`
      );
      const data = await response.json();
      setWeather(data);
      console.log(data);
    } catch (err) {
      throw err;
    }
  };

  useEffect(() => {
    inputFocus.current.focus();
  }, []);

  const today = new Date();
  const day = today.getDate();
  const month = today.getMonth();
  const year = today.getFullYear();

  return (
    <>
      <section className="search">
        <input
          type="text"
          placeholder="Search..."
          onChange={(e) => {
            setQuery(e.target.value);
          }}
          value={query}
          ref={inputFocus}
        />
        <button
          type="submit"
          onClick={(e) => {
            e.preventDefault();
            fetchData();
            setQuery("");
          }}
        >
          SUBMIT
        </button>
        <p id="date">{day + "/" + month + "/" + year}</p>
      </section>
      {weather.cod === "404" || weather.cod === "400" ? (
        <p className="noCity">{weather.message}</p>
      ) : (
        ""
      )}
      {typeof weather.main != "undefined" ? (
        <section className="weather">
          <p className="city">
            {weather.name}, {weather.sys.country}
          </p>
          <h1 id="icon">
            {weather.weather[0].main === "Clear" ? (
              <BiSun id="sun" />
            ) : weather.weather[0].main === "Thunderstorm" ? (
              <IoThunderstormOutline id="thunder" />
            ) : weather.weather[0].main === "Drizzle" ? (
              <RiDrizzleLine id="thunder" />
            ) : weather.weather[0].main === "Rain" ? (
              <IoRainyOutline id="thunder" />
            ) : weather.weather[0].main === "Snow" ? (
              <RiSnowyLine id="thunder" />
            ) : weather.weather[0].main === "Clouds" ? (
              <WiCloudy id="cloud" />
            ) : (
              <RiFoggyLine id="fog" />
            )}
          </h1>
          <div className="main">
            <p>{weather.weather[0].description}</p>
            <p>Mainly through day: {weather.weather[0].main}</p>
          </div>
          <p className="wind">
            Wind speed: {weather.wind.speed}
            <BiWind id="wind" />
          </p>
          <div className="zenit">
            <div>
              <h5>Sunrise</h5>
              <p className="para">
                <FiSunrise id="sun" />
                {new Date(weather.sys.sunrise * 1000)
                  .toUTCString()
                  .slice(16, 22)}
              </p>
            </div>
            <div>
              <h5>Sunset</h5>
              <p className="para">
                <FiSunset id="sun" />
                {new Date(weather.sys.sunset * 1000)
                  .toUTCString()
                  .slice(16, 22)}
              </p>
            </div>
          </div>
        </section>
      ) : (
        ""
      )}
    </>
  );
}

export default App;
