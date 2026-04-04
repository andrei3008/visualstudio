"use client";
import { type ContactForm, contactSchema } from "@/schemas/contact";
import { useForm as useHookForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AnimatedButton from "@/components/animation/AnimatedButton";
import { trackLead } from "@/lib/marketing";
import { useState, useEffect, useCallback, useRef } from "react";

// ── Rate-limiting helpers ──────────────────────────────────────────
const STORAGE_KEY = "contact_form_submissions";
const MAX_PER_15MIN = 3;
const MAX_PER_HOUR = 5;
const COOLDOWN_MS = 10_000;

interface SubmissionRecord {
  timestamp: number;
}

function getSubmissions(): SubmissionRecord[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed as SubmissionRecord[];
  } catch {
    return [];
  }
}

function saveSubmissions(records: SubmissionRecord[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
}

function pruneOlderThan(records: SubmissionRecord[], ms: number): SubmissionRecord[] {
  const cutoff = Date.now() - ms;
  return records.filter((r) => r.timestamp > cutoff);
}

function checkRateLimit(): { allowed: boolean; message?: string } {
  let records = getSubmissions();
  // Keep only last hour of data
  records = pruneOlderThan(records, 60 * 60 * 1000);

  const last15min = pruneOlderThan(records, 15 * 60 * 1000);

  if (last15min.length >= MAX_PER_15MIN) {
    const oldest = last15min[0].timestamp;
    const waitSec = Math.ceil((15 * 60 * 1000 - (Date.now() - oldest)) / 1000);
    return {
      allowed: false,
      message: `Ai trimis prea multe mesaje recent. Te rugăm să aștepți aproximativ ${waitSec} secunde înainte de a trimite din nou.`,
    };
  }

  if (records.length >= MAX_PER_HOUR) {
    const oldest = records[0].timestamp;
    const waitMin = Math.ceil((60 * 60 * 1000 - (Date.now() - oldest)) / 60_000);
    return {
      allowed: false,
      message: `Ai atins limita de trimitere pe oră. Te rugăm să încerci din nou peste aproximativ ${waitMin} minut${waitMin !== 1 ? "e" : ""}.`,
    };
  }

  return { allowed: true };
}

function recordSubmission(): void {
  let records = getSubmissions();
  records = pruneOlderThan(records, 60 * 60 * 1000);
  records.push({ timestamp: Date.now() });
  saveSubmissions(records);
}

// ── Component ──────────────────────────────────────────────────────
export default function ContactForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useHookForm<ContactForm>({
    resolver: zodResolver(contactSchema),
  });

  // Honeypot ref — if a bot fills this, we silently reject
  const honeypotRef = useRef<HTMLInputElement>(null);

  // Submit cooldown state
  const [cooldownActive, setCooldownActive] = useState(false);
  const cooldownTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Clean up timer on unmount
  useEffect(() => {
    return () => {
      if (cooldownTimerRef.current) {
        clearTimeout(cooldownTimerRef.current);
      }
    };
  }, []);

  const startCooldown = useCallback(() => {
    setCooldownActive(true);
    cooldownTimerRef.current = setTimeout(() => {
      setCooldownActive(false);
      cooldownTimerRef.current = null;
    }, COOLDOWN_MS);
  }, []);

  const onSubmit = async (data: ContactForm) => {
    // ── Honeypot check ──
    if (honeypotRef.current && honeypotRef.current.value) {
      // Bot detected — pretend success to fool them
      reset();
      toast.success("Mesaj trimis. Revenim cât mai curând.");
      startCooldown();
      return;
    }

    // ── Rate-limit check ──
    const rateCheck = checkRateLimit();
    if (!rateCheck.allowed) {
      toast.error(rateCheck.message);
      return;
    }

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.Name,
          email: data["E-mail"],
          phone: data.Phone,
          company: data.Company,
          projectType: data.ProjectType,
          budget: data.Budget,
          message: data.Message,
        }),
      });

      if (!res.ok) {
        throw new Error("Server error");
      }

      recordSubmission();
      trackLead({
        projectType: data.ProjectType,
        budget: data.Budget,
        source: "contact_form",
      });
      reset();
      toast.success("Mesaj trimis. Revenim cât mai curând.");
      startCooldown();
    } catch {
      toast.error("Trimiterea a eșuat. Încearcă din nou mai târziu.");
    }
  };

  const isDisabled = isSubmitting || cooldownActive;

  return (
    <>
      <div className="mxd-section mxd-section-inner-form padding-default">
        <div className="mxd-container grid-container">
          <div className="mxd-block">
            <div className="container-fluid px-0">
              <div className="row gx-0">
                <div className="col-12 col-xl-2 mxd-grid-item no-margin" />
                <div className="col-12 col-xl-8">
                  <div className="mxd-block__content contact">
                    {/* Section Title */}
                    <div className="contact-form__header">
                      <h2 className="inner-headline__title headline-img-before headline-img-02">
                        Hai să discutăm despre proiectul tău
                      </h2>
                      <p className="contact-form__subtitle">
                        Completează formularul și revenim cu un răspuns clar în maxim 48 de ore.
                      </p>
                    </div>
                    <div className="mxd-block__inner-form loading__fade">
                      <div className="form-container">
                        {/* Reply Messages */}
                        <div className="form__reply centered text-center">
                          <i className="ph-fill ph-smiley-wink reply__icon" />
                          <p className="reply__title">Mesaj trimis</p>
                          <span className="reply__text">
                            Mulțumim pentru mesaj. Revenim cât mai curând cu un
                            răspuns.
                          </span>
                        </div>
                        {/* Contact Form */}
                        <form
                          className="form contact-form"
                          id="contact-form"
                          onSubmit={handleSubmit(onSubmit)}
                        >
                          {/* Hidden Required Fields */}
                          <input
                            type="hidden"
                            name="project_name"
                            defaultValue="Visual Studio Concept"
                          />
                          <input
                            type="hidden"
                            name="admin_email"
                            defaultValue="salut@visualstudio.ro"
                          />
                          <input
                            type="hidden"
                            name="form_subject"
                            defaultValue="Lead nou din formularul de contact"
                          />
                          {/* Honeypot — invisible to humans, bots auto-fill it */}
                          <div aria-hidden="true" style={{ position: "absolute", left: "-9999px", top: "-9999px", opacity: 0, height: 0, width: 0, overflow: "hidden" }}>
                            <label htmlFor="contact-website">Website</label>
                            <input
                              ref={honeypotRef}
                              id="contact-website"
                              type="text"
                              name="website"
                              tabIndex={-1}
                              autoComplete="off"
                            />
                          </div>
                          {/* Visible Fields */}
                          <div className="container-fluid p-0">
                            <div className="row gx-0">
                              <div className="col-12 col-md-6 mxd-grid-item anim-uni-in-up">
                                <label htmlFor="contact-name" className="sr-only">Numele tău</label>
                                <input
                                  id="contact-name"
                                  type="text"
                                  placeholder="Numele tău*"
                                  {...register("Name")}
                                />
                                {errors.Name && (
                                  <p className="error-message">
                                    {errors.Name.message}
                                  </p>
                                )}
                              </div>
                              <div className="col-12 col-md-6 mxd-grid-item anim-uni-in-up">
                                <label htmlFor="contact-company" className="sr-only">Companie / brand</label>
                                <input
                                  id="contact-company"
                                  type="text"
                                  placeholder="Companie / brand"
                                  {...register("Company")}
                                />
                              </div>
                              <div className="col-12 col-md-6 mxd-grid-item anim-uni-in-up">
                                <label htmlFor="contact-email" className="sr-only">E-mail</label>
                                <input
                                  id="contact-email"
                                  type="email"
                                  placeholder="E-mail*"
                                  {...register("E-mail")}
                                />
                                {errors["E-mail"] && (
                                  <p className="error-message">
                                    {errors["E-mail"].message}
                                  </p>
                                )}
                              </div>
                              <div className="col-12 col-md-6 mxd-grid-item anim-uni-in-up">
                                <label htmlFor="contact-phone" className="sr-only">Telefon</label>
                                <input
                                  id="contact-phone"
                                  type="tel"
                                  placeholder="Telefon*"
                                  {...register("Phone")}
                                />
                                {errors.Phone && (
                                  <p className="error-message">
                                    {errors.Phone.message}
                                  </p>
                                )}
                              </div>
                              <div className="col-12 col-md-6 mxd-grid-item anim-uni-in-up">
                                <label htmlFor="contact-project-type" className="sr-only">Tip proiect</label>
                                <select
                                  id="contact-project-type"
                                  defaultValue=""
                                  {...register("ProjectType")}
                                >
                                  <option value="" disabled>
                                    Tip proiect*
                                  </option>
                                  <option value="site-prezentare">
                                    Site de prezentare
                                  </option>
                                  <option value="magazin-online">
                                    Magazin online
                                  </option>
                                  <option value="automatizare">
                                    Automatizare
                                  </option>
                                  <option value="software-custom">
                                    Software custom
                                  </option>
                                  <option value="altceva">
                                    Alt tip de proiect
                                  </option>
                                </select>
                                {errors.ProjectType && (
                                  <p className="error-message">
                                    {errors.ProjectType.message}
                                  </p>
                                )}
                              </div>
                              <div className="col-12 col-md-6 mxd-grid-item anim-uni-in-up">
                                <label htmlFor="contact-budget" className="sr-only">Buget orientativ</label>
                                <select id="contact-budget" defaultValue="" {...register("Budget")}>
                                  <option value="" disabled>
                                    Buget orientativ
                                  </option>
                                  <option value="sub-1000">
                                    Sub 1.000 EUR
                                  </option>
                                  <option value="1000-3000">
                                    1.000 - 3.000 EUR
                                  </option>
                                  <option value="3000-7000">
                                    3.000 - 7.000 EUR
                                  </option>
                                  <option value="7000-15000">
                                    7.000 - 15.000 EUR
                                  </option>
                                  <option value="peste-15000">
                                    Peste 15.000 EUR
                                  </option>
                                  <option value="neclar">
                                    Nu știu încă
                                  </option>
                                </select>
                              </div>
                              <div className="col-12 mxd-grid-item anim-uni-in-up">
                                <label htmlFor="contact-message" className="sr-only">Mesaj</label>
                                <textarea
                                  id="contact-message"
                                  placeholder="Spune-ne pe scurt ce vrei să construim, ce obiectiv ai și în cât timp ai vrea să pornim*"
                                  {...register("Message")}
                                />
                                {errors.Message && (
                                  <p className="error-message">
                                    {errors.Message.message}
                                  </p>
                                )}
                              </div>
                              <div className="col-12 mxd-grid-item anim-uni-in-up">
                                <p className="contact-form__hint t-small">
                                  Cu cât ne dai mai mult context, cu atât îți
                                  putem răspunde mai clar și mai rapid.
                                </p>
                                <AnimatedButton
                                  text="Trimite cererea"
                                  position={"next"}
                                  as={"button"}
                                  className="btn btn-anim btn-default btn-large btn-opposite slide-right-up"
                                  type="submit"
                                  disabled={isDisabled}
                                >
                                  <i className="ph-bold ph-arrow-up-right" />
                                </AnimatedButton>
                              </div>
                            </div>
                          </div>
                        </form>
                        {/* End Contact Form */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer position="bottom-right" />
    </>
  );
}
