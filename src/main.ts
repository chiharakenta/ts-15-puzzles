import './style.css';
import clickSound from '/click.mp3?url';

interface HTMLPuzzleCellElement extends HTMLTableCellElement {
    index: number;
    value: number;
};

const puzzleWidth = 4;
const puzzleHeight = 4;
const tiles: Array<HTMLPuzzleCellElement> = [];

const audioPool: Array<HTMLAudioElement> = [];
let currentAudioIndex = 0;
const maxAudioPoolSize = 5;
for (let i = 0; i < maxAudioPoolSize; i++) {
    const audio = new Audio(clickSound);
    audioPool.push(audio);
}

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
            td.textContent = index === 15 ? '' : `${index + 1}`;
            td.onclick = click;
            tr.appendChild(td);
            tiles.push(td);
        }
        table.appendChild(tr);
    }

    shuffle();
};

const click = (event: Event) => {
    const target = event.target as HTMLPuzzleCellElement;
    const isMoved = handleTileClick(target.index);

    if (isMoved) {
        const audio = audioPool[currentAudioIndex];
        audio.play();
        currentAudioIndex = (currentAudioIndex + 1) % maxAudioPoolSize;
    }
};

const handleTileClick = (index: number) => {
    const i = index;

    if (i - 4 >= 0 && tiles[i - puzzleWidth].value === 15) {
        swap(i, i - 4); // 上と入れ替え
        return true;
    }
    if (i + 4 < 16 && tiles[i + 4].value === 15) {
        swap(i, i + 4); // 下と入れ替え
        return true;
    }
    if (i % 4 != 0 && tiles[i - 1].value === 15) {
        swap(i, i - 1); // 左と入れ替え
        return true;
    }
    if (i % 4 != 3 && tiles[i + 1].value === 15) {
        swap(i, i + 1); // 右と入れ替え
        return true;
    }
    return false;
}

const swap = (i: number, j: number) => {
    const tmp = tiles[i].value;
    const x = tiles[i].value == 15 ? '' : `${tiles[i].value + 1}`;
    const y = tiles[j].value == 15 ? '' : `${tiles[j].value + 1}`;
    tiles[i].textContent = y;
    tiles[i].value = tiles[j].value;
    tiles[j].textContent = x;
    tiles[j].value = tmp;
};

const shuffle = () => {
    for (let n = 0; n < 1000; n++) {
        handleTileClick(Math.floor(Math.random() * 16));
    }
}

init();
