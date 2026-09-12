import type { RSVPData } from '../types/rsvp'
import { getRSVPStatus, statusLabels } from '../utils/rsvp'

export function ThankYou({ rsvp }: { rsvp: RSVPData }) {
  const status = getRSVPStatus(rsvp.graduationAttendance, rsvp.partyAttendance)
  return (
    <div className="thank-you reveal">
      <div className="success-mark" aria-hidden="true">♥</div>
      <p className="eyebrow">Phản hồi đã được gửi</p>
      <h1>Cảm ơn bạn!</h1>
      <p className="thank-you-copy">
        Mình đã nhận được xác nhận của bạn. Dù có thể gặp nhau trong ngày tốt nghiệp hay không,
        mình vẫn rất trân trọng sự quan tâm và lời chúc của bạn.
      </p>
      <div className="rsvp-summary">
        <strong>{rsvp.guestName}</strong>
        <dl>
          <div><dt>Lễ tốt nghiệp</dt><dd>{rsvp.graduationAttendance ? '✓ Tham gia' : 'Không tham gia'}</dd></div>
          <div><dt>Tiệc tốt nghiệp</dt><dd>{rsvp.partyAttendance ? '✓ Tham gia' : 'Không tham gia'}</dd></div>
          {rsvp.partyAttendance && rsvp.partyDateTime && <div><dt>Thời gian tiệc</dt><dd>{rsvp.partyDateTime}</dd></div>}
          {rsvp.partyAttendance && rsvp.numberOfAttendees && <div><dt>Số người</dt><dd>{rsvp.numberOfAttendees}</dd></div>}
          {rsvp.partyAttendance && rsvp.foodNotes && <div><dt>Lưu ý món ăn</dt><dd>{rsvp.foodNotes}</dd></div>}
          <div><dt>Trạng thái</dt><dd>{statusLabels[status]}</dd></div>
        </dl>
      </div>
    </div>
  )
}
