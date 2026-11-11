# Mã QR và lời kêu gọi

- Mã: `cta-qr` · Nhóm: Kết video · Thời lượng: 6 giây · 1920×1080, 30 khung/giây
- Tác giả: LNL Motion Effects (tự thiết kế, viết mới)

## Hiệu ứng làm gì
Khung mã QR vẽ dần từng ô vuông, khung quét chạy dọc, bên cạnh lời kêu gọi và hotline hiện lần lượt.

## Dùng khi
Cuối video quảng cáo, mời quét mã nhận ưu đãi, đặt lịch tham quan.

## Thay nội dung
- `tieude`: phần tử có `data-var-text="tieude"` trong `compositions/fx.html`
- `mota`: phần tử có `data-var-text="mota"` trong `compositions/fx.html`
- `hotline`: phần tử có `data-var-text="hotline"` trong `compositions/fx.html`
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
