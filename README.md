# rspress-issue-repro-default-theme

This is to demonstrate that the default theme does not respect the `RSPRESS_THEME` variable
as defined in the docs at https://rspress.rs/api/config/config-theme#darkmode, which
worked on Rspress version 1. Rspress 2's source code does not seem to have any
references to the `RSPRESS_THEME` variable outside these docs.

This repo was created via `bun create rspress@latest` with minimum defaults,
with the `builderConfig` from the above docs simply pasted into `rspress.config.ts`:

```typescript
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
```

## Steps To Reproduce

1. Run `bun dev`
2. Open browser to new private/incognito window (so no `localStorage` present for localhost)
3. Force prefer light theme in new tab (Chromium DevTools: Rendering > Emulate CSS media feature prefers-color-scheme > light)
4. Load http://localhost:3000 in this tab
5. See that the dark theme was not applied as the default by config
