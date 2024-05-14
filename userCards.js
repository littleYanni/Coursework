import {initHeaderButtons} from '../base/initHeadersButtons.js'

window.onload = function () {
    initHeaderButtons();
    loadUserCards();
};


function loadUserCards() {
    const mappingPage = {
        'watched': 'Просмотрено',
        'watch': 'Смотрю',
        'stopWatched': 'Брошено',
    }
    const urlParams = new URLSearchParams(window.location.search);
    const type = urlParams.get('type');
    if (!mappingPage[type]) {
        alert("Такого типа нет!!!");
        window.location = '../main_v2/main.html';
    }
    const typeTitle = document.getElementById('typeTitle');
    typeTitle.innerText = mappingPage[type];

    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const doramasObjects = currentUser[type];
    if (!doramasObjects) {
        alert("Такого типа нет!!!");
        window.location = '../main_v2/main.html';
    }
    const doramasObjectsArray = Object.values(doramasObjects);
    let divUserCards = document.getElementById('userCards');
    addDoramasCards(divUserCards, doramasObjectsArray);
}


export const addDoramasCards = (divTag, doramasObjectsArray) => {
    let countOfLines = Math.ceil(doramasObjectsArray.length / 4);
    for (let i = 0; i < countOfLines; i++) {
        let ulTag = document.createElement('ul');
        ulTag.className = 'cards';
        let cardsInLine = 4;
        if (i + 1 === countOfLines && doramasObjectsArray.length % 4 !== 0)
            cardsInLine = doramasObjectsArray.length % 4;

        for (let j = 0; j < cardsInLine; j++) {
            let liTag = document.createElement('li');

            let aTag = document.createElement('a');
            aTag.className = 'card';
            aTag.addEventListener('click', () => {
                console.log(`../detailPage/detailPage.html?id=${doramasObjectsArray[i * 4 + j]['id']}`);
                window.location = `../detailPage/detailPage.html?id=${doramasObjectsArray[i * 4 + j]['id']}`;
            })

            let imgTag = document.createElement('img');
            imgTag.className = 'card__image';
            imgTag.src = doramasObjectsArray[i * 4 + j]['img'];
            imgTag.setAttribute('alt', doramasObjectsArray[i * 4 + j]['title']);
            aTag.appendChild(imgTag);

            let divOverlayTag = document.createElement('div');
            divOverlayTag.className = 'card__overlay';

            let divHeaderTag = document.createElement('div');
            divHeaderTag.className = 'card__header';

            let svgTag = document.createElement('svg');
            svgTag.className = 'card__arc';
            svgTag.setAttribute('xmlns', 'http://www.w3.org/2000/svg');

            let pathTag = document.createElement('path');
            svgTag.appendChild(pathTag);
            divHeaderTag.appendChild(svgTag);

            let divHeaderTextTag = document.createElement('div');
            divHeaderTextTag.className = 'card__header-text';

            let h3Tag = document.createElement('h3');
            h3Tag.className = 'card__title';
            h3Tag.innerText = doramasObjectsArray[i * 4 + j]['title'];
            divHeaderTextTag.appendChild(h3Tag);

            let spanTag = document.createElement('span');
            spanTag.className = 'card__status';
            spanTag.innerText = doramasObjectsArray[i * 4 + j]['genres'].join();
            divHeaderTextTag.appendChild(spanTag)

            divHeaderTag.appendChild(divHeaderTextTag);
            divOverlayTag.appendChild(divHeaderTag);

            let pTag = document.createElement('p');
            pTag.className = 'card__description';
            pTag.innerText = doramasObjectsArray[i * 4 + j]['description'];

            divOverlayTag.appendChild(pTag);
            aTag.appendChild(divOverlayTag);
            liTag.appendChild(aTag);
            ulTag.appendChild(liTag);
        }
        divTag.appendChild(ulTag);
    }
}
