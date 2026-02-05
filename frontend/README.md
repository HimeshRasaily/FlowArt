# Aura - Artist Portfolio Platform

A high-performance, stateless React application showcasing artist portfolios with Gallery Luxe aesthetic.

## 🎨 Features

- **Gallery Luxe Design**: Light, minimal aesthetic with #F9F9FB background and refined glassmorphism
- **Aura Branding**: Geometric overlapping circles logo with purple accent (#8A2BE2)
- **Smooth Animations**: Lenis smooth scrolling + Framer Motion animations
- **Artist Directory**: Masonry grid layout with real-time filtering by medium and experience
- **Mock Authentication**: Local state management for demo purposes
- **Community Board**: Artist posts and open calls
- **Responsive Design**: Fully responsive across all devices

## 🚀 Tech Stack

- **React** 19.0.0
- **React Router** 7.5.1
- **Framer Motion** - Advanced animations
- **Lenis** - Buttery smooth scrolling
- **Tailwind CSS** - Utility-first styling
- **Shadcn/ui** - High-quality React components
- **React Masonry CSS** - Pinterest-style layouts

## 📦 Installation

```bash
# Install dependencies
yarn install

# Start development server
yarn start

# Build for production
yarn build
```

## 🌐 Deployment

### Vercel Deployment

1. Push this repository to GitHub
2. Import project in Vercel dashboard
3. Deploy with default settings (Create React App)

### Build Output
- Build command: `yarn build`
- Output directory: `build/`
- Static files ready for any hosting platform

## 🎭 Mock Data

The application uses local mock data for demonstration:
- **6 Artist Profiles** with full details
- **12 Artworks** across different mediums
- **5 Community Posts** (Open Calls & Project Updates)

All data is stored in `/src/data/mockData.js`

## 🔑 Mock Authentication

Authentication is simulated with localStorage:
- Login/Signup sets local state
- User data persists in browser storage
- No backend required

## 📁 Project Structure

```
src/
├── components/
│   ├── ui/              # Shadcn components
│   ├── Navbar.jsx
│   ├── Logo.jsx
│   ├── NexusCard.jsx
│   ├── AuthModal.jsx
│   └── LoadingSkeleton.jsx
├── contexts/
│   └── AuthContext.jsx  # Mock auth state
├── data/
│   └── mockData.js      # All mock data
├── pages/
│   ├── HomePage.jsx
│   ├── Connectory.jsx
│   └── CommunityBoard.jsx
├── App.js
└── index.css
```

## 🎨 Color Palette

- **Background**: `#F9F9FB` (Ultra-light grey)
- **Text**: `#121212` (Deep obsidian)
- **Accent**: `#000000` (Pure black)
- **Highlight**: `#8A2BE2` (Blue violet)
- **Cards**: White with subtle shadows

## ✨ Key Components

### HomePage
- Hero section with ambient gradient background
- Noise texture overlay
- Featured artists horizontal scroll
- Latest artworks grid

### Connectory
- Masonry grid layout
- Real-time filtering (medium, experience)
- Search functionality
- 6 curated artist profiles

### Community Board
- Project updates and open calls
- Tag-based filtering
- Post type filtering

## 🛠 Development

```bash
# Start dev server with hot reload
yarn start

# Lint code
yarn lint

# Build production bundle
yarn build
```

## 📝 License

This is a concept/portfolio project for demonstration purposes.

## 🙏 Credits

- Design inspired by follow.art aesthetic
- Built with React and modern web technologies
- Created as a high-performance static application

---

**Made with Emergent AI** - Converting full-stack to static for optimal Vercel deployment
