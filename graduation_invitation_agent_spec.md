# Graduation Invitation Website — Coding Agent Specification

## 1. Overview

Build a modern, elegant, mobile-first **graduation invitation website**.

The website has two main purposes:

1. Present a personal graduation invitation with ceremony information.
2. Collect RSVP information for both:
   - Graduation ceremony attendance
   - Graduation party attendance

The final RSVP must distinguish exactly **4 attendance states**:

| Graduation ceremony | Graduation party | Final state |
|---|---|---|
| Yes | Yes | Attend ceremony + party |
| Yes | No | Attend ceremony only |
| No | Yes | Party only |
| No | No | Neither |

The experience should feel like a digital invitation rather than an administrative form.

---

# 2. Design Direction

## Overall style

- Elegant
- Personal
- Minimal
- Premium but not overly decorative
- Graduation theme
- Mobile-first
- Smooth transitions and subtle animations
- Vietnamese language
- Responsive on mobile, tablet, and desktop

Avoid:
- Overly complicated UI
- Excessive animations
- Too many colors
- Dense forms
- Generic corporate dashboard styling on the guest-facing pages

Suggested visual direction:

- Neutral/light background
- Black/dark typography
- Optional gold accent
- Large typography for the graduate's name
- Elegant serif font for headings
- Clean sans-serif font for body text
- Rounded cards/buttons where appropriate

---

# 3. Main Guest Flow

The guest flow must be:

```text
Landing / Invitation
        |
        +-----------------------+
        |                       |
        v                       v
  "Xác nhận tham gia"     "Bận, không tham gia"
        |                       |
        +-----------+-----------+
                    |
                    v
               Nhập họ tên
                    |
                    v
            Tiệc tốt nghiệp
                    |
             +------+------+
             |             |
             v             v
        Tham gia       Không tham gia
             |             |
             v             |
      Additional info      |
             |             |
             +------+------+
                    |
                    v
                 Complete
```

Important:

- Do NOT require password.
- Do NOT require the guest to select their name from a predefined list.
- The guest simply enters their name.
- The backend stores the entered name and RSVP information.

---

# 4. Page / Section 1 — Graduation Invitation

The first screen should look like a digital invitation.

## Content

Include:

### Graduation title

Example:

> LỄ TỐT NGHIỆP

### Graduate photo

The photo is **optional**.

The implementation should support:

```text
showGraduatePhoto: true | false
```

If `false`, the layout should still look complete and balanced.

If `true`, display a prominent portrait/photo.

Do not make the page dependent on having a photo.

### Graduate name

Example:

> NGUYỄN QUỐC ANH

### Invitation message

Example placeholder:

> Một chặng đường khép lại, một hành trình mới bắt đầu.  
> Mình rất vui nếu bạn có thể đến chung vui cùng mình trong ngày đặc biệt này.

The actual invitation text should be easy to configure.

### Ceremony information

Display:

- Date
- Time
- Location
- Optional venue address
- Optional map link

Example:

```text
📅 Thời gian
08:00 — 21/09/2026

📍 Địa điểm
Hội trường ...
Đại học ...
```

### Contact information

Include:

- Contact person's name
- Phone number
- Optional Zalo/contact link

On mobile, the phone number should be clickable using `tel:`.

---

# 5. Main RSVP Choice

At the bottom of the invitation, show two prominent actions.

## Option A

```text
🎉 XÁC NHẬN THAM GIA
```

Meaning:

```text
graduation_attendance = true
```

## Option B

```text
💌 BẬN, KHÔNG THAM GIA
```

Meaning:

```text
graduation_attendance = false
```

The two choices should be visually distinct and easy to understand.

---

# 6. Guest Name Input

After either RSVP choice, display a simple name form.

Title should depend on the previous choice.

If attending:

> Tuyệt vời! Mình rất vui khi bạn có thể đến. ❤️

If not attending:

> Mình rất tiếc vì bạn không thể tham dự lễ tốt nghiệp. Cảm ơn bạn đã gửi lời chúc đến mình. ❤️

Then:

> Vui lòng cho mình biết tên của bạn.

Input:

