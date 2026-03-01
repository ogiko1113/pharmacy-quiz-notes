import { QuartzConfig } from "./quartz/cfg"
import * as Plugin from "./quartz/plugins"

/**
 * Quartz 4 Configuration
 *
 * See https://quartz.jzhao.xyz/configuration for more information.
 */
const config: QuartzConfig = {
  configuration: {
    pageTitle: "💊 Pharmacy Quiz Notes",
    pageTitleSuffix: "",
    enableSPA: true,
    enablePopovers: true,
    analytics: null,
    locale: "ja-JP",
    baseUrl: "ogiko1113.github.io/pharmacy-quiz-notes",
    ignorePatterns: ["private", "templates", ".obsidian"],
    defaultDateType: "modified",
    theme: {
      fontOrigin: "googleFonts",
      cdnCaching: true,
      typography: {
        header: "Noto Sans JP",
        body: "Noto Sans JP",
        code: "IBM Plex Mono",
      },
      colors: {
        lightMode: {
          light: "#FDF6E3",
          lightgray: "#EEE4D1",
          gray: "#C4A882",
          darkgray: "#5C4A32",
          dark: "#3D2B1F",
          secondary: "#B8860B",
          tertiary: "#DAA520",
          highlight: "rgba(218, 165, 32, 0.12)",
          textHighlight: "#FFD70066",
        },
        darkMode: {
          light: "#1A1410",
          lightgray: "#2D2419",
          gray: "#7A6548",
          darkgray: "#D4C4A8",
          dark: "#F0E6D2",
          secondary: "#DAA520",
          tertiary: "#F0C040",
          highlight: "rgba(218, 165, 32, 0.12)",
          textHighlight: "#FFD70066",
        },
      },
    },
  },
  plugins: {
    transformers: [
      Plugin.FrontMatter(),
      Plugin.CreatedModifiedDate({
        priority: ["frontmatter", "git", "filesystem"],
      }),
      Plugin.SyntaxHighlighting({
        theme: {
          light: "github-light",
          dark: "github-dark",
        },
        keepBackground: false,
      }),
      Plugin.ObsidianFlavoredMarkdown({ enableInHtmlEmbed: false }),
      Plugin.GitHubFlavoredMarkdown(),
      Plugin.TableOfContents(),
      Plugin.CrawlLinks({ markdownLinkResolution: "shortest" }),
      Plugin.Description(),
      Plugin.Latex({ renderEngine: "katex" }),
    ],
    filters: [Plugin.RemoveDrafts()],
    emitters: [
      Plugin.AliasRedirects(),
      Plugin.ComponentResources(),
      Plugin.ContentPage(),
      Plugin.FolderPage(),
      Plugin.TagPage(),
      Plugin.ContentIndex({
        enableSiteMap: true,
        enableRSS: true,
      }),
      Plugin.Assets(),
      Plugin.Static(),
      Plugin.Favicon(),
      Plugin.NotFoundPage(),
      // Comment out CustomOgImages to speed up build time
      Plugin.CustomOgImages(),
    ],
  },
}

export default config
