# Chuyển cảnh ô lưới lật

- Mã: `tile-wipe` · Nhóm: Chuyển cảnh · Thời lượng: 3 giây · 1920×1080, 30 khung/giây
- Tác giả: LNL Motion Effects (tự thiết kế, viết mới)

## Hiệu ứng làm gì
Màn hình chia lưới 8×5, các ô lật theo đường chéo để che cảnh cũ rồi lật tiếp để lộ cảnh mới.

## Dùng khi
Chuyển giữa hai đoạn, chuyển sang chương mới.

## Thay nội dung
- `canhA`: phần tử có `data-var-text="canhA"` trong `compositions/fx.html`
- `canhB`: phần tử có `data-var-text="canhB"` trong `compositions/fx.html`
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
