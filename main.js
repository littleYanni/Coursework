import {initHeaderButtons} from '../base/initHeadersButtons.js'
import {addDoramasCards} from "../userCards/userCards.js";

window.onload = function () {
    initHeaderButtons();
    loadMainCards();
    document.getElementById('countryFilter').addEventListener('change', (e) => {
        loadMainCards(e.target.value);
    });
};

function loadMainCards(filter = 'no-filter') {
    const urlParams = new URLSearchParams(window.location.search);
    let searchString = urlParams.get('search');
    let divDoramasCards = document.getElementById('doramasCards');
    divDoramasCards.innerText = '';
    const doramasObjects = JSON.parse(localStorage.getItem('Doramas'));
    const doramasObjectsArray = Object.values(doramasObjects);
    if (filter === 'no-filter' && searchString == null)
        addDoramasCards(divDoramasCards, doramasObjectsArray);
    else if (searchString) {
        let doramasSearchedObjectsArray = [];
        for (let item of doramasObjectsArray) {
            if (item['title'].includes(searchString))
                doramasSearchedObjectsArray.push(item);
        }
        addDoramasCards(divDoramasCards, doramasSearchedObjectsArray);
    } else {
        let doramasFilteredObjectsArray = [];
        for (let item of doramasObjectsArray) {
            if (item['country'] === filter)
                doramasFilteredObjectsArray.push(item);
        }
        addDoramasCards(divDoramasCards, doramasFilteredObjectsArray);
    }
}