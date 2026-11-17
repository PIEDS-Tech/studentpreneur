"use client";

import { useActionState, useEffect, useRef } from "react";
import { submitInterest, type InterestState } from "@/app/actions";
import { getGsap, prefersReducedMotion } from "@/lib/motion";

const initial: InterestState = { status: "idle" };

const roles = ["Principal", "Teacher", "Coordinator / HOD", "Other"];
const sizes = ["60–100 students", "100–200 students", "200+ students", "Not sure yet"];
const timings = ["This term", "Next term", "Next academic year", "Just exploring"];

/** "Register interest" lead form, submitted with a Server Action. */
export default function InterestForm() {
  const [state, action, pending] = useActionState(submitInterest, initial);
  const successRef = useRef<HTMLDivElement>(null);
  const v = state.values ?? {};
  const err = state.errors ?? {};

  useEffect(() => {
    if (state.status === "success" && successRef.current) {
      successRef.current.focus();
      if (!prefersReducedMotion()) {
        const { gsap } = getGsap();
        gsap.from(successRef.current, { scale: 0.6, rotate: -8, opacity: 0, duration: 0.8, ease: "back.out(2)" });
      }
    }
  }, [state.status]);

  if (state.status === "success") {
    return (
      <div className="form-success" ref={successRef} tabIndex={-1} role="status">
        <span className="form-success__stamp">Interest registered</span>
        <p>{state.message}</p>
      </div>
    );
  }

  const field = (name: keyof typeof err) => ({
    name,
    id: `f-${name}`,
    defaultValue: v[name] ?? "",
    "aria-invalid": err[name] ? true : undefined,
    "aria-describedby": err[name] ? `f-${name}-err` : undefined,
  });
  const error = (name: keyof typeof err) =>
    err[name] ? <span className="field__error" id={`f-${name}-err`}>{err[name]}</span> : null;

  return (
    <form className="interest-form" action={action} noValidate>
      <div className="field">
        <label htmlFor="f-name">Your name</label>
        <input {...field("name")} autoComplete="name" required />
        {error("name")}
      </div>
      <div className="field">
        <label htmlFor="f-role">Your role</label>
        <select {...field("role")} required>
          <option value="" disabled>Choose one</option>
          {roles.map((r) => <option key={r}>{r}</option>)}
        </select>
        {error("role")}
      </div>
      <div className="field field--wide">
        <label htmlFor="f-school">School name</label>
        <input {...field("school")} autoComplete="organization" required />
        {error("school")}
      </div>
      <div className="field">
        <label htmlFor="f-city">City</label>
        <input {...field("city")} autoComplete="address-level2" required />
        {error("city")}
      </div>
      <div className="field">
        <label htmlFor="f-email">Email</label>
        <input {...field("email")} type="email" autoComplete="email" inputMode="email" required />
        {error("email")}
      </div>
      <div className="field">
        <label htmlFor="f-phone">Phone <span className="field__optional">(optional)</span></label>
        <input {...field("phone")} type="tel" autoComplete="tel" inputMode="tel" />
        {error("phone")}
      </div>
      <div className="field">
        <label htmlFor="f-students">Students likely to join</label>
        <select {...field("students")} required>
          <option value="" disabled>Choose one</option>
          {sizes.map((s) => <option key={s}>{s}</option>)}
        </select>
        {error("students")}
      </div>
      <fieldset className="field field--wide chips">
        <legend>When would you like to run it?</legend>
        {timings.map((t) => (
          <label key={t} className="chip">
            <input type="radio" name="timing" value={t} defaultChecked={v.timing === t} />
            <span>{t}</span>
          </label>
        ))}
      </fieldset>
      <div className="field field--wide">
        <label htmlFor="f-message">Anything we should know? <span className="field__optional">(optional)</span></label>
        <textarea {...field("message")} rows={3} maxLength={1000} />
        {error("message")}
      </div>

      {/* honeypot */}
      <div className="hp" aria-hidden="true">
        <label htmlFor="f-website">Website</label>
        <input id="f-website" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="interest-form__footer field--wide">
        {state.status === "error" && <p className="form-error" role="alert">{state.message}</p>}
        <button className="btn btn--ink btn--big" type="submit" disabled={pending}>
          {pending ? "Sending…" : "Register interest"}
        </button>
        <p className="interest-form__fine">We’ll only use these details to contact you about Studentpreneur.</p>
      </div>
    </form>
  );
}
