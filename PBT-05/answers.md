# PHẦN A — KIỂM TRA ĐỌC HIỂU (20 điểm)
## Câu A1 — Viewport & Mobile-First

### 1. Thẻ `<meta viewport>` chuẩn
Tài liệu tham chiếu: `tuan_3_css_advanced/13_creating_responsive_layouts.md → 16_sass_scss.md`


```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

### 2. Giải thích từng thuộc tính

| Thuộc tính | Ý nghĩa |
|---|---|
| `name="viewport"` | Khai báo thiết lập viewport cho thiết bị mobile |
| `width=device-width` | Chiều rộng trang web bằng đúng chiều rộng màn hình thiết bị |
| `initial-scale=1.0` | Mức zoom ban đầu = 100% |


### 3. Nếu thiếu thẻ viewport thì chuyện gì xảy ra?

Nếu thiếu thẻ này, iPhone sẽ giả định trang web rộng khoảng 980px như desktop.

Kết quả:

- Toàn bộ trang bị thu nhỏ lại
- Chữ rất nhỏ
- Nút bấm khó nhấn
- Người dùng phải zoom để đọc
- Layout responsive hoạt động sai

→ UX rất tệ trên mobile.


## 4. Mobile-First vs Desktop-First

| Mobile-First | Desktop-First |
|---|---|
| Viết CSS cho mobile trước | Viết CSS cho desktop trước |
| Dùng `min-width` | Dùng `max-width` |
| Progressive enhancement | Thu nhỏ dần layout |
| Được khuyên dùng hiện nay | Cách cũ |


## 5. Ví dụ Mobile-First (breakpoint 768px)

```css
/* Mobile mặc định */
.container{
    display: flex;
    flex-direction: column;
}

/* Tablet/Desktop */
@media (min-width: 768px){
    .container{
        flex-direction: row;
    }
}
```

### Giải thích:
- Mobile dùng layout dọc
- Khi màn hình ≥ 768px → đổi sang layout ngang


## 6. Ví dụ Desktop-First (breakpoint 768px)

```css
/* Desktop mặc định */
.container{
    display: flex;
    flex-direction: row;
}

/* Mobile */
@media (max-width: 768px){
    .container{
        flex-direction: column;
    }
}
```

### Giải thích:
- Desktop dùng layout ngang
- Khi màn hình ≤ 768px → đổi sang layout dọc


## 7. Tại sao Mobile-First được khuyên dùng?

### Mobile-First tốt hơn vì:

- Mobile tải ít CSS hơn
- Tối ưu performance trên điện thoại
- Buộc developer ưu tiên nội dung quan trọng
- Phù hợp với Mobile-First Indexing của Google
- Responsive dễ quản lý hơn khi mở rộng lên tablet/desktop

→ Đây là cách viết responsive hiện đại được dùng phổ biến hiện nay.

## Câu A2 — Breakpoints

| Breakpoint | Kích thước | Thiết bị đại diện | Ví dụ lưới sản phẩm |
|---|---|---|---|
| Mobile | `< 576px` | iPhone SE, điện thoại nhỏ | 1 cột |
| Mobile Large | `≥ 576px` | iPhone Plus, điện thoại ngang | 2 cột |
| Tablet | `≥ 768px` | iPad dọc, tablet | 2 cột |
| Desktop | `≥ 992px` | Laptop nhỏ | 3 cột |
| Desktop Large | `≥ 1200px` | Desktop, laptop lớn | 4 cột |
| Desktop XL | `≥ 1400px` | Màn hình lớn, 4K | 5–6 cột |


## Ví dụ Responsive Product Grid

```css
.product-grid{
    display: grid;
    grid-template-columns: 1fr;
    gap: 16px;
}

/* Mobile Large */
@media (min-width: 576px){
    .product-grid{
        grid-template-columns: repeat(2, 1fr);
    }
}

/* Tablet */
@media (min-width: 768px){
    .product-grid{
        grid-template-columns: repeat(2, 1fr);
    }
}

/* Desktop */
@media (min-width: 992px){
    .product-grid{
        grid-template-columns: repeat(3, 1fr);
    }
}

/* Desktop Large */
@media (min-width: 1200px){
    .product-grid{
        grid-template-columns: repeat(4, 1fr);
    }
}
```

### Giải thích:

- Mobile nhỏ → 1 cột để dễ đọc
- Tablet → 2 cột
- Desktop → 3–4 cột để tận dụng không gian màn hình
- Màn hình lớn → nhiều cột hơn

## Câu A3 — Media Queries

CSS:

```css
.container { width: 100%; padding: 10px; }

