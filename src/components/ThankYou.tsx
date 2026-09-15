import type { RSVPData } from '../types/rsvp'

export function ThankYou({ rsvp }: { rsvp: RSVPData }) {
  return (
    <div className="thank-you reveal">
      <div className="success-mark" aria-hidden="true">♥</div>
      <p className="eyebrow">Phản hồi đã được gửi</p>
      <h1>Cảm ơn bạn!</h1>
      
      <p className="thank-you-copy">
        Mình đã nhận được xác nhận của bạn. Dù có thể gặp nhau trong ngày tốt nghiệp hay không, 
        mình vẫn rất trân trọng tình bạn của chúng ta và quý bạn rất nhiuuu.
      </p>

      <div className="rsvp-summary">
        <strong>{rsvp.guestName}</strong>
        <dl>
          <div>
            <dt>Lễ tốt nghiệp</dt>
            <dd>{rsvp.graduationAttendance ? '✓ Tham gia' : 'Không tham gia'}</dd>
          </div>
          
          {rsvp.wellWish && (
            <div>
              <dt>Lời chúc</dt>
              <dd>{rsvp.wellWish}</dd>
            </div>
          )}
        </dl>
      </div>
    </div>
  )
}