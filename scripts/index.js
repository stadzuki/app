const isNumber = function(num) {
    return !isNaN(parseFloat(num)) && isFinite(num)
};

let startBtn = document.getElementById('start'),
    expensesItems = document.querySelectorAll('.expenses-items'),
    incomeItems = document.querySelectorAll('.income-items'),
    addExpensesBtn = document.querySelector('.expenses_add'),
    addIncomeBtn = document.querySelector('.income_add'),
    expensesMonth = document.querySelector('.expenses_month-value'),
    budgetMonth = document.querySelector('.budget_month-value'),
    budgetDay = document.querySelector('.budget_day-value'),
    salaryAmount = document.querySelector('.salary-amount'),
    additionalIncome = document.querySelectorAll('.additional_income-item'),
    additionalIncomeValue = document.querySelector('.additional_income-value'),
    addExpensesItem = document.querySelector('.additional_expenses-item'),
    additionalExpenses = document.querySelector('.additional_expenses-value'),
    depositCheckBox = document.querySelector('#deposit-check'),
    targetAmount = document.querySelector('.target-amount'),
    targetMonth = document.querySelector('.target_month-value'),
    periodSelect = document.querySelector('.period-select'),
    incomePeriod = document.querySelector('.income_period-value'),
    periodAmount = document.querySelector('.period-amount'),
    dataInputs = document.querySelectorAll('.data input[type="text"]'),
    cancelBtn = document.querySelector('#cancel'),
    inputs = document.querySelectorAll('input');
    resultInputs = document.querySelectorAll('.result input');

    let checked = false;

    startBtn.setAttribute('disabled', 'disabled');

class AppData {
    constructor() {
        this.budget = 0;
        this.possible = [];
        this.possibleCost = [];
        this.budgetDay = 0;
        this.budgetMonth = 0;
        this.expensesMonth = 0;
        this.income = {};
        this.expenses = {};
        this.deposit = false;
    }

    reset() {
        this.budget = 0;
        this.possible = [];
        this.possibleCost = [];
        this.budgetDay = 0;
        this.budgetMonth = 0;
        this.expensesMonth = 0;
        this.income = {};
        this.expenses = {};
        this.deposit = false;
        checked = false;

        dataInputs = document.querySelectorAll('.data input[type="text"]');
        dataInputs.forEach(item => {
            item.removeAttribute('disabled');
            item.value = '';
        });

        resultInputs.forEach(item => {
            item.value = '';
        });

        depositCheckBox.removeAttribute('checked');

        periodSelect.value = 1;
        periodAmount.textContent = '1';

        addExpensesBtn.style.display = 'block';
        addIncomeBtn.style.display = 'block';

        cancelBtn.style.display = 'none';
        startBtn.style.display = 'block';

        expensesItems = document.querySelectorAll('.expenses-items');
        expensesItems.forEach(item => {     
            expensesItems = document.querySelectorAll('.expenses-items');       
            if (expensesItems.length > 1) {
                item.remove();
            }
        });

        incomeItems = document.querySelectorAll('.income-items');
        incomeItems.forEach(item => {     
            incomeItems = document.querySelectorAll('.income-items');       
            if (incomeItems.length > 1) {
                item.remove();
            }
        });
    }

    start() {
        this.getSalaryAmount();
        this.getExpInc();
        this.getExpensesMonth();
        this.getBudget();
        this.getIncome();        
        this.getPossibleCost();  
        this.setPeriod();                                                                      
        this.showResult();

        dataInputs = document.querySelectorAll('.data input[type="text"]');
        dataInputs.forEach(item => {
            item.setAttribute('disabled', 'true');
        });

        startBtn.style.display = 'none';
        cancelBtn.style.display = 'block';
    }

    getSalaryAmount() {
        if (salaryAmount.value === '') return startBtn.setAttribute('disabled', 'disabled');
        if (salaryAmount.value !== '') startBtn.removeAttribute('disabled');
        this.budget = +salaryAmount.value;
    }

    checkBoxState() {
        if (checked === true) {
            this.deposit = false;
            checked = false;
            depositCheckBox.removeAttribute('checked');
            return;
        }
        depositCheckBox.setAttribute('checked', 'checked');
        this.deposit = true;
        checked = true;
    }

