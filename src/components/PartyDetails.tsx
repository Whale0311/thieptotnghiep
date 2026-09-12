import { useState } from "react";
import { eventConfig } from "../config/eventConfig";
import { FOOD_OPTIONS } from "../utils/rsvp";

type Props = {
  onSubmit: (values: {
    partyDateTime: string;
    numberOfAttendees: number;
    foodNotes?: string;
  }) => void;
  isSubmitting: boolean;
};

export function PartyDetails({ onSubmit, isSubmitting }: Props) {
  const options = eventConfig.partyDateOptions;
  const [dateId, setDateId] = useState(
    options.length === 1 ? (options[0]?.id ?? "") : "",
  );
  const [attendeeCount, setAttendeeCount] = useState(1);
  const [foodChoice, setFoodChoice] =
    useState<(typeof FOOD_OPTIONS)[number]>("Không có");
  const [otherFood, setOtherFood] = useState("");
  const [note, setNote] = useState("");
  const [error, setError] = useState("");
  const oneOption = options.length === 1;

  function submit(event: React.FormEvent) {
    event.preventDefault();
    const selected = options.find((option) => option.id === dateId);
    if (!selected) {
      setError("Vui lòng chọn thời gian tham gia tiệc.");
      return;
    }
    const notes = [
      foodChoice !== "Không có" && foodChoice !== "Khác" ? foodChoice : "",
      foodChoice === "Khác" ? otherFood : "",
      note,
    ]
      .map((item) => item.trim())
      .filter(Boolean)
      .join(" — ");
    onSubmit({
      partyDateTime: `${selected.date} — ${selected.time}`,
      numberOfAttendees: attendeeCount,
      foodNotes: notes || undefined,
    });
  }

  return (
    <form className="form-stack" onSubmit={submit} noValidate>
      <fieldset>
        <legend>📅 Bạn có thể tham gia vào khung thời gian nào?</legend>
        <p className="availability-note">{eventConfig.partyAvailabilityNote}</p>
        {oneOption ? (
          <div className="single-option">{options[0].label}</div>
        ) : (
          <div className="radio-list">
            {options.map((option) => (
              <label className="radio-option" key={option.id}>
                <input
                  type="radio"
                  name="party-date"
                  value={option.id}
                  checked={dateId === option.id}
                  onChange={() => {
                    setDateId(option.id);
                    setError("");
                  }}
                />
                <span>{option.label}</span>
              </label>
            ))}
          </div>
        )}
      </fieldset>

      {/* <fieldset>
        <legend>👥 Bạn sẽ tham dự cùng bao nhiêu người?</legend>
        <p className="assistive-copy">Bao gồm cả bạn.</p>
        <div className="stepper" aria-label="Số người tham dự">
          <button
            type="button"
            aria-label="Giảm số người"
            onClick={() => setAttendeeCount((count) => Math.max(1, count - 1))}
            disabled={attendeeCount === 1 || isSubmitting}
          >
            −
          </button>
          <output>{attendeeCount}</output>
          <button
            type="button"
            aria-label="Tăng số người"
            onClick={() => setAttendeeCount((count) => count + 1)}
            disabled={isSubmitting}
          >
            +
          </button>
        </div>
      </fieldset> */}

      <fieldset>
        <legend>🍽️ Bạn có món ăn nào không thể ăn hoặc cần lưu ý không?</legend>
        <div className="food-options">
          {FOOD_OPTIONS.map((option) => (
            <label className="food-option" key={option}>
              <input
                type="radio"
                name="food-choice"
                checked={foodChoice === option}
                onChange={() => setFoodChoice(option)}
              />
              <span>{option}</span>
            </label>
          ))}
        </div>
        {foodChoice === "Khác" && (
          <input
            aria-label="Món ăn cần lưu ý khác"
            maxLength={300}
            placeholder="Ví dụ: Dị ứng đậu phộng"
            value={otherFood}
            onChange={(event) => setOtherFood(event.target.value)}
          />
        )}
        <label className="notes-label" htmlFor="food-note">
          Ghi chú thêm (không bắt buộc)
        </label>
        <textarea
          id="food-note"
          rows={3}
          maxLength={300}
          placeholder="Ví dụ: Không ăn cay"
          value={note}
          onChange={(event) => setNote(event.target.value)}
        />
      </fieldset>
      {error && (
        <p className="field-error" role="alert">
          {error}
        </p>
      )}
      <button
        className="button button-primary submit-button"
        type="submit"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Đang gửi..." : "Gửi xác nhận"}{" "}
        <span aria-hidden="true">→</span>
      </button>
    </form>
  );
}
