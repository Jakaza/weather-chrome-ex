
const APK_KEY = 'ac5587e23267ee787e4d451fefd6d82a';
const weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];


const windEl = document.querySelector('.wind');
const huminityEl = document.querySelector('.huminity');
const pressureEl = document.querySelector('.pressure');
const cityEl = document.querySelector('.cityName');
const dateEl = document.querySelector('.day');
const timeEl = document.querySelector('.time');
const loaderEl = document.querySelector('.loader');
const reloadPageEl = document.querySelector('.reload-page');

const options = {
    enableHighAccuracy: true,
    timeout: 50000,
    maximumAge: 0
};

(function () {
    // loaderEl.classList.toggle('hide');
    displayCurrentDay();
    setInterval(displayCurrentTime, 1000)
}())


function success(pos) {
    console.log(pos);
    const { latitude, longitude } = pos.coords;
    const http = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${APK_KEY}`;

    fetch(http)
        .then(response => response.json())
        .then(data => {
            reloadPageEl.style.display = "none";
            loaderEl.classList.toggle('hide');
            display(data);
        })
        .catch(err => {
            console.log(err);
        })
}

function display(data) {
    const cityName = data.name;
    const { feels_like, humidity, pressure, temp, temp_max, temp_min } = data.main;
    // const { description, main } = data.weather[0];
    const { deg, speed } = data.wind;

    cityEl.innerHTML = cityName;
    pressureEl.textContent = pressure;
    windEl.textContent = deg + '/' + speed;
    huminityEl.textContent = humidity;
}


function displayCurrentTime() {
    const currentDate = new Date()
    const getHour = currentDate.getHours()
    const getMinute = currentDate.getMinutes()
    const getSecond = currentDate.getSeconds()
    const createTime = getHour + ':' + getMinute + ':' + getSecond;
    timeEl.innerHTML = createTime;
}
function displayCurrentDay() {
    const currentDate = new Date()
    const weekDay = weekdays[parseInt(currentDate.getDay())]
    const day = weekDay;
    dateEl.innerHTML = day;
}

function displayLoading() {

}


function error(err) {
    reloadPageEl.style.display = "block";
    document.querySelector('.error-message').innerHTML = err.message;
    console.log();
    // console.warn(`ERROR(${err.code}): ${err.message}`);
}

navigator.geolocation.getCurrentPosition(success, error, options);

const reloadButton = document.getElementById('reload');

reloadButton.addEventListener('click', function () {
    navigator.geolocation.getCurrentPosition(success, error, options);
})
