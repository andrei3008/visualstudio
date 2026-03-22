"use client";

import MobileMenu from "@/components/headers/MobileMenu";
import Header1 from "@/components/headers/Header1";
import RouteScrollManager from "@/components/navigation/RouteScrollManager";
import InitScroll from "@/components/scroll/InitScroll";
import LenisSmoothScroll from "@/components/scroll/LenisSmoothScroll";
import ScrollTop from "@/components/scroll/ScrollTop";

interface ClientLayoutProps {
  children: React.ReactNode;
}

export default function ClientLayout({ children }: ClientLayoutProps) {
  return (
    <>
      <MobileMenu />
      <Header1 />
      <RouteScrollManager />
      {children}
      <InitScroll />
      <ScrollTop />
      <LenisSmoothScroll />
    </>
  );
}
