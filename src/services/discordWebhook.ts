import { eventConfig } from "../config/eventConfig";
import type { RSVPData } from "../types/rsvp";
import {
  cleanText,
  getRSVPStatus,
  statusLabels,
  validateRSVP,
} from "../utils/rsvp";

const attendanceLabel = (attending: boolean) =>
  attending ? "✅ Tham gia" : "❌ Không tham gia";

function formatSubmittedAt(iso: string) {
  return new Intl.DateTimeFormat("vi-VN", {
    dateStyle: "short",
    timeStyle: "short",
    timeZone: "Asia/Ho_Chi_Minh",
  }).format(new Date(iso));
}

export async function sendRSVPToDiscord(rsvp: RSVPData): Promise<void> {
  const validationError = validateRSVP(rsvp);
  if (validationError) throw new Error(validationError);

  if (!eventConfig.discordWebhookUrl) {
    throw new Error(
      "Kênh nhận phản hồi chưa được cấu hình. Vui lòng liên hệ chủ tiệc.",
    );
  }

  const status = getRSVPStatus(rsvp.graduationAttendance, rsvp.partyAttendance);
  const fields = [
    { name: "👤 Khách", value: cleanText(rsvp.guestName, 100), inline: false },
    {
      name: "🎓 Lễ tốt nghiệp",
      value: attendanceLabel(rsvp.graduationAttendance),
      inline: true,
    },
    {
      name: "🥂 Tiệc tốt nghiệp",
      value: attendanceLabel(rsvp.partyAttendance),
      inline: true,
    },
  ];

  if (rsvp.wellWish) {
    fields.push({
      name: "💌 Lời chúc",
      value: cleanText(rsvp.wellWish, 500),
      inline: false,
    });
  }

  if (rsvp.partyAttendance) {
    fields.push(
      {
        name: "📅 Các khung giờ phù hợp",
        value: rsvp.partyDateTimes!
          .map((dateTime) => `• ${cleanText(dateTime, 120)}`)
          .join("\n"),
        inline: false,
      },
      {
        name: "👥 Số người",
        value: String(rsvp.numberOfAttendees),
        inline: true,
      },
      {
        name: "🍽️ Lưu ý món ăn",
        value: cleanText(rsvp.foodNotes || "Không có", 500),
        inline: false,
      },
    );
  }

  fields.push(
    { name: "📌 Trạng thái", value: statusLabels[status], inline: true },
    {
      name: "🕐 Thời gian phản hồi",
      value: formatSubmittedAt(rsvp.submittedAt),
      inline: true,
    },
  );

  const response = await fetch(eventConfig.discordWebhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username: "Graduation RSVP",
      embeds: [
        {
          title: "🎓 Xác nhận tham dự lễ tốt nghiệp",
          color: 0xb8954d,
          fields,
          footer: { text: `Trạng thái hệ thống: ${status}` },
          timestamp: rsvp.submittedAt,
        },
      ],
    }),
  });

  if (!response.ok) {
    throw new Error("Không thể gửi xác nhận vào lúc này.");
  }
}
