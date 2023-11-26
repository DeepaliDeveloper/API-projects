const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "a38c3c3af4msh44bca40303817e4p1ddd6ajsnc82c60ce89b9",
    "X-RapidAPI-Host": "weather-by-api-ninjas.p.rapidapi.com",
  },
};

async function getWeather(city) {
  const closeId = document.getElementById("nocty");
  cityName.innerHTML = city;

  const response = await fetch(
    "https://weather-by-api-ninjas.p.rapidapi.com/v1/weather?city=" + city,
    options
  );

  if (response.ok) {
    closeId.style.display = "none";
    var weatherImg = document.getElementById("weatherImg");

    const res = await response.json();

    if (res.temp <= 20) {
      weatherImg.src = "images/cold.png";
    } else if (res.temp >= 20 && res.temp <= 25) {
      weatherImg.src = "images/heavyrain.png";
    } else if (res.temp >= 25 && res.temp <= 30) {
      weatherImg.src = "images/cloudy.png";
    } else if (res.temp >= 30 && res.temp <= 35) {
      weatherImg.src = "images/halfsun.png";
    } else if (res.temp >= 35 && res.temp <= 40) {
      weatherImg.src = "images/sunny.png";
    } else if (res.temp >= 40) {
      weatherImg.src = "images/veryHotSun.png";
    }

    // cloud_pct.innerHTML = res.cloud_pct;
    temp.innerHTML = res.temp;
    feels_like.innerHTML = res.feels_like;
    humidity.innerHTML = res.humidity;
    min_temp.innerHTML = res.min_temp;
    max_temp.innerHTML = res.max_temp;
    wind_speed.innerHTML = res.wind_speed;
    wind_degrees.innerHTML = res.wind_degrees;
    sunrise.innerHTML = res.sunrise;
    sunset.innerHTML = res.sunset;
  } else {
    closeId.style.display = "block";
    temp.innerHTML = "0";
    feels_like.innerHTML = "0";
    humidity.innerHTML = "0";
    min_temp.innerHTML = "0";
    max_temp.innerHTML = "0";
    wind_speed.innerHTML = "0";
    wind_degrees.innerHTML = "0";
    sunrise.innerHTML = "0";
    sunset.innerHTML = "0";
  }
}

submit.addEventListener("click", (e) => {
  e.preventDefault();
  getWeather(city.value);
});

document.addEventListener("DOMContentLoaded", function () {
  const ar = ["Shanghai", "Bostan", "Lucknow", "Kolkata"];
  // const data =[];
  for (var i = 0; i < ar.length; i++) {
    const city = ar[i];
    calcWeather(city, i);
  }
});

async function calcWeather(city, i) {
  let data = await getWeatherReportForCommanPlaces(city);
  document.getElementById("temp" + i).innerHTML = data[0];
  document.getElementById("feels_like" + i).innerHTML = data[1];
  document.getElementById("humidity" + i).innerHTML = data[2];
  document.getElementById("min_temp" + i).innerHTML = data[3];
  document.getElementById("max_temp" + i).innerHTML = data[4];
  document.getElementById("wind_speed" + i).innerHTML = data[5];
  document.getElementById("wind_degrees" + i).innerHTML = data[6];
  document.getElementById("sunrise" + i).innerHTML = data[7];
  document.getElementById("sunset" + i).innerHTML = data[8];
  return data;
}

async function getWeatherReportForCommanPlaces(city) {
  const data = [];
  const response = await fetch(
    "https://weather-by-api-ninjas.p.rapidapi.com/v1/weather?city=" + city,
    options
  );

  if (response.ok) {
    const res = await response.json();
    data.push(
      res.temp,
      res.feels_like,
      res.humidity,
      res.min_temp,
      res.max_temp,
      res.wind_speed,
      res.wind_degrees,
      res.sunrise,
      res.sunset
    );
  }
  return data;
}
