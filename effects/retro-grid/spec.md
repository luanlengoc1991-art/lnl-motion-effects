# Lưới phối cảnh chạy tới

- Mã: `retro-grid` · Nhóm: Nền chuyển động · Thời lượng: 6 giây · 1920×1080, 30 khung/giây
- Tác giả: LNL Motion Effects (tự thiết kế, viết mới)

## Hiệu ứng làm gì
Mặt lưới phối cảnh trải về đường chân trời và chạy liên tục về phía người xem, mặt trời sọc lặn phía sau, tiêu đề phát sáng.

## Dùng khi
Phong cách retro, giới thiệu sự kiện, mở đầu kênh công nghệ.

## Thay nội dung
- `tieude`: phần tử có `data-var-text="tieude"` trong `compositions/fx.html`
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
