// src/components/MDXComponents.tsx
import type { ComponentProps } from "react";

export const MDXComponents = {
  h3: (props: ComponentProps<"h3">) => (
    <h3
      className="text-[#4f81bd] mt-6 mb-4 font-semibold"
      {...props}
    />
  ),
};
