# Câu A1 (5đ) — Function Declaration vs Expression vs Arrow Function

## 1. Function Declaration

```javascript
function tinhThueBaoHiem(luong) {
    let thue = luong > 11000000 ? luong * 0.1 : 0;

    return {
        thuong: thue,
        thuc_nhan: luong - thue
    };
}

console.log(tinhThueBaoHiem(15000000));
```

---

## 2. Function Expression

```javascript
const tinhThueBaoHiem = function(luong) {
    let thue = luong > 11000000 ? luong * 0.1 : 0;

    return {
        thuong: thue,
        thuc_nhan: luong - thue
    };
};

console.log(tinhThueBaoHiem(15000000));
```

---

## 3. Arrow Function

```javascript
const tinhThueBaoHiem = (luong) => {
    let thue = luong > 11000000 ? luong * 0.1 : 0;

    return {
        thuong: thue,
        thuc_nhan: luong - thue
    };
};

console.log(tinhThueBaoHiem(15000000));
```

---

# So sánh Hoisting

## Function Declaration

Function Declaration được **hoisting toàn bộ**, nên có thể gọi hàm trước khi khai báo.

```javascript
console.log(tinhThueBaoHiem(15000000));

function tinhThueBaoHiem(luong) {
    let thue = luong > 11000000 ? luong * 0.1 : 0;

    return {
        thuong: thue,
        thuc_nhan: luong - thue
    };
}
```

**Kết quả:** Chạy bình thường.

---

## Function Expression

Biến được khai báo bằng `const` chỉ được hoisting phần khai báo, không được khởi tạo giá trị ngay.

```javascript
console.log(tinhThueBaoHiem(15000000));

const tinhThueBaoHiem = function(luong) {
    let thue = luong > 11000000 ? luong * 0.1 : 0;

    return {
        thuong: thue,
        thuc_nhan: luong - thue
    };
};
```

**Kết quả:**

```text
ReferenceError: Cannot access 'tinhThueBaoHiem' before initialization
```

---

## Arrow Function

Arrow Function cũng thường được gán cho biến `const`, nên hoạt động tương tự Function Expression.

```javascript
console.log(tinhThueBaoHiem(15000000));

const tinhThueBaoHiem = (luong) => {
    let thue = luong > 11000000 ? luong * 0.1 : 0;

    return {
        thuong: thue,
        thuc_nhan: luong - thue
    };
};
```

# Câu A2 (5đ) — Scope & Closure

## Đoạn 1

### Code

```javascript
function counter() {
    let count = 0;
    return {
        increment: () => ++count,
        decrement: () => --count,
        getCount: () => count
    };
}

const c = counter();

console.log(c.increment());  // ???
console.log(c.increment());  // ???
console.log(c.increment());  // ???
console.log(c.decrement());  // ???
console.log(c.getCount());   // ???
```

### Dự đoán Output

```text
1
2
3
2
2
```

### Giải thích

Khi gọi:

```javascript
const c = counter();
```

Biến `count` được khởi tạo bằng `0`.

Các hàm `increment`, `decrement`, `getCount` tạo thành **closure**, nghĩa là chúng vẫn giữ được quyền truy cập vào biến `count` ngay cả khi hàm `counter()` đã thực thi xong.

Thực hiện từng lệnh:

```javascript
c.increment();
```

```text
count = 1
→ in ra 1
```

```javascript
c.increment();
```

```text
count = 2
→ in ra 2
```

```javascript
c.increment();
```

```text
count = 3
→ in ra 3
```

```javascript
c.decrement();
```

```text
count = 2
→ in ra 2
```

```javascript
c.getCount();
```

```text
count hiện tại = 2
→ in ra 2
```

---

## Đoạn 2

### Code

```javascript
for (var i = 0; i < 3; i++) {
    setTimeout(() => console.log("var:", i), 100);
}

for (let j = 0; j < 3; j++) {
    setTimeout(() => console.log("let:", j), 200);
}
```

### Output sau khoảng 200ms

```text
var: 3
var: 3
var: 3
let: 0
let: 1
let: 2
```

---

# Tại sao `var` và `let` cho kết quả khác nhau?

## Trường hợp `var`

```javascript
for (var i = 0; i < 3; i++) {
    setTimeout(() => console.log("var:", i), 100);
}
```

`var` có **function scope**, không có block scope.

Toàn bộ vòng lặp chỉ sử dụng **một biến `i` duy nhất**.

Sau khi vòng lặp kết thúc:

```javascript
i = 3
```

Lúc này các hàm trong `setTimeout` mới được thực thi.

Chúng đều nhìn thấy cùng một biến `i`:

```javascript
console.log(i); // 3
```

