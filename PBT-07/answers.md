# PHẦN A

# Câu A1
**Dự đoán Output:**
- Đoạn 1: undefined (Do var có hoisting nhưng chỉ đưa phần khai báo lên đầu, chưa gán giá trị).
- Đoạn 2: Lỗi ReferenceError (Do let nằm trong vùng nhớ tạm thời "Temporal Dead Zone - TDZ", không thể truy cập trước khi khởi tạo).
- Đoạn 3: Lỗi TypeError: Assignment to constant variable. (Không thể gán lại giá trị cho biến const).
- Đoạn 4: [1, 2, 3, 4] (const chỉ không cho phép gán lại toàn bộ biến bằng một giá trị mới, nhưng vẫn cho phép thay đổi nội dung bên trong object/array).
- Đoạn 5:
Trong block: 2
Ngoài block: 1
(Giải thích: let có block scope, nên biến a bên trong {} là một biến hoàn toàn độc lập với biến a bên ngoài).

## Câu A2 (5đ) — Data Types & Coercion

**1. Dự đoán kết quả:**
* `console.log(typeof null);` // "object"
* `console.log(typeof undefined);` // "undefined"
* `console.log(typeof NaN);` // "number"
* `console.log("5" + 3);` // "53"
* `console.log("5" - 3);` // 2
* `console.log("5" * "3");` // 15
* `console.log(true + true);` // 2
* `console.log([] + []);` // ""
* `console.log([] + {});` // "[object Object]"
* `console.log({} + []);` // "[object Object]"

**2. Giải thích sự khác biệt giữa `"5" + 3` và `"5" - 3`:**
* **`"5" + 3` (Kết quả là "53"):** Khi sử dụng toán tử `+` và có một toán hạng là chuỗi (String), JavaScript sẽ ưu tiên thực hiện phép **nối chuỗi**. Nó tự động ép kiểu số `3` thành chuỗi `"3"` và nối lại thành `"53"`.
* **`"5" - 3` (Kết quả là 2):** Toán tử `-` chỉ được dùng cho các phép tính toán học. Do đó, JavaScript bắt buộc phải **ép kiểu chuỗi về số** (Type Coercion). Chuỗi `"5"` biến thành số `5`, và thực hiện phép toán `5 - 3 = 2`.

## Câu A3 (5đ) — So sánh == vs ===

**1. Dự đoán true hay false:**
* `console.log(5 == "5");` // true
* `console.log(5 === "5");` // false
* `console.log(null == undefined);` // true
* `console.log(null === undefined);` // false
* `console.log(NaN == NaN);` // false (Quy tắc đặc biệt: NaN không bằng bất cứ thứ gì, kể cả chính nó)
* `console.log(0 == false);` // true
* `console.log(0 === false);` // false
* `console.log("" == false);` // true

**2. Quy tắc: Từ giờ trở đi, bạn nên dùng == hay ===? Tại sao?**
* **Nên dùng:** Luôn luôn sử dụng **`===`** (và `!==`).
* **Tại sao:** `===` là phép so sánh nghiêm ngặt (Strict Equality), nó kiểm tra sự đồng nhất của cả **giá trị** lẫn **kiểu dữ liệu**. Trong khi đó, `==` (Loose Equality) sẽ tự động ép kiểu (Type Coercion) ngầm định trước khi so sánh, dễ gây ra các lỗi logic khó lường và khó debug (ví dụ như việc `"" == false` lại trả về `true`). Dùng `===` giúp code an toàn và dễ đoán hơn.

## Câu A4 (5đ) — Truthy & Falsy

**1. TẤT CẢ các giá trị Falsy trong JavaScript (8 giá trị):**
Trong JavaScript, chỉ có đúng 8 giá trị sau đây được coi là Falsy (tự động chuyển thành `false` trong câu lệnh điều kiện):
1. `false`
2. `0`
3. `-0`
4. `0n` (BigInt zero)
5. `""` (chuỗi rỗng)
6. `null`
7. `undefined`
8. `NaN`
*(Mọi giá trị khác không nằm trong danh sách này đều là Truthy).*

**2. Dự đoán kết quả:**
* `if ("0") console.log("A");` // **In** (Chuỗi có chứa ký tự "0" là chuỗi khác rỗng -> Truthy)
* `if ("") console.log("B");` // **Không in** (Chuỗi rỗng là Falsy)
* `if ([]) console.log("C");` // **In** (Array, kể cả array trống, luôn là một Object -> Truthy)
* `if ({}) console.log("D");` // **In** (Object, kể cả object trống, luôn là Truthy)
* `if (null) console.log("E");` // **Không in** (Falsy)
* `if (0) console.log("F");` // **Không in** (Falsy)
* `if (-1) console.log("G");` // **In** (Số âm hoặc số dương khác 0 đều là Truthy)
* `if (" ") console.log("H");` // **In** (Chuỗi chứa 1 dấu cách là chuỗi khác rỗng -> Truthy)

