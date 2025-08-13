# 🧠 Project Overview: RoleReady - Job Interview Prep Tool

## 🎯 Mission

Build a sleek, scalable, and powerful AI-driven web app that helps users prepare for job interviews by generating tailored interview questions from job descriptions, offering personalized practice tools, and delivering a professional, polished user experience that feels like a mature SaaS product.

---

## 🛠️ Tech Stack

* **Frontend:** Next.js (App Router)
* **Styling:** Tailwind CSS
* **UI Components:** ShadCN (Radix-based)
* **Auth:** Clerk (Google + LinkedIn)
* **Database:** ConvexDB
* **Payments:** Clerk
* **AI:** OpenAI (for question generation + mock interviewer)

---

## 🚀 Core Features & Screens

### 1. Interview Question Generator (/generate)

* Paste job description or URL
* Select type (Behavioral, Technical, Mixed)
* Choose number of questions (5, 10, 20, Custom)
* YOLO mode toggle
* Generates and displays flashcard-style questions + answers
* Usage tracking + upgrade modal

### 2. Landing Page (/)

* Clear CTA: Try Free / Login
* Demo animations
* Pricing preview

### 3. Sign In / Sign Up (/sign-in)

* Clerk integration (Google, LinkedIn)
* Redirect to /generate

### 4. Pricing Page (/pricing)

* Free, Starter, Pro, Elite comparison
* Stripe-powered upgrade flow

### 5. Saved Sessions (/library)

* List of past job descriptions + questions
* Resume/edit/download

### 6. Flashcard Mode (/quiz-mode)

* Flip cards
* Navigation, optional timer

### 7. AI Interviewer (Elite Only)

* Conversational mock interview with AI
* Real-time feedback and session scoring

### 8. Account Settings (/account)

* Plan, usage, billing history
* Upgrade/downgrade + delete account

### 9. Onboarding Modal (First login)

* Job focus, experience level, prep preferences

### 10. Usage Limit Modals / Banners

* Caps based on plan
* Animated progress bars + upsell modal

### 11. Static Pages

* /terms
* /privacy
* /support

---

## 📦 Build Phases

### Phase 1: UI/UX Build (Frontend Only)

* Polish every screen with full layout, state, responsiveness, empty/error/success/hover/disabled/loading states
* No backend wiring yet

### Phase 2: Backend Integration

* ConvexDB schema
* Clerk integration
* OpenAI endpoints
* Usage tracking by user + plan

### Phase 3: Full Stack Connection

* Hook frontend components to backend logic
* Final polish, bug checks, optimization

---

## 🎨 Design Expectations

* **UI should look elegant, professional, and SaaS-level polished**
* Treat this like a YC Demo Day startup
* Layouts must feel premium, clean, and intentional
* Hover states, microinteractions, and subtle animations required
* Every component should be modular, responsive, and accessible

> This isn’t a prototype. It’s a real product being built fast with long-term goals in mind. Always prioritize usability, visual clarity, and scalability.