```text
Họ và tên
```

Button:

```text
TIẾP TỤC →
```

Validation:

- Required
- Trim whitespace
- Minimum reasonable length
- Do not accept empty/whitespace-only values

After submission, continue to the graduation party section.

---

# 7. Section 2 — Graduation Party

Title:

> 🥂 TIỆC TỐT NGHIỆP

Invitation text:

> Sau buổi lễ, mình muốn tổ chức một buổi tiệc nhỏ để cùng mọi người gặp gỡ và chia sẻ niềm vui. Bạn có thể tham gia cùng mình không?

Display two choices.

## Party attendance = Yes

```text
🥂 CÓ, MÌNH SẼ THAM GIA
```

## Party attendance = No

```text
💌 RẤT TIẾC, MÌNH KHÔNG THỂ THAM GIA
```

---

# 8. Party RSVP — If Attending

If the guest selects party attendance = true, display additional fields.

## 8.1 Select party date/time

Title:

> 📅 Bạn có thể tham gia vào thời gian nào?

Display configurable party date/time options.

Example:

```text
○ Thứ Bảy — 20/09 — 18:00
○ Chủ Nhật — 21/09 — 18:00
○ Thứ Bảy — 27/09 — 18:00
```

Implementation requirement:

- Party date/time options must come from configuration/database.
- Do not hard-code the UI structure.
- It should be easy for the admin/developer to add/remove available dates.
- Required if party attendance = true.

If only one date is configured, display it directly instead of forcing unnecessary selection.

---

## 8.2 Number of attendees

Title:

> 👥 Bạn sẽ tham dự cùng bao nhiêu người?

Use a simple stepper or select.

Example:

```text
[-] 1 [+]
```

Minimum:

```text
1
```

The field represents the total number of people attending, including the invited guest.

This field is required if party attendance = true.

---

## 8.3 Food restrictions / dietary notes

Title:

> 🍽️ Bạn có món ăn nào không thể ăn hoặc cần lưu ý không?

Provide options:

```text
○ Không có

○ Ăn chay

○ Không ăn hải sản

○ Không ăn thịt bò

○ Dị ứng thực phẩm

○ Khác
```

If "Khác" is selected, show a text input.

Also allow free-text dietary notes so guests can describe allergies/restrictions precisely.

Examples:

```text
Dị ứng đậu phộng
Không ăn cay
Ăn chay
```

This field is optional.

---

# 9. Party RSVP — If NOT Attending

If:

```text
party_attendance = false
```

Do not show:

- Party date
- Number of people
- Food restrictions

Immediately show the completion / thank-you screen.

---

# 10. Completion Screen

After the guest finishes the RSVP, show a warm thank-you message.

Example:

> ❤️ CẢM ƠN BẠN!
>
> Mình đã nhận được xác nhận của bạn.
>
> Dù có thể gặp nhau trong ngày tốt nghiệp hay không, mình vẫn rất trân trọng sự quan tâm và lời chúc của bạn.

Add a small summary if appropriate.

Example:

```text
Nguyễn Văn A

Lễ tốt nghiệp
✓ Tham gia

Tiệc tốt nghiệp
✓ Tham gia

Thời gian tiệc
21/09 — 18:00

Số người
2

Lưu ý món ăn
Không ăn hải sản
```

For the "neither" state, the summary should clearly indicate:

```text
Lễ tốt nghiệp
Không tham gia

Tiệc tốt nghiệp
Không tham gia
```

---

# 11. Architecture — React Only, No Backend

The website must be implemented as a **React frontend-only application**.

Do NOT create:

- Node.js/Express backend
- Next.js API routes
- Supabase
- PostgreSQL
- Firebase database
- Custom server
- Any persistent application backend

The RSVP submission should be sent directly from the React application to a **Discord Webhook URL**.

Recommended stack:

```text
React
TypeScript
Vite
Tailwind CSS
Discord Webhook
```

The final deployment can be a static website on:

- Vercel
- Netlify
- GitHub Pages
- Cloudflare Pages

The exact hosting provider is not important as long as it can serve a React static build.

---

# 12. Discord Webhook RSVP Submission

