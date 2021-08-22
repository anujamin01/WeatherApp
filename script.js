let weather = {
  "apiKey": "376bf5c3fccc6aaf0c921f225eade888",
  fetchWeather: function(city){
    fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=" + this.apiKey
    )
    .then((response) => response.json())
    .then((data) => this.displayWeather(data));
  },

  displayWeather: function(data){
    const {name} = data;
    const {icon, description} = data.weather[0];
    const {temp,humidity} = data.main;
    const {speed} = data.wind;
    // console.log(name,icon,description,temp,humidity,speed);
    document.querySelector(".city").innerText = "Weather in " + name;
    document.querySelector(".icon").src =
      "https://openweathermap.org/img/wn/" + icon + ".png";
    document.querySelector(".description").innerText = description;
    document.querySelector(".temp").innerText = temp + "°F";
    document.querySelector(".humidity").innerText = "Humidity: " + humidity + "%";
    document.querySelector(".wind").innerText = "Wind Speed: "+ speed + " mph";
    document.querySelector(".weather").classList.remove("loading");
    document.body.style.backgroundImage = 
      "url('https://source.unsplash.com/1600x900/?" + name + "')";
  },
  search: function () {
    this.fetchWeather(document.querySelector(".searchbar").value);
  },
};


document.querySelector(".search button").addEventListener("click", function(){
  weather.search();
});

document.querySelector(".searchbar")
.addEventListener("keyup", function(event){
  if(event.key == "Enter"){
    weather.search();
  }
});

let current = {
  getCurrent: function(){
    fetch(
      "http://www.geoplugin.net/json.gp"
    ).then((results) => results.json())
    .then((data) => this.getCurrentHelper(data));
  },
  
  getCurrentHelper: function(data){
    //console.log(data.geoplugin_city);
    weather.fetchWeather(data.geoplugin_city);
  }
  
};
current.getCurrent();
