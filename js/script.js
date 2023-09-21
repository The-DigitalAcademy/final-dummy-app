// Nav and page management
const navItems = ['profile', 'location', 'msisdn', 'payments', 'events', 'native']
const navContainer = document.getElementById('navContainer')
let focusedNavItem = 2
const pages = document.querySelectorAll('[data-page]')


function incrimentNavFocus() {
    if (focusedNavItem >= navItems.length - 1) return
    focusedNavItem++
    renderNavItems()
}
function decrementNavFocus() {
    if (focusedNavItem <= 0) return
    focusedNavItem--
    renderNavItems()
}
function setNavFocus(index) {
    focusedNavItem = index
    renderNavItems()
}
function renderPage(name) {
    for (let i = 0; i < pages.length; i++) {
        const page = pages[i];
        page.style.display = 'none'
    }
    document.querySelector(`[data-page='${name}']`).style.display = 'block'
}

function renderNavItems() {
    navContainer.innerHTML = ''

    let visibleNavItems = [navItems[focusedNavItem - 1], navItems[focusedNavItem], navItems[focusedNavItem + 1]]

    visibleNavItems.forEach((item, index) => {
        const btn = document.createElement('button')
        btn.className = `btn btn-sm fw-light mx-1 ${index == 1 ? 'btn-primary' : 'btn-secondary'}`
        btn.onclick = () => setNavFocus(navItems.indexOf(item))
        btn.innerText = item ? item : ''
        !item ? btn.style.visibility = 'hidden' : ''
        navContainer.append(btn)
    });

    renderPage(navItems[focusedNavItem])

}
renderNavItems()



// location hook
const locationLat = document.getElementById('input-lat')
const locationLon = document.getElementById('input-lon')
locationLat.style.visibility = 'hidden'
locationLon.style.visibility = 'hidden'

function showGpsLocation() {
    locationLat.style.visibility = 'visible'
    locationLon.style.visibility = 'visible'
}

function onLocationChanged(lon, lat) {
    locationLat.value = lat;
    locationLon.value = lon;
}

// nickname hook
var username = ''
function onNicknameChanged(nickname) {
    username = nickname
}
function getUsername(elementId) {
    document.getElementById(elementId).value = username
}

// avatar hook
var avatarUrl = ''
function onAvatarChanged(avatar) {
    avatarUrl = avatar
}
function getAvatar(elementId) {
    document.getElementById(elementId).src = avatarUrl
}

// payment
function toggleOverlay(e) {
    e.target.checked ? 
    document.getElementById('pay-method').style.display='none' :
    document.getElementById('pay-method').style.display='block'
}
function onPaymentStatusChanged(transactionId, paymentStatus, payError) {
    document.getElementById('transactionId').value = transactionId
    document.getElementById('paymentStatus').value = paymentStatus
    document.getElementById('payError').value = payError
}

var presence = ''
function onPresenceChanged(presenceValue) {
    presence = presenceValue
}
function getPresence(elementId) {
    document.getElementById(elementId).value = presence
}

function clickElement(selector) {
    document.querySelector(selector).click()
}

//NATIVE PAGE : USE NATIVE FEATURES
//https://www.educative.io/answers/how-to-build-an-image-preview-using-javascript-filereader
const nativeCameraImgInput = document.querySelector("#native-camera-input");
let nativeCameraInfo = document.querySelector("#native-camera-info");
let nativeCameraErrorMessage = document.querySelector("#native-camera-errorMessage");
const nativeCameraImagePreview = document.querySelector("#native-camera-preview");
nativeCameraImgInput.addEventListener("change", (e) => {
    const nativeCameraImgDetails = document.querySelector("#native-camera-input").files[0];
    if (nativeCameraImgDetails) {
        nativeCameraInfo.style.display = "block";
        document.querySelector("#native-camera-img-name").innerText = nativeCameraImgDetails.name;
        document.querySelector("#native-camera-img-type").innerText = nativeCameraImgDetails.type;
        document.querySelector("#native-camera-img-size").innerText = nativeCameraImgDetails.size + "bytes";
        previewImage(nativeCameraImgDetails);
    } else {
        nativeCameraImagePreview.src = ""
        nativeCameraErrorMessage.innerText = "Please select a picture";
        console.error("Please select a picture");
        nativeCameraInfo.style.display = "none";
    }

})

function previewImage(imgD) {
    const reader = new FileReader();
    // PREVIEW
    reader.addEventListener("load", function () {
        nativeCameraImagePreview.src = reader.result;
    })
    // CHECK IF THERE IS SELECTION 
    if (imgD) {
        // CHECK IF THE FILE IS AN IMAGE
        if (imgD.type === "image/jpeg" || imgD.type == "image/jpg" || imgD.type == "image/gif" || imgD.type == "image/png") {
            nativeCameraErrorMessage.innerText = "";

            // CONVERTS FILE TO BASE 64
            reader.readAsDataURL(imgD);
        } else {
            nativeCameraErrorMessage.innerText = "File type should be an image"
            nativeCameraImagePreview.src = "";
        }
    }
    // IF NO IMAGE
    else {
        nativeCameraImagePreview.src = ""
        nativeCameraErrorMessage.innerText = "Please select a picture";
    }
}