When the guest completes the RSVP, React should send the result to a configured Discord Webhook.

The flow is:

```text
Guest
  |
  v
React Website
  |
  | POST
  v
Discord Webhook
  |
  v
Discord Channel
```

The Discord message should contain all information necessary for the host to understand the RSVP.

## Example Discord message

```text
🎓 XÁC NHẬN THAM DỰ LỄ TỐT NGHIỆP

👤 Khách: Nguyễn Văn A

🎓 Lễ tốt nghiệp:
✅ Tham gia

🥂 Tiệc tốt nghiệp:
✅ Tham gia

📅 Thời gian tiệc:
21/09/2026 — 18:00

👥 Số người:
2

🍽️ Lưu ý món ăn:
Không ăn hải sản

📌 Trạng thái:
CEREMONY + PARTY

🕐 Thời gian phản hồi:
12/09/2026 10:32
```

For the other states:

### Ceremony only

```text
🎓 Lễ: ✅ Tham gia
🥂 Tiệc: ❌ Không tham gia
📌 Trạng thái: CEREMONY ONLY
```

### Party only

```text
🎓 Lễ: ❌ Không tham gia
🥂 Tiệc: ✅ Tham gia
📌 Trạng thái: PARTY ONLY
```

### Neither

```text
🎓 Lễ: ❌ Không tham gia
🥂 Tiệc: ❌ Không tham gia
📌 Trạng thái: NEITHER
```

---

# 13. Discord Webhook Configuration

Create a central configuration:

```text
const eventConfig = {
    graduateName: "...",
    graduatePhoto: "...",
    showGraduatePhoto: true,

    invitationMessage: "...",

    ceremonyDate: "...",
    ceremonyTime: "...",
    ceremonyLocation: "...",
    ceremonyAddress: "...",
    mapUrl: "...",

    contactName: "...",
    contactPhone: "...",
    contactZalo: "...",

    partyDescription: "...",
    partyDateOptions: [
        {
            id: "...",
            date: "...",
            time: "..."
        }
    ],

    discordWebhookUrl: "..."
}
```

Keep event-specific content in one place.

---

# 14. Important Discord Webhook Security Note

Because this is a frontend-only application, a Discord Webhook URL included in React will ultimately be discoverable by users through the browser/network bundle.

This is an accepted trade-off for this small personal invitation project, but the implementation must understand:

```text
Frontend-only
      ↓
Webhook URL is not truly secret
```

Do NOT describe `VITE_DISCORD_WEBHOOK_URL` or another frontend environment variable as a secret.

If the project later needs stronger protection, the webhook request should be moved behind a serverless function / edge function. That would be an optional future improvement, not part of the current implementation.

For the current version:

- Do not expose the webhook URL in the visible UI.
- Keep it in an environment/config variable during development.
- Do not log the webhook URL.
- Do not display it in error messages.
- Validate and sanitize all guest input before building the Discord payload.
- Prevent accidental multiple submissions by disabling the submit button while sending.
- Show a friendly error if Discord submission fails.

---

# 15. RSVP Data Structure in React

No database record is required.

Use a local TypeScript object while collecting the form:

```ts
type RSVPData = {
    guestName: string;
    graduationAttendance: boolean;
    partyAttendance: boolean;
    partyDateTime?: string;
    numberOfAttendees?: number;
    foodNotes?: string;
    submittedAt: string;
};
```

Example:

```ts
const rsvp: RSVPData = {
    guestName: "Nguyễn Văn A",
    graduationAttendance: true,
    partyAttendance: true,
    partyDateTime: "2026-09-21T18:00",
    numberOfAttendees: 2,
    foodNotes: "Không ăn hải sản",
    submittedAt: new Date().toISOString()
};
```

If party attendance is false:

```ts
{
    guestName: "...",
    graduationAttendance: true,
    partyAttendance: false,
    partyDateTime: undefined,
    numberOfAttendees: undefined,
    foodNotes: undefined
}
```

---

# 16. Four Final RSVP States

The React application should derive the final status from the two boolean attendance values.

