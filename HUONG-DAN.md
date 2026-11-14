# Vy's Grammar Path (Unit 1–4): hướng dẫn cài đặt

**Link cho Vy:** <https://yumienglish.github.io/vy-grammar/>
Thư mục trên máy: `D:\vy-grammar`, không liên quan Syllabus hay grammar-homework).

Trang luyện ngữ pháp riêng cho Vy. Hệ thống này **tách hẳn** khỏi web app quản lý lớp:
không ghi vào Google Sheet, không đồng bộ, không tạo báo cáo. Nó chỉ làm hai việc:

1. Vy làm bài trên trang web. Tiến độ và bản ghi âm được lưu ngay trên máy của Vy.
2. Khi Vy làm xong **cả một Unit**, nút **Send Unit … to my teacher** mới mở. Bấm nút này thì một email gửi về cho bạn.

| Unit | Các bài |
|---|---|
| Unit 1: Hello! | Lesson 1–3 |
| Unit 2: My home | Lesson 1–3 |
| Unit 3: My day | Lesson 1–3 + Focus *can* |
| Unit 4: People I know | Lesson 1–4 + Focus *have* |

Mỗi email gồm:
- Bảng điểm từng bài: số sao, số câu đúng ngay lần đầu, điểm Understand / Use / Challenge.
- Những câu Vy sai ở lần đầu: Vy đã chọn hoặc viết gì, và đáp án đúng.
- Câu Speaking Vy chọn, cùng câu Vy tự viết (nếu có).
- File ghi âm phần Speaking của từng bài, gửi kèm theo mail.

Nếu Vy đã gửi một Unit, nút gửi sẽ bị khóa. Nó chỉ mở lại khi Vy làm lại một bài trong Unit đó, để tránh nhận nhiều mail trùng.

## Các file

| File | Vai trò |
|---|---|
| `index.html` | Trang web (giao diện + CSS) |
| `art.js` | Hình minh họa vẽ bằng SVG |
| `data.js` | Nội dung 14 bài: thẻ ngữ pháp, 12 câu hỏi, phần Speaking |
| `app.js` | Cách chạy bài, ghi âm, gửi bài. Dòng `SCRIPT_URL` ở đầu file |
| `VyGrammar.gs` | Máy chủ gửi mail (dán vào Apps Script) |

## A. Tạo máy chủ gửi mail (làm 1 lần, khoảng 5 phút)

1. Vào <https://script.google.com>, bấm **Dự án mới**. Đặt tên, ví dụ `Vy Grammar – gửi mail`.
   Đây là một dự án **mới, riêng**. Không dán vào dự án quản lý lớp hay Speaking 10 tuần.
2. Xóa hết nội dung có sẵn, dán toàn bộ nội dung file `VyGrammar.gs` vào, rồi bấm lưu.
3. Chọn hàm `setup` trên thanh công cụ, bấm **Chạy**, rồi cấp quyền gửi email.
   Bạn sẽ nhận được mail "cài đặt thành công ✅".
   - Mail gửi về chính tài khoản Google đang chạy script.
   - Muốn nhận ở địa chỉ khác, điền địa chỉ đó vào `TEACHER_EMAIL` ở đầu file.
4. Bấm **Triển khai → Tùy chọn triển khai mới**, chọn loại **Ứng dụng web**, rồi chọn:
   - Thực thi dưới dạng: **Tôi**
   - Người có quyền truy cập: **Bất kỳ ai**
5. Bấm **Triển khai**, rồi sao chép đường link kết thúc bằng `/exec`.

## B. Nối trang web với máy chủ (đã làm)

`SCRIPT_URL` trong `app.js` đã trỏ tới web app `/exec` của bạn. Nếu sau này bạn **triển khai mới** (link `/exec` đổi):

1. Thay link ở dòng `SCRIPT_URL` trong `app.js`.
2. Tăng số `?v=` ở 3 dòng `<script>` trong `index.html` (để điện thoại tải bản mới).
3. Commit và push repo `vy-grammar`; GitHub Pages tự cập nhật sau 1–2 phút.

Nếu chỉ sửa code trong Apps Script, chọn **Triển khai → Quản lý các bản triển khai → sửa (bút chì) → Phiên bản mới**: link `/exec` giữ nguyên.

## Lưu ý khi đưa link cho Vy

- **Ghi âm:**
  - Trên Android và máy tính, mở bằng Chrome. Trên iPhone và iPad, mở bằng Safari.
  - Lần đầu ghi âm, trình duyệt sẽ hỏi quyền dùng micro. Hãy chọn **Cho phép**.
  - Nếu lỡ chặn, bấm biểu tượng 🔒 cạnh địa chỉ trang để mở lại quyền.
- **Lưu tiến độ:** tiến độ và bản ghi lưu trên đúng máy và đúng trình duyệt Vy đang dùng.
  - Hãy dặn Vy làm cả Unit trên cùng một máy.
  - Đổi máy, hoặc xóa dữ liệu trình duyệt, thì tiến độ sẽ mất.
  - Nếu máy không còn bản ghi âm của một bài, trang sẽ yêu cầu Vy ghi âm lại phần Speaking của bài đó trước khi gửi.
- **Mỗi bài:** gồm 12 câu (Understand 5, Use 5, Challenge 2) và một phần Speaking.
  - Phần Speaking bắt buộc ghi âm thì mới đi tiếp được.
  - Vy được nghe lại và ghi lại nhiều lần. Bản cuối cùng là bản được gửi.
  - Mỗi bản ghi dài tối đa 60 giây.
- **Giới hạn gửi:** máy chủ chỉ nhận tối đa 6 mail mỗi giờ, để tránh gửi dồn dập.

## Sửa nội dung bài

Mọi câu hỏi nằm trong `data.js` và giữ đúng cấu trúc như bản gốc.
- Câu 0–4 thuộc Understand, câu 5–9 thuộc Use, câu 10–11 thuộc Challenge.
- Sau mỗi lần sửa, nhớ tăng số `?v=` trong `index.html`.
