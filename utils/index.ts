export const pickRandomColor = <T>(array: T[]) => {
    const randomIndex = Math.floor(Math.random() * array.length);
    // Truy cập phần tử ngẫu nhiên trong mảng
    const randomColor = array[randomIndex];
    return array[randomIndex];
}

export const convertMsToMinutesAndSeconds = (ms: number) => {
    let totalSeconds = Math.floor(ms / 1000);
    let minutes = Math.floor(totalSeconds / 60);
    let seconds = totalSeconds % 60;
    let formattedTime = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    return formattedTime;
}