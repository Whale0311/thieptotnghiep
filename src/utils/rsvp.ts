import type { RSVPData, RSVPStatus } from '../types/rsvp'

export const FOOD_OPTIONS = [
  'Không có',
  'Ăn chay',
  'Không ăn hải sản',
  'Không ăn thịt bò',
  'Dị ứng thực phẩm',
  'Khác',
] as const

export function getRSVPStatus(
  graduationAttendance: boolean,
  partyAttendance: boolean,
): RSVPStatus {
  if (graduationAttendance && partyAttendance) return 'ceremony_and_party'
  if (graduationAttendance) return 'ceremony_only'
  if (partyAttendance) return 'party_only'
  return 'neither'
}

export const statusLabels: Record<RSVPStatus, string> = {
  ceremony_and_party: 'Lễ + Tiệc',
  ceremony_only: 'Chỉ Lễ',
  party_only: 'Chỉ Tiệc',
  neither: 'Không tham gia',
}

/** Keeps plain, readable text for Discord and prevents unexpectedly long payloads. */
export function cleanText(value: string, maxLength = 500): string {
  return value.replace(/[\u0000-\u001F\u007F]/g, ' ').replace(/\s+/g, ' ').trim().slice(0, maxLength)
}

export function validateRSVP(rsvp: RSVPData): string | null {
  if (cleanText(rsvp.guestName, 100).length < 2) {
    return 'Vui lòng nhập họ và tên (ít nhất 2 ký tự).'
  }

  if (!rsvp.partyAttendance) {
    if (rsvp.partyDateTime || rsvp.numberOfAttendees || rsvp.foodNotes) {
      return 'Thông tin tiệc chỉ được gửi khi bạn tham gia tiệc.'
    }
    return null
  }

  if (!rsvp.partyDateTime) return 'Vui lòng chọn thời gian tham gia tiệc.'
  if (!Number.isInteger(rsvp.numberOfAttendees) || rsvp.numberOfAttendees! < 1) {
    return 'Số người tham dự phải từ 1 người trở lên.'
  }

  return null
}
