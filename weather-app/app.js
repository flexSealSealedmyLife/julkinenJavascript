window.addEventListener('load', () => {
    let longi;
    let lati;
    let temperatureDesc = document.querySelector(".temperature-description");
    let temperatureDegree = document.querySelector(".temperature-degree");
    let locationTimezone = document.querySelector(".location-timezone");
    let temperatureWeekly = document.querySelector(".temperature-weeklydesc");


    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            longi = position.coords.longitude;
            lati = position.coords.latitude;
            const proxy = 'https://cors-anywhere.herokuapp.com/';
            const api = `${proxy}https://api.darksky.net/forecast/ee996bad11f0126c5de623c5c9bc5eb2/${lati},${longi}`;
            fetch(api)
            .then(response => {
                return response.json();
            })
            .then(data => {
                console.log(data);
                const {temperature, summary, icon} = data.currently;

                const weeklyDesc = data.daily.summary;
                temperatureDegree.textContent = ((temperature-32)*5/9).toFixed(1);
                temperatureDesc.textContent = summary;
                temperatureWeekly.textContent = weeklyDesc;
                locationTimezone.textContent = data.timezone;
                setIcons(icon, document.querySelector(".icon"));
            })
           
             
        });
    }else{
        h1.textContent = "Location needed to display weather data.";
    }

    function setIcons(icon, iconID) {
        const skycons = new Skycons({color: "white"});
        const currentIcon = icon.replace(/-/g, "_").toUpperCase();
        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon]);
    }
});