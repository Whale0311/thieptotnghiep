import { useEffect, useMemo, useState } from "react";
import { AttendanceChoice } from "./components/AttendanceChoice";
import { BackButton } from "./components/BackButton";
import { GuestNameForm } from "./components/GuestNameForm";
import { SectionCard } from "./components/SectionCard";
import { ThankYou } from "./components/ThankYou";
import { eventConfig } from "./config/eventConfig";
import { sendRSVPToDiscord } from "./services/discordWebhook";
import type { RSVPData, SubmissionState } from "./types/rsvp";

// Loại bỏ các bước party khỏi Type
type Step = "invitation" | "name" | "thanks";

const initialDraft = {
  guestName: "",
  wellWish: "",
  graduationAttendance: null as boolean | null,
};

export default function App() {
  const [step, setStep] = useState<Step>("invitation");
  const [draft, setDraft] = useState(initialDraft);
  const [completedRSVP, setCompletedRSVP] = useState<RSVPData | null>(null);
  const [submissionState, setSubmissionState] = useState<SubmissionState>("idle");
  const [submissionError, setSubmissionError] = useState("");

  const ceremonyReply = draft.graduationAttendance;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [step]);

  const baseRSVP = useMemo(
    () => ({
      guestName: draft.guestName,
      wellWish: draft.wellWish || undefined,
      graduationAttendance: ceremonyReply === true,
      partyAttendance: false, // Mặc định là false vì đã bỏ phần tiệc
      submittedAt: new Date().toISOString(),
    }),
    [ceremonyReply, draft.guestName, draft.wellWish],
  );

  function startRSVP(attending: boolean) {
    setDraft({ guestName: "", wellWish: "", graduationAttendance: attending });
    setSubmissionError("");
    setSubmissionState("idle");
    setStep("name");
  }

  // Sửa lại hàm này để gửi dữ liệu luôn sau khi nhập tên & lời chúc
  function saveName(guestName: string, wellWish: string) {
    setDraft((current) => ({ ...current, guestName, wellWish }));
    
    const finalRSVP = {
      ...baseRSVP,
      guestName,
      wellWish: wellWish || undefined,
    };
    
    void submitRSVP(finalRSVP);
  }

  function goBack(target: Exclude<Step, "thanks">) {
    if (submissionState === "submitting") return;
    setSubmissionError("");
    setSubmissionState("idle");
    setStep(target);
  }

  async function submitRSVP(rsvp: RSVPData) {
    setSubmissionState("submitting");
    setSubmissionError("");
    try {
      await sendRSVPToDiscord(rsvp);
      setCompletedRSVP(rsvp);
      setSubmissionState("success");
      setStep("thanks");
    } catch (error) {
      setSubmissionState("error");
      const safeMessages = [
        "Vui lòng nhập họ và tên (ít nhất 2 ký tự).",
        "Kênh nhận phản hồi chưa được cấu hình. Vui lòng liên hệ chủ tiệc.",
      ];
      const message = error instanceof Error ? error.message : "";
      setSubmissionError(
        safeMessages.includes(message)
          ? message
          : "Có lỗi xảy ra khi gửi xác nhận. Vui lòng thử lại.",
      );
    }
  }

  const contactHref = `tel:${eventConfig.contactPhone.replace(/[^+\d]/g, "")}`;

  return (
    <main className="site-shell">
      <div className="film-grain" aria-hidden="true" />
      <header className="top-bar">
        <span className="top-bar__mark">@3w_8letters</span>
        <span className="top-bar__year">2026</span>
      </header>

      {step === "invitation" && (
        <>
          <section className="hero reveal">
            <div className="hero__ornament" aria-hidden="true">✦</div>
            <h2 className="hero__name">Trân trọng kính mời</h2>
            <h1>Lễ tốt nghiệp</h1>
            <p className="hero__name">{eventConfig.graduateName}</p>
            <div className={`photo-frame ${!eventConfig.showGraduatePhoto ? "photo-frame--hidden" : ""}`}>
              {eventConfig.showGraduatePhoto ? (
                <img
                  src={eventConfig.graduatePhoto}
                  alt={`Chân dung ${eventConfig.graduateName}`}
                />
              ) : (
                <span aria-hidden="true">✦</span>
              )}
            </div>
            <p className="invitation-copy">{eventConfig.invitationMessage}</p>
            <div className="hero__rule" aria-hidden="true">
              <span>✦</span>
            </div>
          </section>

          <div className="content-column">
            <SectionCard eyebrow="Thông tin buổi lễ" title="Vinh dự được gặp bạn vào ngày đặc biệt này">
              <div className="event-info">
                <div className="event-info__icon" aria-hidden="true">◷</div>
                <div>
                  <span>Thời gian</span>
                  <strong>{eventConfig.ceremonyTime} — {eventConfig.ceremonyDate}</strong>
                </div>
                <div className="event-info__icon" aria-hidden="true">⌖</div>
                <div>
                  <span>Địa điểm</span>
                  <strong>{eventConfig.ceremonyLocation}</strong>
                  {eventConfig.ceremonyAddress && (
                    <small>{eventConfig.ceremonyAddress}</small>
                  )}
                  {eventConfig.mapUrl && (
                    <a href={eventConfig.mapUrl} target="_blank" rel="noreferrer">
                      Mở bản đồ ↗
                    </a>
                  )}
                </div>
              </div>
            </SectionCard>

            <SectionCard eyebrow="Xác nhận tham dự" title="Bạn có thể đến chung vui cùng mình chứ?">
              <p className="section-copy">
                Chỉ mất một phút để mình chuẩn bị chu đáo hơn cho ngày gặp mặt.
              </p>
              <AttendanceChoice onChoose={startRSVP} />
            </SectionCard>

            <aside className="contact-card">
              <span aria-hidden="true">✦</span>
              <div>
                <small>Cần hỗ trợ?</small>
                <strong>{eventConfig.contactName}</strong>
              </div>
              <a href={contactHref}>{eventConfig.contactPhone}</a>
              {eventConfig.contactZalo && (
                <a href={eventConfig.contactZalo} target="_blank" rel="noreferrer">
                  Nhắn Zalo ↗
                </a>
              )}
            </aside>
          </div>
        </>
      )}

      {step === "name" && ceremonyReply !== null && (
        <div className="flow-column">
          <BackButton
            label="Quay lại lời mời"
            onClick={() => goBack("invitation")}
            disabled={submissionState === "submitting"}
          />
          <SectionCard eyebrow="Một chút thông tin" title="Cho mình biết tên bạn và để lại lời chúc nhé">
            <GuestNameForm
              attendingCeremony={ceremonyReply}
              initialName={draft.guestName}
              initialWish={draft.wellWish}
              onContinue={saveName}
            />
            
            {/* Hiển thị trạng thái gửi Form ở bước này luôn */}
            {submissionState === "submitting" && (
              <div className="submission-message" aria-live="polite" style={{ marginTop: '16px', textAlign: 'center' }}>
                Đang gửi lời chúc...
              </div>
            )}
            {submissionError && (
              <div className="submission-error" role="alert" style={{ marginTop: '16px' }}>
                <p>{submissionError}</p>
              </div>
            )}
          </SectionCard>
        </div>
      )}

      {step === "thanks" && completedRSVP && (
        <div className="flow-column flow-column--thanks">
          <BackButton label="Về lại lời mời" onClick={() => goBack("invitation")} />
          <ThankYou rsvp={completedRSVP} />
        </div>
      )}

      <footer>Sự hiện diện của bạn sẽ làm ngày đặc biệt này thêm trọn vẹn.</footer>
    </main>
  );
}