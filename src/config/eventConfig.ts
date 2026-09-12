export type PartyDateOption = {
  id: string;
  date: string;
  time: string;
  label: string;
};

export const eventConfig = {
  graduateName: "Nguyễn Quốc Anh",
  graduatePhoto:
    "https://images.unsplash.com/photo-1627556704290-2b1f5853ff78?auto=format&fit=crop&w=900&q=85",
  showGraduatePhoto: true,

  invitationMessage:
    "Một chặng đường khép lại, một hành trình mới bắt đầu. Mình rất vui nếu bạn có thể đến chung vui cùng mình trong ngày đặc biệt này.",

  ceremonyDate: "Chủ Nhật, 26/09/2026",
  ceremonyTime: "09:30",
  ceremonyLocation: "Sân C2 - Cổng Parabol, Đại học Bách Khoa Hà Nội",
  ceremonyAddress: "Số 1 Đại Cồ Việt, Bạch Mai, Hà Nội",
  mapUrl: "",

  contactName: "Nguyễn Quốc Anh",
  contactPhone: "0868953218",
  contactZalo: "",

  partyDescription:
    "Sau buổi lễ, mình đang dự định tổ chức một buổi tiệc nhỏ để cùng mọi người gặp gỡ và chia sẻ niềm vui. Bạn có thể cho mình biết khung thời gian cuối tuần phù hợp với bạn không?",
  partyAvailabilityNote:
    "Lưu ý: ngày 05/10 mình không thể tổ chức, nên ngày này không có trong các lựa chọn. Mong các bạn thông cảm và chọn một trong các khung thời gian khác.",
  partyDateOptions: [
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
      id: "party-sun-11-11-lunch",
      date: "Chủ Nhật, 11/11/2026",
      time: "12:00",
      label: "Chủ Nhật — 11/11/2026 — 12:00 (buổi trưa)",
    },
    {
      id: "party-sun-11-11-evening",
      date: "Chủ Nhật, 11/11/2026",
      time: "18:00",
      label: "Chủ Nhật — 11/11/2026 — 18:00 (buổi tối)",
    },
  ] satisfies PartyDateOption[],

  // This is intentionally only read by the delivery service, never rendered.
  // VITE variables are available in the browser and must not be treated as secrets.
  discordWebhookUrl: import.meta.env.VITE_DISCORD_WEBHOOK_URL?.trim() ?? "",
} as const;
