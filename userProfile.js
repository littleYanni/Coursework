import {initHeaderButtons} from '../base/initHeadersButtons.js'

window.onload = function () {
    initHeaderButtons(true);
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    document.getElementById('nameInput').value = currentUser['name'];
    document.getElementById('emailInput').value = currentUser['email'];
    document.getElementById('updateButton').addEventListener('click', (e) => {
        e.preventDefault();
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        let users = JSON.parse(localStorage.getItem('Users'));
        delete users[currentUser['email']];
        currentUser['email'] = document.getElementById('emailInput').value;
        currentUser['name'] = document.getElementById('nameInput').value;
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        localStorage.setItem('Users', JSON.stringify(Object.assign({}, users, {[currentUser['email']]: currentUser})));
    });
    let buttonsDivTag = document.getElementById('buttons');
    const mappingPage = {
        'Просмотрено': {'type': 'watched', 'url': '../userCards/userCards.html?type=watched'},
        'Смотрю': {'type': 'watch', 'url': '../userCards/userCards.html?type=watch'},
        'Брошено': {'type': 'stopWatched', 'url': '../userCards/userCards.html?type=stopWatched'},
    }

    for (const [key, value] of Object.entries(mappingPage)) {
        let buttonTag = document.createElement('button');
        buttonTag.className = 'button-28';
        buttonTag.setAttribute('role', 'button');
        buttonTag.innerText = key;

        buttonTag.addEventListener('click', () => {
            window.location = value['url'];
        })
        buttonsDivTag.appendChild(buttonTag);
    }
};
