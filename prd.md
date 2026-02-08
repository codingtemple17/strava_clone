# Strava Clone - Social Fitness Tracker

> **Project Owners:** Victor Castillo & Juan Franco  
> **Date:** February 8, 2026  
> **Live Demo:** [Your Netlify/Vercel URL]

A freemium social fitness platform inspired by Strava, where users can log workouts, share activities with friends, and stay motivated through community engagement. Built to demonstrate a viable freemium business model with strategic premium feature placement.

---

## 🎯 The Problem

Fitness enthusiasts lack a simple way to track their workouts, share progress with friends, and stay motivated through social engagement. Existing solutions are either too complex, too expensive upfront, or lack the social features that keep users engaged long-term.

**Key Insight:** Social fitness apps see **3x higher retention** than solo tracking apps. Users want to celebrate achievements and get encouragement from their community.

---

## 💡 The Opportunity

Create a freemium social fitness platform that hooks users with effortless activity logging and social engagement, then converts them to premium subscriptions for advanced analytics and performance tracking.

**Market Validation:**
- Global fitness app market valued at **$4.4B in 2024**, growing **17% annually**
- Strava has **120M+ users** with **~5% conversion to premium**
- Freemium model proven effective in fitness category (MyFitnessPal, Nike Run Club, Peloton Digital)

---

## 👥 Target Users

**Primary Users:** Recreational runners and cyclists (ages 25-45) who want to track progress and share achievements

**Secondary Users:** Competitive athletes seeking performance analytics and goal tracking

### User Needs
- ✅ **Casual Runner:** "I need to quickly log my workouts because I want tracking to be effortless, not a chore"
- ✅ **Social Enthusiast:** "I need to see my friends' activities in order to stay motivated and celebrate their progress"
- ✅ **Goal-Oriented Athlete:** "I need to track my performance over time because I want to see improvement and hit personal records"
- ✅ **Competitive Runner:** "I need to compare my times on popular routes in order to challenge myself against others"
- ✅ **Data-Driven Athlete:** "I need detailed analytics and trends because I want to optimize my training and understand my patterns"

---

## 🎯 MVP Value Proposition

**Top 3 Value Props:**
1. **[The Vitamin]** - Effortless activity logging with automatic pace calculation and clean activity feed
2. **[The Painkiller]** - Social accountability through friend feeds, kudos, and comments that keep you motivated
3. **[The Steroid]** - Clear premium value proposition with strategic paywall placement showing advanced features users would pay for

---

## ✨ Key Features

### 🆓 Free Tier (Fully Functional)

#### Activity Logging
- **Create Activities** with title, description, type (Run, Ride, Swim, Hike, Walk, Other)
- **Track Stats:** Distance (km/miles), Duration (HH:MM:SS), Date
- **Auto-Calculate Pace:** System automatically computes min/km or min/mile
- **View History:** Chronological list of all personal activities

#### Social Engagement (The Hook)
- **Follow System:** Search for users by username, follow/unfollow unlimited athletes
- **Activity Feed:** See chronological feed of activities from people you follow
- **Give Kudos:** Like friends' workouts to show support
- **Comment:** Add comments to any activity and engage with the community
- **View Profiles:** See any user's activity history and stats

#### Activity Posts Display
Each activity shows:
- User avatar/name
- Activity title & description
- Stats: distance, time, pace, activity type icon
- Timestamp (e.g., "2 hours ago")
- Kudos count and comment count

### 💎 Premium Touchpoints (Mock Conversion Flow)

Strategic paywall placement on locked features:
- **"View Analytics"** button → triggers paywall modal
- **"Route Leaderboards"** link → triggers paywall modal
- **"Set Goals"** button → triggers paywall modal
- **"Track Personal Records"** → triggers paywall modal

#### Paywall Modal (Exact Strava Recreation)
- Headline: *"Unlock your full potential"*
- Subtitle: *"Track your progress, train smarter and reach more goals with subscription features"*
- **Pricing Options:**
  - Annual: $79.99/year ($6.67/month) - "Most popular" badge
  - Monthly: $11.99/month
- **Premium Features Listed:**
  - Create routes and get smart recommendations
  - Set goals and stay on track
  - Analyze workouts with advanced insights
  - Track all your top performances
  - See your training history in one place
- **Mock Upgrade Flow:** Clicking "Subscribe" activates premium status (no real payment)
- **Premium Badge:** UI changes to show "Premium Member" after upgrade

---

## 🎯 Project Goals

### ✅ Goals
- Demonstrate a viable freemium business model with clear free/premium feature split
- Build a functional free tier that showcases social engagement as the hook
- Create an intuitive, polished UI that feels like a professional fitness app
- Show conversion potential through strategic premium feature placement and paywall design

