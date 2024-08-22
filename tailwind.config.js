/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      // colors: {
      //   border: "hsl(var(--border))",
      //   input: "hsl(var(--input))",
      //   ring: "hsl(var(--ring))",
      //   background: "hsl(var(--background))",
      //   foreground: "hsl(var(--foreground))",
      //   primary: {
      //     DEFAULT: "hsl(var(--primary))",
      //     foreground: "hsl(var(--primary-foreground))",
      //   },
      //   secondary: {
      //     DEFAULT: "hsl(var(--secondary))",
      //     foreground: "hsl(var(--secondary-foreground))",
      //   },
      //   destructive: {
      //     DEFAULT: "hsl(var(--destructive))",
      //     foreground: "hsl(var(--destructive-foreground))",
      //   },
      //   muted: {
      //     DEFAULT: "hsl(var(--muted))",
      //     foreground: "hsl(var(--muted-foreground))",
      //   },
      //   accent: {
      //     DEFAULT: "hsl(var(--accent))",
      //     foreground: "hsl(var(--accent-foreground))",
      //   },
      //   popover: {
      //     DEFAULT: "hsl(var(--popover))",
      //     foreground: "hsl(var(--popover-foreground))",
      //   },
      //   card: {
      //     DEFAULT: "hsl(var(--card))",
      //     foreground: "hsl(var(--card-foreground))",
      //   },
      // },
      colors: {
        border: {
          gray: {
            100: "hsl(var(--border-1))",
            200: "hsl(var(--border-2))",
          },
        },
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          blue: "hsl(var(--primary-1))",
          gray: {
            100: "hsl(var(--primary-4))",
            200: "hsl(var(--primary-3))",
            300: "hsl(var(--primary-2))",
          },
        },
        indicator: {
          orange: "hsl(var(--indicator-1))",
          purple: "hsl(var(--indicator-2))",
          red: "hsl(var(--indicator-3))",
          yellow: "hsl(var(--indicator-4))",
        },
        chats: {
          peach: {
            100: "hsl(var(--chat-1))",
            200: "hsl(var(--chat-2))",
          },
          lavender: {
            100: "hsl(var(--chat-3))",
            200: "hsl(var(--chat-4))",
          },
          mint: {
            100: "hsl(var(--chat-5))",
            200: "hsl(var(--chat-6))",
          },
        },
        sticker: {
          blue: {
            100: "hsl(var(--sticker-1))",
          },
          peach: {
            100: "hsl(var(--sticker-3))",
            200: "hsl(var(--sticker-2))",
          },
          green: {
            100: "hsl(var(--sticker-5))",
            200: "hsl(var(--sticker-4))",
          },
          lavender: "hsl(var(--sticker-6))",
          pink: "hsl(var(--sticker-7))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        appear: {
          to: {
            scale: 1.5,
          },
        },
        disappear: {
          to: {
            scale: 0,
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        appear: "appear 0.2s ease-in-out forwards",
        disappear: "disappear 0.2s ease-in-out forwards",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
