import create from "zustand";
import axios from "axios";

const useStore = create((set) => {
  return {
    base: "https://api.openweathermap.org/data/2.5/",
    weather: false,
    searchWeather: async (base, key, query) => {
      console.log("fetching weather api");
      const response = await axios.get(
        `${base}weather?q=${query}&units=metric&APPID=${key}`
      );
      const result = response.data;
      console.log("Weather Fetch", query, result);
      set(() => ({ weather: result }));
    }
  };
});

export default useStore;
