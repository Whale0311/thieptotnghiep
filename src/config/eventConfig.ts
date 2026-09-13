export type PartyDateOption = {
  id: string;
  date: string;
  time: string;
  label: string;
};

export const eventConfig = {
  graduateName: "Nguyễn Quốc Anh",
  // graduatePhoto: "https://ik.imagekit.io/c9utaptx0/20224919_NguyenQuocAnh.jpg",
  graduatePhoto: "images/mhx_2023_v4.jpg",
  showGraduatePhoto: true,

  invitationMessage:
    "Một chặng đường khép lại, một hành trình mới bắt đầu. Mình rất vui nếu bạn có thể đến chung vui cùng mình trong ngày đặc biệt này.",

  ceremonyDate: "Thứ 7, 26/09/2026",
  ceremonyTime: "09:30",
  ceremonyLocation: "Sân C2 - Cổng Parabol, Đại học Bách Khoa Hà Nội",
  ceremonyAddress: "Số 1 Đại Cồ Việt, Bạch Mai, Hà Nội",
  mapUrl: "https://maps.app.goo.gl/G7rVwWvvqv8C2K4d6",

  contactName: "Nguyễn Quốc Anh",
  contactPhone: "0868953218",
  contactZalo: "",

  partyDescription:
    "Sau buổi lễ, mình đang dự định tổ chức một buổi tiệc nhỏ để cùng mọi người gặp gỡ và chia sẻ niềm vui. Bạn có thể cho mình biết khung thời gian cuối tuần phù hợp với bạn không?",
  partyAvailabilityNote: "",
  partyDateOptions: [
    {
      id: "party-sat-19-09-lunch",
      date: "Thứ Bảy, 19/09/2026",
      time: "12:00",
      label: "Thứ Bảy — 19/09/2026 — 12:00 (buổi trưa)",
    },
    {
      id: "party-sat-19-09-evening",
      date: "Thứ Bảy, 19/09/2026",
      time: "18:00",
      label: "Thứ Bảy — 19/09/2026 — 18:00 (buổi tối)",
    },
    {
      id: "party-sat-20-09-lunch",
      date: "Chủ Nhật, 20/09/2026",
      time: "12:00",
      label: "Chủ Nhật — 20/09/2026 — 12:00 (buổi trưa)",
    },
    {
      id: "party-sat-20-09-evening",
      date: "Chủ Nhật, 20/09/2026",
      time: "18:00",
      label: "Chủ Nhật — 20/09/2026 — 18:00 (buổi tối)",
    },
    {
      id: "party-sat-26-09-lunch",
      date: "Thứ Bảy, 26/09/2026",
      time: "12:00",
      label: "Thứ Bảy — 26/09/2026 — 12:00 (buổi trưa)",
    },
    {
      id: "party-sat-26-09-evening",
      date: "Thứ Bảy, 26/09/2026",
      time: "18:00",
      label: "Thứ Bảy — 26/09/2026 — 18:00 (buổi tối)",
    },
    {
      id: "party-sun-27-09-lunch",
      date: "Chủ Nhật, 27/09/2026",
      time: "12:00",
      label: "Chủ Nhật — 27/09/2026 — 12:00 (buổi trưa)",
    },
    {
      id: "party-sun-27-09-evening",
      date: "Chủ Nhật, 27/09/2026",
      time: "18:00",
      label: "Chủ Nhật — 27/09/2026 — 18:00 (buổi tối)",
    },
    {
      id: "party-sat-03-10-lunch",
      date: "Thứ Bảy, 03/10/2026",
      time: "12:00",
      label: "Thứ Bảy — 03/10/2026 — 12:00 (buổi trưa)",
    },
    {
      id: "party-sat-03-10-evening",
      date: "Thứ Bảy, 03/10/2026",
      time: "18:00",
      label: "Thứ Bảy — 03/10/2026 — 18:00 (buổi tối)",
    },
    {
      id: "party-sat-10-10-lunch",
      date: "Thứ Bảy, 10/10/2026",
      time: "12:00",
      label: "Thứ Bảy — 10/10/2026 — 12:00 (buổi trưa)",
    },
    {
      id: "party-sat-10-10-evening",
      date: "Thứ Bảy, 10/10/2026",
      time: "18:00",
      label: "Thứ Bảy — 10/10/2026 — 18:00 (buổi tối)",
    },
    {
      id: "party-sun-11-10-lunch",
      date: "Chủ Nhật, 11/10/2026",
      time: "12:00",
      label: "Chủ Nhật — 11/10/2026 — 12:00 (buổi trưa)",
    },
    {
      id: "party-sun-11-10-evening",
      date: "Chủ Nhật, 11/10/2026",
      time: "18:00",
      label: "Chủ Nhật — 11/10/2026 — 18:00 (buổi tối)",
    },
  ] satisfies PartyDateOption[],

  // This is intentionally only read by the delivery service, never rendered.
  // VITE variables are available in the browser and must not be treated as secrets.
  discordWebhookUrl: import.meta.env.VITE_DISCORD_WEBHOOK_URL?.trim() ?? "",
} as const;
