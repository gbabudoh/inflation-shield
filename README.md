# Inflation Shield 🛡️

**AI-Driven Group Buying Marketplace for Economic Resilience**

Inflation Shield is a next-generation e-commerce platform designed to combat inflation through collective buying power and AI-optimized supply chain sourcing. By aggregating consumer demand into "clusters," the protocol negotiates wholesale prices directly with manufacturers, bypassing intermediaries and unlocking significant savings.

![Inflation Shield Dashboard](/frontend/public/images/dashboard-preview.png)

## 🚀 Key Features

### for Consumers

- **Group Buy Clusters**: Join active clusters to unlock wholesale pricing on essential goods (Rice, Sugar, Flour, etc.).
- **AI Deal Finder**: Our autonomous agent scans global markets for arbitrage opportunities and alerts users to high-alpha deals.
- **Transparent Analytics**: Real-time tracking of savings, inflation metrics, and logistics status.

### for Governance (Admin)

- **Command Center**: High-density dashboard for monitoring protocol health, user growth, and capital flow.
- **AI Sourcing Board**: Autonomous agent interface for discovering and approving arbitrage deals.
- **Price Trends**: Real-time inflation monitoring and market analysis.
- **User Registry**: comprehensive identity management and node verification.

## 🏗️ Technology Stack

### Frontend (`/frontend`)

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS + Custom Design System (Glassmorphism, Institutional Aesthetics)
- **State Management**: React Hooks & Context
- **Icons**: Lucide React

### Backend (`/backend`)

- **Framework**: FastAPI (Python)
- **Database**: PostgreSQL (via SQLAlchemy)
- **AI Engine**: Custom Python agents for web scraping and price analysis
- **Authentication**: Custom Identity Protocol

## 🛠️ Getting Started

### Prerequisites

- Node.js 18+
- Python 3.10+
- PostgreSQL

### Installation

1.  **Clone the repository**

    ```bash
    git clone https://github.com/gbabudoh/inflation-shield.git
    cd inflation-shield
    ```

2.  **Setup Frontend**

    ```bash
    cd frontend
    npm install
    npm run dev
    ```

3.  **Setup Backend**
    ```bash
    cd backend
    python -m venv venv
    source venv/bin/activate  # or venv\Scripts\activate on Windows
    pip install -r requirements.txt
    uvicorn app.main:app --reload
    ```

## 🔐 Admin Access

- **Login**: `/admin`
- **Identity**: `admin1@shield-test.com`
- **PIN**: `admin123test`

## 📄 License

Privately Licensed - Inflation Shield Protocol.
