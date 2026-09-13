export type RSVPStatus =
  | "ceremony_and_party"
  | "ceremony_only"
  | "party_only"
  | "neither";

export type RSVPData = {
  guestName: string;
  graduationAttendance: boolean;
  partyAttendance: boolean;
  partyDateTimes?: string[];
  numberOfAttendees?: number;
  foodNotes?: string;
  wellWish?: string;
  submittedAt: string;
};

export type SubmissionState = "idle" | "submitting" | "success" | "error";
