

window.addEventListener('load' , ()=>{ // here function will be called after the screen loads
    let long;
    let lat;

    let temperatureDescription = document.querySelector(".temperature-description");
    let temperatureDegree = document.querySelector(".temperature-degree");
    let locationTimezone = document.querySelector(".location-timezone");
    let locationIcon = document.getElementById("img-icon");
    let temperatureSection = document.querySelector('.degree-section');
    let temperatureSpan = document.querySelector('.temperature span');



    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position => {
            long= position.coords.longitude;
            lat = position.coords.latitude;

            const api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=579a56d7c538e57995344ec83941c759`;  

            fetch(api)
                .then(response => { // it just means ki api fetch hone ke badd hi kaam chalu hoga.
                    return response.json();
                })
                .then(data => {
                    console.log(data);
                    const temp = (data.main.temp)-273.15;
                    const description = data.weather[0].main;
                    const cityName = data.name;
                    const icon = data.weather[0].icon;

                    //formulla
                    let fahrenheit = temp*(9/5) + 32;

                    temperatureDegree.textContent = temp ;
                    temperatureDescription.textContent = description;
                    locationTimezone.textContent = cityName;
                    locationIcon.src = `icons/${icon}.png`;

                    //change temp unit
                    temperatureSection.addEventListener("click", () => {
                        if(temperatureSpan.textContent === '°F') {
                            temperatureSpan.textContent = "°C";
                            temperatureDegree.textContent = temp;
                        } else{
                            temperatureSpan.textContent = "°F";
                            temperatureDegree.textContent = fahrenheit;
                        }
                    })
                })
        });
        
    }
   
})


//api key = 579a56d7c538e57995344ec83941c759
