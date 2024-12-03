import {
  dark,
  darksBlue,
  light,
  lightsBlue,
  system,
  systemsBlue,
} from "../utils";

export const themeOptions = [
  { img: light, text: "Light", imgBlue: lightsBlue },
  { img: dark, text: "Dark", imgBlue: darksBlue },
  { img: system, text: "System", imgBlue: systemsBlue },
];

export const menuComponents = [
  {
    title: "Get Started",
    content: [
      { text: "What is this?", link: "/" },
      { text: "Installation", link: "/installation" },
    ],
  },
  {
    title: "Navbar",
    content: [
      { text: "Navbar Float", link: "/navbar-float" },
    ],
  },
];

export const installation = [
  {title : "Install Node.js", url: "https://nodejs.org/en/download/package-manager", text: "nodejs.org"},
  {title : "Install Vite and Tailwindcss", url: "https://tailwindcss.com/docs/guides/vite", text: "tailwindcss.com"},
]
