# Transaction Data Generator (JavaScript)

A Node.js simulator that generates transaction data for 10 different Saudi cities and pushes them to a backend service every 5 seconds.

## Features

- Generates transactions for 10 cities: Riyadh, Jeddah, Mecca, Medina, Dammam, Khobar, Taif, Tabuk, Abha, Khamis Mushait
- Creates new transaction every 5 seconds
- Includes realistic data: ID, City, City Code, Coordinates, Time, Price, Property Type
- Property types: Land, Villa, Apartment
- Sends data to backend via REST API

## Installation

```bash
npm install
```

## Run

```bash
npm start
```

Or with custom backend URL:

```bash
BACKEND_URL=http://localhost:8080/api/transactions npm start
```

## Transaction Data Structure

```json
{
  "id": "uuid",
  "city": "Riyadh",
  "cityCode": "011",
  "coordinates": {
    "lat": 24.7136,
    "lng": 46.6753
  },
  "time": "2024-12-04T10:30:00.000Z",
  "price": 750000.00,
  "type": "VILLA"
}
```
