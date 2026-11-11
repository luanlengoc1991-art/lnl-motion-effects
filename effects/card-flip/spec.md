# Thẻ lật 3D

- Mã: `card-flip` · Nhóm: 3D · Thời lượng: 5 giây · 1920×1080, 30 khung/giây
- Tác giả: LNL Motion Effects (tự thiết kế, viết mới)

## Hiệu ứng làm gì
Thẻ lớn nghiêng trong không gian, lật 180 độ quanh trục dọc để lộ mặt sau với câu trả lời, bóng đổ đổi theo góc lật.

## Dùng khi
Câu hỏi và đáp án, trước và sau, tiết lộ giá hay quà tặng.

## Thay nội dung
- `cauhoi`: phần tử có `data-var-text="cauhoi"` trong `compositions/fx.html`
- `traloi`: phần tử có `data-var-text="traloi"` trong `compositions/fx.html`
- Số liệu, danh sách nằm đầu phần `<script>` của `compositions/fx.html`.

## Bảng màu
Đổi 6 biến trong `#root` của `index.html`:

| Bộ | --bg | --card | --fg | --muted | --accent | --accent2 |
|---|---|---|---|---|---|---|
| Than & cam san hô | #0e1116 | #171b22 | #f5f3ee | #8a93a1 | #ff6b3d | #ffc857 |
| Đêm xanh | #07101f | #0f1d36 | #f2f6ff | #8ea0c0 | #4f8bff | #7cf0d4 |
| Rừng xanh | #0c1510 | #15231a | #f1f5ef | #8fa596 | #5ed17e | #e9d36a |
| Giấy sáng | #f6f2ea | #ffffff | #191714 | #7d756a | #e8461f | #2f6bff |

## Chạy
```sh
npx hyperframes preview     # xem trong trình duyệt
npx hyperframes render      # xuất MP4
```
