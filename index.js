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
                alert('Акцуха прошла ПАРЕНЬ!!!');
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

    function toggleMenu() {
        const body = document.querySelector('body');
        const menu = document.querySelector('menu');
        body.addEventListener('click', e => {
            const { target } = e;

            if (!target.closest('menu') && menu.closest('.active-menu') || target.closest('menu .close-btn') || target.closest('a')) {
                menu.classList.remove('active-menu');
            }
            if (target.closest('.menu')) {
                menu.classList.add('active-menu');
            }
        });
    }   

    toggleMenu();

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

        // tabItem[0].parentNode.addEventListener('click', e => {
        //     reset();
        //     const {target} = e;
        //     // target.classList.toggle('active');
            
        //     if(target.matches('span')) target.classList.toggle('active');

        //     // console.log(target.closest('.service-header-tab').textContent);
        // })
    }
    
    servicesTab();
})