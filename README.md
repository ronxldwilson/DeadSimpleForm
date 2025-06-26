# DeadSimpleForm 

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.


# 📝 DeadSimpleForm API Documentation

DeadSimpleForm is a lightweight, developer-first API backend for handling form submissions. Build your own frontend, send form data via HTTP, and manage it through a secure Supabase-backed backend.

---

## 🔐 Authentication

All routes (except `/submit`) require the user to be authenticated using Supabase Auth.

Ensure the user is logged in and session is active via middleware or client helpers.

---

## 📌 Base URL

```txt
http://localhost:3000/api
```

---

## 📂 Endpoints

### 1. Create a Form

**POST** `/forms`

Create a new form for the logged-in user.

#### Request Body

```json
{
  "name": "Contact Form",
  "slug": "contact-form",
  "webhook_url": "https://example.com/webhook" // Optional
}
```

#### Response

```json
{
  "id": "form-uuid",
  "user_id": "user-uuid",
  "name": "Contact Form",
  "slug": "contact-form",
  "webhook_url": "https://example.com/webhook",
  "created_at": "2025-06-23T09:47:34.29978+00:00"
}
```

---

### 2. List Forms for Logged-in User

**GET** `/forms`

Returns all forms created by the logged-in user.

#### Response

```json
[
  {
    "id": "form-uuid",
    "name": "Contact Form",
    "slug": "contact-form",
    "webhook_url": null,
    "created_at": "..."
  },
  ...
]
```

---

### 3. Get a Specific Form by ID

**GET** `/form-detail/[id]`

Returns details of a single form belonging to the logged-in user.

---

### 4. Submit to a Form

**POST** `/forms/submit/[slug]`

Public endpoint for submitting data to a form.

#### Example

```bash
curl -X POST http://localhost:3000/api/forms/submit/contact-form \
  -H "Content-Type: application/json" \
  -d '{"name": "Alice", "email": "alice@example.com", "message": "Hello"}'
```

#### Request Body

The payload is dynamic. Anything posted is stored under the `data` field.

```json
{
  "name": "Alice",
  "email": "alice@example.com",
  "message": "Hello"
}
```

#### Response

```json
{
  "success": true
}
```

---

### 5. Get Submissions for a Form

**GET** `/forms/[form_id]/submissions`

Returns all submissions for a given form owned by the logged-in user.

#### Response

```json
[
  {
    "id": "submission-uuid",
    "form_id": "form-uuid",
    "data": {
      "name": "Alice",
      "email": "alice@example.com",
      "message": "Hello"
    },
    "submitted_at": "2025-06-23T10:00:00Z"
  },
  ...
]
```

---

## 🛡️ Errors

| Code | Meaning              |
| ---- | -------------------- |
| 401  | Unauthorized         |
| 400  | Bad Request / Error  |
| 404  | Form Not Found       |
| 406  | Not Acceptable (RLS) |

# 🔐 Encrypted Form Submissions — Documentation

DeadSimpleForm ensures that all form submissions are encrypted before being stored in the database. Only authenticated users with access to the form can view decrypted data.

---

## 💡 Overview

* Submitted data is **encrypted on the server** using symmetric AES encryption.
* Data is **decrypted on the server** when accessed via a secure, authenticated API.
* The frontend **never stores** the encryption key — it only receives already decrypted data.
* Supports multiple content types: `application/json` and `application/x-www-form-urlencoded`.
* Optional: Data can also be **forwarded to a webhook** in plaintext.

---

## 📥 Submission Endpoint

### `POST /api/forms/submit/[slug]`

Used by **public users** to submit form data.

#### Request

* **Path Parameter**: `slug` – Unique form identifier (e.g. `contact-form`)
* **Body (one of)**:

  * `application/json`

    ```json
    {
      "name": "Alice",
      "email": "alice@example.com"
    }
    ```
  * `application/x-www-form-urlencoded`

    ```
    name=Alice&email=alice@example.com
    ```

#### Behavior

* Looks up the form by `slug`.
* Encrypts the request body using `FORM_ENCRYPTION_SECRET` from env.
* Stores encrypted data along with IP address and user-agent in the `submissions` table.
* If the form has a `webhook_url`, forwards the **unencrypted** submission to that URL via `POST`.

#### Success Response

```json
{
  "success": true
}
```

---

## 🔓 Fetching Submissions

### `GET /api/forms/[form_id]/submissions`

Used by **authenticated form owners** to view decrypted submissions.

#### Request

* **Path Parameter**: `form_id` – UUID of the form

#### Behavior

* Authenticates the user via Supabase Auth.
* Verifies the form belongs to the user.
* Fetches encrypted submissions from the database.
* Decrypts each record using the server-side encryption key.
* Returns fully decrypted data in JSON format.

#### Success Response

```json
[
  {
    "id": "uuid",
    "form_id": "uuid",
    "submitted_at": "2024-06-27T12:00:00Z",
    "data": {
      "name": "Alice",
      "email": "alice@example.com"
    },
    "ip_address": "203.0.113.1",
    "user_agent": "Mozilla/5.0 ..."
  },
  ...
]
```

---

## 🔐 Encryption Details

* Algorithm: AES-256-GCM
* Key: Loaded from `process.env.FORM_ENCRYPTION_SECRET`
* IV: Randomly generated per message
* Tag: GCM tag appended to ciphertext
* Output format: Base64-encoded JSON `{ iv, tag, data }`

**Example stored `data` field**:

```json
{
  "iv": "A1B2C3D4E5F6...",
  "tag": "1A2B3C4D...",
  "data": "U2FsdGVkX1+..."
}
```

---

## 📦 Client-Side Usage

* Client (dashboard) uses:

  ```ts
  fetch(`/api/forms/${formId}/submissions`)
  ```
* No decryption logic on client. All data received is already decrypted.

---

## 📄 Environment Variable

Make sure the following is set in `.env` or hosting environment:

```env
FORM_ENCRYPTION_SECRET=your-32-byte-long-secret-key
```

Length must be exactly **32 bytes** for AES-256.

---

## 🚨 Security Notes

* The encryption key is **never exposed to users**.
* Only form owners can access decrypted data.
* If the key is changed, previously encrypted data **cannot be decrypted**.
* Avoid logging raw encrypted data or keys.

