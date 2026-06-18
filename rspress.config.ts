import * as path from "node:path";
import { defineConfig } from "@rspress/core";

export default defineConfig({
  root: path.join(__dirname, "docs"),
  lang: "en",
  title: "My Site",
  icon: "/rspress-icon.png",
  logo: {
    light: "/rspress-light-logo.png",
    dark: "/rspress-dark-logo.png",
  },
  themeConfig: {
    socialLinks: [
      {
        icon: "github",
        mode: "link",
        content: "https://github.com/web-infra-dev/rspress",
      },
    ],
  },
  // Added, from docs https://rspress.rs/api/config/config-theme#darkmode
  builderConfig: {
    html: {
      tags: [
        {
          tag: "script",
          // Specify the default theme mode, which can be `dark` or `light`
          children: "window.RSPRESS_THEME = 'dark';",
        },
      ],
    },
  },
});
