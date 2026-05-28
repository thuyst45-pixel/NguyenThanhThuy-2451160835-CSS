# Phần A Câu A1 - HTTP & Browser

## Câu 1:
Khi nhập https://shopee.vn vào trình duyệt, các bước xảy ra:

1. DNS Lookup: Trình duyệt tìm địa chỉ IP của domain shopee.vn
2. TCP Handshake: Thiết lập kết nối TCP với server
3. TLS Handshake: Thiết lập kết nối bảo mật HTTPS
4. Gửi HTTP Request đến server
5. Server trả về HTTP Response
6. Trình duyệt parse HTML và tải các tài nguyên (CSS, JS)
7. Render trang web

**Nguồn tham chiếu:**  
- File: `01_introduction_html_universe.md`  
- Phần: HTTP Request/Response + How the Web Works

---

## Câu 2:
Tab Network trong Chrome DevTools hiển thị thông tin về các request giữa trình duyệt và server, bao gồm:
- Status Code của request đầu tiên: 200
- Tổng thời gian load trang: 6.21s
- Một request trả về file CSS: bundle.9b0f374b2311b039.2023.css (type: stylesheet)

**Nguồn tham chiếu:**  
- File: `01_introduction_html_universe.md`  
- Phần: Browser & DevTools

## Câu A2:

### Các lỗi semantic:

1. Sử dụng thẻ div thay vì các thẻ semantic như header, main, footer
2. Không sử dụng thẻ nav cho menu điều hướng
3. Tiêu đề sản phẩm không dùng thẻ heading (h1, h2,...)
4. Ảnh không có thuộc tính alt

### Code sau khi sửa:

