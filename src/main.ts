import './style.css';

interface HTMLPuzzleCellElement extends HTMLTableCellElement {
    index: number;
    value: number;
};

const puzzleWidth = 4;
const puzzleHeight = 4;
const tiles: Array<HTMLPuzzleCellElement> = [];

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
            const td = document.createElement('td') as HTMLPuzzleCellElement;
            const index = i * 4 + j;
            td.className = 'tile';
            td.index = index;
            td.value = index;
            td.textContent = index ? index.toString() : '';
            td.onclick = click;
            tr.appendChild(td);
            tiles.push(td);
        }
        table.appendChild(tr);
    }
};

const click = (event: Event) => {
    const target = event.target as HTMLPuzzleCellElement;
    const i = target.index;

    if (i - 4 >= 0 && tiles[i - puzzleWidth].value === 0) {
        swap(i, i - 4); // 上と入れ替え
        return;
    }
    if (i + 4 < 16 && tiles[i + 4].value === 0) {
        swap(i, i + 4); // 下と入れ替え
        return;
    }
    if (i % 4 != 0 && tiles[i - 1].value === 0) {
        swap(i, i - 1); // 左と入れ替え
        return;
    }
    if (i % 4 != 3 && tiles[i + 1].value === 0) {
        swap(i, i + 1); // 右と入れ替え
        return;
    }
};

const swap = (i: number, j: number) => {
    const tmp = tiles[i].value;
    tiles[i].textContent = tiles[j].textContent;
    tiles[i].value = tiles[j].value;
    tiles[j].textContent = tmp.toString();
    tiles[j].value = tmp;
};

init();