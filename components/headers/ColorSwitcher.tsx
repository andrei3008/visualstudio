"use client";
import React, { useEffect, useState } from "react";

export default function ThemeSwitcherButton({}) {
  const [colorScheme, setColorScheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const frameId = window.requestAnimationFrame(() => {
      const storedScheme = localStorage.getItem("color-scheme");
      const documentScheme =
        document.documentElement.getAttribute("color-scheme");
      const nextScheme =
        storedScheme === "dark" || documentScheme === "dark"
          ? "dark"
          : "light";

      setColorScheme(nextScheme);
    });

    return () => window.cancelAnimationFrame(frameId);
  }, []);

  useEffect(() => {
    const currentScheme = document.documentElement.getAttribute("color-scheme");
    if (currentScheme !== colorScheme) {
      document.documentElement.setAttribute("color-scheme", colorScheme);
    }
    if (localStorage.getItem("color-scheme") !== colorScheme) {
      localStorage.setItem("color-scheme", colorScheme);
    }
  }, [colorScheme]);

  const handleColorSwitch = () => {
    setColorScheme((prev) => (prev === "light" ? "dark" : "light"));
  };
  return (
    <>
      <button
        id="color-switcher"
        className="mxd-color-switcher"
        type="button"
        role="switch"
        aria-label="light/dark mode"
        aria-checked={colorScheme === "dark"}
        onClick={handleColorSwitch}
      >
        <i
          className={
            colorScheme === "dark"
              ? "ph-bold ph-sun-horizon"
              : "ph-bold ph-moon-stars "
          }
        />
      </button>{" "}
    </>
  );
}
