# ☁️ Cloud9 — Personalized Microclimate Weather App

## 🗒️ Overview
**Cloud9** is an inclusive weather app designed to deliver accurate, real-time weather updates for users living in **microclimates**.  
It integrates multiple weather APIs to refine local accuracy and provides **personalized alerts** that adapt to each user’s environment and preferences.

To promote **accessibility and inclusivity**, Cloud9 includes:
- 🎧 **Voice memos** for auditory users.
- 💬 **On-screen subtitles or text summaries** for those who prefer visual information.

The goal is to make weather updates **accurate, personal, and universally accessible** — ensuring everyone can plan their day with confidence, no matter where they are.

---

## 🌤️ Project Title
**Cloud9 — Personalized Microclimate Weather App**

---

## 📋 Overview
Cloud9 is a smart, inclusive weather application that provides **hyper-local weather forecasts** for users in **microclimates** — areas where conditions can vary drastically within short distances.  

The app uses data from trusted APIs like **OpenWeather** and **WeatherAPI** to combine multiple data sources for **higher accuracy**.

Beyond accurate forecasts, Cloud9 focuses on **accessibility and inclusion** by allowing users to receive updates through **voice memos** or **subtitles**, making the experience friendly to a wider range of users.

---

## 🎯 Key Features

- 🌦️ **Microclimate Accuracy** – Combines multiple APIs to improve forecast precision for small, localized areas.  
- 🔔 **Personalized Alerts** – Sends location-based notifications relevant to user preferences (e.g., rain warnings, temperature shifts).  
- 🗣️ **Voice Memos** – Optional audio weather summaries for users who prefer auditory updates or have visual impairments.  
- 💬 **Subtitles / Text Summaries** – Written translations of weather memos for inclusivity and clarity.  
- 📍 **Location Search & GPS** – Allows users to check weather for their area or other regions easily.  
- 🌈 **Accessible Design** – High-contrast colors, large readable fonts, and intuitive icons.  

---

## 🧩 Tech Stack

- **Frontend:** React.js (or HTML, CSS, JS if simpler)  
- **APIs:** OpenWeather API, WeatherAPI  
- **Styling:** Tailwind CSS or custom CSS3  
- **Accessibility:** Voice features, text subtitles, ARIA-friendly UI  
- **Hosting:** Vercel / Netlify / GitHub Pages  

---

## 🧠 Problem Statement
Most weather apps provide generalized forecasts that don’t accurately reflect **microclimates**, leading to unreliable information for users in cities with diverse weather zones.  

Additionally, **accessibility** is often overlooked — limiting access for those who depend on **audio or text-based updates**.

---

## 💡 Solution
Cloud9 solves these challenges by:

- Using multiple data sources to deliver **fine-tuned local forecasts**.  
- Offering **personalized alerts** based on weather relevance to each user.  
- Providing **inclusive weather delivery** through **voice memos** and **subtitles**, ensuring accessibility for all.

---


# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is enabled on this template. See [this documentation](https://react.dev/learn/react-compiler) for more information.

Note: This will impact Vite dev & build performances.

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
