# LNL Motion Effects: quy tắc cho agent

Thư viện hiệu ứng HyperFrames của chủ dự án, chạy ở https://effects.luangroup.asia và **nối thẳng vào app LNL Frames Studio**
(Kho mẫu › Hiệu ứng LNL đọc `api/effects.json`). Web và app phải luôn khớp nhau.

## Mọi thay đổi đều đăng ngay, không hỏi lại

Thêm, sửa hay xoá hiệu ứng (kể cả đổi chữ, màu, thời lượng, ví dụ thực tế) thì làm hết:

1. Sửa danh sách trong `tools/effects*.mjs` (xoá hiệu ứng = xoá mục khỏi danh sách; thư mục tự bị xoá khi sinh lại).
   Ví dụ thực tế ở `showcase.json` + tệp trong `showcase/` (video dưới 25 MB).
2. Chạy **một lệnh**: `node tools/publish.mjs "<mô tả thay đổi>"`. Lệnh tự: sinh dự án → `hyperframes check` (lỗi thì dừng,
   không đăng) → render lại video mẫu + ảnh bìa của hiệu ứng mới / vừa sửa → trang, zip, danh mục (mã phiên bản theo nội dung)
   → deploy Cloudflare → kiểm tra trên web thật → commit + push.
3. Báo lại số hiệu ứng trên web và những gì đã đổi. Lệnh lỗi ở bước nào thì sửa rồi chạy lại, không đăng nửa vời.

App tự nhận: danh mục làm mới mỗi 30 phút, hiệu ứng đã sửa (mã phiên bản đổi) được tải lại khi dùng, hiệu ứng đã xoá biến
khỏi Kho mẫu. Không cần phát hành lại app khi chỉ đổi thư viện.

## Quy ước

- Hiệu ứng tự thiết kế, viết mới. Không chép template hay nội dung của thư viện khác (bộ aislop.vn chỉ để riêng tư, không đưa vào đây).
- Mỗi hiệu ứng là một dự án HyperFrames độc lập: `index.html` (bảng màu 6 biến trên `#root`) + `compositions/fx.html`
  (id `fx`, timeline đăng ký `window.__timelines["fx"]`). App đổi id thành `lnl-<mã>` khi thêm vào dự án khác, nên giữ đúng mẫu này.
- Chữ tiếng Việt đủ dấu (Be Vietnam Pro), cỡ chữ ≥ 28 px, phần chồng / che có chủ ý thì đánh dấu `data-layout-allow-*`.
- Không commit `.wrangler/`, `dist/`, `.hyperframes/`.
