"use client";
import { type ContactForm, contactSchema } from "@/schemas/contact";
import { useForm as useHookForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "@formspree/react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AnimatedButton from "@/components/animation/AnimatedButton";
import { trackLead } from "@/lib/marketing";

export default function ContactForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useHookForm<ContactForm>({
    resolver: zodResolver(contactSchema),
  });

  // Formspree submit hook
  const [fsState, fsSubmit] = useForm<ContactForm>("meoljlry");

  const onSubmit = async (data: ContactForm) => {
    try {
      await fsSubmit(data); // submit to Formspree
      trackLead({
        projectType: data.ProjectType,
        budget: data.Budget,
        source: "contact_form",
      });
      reset(); // reset form fields
      toast.success("Mesaj trimis. Revenim cât mai curând.");
    } catch {
      toast.error("Trimiterea a eșuat. Încearcă din nou mai târziu.");
    }
  };

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
                          {/* Visible Fields */}
                          <div className="container-fluid p-0">
                            <div className="row gx-0">
                              <div className="col-12 col-md-6 mxd-grid-item anim-uni-in-up">
                                <input
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
                                <input
                                  type="text"
                                  placeholder="Companie / brand"
                                  {...register("Company")}
                                />
                              </div>
                              <div className="col-12 col-md-6 mxd-grid-item anim-uni-in-up">
                                <input
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
                                <input
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
                                <select
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
                                <select defaultValue="" {...register("Budget")}>
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
                                <textarea
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
                                  disabled={isSubmitting || fsState.submitting}
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
