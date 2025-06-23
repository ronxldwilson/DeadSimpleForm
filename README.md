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

---

Let me know if you'd like to:

* Add Webhook Delivery Retry docs
* Add example frontend HTML integration
* Format it for a `README.md` or Swagger spec

Want to publish this on a `/docs` route too?

