// indexcontroller.js

import CookieManager from './CookieManager.js';

const backgroundColorOptions = ['#ffffff', '#ffcccc', '#ccffcc', '#ccccff', '#ffffcc'];
const textColorOptions = ['#000000', '#ff0000', '#00ff00', '#0000ff', '#ffff00'];

function displayColorOptions(containerId, options, tag) {
    const container = document.getElementById(containerId);
    options.forEach(color => {
        const colorOption = document.createElement('div');
        colorOption.classList.add('color-option');
        colorOption.id = tag;
        colorOption.value = color;
        colorOption.style.backgroundColor = color;
        colorOption.addEventListener('click', function() {
            selectColor(containerId, color, this);
        });
        
        container.appendChild(colorOption);
    });
}

function selectColor(containerId, color, element) {
    const selectedColor = document.querySelector(`#${containerId} .selected`);
    if (selectedColor) {
        selectedColor.classList.remove('selected');
    }
    element.classList.add('selected');
    document.getElementById(containerId).dataset.selectedColor = color;
}

function clearSelection(containerId) {
    const selectedColors = document.querySelectorAll(`#${containerId} .selected`);
    selectedColors.forEach(color => {
        color.classList.remove('selected');
    });
    document.getElementById(containerId).dataset.selectedColor = '';
}

function checkAndRedirect() {
    let cm = new CookieManager();

    try {
        cm.getCookieName()
        .then(username => {
            console.log(`Retrieved username: ${username}`);
            cm.redirect();
        })
        .catch(error => {
            console.error(error);
            let boton = document.getElementById('createCookieButton')
            boton.addEventListener('click', (e) => {
                try {
                    console.log("Button clicked. Creating cookie...");
                    cm.savePreferences();
                } catch (error) {
                    console.error('Error al guardar las preferencias:', error);
                }
            });

            let clearButton = document.getElementById('clearSelectionButton');
            clearButton.addEventListener('click', () => {
                clearSelection('background-color-options');
                clearSelection('text-color-options');
            });
        });

    } catch (error) {
        console.error('Error al obtener la cookie:', error);
    }
}

displayColorOptions('background-color-options', backgroundColorOptions, "background-option");
displayColorOptions('text-color-options', textColorOptions, "color-option");
checkAndRedirect();
