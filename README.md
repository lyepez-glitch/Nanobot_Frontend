🧠 Nanobot Simulation App

This is a full-stack web application that allows users to:

✅ Sign up and log in

🤖 Create nanobots with various states

🧬 Create simulations using nanobots to target and repair cells

🔍 Look up users, nanobots, and simulations by their IDs

Built using Next.js 15, TailwindCSS, and connected to a backend (hosted separately) using MySQL and Express.js.

🚀 Live Demo
Frontend: https://nanobot-frontend.vercel.app

🛠 You’ll need to run the backend server (see "Backend Setup") for full functionality.

🖥 Features
User registration & login

Create, view, and manage nanobots

Run simulations targeting cell states (e.g., cancerous, damaged)

View simulations and nanobots by ID

Sleek responsive UI powered by Tailwind CSS

📦 Tech Stack
Frontend: Next.js, React, TailwindCSS

Backend: Node.js, Express, MySQL (hosted via FreeSQLDatabase.com)

Hosting: Vercel (frontend), Render.com (backend)

🧪 Getting Started (Frontend)
1. Clone the repo

git clone https://github.com/your-username/nanobot-frontend.git

cd nanobot-frontend

2. Install dependencies

npm install

4. Run the development server

npm run dev

Now go to http://localhost:3000 in your browser.

🔌 Backend Setup (Required)
The backend is responsible for authentication, nanobot and simulation storage.

If you want to run the full app locally:

1. Create a MySQL database
You can use https://www.freesqldatabase.com or your local MySQL instance via MySQL Workbench.

Example environment variables used:

DB_HOST=sql3.freesqldatabase.com
DB_USER=sql3758208
DB_PASSWORD=yourpassword
DB_NAME=sql3758208
DB_PORT=3306

2. Clone the backend repo

git clone https://github.com/your-username/nanobot-backend.git

cd nanobot-backend

3. Install and run backend

npm install

npm start

Backend should run on http://localhost:8081 (or update the frontend backendUrl accordingly).

📁 Project Structure Highlights

/app
  /components
    Login.jsx
    UserForm.jsx
    SimulationForm.jsx
    NanobotForm.jsx
    ...
  page.jsx  # Main app logic
/globals.css
/tailwind.config.js
/package.json

🧠 Notes
Backend requests are sent to: https://nanobot-backend.onrender.com/ by default.

If testing locally, make sure CORS is enabled on your backend.

You can edit the main logic in app/page.jsx and corresponding forms in /components.

🛠 Future Improvements
Add user dashboards and better result visualizations

Implement filtering and editing of simulations

Add auth token support (JWT)

📄 License
MIT