### ❌ Non-Goals
- Building actual premium features (analytics, leaderboards, goals)
- Real payment processing (mock payment flow only)
- GPS route tracking/recording (use manual entry only)
- Mobile app (web-only for MVP)
- Real authentication (use localStorage with preset demo user)
- Wearable device integration
- Third-party API integrations (Spotify, Apple Health, etc.)
- Map visualizations (too time-consuming for scope)

---

## 📊 Success Metrics

| Goal | Signal | Metric | Target |
|------|--------|--------|--------|
| **Social Engagement** | Users find community value | Activities with kudos/comments | **>60%** of posts |
| **Feature Discovery** | Users hit premium features | Premium feature clicks | **>40%** of users |
| **Conversion Intent** | Users see value in upgrading | Paywall modal views | **>30%** of users |
| **Retention Hook** | Users return to log/view | Repeat activity logging | **>3** activities per user |

---

## 🚀 Tech Stack

- **Frontend:** React
- **State Management:** React Context or useState with prop drilling
- **Storage:** localStorage (no backend)
- **Styling:** Tailwind CSS or CSS Modules
- **Deployment:** Vercel or Netlify
- **Icons:** React Icons or Heroicons

---

## 📦 Installation & Setup

```bash
# Clone the repository
git clone [your-repo-url]
cd strava-clone

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

---

## 🎮 Demo Experience

### Getting Started
- **Demo User:** Pre-selected (no login required)
- **Pre-Seeded Data:** 3-5 fake users with 10-15 activities total
- **Instant Value:** Users immediately see the platform's social features in action

### Reset Demo Data
Use the "Reset Demo Data" button in settings to clear localStorage and reseed with fresh demo data.

---

## 🏗️ Project Structure

```
src/
├── components/
│   ├── ActivityFeed.jsx       # Social feed of followed users' activities
│   ├── ActivityForm.jsx       # Log new workout form
│   ├── ActivityList.jsx       # Personal activity history
│   ├── PaywallModal.jsx       # Premium upgrade modal (Strava design)
│   ├── UserProfile.jsx        # User profile and stats
│   ├── UserSearch.jsx         # Search and follow users
│   └── FollowButton.jsx       # Follow/unfollow functionality
├── context/
│   └── AppContext.jsx         # Global state management
├── utils/
│   ├── localStorage.js        # Data persistence utilities
│   ├── seedData.js           # Demo data generation
│   └── calculations.js       # Pace calculation helpers
├── App.jsx                    # Main app component
└── main.jsx                   # App entry point
```

---

## 🛠️ Technical Implementation

### Priority Levels
- **[P0]** = MVP for demo/presentation (required)
- **[P1]** = Important for polished experience
- **[P2]** = Nice-to-have if time permits

### Data Structures (localStorage)

```javascript
// Current User
currentUser: {
  username: string,
  isPremium: boolean
}

// Users Array
users: [{
  id: string,
  username: string,
  bio: string,
  profilePic: string (URL),
  following: [userId],
  isPremium: boolean
}]

// Activities Array
activities: [{
  id: string,
  userId: string,
  title: string,
  description: string,
  type: 'Run' | 'Ride' | 'Swim' | 'Hike' | 'Walk' | 'Other',
  distance: number,
  distanceUnit: 'km' | 'miles',
  duration: number (seconds),
  pace: number (calculated),
  date: Date,
  timestamp: number
}]

// Kudos Array
kudos: [{
  id: string,
  activityId: string,
  username: string,
  timestamp: number
}]

// Comments Array
comments: [{
  id: string,
  activityId: string,
  username: string,
  text: string,
  timestamp: number
}]
```

### Key Calculations

**Pace Calculation:**
```javascript
// Pace = Duration / Distance
// Display format: min/km or min/mile
const totalMinutes = durationInSeconds / 60;
const pace = (totalMinutes / distance).toFixed(2);
```

### UI/UX Requirements

**[P0] Must-Have:**
- Responsive design (mobile-friendly, tablet, desktop)
- Clean, athletic aesthetic (Strava-inspired design)
- Smooth transitions for modal and user interactions

**[P1] Important:**
- Loading states for actions (logging activity, kudos, comments)
- Empty states with helpful messages ("No activities yet. Log your first workout!")
- Feed updates dynamically when new activities are logged

**[P2] Nice-to-Have:**
- Hover states and micro-interactions
- Optimistic UI updates (instant feedback)
- Visual indicator for new activities since last visit

### Performance Goals
- **[P0]** Fast page loads (< 2 seconds)
- **[P1]** Smooth scrolling in activity feeds
- **[P2]** Optimistic UI updates for instant feedback

---

## 📋 Development Timeline

**Total Time:** 12-16 hours of pair programming

### Day 1 (3-4 hours)
- Project setup (React + Tailwind/CSS Modules)
- Activity logging form with all fields
- Activity list view (personal history)
- localStorage utilities
- Basic styling (Strava color palette)

### Day 2 (3-4 hours)
- User profiles component
- Follow/unfollow system
- Social activity feed (chronological)
- Kudos functionality
- Comments system

### Day 3 (3-4 hours)
- Paywall modal (exact Strava design recreation)
- Premium feature touchpoints throughout app
- Mock upgrade flow
- Premium status indicator in UI

### Day 4 (3-4 hours)
- UI polish and responsive design
- Seed realistic demo data
- Testing all user journeys
- Deployment to Vercel/Netlify
- Demo practice and refinement

---

## 🎨 Design Reference

### Color Palette
```css
/* Primary Colors */
--strava-orange: #FC4C02;
--dark-gray: #2D2D2D;
--medium-gray: #6D6D6D;
--light-gray: #F5F5F5;
--white: #FFFFFF;

