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

## Deploy

### Vercel (nhanh nhất)

```bash
npm i -g vercel
vercel login
vercel
vercel env add VITE_DISCORD_WEBHOOK_URL production
vercel --prod
```

Khi lệnh `vercel env add` yêu cầu giá trị, dán webhook vào terminal; không ghi nó trong source. Vercel tự nhận diện Vite và build thư mục `dist`.

### GitHub Pages (tự deploy khi push `main`)

Workflow `.github/workflows/deploy.yml` đã có sẵn. Tạo repository rồi push:

```bash
git init
git add .
git commit -m "Deploy graduation invitation"
git branch -M main
git remote add origin https://github.com/<USERNAME>/<REPOSITORY>.git
git push -u origin main
```

Sau đó vào **GitHub → repository → Settings → Pages**, chọn **Source: GitHub Actions**. Tạo repository secret tên `VITE_DISCORD_WEBHOOK_URL` trong **Settings → Secrets and variables → Actions**. Secret chỉ giúp không commit URL; vì app là frontend-only, giá trị này vẫn có thể xem được trong bundle đã deploy.
# thieptotnghiep
