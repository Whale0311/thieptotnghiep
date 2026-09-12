# Lời mời tốt nghiệp

Một trang RSVP React + TypeScript + Vite, gửi phản hồi trực tiếp tới Discord Webhook. Không có backend, cơ sở dữ liệu hoặc trang quản trị.

## Chạy dự án

```bash
npm install
copy .env.example .env
npm run dev
```

Điền webhook vào `VITE_DISCORD_WEBHOOK_URL` trong `.env` để gửi RSVP. Biến môi trường có tiền tố `VITE_` được đóng gói vào trình duyệt, nên webhook này **không phải bí mật thực sự**. Đừng hiển thị URL trong giao diện, ghi log URL, hoặc commit `.env`.

Nội dung sự kiện nằm tập trung ở `src/config/eventConfig.ts`.

## Kiểm tra bản build

```bash
npm run build
```
# thieptotnghiep
