let hello = document.querySelector('.hello'),
    today = document.querySelector('.today'),
    time = document.querySelector('.time'),
    newYear = document.querySelector('.new-year');

function timer(){
    function getTime(){
        let date = new Date(),
            week = date.getDay(),
            timeNow = date.toLocaleTimeString('en'),
            hours = date.getHours(),
            nowYear = date.getTime(),
            newYear = new Date('January 1, 2021 00:00:00');
        return {week, timeNow, hours, nowYear, newYear}
    }

    function outPutTimer(){
        let timer = getTime();

        if(timer.hours > 0 && timer.hours < 6) timer.hours = 'Доброй ночи';
        if(timer.hours >= 6 && timer.hours < 12) timer.hours = 'Доброе утро';
        if(timer.hours >= 12 && timer.hours < 18) timer.hours = 'Добрый день';
        if(timer.hours >= 18 && timer.hours < 21) timer.hours = 'Добрый вечер';        

        switch(timer.week) {
            case 0: {
                timer.week = 'Воскресенье'
                break;
            }
            case 1: {
                timer.week = 'Понедельник'
                break;
            }
            case 2: {
                timer.week = 'Вторник'
                break;
            }
            case 3: {
                timer.week = 'Среда'
                break;
            }
            case 4: {
                timer.week = 'Четверг'
                break;
            }
            case 5: {
                timer.week = 'Пятница'
                break;
            }
            case 6: {
                timer.week = 'Суббота'
                break;
            }
        }
        hello.textContent = timer.hours;
        today.textContent = `Сегодня ${timer.week}`;
        time.textContent = `Текущее время ${timer.timeNow}`;
        newYear.textContent = `До нового года осталось ${Math.floor((timer.newYear - timer.nowYear) / 1000 / 60 / 60 / 24)} дней`
    }
    let intervalTimer = setInterval(outPutTimer, 1000);
}

timer();