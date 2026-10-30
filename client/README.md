### VisionX - AICTE Approval Portal

VisionX is a centralized administration portal designed for AICTE (All India Council for Technical Education) officers to manage, review, and track institutional approval workflows, compliance checks, and upcoming deadlines seamlessly. 

### Key Features

* **Admin Dashboard:** A high-level overview of active workflows, total counts, and pending tasks.
* **Status Metrics:** Real-time tracking of total applications, pending reviews, approved status, and overdue items.
* **Application Ledger:** Comprehensive data tables tracking institution names, types of approvals, and active evaluation statuses.
* **Deadline Management:** Clear notifications for time-sensitive tasks like faculty verifications and infrastructure compliance checks.

### Project Structure

Based on the core layout component, the recommended folder structure for this React application is outlined below: 

text

visionx-portal/
├── public/
│   ├── favicon.ico
│   └── index.html
├── src/
│   ├── assets/               # Brand logos, icons, and placeholder images
│   ├── components/           # Reusable UI building blocks
│   │   ├── Sidebar.jsx       # Left navigation panel (aside)
│   │   ├── Header.jsx        # Top search and user profile bar (header)
│   │   ├── StatsCard.jsx     # Individual key performance metric display
│   │   └── Table.jsx         # Custom data table for recent applications
│   ├── styles/               # CSS styling sheets
│   │   └── App.css           # Global layout grid and component definitions
│   ├── App.jsx               # Main application component & layout shell
│   └── main.jsx              # Application entry point
├── package.json
└── README.md

Use code with caution.

### Component Architecture

The interface is broken down into structured semantic HTML layouts: 

1. **Sidebar (<aside>)** 

  * **Logo Branding:** Housing the portal title (VisionX) and its core purpose label.
  * **Navigation Menu:** Links connecting Dashboard, Applications, Compliance, Notifications, Reports, and Settings.
  * **Session Controls:** Displays user metadata (Admin User / AICTE Officer) alongside a standard Logout trigger.
2. **Main Workspace (<main>)** 

  * **Header Utility Bar:** Features global search functionality, quick notification alerts, and context actions.
  * **Welcome Banner:** Dynamically greets the authenticated staff member.
  * **Stats Grid (.statsGrid):** Displays quick metrics like Total Applications (240), Pending Reviews (30), Approved (180), and Overdue (10).
  * **Data Summary Tables:** Rows highlighting immediate entries like application reference IDs, institution identity, and processing statuses.
  * **Deadlines Interface:** Chronological list detailing institutional requirements (e.g., Faculty Details Verification, Infrastructure Compliance Documents).

### Tech Stack

* **Frontend Framework:** React.js
* **Styling:** CSS3 / Custom Flexbox & Grid Systems
* **Icons & Assets:** Accessible Semantic HTML & Icon Placeholders

### Getting Started

### Prerequisites

Ensure you have Node.js (version 16.x or higher) and npm installed. 

### Installation

1. Clone the repository:
git clone https://github.com/your-username/visionx-portal.git
2. Navigate to the project root directory:
cd visionx-portal
3. Install project dependencies:
npm install

### Running the Application

To launch the local development server: 

npm run dev 

Open your browser and navigate to the local host address provided in your terminal (typically http://localhost:5173) to view the operational dashboard interface.