```ts
function getRSVPStatus(
    graduationAttendance: boolean,
    partyAttendance: boolean
) {
    if (graduationAttendance && partyAttendance) {
        return "ceremony_and_party";
    }

    if (graduationAttendance && !partyAttendance) {
        return "ceremony_only";
    }

    if (!graduationAttendance && partyAttendance) {
        return "party_only";
    }

    return "neither";
}
```

Display Vietnamese labels:

```text
ceremony_and_party → Lễ + Tiệc
ceremony_only      → Chỉ Lễ
party_only         → Chỉ Tiệc
neither            → Không tham gia
```

Do not allow inconsistent states.

For example:

```text
party_attendance = false
party_datetime = "2026-09-21"
```

must never be submitted.

---

# 17. Discord Webhook Implementation

Create a dedicated service/module instead of putting the fetch request directly inside the UI component.

Suggested structure:

```text
src/
├── components/
├── config/
│   └── eventConfig.ts
├── services/
│   └── discordWebhook.ts
├── types/
│   └── rsvp.ts
├── utils/
│   └── rsvp.ts
└── App.tsx
```

Example service responsibility:

```ts
sendRSVPToDiscord(rsvp: RSVPData): Promise<void>
```

The service should:

1. Derive the four-state RSVP status.
2. Build a readable Discord message.
3. Send the message using `fetch()`.
4. Throw/return an error when Discord rejects the request.
5. Never expose the webhook URL in the UI.

Prefer a Discord Embed for a cleaner notification.

Example payload concept:

```ts
{
    username: "Graduation RSVP",
    embeds: [
        {
            title: "🎓 Xác nhận tham dự lễ tốt nghiệp",
            fields: [
                {
                    name: "👤 Khách",
                    value: guestName
                },
                {
                    name: "🎓 Lễ tốt nghiệp",
                    value: graduationAttendance
                        ? "✅ Tham gia"
                        : "❌ Không tham gia"
                },
                {
                    name: "🥂 Tiệc tốt nghiệp",
                    value: partyAttendance
                        ? "✅ Tham gia"
                        : "❌ Không tham gia"
                }
            ]
        }
    ]
}
```

Add party-specific fields only when:

```ts
partyAttendance === true
```

---

# 18. No Admin Dashboard / No Database

Because this version has no backend/database, **do not implement an admin dashboard that expects persistent RSVP data**.

The Discord channel becomes the RSVP inbox.

The host can use Discord to:

- See every response
- Search by guest name
- Search/filter messages
- Review food restrictions
- Count attendees
- See the four RSVP states

If an admin dashboard is required in the future, introduce a backend/database at that point.

---

# 19. Optional Discord Message Enhancements

Make the Discord notifications easy to scan.

Use:

- Embed title
- Emoji
- Clearly separated fields
- Final RSVP status
- Submission timestamp

Example:

```text
🎓 Xác nhận tham dự

👤 Nguyễn Văn A

┌─────────────────────────┐
│ LỄ TỐT NGHIỆP           │
│ ✅ Tham gia             │
├─────────────────────────┤
│ TIỆC TỐT NGHIỆP         │
│ ✅ Tham gia             │
├─────────────────────────┤
│ THỜI GIAN               │
│ 21/09 — 18:00           │
├─────────────────────────┤
│ SỐ NGƯỜI                │
│ 2                       │
├─────────────────────────┤
│ LƯU Ý MÓN ĂN            │
│ Không ăn hải sản        │
└─────────────────────────┘

📌 Lễ + Tiệc
```

---

# 20. Configuration

Important event information should NOT be hard-coded throughout the UI.

Create a central configuration such as:

```ts
export const eventConfig = {
    graduateName: "Nguyễn Quốc Anh",
    graduatePhoto: "/images/graduate.jpg",
    showGraduatePhoto: true,

    invitationMessage:
        "Một chặng đường khép lại, một hành trình mới bắt đầu...",

    ceremonyDate: "21/09/2026",
    ceremonyTime: "08:00",
    ceremonyLocation: "Hội trường ...",
    ceremonyAddress: "...",
    mapUrl: "...",

    contactName: "Nguyễn Quốc Anh",
    contactPhone: "09xxxxxxxx",
    contactZalo: "...",

    partyDescription:
        "Sau buổi lễ, mình muốn tổ chức một buổi tiệc nhỏ...",

    partyDateOptions: [
        {
            id: "party-1",
            date: "21/09/2026",
            time: "18:00",
            label: "21/09/2026 — 18:00"
        }
    ],

    discordWebhookUrl:
        import.meta.env.VITE_DISCORD_WEBHOOK_URL
};
```

