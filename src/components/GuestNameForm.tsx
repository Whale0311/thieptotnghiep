import { useState } from "react";

type Props = {
  attendingCeremony: boolean;
  initialName: string;
  initialWish: string;
  onContinue: (name: string, wish: string) => void;
};

export function GuestNameForm({
  attendingCeremony,
  initialName,
  initialWish,
  onContinue,
}: Props) {
  const [name, setName] = useState(initialName);
  const [wish, setWish] = useState(initialWish);
  const [error, setError] = useState("");

  function submit(event: React.FormEvent) {
    event.preventDefault();
    const value = name.trim().replace(/\s+/g, " ");
    if (value.length < 2) {
      setError("Vui lòng nhập họ và tên (ít nhất 2 ký tự).");
      return;
    }
    onContinue(value, wish.trim());
  }

  return (
    <form className="form-stack" onSubmit={submit} noValidate>
      <p className="warm-message">
        {attendingCeremony
          ? "Tuyệt vời! Mình rất vui khi bạn có thể đến. Nếu được, hãy để lại một lời chúc nhé. ❤️"
          : "Mình rất tiếc vì bạn không thể tham dự lễ tốt nghiệp. Nếu được, hãy để lại một lời chúc nhé. ❤️"}
      </p>
      <div>
        <label htmlFor="guest-name">Vui lòng cho mình biết tên của bạn.</label>
        <input
          id="guest-name"
          autoComplete="name"
          maxLength={100}
          placeholder="Họ và tên"
          value={name}
          onChange={(event) => {
            setName(event.target.value);
            setError("");
          }}
          aria-describedby={error ? "name-error" : undefined}
          aria-invalid={Boolean(error)}
        />
        {error && (
          <p id="name-error" className="field-error">
            {error}
          </p>
        )}
      </div>
      <div>
        <label htmlFor="guest-wish">
          Bạn có muốn gửi lời chúc đến mình không?{" "}
          <span className="optional-label">{/* (Không bắt buộc) */}</span>
        </label>
        <textarea
          id="guest-wish"
          rows={4}
          maxLength={500}
          placeholder="Viết một lời chúc của bạn..."
          value={wish}
          onChange={(event) => setWish(event.target.value)}
        />
      </div>
      <button className="button button-primary submit-button" type="submit">
        Tiếp tục <span aria-hidden="true">→</span>
      </button>
    </form>
  );
}
