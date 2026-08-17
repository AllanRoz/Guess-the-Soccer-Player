# Guess the ⚽ Player

<a id="readme-top"></a>

<!-- PROJECT LOGO -->

<br />
<div align="center">
  <a href="https://github.com/AllanRoz/guess-the-soccer-player">
    <img src="public/soccer_icon.png" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">Guess the ⚽ Player</h3>

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

About The Project

Guess the ⚽ Player is an interactive soccer trivia and guessing game designed to test how well you know the world's top footballers.

Players are given a series of clues about a mystery soccer player and must identify them using information such as nationality, position, clubs, career history, statistics, international achievements, and individual awards.

The fewer clues you need to reveal, the higher your score.

The application includes multiple game modes, daily challenges, player statistics, achievements, streaks, game history, and a local progression system — all running entirely in the browser with no backend or authentication required.

Key Features

Classic Guessing Mode: Identify a mystery player using progressively revealed clues.

Multiple Choice Mode: Choose the correct player from four possible answers.

Career Path Mode: Identify a player from their professional club journey.

Club Journey Mode: Guess a player based on the clubs they have represented.

Nationality Challenge: Identify players using nationality, position, club, and career clues.

Stat Challenge: Guess players from statistics such as goals, assists, appearances, and trophies.

Mystery Player Mode: Start with vague clues and progressively reveal more specific information.

Dynamic Clue System: Clues are generated from the selected player's actual data rather than being manually hardcoded for each game.

Player Search: Search and select players using autocomplete and partial-name matching.

Scoring System: Earn more points by correctly identifying players with fewer clues.

Daily Challenge: Receive a deterministic daily player challenge that remains consistent for that date.

Streak System: Track consecutive daily challenges and maintain your personal streak.

Achievements: Unlock achievements for milestones, high scores, streaks, fast guesses, and other accomplishments.

Game History: Review previous games, players, scores, modes, and clue counts.

Personal Statistics: Track games played, accuracy, average score, highest score, and streaks.

Shareable Results: Generate and copy results that can be shared with friends.

Responsive Design: Fully optimized for desktop, tablet, and mobile devices.

Local Progress: Game statistics, achievements, history, streaks, and settings are stored locally using LocalStorage.

No Backend Required: The entire application runs client-side and can be hosted as a static GitHub Pages website.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GAME MODES -->

Game Modes

⚽ Classic

Receive clues one at a time and try to identify the mystery player.

The fewer clues you use, the more points you earn.

🎯 Multiple Choice

Choose the correct player from four possible answers.

🛣️ Career Path

Identify a player based on their professional career and the clubs they have played for.

🏟️ Club Journey

Use a player's club history to figure out who they are.

🌎 Nationality Challenge

Use nationality, position, club, and international career clues to identify the player.

📊 Stat Challenge

Identify a player using career statistics such as goals, assists, appearances, and trophies.

🕵️ Mystery Player

Start with vague clues and progressively reveal more information until you can identify the player.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GAMEPLAY -->

Gameplay

A typical game starts with a mystery player and a maximum score.

For example:

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

You can submit a guess at any time.

Correctly identifying the player with fewer clues results in a higher score.

Example

Starting Score: 1000

4 clues used
↓
Final Score: 850

🎉 Correct!
Lionel Messi

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- PLAYER DATABASE -->

Player Database

The game uses a locally stored player database containing information about professional soccer players.

Player data can include:

Name

Nationality

Position

Current club

Previous clubs

Preferred foot

Jersey number

Career statistics

International statistics

World Cup achievements

Champions League achievements

Individual awards

Difficulty level

The database is separated from the UI and game logic, making it easy to expand with additional players in the future.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- PROGRESSION -->

Progression System

🔥 Streaks

Maintain consecutive daily challenge streaks and try to beat your personal record.

🏆 Achievements

Unlock achievements by completing milestones such as:

First Guess

Perfect Guess

5 Correct

10 Correct

25 Correct

50 Correct

100 Correct

5 Game Streak

10 Game Streak

One-Clue Guess

Fast Guess

Guessing Players From Multiple Countries

📈 Statistics

Track your personal performance including:

Games Played

Correct Guesses

Accuracy

Average Score

Highest Score

Current Streak

Best Streak

📜 Game History

Review your previous games, including the player you were given, your score, game mode, and number of clues used.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- DAILY CHALLENGE -->

Daily Challenge

Every day features a new mystery player.

The Daily Challenge uses a deterministic date-based selection system so that the player for a given date remains consistent across page refreshes.

Your daily progress is stored locally in your browser using LocalStorage.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- TECHNOLOGY -->

Built With

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->

Getting Started

Follow these steps to set up and run a local copy of the project on your machine.

Prerequisites

Node.js

npm

You can verify your installation with:

node --version
npm --version

Installation

Clone the repository

git clone https://github.com/AllanRoz/guess-the-soccer-player.git

Change into the project directory

cd guess-the-soccer-player

Install NPM packages

npm install

Start the development server

npm run dev

Open the local development URL provided by Vite.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- BUILD -->

Production Build

To create a production build:

npm run build

To preview the production build locally:

npm run preview

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- DEPLOYMENT -->

Deployment

This project is designed to be hosted as a static website using GitHub Pages.

The application requires:

No backend

No database

No authentication

No server

No paid APIs

All game logic and player data run directly in the browser.

Live Demo:

https://allanroz.github.io/guess-the-soccer-player/

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- FUTURE FEATURES -->

Future Improvements

Potential future additions include:

Expanded player database

More game modes

More detailed player statistics

Additional daily challenges

More achievements

Improved player images

Tournament mode

Timed challenges

Head-to-head local multiplayer

Additional difficulty levels

More advanced career-path challenges

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- LICENSE -->

License

Distributed under the GPL-3.0 license. See LICENSE.txt for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTACT -->

Contact

Allan Rozario - arozadev@gmail.com

Project Link: https://github.com/AllanRoz/guess-the-soccer-player/

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->

<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