## Câu A5 (5đ) — Template Literals

**Viết lại 3 cách nối chuỗi bằng template literal (backtick):**

```javascript
// Cách 1:
var greeting = `Xin chào ${name}! Bạn ${age} tuổi.`;

// Cách 2:
var url = `https://api.example.com/users/${userId}/orders?page=${page}`;

// Cách 3:
var html = `
<div class="card">
  <h2>${title}</h2>
  <p>${description}</p>
  <span>Giá: ${price}đ</span>
</div>
`;
```

# PHẦN C — SUY LUẬN (20 điểm)

## Câu C1

**1. Liệt kê các lỗi và cách sửa:**

1. Sai toán tử so sánh: `if (giaSauGiam = 0)` đang sử dụng toán tử gán `=`, khiến kết quả luôn trả về giá trị được gán và chạy sai logic. Sửa thành: `if (giaSauGiam === 0)`.
2. Sai kiểu dữ liệu đầu vào: `tinhGiaGiamGia("100000", 20)` truyền `giaBan` dưới dạng chuỗi (String). Dù JavaScript có thể ép kiểu tự động khi nhân chia, việc này vẫn tiềm ẩn lỗi ở các phép cộng. Sửa thành: Truyền kiểu số `tinhGiaGiamGia(100000, 20)`.
3. Thiếu kiểm tra đầu vào (Validate): Hàm chỉ kiểm tra `phanTramGiam` mà không kiểm tra xem `giaBan` có hợp lệ (là số, lớn hơn hoặc bằng 0) hay không. Sửa thành: Bổ sung điều kiện kiểm tra biến `giaBan`.
4. Xử lý lỗi sai cách: Return về một chuỗi `"Phần trăm giảm không hợp lệ"` khi gặp lỗi làm hỏng cấu trúc dữ liệu trả về của hàm (lẫn lộn giữa Number và String). Sửa thành: Dùng `throw new Error()`.
5. Khai báo biến lỗi thời: Dùng `var giamGia` không chặt chẽ về scope. Sửa thành: Dùng `const` cho `giamGia` và `giaSauGiam` vì các biến này không bị gán lại.

2. Giải thích lỗi "ẩn" liên quan đến `var` trong vòng lặp và cách sửa:
* Nguyên nhân: Từ khóa `var` có phạm vi function scope, không có block scope. Do đó, toàn bộ vòng lặp chỉ dùng chung một biến bộ nhớ `i` duy nhất. Vòng lặp chạy rất nhanh và kết thúc khiến `i` nhảy lên giá trị `5`. Một giây sau, 5 hàm callback trong `setTimeout` mới đồng loạt chạy và gọi đến `i`, lúc này `i` đã là `5` nên màn hình sẽ in ra "Item 5" năm lần liên tục.
* Cách sửa: Thay `var i = 0` bằng `let i = 0`. Vì `let` có block scope, mỗi lần lặp nó sẽ tạo ra một biến `i` hoàn toàn mới và độc lập, giúp `setTimeout` lưu giữ chính xác giá trị của vòng lặp đó.

**3. Code hoàn chỉnh đã sửa:**

```javascript
function tinhGiaGiamGia(giaBan, phanTramGiam) {
  if (typeof giaBan !== "number" || giaBan < 0) {
    throw new Error("Giá bán không hợp lệ");
  }

  if (typeof phanTramGiam !== "number" || phanTramGiam < 0 || phanTramGiam > 100) {
    throw new Error("Phần trăm giảm không hợp lệ");
  }

  const giamGia = (giaBan * phanTramGiam) / 100;
  const giaSauGiam = giaBan - giamGia;

  if (giaSauGiam === 0) {
    console.log("Sản phẩm miễn phí!");
  }

  return giaSauGiam;
}

try {
  const gia = tinhGiaGiamGia(100000, 20);
  console.log("Giá sau giảm: " + gia + "đ");

  const gia2 = tinhGiaGiamGia(50000, 110);
  console.log("Giá: " + gia2);
} catch (error) {
  console.error("Lỗi:", error.message);
}

for (let i = 0; i < 5; i++) {
  setTimeout(function () {
    console.log("Item " + i);
  }, 1000);
}
```