Nên kết quả:

```text
var: 3
var: 3
var: 3
```

---

## Trường hợp `let`

```javascript
for (let j = 0; j < 3; j++) {
    setTimeout(() => console.log("let:", j), 200);
}
```

`let` có **block scope**.

Mỗi lần lặp JavaScript tạo ra **một bản sao riêng của biến `j`**.

Ta có thể hình dung như:

```javascript
// Lần 1
let j = 0;
setTimeout(() => console.log(j), 200);

// Lần 2
let j = 1;
setTimeout(() => console.log(j), 200);

// Lần 3
let j = 2;
setTimeout(() => console.log(j), 200);
```

Mỗi callback giữ một closure riêng nên nhớ đúng giá trị của lần lặp đó.

Kết quả:

```text
let: 0
let: 1
let: 2
```

# Câu A3 (5đ) — Array Methods

```javascript
const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
```

## 1. Lấy các số chẵn → [2, 4, 6, 8, 10]

```javascript
const soChan = nums.filter(n => n % 2 === 0);
```

---

## 2. Nhân mỗi số với 3 → [3, 6, 9, ..., 30]

```javascript
const nhanBa = nums.map(n => n * 3);
```

---

## 3. Tính tổng tất cả → 55

```javascript
const tong = nums.reduce((sum, n) => sum + n, 0);
```

---

## 4. Tìm số đầu tiên > 7 → 8

```javascript
const soDauTien = nums.find(n => n > 7);
```

---

## 5. Kiểm tra CÓ số > 10 không → false

```javascript
const coSoLonHon10 = nums.some(n => n > 10);
```

---

## 6. Kiểm tra TẤT CẢ đều > 0 → true

```javascript
const tatCaLonHon0 = nums.every(n => n > 0);
```

---

## 7. Tạo mảng "Số X là [chẵn/lẻ]"

```javascript
const moTa = nums.map(
    n => `Số ${n} là ${n % 2 === 0 ? "chẵn" : "lẻ"}`
);
```

Kết quả:

```javascript
[
  "Số 1 là lẻ",
  "Số 2 là chẵn",
  "Số 3 là lẻ",
  ...
]
```

---

## 8. Đảo ngược mảng (không mutate gốc) → [10, 9, ..., 1]

```javascript
const daoNguoc = [...nums].reverse();
```

# Câu A4 (5đ) — Object Destructuring & Spread

## Code

```javascript
const product = {
    name: "iPhone 16",
    price: 25990000,
    specs: { ram: 8, storage: 256, color: "Titan" }
};

// Destructuring
const { name, price, specs: { ram, color } } = product;

console.log(name, price, ram, color);  // ???
console.log(specs);                     // ???

// Spread
const updated = { ...product, price: 23990000, sale: true };

console.log(updated.price);             // ???
console.log(updated.sale);              // ???
console.log(product.price);             // ???

// Spread gotcha
const copy = { ...product };
copy.specs.ram = 16;

console.log(product.specs.ram);         // ???
```

---

# 1. Destructuring

```javascript
const { name, price, specs: { ram, color } } = product;
```

Sau khi destructuring:

```javascript
name  = "iPhone 16"
price = 25990000
ram   = 8
color = "Titan"
```

### Output

```javascript
console.log(name, price, ram, color);
```

```text
iPhone 16 25990000 8 Titan
```

---

### Output tiếp theo

```javascript
console.log(specs);
```

```text
ReferenceError: specs is not defined
```

### Giải thích

Cú pháp:

```javascript
specs: { ram, color }
```

không tạo biến `specs`.

Nó chỉ lấy dữ liệu bên trong `specs` và gán cho các biến:

```javascript
ram
color
```

Vì vậy biến `specs` không tồn tại trong scope hiện tại.

---

# 2. Spread Operator

```javascript
const updated = {
    ...product,
    price: 23990000,
    sale: true
};
```

Spread sao chép các thuộc tính của `product` sang object mới.

Sau đó:

```javascript
price: 23990000
```

ghi đè giá cũ.

Và thêm:

```javascript
sale: true
```

---

### Output

```javascript
console.log(updated.price);
```

```text
23990000
```

```javascript
console.log(updated.sale);
```

```text
true
```

```javascript
console.log(product.price);
```

```text
25990000
```

---

### Giải thích

`updated` là object mới.

Việc thay đổi:

```javascript
updated.price
```

không làm thay đổi:

```javascript
product.price
```

---

# 3. Spread Gotcha (Bẫy thường gặp)

```javascript
const copy = { ...product };
```

Nhiều người nghĩ đây là bản sao hoàn toàn độc lập.

Thực tế:

