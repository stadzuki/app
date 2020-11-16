document.addEventListener('DOMContentLoaded', () => {
    'use strict';

    const select = document.getElementById('cars'),
        output = document.getElementById('output');

    function sendData() {
        return new Promise((resolve, reject) => {
            const request = new XMLHttpRequest();
            request.addEventListener('readystatechange', () => {
                if (request.readyState === 4 && request.status === 200) {
                    try {
                        resolve(request.responseText);
                    } catch {
                        reject(request.status);
                    }
                }
            });
            request.open('GET', './cars.json');
            request.setRequestHeader('Content-type', 'application/json');
            request.send();
        });
    };

    select.addEventListener('change', () => {
        try{
            sendData()
            .then(dataResponse => {
                const data = JSON.parse(dataResponse);
                data.cars.forEach(item => {
                    if (item.brand === select.value) {
                        const {brand, model, price} = item;
                        output.innerHTML = `Тачка ${brand} ${model} <br>
                        Цена: ${price}$`;
                    }
                });
            })
            .catch((err) => console.warn(err));
        }
        catch(e){
            console.error(e);
        }
        
    });

});