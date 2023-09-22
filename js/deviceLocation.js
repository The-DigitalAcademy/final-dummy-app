
const nativeDeviceInputLat = document.querySelector("#native-device-input-lat")
const nativeDeviceInputLon = document.querySelector("#native-device-input-lon")
const errorMessage = document.querySelector("#native-device-location-error")

const options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
};

function getNativeDeviceLocation() {
    let geolocation = navigator.geolocation;
    if (geolocation) {
        geolocation.getCurrentPosition(onGeoSuccess, onGeoError, options);
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}

function onGeoSuccess(position) {
    nativeDeviceInputLat.value = position.coords.latitude;
    nativeDeviceInputLon.value = position.coords.longitude;
}

function onGeoError(error) {
    let detailError;

    if (error.code === error.PERMISSION_DENIED) {
        detailError = "User denied the request for Geolocation.";
    }
    else if (error.code === error.POSITION_UNAVAILABLE) {
        detailError = "Location information is unavailable.";
    }
    else if (error.code === error.TIMEOUT) {
        detailError = "The request to get user location timed out."
    }
    else if (error.code === error.UNKNOWN_ERROR) {
        detailError = "An unknown error occurred."
    }

    errorMessage.innerHTML = `Error: ${detailError}`;
}