```javascript
{ ...product }
```

chỉ tạo **shallow copy** (sao chép nông).

---

### Bộ nhớ

Ban đầu:

```text
product
 └─ specs ──► { ram: 8, storage: 256, color: "Titan" }
```

Sau khi:

```javascript
const copy = { ...product };
```

```text
product.specs ─┐
               ├─► cùng 1 object specs
copy.specs ────┘
```

---

### Thay đổi

```javascript
copy.specs.ram = 16;
```

Vì `copy.specs` và `product.specs` cùng trỏ đến một object nên:

```javascript
product.specs.ram
```

cũng bị thay đổi.

---

### Output

```javascript
console.log(product.specs.ram);
```

```text
16
```

# Câu C1 (10đ) — Refactor Code

## Code sau khi refactor

```javascript
const processOrders = orders =>
    orders
        .filter(({ status, total }) =>
            status === "completed" && total > 100000
        )
        .map(({ id, customer, total }) => ({
            id,
            customer,
            total,
            discount: total * 0.1,
            finalTotal: total * 0.9
        }))
        .sort((a, b) => b.finalTotal - a.finalTotal);
```

---

## Những cải tiến đã thực hiện

### 1. Dùng `filter()`
Lọc các đơn hàng:

```javascript
status === "completed" && total > 100000
```

thay cho nhiều câu lệnh `if` lồng nhau.

---

### 2. Dùng `map()`
Tạo object mới:

```javascript
{
    id,
    customer,
    total,
    discount,
    finalTotal
}
```

thay cho:

```javascript
var item = {};
item.id = ...
item.customer = ...
...
```

---

### 3. Dùng Destructuring

```javascript
({ id, customer, total })
```

thay vì:

```javascript
orders[i].id
orders[i].customer
orders[i].total
```

---

### 4. Dùng Arrow Function

```javascript
const processOrders = orders => ...
```

ngắn gọn hơn Function Declaration truyền thống.

---

### 5. Dùng `sort()`

```javascript
.sort((a, b) => b.finalTotal - a.finalTotal)
```

thay cho 2 vòng lặp lồng nhau để sắp xếp giảm dần theo `finalTotal`.

---

## Kết quả

Hàm mới:

- Ngắn gọn hơn (8 dòng)
- Dễ đọc hơn
- Không dùng vòng lặp thủ công
- Tận dụng `filter`, `map`, `sort`, `destructuring`, `arrow function`
- Cho kết quả giống hệt code ban đầu

# Câu C2 (10đ) — Thiết kế API

## File: miniArray.js

```javascript
const miniArray = {
    // Giống Array.prototype.map
    map(arr, fn) {
        const result = [];

        for (let i = 0; i < arr.length; i++) {
            result.push(fn(arr[i], i, arr));
        }

        return result;
    },

    // Giống Array.prototype.filter
    filter(arr, fn) {
        const result = [];

        for (let i = 0; i < arr.length; i++) {
            if (fn(arr[i], i, arr)) {
                result.push(arr[i]);
            }
        }

        return result;
    },

    // Giống Array.prototype.reduce
    reduce(arr, fn, initialValue) {
        let accumulator = initialValue;

        for (let i = 0; i < arr.length; i++) {
            accumulator = fn(
                accumulator,
                arr[i],
                i,
                arr
            );
        }

        return accumulator;
    }
};

// ================= TEST =================

console.log(
    miniArray.map(
        [1, 2, 3],
        x => x * 2
    )
);
// [2, 4, 6]

console.log(
    miniArray.filter(
        [1, 2, 3, 4],
        x => x > 2
    )
);
// [3, 4]

console.log(
    miniArray.reduce(
        [1, 2, 3, 4],
        (a, b) => a + b,
        0
    )
);
// 10
```

---

## Kết quả mong đợi

```javascript
[2, 4, 6]
[3, 4]
10
```

---

## Giải thích

### map()

Duyệt qua từng phần tử, áp dụng callback rồi đưa kết quả vào mảng mới.

```javascript
miniArray.map([1,2,3], x => x * 2)
```

↓

```javascript
[2,4,6]
```

---

### filter()

Chỉ giữ lại những phần tử mà callback trả về `true`.

```javascript
miniArray.filter([1,2,3,4], x => x > 2)
```

↓

```javascript
[3,4]
```

---

### reduce()

Gộp toàn bộ mảng thành một giá trị duy nhất.

```javascript
miniArray.reduce(
    [1,2,3,4],
    (a,b) => a + b,
    0
)
```

Quá trình:

```text
0 + 1 = 1
1 + 2 = 3
3 + 3 = 6
6 + 4 = 10
```

↓

```javascript
10
```
