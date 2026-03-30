"use client";

export default function SubscribeForm() {
  return (
    <form
      className="form notify-form form-light"
      onSubmit={(e) => e.preventDefault()}
    >
      <label htmlFor="subscribe-email" className="sr-only">
        Adresa ta de e-mail
      </label>
      <input
        id="subscribe-email"
        type="email"
        placeholder="Adresa ta de e-mail"
        required
      />
      <button
        className="btn btn-form btn-absolute-right btn-muted slide-right-up anim-no-delay"
        type="submit"
        aria-label="Abonează-te"
      >
        <i className="ph ph-arrow-up-right" />
      </button>
    </form>
  );
}
