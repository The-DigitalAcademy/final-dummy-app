// Nav and page management
const navItems = ['profile', 'location', 'msisdn', 'payments', 'events']
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