@media (min-width: 576px) {
    .container { width: 540px; }
}

@media (min-width: 768px) {
    .container { width: 720px; }
}

@media (min-width: 992px) {
    .container { width: 960px; }
}

@media (min-width: 1200px) {
    .container { width: 1140px; }
}
```


| Chiều rộng màn hình | `.container width` |
|---|---|
| 375px (iPhone SE) | `100%` |
| 600px | `540px` |
| 800px | `720px` |
| 1000px | `960px` |
| 1400px | `1140px` |

---

## Giải thích

- 375px `< 576px`
→ Không media query nào chạy
→ width = `100%`

- 600px `≥ 576px`
→ Media query đầu tiên hoạt động
→ width = `540px`

- 800px `≥ 768px`
→ Query 768px ghi đè query 576px
→ width = `720px`

- 1000px `≥ 992px`
→ width = `960px`

- 1400px `≥ 1200px`
→ width = `1140px`

## Câu A4 — SCSS Basics

## 1. Variables — Biến trong SCSS

Variables dùng để lưu màu sắc, font-size, spacing...
Khi đổi giá trị biến, toàn bộ nơi sử dụng sẽ tự cập nhật.

### Ví dụ:

```scss
$primary-color: #2563eb;
$text-color: #1e293b;

.button{
    background: $primary-color;
    color: white;
}

.title{
    color: $text-color;
}
```

### Lợi ích:
- Dễ đổi theme
- Tránh lặp code
- Quản lý design system tốt hơn


## 2. Nesting — CSS lồng nhau

SCSS cho phép viết CSS theo cấu trúc HTML,
giúp code dễ đọc hơn.

### Ví dụ:

```scss
.navbar{

    background: black;

    .logo{
        color: white;
    }

    .menu{
        display: flex;

        a{
            color: white;

            &:hover{
                color: yellow;
            }
        }
    }
}
```

### Compile thành CSS:

```css
.navbar{
    background: black;
}

.navbar .logo{
    color: white;
}

.navbar .menu{
    display: flex;
}

.navbar .menu a{
    color: white;
}

.navbar .menu a:hover{
    color: yellow;
}
```

### Lợi ích:
- Code rõ ràng
- Dễ tổ chức component
- Viết nhanh hơn

## 3. Mixins — Tái sử dụng code

Mixin giống function trong lập trình.
Dùng để tái sử dụng nhiều đoạn CSS giống nhau.

### Định nghĩa mixin:

```scss
@mixin flex-center{
    display: flex;
    justify-content: center;
    align-items: center;
}
```

### Sử dụng:

```scss
.box{
    @include flex-center;
    height: 200px;
}
```

### Output CSS:

```css
.box{
    display: flex;
    justify-content: center;
    align-items: center;
    height: 200px;
}
```

### Lợi ích:
- Giảm lặp code
- Tái sử dụng dễ dàng
- Rất hữu ích cho responsive và button styles


## 4. @extend / Inheritance

`@extend` cho phép một class kế thừa style của class khác.

### Ví dụ:

```scss
.button{
    padding: 12px 24px;
    border-radius: 8px;
    color: white;
}

.button-primary{
    @extend .button;
    background: blue;
}

.button-danger{
    @extend .button;
    background: red;
}
```

### Compile thành CSS:

```css
.button,
.button-primary,
.button-danger{
    padding: 12px 24px;
    border-radius: 8px;
    color: white;
}

.button-primary{
    background: blue;
}

.button-danger{
    background: red;
}
```

### Lợi ích:
- Kế thừa style nhanh
- Tránh viết lại CSS

## 5. Tại sao browser không đọc được file `.scss`?

Browser chỉ hiểu CSS thuần.

SCSS có:
- Variables (`$primary`)
- Mixins (`@mixin`)
- Nesting
- Functions (`darken()`)
- Loops, conditions...

→ Đây không phải cú pháp CSS chuẩn.

Vì vậy browser KHÔNG thể đọc trực tiếp file `.scss`


## 6. Cần bước gì để chuyển SCSS → CSS?

Cần compile SCSS thành CSS bằng SCSS compiler.

### Quy trình:

```text
SCSS → Compiler → CSS → Browser
```

### Công cụ phổ biến:

- Live Sass Compiler (VS Code)
- Vite
- Webpack
- Node Sass / Dart Sass

### Ví dụ:

```bash
npx sass styles.scss styles.css
```

Sau khi compile:

```scss
$primary: blue;

