# Tiến độ thanh toán

- Mã: `payment-plan` · Nhóm: Bất động sản · Thời lượng: 6 giây · 1920×1080, 30 khung/giây
- Tác giả: LNL Motion Effects (tự thiết kế, viết mới)

## Hiệu ứng làm gì
Thanh ngang chia đoạn theo tỉ lệ thanh toán, từng đoạn mọc ra kèm phần trăm và mốc thời gian bên dưới, ưu đãi nổi lên cuối.

## Dùng khi
Phương thức thanh toán, trả góp, các đợt đóng tiền.

## Thay nội dung
- `tieude`: phần tử có `data-var-text="tieude"` trong `compositions/fx.html`
- `uudai`: phần tử có `data-var-text="uudai"` trong `compositions/fx.html`
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
