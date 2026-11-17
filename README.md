
# 🎵 Moodzik

### Your Music. Your Mood. Your Space.

Moodzik is a modern, Spotify-inspired music streaming Progressive Web App (PWA) built with **Next.js, React, TypeScript, and Tailwind CSS**.

Designed with a sleek dark interface and a vibrant green accent, Moodzik provides an enjoyable music listening experience with an interactive music player, music discovery, playlists, favorites, and local MP3 importing.

The project aims to bring together music exploration and personal music management in a clean, responsive, and intuitive interface.

---

## ✨ Features

### 🎧 Music Player
- Interactive music player with playback controls.
- Play, pause, next, and previous track functionality.
- Volume control and playback progress seeking.
- Shuffle and repeat modes.
- Like and unlike tracks.
- Persistent player interface across the application.

### 🎼 Music Library
- Browse available music tracks.
- Explore playlists and music collections.
- Search for tracks.
- View track information, including title, artist, album, and duration.
- Discover featured and popular music.

### 📂 Local MP3 Importer
- Import local MP3 files directly from your device.
- Extract embedded audio metadata.
- Read track titles, artists, album information, and duration.
- Extract embedded album artwork.
- Preview metadata before importing tracks into the player.
- Play imported audio directly in the browser.

### ❤️ Favorites
- Like and unlike tracks.
- Manage your favorite music through the interface.

### 📄 Information Pages
- About Moodzik.
- Privacy Policy.
- Terms of Service.

### 📱 Responsive Interface
- Modern dark-themed design.
- Responsive layouts for different screen sizes.
- Reusable and component-based architecture.

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| [Next.js](https://nextjs.org/) | React framework and application routing |
| [React](https://react.dev/) | User interface development |
| [TypeScript](https://www.typescriptlang.org/) | Static typing |
| [Tailwind CSS](https://tailwindcss.com/) | Styling and responsive design |
| [Lucide React](https://lucide.dev/) | Icons |
| [Music Metadata](https://github.com/Borewit/music-metadata) | Audio metadata extraction |

---

## 📁 Project Structure

The repository is organized as a full-stack project workspace, with the frontend application currently under development.

```text
Moodzik/
│
├── moodzik-front/
│   ├── public/
│   ├── src/
│   │   ├── app/
│   │   │   ├── (InfoPages)/
│   │   │   │   ├── about/
│   │   │   │   ├── privacy/
│   │   │   │   └── terms/
│   │   │   │
│   │   │   ├── globals.css
│   │   │   ├── layout.tsx
│   │   │   └── page.tsx
│   │   │
│   │   ├── components/
│   │   │   ├── layout/
│   │   │   └── music/
│   │   │
│   │   └── types/
│   │
│   ├── package.json
│   └── tsconfig.json
│
├── moodzik-back/     # Planned backend application
│
├── .gitignore
└── README.md
```

---

## 🚀 Getting Started

Follow these steps to run the frontend application locally.

### Prerequisites

Make sure you have installed:

- [Node.js](https://nodejs.org/) (LTS recommended)
- npm
- Git

### 1. Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/Moodzik.git
```

### 2. Navigate to the frontend directory

```bash
cd Moodzik/moodzik-front
```

### 3. Install dependencies

```bash
npm install
```

### 4. Start the development server

```bash
npm run dev
```

### 5. Open the application

Visit:

```text
http://localhost:3000
```

---

## 📜 Available Scripts

Run these commands inside the `moodzik-front` directory.

| Command | Description |
|---|---|
| `npm run dev` | Start the development server |
| `npm run build` | Create a production build |
| `npm run start` | Start the production server |
| `npm run lint` | Run ESLint |

---

## 🎨 Design Philosophy

Moodzik's interface is inspired by modern music streaming platforms, particularly Spotify.

The design focuses on:

- Minimal and intuitive navigation.
- A dark visual environment.
- Clear typography and visual hierarchy.
- Consistent reusable UI components.
- Smooth and accessible interactions.
- A music-first user experience.

### Color Palette

| Color | Hex | Usage |
|---|---|---|
| Background | `#101010` | Main application background |
| Accent Green | `#1ED760` | Primary actions and highlights |
| Primary Text | `#FFFFFF` | Headings and important content |
| Secondary Text | `#B3B3B3` | Supporting information |

---

## 🗺️ Roadmap

Moodzik is an ongoing project. The following features represent potential development milestones.

- [x] Initial frontend architecture.
- [x] Responsive music-focused interface.
- [x] Interactive music player.
- [x] Playback controls and volume management.
- [x] Shuffle and repeat functionality.
- [x] Favorites functionality.
- [x] Local MP3 importing.
- [x] Audio metadata extraction.
- [x] About, Privacy, and Terms pages.
- [ ] Backend development.
- [ ] User authentication and authorization.
- [ ] Database integration.
- [ ] Persistent playlists and favorites.
- [ ] User music library management.
- [ ] Music search API integration.
- [ ] PWA installation and offline capabilities.
- [ ] Improved music discovery and recommendations.

---

## 🤝 Contributing

Contributions, suggestions, and feedback are welcome.

If you have an idea for improving Moodzik or would like to contribute:

1. Fork the repository.
2. Create a new feature branch.
3. Commit your changes.
4. Push your branch.
5. Open a Pull Request.

---

## ⚠️ Disclaimer

Moodzik is an independent development project inspired by the user experience of modern music streaming platforms.

It is not affiliated with, endorsed by, or officially connected to Spotify.

All third-party trademarks, music, artwork, and other media belong to their respective owners.

---

## 👨‍💻 Author

**Amirali Mahmoudi**

- GitHub: [@AmiraliTMP](https://github.com/AmiraliTMP)

---

<p align="center">
  Made with ❤️ and a passion for music.
  <br />
  <strong>Moodzik — Your Music. Your Mood. Your Space.</strong>
</p>
