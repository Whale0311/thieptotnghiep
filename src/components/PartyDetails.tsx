import { useState } from "react";
import { eventConfig } from "../config/eventConfig";
import { FOOD_OPTIONS } from "../utils/rsvp";

type Props = {
  onSubmit: (values: {
    partyDateTimes: string[];
    numberOfAttendees: number;
    foodNotes?: string;
  }) => void;
  isSubmitting: boolean;
};

export function PartyDetails({ onSubmit, isSubmitting }: Props) {
  const options = eventConfig.partyDateOptions;
  const [selectedDateIds, setSelectedDateIds] = useState<string[]>(
    options.length === 1 && options[0] ? [options[0].id] : [],
  );
  const [attendeeCount, setAttendeeCount] = useState(1);
  const [foodChoices, setFoodChoices] = useState<
    (typeof FOOD_OPTIONS)[number][]
  >([]);
  const [otherFood, setOtherFood] = useState("");
  const [note, setNote] = useState("");
  const [error, setError] = useState("");
  const oneOption = options.length === 1;

  function submit(event: React.FormEvent) {
    event.preventDefault();
    const selectedDates = options.filter((option) =>
      selectedDateIds.includes(option.id),
    );
    if (!selectedDates.length) {
      setError("Vui lòng chọn ít nhất một khung thời gian tham gia tiệc.");
      return;
    }
    const notes = [
      ...foodChoices.filter(
        (choice) => choice !== "Không có" && choice !== "Khác",
      ),
      foodChoices.includes("Khác") ? otherFood : "",
      note,
    ]
      .map((item) => item.trim())
      .filter(Boolean)
      .join(" — ");
    onSubmit({
      partyDateTimes: selectedDates.map(
        (option) => `${option.date} — ${option.time}`,
      ),
      numberOfAttendees: attendeeCount,
      foodNotes: notes || undefined,
    });
  }

  function toggleDate(id: string) {
    setSelectedDateIds((current) =>
      current.includes(id)
        ? current.filter((currentId) => currentId !== id)
        : [...current, id],
    );
    setError("");
  }

  function toggleFood(option: (typeof FOOD_OPTIONS)[number]) {
    setFoodChoices((current) => {
      if (option === "Không có")
        return current.includes(option) ? [] : [option];
      const withoutNone = current.filter((choice) => choice !== "Không có");
      return withoutNone.includes(option)
        ? withoutNone.filter((choice) => choice !== option)
        : [...withoutNone, option];
    });
  }

  return (
    <form className="form-stack" onSubmit={submit} noValidate>
      <fieldset>
        <legend>📅 Bạn có thể tham gia vào khung thời gian nào?</legend>
        <p className="availability-note">{eventConfig.partyAvailabilityNote}</p>
        {!oneOption && (
          <p className="assistive-copy">
            Bạn có thể chọn nhiều khung giờ phù hợp.
          </p>
        )}
        {oneOption ? (
          <div className="single-option">{options[0].label}</div>
        ) : (
          <div className="checkbox-list">
            {options.map((option) => (
              <label className="checkbox-option" key={option.id}>
                <input
                  type="checkbox"
                  value={option.id}
                  checked={selectedDateIds.includes(option.id)}
                  onChange={() => toggleDate(option.id)}
                  disabled={isSubmitting}
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
        <p className="assistive-copy">
          Bạn có thể chọn nhiều phương án nếu cần.
        </p>
        <div className="food-options">
          {FOOD_OPTIONS.map((option) => (
            <label className="food-option" key={option}>
              <input
                type="checkbox"
                checked={foodChoices.includes(option)}
                onChange={() => toggleFood(option)}
                disabled={isSubmitting}
              />
              <span>{option}</span>
            </label>
          ))}
        </div>
        {foodChoices.includes("Khác") && (
          <input
            aria-label="Món ăn cần lưu ý khác"
            maxLength={300}
            placeholder="Ví dụ: Dị ứng đậu phộng"
            value={otherFood}
            onChange={(event) => setOtherFood(event.target.value)}
            disabled={isSubmitting}
          />
        )}
        <label className="notes-label" htmlFor="food-note">
          Ghi chú thêm
        </label>
        <textarea
          id="food-note"
          rows={3}
          maxLength={300}
          placeholder="Ví dụ: Mình tặng cậu thùng bia có được không?"
          value={note}
          onChange={(event) => setNote(event.target.value)}
          disabled={isSubmitting}
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
