type Props = {
  label: string;
  onClick: () => void;
  disabled?: boolean;
};

export function BackButton({ label, onClick, disabled = false }: Props) {
  return (
    <button className="back-button" type="button" onClick={onClick} disabled={disabled}>
      <span aria-hidden="true">←</span> {label}
    </button>
  );
}
