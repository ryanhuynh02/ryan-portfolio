import type { ReactNode } from "react";
import SiteHeader from "@/components/SiteHeader";

export default function BlogLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main>{children}</main>
    </div>
  );
}
