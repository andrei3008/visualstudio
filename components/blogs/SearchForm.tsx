"use client";
export default function SearchForm() {
  return (
    <div className="widget-search__form">
      <form className="form search-form" onSubmit={(e) => e.preventDefault()}>
        <label htmlFor="blog-search" className="sr-only">
          Caută articole
        </label>
        <input id="blog-search" type="search" name="search" placeholder="Caută" />
        <button
          className="btn btn-form no-scale btn-absolute-right btn-muted"
          type="submit"
          aria-label="Caută"
        >
          <i className="ph ph-magnifying-glass" />
        </button>
      </form>
    </div>
  );
}
