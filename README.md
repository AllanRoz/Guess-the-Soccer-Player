# Guess the ⚽ Player

A polished, addictive soccer guessing game built with React, Vite, and Tailwind CSS.

## Features

- **Classic Mode**: Reveal clues one by one and guess the player
- **Multiple Choice**: Quick 4-option guessing game
- **Career Path**: Follow transfer journeys to identify players
- **Daily Challenge**: New player every day
- **Speed Round**: How many can you guess in a row?
- **Stats & Achievements**: Track your progress
- **Player Encyclopedia**: Browse all 10+ players
- **Sound Effects**: Web Audio API synthesized sounds
- **Confetti Celebrations**: Win animations
- **Fully Offline**: No backend, no API keys, works offline

## Tech Stack

- React 19
- Vite 6
- Tailwind CSS 3
- Framer Motion
- Lucide React
- React Router
- Canvas Confetti
- LocalStorage for persistence

## Development

```bash
npm install
npm run dev
```

## Build for GitHub Pages

```bash
npm run build
```

The `dist/` folder is ready for deployment.

## Deploy to GitHub Pages

1. Push to your GitHub repository
2. Go to Settings → Pages
3. Select `dist` folder as source
4. Your site will be live at `https://yourusername.github.io/Guess-the-Soccer-Player`

Or use the automated script:

```bash
npm run deploy
```

## Player Database

The game includes 10 verified football players:
- Lionel Messi
- Cristiano Ronaldo
- Kylian Mbappé
- Erling Haaland
- Neymar Jr
- Pedri
- Gavi
- Vinícius Júnior
- Jude Bellingham
- Mohamed Salah

Each player has:
- 10 progressive clues
- Career transfer path
- Statistics and achievements
- Multiple choice distractors

## License

MIT