    showResult() {
        budgetMonth.value = this.budgetMonth;
        budgetDay.value = this.budgetDay;
        expensesMonth.value = this.expensesMonth;
        additionalIncomeValue.value = this.possible.join(', ');
        additionalExpenses.value = this.possibleCost.join(', ');
        targetMonth.value = Math.ceil(this.getTargetMonth());
    }

    getPossibleCost() {
        const _possibleCost = addExpensesItem.value.split(', ');
        _possibleCost.forEach(item => {
            item = item.trim();
            if (item !== '') {
                this.possibleCost.push(item);
            }
        });
    }

    getIncome() {
        additionalIncome.forEach(item => {
            item = item.value.trim();
            if (item !== '') {
                this.possible.push(item);
            }
        });
    }

    addExpensesBlock() {
        const cloneExpensesItems = expensesItems[0].cloneNode(true);
        cloneIncomeItems.children[0].value = '';
        cloneIncomeItems.children[1].value = '';
        expensesItems[0].parentNode.insertBefore(cloneExpensesItems, addExpensesBtn);
        expensesItems = document.querySelectorAll('.expenses-items');
        if (expensesItems.length === 3) {
            addExpensesBtn.style.display = 'none';
        }
    }

    addAdditionalBlock() {
        const cloneIncomeItems = incomeItems[0].cloneNode(true);
        cloneIncomeItems.children[0].value = '';
        cloneIncomeItems.children[1].value = '';
        incomeItems[0].parentNode.insertBefore(cloneIncomeItems, addIncomeBtn);
        incomeItems = document.querySelectorAll('.income-items');
        if (incomeItems.length === 3) {
            addIncomeBtn.style.display = 'none';
        }
    }

    getExpInc() {
        const count = (item) => {
            const tempStr = item.className.split('-')[0];
            const titleExpenses = item.querySelector(`.${tempStr}-title`).value;
            const cashExpenses = item.querySelector(`.${tempStr}-amount`).value;
            
            if (titleExpenses  !== '' && cashExpenses !== '') {
                this[tempStr][titleExpenses] = cashExpenses;
            } 
        }
    
        expensesItems.forEach(count);
        incomeItems.forEach(count);
    }

    getExpensesMonth() {
        for (let key in this.expenses) {
            this.expensesMonth += +this.expenses[key];
        }
    
        if (this.income) {
            for (let key in this.income) {
                this.budget += +this.income[key];
            }
        }
    }

    getBudget() {
        this.budgetMonth = this.budget - this.expensesMonth;
        this.budgetDay = Math.ceil(this.budgetMonth / 30);
    }

    getTargetMonth() {
        return Math.ceil(targetAmount.value / this.budgetMonth);
    }

    calcPeriod() {
        return this.budgetMonth * periodSelect.value;
    }

    setPeriod() {
        periodAmount.textContent = periodSelect.value;
        incomePeriod.value = this.calcPeriod();
        return periodSelect.value;
    }

    eventsListeners() {
        const fooStart = appData.start.bind(appData);
        const fooExpenses = appData.addExpensesBlock.bind(appData);
        const fooIncome = appData.addAdditionalBlock.bind(appData);
        const fooCheckBox = appData.checkBoxState.bind(appData);
        const fooPeriod = appData.setPeriod.bind(appData);
        const fooSalary = appData.getSalaryAmount.bind(appData);
        const fooReset = appData.reset.bind(appData);
    
        document.body.addEventListener('input', e => {
            const {target} = e;

            if(target.closest('input[placeholder="Наименование"]')) {
                target.value = target.value.replace(/[A-z]/, '');
            }

            if(target.matches('input[placeholder="Сумма"]')) {
                target.value = target.value.replace(/\D/, '');
            }
        })
        startBtn.addEventListener('click', fooStart); // Рассчет
        addExpensesBtn.addEventListener('click', fooExpenses); // +
        addIncomeBtn.addEventListener('click', fooIncome); // +
        depositCheckBox.addEventListener('input', fooCheckBox); // checkBox deposit
        periodSelect.addEventListener('input', fooPeriod); // Ползунок
        salaryAmount.addEventListener('input', fooSalary); // Поле ввода дохода
        cancelBtn.addEventListener('click', fooReset); // Сброс
    }

};

const appData = new AppData();
appData.eventsListeners();

