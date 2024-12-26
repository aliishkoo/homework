// PHONE BLOCK

const phoneInput = document.querySelector('#phone_input');
const phoneButton = document.querySelector('#phone_button');
const phoneResult = document.querySelector('#phone_result');

const regExp = /^\+996 [2579]\d{2} \d{2}-\d{2}-\d{2}$/

phoneButton.onclick = () => {
    if (regExp.test(phoneInput.value)) {
        phoneResult.innerHTML = "OK";
        phoneResult.style.color = "green"
    } else {
        phoneResult.innerHTML = "Invalid phone number";
        phoneResult.style.color = "red"
    }
}

//TAB SLIDER

const tabContentBlocks = document.querySelectorAll('.tab_content_block');
const tabs = document.querySelectorAll('.tab_content_item');
const tabsParent = document.querySelector('.tab_content_items');

let currentTabIndex = 0


const hideTabContent = () => {
    tabContentBlocks.forEach(item => {
        item.style.display = 'none'
    })
    tabs.forEach(item => {
        item.classList.remove('tab_content_item_active');
    })
}

const showTabContent = (index = 0) => {
    tabContentBlocks[index].style.display = 'block';
    tabs[index].classList.add('tab_content_item_active');
};

const autoSwitchTabs = () => {
    currentTabIndex++
    if (currentTabIndex >= tabs.length) {
        currentTabIndex = 0
    }
    hideTabContent()
    showTabContent(currentTabIndex)
}

setInterval(autoSwitchTabs, 3000)

hideTabContent();
showTabContent();

tabsParent.onclick = (event) => {
    if (event.target.classList.contains('tab_content_item')) {
        tabs.forEach((item, index) => {
            if (event.target === item)  {
                console.log(index)
                hideTabContent();
                showTabContent(index);
                currentTabIndex = index;
            }
        })
    }
}

// CONVERTER

const somInput = document.querySelector('#som');
const usdInput = document.querySelector('#usd');
const eurInput = document.querySelector('#eur');


const converter = (element, targetElement) => {
    element.oninput = () => {
        const xhr = new XMLHttpRequest()
        xhr.open ('GET', '../data/converter.json')
        xhr.setRequestHeader('Content-type', 'application/json')
        xhr.send()

        xhr.onload = () => {
            const data = JSON.parse(xhr.response)
            if (element.value === '') {
                targetElement.forEach(target => (target.value = ''));
                return;
            }
            if (element.id === 'som') {
                usdInput.value = (element.value / data.usd).toFixed(2);
                eurInput.value = (element.value / data.eur).toFixed(2);
            }
            if (element.id === 'usd') {
                somInput.value = (element.value * data.usd).toFixed(2);
                eurInput.value = ((element.value * data.usd) / data.eur).toFixed(2);
            }
            if (element.id === 'eur') {
                somInput.value = (element.value * data.eur).toFixed(2);
                usdInput.value = ((element.value * data.eur) / data.usd).toFixed(2);
            }
        }
    }
}

converter(somInput, [usdInput, eurInput])
converter(usdInput, [somInput, eurInput])
converter(eurInput, [somInput, usdInput])

// CARD SWITCHER

const cardBlock = document.querySelector('.card');
const btnNext = document.querySelector('#bnt-next');
const btnPrev = document.querySelector('#bnt-prev');

let cardId = 199

const fetchCard= (id) => {
    fetch(`https://jsonplaceholder.typicode.com/todos/${id}`)
        .then((response) => response.json())
        .then(({ title, completed, id }) => {
            cardBlock.innerHTML = `
                <p>${title}</p>
                <p>${completed}</p>
                <span>${id}</span>
            `;
        })
        .catch((error) => {
            console.error('Download error:', error)
            cardBlock.innerHTML = `<p>Error</p>`
        })
}

btnNext.onclick = () => {
    cardId = cardId === 200 ? 1 : cardId + 1;
    fetchCard(cardId);
};

btnPrev.onclick = () => {
    cardId = cardId === 1 ? 200 : cardId - 1;
    fetchCard(cardId);
};

fetchCard(cardId)

fetch(`https://jsonplaceholder.typicode.com/posts`)
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error('Error:', error))

// WEATHER

const searchInput = document.querySelector('.cityName');
const searchButton = document.querySelector('#search');
const city = document.querySelector('.city');
const temp = document.querySelector('.temp');
const weatherIcon = document.querySelector('#weather-icon');

const API_URL = 'http://api.openweathermap.org/data/2.5/weather'
const API_KEY = 'e417df62e04d3b1b111abeab19cea714'

searchButton.onclick = () => {
    fetch(`${API_URL}?appid=${API_KEY}&q=${searchInput.value}&units=metric&lang=RU`)
        .then(response => response.json())
        .then(data => {
            city.innerHTML = data.name || 'Город не найден...'
            temp.innerHTML = data.main?.temp ? Math.round(data.main?.temp) + '&deg;C' : '---'
            weatherIcon.src = `https://openweathermap.org/img/wn/${data.wether[0].icon}.png`
        })
    searchInput.value = ''
}

// query params
// optional chaining - ?.




