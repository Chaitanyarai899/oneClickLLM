import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import tailwind from "@astrojs/tailwind";

import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  integrations: [
    starlight({
      title: "LLM deployment",
      social: {
        github: "https://github.com/HoomanHQ/akash-hack2.0",
      },
      customCss: ["./src/tailwind.css"],
      sidebar: [
        {
          label: "Free Api",
          autogenerate: {
            directory: "Free demo API",
          },
        },
        {
          label: "User Docs",
          autogenerate: {
            directory: "guides",
          },
        },
      ],
    }),
    tailwind({
      applyBaseStyles: false,
    }),
    react(),
  ],
});