The UI should consume this configuration rather than duplicating event information.

---

# 21. Submission States

The React application must explicitly handle:

```text
idle
↓
submitting
↓
success
```

or:

```text
idle
↓
submitting
↓
error
```

While submitting:

```text
[ ĐANG GỬI... ]
```

Disable the submit button to prevent duplicate Discord messages.

On success:

```text
❤️ CẢM ƠN BẠN!

Mình đã nhận được xác nhận của bạn.
```

On failure:

```text
Có lỗi xảy ra khi gửi xác nhận.
Vui lòng thử lại.
```

Allow the guest to retry without losing their entered information.

---

# 22. Local State / Page Refresh

Because there is no backend, RSVP information is not persisted by the website.

Use React state for the current RSVP flow.

Optionally use `sessionStorage` to prevent accidental loss when navigating/re-rendering during the same session.

Do NOT imply that the website permanently stores RSVP data.

The permanent copy of each RSVP is the Discord message.

---

# 23. Recommended Technical Direction

The required stack is:

```text
Frontend:
React
TypeScript
Vite

Styling:
Tailwind CSS

Data persistence:
None

RSVP delivery:
Discord Webhook

Deployment:
Static hosting
```

Do not introduce a backend unless explicitly requested.

---

# 24. Suggested Routes

Guest-facing:

```text
/
```

Prefer a single-page experience with state transitions.

Optional:

```text
/thanks
```

No `/admin` is required for this version.

---

# 25. Suggested Components

Possible component structure:

```text
src/
├── components/
│   ├── InvitationHero
│   ├── GraduatePhoto
│   ├── EventInfo
│   ├── ContactInfo
│   ├── AttendanceChoice
│   ├── GuestNameForm
│   ├── PartyInvitation
│   ├── PartyDateSelector
│   ├── AttendeeCounter
│   ├── FoodPreference
│   ├── RSVPConfirmation
│   └── ThankYou
│
├── config/
│   └── eventConfig.ts
│
├── services/
│   └── discordWebhook.ts
│
├── types/
│   └── rsvp.ts
│
├── utils/
│   └── rsvp.ts
│
└── App.tsx
```

Use reusable components and avoid putting the entire application into one large component.

---

# 26. Export

There is no database and therefore no server-side export.

The RSVP information is delivered to Discord.

If export is required later, add a backend/database or implement a separate Discord-to-CSV workflow.


---

# 16. Responsive Design

Mobile is the primary target.

The website must work well at:

```text
360px
390px
430px
768px
1024px+
```

Important:

- Buttons must be easy to tap.
- Avoid tiny text.
- Forms should not feel cramped.
- Avoid horizontal scrolling.
- Invitation should feel visually centered.
- Keep important actions visible without excessive scrolling.

---

# 17. Animations

Use subtle animations only.

Recommended:

- Fade-in invitation
- Gentle slide-up of sections
- Button hover/tap feedback
- Smooth section transitions
- Success animation on completion

Avoid:

- Excessive particles
- Heavy parallax
- Long loading animations
- Animations that make the website slow on mobile

Respect:

```text
prefers-reduced-motion
```

---

# 18. UX Requirements

The guest should never feel like they are filling out a complicated survey.

Target flow:

```text
Open invitation
→ Read invitation
→ Choose attendance
→ Enter name
→ Answer party question
→ If attending: choose date + number + food notes
→ Submit
→ Thank you
```

Keep the number of visible inputs low at each step.

Use clear Vietnamese labels.

Do not ask for unnecessary information.

---

# 19. Validation and Error Handling

Handle:

- Empty guest name
- Invalid party date
- Invalid attendee count
- Failed API/database request
- Duplicate/updated RSVP
- Network errors

