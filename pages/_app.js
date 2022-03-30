import React, { useState } from "react";
import useStore from "./useStore";
import Image from "next/image";

const dateBuilder = (d) => {
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
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
    <><h1>Weather App</h1>
      <form
        onSubmit={(event_) => {
          event_.preventDefault();
          searchWeather(base, key, value);
          setValue("");
        }}
      >
        <Image src="https://images.unsplash.com/photo-1531324442324-909f6c0394e4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80" alt="background main" layout="fill"/>
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
        <p>What's the weather like?</p>
      )}
    </>
  );
};

export default App;

