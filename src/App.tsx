import { useEffect, useMemo, useState } from "react";
import { AttendanceChoice } from "./components/AttendanceChoice";
import { BackButton } from "./components/BackButton";
import { GuestNameForm } from "./components/GuestNameForm";
import { PartyDetails } from "./components/PartyDetails";
import { SectionCard } from "./components/SectionCard";
import { ThankYou } from "./components/ThankYou";
import { eventConfig } from "./config/eventConfig";
import { sendRSVPToDiscord } from "./services/discordWebhook";
import type { RSVPData, SubmissionState } from "./types/rsvp";

type Step = "invitation" | "name" | "party" | "party-details" | "thanks";

const initialDraft = {
  guestName: "",
  wellWish: "",
  graduationAttendance: null as boolean | null,
};

export default function App() {
  const [step, setStep] = useState<Step>("invitation");
  const [draft, setDraft] = useState(initialDraft);
  const [completedRSVP, setCompletedRSVP] = useState<RSVPData | null>(null);
  const [submissionState, setSubmissionState] =
    useState<SubmissionState>("idle");
  const [submissionError, setSubmissionError] = useState("");

  const ceremonyReply = draft.graduationAttendance;
  const partyOptionsAvailable = eventConfig.partyDateOptions.length > 0;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [step]);

  const baseRSVP = useMemo(
    () => ({
      guestName: draft.guestName,
      wellWish: draft.wellWish || undefined,
      graduationAttendance: ceremonyReply === true,
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

  function saveName(guestName: string, wellWish: string) {
    setDraft((current) => ({ ...current, guestName, wellWish }));
    setStep("party");
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
        "Thông tin tiệc chỉ được gửi khi bạn tham gia tiệc.",
        "Vui lòng chọn thời gian tham gia tiệc.",
        "Số người tham dự phải từ 1 người trở lên.",
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

  function chooseParty(attending: boolean) {
    setSubmissionError("");
    if (attending) {
      if (!partyOptionsAvailable) {
        setSubmissionState("error");
        setSubmissionError(
          "Hiện chưa có thời gian tiệc phù hợp để lựa chọn. Vui lòng liên hệ chủ tiệc.",
        );
        return;
      }
      setStep("party-details");
      return;
    }
    void submitRSVP({ ...baseRSVP, partyAttendance: false });
  }

  const contactHref = `tel:${eventConfig.contactPhone.replace(/[^+\d]/g, "")}`;

  return (
    <main className="site-shell">
      <div className="film-grain" aria-hidden="true" />
      <header className="top-bar">
        <span className="top-bar__mark">NQA</span>
        <span>Lời mời tốt nghiệp</span>
        <span className="top-bar__year">2026</span>
      </header>

      {step === "invitation" && (
        <>
          <section className="hero reveal">
            <div className="hero__ornament" aria-hidden="true">
              ✦
            </div>
            <p className="eyebrow">Trân trọng kính mời</p>
            <h1>Lễ tốt nghiệp</h1>
            <p className="hero__name">{eventConfig.graduateName}</p>
            <div
              className={`photo-frame ${!eventConfig.showGraduatePhoto ? "photo-frame--hidden" : ""}`}
            >
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
            <SectionCard
              eyebrow="Thông tin buổi lễ"
              title="Vinh dự được gặp bạn vào ngày đặc biệt này"
            >
              <div className="event-info">
                <div className="event-info__icon" aria-hidden="true">
                  ◷
                </div>
                <div>
                  <span>Thời gian</span>
                  <strong>
                    {eventConfig.ceremonyTime} — {eventConfig.ceremonyDate}
                  </strong>
                </div>
                <div className="event-info__icon" aria-hidden="true">
                  ⌖
                </div>
                <div>
                  <span>Địa điểm</span>
                  <strong>{eventConfig.ceremonyLocation}</strong>
                  {eventConfig.ceremonyAddress && (
                    <small>{eventConfig.ceremonyAddress}</small>
                  )}
                  {eventConfig.mapUrl && (
                    <a
                      href={eventConfig.mapUrl}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Mở bản đồ ↗
                    </a>
                  )}
                </div>
              </div>
            </SectionCard>

            <SectionCard
              eyebrow="Xác nhận tham dự"
              title="Bạn có thể đến chung vui cùng mình chứ?"
            >
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
                <a
                  href={eventConfig.contactZalo}
                  target="_blank"
                  rel="noreferrer"
                >
                  Nhắn Zalo ↗
                </a>
              )}
            </aside>
          </div>
        </>
      )}

      {step === "name" && ceremonyReply !== null && (
        <div className="flow-column">
          <BackButton label="Quay lại lời mời" onClick={() => goBack("invitation")} />
          <SectionCard
            eyebrow="Một chút thông tin"
            title="Mình nên gọi bạn là gì?"
          >
            <GuestNameForm
              attendingCeremony={ceremonyReply}
              initialName={draft.guestName}
              initialWish={draft.wellWish}
              onContinue={saveName}
            />
          </SectionCard>
        </div>
      )}

      {step === "party" && (
        <div className="flow-column">
          <BackButton
            label="Quay lại nhập tên"
            onClick={() => goBack("name")}
            disabled={submissionState === "submitting"}
          />
          <SectionCard
            eyebrow="🥂 Dự định tiệc tốt nghiệp"
            title="Bạn có thể tham gia bữa tiệc nhỏ cùng mình không?"
          >
            <p className="section-copy">{eventConfig.partyDescription}</p>
            <div className="choice-grid">
              <button
                className="button button-primary"
                onClick={() => chooseParty(true)}
                disabled={submissionState === "submitting"}
              >
                🥂 Có, mình sẽ tham gia
              </button>
              <button
                className="button button-secondary"
                onClick={() => chooseParty(false)}
                disabled={submissionState === "submitting"}
              >
                💌 Rất tiếc, mình không thể tham gia
              </button>
            </div>
            {submissionState === "submitting" && (
              <p className="submission-message" aria-live="polite">
                Đang gửi xác nhận...
              </p>
            )}
            {submissionError && (
              <div className="submission-error" role="alert">
                <p>{submissionError}</p>
                <button
                  className="text-button"
                  onClick={() => chooseParty(false)}
                  disabled={submissionState === "submitting"}
                >
                  Thử lại
                </button>
              </div>
            )}
          </SectionCard>
        </div>
      )}

      {step === "party-details" && (
        <div className="flow-column">
          <BackButton
            label="Quay lại chọn tiệc"
            onClick={() => goBack("party")}
            disabled={submissionState === "submitting"}
          />
          <SectionCard
            eyebrow="🥂 Dự định tiệc tốt nghiệp"
            title="Khung thời gian nào phù hợp với bạn?"
          >
            <PartyDetails
              isSubmitting={submissionState === "submitting"}
              onSubmit={(details) =>
                void submitRSVP({
                  ...baseRSVP,
                  partyAttendance: true,
                  ...details,
                })
              }
            />
            {submissionError && (
              <p className="submission-error" role="alert">
                {submissionError}
              </p>
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

      <footer>Được chuẩn bị với tất cả sự trân trọng</footer>
    </main>
  );
}