Display friendly Vietnamese messages.

Example:

> Vui lòng nhập họ và tên.

Instead of technical messages such as:

> ValidationError: guest_name is required.

For server errors:

> Có lỗi xảy ra khi gửi xác nhận. Vui lòng thử lại sau.

---

# 20. Security

Even though this is a simple invitation website:

- Validate all input on the server.
- Sanitize/escape user-provided text.
- Do not expose database credentials in frontend code.
- Use environment variables for secrets.
- Protect admin routes.
- Do not expose unnecessary database fields through public APIs.
- Apply reasonable rate limiting if supported by the chosen backend.

The guest should only be able to submit/update their own RSVP through the intended flow.

---

# 21. Recommended Technical Direction

If the project does not already have a stack, a suitable stack is:

```text
Frontend:
Next.js
React
TypeScript

Styling:
Tailwind CSS

Backend:
Supabase

Database:
PostgreSQL

Deployment:
Vercel
```

However, if the repository already uses another stack, preserve the existing architecture unless there is a strong reason to change it.

---

# 22. Suggested Routes

Guest-facing:

```text
/
```

Main invitation and RSVP flow can be implemented as a single-page experience with state transitions, or split into routes if that improves maintainability.

Optional:

```text
/thanks
/admin
```

Admin:

```text
/admin
```

Protect `/admin`.

---

# 23. Suggested Components

Possible component structure:

```text
components/
├── InvitationHero
├── GraduatePhoto
├── EventInfo
├── ContactInfo
├── AttendanceChoice
├── GuestNameForm
├── PartyInvitation
├── PartyDateSelector
├── AttendeeCounter
├── FoodPreference
├── RSVPConfirmation
├── ThankYou
└── admin/
    ├── DashboardStats
    ├── RSVPTable
    ├── RSVPFilters
    └── ExportButton
```

Use reusable components and avoid putting the entire application into one large component.

---

# 24. Acceptance Criteria

The implementation is complete when:

- [ ] Landing page looks like a polished graduation invitation.
- [ ] Graduate photo can be enabled/disabled.
- [ ] Ceremony date/time/location are clearly displayed.
- [ ] Contact phone is clickable on mobile.
- [ ] Guest can choose "Xác nhận tham gia".
- [ ] Guest can choose "Bận, không tham gia".
- [ ] Both paths ask for guest name.
- [ ] Both paths continue to the party section.
- [ ] Guest can choose party attendance.
- [ ] If attending party, guest can choose party date/time.
- [ ] If attending party, guest can enter number of attendees.
- [ ] Guest can enter dietary/food restrictions.
- [ ] If not attending party, unnecessary party fields are hidden.
- [ ] Submission creates an RSVP object in React state.
- [ ] The RSVP is sent successfully to the configured Discord Webhook.
- [ ] The Discord message contains the guest name and all relevant RSVP information.
- [ ] The Discord message clearly identifies all 4 attendance states.
- [ ] Party-specific fields are included only when the guest attends the party.
- [ ] Completion screen thanks the guest.
- [ ] No backend/database is required.
- [ ] No admin dashboard is required.
- [ ] No unnecessary persistent guest data is stored in the website.
- [ ] Layout is responsive and mobile-first.
- [ ] Form validation works.
- [ ] Discord submission/loading/error states are handled gracefully.
- [ ] Duplicate submission is prevented while sending.
- [ ] The Discord Webhook URL is not displayed in the UI or logs.
- [ ] The implementation clearly acknowledges that a frontend Discord Webhook URL cannot be a true secret.
- [ ] No server/database credentials are exposed because there is no backend.

---

# 25. Important Product Principle

This should feel like a **personal invitation**, not a registration form.

The emotional sequence should be:

```text
🎓 "Bạn được mời"
        ↓
❤️ "Mình rất vui nếu bạn đến"
        ↓
🎉 "Bạn có tham dự không?"
        ↓
🥂 "Bạn có thể tham gia buổi tiệc không?"
        ↓
❤️ "Cảm ơn bạn"
```

Prioritize visual elegance and a smooth guest experience over adding unnecessary features.
