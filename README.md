# 🧥 SR Collect – Full Stack Garment Website

SR Collect is a production-ready e-commerce web app for managing custom garment orders. It includes role-based dashboards, order tracking, and admin management features.

---
## 👨‍💻 Author

**Sagar** – [GitHub](https://github.com/sr-sagar)

## 🚀 Tech Stack

- **Frontend:** React + Context API + Tailwind CSS
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (Mongoose)
- **Middleware:** Joi (validation), Multer (image upload)
- **Hosting:** Netlify (Frontend), Render (Backend)

---

## 🧩 Key Features

- 🧑‍💻 **User Roles:** Admin, Supervisor, User
- ✅ **Authentication** using email and password
- 🧾 **Order Placement & Tracking**
- 🛠️ **Admin Panel:** Role assignments, user management
- 📦 **Supervisor Panel:** View/update orders, delivery status, expected delivery
- 📊 **Progress Bar** based on delivery timeline
- 🖼️ **Image Uploads** with Multer

---

## 📂 Folder Structure

```
/admin         → Admin dashboard components
/supervisor    → Supervisor dashboard components
/context       → Global app state (AppContext)
/routes        → Express route handlers
/controllers   → API logic
/middlewares   → Auth, Joi validation, Multer
/models        → MongoDB schemas
```



---

## 🌐 Live Demo

- **Frontend:** [https://srcollect.netlify.app](https://srcollect.netlify.app)
- **Backend:** Hosted on Render

⚠️ **Note:** The backend on Render may take **20–30 seconds to wake up** after 15+ minutes of inactivity (Render free tier sleeps the server).  
If you see a delay or "failed request," just refresh after a few seconds — it will wake up automatically.

---
---
