import React, { useEffect, useState } from "react";

const api = {
  key: "30eb85b09f9584e4d9c77aee8b3aaf05",
  base: "https://api.openweathermap.org/data/2.5/",
};

function App() {
  const [weather, setWeather] = useState([]);

  const fetchData = async () => {
    try {
      const response = await fetch(
        `${api.base}weather?q=London&appid=${api.key}`
      );
      const data = await response.json();
      setWeather(data);
      console.log(data);
    } catch (err) {
      throw err;
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="App">
      <h1></h1>
    </div>
  );
}

export default App;
