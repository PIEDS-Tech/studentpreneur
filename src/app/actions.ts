"use server";

import { appendFile, mkdir } from "node:fs/promises";
import path from "node:path";

export type InterestState = {
  status: "idle" | "success" | "error";
  message?: string;
  errors?: Partial<Record<InterestField, string>>;
  values?: Partial<Record<InterestField, string>>;
};

const FIELDS = ["name", "role", "school", "city", "email", "phone", "students", "timing", "message"] as const;
type InterestField = (typeof FIELDS)[number];

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^[+\d][\d\s-]{7,16}$/;

function validate(values: Record<InterestField, string>) {
  const errors: InterestState["errors"] = {};
  if (values.name.length < 2) errors.name = "Enter your name.";
  if (!values.role) errors.role = "Choose your role.";
  if (values.school.length < 2) errors.school = "Enter your school’s name.";
  if (values.city.length < 2) errors.city = "Enter your city.";
  if (!EMAIL_RE.test(values.email)) errors.email = "Enter an email address like name@school.edu.in.";
  if (values.phone && !PHONE_RE.test(values.phone)) errors.phone = "Enter a phone number with digits only, like +91 98765 43210.";
  if (!values.students) errors.students = "Choose roughly how many students.";
  if (values.message.length > 1000) errors.message = "Keep the note under 1,000 characters.";
  return errors;
}

/**
 * Stores an "interest" lead.
 * - In production, set INTEREST_WEBHOOK_URL (e.g. a Google Apps Script, Formspree
 *   or Zapier endpoint) and each lead is POSTed there as JSON.
 * - Without a webhook, leads are appended to data/interest-submissions.jsonl.
 */
async function store(lead: Record<string, string>) {
  const webhook = process.env.INTEREST_WEBHOOK_URL;
  if (webhook) {
    const res = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(lead),
    });
    if (!res.ok) throw new Error(`Webhook responded ${res.status}`);
    return;
  }
  // No webhook: keep leads in a local JSON-lines file. Works on a normal Node
  // server; on read-only/serverless hosts this throws and the user sees an error.
  const dir = path.join(process.cwd(), "data");
  await mkdir(dir, { recursive: true });
  await appendFile(path.join(dir, "interest-submissions.jsonl"), JSON.stringify(lead) + "\n");
}

export async function submitInterest(_prev: InterestState, formData: FormData): Promise<InterestState> {
  // Honeypot: real people never fill this hidden field.
  if (String(formData.get("website") ?? "").length > 0) {
    return { status: "success", message: "Thanks! We’ll be in touch soon." };
  }

  const values = Object.fromEntries(
    FIELDS.map((f) => [f, String(formData.get(f) ?? "").trim()]),
  ) as Record<InterestField, string>;

  const errors = validate(values);
  if (Object.keys(errors).length > 0) {
    return { status: "error", message: "Check the highlighted fields.", errors, values };
  }

  try {
    await store({ ...values, submittedAt: new Date().toISOString() });
  } catch (err) {
    console.error("[interest] could not store lead", err);
    return {
      status: "error",
      message: "We couldn’t send your details just now. Try again in a minute.",
      values,
    };
  }

  return {
    status: "success",
    message: `Thanks, ${values.name.split(" ")[0]}. The PIEDS team will contact you at ${values.email} within a few days.`,
  };
}
