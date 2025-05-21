# 📦 Inventory Management System

This repository contains the backend and frontend code for an Inventory Management System supporting a shopping cart website.  
It allows managing products, including creation, updating, deletion, and viewing product details. The system supports real-time inventory tracking and smooth user experience with React frontend and Node.js backend.

---
## 💻 Tech Stack

- **Backend:** Node.js, Express.js, MongoDB, Mongoose  
- **Frontend:** React.js, Vite

---
## 📝 Project Details

The Inventory Management System enables:

- Product management (add, update, delete, view)  
- Inventory tracking with quantity control  
- REST API backend with Express and MongoDB  
- Responsive React frontend with product listings and cart management  
- Ready for further extensions like low stock alerts and restocking automation

---
## ⚙️ Setup Instructions

### 📋 Prerequisites

- Node.js and npm installed  
- MongoDB installed and running (local or cloud)  
- Git installed

---

## 🚀 Full Setup and Run

```bash
# Backend setup
cd inventory-backend
npm install
echo "MONGO_URI=your_mongodb_connection_string" > .env
echo "PORT=5000" >> .env
npm start

# Open a new terminal window/tab for frontend setup
cd ../inventory-frontend
npm install
npm run dev
---

## 🚪 Ports

- **Backend server** runs at: [http://localhost:5000](http://localhost:5000)  
- **Frontend server** runs at: [http://localhost:3000](http://localhost:3000)
