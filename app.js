
const APK_KEY = 'ac5587e23267ee787e4d451fefd6d82a';


// console.log(navigator.geolocation);

const options = {
    enableHighAccuracy: true,
    timeout: 50000,
    maximumAge: 0
  };


async function success(pos){
    console.log('Get Location....');

    const http = "";






}

function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
}

navigator.geolocation.getCurrentPosition(success , error, options );

