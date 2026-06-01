// =====================================================
// 1. pipe() — Nối chuỗi functions
// =====================================================

function pipe(...fns) {
    return function (value) {
        return fns.reduce(
            (result, fn) => fn(result),
            value
        );
    };
}

const process = pipe(
    x => x * 2,
    x => x + 10,
    x => x.toString(),
    x => "Kết quả: " + x
);

console.log(process(5));
// Kết quả: 20

// =====================================================
// 2. memoize() — Cache kết quả
// =====================================================

function memoize(fn) {
    const cache = new Map();

    return function (...args) {
        const key = JSON.stringify(args);

        if (cache.has(key)) {
            console.log("Lấy từ cache...");
            return cache.get(key);
        }

        const result = fn(...args);

        cache.set(key, result);

        return result;
    };
}

const expensiveCalc = memoize((n) => {
    console.log("Đang tính...");

    let result = 0;

    for (let i = 0; i < n; i++) {
        result += i;
    }

    return result;
});

console.log(expensiveCalc(1000000));
console.log(expensiveCalc(1000000));

// =====================================================
// 3. debounce()
// =====================================================

function debounce(fn, delay) {
    let timerId;

    return function (...args) {
        clearTimeout(timerId);

        timerId = setTimeout(() => {
            fn(...args);
        }, delay);
    };
}

const search = debounce((query) => {
    console.log("Searching:", query);
}, 500);

// Chỉ "reactjs" được chạy
search("r");
search("re");
search("rea");
search("react");
search("reactjs");

// =====================================================
// 4. retry()
// =====================================================

async function retry(fn, maxAttempts = 3) {
    let lastError;

    for (
        let attempt = 1;
        attempt <= maxAttempts;
        attempt++
    ) {
        try {
            return await fn();
        } catch (error) {
            lastError = error;

            console.log(
                `Lần thử ${attempt} thất bại:`,
                error.message
            );

            if (attempt < maxAttempts) {
                console.log("Đang thử lại...");
            }
        }
    }

    throw lastError;
}

// =====================================================
// TEST RETRY
// =====================================================

let attempts = 0;

const unstableAPI = async () => {
    attempts++;

    if (attempts < 3) {
        throw new Error("Server Error");
    }

    return "Thành công!";
};

retry(unstableAPI, 5)
    .then(result =>
        console.log("Kết quả:", result)
    )
    .catch(error =>
        console.error(
            "Lỗi cuối cùng:",
            error.message
        )
    );

/*
========================================
KẾT QUẢ MONG ĐỢI
========================================

pipe:
Kết quả: 20

memoize:
Đang tính...
499999500000
Lấy từ cache...
499999500000

debounce:
(Chỉ sau 500ms)
Searching: reactjs

retry:
Lần thử 1 thất bại: Server Error
Đang thử lại...
Lần thử 2 thất bại: Server Error
Đang thử lại...
Kết quả: Thành công!
*/
