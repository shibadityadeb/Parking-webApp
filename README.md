# Parking Management Web App

A full-stack parking management application built with React, Node.js/Express, and Supabase.

## Project Structure

```
parking-app/
├── frontend/          # React + Vite
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── styles/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── index.html
│   └── package.json
├── backend/           # Node.js + Express
│   ├── src/
│   │   ├── routes/
│   │   ├── controllers/
│   │   ├── services/
│   │   └── server.js
│   └── package.json
└── README.md
```

## Tech Stack

- **Frontend**: React 18, Vite, Axios
- **Backend**: Express.js, Node.js
- **Database**: Supabase (PostgreSQL)
- **Styling**: CSS (custom theme)

## Getting Started

### Prerequisites

- Node.js 16+
- npm or yarn
- Supabase account

### Setup Supabase

1. Create a Supabase project at https://supabase.com
2. Create the following tables:

#### drivers
```sql
CREATE TABLE drivers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);
```

#### cars
```sql
CREATE TABLE cars (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  driver_id UUID NOT NULL REFERENCES drivers(id),
  car_name TEXT NOT NULL,
  car_number TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);
```

#### parkings
```sql
CREATE TABLE parkings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  car_id UUID NOT NULL REFERENCES cars(id),
  location TEXT NOT NULL,
  city TEXT NOT NULL,
  parking_date DATE NOT NULL,
  duration_minutes INTEGER NOT NULL,
  fee INTEGER NOT NULL,
  is_paid BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW()
);
```

### Backend Setup

```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your Supabase credentials
npm run dev
```

### Frontend Setup

```bash
cd frontend
npm install
cp .env.example .env
# Edit .env with your Supabase credentials and API URL
npm run dev
```

## API Endpoints

### Drivers
- `POST /api/drivers` - Add new driver
- `GET /api/drivers` - Get all drivers
- `GET /api/drivers/:id` - Get driver by ID

### Cars
- `POST /api/cars` - Add new car
- `GET /api/cars` - Get cars by driver
- `GET /api/cars/all` - Get all cars
- `GET /api/cars/:id` - Get car by ID

### Parkings
- `POST /api/parkings` - Create parking entry
- `GET /api/parkings` - Get all parkings
- `GET /api/parkings/:id` - Get parking by ID
- `PATCH /api/parkings/:id/pay` - Mark parking as paid
- `GET /api/parkings/car/:car_id` - Get parkings by car
- `DELETE /api/parkings/:id` - Delete parking entry

## Features

- ✅ Add drivers
- ✅ Add cars linked to drivers
- ✅ Create parking entries
- ✅ Mark parking as paid
- ✅ View recent parking history
- ✅ Responsive design
- ✅ Clean UI with gradient theme

## Color Theme

- Primary Gradient: #5B4BFF → #7B6CFF
- Accent Yellow: #FFC107
- Background: #F8F9FF
- Success Green: #22C55E
- Text Dark: #1F2937

## License

ISC
