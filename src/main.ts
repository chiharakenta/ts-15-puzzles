import './style.css';

const puzzleWidth = 4;
const puzzleHeight = 4;

const init = () => {
    const table = document.getElementById('table');
    if (!table) {
        console.error('idが"table"の要素が見つかりません');
        return;
    };

    // 4行分ループ
    for (let i = 0; i < puzzleHeight; i++) {
        const tr = document.createElement('tr');

        // 各列分ループ
        for (let j = 0; j < puzzleWidth; j++) {
            const td = document.createElement('td');
            const index = i * 4 + j;
            td.className = 'tile';
            td.textContent = index ? index.toString() : '';
            tr.appendChild(td);
        }
        table.appendChild(tr);
    }
};
init();