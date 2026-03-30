"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        fontFamily: "system-ui, sans-serif",
        padding: "2rem",
        textAlign: "center",
      }}
    >
      <h1
        style={{
          fontSize: "3rem",
          fontWeight: 700,
          margin: "0 0 1rem",
          color: "#161616",
        }}
      >
        Ceva nu a funcționat
      </h1>
      <p
        style={{
          fontSize: "1.125rem",
          color: "rgba(22,22,22,0.6)",
          maxWidth: "28rem",
          lineHeight: 1.6,
        }}
      >
        A apărut o eroare neașteptată. Încearcă din nou sau contactează-ne dacă
        problema persistă.
      </p>
      <button
        onClick={reset}
        style={{
          marginTop: "2rem",
          padding: "0.75rem 2rem",
          fontSize: "1rem",
          fontWeight: 600,
          background: "#161616",
          color: "#fff",
          border: "none",
          borderRadius: "0.5rem",
          cursor: "pointer",
        }}
      >
        Încearcă din nou
      </button>
    </main>
  );
}
