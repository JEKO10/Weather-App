import React, { useEffect, useState } from "react";

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
    </>
  );
}

export default App;
