// Step 1: Get an API key from https://openweathermap.org/api and paste it below.
// Keep this key private. A browser-only demo is fine for learning, but use a
// server to protect the key before publishing a real app.
const API_KEY = "YOUR_OPENWEATHERMAP_API_KEY";

// Step 2: Connect the HTML elements that JavaScript will update.
const form = document.querySelector("#weather-form");
const cityInput = document.querySelector("#city-input");
const searchButton = document.querySelector("#search-button");
const statusMessage = document.querySelector("#status-message");
const result = document.querySelector("#weather-result");

// Step 3: When the form is submitted, look up that city.
form.addEventListener("submit", (event) => {
  event.preventDefault(); // Keep the browser from reloading the page.
  getWeather(cityInput.value.trim());
});

async function getWeather(city) {
  if (!city) {
    showMessage("Please enter a city name.", "error");
    return;
  }

  if (API_KEY === "YOUR_OPENWEATHERMAP_API_KEY") {
    showMessage("Add your OpenWeatherMap API key in script.js to get started.", "error");
    result.hidden = true;
    return;
  }

  // Step 4: Fetch asks the OpenWeatherMap server for the city's current weather.
  const url = new URL("https://api.openweathermap.org/data/2.5/weather");
  url.search = new URLSearchParams({ q: city, appid: API_KEY, units: "metric" });

  searchButton.disabled = true;
  showMessage("Finding the latest weather...", "loading");
  result.hidden = true;

  try {
    const response = await fetch(url);

    // Step 5: A non-OK response means the city or API request had a problem.
    if (!response.ok) {
      const errorData = await response.json();
      if (response.status === 404) throw new Error("We couldn't find that city. Check the spelling and try again.");
      if (response.status === 401) throw new Error("That API key is not active yet. Check your key and try again later.");
      throw new Error(errorData.message || "Weather data is unavailable right now.");
    }

    // Step 6: JSON turns the server's response into a JavaScript object.
    const weather = await response.json();

    // Step 7: Put the values from that object into the page (the DOM).
    showWeather(weather);
    showMessage("Weather updated successfully.", "");
  } catch (error) {
    showMessage(error.message || "Could not connect. Please check your internet and try again.", "error");
  } finally {
    searchButton.disabled = false;
  }
}

function showWeather(weather) {
  const condition = weather.weather[0];
  const iconByCondition = {
    Clear: "☀", Clouds: "☁", Rain: "☂", Drizzle: "☂",
    Thunderstorm: "ϟ", Snow: "❄", Mist: "≋", Smoke: "≋",
    Haze: "≋", Dust: "≋", Fog: "≋", Sand: "≋", Ash: "≋", Squall: "≋", Tornado: "≋"
  };

  document.querySelector("#location-name").textContent = `${weather.name}, ${weather.sys.country}`;
  document.querySelector("#local-date").textContent = new Intl.DateTimeFormat(undefined, {
    weekday: "long", month: "long", day: "numeric"
  }).format(new Date());
  document.querySelector("#weather-symbol").textContent = iconByCondition[condition.main] || "☀";
  document.querySelector("#temperature").textContent = Math.round(weather.main.temp);
  document.querySelector("#condition").textContent = condition.description;
  document.querySelector("#humidity").textContent = `${weather.main.humidity}%`;
  document.querySelector("#wind-speed").textContent = `${weather.wind.speed} m/s`;
  document.querySelector("#updated-at").textContent = `Updated at ${new Intl.DateTimeFormat(undefined, { hour: "numeric", minute: "2-digit" }).format(new Date())}`;
  result.hidden = false;
}

function showMessage(message, type) {
  statusMessage.textContent = message;
  statusMessage.className = `status-message ${type}`;
}
