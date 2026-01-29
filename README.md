# ⚽ 90Plus

A Football Club & Match Management Platform (MERN Stack)

---

## 📸 Screenshots / UI Preview

### Landing Page

Landing Page – Overview of the platform and its features
<img src="/src/assets/Pictures/LandingPage/LandingPage.png" alt="Landing Page">

### Sign Up Page

Sign Up Page – Register as a Coach or Player
<img src="/src/assets/Pictures/SignUpPage/SignUp.png" alt="Sign Up Page">

### Sign In Page

Sign In Page – Secure authentication with JWT
<img src="/src/assets/Pictures/SignInPage/SignIn.png" alt="Sign In Page">

### Coach Dashboard

Coach Dashboard – Manage club, teams, players, and matches
<img src="/src/assets/Pictures/Coach/CoachDash.png" alt="Coach Dashboard">

### Club Details

Club Details Page – Squad, teams, and club overview
<img src="/src/assets/Pictures/Coach/ClubDetails.png" alt="Club Details">

### Player Market

Player Market – Browse and invite players
<img src="/src/assets/Pictures/Coach/PlayersMarket.png" alt="Player Market">

### Match Management

Create Match – Schedule matches
<img src="/src/assets/Pictures/Coach/CreateMatch.png" alt="Create Match">

Match Details – Scores, player ratings, and match photos
<img src="/src/assets/Pictures/Coach/MatchDetails.png" alt="Match Details">

> 📱 **Fully mobile responsive** — works smoothly on desktop, tablet, and mobile devices.
> <img src="/src/assets/Pictures/Coach/CoachDashMobile.png" alt="Coach Dashboard Mobile View">

---

## 📖 Description

**90Plus** is a MERN-stack football club management system designed to simulate real-world club operations.

It allows **coaches** to create and manage clubs, build teams, invite players, schedule matches, track results, rate player performances, and upload match photos.  
**Players** can join clubs and manage invitations.

The platform enforces strict **role-based access**, ensuring each user only sees what they are allowed to.

For the frontend interface and more project details, visit https://github.com/fadhelhaji/90Plus-frontend

---

## 💡 Background & Motivation

90Plus was created to solve a problem we repeatedly faced when organizing football games.

Whenever we planned a match, everything was scattered — messages in group chats, random notes, no proper record of who played, what the score was, or how players performed. Once the game was over, there was no history, no tracking, and no way to look back.

**90Plus** centralizes the entire football experience into one platform by providing:

- A permanent record of matches and results
- Structured team and squad management
- Player performance ratings
- Clear separation between coaches and players

The goal was to turn casual, disorganized match planning into a clean, trackable, and realistic football management system, similar to how real clubs operate.

---

## 👥 User Roles & Functionality

### 🧑‍🏫 Coach

- Create and manage a club
- Edit club details
- Delete club and all related data
- Create teams and assign players
- Invite players to the club
- Create matches between teams
- Update match scores
- Rate players (1–5)
- Upload and manage match photos
- View full match history

### ⚽ Player

- Accept or reject club invitations

### 🚫 Guest Users

- Access landing page only
- Cannot view protected routes
- Must sign in to interact with data

---

## 🚀 Getting Started

### 🌐 Live App

N/A (Deployment pending)

---

## 🧠 Planning Materials

- ERD (Clubs, Teams, Matches, Players)
  <img src="/src/assets/Pictures/Planning Material/ERD/90PlusERD.png" alt="ERD">
- Initial App Flow (Players Market Page)
  <img src="/src/assets/Pictures/Planning Material/App Flow/Initial App Flow (Players Market Page).png" alt="Inital App Flow">

---

## ⚙️ Backend Repository

👉 **Backend Repo:**  
https://github.com/fadhelhaji/EduTrack-Backend

---

## 🛠️ Technologies Used

### Frontend

- JavaScript (ES6+)
- React (Vite)
- React Router
- Axios
- Tailwind CSS
- Lucide React (Icons)

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose ODM
- JSON Web Tokens (JWT)
- Bcrypt
- Cloudinary (image uploads)

---

## 🔐 Authentication & Authorization

- JWT-based authentication (Sign Up / Sign In / Sign Out)
- Role-based authorization (Coach vs Player)
- Protected routes on frontend and backend
- Secure password hashing
- No secret keys exposed on the frontend

---

## 📜 Attributions

- Icons: **Lucide React**
- Styling: **Tailwind CSS**
- Image Uploads: **Cloudinary**
- Authentication: **JWT**

---

## 🔮 Next Steps (Future Enhancements)

- Include more features to the player role
- Performance analytics dashboard
- Notifications system
- Public club profiles

---
