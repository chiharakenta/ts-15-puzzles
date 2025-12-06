/*
秒数を毎秒カウントアップするタイマーを作成
id='timer'の要素に表示
*/

let countupSeconds = 0;
let timerIntervalId: number | null = null;

export const startCountupTimer = () => {
    const timerElement = document.getElementById('timer');
    if (!timerElement) {
        console.error('idが"timer"の要素が見つかりません');
        return;
    }
    
    timerIntervalId = window.setInterval(() => {
        countupSeconds++;
        const minutes = Math.floor(countupSeconds / 60);
        const seconds = countupSeconds % 60;
        timerElement.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }, 1000);
};
export const stopCountupTimer = () => {
    if (timerIntervalId !== null) {
        clearInterval(timerIntervalId);
        timerIntervalId = null;
    }
}
export const resetCountupTimer = () => {
    stopCountupTimer();
    countupSeconds = 0;
    const timerElement = document.getElementById('timer');
    if (timerElement) {
        timerElement.textContent = '00:00';
    }
}
