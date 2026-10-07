import type { ReactNode } from "react";
import { phoneHref, phoneDisplay } from "@/lib/site-config";
import { trackConversion } from "@/lib/analytics";

/** Link `tel:` cu tracking; nu apare când numărul nu este configurat. */
export function PhoneLink({
  source,
  className,
  children,
}: {
  source: string;
  className?: string;
  children?: ReactNode;
}) {
  if (!phoneHref) return null;
  return (
    <a
      href={phoneHref}
      onClick={() => trackConversion("phone_click", { source })}
      {...(className ? { className } : {})}
    >
      {children ?? phoneDisplay}
    </a>
  );
}
