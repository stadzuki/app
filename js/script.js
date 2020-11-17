//Объявление и инициализация функции с приемом параметров
const filterByType = (type, ...values) => values.filter(value => typeof value === type),

	hideAllResponseBlocks = () => {//Функция
		//Создаем ӕкземляр массива возращаемого DQSA
		const responseBlocksArray = Array.from(document.querySelectorAll('div.dialog__response-block'));
		//перебор массива для установки стилей для ӕлемента массива
		responseBlocksArray.forEach(block => block.style.display = 'none');
	},

	//функция которая принимает в себе  параметры
	showResponseBlock = (blockSelector, msgText, spanSelector) => {
		hideAllResponseBlocks();//Вызываем функцию сброса стилей у блоков
		document.querySelector(blockSelector).style.display = 'block';/* переданному блоку 
		blockSelector устанавливаем стили */
		if (spanSelector) {// Делаем провекру имеется/существует ли у нас spanSelector
			document.querySelector(spanSelector).textContent = msgText;
		}
	},

	//Функция принимающая в себя параметр(строку ошибки), функция вызывает showREsponseBLock и передает значения
	showError = msgText => showResponseBlock('.dialog__response-block_error', msgText, '#error'),

	//Функция принимающая в себя параметр(строку успеха), функция вызывает showREsponseBLock и передает значения
	showResults = msgText => showResponseBlock('.dialog__response-block_ok', msgText, '#ok'),

	//Вызываем showResponseBlock и передаем параметр(селектор)
	showNoResults = () => showResponseBlock('.dialog__response-block_no-results'),

	//Объявляем функцию с параметрами
	tryFilterByType = (type, values) => {
		//Используем констркуцию перехвата ошибок с помощью try catch
		try {//"пробуем / пытаемся"
			//Выполняем строку кода с помощью eval указывая строку с параметрами type and values далее разбиваем на массив
			const valuesArray = eval(`filterByType('${type}', ${values})`).join(", ");
			//Объявляем и инициализируем переменную. Используем тернарный оператор и проверяем
			//если в массиве есть ӕлементы, то выполняем '`Данные с типом ${type}: ${valuesArray}`'
			//иначе '`Отсутствуют данные типа ${type}`'
			const alertMsg = (valuesArray.length) ?
				`Данные с типом ${type}: ${valuesArray}` :
				`Отсутствуют данные типа ${type}`;
			showResults(alertMsg);//Вызываем функцию showResult и передаем переменную alertMsg
		} catch (e) {//Если try не выполнился используем catch с параметро 'e' то есть error
			showError(`Ошибка: ${e}`);//С помощью функции showErro передадим строку и выведем ошибку на сраницу
		}
	};

const filterButton = document.querySelector('#filter-btn');//Задаем перменной ӕлемент из дом дерева

//'Вешаем' слушателя событий на полученный ӕлемент и указываем событие click
filterButton.addEventListener('click', e => {
	const typeInput = document.querySelector('#type');//Получаем ӕлемент со страницы по id
	const dataInput = document.querySelector('#data');//Получаем ӕлемент со страницы по id

	//Производим ветвление
	if (dataInput.value === '') {//Если полученный dataInput его value будет пуст, то мы выполняет следующие инструкции
		dataInput.setCustomValidity('Поле не должно быть пустым!');//Устанавливаем спец. сообщение для ӕлемента
		showNoResults();//Вызываем функцию showNoREsult()
	} else { //Иначе если dataInput.value содержит в себе какую либо строку, то мы выполняем следующее тело программы
		dataInput.setCustomValidity('');//Убираем спец. сообщение для полученного ӕлемента
		e.preventDefault();//Отменяем действие по умолчанию
		tryFilterByType(typeInput.value.trim(), dataInput.value.trim());
		/*Вызываем функцию tryFilterByType и передаем параметры
		(строку + используем trim для того чтобы убрать лишние пробелы)*/
	}
});

