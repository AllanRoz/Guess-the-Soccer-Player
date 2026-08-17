# Guess the Player

<a id="readme-top"></a>

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/AllanRoz/guess-the-soccer-player">
    <img src="public/favicon.ico" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">Guess the Player</h3>

  <p align="center">
    An interactive soccer guessing game that challenges you to identify professional footballers from career clues, statistics, and achievements.
    <br />
    <br />
    <a href="https://allanroz.github.io/guess-the-soccer-player/">View Demo</a>
    &middot;
    <a href="https://github.com/AllanRoz/guess-the-soccer-player/issues/new?labels=bug&template=bug-report---.md">Report Bug</a>
    &middot;
    <a href="https://github.com/AllanRoz/guess-the-soccer-player/issues/new?labels=enhancement&template=feature-request---.md">Request Feature</a>
  </p>
</div>

<!-- ABOUT THE PROJECT -->
## About The Project

[![Product Screenshot][product-screenshot]](https://allanroz.github.io/guess-the-soccer-player/)

**Guess the ⚽ Player** is an interactive soccer trivia and guessing game designed to test how well you know the world's top footballers.

Players are given a series of clues about a mystery soccer player and must identify them using information such as nationality, position, clubs, career history, statistics, international achievements, and individual awards.

The fewer clues you need to reveal, the higher your score.

The application includes multiple game modes, daily challenges, player statistics, achievements, streaks, game history, and a local progression system — all running entirely in the browser with no backend or authentication required.

### Key Features

* **Classic Guessing Mode:** Identify a mystery player using progressively revealed clues.
* **Multiple Choice Mode:** Choose the correct player from four possible answers.
* **Career Path Mode:** Identify a player from their professional club journey.
* **Club Journey Mode:** Guess a player based on the clubs they have represented.
* **Nationality Challenge:** Identify players using nationality, position, club, and career clues.
* **Stat Challenge:** Guess players from statistics such as goals, assists, appearances, and trophies.
* **Mystery Player Mode:** Start with vague clues and progressively reveal more specific information.
* **Dynamic Clue System:** Clues are generated from the selected player's actual data rather than being manually hardcoded for each game.
* **Player Search:** Search and select players using autocomplete and partial-name matching.
* **Scoring System:** Earn more points by correctly identifying players with fewer clues.
* **Daily Challenge:** Receive a deterministic daily player challenge that remains consistent for that date.
* **Streak System:** Track consecutive daily challenges and maintain your personal streak.
* **Achievements:** Unlock achievements for milestones, high scores, streaks, fast guesses, and other accomplishments.
* **Game History:** Review previous games, players, scores, modes, and clue counts.
* **Personal Statistics:** Track games played, accuracy, average score, highest score, and streaks.
* **Shareable Results:** Generate and copy results that can be shared with friends.
* **Responsive Design:** Fully optimized for desktop, tablet, and mobile devices.
* **Local Progress:** Game statistics, achievements, history, streaks, and settings are stored locally using LocalStorage.
* **No Backend Required:** The entire application runs client-side and can be hosted as a static GitHub Pages website.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GAME MODES -->
## Game Modes

### ⚽ Classic

Receive clues one at a time and try to identify the mystery player.

The fewer clues you use, the more points you earn.

### 🎯 Multiple Choice

Choose the correct player from four possible answers.

### 🛣️ Career Path

Identify a player based on their professional career and the clubs they have played for.

### 🏟️ Club Journey

Use a player's club history to figure out who they are.

### 🌎 Nationality Challenge

Use nationality, position, club, and international career clues to identify the player.

### 📊 Stat Challenge

Identify a player using career statistics such as goals, assists, appearances, and trophies.

### 🕵️ Mystery Player

Start with vague clues and progressively reveal more information until you can identify the player.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GAMEPLAY -->
## Gameplay

A typical game starts with a mystery player and a maximum score.

For example:

```text
⚽ MYSTERY PLAYER

Clue #1
🇦🇷 Nationality: Argentina

Clue #2
⚽ Position: Forward

Clue #3
🏟️ Played in La Liga

Clue #4
🏆 Champions League Winner

Clue #5
🌎 World Cup Winner
```

You can submit a guess at any time.

Correctly identifying the player with fewer clues results in a higher score.

### Example

```text
Starting Score: 1000

4 clues used
↓
Final Score: 850

🎉 Correct!
Lionel Messi
```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- PLAYER DATABASE -->
## Player Database

The game uses a locally stored player database containing information about professional soccer players.

Player data can include:

* Name
* Nationality
* Position
* Current club
* Previous clubs
* Preferred foot
* Jersey number
* Career statistics
* International statistics
* World Cup achievements
* Champions League achievements
* Individual awards
* Difficulty level

The database is separated from the UI and game logic, making it easy to expand with additional players in the future.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- PROGRESSION -->
## Progression System

### 🔥 Streaks

Maintain consecutive daily challenge streaks and try to beat your personal record.

### 🏆 Achievements

Unlock achievements by completing milestones such as:

* First Guess
* Perfect Guess
* 5 Correct
* 10 Correct
* 25 Correct
* 50 Correct
* 100 Correct
* 5 Game Streak
* 10 Game Streak
* One-Clue Guess
* Fast Guess
* Guessing Players From Multiple Countries

### 📈 Statistics

Track your personal performance including:

* Games Played
* Correct Guesses
* Accuracy
* Average Score
* Highest Score
* Current Streak
* Best Streak

### 📜 Game History

Review your previous games, including the player you were given, your score, game mode, and number of clues used.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- DAILY CHALLENGE -->
## Daily Challenge

Every day features a new mystery player.

The Daily Challenge uses a deterministic date-based selection system so that the player for a given date remains consistent across page refreshes.

Your daily progress is stored locally in your browser using LocalStorage.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- TECHNOLOGY -->
## Built With

* [![React][React.js]][React-url]
* [![JavaScript][JavaScript.js]][JavaScript-url]
* [![Vite][Vite.dev]][Vite-url]
* [![TailwindCSS][Tailwind.css]][Tailwind-url]
* [![Framer Motion][Framer-motion.js]][Framer-motion-url]
* [![Lucide React][Lucide.js]][Lucide-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->
## Getting Started

Follow these steps to set up and run a local copy of the project on your machine.

### Prerequisites

* Node.js
* npm

You can verify your installation with:

```sh
node --version
npm --version
```

### Installation

1. Clone the repository

   ```sh
   git clone https://github.com/AllanRoz/guess-the-soccer-player.git
   ```

2. Change into the project directory

   ```sh
   cd guess-the-soccer-player
   ```

3. Install NPM packages

   ```sh
   npm install
   ```

4. Start the development server

   ```sh
   npm run dev
   ```

5. Open the local development URL provided by Vite.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- BUILD -->
## Production Build

To create a production build:

```sh
npm run build
```

To preview the production build locally:

```sh
npm run preview
```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- DEPLOYMENT -->
## Deployment

This project is designed to be hosted as a static website using GitHub Pages.

The application requires:

* No backend
* No database
* No authentication
* No server
* No paid APIs

All game logic and player data run directly in the browser.

Live Demo:

[https://allanroz.github.io/guess-the-soccer-player/](https://allanroz.github.io/guess-the-soccer-player/)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- FUTURE FEATURES 
## Future Improvements

Potential future additions include:

* Expanded player database
* More game modes
* More detailed player statistics
* Additional daily challenges
* More achievements
* Improved player images
* Tournament mode
* Timed challenges
* Head-to-head local multiplayer
* Additional difficulty levels
* More advanced career-path challenges

-->

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- LICENSE -->
## License

Distributed under the GPL-3.0 license. See `LICENSE.txt` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTACT -->
## Contact

Allan Rozario - arozadev@gmail.com

Project Link: [https://github.com/AllanRoz/guess-the-soccer-player/](https://github.com/AllanRoz/guess-the-soccer-player/)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[license-shield]: https://img.shields.io/github/license/AllanRoz/guess-the-soccer-player.svg?style=for-the-badge
[license-url]: https://github.com/AllanRoz/guess-the-soccer-player/blob/main/LICENSE.txt

[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://www.linkedin.com/in/allan-rozario/

[product-screenshot]: public/guess_the_soccer_player.png

[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://react.dev/

[JavaScript.js]: https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black
[JavaScript-url]: https://developer.mozilla.org/en-US/docs/Web/JavaScript

[Vite.dev]: https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white
[Vite-url]: https://vite.dev/

[Tailwind.css]: https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white
[Tailwind-url]: https://tailwindcss.com/

[Framer-motion.js]: https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white
[Framer-motion-url]: https://motion.dev/

[Lucide.js]: https://img.shields.io/badge/Lucide-18181B?style=for-the-badge&logo=lucide&logoColor=white
[Lucide-url]: https://lucide.dev/
