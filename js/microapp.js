var Ayoba = getAyoba()

/**
* Determine the mobile operating system and returns the
* proper javascript interface
*/
function getAyoba() {
    var userAgent = navigator.userAgent || navigator.vendor || window.opera;

    // Windows Phone must come first because its UA also contains "Android"
    if (/windows phone/i.test(userAgent)) {
        return null;
    }

    if (/android/i.test(userAgent)) {
        try {
            return Android;
        } catch (error) {
            return null;
        }
    }

    // iOS detection from: http://stackoverflow.com/a/9039885/177710
    if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
        return null; // todo
    }

    return "unknown";
}

if (Ayoba == null || Ayoba == 'unknown') {
    //Browser test Environment
    Ayoba = new AyobaStub();
} else {
    //Ayoba Environment
}

console.log(Ayoba);

// MSISDN
function getMsisdn(elementId) {
    let phoneNumber = Ayoba.getMsisdn();
    document.getElementById(elementId).value = phoneNumber
}
function getContacts(containerId) {
    const contacts = Ayoba.getContacts();
    let options = ``
    JSON.parse(contacts).forEach(contact => {
        options+= `<option value="${contact.phoneNumber}">${contact.name ? contact.name : contact.phoneNumber}</option>`
    });
    document.getElementById(containerId).innerHTML = options
}
function getAllContacts(containerId) {
    const allContacts = Ayoba.getAllContacts();
    let options = ``
    JSON.parse(allContacts).forEach(contact => {
        options+= `<option value="${contact.phoneNumber}">${contact.name ? contact.name : contact.phoneNumber}</option>`
    });
    document.getElementById(containerId).innerHTML = options
}
function getSelfJid(elementId) {
    const selfJid = Ayoba.getSelfJid();
    document.getElementById(elementId).value = selfJid
}

// LOCATION
function getCountry(elementId) {
    let countryCode = Ayoba.getCountry();
    document.getElementById(elementId).value = countryCode
}


// Profile
function getLanguage(elementId) {
    let lang = Ayoba.getLanguage();
    document.getElementById(elementId).value = lang
}

// generic events
function sendGenericEvent(numberInputId, nameInputId) {
    const number = document.getElementById(numberInputId).value
    const description = document.getElementById(nameInputId).value
    Ayoba.sendGenericEvent(number, description)
}

/**
 * closes application
 */
function closeApp() {
    try {
        Ayoba.finish()
    } catch (err) {
        console.error(err);
    }
}

//LOCATION
function UserLocation() {
    this.lon = '',
    this.lat = '',
    this.customHandler = () => {}
    this.locationChangeHandler = () => {
        this.customHandler(this.lon, this.lat)
    }

}
var myLocation = new UserLocation()
function onLocationChanged(lat, lon) {
    console.log(myLocation);
    myLocation.lon = lon
    myLocation.lat = lat
    myLocation.locationChangeHandler()
}

//PAYMENTS
function startAyobaPayment(methodId, amountId, currencyId, descriptionId) {
    const method = document.getElementById(methodId).value
    const amount = parseFloat(document.getElementById(amountId).value)
    const currency = document.getElementById(currencyId).value
    const description = document.getElementById(descriptionId).value

    const overlay = document.getElementById('input-overlay').checked
    console.log(overlay, typeof overlay);

    try {
        if (overlay === false) {
            Ayoba.startPayment(method, amount, currency, description)
        } else if (overlay === true) {
            alert(amount, currency, description)
            Ayoba.startPayment(amount, currency, description)
        }
    } catch (error) {
        alert(`error: ${error}`);        
    }

}

// ============================================================= FUNCTIONS ============================================================================

function onNicknameChanged(nickname) {
    const nameInputs = document.querySelectorAll('[data-ayoba-api="name"]');
    for (let i = 0; i < nameInputs.length; i++) {
        const inputEle = nameInputs[i];
        inputEle.value = nickname;
        inputEle.classList.remove("is-invalid");
        inputEle.classList.add("is-valid")
    }
}
function onAvatarChanged(avatar) {
    const avatarInputs = document.querySelectorAll('[data-ayoba-api="presence"]');
    for (let i = 0; i < avatarInputs.length; i++) {
        const avatarImg = avatarInputs[i];
        avatarImg.src = avatarImg.tagName.toLowerCase() == 'img' ? avatar : '';
    }
}