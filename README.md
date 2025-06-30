# 💼 Finance Dashboard

A modern full-stack finance management platform designed to visualize financial analytics, monitor wallet activity, manage transactions, communicate via internal messaging, and soon — handle emails directly from the dashboard.

---

## 🔗 Live URLs

- 🔹 **Frontend**: [https://finance-dashboard-frontend-9gsr.onrender.com](https://finance-dashboard-frontend-9gsr.onrender.com)
- 🔹 **Backend**: [https://finance-dashboard-zdik.onrender.com](https://finance-dashboard-zdik.onrender.com)

> 🧪 **Admin Login**
>
> - **Email**: `admin@example`  
> - **Password**: `admin123`

---

## 🎥 Preview
## 📽️ Demo Video
[Click to Watch the Demo](https://github.com/Swapnilpatil03/finance-dashboard/releases/download/v1.0.0/React.App.-.Google.Chrome.2025-06-30.00-01-21.mp4)








---

## 🧰 Tech Stack

| Layer     | Technology                              |
|-----------|------------------------------------------|
| Frontend  | React, TypeScript, MUI (Material UI)     |
| Backend   | Node.js, Express, TypeScript             |
| Database  | MongoDB, Mongoose                        |
| Auth      | JWT (Token-based Authentication)         |
| Styling   | MUI + Custom CSS                         |
| Charts    | Recharts                                 |
| Date Utils| Day.js                                   |

---

## ✨ Key Features

### 🔐 Authentication
- User registration & login
- JWT-based session handling
- Admin role support

### 📊 Dashboard
- Real-time summary: **Balance**, **Revenue**, **Expenses**, and **Savings**
- Dynamic chart switching (monthly/weekly)
- Recent transaction highlights

### 💼 Wallet
- Breakdown of income & expenses
- Latest activity feed
- Color-coded entries

### 📁 Transactions
- Filterable by date, search, and status
- Export options: **CSV** & **PDF**
- Dynamic amount coloring

### 👤 Profile
- View & update user information
- Change avatar
- Password change
- Activity log

### 💬 Messages
- Direct internal messaging
- One-to-one chats (WhatsApp/Telegram style)
- Smart scroll, preview snippets, timestamp

### 📧 Mail (Under Development)
- **Objective**: Admin can log in to their Gmail inbox, read & reply directly from the dashboard.
- Gmail API integration using OAuth2
- Real-time interface similar to a messenger
- Smart inbox design

---

## 🛠️ Local Setup

### Prerequisites
- Node.js ≥ 18.x
- MongoDB local or cloud (e.g., Atlas)

### Step 1: Clone Repository

```bash
git clone https://github.com/Swapnilpatil03/finance-dashboard.git
````

### Step 2: Backend Setup 

```` bash
cd backend
npm install
````

### Step 3: Frontend Setup

```` bash
cd frontend
npm install
````

### Step 4: Start Server

````bash
npm run dev
# Runs on http://localhost:5000
````

### Step 5: Start Development Server(Frontend)
````bash
npm start
# Runs on http://localhost:3000
````


### Postman Collection
https://gist.github.com/Swapnilpatil03/9772e7ce9f78af14e26b728527029041


## 📬 Gmail Mail Integration (Coming Soon...)

We're building a new **Mail** page that allows the admin to log into Gmail and interact with emails just like a chat app (think WhatsApp or Telegram). This feature will make it easier for admins to view and reply to emails in a conversational, threaded interface — all from within the dashboard.

---

### ✅ What's Done:

- ✅ UI design for threaded chat experience  
- ✅ Placeholder component for Gmail authentication flow (OAuth2)

---

### 🔧 In Progress:

- 🔄 Gmail OAuth2 integration using Google APIs  
- 📥 Fetching inbox and parsing messages via Gmail REST API  
- 📤 Sending replies directly from the dashboard  
- 🔁 Smart thread-based conversation mapping (like chat apps)

---

### 🔒 Authentication Flow (Planned):

1. Admin clicks **"Login with Gmail"**
2. Redirect to Google OAuth2 consent screen
3. On success, access token is stored securely
4. Token used to interact with Gmail API (read/send)

---

### 💡 Goal:

Create a smooth, chat-like email experience where the admin never needs to leave the dashboard to manage conversations.

> 🚧 *This feature is under active development and will be rolled out in upcoming releases. Stay tuned!*

---


