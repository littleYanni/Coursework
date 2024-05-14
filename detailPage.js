import {initHeaderButtons} from '../base/initHeadersButtons.js'

window.onload = function () {
    initHeaderButtons();
    loadDetailCards();
};

function loadDetailCards() {
    const urlParams = new URLSearchParams(window.location.search);
    const doramaId = urlParams.get('id');
    if (!doramaId) {
        alert("Такой дорамы нет!!!");
        window.location = '../main_v2/main.html';
    }

    let divMainBody = document.getElementById('mainBody');
    const doramasObjects = JSON.parse(localStorage.getItem('Doramas'));
    const dorama = doramasObjects[doramaId];
    if (!dorama) {
        alert("Такой дорамы нет!!!");
        window.location = '../main_v2/main.html';
    }
    addDoramaCardToDiv(dorama, divMainBody, true);
}

export const addDoramaCardToDiv = (object, divTag, isDetail = false) => {
    let articleTag = document.createElement('article');
    articleTag.className = 'cta';

    let imgTag = document.createElement('img');
    imgTag.src = object['img'];
    imgTag.alt = object['title'];
    if (!isDetail)
        imgTag.addEventListener('click', () => {
            window.location = `../detailPage/detailPage.html?id=${object['id']}`;
        })
    articleTag.appendChild(imgTag);

    if (isDetail) {
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        const mappingPage = {
            'Просмотрено': 'watched',
            'Смотрю': 'watch',
            'Брошено': 'stopWatched',
        }
        let buttonsDivTag = document.createElement('div');
        buttonsDivTag.id = 'buttons';

        for (const [key, value] of Object.entries(mappingPage)) {
            let buttonTag = document.createElement('button');
            buttonTag.className = 'button-28';
            buttonTag.setAttribute('role', 'button');
            if (currentUser[value][object['id']])
                buttonTag.innerText = `Удалить из ${key}`;
            else
                buttonTag.innerText = `Добавить в ${key}`;

            buttonTag.addEventListener('click', () => {
                let currentUserInButton = JSON.parse(localStorage.getItem('currentUser'));
                let users = JSON.parse(localStorage.getItem('Users'));
                if (currentUserInButton[value][object['id']]){
                    delete currentUserInButton[value][object['id']]
                    users[currentUserInButton['email']] = currentUserInButton;
                    localStorage.setItem('currentUser', JSON.stringify(currentUserInButton));
                    localStorage.setItem('Users', JSON.stringify(users));
                    buttonTag.innerText = `Добавить в ${key}`;
                }
                else {
                    currentUserInButton[value][object['id']] = object;
                    users[currentUserInButton['email']] = currentUserInButton;
                    localStorage.setItem('currentUser', JSON.stringify(currentUserInButton));
                    localStorage.setItem('Users', JSON.stringify(users));
                    buttonTag.innerText = `Удалить из ${key}`;
                }
            })
            buttonsDivTag.appendChild(buttonTag);
        }
        articleTag.appendChild(buttonsDivTag);
    }

    let textDataDivTag = document.createElement('div');
    textDataDivTag.className = 'cta__text-column';

    let h2Tag = document.createElement('h2');
    h2Tag.innerText = object['title'];
    if (!isDetail)
        h2Tag.addEventListener('click', () => {
            window.location = `../detailPage/detailPage.html?id=${object['id']}`;
        })
    textDataDivTag.appendChild(h2Tag);

    let genresDivTag = document.createElement('div');
    genresDivTag.className = 'labelData'
    let genresP1Tag = document.createElement('p');
    genresP1Tag.innerText = 'Жaнр: '
    let genresP2Tag = document.createElement('p');
    genresP2Tag.innerText = object['genres'].join();
    genresDivTag.appendChild(genresP1Tag);
    genresDivTag.appendChild(genresP2Tag);
    textDataDivTag.appendChild(genresDivTag);

    let countryDivTag = document.createElement('div');
    countryDivTag.className = 'labelData'
    let countryP1Tag = document.createElement('p');
    countryP1Tag.innerText = 'Страна: '
    let countryP2Tag = document.createElement('p');
    countryP2Tag.innerText = object['country'];
    countryDivTag.appendChild(countryP1Tag);
    countryDivTag.appendChild(countryP2Tag);
    textDataDivTag.appendChild(countryDivTag);

    let yearDivTag = document.createElement('div');
    yearDivTag.className = 'labelData'
    let yearP1Tag = document.createElement('p');
    yearP1Tag.innerText = 'Год: '
    let yearP2Tag = document.createElement('p');
    yearP2Tag.innerText = object['year'];
    yearDivTag.appendChild(yearP1Tag);
    yearDivTag.appendChild(yearP2Tag);
    textDataDivTag.appendChild(yearDivTag);

    if (isDetail) {
        let descriptionDivTag = document.createElement('div');
        descriptionDivTag.className = 'labelData'
        let descriptionP1Tag = document.createElement('p');
        descriptionP1Tag.innerText = object['description'];
        descriptionDivTag.appendChild(descriptionP1Tag);
        textDataDivTag.appendChild(descriptionDivTag);


        let trailerDivTag = document.createElement('div');
        let iframeTag = document.createElement('iframe');
        iframeTag.setAttribute("style", "display: block; margin: auto; border:2px solid black")
        iframeTag.setAttribute("width", "750");
        iframeTag.setAttribute("height", "400");
        iframeTag.src = object['trailer']['url'];
        iframeTag.title = object['trailer']['title'];
        iframeTag.setAttribute("allow", "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share");
        iframeTag.setAttribute("referrerPolicy", "strict-origin-when-cross-origin");
        trailerDivTag.appendChild(iframeTag);
        textDataDivTag.appendChild(trailerDivTag);
    }

    articleTag.appendChild(textDataDivTag);
    divTag.appendChild(articleTag);
}


