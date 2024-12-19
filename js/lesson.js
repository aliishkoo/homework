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

let currentTabIndex = 0;


const hideTabContent = () => {
    tabContentBlocks.forEach(item => {
        item.style.display = 'none';
    })
    tabs.forEach(item => {
        item.classList.remove('tab_content_item_active');
    })
}

const showTabContent = (index = 0) => {
    tabContentBlocks[index].style.display = 'block'
    tabs[index].classList.add('tab_content_item_active');
}

const autoSwitchTabs = () => {
    currentTabIndex++
    if (currentTabIndex >= tabs.length) {
        currentTabIndex = 0;
    }
    hideTabContent()
    showTabContent(currentTabIndex)
}

setInterval(autoSwitchTabs, 3000);

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

const converter = (element, targetElement) => {
    element.oninput = () => {
        const xhr = new XMLHttpRequest()
        xhr.open ('GET', '../data/converter.json')
        xhr.setRequestHeader('Content-type', 'application/json')
        xhr.send()

        xhr.onload = () => {
            const data = JSON.parse(xhr.response)
            if (targetElement.id === 'som') targetElement.value = (element.value * data.usd).toFixed(2)
            if (targetElement.id === 'usd') targetElement.value = (element.value / data.usd).toFixed(2)
            if (element.value === '') targetElement.value = ''
        }
    }
}