.button{
    background: $primary;
}
```

↓

```css
.button{
    background: blue;
}
```

→ Browser sẽ đọc file CSS đã compile.

# PHẦN B — THỰC HÀNH CODE (60 điểm)
## Bài B3 (20đ) — SCSS Refactor

 *Các phương thức biên dịch SCSS → CSS trong dự án*

* Cách 1: Sử dụng Extension "Live Sass Compiler" trên VS Code

Đây là công cụ tự động hóa trực quan nhất được tích hợp ngay bên trong trình chỉnh sửa mã nguồn VS Code.

### Bước 1:
Cài đặt Extension:

```txt
Live Sass Compiler
```

(Tác giả: Glenn Marks)

Từ cửa sổ Extensions:

```txt
Ctrl + Shift + X
```


### Bước 2:

Di chuyển chuột xuống thanh trạng thái (Status Bar) dưới đáy màn hình VS Code.

### Bước 3:

Nhấn vào nút:

```txt
Watch Sass
```

Ngay lập tức trạng thái sẽ chuyển thành:

```txt
Watching...
```


### Bước 4:

Mỗi khi nhấn:

```txt
Ctrl + S
```

để lưu file:

```txt
scss/style.scss
```

hệ thống sẽ tự động biên dịch và tạo ra:

```txt
scss/style.css
scss/style.css.map
```


* Cách 2: Sử dụng Terminal / Command Line (Sass CLI)

Nếu không dùng extension giao diện đồ họa, dự án có thể được biên dịch trực tiếp thông qua Terminal (Git Bash, PowerShell, CMD).


### Lệnh biên dịch thủ công một lần (Compile Once)

```bash
sass scss/style.scss scss/style.css
```

Lệnh này sẽ:

- Đọc file:

```txt
scss/style.scss
```

- Sau đó biên dịch thành:

```txt
scss/style.css
```


### Lệnh Watch Mode (Tự động compile khi save)

```bash
sass scss/style.scss scss/style.css --watch
```

# PHẦN C — PHÂN TÍCH (20 điểm)
## Câu C1 — Phân tích Responsive Design của YouTube

### Website được chọn:
YouTube

---

**1. Mobile (375px)**

#### Navigation thay đổi thế nào?

- Thanh navigation trên cùng vẫn giữ:
  - Logo YouTube
  - Icon search
  - Avatar/account

- Sidebar bên trái bị ẩn hoàn toàn.
- Xuất hiện menu dạng icon ở dưới màn hình:
  - Home
  - Shorts
  - Subscriptions
  - Library

- Thanh tìm kiếm đầy đủ bị thu gọn thành icon kính lúp.


#### Lưới content thay đổi thế nào?

- Video hiển thị:
  - 1 cột
- Mỗi video chiếm gần toàn bộ chiều rộng màn hình.


#### Elements bị ẩn trên mobile

- Sidebar đầy đủ
- Một số nút text trong navigation
- Filter tags hiển thị ít hơn
- Banner quảng cáo lớn bị giảm


#### Font size

- Font nhỏ hơn desktop
- Khoảng cách padding/margin giảm để tiết kiệm không gian


**2. Tablet (768px)**

#### Navigation thay đổi thế nào?

- Sidebar xuất hiện dạng thu gọn:
  - Chỉ icon
  - Không có text đầy đủ

- Thanh search dài hơn mobile.


#### Lưới content thay đổi thế nào?

- Video hiển thị:
  - 2 cột
- Thumbnail nhỏ hơn desktop nhưng lớn hơn mobile.


#### Elements bị ẩn

- Một số menu phụ vẫn bị ẩn
- Sidebar chưa mở full

#### Font size

- Lớn hơn mobile
- Spacing thoáng hơn


**3. Desktop (1440px)**

#### Navigation thay đổi thế nào?

- Sidebar đầy đủ:
  - Home
  - Shorts
  - Subscriptions
  - History
  - Playlists
  - Watch Later

- Thanh search đầy đủ kích thước lớn
- Hiển thị thêm nút Create, Notifications, Profile


#### Lưới content thay đổi thế nào?

- Video hiển thị:
  - 4 → 6 cột tùy chiều rộng màn hình

- Layout rộng và nhiều khoảng trắng hơn.

#### Elements bị ẩn

- Hầu như không bị ẩn
- Hiển thị đầy đủ chức năng


#### Font size

- Font lớn hơn
- Padding và khoảng cách rộng hơn mobile/tablet

## Câu C2 — Thiết kế Responsive Strategy cho trang Đặt bàn nhà hàng

### 1. Wireframe — Mobile (< 768px)

```txt
┌──────────────────────┐
│ LOGO     ☰ MENU      │
│ Hotline đặt bàn      │
├──────────────────────┤
│                      │
│     HERO IMAGE       │
│                      │
├──────────────────────┤
│     FOOD CARD 1      │
├──────────────────────┤
│     FOOD CARD 2      │
├──────────────────────┤
│     FOOD CARD 3      │
├──────────────────────┤
│     FOOD CARD 4      │
├──────────────────────┤
│     FOOD CARD 5      │
├──────────────────────┤
│     FOOD CARD 6      │
├──────────────────────┤
│     BOOKING FORM     │
│  Date / Time / Note  │
├──────────────────────┤
│      GOOGLE MAP      │
├──────────────────────┤
│        FOOTER        │
└──────────────────────┘
```

#### Phân tích Mobile

- Navigation đầy đủ bị ẩn
- Chỉ hiện hamburger menu ☰
- Form đặt bàn nằm dưới grid món ăn
- Layout 1 cột để dễ đọc trên điện thoại

---

### 2. Wireframe — Tablet (768px — 1023px)

```txt
┌──────────────────────────────────┐
│ LOGO     MENU      Hotline       │
├──────────────────────────────────┤
│                                  │
│          HERO IMAGE              │
│                                  │
├──────────────┬───────────────────┤
│ FOOD CARD 1 │ FOOD CARD 2        │
├──────────────┼───────────────────┤
│ FOOD CARD 3 │ FOOD CARD 4        │
├──────────────┼───────────────────┤
│ FOOD CARD 5 │ FOOD CARD 6        │
├──────────────────────────────────┤
│         BOOKING FORM             │
├──────────────────────────────────┤
│          GOOGLE MAP              │
├──────────────────────────────────┤
│            FOOTER                │
└──────────────────────────────────┘
```

#### Phân tích Tablet

- Food grid hiển thị 2 cột
- Navigation hiển thị đầy đủ hơn mobile
- Google Maps nằm dưới form
- Layout vẫn ưu tiên dạng dọc

---

### 3. Wireframe — Desktop (≥ 1024px)

```txt
┌──────────────────────────────────────────────────────┐
│ LOGO        MENU NAVIGATION          Hotline         │
├──────────────────────────────────────────────────────┤
│                                                      │
│                   HERO IMAGE                         │
│                                                      │
├───────────────────┬──────────────────────────────────┤
│                   │                                  │
│   BOOKING FORM    │         FOOD GRID               │
│                   │   ┌────┬────┬────┐              │
│                   │   │ F1 │ F2 │ F3 │              │
│                   │   ├────┼────┼────┤              │
│                   │   │ F4 │ F5 │ F6 │              │
│                   │                                  │
├───────────────────┴──────────────────────────────────┤
│                   GOOGLE MAP                         │
├──────────────────────────────────────────────────────┤
│                     FOOTER                           │
└──────────────────────────────────────────────────────┘
```

#### Phân tích Desktop

- Layout chính gồm 2 cột
- Booking form bên trái
- Food grid bên phải
- Grid món ăn hiển thị 3 cột
- Không cần sidebar riêng

---

### CSS Skeleton — Mobile First

```css
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: sans-serif;
}

.layout {
    display: grid;
    gap: 20px;
    padding: 16px;
}

.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.hero {
    height: 300px;
    background: #ddd;
}

.food-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 16px;
}

.food-card {
    background: #f5f5f5;
    padding: 20px;
    min-height: 180px;
}

.booking-form {
    display: grid;
    gap: 12px;
}

.map {
    height: 300px;
    background: #ccc;
}

.footer {
    text-align: center;
    padding: 20px;
    background: #222;
    color: white;
}

/* TABLET */

@media (min-width: 768px) {

    .food-grid {
        grid-template-columns: repeat(2, 1fr);
    }

}

/* DESKTOP */

@media (min-width: 1024px) {

    .main-content {
        display: grid;
        grid-template-columns: 300px 1fr;
        gap: 24px;
    }

    .food-grid {
        grid-template-columns: repeat(3, 1fr);
    }

}
```






