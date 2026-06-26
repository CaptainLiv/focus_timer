# Focus Timer

> A modular, browser-based productivity tool combining a Pomodoro timer, layerable ambient sounds, and a session-aware todo list. All in one distraction-free interface.
***

## Features

### 🍅 Pomodoro Timer
- Three time intervals: **5**, **15**, and **25** minutes
- Start, pause, and switch between Focus / Short Break / Long Break modes
- Audio alert when the timer expires

### 🎵 Ambient Sound Mixer
- Layer multiple ambient sounds simultaneously (rain, café, forest, etc.)
- Independently toggle and adjust the volume of each track
- Real-time audio visualizer
- Easily extensible (drop any `.mp3` or `.wav` into `./public/sounds/` to add it)

### ✅ Todo List
- Add, complete, and remove tasks
- Session-aware: todos are tied to the device and session, and automatically cleared after **24 hours of inactivity**

***

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | [Next.js](https://nextjs.org/) + [React](https://react.dev/) |
| Styling | [Tailwind CSS](https://tailwindcss.com/) |
| UI Components | [Material UI (MUI)](https://mui.com/) |

***

## Getting Started

### Prerequisites
- Node.js >= 18
- npm / yarn / pnpm / bun

### Installation

```bash
git clone https://github.com/CaptainLiv/focus_timer.git
cd focus-timer
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
npm run prebuild
npm run build
npm start
```

***

## Adding Ambient Sounds

Place any `.mp3` or `.wav` file into the `./public/sounds/` directory. The app will automatically detect and list it in the sound mixer on the next reload — no code changes needed.

***

## Roadmap

- [ ] Custom timer intervals
- [ ] Dark / light mode toggle
- [ ] Import/Export todo list as Markdown

