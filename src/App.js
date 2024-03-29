import React, { useState } from "react";
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
  const [unit, setUnit] = useState("");

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

  const today = new Date();
  const day = today.getDate();
  const month = today.getMonth() + 1;
  const year = today.getFullYear();

  return (
    <>
      {typeof weather.main != "undefined" && weather.main.temp > 293
        ? document.body.classList.remove("cold") ||
          document.body.classList.add("hot")
        : typeof weather.main != "undefined" && weather.main.temp < 283
        ? document.body.classList.remove("hot") ||
          document.body.classList.add("cold")
        : typeof weather.main != "undefined" && weather.main.temp < 293
        ? (document.body.className = "")
        : ""}
      {weather.cod === "404" || weather.cod === "400"
        ? (document.body.className = "")
        : ""}
      <section className="search">
        <div className="first">
          <div>
            <input
              type="text"
              placeholder="Search..."
              onChange={(e) => {
                setQuery(e.target.value);
              }}
              value={query}
              autoFocus
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  fetchData();
                  setQuery("");
                }
              }}
            />
            <button
              type="submit"
              onClick={() => {
                fetchData();
                setQuery("");
              }}
            >
              SUBMIT
            </button>
          </div>
          <p id="date">{day + "/" + month + "/" + year}</p>
        </div>
        <select
          name="units"
          className="units"
          onChange={(e) => {
            if (e.target.value === "celsius" || "kelvin" || "fahrenheit") {
              setUnit(e.target.value);
            }
          }}
        >
          <option value="kelvin">Kelvin</option>
          <option value="celsius">Celsius</option>
          <option value="fahrenheit">Fahrenheit</option>
        </select>
        <p id="smallDate">{day + "/" + month + "/" + year}</p>
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
          <div className="temp">
            <p id="temp">
              {unit === "celsius"
                ? "Temperature: " +
                  (weather.main.temp - 273.15).toString().slice(0, 4) +
                  "°C"
                : unit === "fahrenheit"
                ? "Temperature: " +
                  (weather.main.temp * (9 / 5) - 459.67)
                    .toString()
                    .slice(0, 5) +
                  "°F"
                : "Temperature: " + weather.main.temp + "K"}
            </p>
            <div>
              <p id="min">
                {unit === "celsius"
                  ? "Min: " +
                    (weather.main.temp_min - 273.15).toString().slice(0, 4) +
                    "°C"
                  : unit === "fahrenheit"
                  ? "Min: " +
                    (weather.main.temp_min * (9 / 5) - 459.67)
                      .toString()
                      .slice(0, 5) +
                    "°F"
                  : "Min: " + weather.main.temp_min + "K"}
              </p>
              <p id="max">
                {unit === "celsius"
                  ? "Max: " +
                    (weather.main.temp_max - 273.15).toString().slice(0, 4) +
                    "°C"
                  : unit === "fahrenheit"
                  ? "Max: " +
                    (weather.main.temp_max * (9 / 5) - 459.67)
                      .toString()
                      .slice(0, 5) +
                    "°F"
                  : "Max: " + weather.main.temp_max + "K"}
              </p>
            </div>
          </div>
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
