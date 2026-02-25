# Yalla Trip

Yalla Trip is a React + Vite web app centered on **Moroccan travel**. It combines three ideas in one place:  
**Trip discovery (Trajets)**, **Travel Communities**, and a **Marketplace** for travel gear.  
The goal is to help users explore destinations, meet other travelers, and share experiences in a clean, modern UI.


LINKS
  Live Demo: <https://yalla-trip.netlify.app/>

---

## What Yalla Trip Is (Concept)

Most travel apps focus on only one thing: booking, blogs, or maps.  
Yalla Trip connects the full travel vibe:

- **Discover trips** across Morocco (routes, inspiration, destinations)
- **Join communities** of travelers (Backpacking, Hidden Gems, Adventurers, etc.)
- **Share posts** (photos + captions) like a mini social network
- **Buy/Sell travel gear** in a simple marketplace

---

## Features

### Pages
- **Home**: hero section + feed/posts (travel content)
- **About**: brand story + travel memories sections
- **Trajet**: trip discovery with cards
- **Community**: communities list + filters + community details page
- **Marketplace**: buy/sell travel gear (post / sell modal)
- **Contact**: contact form
- **Profile**: user profile + editable info + favorite places
- **Error Page**: simple error screen + back to home
- **Login & Sign Up**: authentication screens (stored in localStorage)
- **Welcome Page**: onboarding page shown after login (or first visit)

### UX / UI
- Tailwind-based UI with Yalla Trip brand colors
- Dark/Light mode support
- Modern cards, hover states, and animations (where used)
- Responsive layouts (mobile → desktop)

---

## Tech Stack

- **React** + **Vite**
- **React Router DOM**
- **Tailwind CSS**
- **lucide-react** + **react-icons**
- Animations: **motion/react** (or framer-motion depending on project setup)

---

## Local Data (localStorage)

Yalla Trip currently uses **localStorage** as a simple backend alternative.

### Stored Keys
- `users`: array of registered users (from SignUp)
- `currentUser`: current logged-in user `{ name, email }`
- `yt_profile`: profile data `{ name, email, location, bio, avatar }`
- `yt_places`: favorite places array `[{ id, title, location, note, img }]`
- Custom event: `yt_profile_updated`  
  Used so the Navbar avatar updates instantly after profile edits.

### Reset localStorage (optional)
If you want to clear all saved data:
```js
localStorage.clear();