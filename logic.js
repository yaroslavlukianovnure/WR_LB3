document.addEventListener('DOMContentLoaded', () => {

    const intervalInput = document.getElementById('intervalInput');
    const startButton = document.getElementById('startButton');
    const stopButton = document.getElementById('stopButton');
    const tableContainer = document.getElementById('table-container');

    let table; 
    let tableBody; 
    let generationIntervalId = null;
    let rowCounter = 1; 

    startButton.addEventListener('click', startGeneration);
    stopButton.addEventListener('click', stopGeneration);

    function startGeneration() {

        // Перевірка вводу інтервалу
        const interval = parseInt(intervalInput.value, 10);

        if (isNaN(interval) || interval < 100) {
            alert('Будь ласка, введіть інтервал більше 100мс.');
            return;
        }

        if (!table) createTable();

        // Запуск інтервалу
        if (generationIntervalId) clearInterval(generationIntervalId);
        
        generationIntervalId = setInterval(addRow, interval);

        // Оновлення стану кнопок
        stopButton.disabled = false;
        startButton.disabled = true;
    }

    function stopGeneration() {

        // Зупинка таймера за його ID
        clearInterval(generationIntervalId);
        generationIntervalId = null;

        // Оновлення стану кнопок
        stopButton.disabled = true;
        startButton.disabled = false;
    }

    function createTable() {

        // Створення базової структури таблиці
        table = document.createElement('table');
        const thead = document.createElement('thead');
        tableBody = document.createElement('tbody');

        // Створення загловочного рядка
        const headerRow = document.createElement('tr');
        
        // Створення комірки загловка
        const th1 = document.createElement('th');
        th1.textContent = 'ID';
        const th2 = document.createElement('th');
        th2.textContent = 'Випадкове ім\'я';
        const th3 = document.createElement('th');
        th3.textContent = 'Випадкове значення';

        // Додаємо комірки в рядок, а рядок в заголовок
        headerRow.append(th1, th2, th3);
        thead.appendChild(headerRow);

        // Додавання заголовоку та тіла до таблиці
        table.append(thead, tableBody);
        
        // Готова таблиця
        tableContainer.appendChild(table);
    }

    function addRow() {

        // Новий рядок
        const newRow = document.createElement('tr');

        // Генерація випадкових чисел
        const id = rowCounter++;
        const randomName = 'Користувач ' + Math.floor(Math.random() * 1000);
        const randomValue = (Math.random() * 100).toFixed(2);

        // Створення комірок 
        const idCell = document.createElement('td');
        idCell.textContent = id;

        const nameCell = document.createElement('td');
        nameCell.textContent = randomName;

        const valueCell = document.createElement('td');
        valueCell.textContent = randomValue;

        // Додаємо комірки в рядок
        newRow.append(idCell, nameCell, valueCell);
        
        // Додавання нового рядка в тіло таблиці
        tableBody.appendChild(newRow);
    }
});