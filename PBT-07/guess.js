const targetNumber = Math.floor(Math.random() * 100) + 1;
const maxAttempts = 7;
let attempts = 0;
const guessedNumbers = [];
let isWin = false;

while (attempts < maxAttempts) {
    let input = prompt(`Lần đoán thứ ${attempts + 1}/${maxAttempts}.\nNhập một số từ 1 đến 100:`);

    if (input === null) {
        break;
    }

    let guess = Number(input);

    if (isNaN(guess) || guess < 1 || guess > 100) {
        alert("Vui lòng chỉ nhập số từ 1 đến 100!");
        continue;
    }

    if (guessedNumbers.includes(guess)) {
        alert("Bạn đã đoán số này rồi!");
        continue;
    }

    guessedNumbers.push(guess);
    attempts++;

    if (guess === targetNumber) {
        alert(`Đúng rồi! Bạn đoán đúng sau ${attempts} lần!`);
        isWin = true;
        break;
    } else if (guess < targetNumber) {
        alert("Cao hơn");
    } else {
        alert("Thấp hơn");
    }
}

if (!isWin && attempts === maxAttempts) {
    alert(`Hết lượt! Bạn đã thua. Đáp án đúng là: ${targetNumber}`);
}