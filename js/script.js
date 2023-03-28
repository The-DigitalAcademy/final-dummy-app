const navItems = ['media', 'location', 'msisdn', 'payments', 'events']
const navContainer = document.getElementById('navContainer')
let focusedNavItem = 3
const pages = document.querySelectorAll('[data-page]')


function incrimentNavFocus() {
    if (focusedNavItem >= navItems.length-1) return
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
        btn.className = `btn btn-sm small-1 mx-1 ${index == 1 ? 'btn-primary' : 'btn-secondary'}`
        btn.onclick = () => setNavFocus(navItems.indexOf(item))
        btn.innerText = item ? item : ''
        !item ? btn.style.visibility = 'hidden' : ''
        navContainer.append(btn)
    });

    renderPage(navItems[focusedNavItem])
    
}

renderNavItems()