```html
<header>
    <div class="logo">ShopTLU</div>
    <nav>
        <a href="/">Trang chủ</a>
        <a href="/products">Sản phẩm</a>
    </nav>
</header>

<main>
    <section class="product">
        <h1>iPhone 16 Pro</h1>
        <p class="price">25.990.000đ</p>
        <img src="iphone.jpg" alt="iPhone 16 Pro">
    </section>
</main>

<footer>
    <p>© 2026 ShopTLU</p>
</footer>

**Nguồn tham chiếu:**


## Câu A3 - Block vs Inline

### Kết quả hiển thị
Hộp 1  
Text A Text B  
Hộp 2  
Text C **Text D**  
Hộp 3  

### Giải thích
- Thẻ `<div>` là block-level nên mỗi hộp nằm trên một dòng riêng.
- Thẻ `<span>` và `<strong>` là inline nên hiển thị liên tiếp trên cùng một dòng.
- `<strong>` làm chữ in đậm nhưng vẫn giữ tính chất inline.

## Câu A4 - Table

### Sự khác nhau giữa thead, tbody, tfoot
- `<thead>`: phần đầu bảng, chứa tiêu đề cột.
- `<tbody>`: phần thân bảng, chứa dữ liệu chính.
- `<tfoot>`: phần cuối bảng, chứa tổng kết hoặc ghi chú.

### Tại sao không nên dùng table để layout
1. Table không đúng mục đích, gây khó hiểu cho người đọc code.
2. Layout bằng table khó bảo trì, cứng nhắc.
3. Ảnh hưởng SEO và accessibility.
4. Hiệu năng kém, trình duyệt phải render toàn bộ bảng.
5. Có CSS hiện đại (Flexbox, Grid) thay thế.

# Phần C
## Câu C1:
<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <title>Chi tiết sản phẩm</title>
</head>
<body>

  <!-- Header + Navigation -->
  <header> <!-- header cho phần đầu trang -->
    <nav> <!-- nav cho menu điều hướng -->
      <!-- Liên kết menu -->
    </nav>
  </header>

  <!-- Breadcrumb -->
  <nav aria-label="breadcrumb"> <!-- nav vì đây là điều hướng phụ -->
    <ol> <!-- ol vì breadcrumb có thứ tự -->
      <li><a href="/">Trang chủ</a></li>
      <li><a href="/dien-thoai">Điện thoại</a></li>
      <li>iPhone 16</li>
    </ol>
  </nav>

  <!-- Khu vực sản phẩm -->
  <main> <!-- main cho nội dung chính -->

    <!-- Hình ảnh sản phẩm -->
    <section> <!-- section cho nhóm hình ảnh -->
      <!-- 5 ảnh sản phẩm -->
      <img src="..." alt="Ảnh 1">
      <img src="..." alt="Ảnh 2">
      <img src="..." alt="Ảnh 3">
      <img src="..." alt="Ảnh 4">
      <img src="..." alt="Ảnh 5">
    </section>

    <!-- Thông tin sản phẩm -->
    <section>
      <h1>Tên sản phẩm</h1> <!-- h1 cho tên -->
      <p>Giá: ...</p>
      <p>Đánh giá: ★★★★☆</p>
      <p>Mô tả ngắn...</p>
    </section>

    <!-- Bảng thông số kỹ thuật -->
    <section>
      <table>
        <thead> <!-- tiêu đề cột -->
          <tr><th>Thông số</th><th>Giá trị</th></tr>
        </thead>
        <tbody> <!-- dữ liệu -->
          <tr><td>Màn hình</td><td>6.1 inch</td></tr>
          <tr><td>Chip</td><td>A18</td></tr>
        </tbody>
        <tfoot> <!-- ghi chú -->
          <tr><td colspan="2">Thông tin tham khảo</td></tr>
        </tfoot>
      </table>
    </section>

    <!-- Review/Comment -->
    <section>
      <h2>Đánh giá & Bình luận</h2>
      <!-- Form nhập bình luận -->
      <form>
        <textarea placeholder="Viết bình luận..."></textarea>
        <button>Gửi</button>
      </form>
      <!-- Danh sách bình luận -->
    </section>

    <!-- Sidebar: sản phẩm tương tự -->
    <aside> <!-- aside cho nội dung phụ -->
      <h2>Sản phẩm tương tự</h2>
      <!-- Liệt kê sản phẩm -->
    </aside>

  </main>

  <!-- Footer -->
  <footer> <!-- footer cho phần cuối trang -->
    <p>Bản quyền © 2026</p>
  </footer>

</body>
</html>

## Câu C2 - So sánh & Tranh luận

Một đồng nghiệp cho rằng chỉ cần dùng `<div>` với class là đủ, không cần học semantic HTML. Tôi phản biện rằng cách tiếp cận này bỏ qua nhiều lợi ích quan trọng.

Thứ nhất, về SEO: Semantic HTML giúp công cụ tìm kiếm hiểu rõ cấu trúc trang. Ví dụ, khi dùng `<article>` cho một bài viết, Google sẽ nhận diện đây là nội dung chính, từ đó index chính xác hơn. Nếu chỉ dùng `<div>`, công cụ tìm kiếm khó phân biệt đâu là nội dung chính, đâu là phần phụ.

Thứ hai, về Accessibility: Người dùng khiếm thị dựa vào trình đọc màn hình để điều hướng. Các thẻ như `<header>`, `<nav>`, `<main>` cung cấp thông tin ngữ nghĩa rõ ràng, giúp họ dễ dàng di chuyển trong trang. Nếu chỉ dùng `<div>`, trải nghiệm của họ sẽ bị hạn chế.

Ví dụ cụ thể: `<nav>` cho menu điều hướng. Trình đọc màn hình sẽ thông báo “Navigation region”, giúp người dùng biết đây là khu vực menu. Nếu chỉ dùng `<div class="nav">`, thông tin này không được cung cấp.

Tất nhiên, `<div>` vẫn có chỗ đứng. Khi cần một container để nhóm nội dung hoặc áp dụng CSS mà không có thẻ semantic phù hợp, `<div>` là lựa chọn hợp lý. Tuy nhiên, việc kết hợp semantic HTML với `<div>` đúng chỗ sẽ tạo ra trang web vừa chuẩn kỹ thuật, vừa thân thiện với người dùng.


#Câu B3:
Lỗi 1: Dòng 1 — Thiếu khai báo <!DOCTYPE html> chuẩn — Sửa thành <!DOCTYPE html>
Lỗi 2: Dòng 2 — Thẻ <html> thiếu thuộc tính lang — Thêm lang="vi"
Lỗi 3: Dòng 5 — Thẻ <title> chưa đóng — Thêm </title>
Lỗi 4: Dòng 6 — charset viết sai "utf8" — Sửa thành "utf-8"
Lỗi 5: Dòng 9 — Thẻ <h1> chưa đóng đúng — Sửa thành </h1>
Lỗi 6: Dòng 13 — Thẻ <a> chưa đóng — Thêm </a>
Lỗi 7: Dòng 23 — Thẻ <img> thiếu dấu ngoặc kép và alt — Sửa thành <img src="iphone.jpg" alt="iPhone 16 Pro">
Lỗi 8: Dòng 26 — Thẻ <b> và <p> lồng sai — Đặt <b> bên trong <p> và đóng đúng
Lỗi 9: Dòng 31 — Bảng thiếu thead/tbody — Thêm <thead>, <tbody>
Lỗi 10: Dòng 45 — Dùng 2 <main> — Sửa thành <aside> cho sidebar
Lỗi 11: Dòng 49 — Thẻ <p> trong footer chưa đóng — Thêm </p>
