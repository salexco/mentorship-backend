# 🧑‍🏫 Mentorship Matching Platform – Backend

This is the **backend API** for the Mentorship Matching Platform, a web application that connects mentees with mentors efficiently for incubator or accelerator programs.

---

## 🚀 Project Overview

The backend provides:

- **User authentication & authorization** with JWT  
- **Role-based access** for Admin, Mentor, and Mentee  
- **Mentorship request system**  
- **Session booking and feedback**  
- **Admin dashboard APIs**

---

## 💻 Tech Stack

- **Node.js**
- **Express.js**
- **MongoDB + Mongoose**
- **JWT Authentication**
- **CORS**
- **Render deployment**

---

## 🧩 Key Features

✔ **Authentication & Authorization**  
✔ **User Profiles:** name, bio, skills, goals  
✔ **Mentor Discovery & Matching**  
✔ **Availability & Session Booking**  
✔ **Session Feedback**  
✔ **Admin user management**

---

## 🔑 API Endpoints

### Authentication

| Method | Endpoint | Description |
|---|---|---|
| POST | /auth/register | Register a new user |
| POST | /auth/login | Login and receive JWT |
| POST | /auth/logout | Logout user (optional) |
| GET | /auth/me | Get current authenticated user |

---

### Users & Profiles

| Method | Endpoint | Description |
|---|---|---|
| GET | /users/me | Get own profile |
| GET | /users/:id | Get user by ID |
| PUT | /users/me/profile | Update own profile |

---

### Mentorship Requests

| Method | Endpoint | Description |
|---|---|---|
| POST | /requests | Send mentorship request |
| GET | /requests/sent | View mentee sent requests |
| GET | /requests/received | View mentor received requests |
| PUT | /requests/:id | Accept/Reject mentorship request |

---

### Mentorship Sessions

| Method | Endpoint | Description |
|---|---|---|
| POST | /sessions | Schedule a session |
| GET | /sessions/mentor | View mentor sessions |
| GET | /sessions/mentee | View mentee sessions |
| PUT | /sessions/:id/feedback | Submit session feedback |

---

### Admin

| Method | Endpoint | Description |
|---|---|---|
| GET | /admin/users | List all users |
| PUT | /admin/users/:id/role | Update user role |

---

## ⚙️ Installation

1. **Clone the repo**

```bash
git clone https://github.com/salexco/mentorship-backend.git
cd mentorship-backend
