# RBAC Configuration Tool

A full-stack Role-Based Access Control (RBAC) tool built with **Next.js** and **Supabase**. This application allows administrators to manage roles, permissions, and assign permissions to roles and users through an intuitive web interface.

---

## Features

- **User Authentication** via Supabase Auth
- **Roles Management**: Create, edit, and delete roles
- **Permissions Management**: Create, edit, and delete permissions
- **Assign Permissions to Roles**
- **Assign Roles to Users**
- **Reverse Lookup**: See which roles are linked to specific permissions
- **Modern UI** with CSS Modules

---

## Tech Stack

- **Frontend:** Next.js (App Router) with TypeScript  
- **Styling:** CSS Modules  
- **Backend & Database:** Supabase (Postgres + Auth)  
- **Deployment:** Vercel  

---

## Getting Started

### 1. Clone Repository

```bash
git clone https://github.com/<your-username>/<repo-name>.git
cd <repo-name>

2. Install Dependencies

npm install

3. Configure Environment Variables
Create a .env.local file in the root folder and add the following:

NEXT_PUBLIC_SUPABASE_URL=https://bevryecudtbvdtpnwivt.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJldnJ5ZWN1ZHRidmR0cG53aXZ0Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1MzkzNzUwNSwiZXhwIjoyMDY5NTEzNTA1fQ.nxRs8-p4aE5rG9Q9UPOuTcaFAWaPxQn58577KiyprBc


4. Run the Development Server

npm run dev

