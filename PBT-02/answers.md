# PHẦN A

## A

### A1
1. type="email" → Ô nhập dạng text → Tự kiểm tra có ký tự @ và định dạng email → Dùng cho đăng ký tài khoản / nhập email nhận thông báo

2. type="password" → Ô nhập nhưng ký tự bị ẩn (••••) → Không validation đặc biệt (chỉ kiểm tra required/minlength nếu có) → Dùng cho đăng nhập tài khoản

3. type="text" → Ô nhập văn bản bình thường → Không validation mặc định → Dùng nhập tên sản phẩm, tên khách hàng

4. type="number" → Ô nhập số, có nút tăng/giảm → Chỉ cho nhập số, có thể giới hạn min/max → Dùng nhập số lượng sản phẩm

5. type="tel" → Ô nhập số điện thoại → Không validation chặt nhưng hỗ trợ bàn phím số trên mobile → Dùng nhập số điện thoại khách hàng

6. type="url" → Ô nhập link → Tự kiểm tra định dạng URL (http:// hoặc https://) → Dùng nhập link sản phẩm / website

7. type="search" → Ô tìm kiếm (có nút xóa nhanh) → Không validation đặc biệt → Dùng cho thanh tìm kiếm sản phẩm

8. type="date" → Hiển thị lịch chọn ngày → Chỉ cho chọn ngày hợp lệ → Dùng chọn ngày giao hàng / ngày sinh

9. type="radio" → Nút chọn 1 trong nhiều lựa chọn → Bắt buộc chọn 1 nếu required → Dùng chọn phương thức thanh toán (COD, ví, thẻ)

10. type="checkbox" → Ô tick nhiều lựa chọn → Không validation mặc định → Dùng chọn đồng ý điều khoản / chọn nhiều sản phẩm

### A2
Trường hợp 1:
<input type="text" required value="">
→ Kết quả: Không submit được
→ Lý do: Thuộc tính required bắt buộc phải nhập, để trống sẽ bị trình duyệt chặn

Trường hợp 2:
<input type="email" value="abc">
→ Kết quả: Không submit được
→ Lý do: type="email" yêu cầu đúng định dạng email (phải có @), "abc" không hợp lệ

Trường hợp 3:
<input type="number" min="1" max="10" value="15">
→ Kết quả: Không submit được
→ Lý do: Giá trị 15 vượt quá max=10 nên bị validation chặn

Trường hợp 4:
<input type="text" pattern="[0-9]{10}" value="abc123">
→ Kết quả: Không submit được
→ Lý do: pattern yêu cầu đúng 10 chữ số, "abc123" không khớp regex

Trường hợp 5:
<input type="password" minlength="8" value="123">
→ Kết quả: Không submit được
→ Lý do: minlength=8 nhưng chỉ nhập 3 ký tự nên không hợp lệ

### A3
#### 1. Tại sao `<label for="email">` quan trọng?

* `<label>` liên kết với `<input>` thông qua thuộc tính `for` và `id`
* Screen reader sẽ đọc nội dung của label khi người dùng focus vào ô input
* Giúp người dùng biết cần nhập thông tin gì (ví dụ: “Email”)
* Tăng khả năng sử dụng: click vào label cũng focus vào input

→ Nếu không có `<label>`, screen reader chỉ đọc “edit text” → không rõ ý nghĩa

#### 2. Khi nào dùng `<fieldset>` + `<legend>`?

* Dùng khi có nhiều input cùng một nhóm liên quan
* Giúp screen reader hiểu ngữ cảnh chung của các lựa chọn

**Ví dụ (E-Commerce – chọn phương thức thanh toán):**

```html
<fieldset>
  <legend>Phương thức thanh toán</legend>

  <label>
    <input type="radio" name="payment" value="cod">
    Thanh toán khi nhận hàng
  </label>

  <label>
    <input type="radio" name="payment" value="card">
    Thẻ ngân hàng
  </label>
</fieldset>
```

→ Screen reader sẽ đọc: “Phương thức thanh toán” trước khi đọc từng lựa chọn

#### 3. `aria-label` dùng khi nào?

* Dùng khi không có text hiển thị nhưng vẫn cần mô tả cho screen reader

**Ví dụ:**

```html
<button aria-label="Tìm kiếm">🔍</button>
```

→ Vì nút chỉ có icon nên cần aria-label để mô tả chức năng

#### 4. Tại sao KHÔNG nên dùng `aria-label` khi đã có `<label>`?

* `<label>` là semantic chuẩn của HTML, nên ưu tiên sử dụng
* `aria-label` có thể ghi đè nội dung label → gây trùng hoặc sai thông tin
* Làm giảm tính nhất quán giữa giao diện và screen reader

→ Chỉ dùng `aria-label` khi không thể dùng `<label>`

### A4
#### 1. Thuộc tính `loading="lazy"` trên `<img>`

* Là cơ chế **lazy loading**: ảnh chỉ được tải khi gần xuất hiện trong viewport (màn hình)
* Không tải toàn bộ ảnh ngay từ đầu

**Cải thiện:**

* Tăng tốc độ load trang ban đầu
* Giảm băng thông
* Cải thiện hiệu năng (đặc biệt trang nhiều ảnh như e-commerce)

**Khi KHÔNG nên dùng:**

* Ảnh quan trọng nằm ngay đầu trang (hero banner)
* Ảnh cần hiển thị ngay lập tức (logo, ảnh chính sản phẩm)
* Khi gây “delay” trải nghiệm người dùng

#### 2. Tại sao nên dùng nhiều `<source>` trong `<video>`?

* Trình duyệt khác nhau hỗ trợ format video khác nhau
* Nếu 1 format không chạy → trình duyệt sẽ thử format khác
* Tăng khả năng tương thích đa nền tảng

**Ví dụ:**

```html
<video controls>
  <source src="video.mp4" type="video/mp4">
  <source src="video.webm" type="video/webm">
  <source src="video.ogg" type="video/ogg">
</video>
```

**3 format phổ biến:**

* MP4 (phổ biến nhất)
* WebM
* Ogg

#### 3. Thuộc tính `alt` trên `<img>` dùng để làm gì?

* Mô tả nội dung ảnh cho screen reader
* Hiển thị khi ảnh bị lỗi không load
* Quan trọng cho SEO và accessibility

#### Viết alt cho từng trường hợp:

**a. Ảnh sản phẩm iPhone 16:**

```html
alt="iPhone 16 màu đen, màn hình 6.1 inch"
```

**b. Ảnh trang trí (decorative):**

```html
alt=""
```

→ Để rỗng để screen reader bỏ qua

**c. Ảnh biểu đồ doanh thu Q1/2026:**

alt="Biểu đồ doanh thu quý 1 năm 2026, tăng mạnh trong tháng 3"

### A5
#### 1. Khi nào dùng Cách 1 (`<img>`)
html
<img src="product.jpg" alt="iPhone">
```

* Dùng khi ảnh **độc lập**, không cần chú thích đi kèm
* Nội dung ảnh đã đủ rõ qua `alt` hoặc context xung quanh

**Ví dụ thực tế:**

1. Logo website ở header
2. Icon nhỏ (giỏ hàng, tìm kiếm, menu)

#### 2. Khi nào dùng Cách 2 (`<figure>` + `<figcaption>`)

```html
<figure>
    <img src="product.jpg" alt="iPhone 16 Pro Max 256GB Titan">
    <figcaption>iPhone 16 Pro Max — 25.990.000đ</figcaption>
</figure>
```

* Dùng khi ảnh cần **chú thích rõ ràng**
* Ảnh và mô tả là **một khối nội dung liên quan**

**Ví dụ thực tế:**

1. Ảnh sản phẩm + tên + giá trong trang bán hàng
2. Ảnh minh họa bài viết + caption giải thích (ví dụ: biểu đồ, ảnh sự kiện)

## C

### C1
Lỗi 1: Dòng 2 — Input "Tên" không có `<label for="...">`, vi phạm accessibility
Sửa: `<label for="name">Tên:</label> <input type="text" id="name" name="name" required>`
---
Lỗi 2: Dòng 4 — Input email không có `<label>`
Sửa: `<label for="email">Email:</label> <input type="email" id="email" name="email" required placeholder="Email của bạn">`
---
Lỗi 3: Dòng 6–7 — Hai input password không có label và không phân biệt rõ
Sửa:
`<label for="password">Mật khẩu:</label> <input type="password" id="password" name="password" required minlength="8">`
`<label for="confirm">Nhập lại mật khẩu:</label> <input type="password" id="confirm" name="confirm" required>`
---
Lỗi 4: Dòng 6 — Password không có validation (minlength)
Sửa: thêm `minlength="8"` vào input password
---
Lỗi 5: Dòng 9 — Phone dùng `type="text"` không phù hợp
Sửa: `<label for="phone">Phone:</label> <input type="tel" id="phone" name="phone" required>`
---
Lỗi 6: Dòng 9 — Không nên dùng `value` mặc định cho số điện thoại (dễ gây sai dữ liệu)
Sửa: bỏ `value="0901234567"` và dùng `placeholder`
---
Lỗi 7: Dòng 11–14 — `<select>` không có `<label>`
Sửa:
`<label for="city">Thành phố:</label>`
`<select id="city" name="city">...</select>`
---
Lỗi 8: Dòng 16 — Checkbox "đồng ý điều khoản" thiếu input type="checkbox"
Sửa:
`<label><input type="checkbox" name="terms" required> Tôi đồng ý điều khoản</label>`

### C2
#### 1. Regex (pattern)
* **CMND/CCCD (12 chữ số):**

```html
pattern="[0-9]{12}"
```

* **Số tài khoản (10–15 chữ số):**

```html
pattern="[0-9]{10,15}"
```
---
#### 2. HTML5 validation có đủ an toàn cho ngân hàng không?

→ **KHÔNG đủ an toàn**

**Lý do:**

* HTML5 validation chỉ chạy ở **trình duyệt (client-side)**
* Người dùng có thể:

  * Tắt validation
  * Sửa HTML bằng DevTools
  * Gửi request trực tiếp (bỏ qua form)

→ Vì vậy **không thể tin tưởng dữ liệu từ phía client**
#### 3. 3 loại validation HTML5 KHÔNG làm được (cần JavaScript / Backend)**
1. **So sánh nhiều trường**

   * Ví dụ: kiểm tra "Nhập lại mật khẩu" có giống mật khẩu không

2. **Kiểm tra logic phức tạp**

   * Ví dụ: CMND hợp lệ theo quy tắc checksum
   * Kiểm tra tuổi ≥ 18 từ ngày sinh

3. **Kiểm tra dữ liệu với server**

   * Ví dụ:

     * Email đã tồn tại chưa
     * Số tài khoản có hợp lệ trong hệ thống không

#### 4. 2 rủi ro bảo mật nếu chỉ validate Frontend
1. **Dữ liệu giả mạo**

   * Hacker có thể bypass validation → gửi dữ liệu sai/độc hại

2. **Tấn công hệ thống (Injection)**

   * Nếu backend không kiểm tra:

     * SQL Injection
     * XSS (Cross-site scripting)

→ Có thể gây:

* Lộ dữ liệu
* Hỏng hệ thống
