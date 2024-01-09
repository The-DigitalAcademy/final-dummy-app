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
// locationLat.style.visibility = 'hidden'
// locationLon.style.visibility = 'hidden'

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
    getUsername('input-username');
}
function getUsername(elementId) {
    try {
        document.getElementById(elementId).value = username
    } catch (error) {
        console.log(error);
    }

}

// avatar hook
var avatarUrl = ''
function onAvatarChanged(avatar) {
    avatarUrl = avatar
    getAvatar('input-avatar');
}
function getAvatar(elementId) {
    try {
        document.getElementById(elementId).src = avatarUrl
    } catch (error) {
        console.log(error);
    }
}

// payment
function toggleOverlay(e) {
    e.target.checked ?
        document.getElementById('pay-method').style.display = 'none' :
        document.getElementById('pay-method').style.display = 'block'
}
function onPaymentStatusChanged(transactionId, paymentStatus, payError) {
    document.getElementById('transactionId').value = transactionId
    document.getElementById('paymentStatus').value = paymentStatus
    document.getElementById('payError').value = payError
}

var presence = ''
function onPresenceChanged(presenceValue) {
    presence = presenceValue
    getPresence('input-presence')
}
function getPresence(elementId) {
    try {
        document.getElementById(elementId).value = presence
    } catch (error) {
        console.log(error);
    }
}

function clickElement(selector) {
    document.querySelector(selector).click()
}

//NATIVE PAGE : USE NATIVE FEATURES
//FILE UPLOAD
const nativeFileUploadInput = document.querySelector("#native-file-upload-input");
let nativeFileUploadInfo = document.querySelector("#native-file-upload-info");
let nativeFileUploadErrorMessage = document.querySelector("#native-file-upload-errorMessage");
const nativeFileUploadPreview = document.querySelector("#native-file-upload-preview");
nativeFileUploadInput.addEventListener("change", (e) => {
    const nativeFileUploadgDetails = document.querySelector("#native-file-upload-input").files[0];
    if (nativeFileUploadgDetails) {
        nativeFileUploadInfo.style.display = "block";
        document.querySelector("#native-file-upload-name").innerText = nativeFileUploadgDetails.name;
        document.querySelector("#native-file-upload-type").innerText = nativeFileUploadgDetails.type;
        document.querySelector("#native-file-upload-size").innerText = nativeFileUploadgDetails.size + "bytes";
        previewImage(nativeFileUploadgDetails,
            [""],
            nativeFileUploadErrorMessage, nativeFileUploadPreview);
    } else {
        nativeFileUploadPreview.src = ""
        nativeFileUploadErrorMessage.innerText = "Please select a file";
        nativeFileUploadInfo.style.display = "none";
    }

})
//IMAGE UPLOAD
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
        previewImage(nativeCameraImgDetails,
            ["image/jpeg", "image/jpg", "image/gif", "image/png"],
            nativeCameraErrorMessage, nativeCameraImagePreview);
    } else {
        nativeCameraImagePreview.src = ""
        nativeCameraErrorMessage.innerText = "Please select a picture";
        nativeCameraInfo.style.display = "none";
    }

})

function previewImage(fileData, typeList, errElement, previewElement) {
    const reader = new FileReader();
    // PREVIEW
    reader.addEventListener("load", function () {
        if (reader.result.includes('image')) {
            previewElement.src = reader.result;
        }
    })

    // CHECK IF THERE IS SELECTION 
    if (fileData) {
        // CHECK IF THE FILE IS AN IMAGE
        if (typeList.some(val => fileData.type)) {
            errElement.innerText = "";

            // CONVERTS FILE TO BASE 64
            reader.readAsDataURL(fileData);
        } else {
            errElement.innerText = "File type should be an image"
            previewElement.src = "";
        }
    }
    // IF NO IMAGE
    else {
        previewElement.src = ""
        errElement.innerText = "Please select a picture";
    }
}

// ORIENTATION DETECTION
if (window.orientation === 0 || window.orientation === 180) {
    document.getElementById('orientation-btn').innerText = "Portrait Mode"
} else {
    document.getElementById('orientation-btn').innerText = "Landscape Mode";
}

// Listen for orientation changes
window.addEventListener('orientationchange', function () {
    if (window.orientation === 0 || window.orientation === 180) {
        document.getElementById('orientation-btn').innerText = "Portrait Mode";
    } else {
        document.getElementById('orientation-btn').innerText = "Landscape Mode";
    }
});