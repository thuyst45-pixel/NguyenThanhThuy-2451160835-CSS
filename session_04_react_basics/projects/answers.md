# Bài 1.1 — Component render lần đầu
1. Tại sao component chỉ render một lần?
* Vì chưa có dữ liệu nào thay đổi.
* React chỉ render lại khi:
    - State thay đổi
    - Props thay đổi
    - Component cha render lại

# Bài 1.2 — Biến thường vs useState
* Chạy BadCounter → nhấn nút → thấy gì?
    - Ban đầu màn hình hiện: Bộ đếm: 0
    - Mỗi lần nhấn nút:
    ```
    Console:
    Count: 1
    Count: 2
    Count: 3
    ...
    ```
    - Nhưng trên giao diện vẫn luôn là: Bộ đếm: 0
    - Lý do: React không biết biến `count` đã thay đổi nên không render lại component.

* Chạy GoodCounter → nhấn nút → thấy gì?
    - Ban đầu màn hình hiện: Bộ đếm: 0
    - Mỗi lần nhấn nút:
    ```
    Console:
    Count: 1
    Count: 2
    Count: 3
    ...
    ```
    - Lý do: `setCount()` báo cho React biết state đã thay đổi, React sẽ render lại component và cập nhật giao diện.

* Mở Console → thấy log "render" mấy lần?
    - 1 lần khi component render lần đầu, sau đó mỗi lần bấm nút thêm 1 lần render nữa. Ví dụ bấm 3 lần thì tổng cộng 4 lần render.

# Bài 1.3 — Luồng hoạt động React
## Sơ đồ luồng

```
┌─────────────────────────────────────────────────────────┐
│                    REACT FLOW                           │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  1. Component function được gọi                         │
│              ↓                                          │
│  2. Return JSX (giao diện)                              │
│              ↓                                          │
│  3. React hiển thị lên màn hình                         │
│              ↓                                          │
│  4. Người dùng tương tác (click, nhập...)               │
│              ↓                                          │
│  5. Gọi setState(newValue)                              │
│              ↓                                          │
│  6. React gọi lại component function (RE-RENDER)        │
│              ↓                                          │
│  7. Return JSX mới                                      │
│              ↓                                          │
│  8. React cập nhật màn hình (chỉ phần thay đổi)         │
│              ↓                                          │
│  Quay lại bước 4                                        │
│                                                         │
└─────────────────────────────────────────────────────────┘
```