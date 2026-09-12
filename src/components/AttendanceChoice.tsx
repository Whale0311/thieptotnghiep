type Props = {
  onChoose: (attending: boolean) => void
  busy?: boolean
}

export function AttendanceChoice({ onChoose, busy = false }: Props) {
  return (
    <div className="choice-grid">
      <button className="button button-primary" onClick={() => onChoose(true)} disabled={busy}>
        <span aria-hidden="true">🎉</span> Xác nhận tham gia
      </button>
      <button className="button button-secondary" onClick={() => onChoose(false)} disabled={busy}>
        <span aria-hidden="true">💌</span> Bận, không tham gia
      </button>
    </div>
  )
}
