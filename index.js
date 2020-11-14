const calcPrice = 100;

document.addEventListener('DOMContentLoaded', () => {
        
    function countTimer(deadline){
        let timerHours = document.querySelector('#timer-hours'),
            timerMinutes = document.querySelector('#timer-minutes'),
            timerSeconds = document.querySelector('#timer-seconds');

        function getTimeRemaining() {
            let dateStop = new Date(deadline).getTime(),
                dateNow = new Date().getTime(),
                timeRemaining = (dateStop - dateNow) / 1000,
                seconds = Math.floor(timeRemaining % 60),
                minutes = Math.floor((timeRemaining / 60) % 60),
                hours = Math.floor(timeRemaining / 60 / 60);
                if(dateNow > dateStop) return false;
                return {timeRemaining, hours, minutes, seconds};
        }
    
        function updateClock() {
            let timer = getTimeRemaining();
            if(!timer) {
                clearInterval(intervalTimer);
                timerHours.textContent = '00';
                timerMinutes.textContent = '00';
                timerSeconds.textContent = '00';
            } else {
                for(let key in timer) {
                    if(key === 'timeRemaining') continue;
                    if(timer[key] <= 9) timer[key] = '0' + timer[key];
                }
                timerHours.textContent = timer.hours;
                timerMinutes.textContent = timer.minutes;
                timerSeconds.textContent = timer.seconds;
            }
    
            if(timer.timeRemaining <= 0) {
                clearInterval(intervalTimer);
            }
            
        }
    
        let intervalTimer = setInterval(updateClock, 1000);
    }

    countTimer('5 november 2020');

    // function toggleMenu() {
    //     const body = document.querySelector('body');
    //     const menu = document.querySelector('menu');

    //     const handlerMenu = () => {

    //         if (screen.width > 768) {
    //             menu.classList.toggle('active-menu');
    //         } else {
    //             if (!menu.style.transform || menu.style.transform === `translate(-100%)`) {
    //                 menu.style.transform = `translate(0)`;
    //             } else {
    //                 menu.style.transform = `translate(-100%)`;
    //             }
    //         }
    //     };

    //     body.addEventListener('click', e => {
    //         e.preventDefault();
    //         const { target } = e;

    //         if (target.closest('div .menu')) {
    //             handlerMenu();
    //         } else if (target.classList.contains('close-btn') ||
    //             target.closest('.active-menu li a')) {
    //             handlerMenu();
    //         } else if (menu.classList.contains('active-menu') && !target.classList.contains('active-menu')) {
    //             handlerMenu();
    //         }

    //         // if (!target.closest('menu') && menu.closest('.active-menu') || target.closest('menu .close-btn') || target.closest('a')) {
    //         //     menu.classList.remove('active-menu');
    //         // }
    //         // if (target.closest('.menu')) {
    //         //     menu.classList.add('active-menu');
    //         // }
    //     });
    // }   

    // toggleMenu();

    function popupBlock() {
        const popup = document.querySelector('.popup'),
            popupBtn = document.querySelectorAll('.popup-btn'),
            closeBtn = popup.querySelector('.popup-close'),
            popupContent = popup.querySelector('.popup-content');
            popupContent.style.top = '0';

        let countAnim = 0;

        function applyAnimation(){
            popupContent.style.top = '10px'
        }

        popupBtn.forEach(btn => btn.addEventListener('click', (e) => {
                popup.style.display = 'block';
                if(window.screen.width > 768) {
                    const animAction = setInterval(function() {
                        countAnim += 1;
                        if(countAnim >= 10) {
                            clearInterval(animAction);
                            countAnim = 0;
                            return 1;
                        }
                        popupContent.style.top = `${countAnim}%`
                    }, 10);
                } 
            }
        ));
        
        popup.addEventListener('click', (e) => {
            const {target} = e;
            if(target === popup) popup.style.display = 'none';
            if(target.className === 'popup-close') popup.style.display = 'none';
        });
    }

    popupBlock();

    function servicesTab() {
        const tabItem = document.querySelectorAll('.service-header-tab');
        const serviceTab = document.querySelectorAll('.service-tab');

        function reset(){
            tabItem.forEach(item => item.classList.remove('active'));
            serviceTab.forEach(item => item.style.display = 'none');
        }

        tabItem.forEach((item, i) => item.addEventListener('click', () => {
            reset();
            item.classList.add('active');
            if(item.textContent === 'Дизайн интерьера') serviceTab[0].style.display = 'flex';
            if(item.textContent === 'Дизайн экстерьера') serviceTab[1].style.display = 'flex';
            if(item.textContent === 'Визуальная анимация') serviceTab[2].style.display = 'flex';
        }))
    }
    
    servicesTab();

    function sliderActions() {
        const slider = document.querySelector('.portfolio-content');
        const sliderItems = document.querySelectorAll('.portfolio-item');
        let dot = [];

        let currentSlider = 0,
            interval;

        sliderItems.forEach(() => {
            const li = document.createElement('li');
            li.classList.add('dot');
            document.querySelector('.portfolio-dots').appendChild(li);
            dot.push(li); 
        })

        dot[0].classList.add('dot-active');

        const prevSlide = function(elem, currentSlider, status) {
            elem[currentSlider].classList.remove(status);
        };

        const nextSlide = function(elem, currentSlider, status) {
            elem[currentSlider].classList.add(status);
        };

        const autoPlay = function() {
            prevSlide(sliderItems, currentSlider, 'portfolio-item-active');
            prevSlide(dot, currentSlider, 'dot-active');

            currentSlider++;

            if(currentSlider > sliderItems.length - 1) {
                currentSlider = 0;
            }

            nextSlide(sliderItems, currentSlider, 'portfolio-item-active');
            nextSlide(dot, currentSlider, 'dot-active');
        };

        const startSlider = function(item = 1500) {
            interval = setInterval(autoPlay, item)
        };
        startSlider(2000);

        const stopSlider = function() {
            clearInterval(interval);
        };

        slider.addEventListener('click', (e) => {
            e.preventDefault();

            const {target} = e;

            if(!target.matches('.portfolio-btn, .dot')) {
                return;
            }

            prevSlide(sliderItems, currentSlider, 'portfolio-item-active');
            prevSlide(dot, currentSlider, 'dot-active');

            if(target.matches('#arrow-right')) {
                currentSlider++;
            }

            if(target.matches('#arrow-left')) {
                currentSlider--;
            }

            if(target.matches('.dot')) {
                dot.forEach((elem, i) => {
                    if(elem === target) {
                        currentSlider = i; 
                    }
                })
            }

            if(currentSlider >= sliderItems.length) {
                currentSlider = 0;
            } else if(currentSlider < 0) {
                currentSlider = sliderItems.length - 1;
            }

            nextSlide(sliderItems, currentSlider, 'portfolio-item-active');
            nextSlide(dot, currentSlider, 'dot-active');
        });

        slider.addEventListener('mouseover', (e) => {
            const {target} = e;

            if(!target.matches('.portfolio-btn, .dot')) {
                return;
            }

            stopSlider();
        });

        slider.addEventListener('mouseout', (e) => {
            const {target} = e;

            if(!target.matches('.portfolio-btn, .dot')) {
                return;
            }

            startSlider(2000);
        });

    };
    sliderActions();

    function anchorAction() {
        const anchor = document.querySelectorAll('a[href*="#"]');

        anchor.forEach(elem => elem.addEventListener('click', e => {
            e.preventDefault();
            const attr = elem.getAttribute('href');
            document.querySelector(attr).scrollIntoView({
                behavior: "smooth",
                block: "start"
            })
        }))
    }
    anchorAction();

    function teamBlock() {
        const allImg = document.querySelectorAll("img[data-img]");
        let src;
        allImg.forEach(item => {
            item.addEventListener("mouseover", event => {
                src = event.target.getAttribute("src");
                event.target.src = event.target.dataset.img;
            });
            item.addEventListener("mouseout", event => {
                event.target.src = src;
            });
        });
    }
    teamBlock();
 
    function calc(price = 100) {

        const calc = document.getElementById('calc'),
            totalValue = document.getElementById('total'),
            calcType = calc.querySelector('.calc-type'),
            calcCount = calc.querySelector('.calc-count'),
            calcDay = calc.querySelector('.calc-day');
 
        const countSum = () => {
            let total = 0, 
            countValue = 1,
            dayValue = 1,
            typeValue = calcType.options[calcType.selectedIndex].value,
            squareValue = calc.querySelector('.calc-square').value;

            if(calcCount.value > 1){
                countValue += (calcCount.value - 1) / 10;
                console.log(countValue);
            }
            
            if(calcDay.value && calcDay.value < 5) {
                dayValue *= 2;
            } else if(calcDay.value && calcDay.value < 10) {
                dayValue *= 1.5;
            }

            if(typeValue && squareValue){
                total = Math.floor(price * typeValue * squareValue * dayValue * countValue);
                console.log(total);
                const counter = () => {
                    const timer = requestAnimationFrame(() => {
                        if(+totalValue.textContent === total) {
                            return cancelAnimationFrame(timer);
                        } 
                        if(+totalValue.textContent > total) {
                            totalValue.textContent = +totalValue.textContent - 1;
                        } else {
                            totalValue.textContent = +totalValue.textContent + 1;
                        }
                        counter();
                    })
                }
                counter();
            }

            
        };

        calc.addEventListener('input', e => {
            const {target} = e;
 
            if(target.matches('input')) {
                target.value = target.value.replace(/[a-zA-ZА-Яа-я]|\s/, '');
            }
        })

        calc.addEventListener('change', (e) => {
            const {target} = e;

            if(target.matches('select') || target.matches('input')) {
                countSum();
            }
            
        })
    }
    calc(calcPrice);

    function postData(data, successNotif, failedNotif) {
        const request = new XMLHttpRequest();

        request.addEventListener('readystatechange', () => {
            if(request.readyState !== 4) return;

            if(request.status === 200) {
                successNotif();
            } else {
                failedNotif(request.status)
            }
        });

        request.open('POST', './server.php');
        request.setRequestHeader('Content-Type', 'application/json');
        request.send(JSON.stringify(data));
    }

    function isValid(target) {
        let status = true,
            test;
        target.forEach(key => {
            if(key.type === 'tel') {
                test = /^(\+{1})(\d+)$/.test(key.value);
                if(!test) {
                    status = false;
                }
            }
            if(key.type === 'text') {
                test = /[А-я](\s?)/.test(key.value);
                if(!test) {
                    status = false; 
                }
            }
        })
        if(!test) alert('Форма заполняется неверно!');
        return status;
    }

    function postForm(selector) {
        const form = document.getElementById(selector);
        const inputs = form.querySelectorAll('input');

        const notification = document.createElement('div'),
            loadNotif = 'Загрузка...',
            successNotif = 'Заявка успешно доставлена!',
            failedNotif = 'Ошибка! Нет ответа от сервера!';
            notification.style.color = 'red';

        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const status = isValid(inputs);
            if(!status) return alert('Форма заполнена неверно!');

            const preloader = document.querySelector('.preloader-inner');
            preloader.classList.add('preloader-active');

            form.appendChild(notification);
            notification.textContent = loadNotif;

            const formData = new FormData(form),
                data = {};

            formData.forEach((key, index) => {
                data[index] = key
            });

            postData(data, () => {
                notification.textContent = successNotif;
                form.reset();
                preloader.classList.remove('preloader-active');
            }, (error) => {
                notification.textContent = failedNotif;
                console.error(error);
            });
        })
    }

    function getForms() {
        const forms = document.querySelectorAll('form');

        forms.forEach(elem => {
            postForm(elem.id);
        })
    }
    getForms();
    

})