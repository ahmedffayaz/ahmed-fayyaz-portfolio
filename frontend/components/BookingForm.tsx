"use client";

import { FormEvent, useEffect, useState } from "react";
import { ArrowUpRight, CheckCircle2, LoaderCircle } from "lucide-react";
import { API_URL } from "@/lib/api";

type FormStatus =
  | { type: "idle" }
  | { type: "loading" }
  | { type: "success"; message: string }
  | { type: "error"; message: string };

const initialForm = {
  name: "",
  email: "",
  company: "",
  meetingType: "Project discussion",
  budget: "",
  preferredDate: "",
  timezone: "",
  message: "",
};

export function BookingForm() {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState<FormStatus>({ type: "idle" });
  const [minimumDate, setMinimumDate] = useState("");

  useEffect(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    setMinimumDate(tomorrow.toISOString().split("T")[0]);
    setForm((current) => ({
      ...current,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC",
    }));
  }, []);

  function updateField(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
  }

  async function submitBooking(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus({ type: "loading" });

    try {
      const response = await fetch(`${API_URL}/bookings`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          preferredDate: new Date(`${form.preferredDate}T12:00:00`).toISOString(),
        }),
      });
      const payload = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(payload?.message || "Unable to send your request.");
      }

      setStatus({ type: "success", message: payload.message });
      setForm((current) => ({ ...initialForm, timezone: current.timezone }));
    } catch (error) {
      setStatus({
        type: "error",
        message: error instanceof Error ? error.message : "Unable to send your request.",
      });
    }
  }

  return (
    <form className="grid gap-5" onSubmit={submitBooking}>
      <div className="grid gap-5 md:grid-cols-2">
        <Field label="Your name" required>
          <input
            className="field"
            name="name"
            onChange={updateField}
            placeholder="Jane Smith"
            required
            value={form.name}
          />
        </Field>
        <Field label="Work email" required>
          <input
            className="field"
            name="email"
            onChange={updateField}
            placeholder="jane@company.com"
            required
            type="email"
            value={form.email}
          />
        </Field>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <Field label="Company">
          <input
            className="field"
            name="company"
            onChange={updateField}
            placeholder="Your company"
            value={form.company}
          />
        </Field>
        <Field label="Conversation" required>
          <select
            className="field"
            name="meetingType"
            onChange={updateField}
            required
            value={form.meetingType}
          >
            <option>Project discussion</option>
            <option>Technical consultation</option>
            <option>Career conversation</option>
          </select>
        </Field>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <Field label="Preferred date" required>
          <input
            className="field"
            min={minimumDate}
            name="preferredDate"
            onChange={updateField}
            required
            type="date"
            value={form.preferredDate}
          />
        </Field>
        <Field label="Project budget">
          <input
            className="field"
            name="budget"
            onChange={updateField}
            placeholder="Optional"
            value={form.budget}
          />
        </Field>
      </div>

      <Field label="Your timezone" required>
        <input
          className="field"
          name="timezone"
          onChange={updateField}
          placeholder="Asia/Karachi"
          required
          value={form.timezone}
        />
      </Field>

      <Field label="What would you like to build?" required>
        <textarea
          className="field min-h-36 resize-y"
          minLength={20}
          name="message"
          onChange={updateField}
          placeholder="Tell me about the product, current challenge, and what a successful outcome looks like."
          required
          value={form.message}
        />
      </Field>

      {status.type === "error" && (
        <p className="rounded-xl border border-red-300/20 bg-red-400/10 px-4 py-3 text-sm text-red-100">
          {status.message}
        </p>
      )}

      {status.type === "success" ? (
        <div className="flex items-center gap-3 rounded-2xl bg-[#8cc8ff] px-5 py-4 text-sm font-bold text-[#0b1e33]">
          <CheckCircle2 className="size-5" />
          {status.message} I’ll get back to you shortly.
        </div>
      ) : (
        <button
          className="group flex min-h-14 items-center justify-between rounded-full bg-[#8cc8ff] px-6 font-bold text-[#0b1e33] transition hover:bg-white disabled:cursor-wait disabled:opacity-70"
          disabled={status.type === "loading"}
          type="submit"
        >
          <span>{status.type === "loading" ? "Sending request" : "Request a conversation"}</span>
          {status.type === "loading" ? (
            <LoaderCircle className="size-5 animate-spin" />
          ) : (
            <ArrowUpRight className="size-5 transition group-hover:rotate-45" />
          )}
        </button>
      )}
    </form>
  );
}

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="grid gap-2 text-sm font-semibold text-white/80">
      <span>
        {label} {required && <span className="text-[#8cc8ff]">*</span>}
      </span>
      {children}
    </label>
  );
}