/* Status Colors */
--success: #4CAF50;
--error: #F44336;
```

### Design Principles
- **Clean, athletic aesthetic** inspired by Strava
- **Card-based layout** for activity feed
- **Responsive grid** for activity stats
- **Smooth animations** for modal and interactions
- **Orange accent colors** for CTAs and active states
- **Clean typography** (sans-serif, high legibility)

---

## 🚧 Known Limitations (By Design)

These are intentional MVP scope decisions:

- No real authentication (preset demo user with localStorage)
- No backend (localStorage only for data persistence)
- No GPS route tracking (manual entry only)
- No payment processing (mock upgrade flow only)
- Premium features show placeholder messages after "upgrade"
- No map visualizations
- No wearable device integrations
- No third-party API integrations

---

## 🔮 Future Enhancements (Post-MVP)

### Authentication & Backend
- Real authentication with Firebase/Supabase
- Backend API for data persistence
- User registration and login system
- Password reset functionality

### Premium Features (Currently Mocked)
- **Analytics Dashboard:** Weekly/monthly stats, performance trends
- **Route Leaderboards:** Compare times on popular routes
- **Goal Tracking:** Set distance/time goals and track progress
- **Personal Records:** Automatic PR detection and celebration
- **Training History:** Long-term performance analysis

### Advanced Social Features
- Followers list (who follows you)
- Activity notifications
- Weekly challenges
- Group challenges/events
- Direct messaging

### Technical Enhancements
- GPS route recording with map visualization
- Real payment integration (Stripe)
- Mobile native app (React Native)
- Wearable device sync (Apple Health, Garmin, Fitbit)
- Photo uploads for activities
- Third-party integrations (Spotify, weather data)

---

## 💡 Design Decisions

### Why Freemium?
The freemium model is proven in fitness apps (Strava, MyFitnessPal, Nike Run Club). Social features drive daily engagement and retention, while premium analytics and performance tracking convert power users who want deeper insights.

### Why Social First?
Users with social connections show **3x higher retention** than solo trackers. The feed, kudos, and comments create accountability loops that keep users coming back daily.

### Why Mock Premium Features?
Building full analytics, leaderboards, and goal tracking is beyond MVP scope (12-16 hours). Instead, we demonstrate business viability by showing:
- Where users naturally encounter premium features
- How the paywall communicates clear value
- What the upgrade flow experience looks like
- How premium status changes the UI

This approach proves the freemium model works without building features that would take weeks.

---

## 📱 Responsive Breakpoints

```css
/* Mobile */
@media (max-width: 640px) { }

/* Tablet */
@media (min-width: 640px) and (max-width: 1024px) { }

/* Desktop */
@media (min-width: 1024px) { }
```

---

## 👥 Team

**Developers:** Victor Castillo & Juan Franco  
**Contact:** victor.castillo@pursuit.org  
**Project Type:** Pursuit Fellowship Portfolio Project  
**Duration:** 4 days (12-16 hours pair programming)

---

## 📚 References

- **Strava App** - Design inspiration and UX patterns
- **Strava Paywall Screenshot** - Exact modal recreation reference
- [React Documentation](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [Freemium Business Model Research](https://www.reforge.com/blog/freemium)

---

## 📄 License

This project is for educational purposes as part of the Pursuit fellowship program.

---

## 🙏 Acknowledgments

- **Strava** for design inspiration and market validation
- **Pursuit** for project guidance and learning framework
- **Fitness community** for user research insights
- The **73% of people who quit fitness routines within 6 months** - this app aims to change that through social accountability

---

**Built with ❤️ and 🏃‍♂️ by Victor Castillo & Juan Franco**

*Making fitness social, one kudos at a time.*