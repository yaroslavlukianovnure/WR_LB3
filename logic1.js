
$(document).ready(() => {

    const $intervalInput = $('#intervalInput');
    const $startButton = $('#startButton');
    const $stopButton = $('#stopButton');
    const $tableContainer = $('#table-container');

    let $tableBody;
    let generationIntervalId = null;
    let rowCounter = 1;

    $startButton.on('click', startGeneration);
    $stopButton.on('click', stopGeneration);


    function startGeneration() {
        const interval = parseInt($intervalInput.val(), 10);
        if (isNaN(interval) || interval < 100) {
            alert('Будь ласка, введіть інтервал більше 100мс.');
            return;
        }

        if (!$tableBody) createTable();

        if (generationIntervalId) clearInterval(generationIntervalId);

        generationIntervalId = setInterval(addRow, interval);

        $stopButton.prop('disabled', false);
        $startButton.prop('disabled', true);
    }

    function stopGeneration() {

        clearInterval(generationIntervalId);

        generationIntervalId = null;

        $stopButton.prop('disabled', true);
        $startButton.prop('disabled', false);
    }

    function createTable() {

        const tableHtml = `
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Випадкове ім'я</th>
                        <th>Випадкове значення</th>
                    </tr>
                </thead>
                <tbody>
                    </tbody>
            </table>
        `;

        $tableContainer.html(tableHtml);
        
        // Посилання на tbody для майбутніх операцій
        $tableBody = $tableContainer.find('tbody');
    }

    function addRow() {

        const id = rowCounter++;
        const randomName = 'Користувач ' + Math.floor(Math.random() * 1000);
        const randomValue = (Math.random() * 100).toFixed(2);

        const newRowHtml = `
            <tr>
                <td>${id}</td>
                <td>${randomName}</td>
                <td>${randomValue}</td>
            </tr>
        `;
        
        // Додаємо HTML-рядок
        $tableBody.append(newRowHtml);
    }
});