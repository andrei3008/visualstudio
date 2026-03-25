"use client";

import AnimatedButton from "../animation/AnimatedButton";

export default function CommentForm() {
  return (
    <form className="form" onSubmit={(e) => e.preventDefault()}>
      <div className="container-fluid p-0">
        <div className="row gx-5">
          <div className="col-12 col-md-6 mxd-grid-item no-margin">
            <input type="text" name="Name" placeholder="Numele tău*" required />
          </div>
          <div className="col-12 col-md-6 mxd-grid-item no-margin">
            <input type="text" name="Company" placeholder="E-mailul tău*" />
          </div>
          <div className="col-12 mxd-grid-item">
            <textarea
              name="Message"
              placeholder="Mesaj*"
              required
              defaultValue={""}
            />
          </div>
          <div className="col-12 mxd-grid-item">
            <AnimatedButton
              className="btn btn-anim btn-default btn-accent slide-right-up"
              type="submit"
              text="Trimite comentariul"
              position={"next"}
              as={"button"}
            >
              <i className="ph-bold ph-arrow-up-right" />
            </AnimatedButton>
          </div>
        </div>
      </div>
    </form>
  );
}
