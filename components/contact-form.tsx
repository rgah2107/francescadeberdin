"use client";

import type { Dictionary } from "@/content/types";
import { useState } from "react";

export function ContactForm({ copy }: { copy: Dictionary["contact"] }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [fieldError, setFieldError] = useState<"name" | "email" | "message" | null>(null);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const company = String(new FormData(form).get("company") ?? "");
    setFieldError(null);
    setStatus("sending");

    const response = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, message, company }),
    });
    const result = (await response.json().catch(() => null)) as { ok?: boolean; error?: string } | null;

    if (result?.ok) {
      setStatus("sent");
      setName("");
      setEmail("");
      setMessage("");
      return;
    }

    if (result?.error === "name" || result?.error === "email" || result?.error === "message") {
      setFieldError(result.error);
      setStatus("idle");
      return;
    }

    setStatus("error");
  }

  if (status === "sent") {
    return (
      <p className="border border-line bg-paper-raised px-6 py-7 text-xl" role="status">
        {copy.success}
      </p>
    );
  }

  return (
    <form className="space-y-6" onSubmit={onSubmit} noValidate>
      <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden="true">
        <label>
          Company
          <input name="company" type="text" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      <div>
        <label className="font-interface text-lg font-semibold" htmlFor="contact-name">
          {copy.nameLabel}
        </label>
        <input
          id="contact-name"
          name="name"
          type="text"
          autoComplete="name"
          required
          value={name}
          onChange={(event) => setName(event.target.value)}
          aria-invalid={fieldError === "name"}
          aria-describedby={fieldError === "name" ? "contact-name-error" : undefined}
          className="mt-2 w-full border border-line bg-paper-raised px-4 py-3 text-xl text-ink"
        />
        {fieldError === "name" ? (
          <p id="contact-name-error" className="mt-2 text-ink-soft">
            {copy.nameInvalid}
          </p>
        ) : null}
      </div>
      <div>
        <label className="font-interface text-lg font-semibold" htmlFor="contact-email">
          {copy.emailLabel}
        </label>
        <input
          id="contact-email"
          name="email"
          type="email"
          autoComplete="email"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          aria-invalid={fieldError === "email"}
          aria-describedby={fieldError === "email" ? "contact-email-error" : undefined}
          className="mt-2 w-full border border-line bg-paper-raised px-4 py-3 text-xl text-ink"
        />
        {fieldError === "email" ? (
          <p id="contact-email-error" className="mt-2 text-ink-soft">
            {copy.emailInvalid}
          </p>
        ) : null}
      </div>
      <div>
        <label className="font-interface text-lg font-semibold" htmlFor="contact-message">
          {copy.messageLabel}
        </label>
        <textarea
          id="contact-message"
          name="message"
          required
          rows={8}
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          aria-invalid={fieldError === "message"}
          aria-describedby={fieldError === "message" ? "contact-message-error" : undefined}
          className="mt-2 w-full border border-line bg-paper-raised px-4 py-3 text-xl text-ink"
        />
        {fieldError === "message" ? (
          <p id="contact-message-error" className="mt-2 text-ink-soft">
            {copy.messageInvalid}
          </p>
        ) : null}
      </div>
      {status === "error" ? (
        <p className="text-ink-soft" role="alert">
          {copy.error}
        </p>
      ) : null}
      <button className="btn btn-primary" type="submit" disabled={status === "sending"}>
        {status === "sending" ? copy.sending : copy.submit}
      </button>
    </form>
  );
}
