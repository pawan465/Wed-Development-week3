# Skycast Weather App

A small beginner project for practicing the DOM, JSON, and the Fetch API. It follows the Week 3 assignment: enter a city and display its current temperature, humidity, and weather condition in a clean card.

## Run it

1. Create a free API key at [OpenWeatherMap](https://openweathermap.org/api). New keys can take a little while to activate.
2. Open `script.js` and replace `YOUR_OPENWEATHERMAP_API_KEY` with your key.
3. Open `index.html` in your browser. If your browser blocks API requests from a local file, run a simple local web server from this folder (for example, `python -m http.server 8000`) and visit `http://localhost:8000`.
4. Type a city such as `London` and select **Get weather**.

## Learn it step by step

1. **HTML (`index.html`)** gives the app its search box, button, status message, and weather card. The card starts hidden.
2. **CSS (`styles.css`)** makes the page responsive and gives the results a clean card layout.
3. **Select the elements (`script.js`)**: `querySelector` finds the form, input, button, and result areas so JavaScript can use them.
4. **Listen for a search**: the form's `submit` event runs when the user presses Enter or clicks the button. `preventDefault()` stops a page reload.
5. **Fetch the data**: `getWeather()` builds a URL and `fetch()` sends it to OpenWeatherMap. `await` lets the code wait for the reply without freezing the page.
6. **Read JSON**: `response.json()` converts the reply into a JavaScript object. The API's `main`, `weather`, `sys`, and `wind` values contain the requested details.
7. **Update the DOM**: `showWeather()` writes those values into the page and reveals the card.
8. **Handle problems**: `try/catch` shows helpful messages for a missing city, inactive key, or network issue.

## Important

This front-end version puts the API key in browser code, which is suitable for a learning exercise only. Anyone can see a key in a public website. For a public deployment, move the API request to a small server and store the key there.
