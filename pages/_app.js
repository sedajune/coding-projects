import React, { useState } from "react";
import useStore from "./useStore";

const dateBuilder = (d) => {
  let months = [
    "Januar",
    "Februar",
    "März",
    "April",
    "Mai",
    "Juni",
    "Juli",
    "August",
    "September",
    "Oktober",
    "November",
    "Dezember"
  ];
  let days = [
    "Sonntag",
    "Montag",
    "Dienstag",
    "Mittwoch",
    "Donnerstag",
    "Freitag",
    "Samstag"
  ];

  let day = days[d.getDay()];
  let date = d.getDate();
  let month = months[d.getMonth()];
  let year = d.getFullYear();

  return `${day} ${date} ${month} ${year}`;
};

 

const App = () => {
 
  const key = process.env.NEXT_PUBLIC_WEATHER_KEY;

  const [value, setValue] = useState("");
  const base = useStore((state) => state.base);
  const searchWeather = useStore((state) => state.searchWeather);
  const weather = useStore((state) => state.weather);

  return (
    <><h1>What's the weather like?</h1>
      <form
        onSubmit={(event_) => {
          event_.preventDefault();
          searchWeather(base, key, value);
          setValue("");
        }}
      >
        <input
          type="text"
          placeholder="46011, Valencia, Spain"
          value={value}
          onChange={(event_) => {
            setValue(event_.target.value);
          }}
        />
        <button type="submit">submit</button>
      </form>
      {weather ? (
        <>
          <p>Date: {dateBuilder(new Date())}</p>
          <p>
            Location: {weather.name}, {weather.sys.country}
          </p>
          <p>Temperature: {weather.main.temp} Celsius</p>
          <p>
            Conditions: {weather.weather[0].main},{" "}
            {weather.weather[0].description}
          </p>
        </>
      ) : (
        <p>Where are you now?</p>
      )}
    </>
  );
};

export default App;

