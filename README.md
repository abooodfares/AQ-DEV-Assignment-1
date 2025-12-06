# AQ Real-Time Transaction Dashboard

This project is a full-stack application designed to visualize real estate transactions in real-time. It features a high-performance backend with PostGIS for spatial data, a reactive frontend, and a simulation script to generate traffic.

## Project Structure

*   **Backend**: Spring Boot application (Java 17) managing transactions and providing real-time data via Server-Sent Events (SSE). Uses PostgreSQL with PostGIS for spatial indexing.
*   **Frontend**: React application (Vite) for visualizing transactions on a map/dashboard.
*   **Generator**: Node.js script (`transaction-generator-js`) simulation tool that posts random transactions to the backend.

## Prerequisites

*   Java 17+
*   Node.js & npm
*   Docker & Docker Compose

---

## 🚀 How to Run the Project

Follow these steps in order to start the entire system.

### 1. Start the Database
The application requires PostgreSQL with PostGIS. We use Docker to spin this up easily.

```bash
# In the project root
docker-compose up -d
```
*   _This runs Postgres on port `5433` (mapped externally) to avoid conflicts with local instances._

### 2. Run the Backend
Start the Spring Boot server.

```bash
# Make sure you are in the directory containing pom.xml
mvn spring-boot:run
```
*   _Server will start on `http://localhost:8080`_
*   _Swagger UI (if enabled): `http://localhost:8080/swagger-ui.html`_

### 3. Run the Frontend
Launch the React visualization dashboard.

```bash
cd frontend
npm install
npm run dev
```
*   _Access the UI at `http://localhost:5173` (or the port shown in terminal)_

### 4. Start the Data Generator
Start the script to simulate live transaction data flowing into the system.

```bash
cd transaction-generator-js
npm install
node index.js
```
*   _This will start sending POST requests to the backend, which will then stream them to the frontend._

---

## Features
*   **Real-time Updates**: Transactions appear instantly on the frontend using SSE.
*   **Spatial Data**: Uses PostGIS `geometry(Point, 4326)` for efficient location storage.
*   **Optimized Indexing**: Hash Index for Cities and GiST Index for Locations.
