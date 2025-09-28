# Fruit Map

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Open Source Love](https://badges.frapsoft.com/os/v1/open-source.svg?v=103)](https://github.com/lfgranja/fruitmap)

🌳 Open-source platform to map fruit trees across Brazil, connecting people with accessible fruit trees in their communities. Inspired by the original [Fruit Map](https://www.fruitmap.com.br/) project.

## 🚀 Features

- 📍 Interactive map of fruit trees across Brazil
- 🍊 Seasonal information by geographic region  
- 👥 Community-driven content contribution
- 📱 Mobile-responsive PWA design
- 🔐 Secure user authentication
- ⭐ User reviews and ratings
- 🌍 Location-based search with radius filtering

## 📋 Technologies Used

- **Frontend**: React.js, TypeScript, Leaflet.js
- **Backend**: Node.js, Express.js, TypeScript
- **Database**: PostgreSQL with PostGIS for geospatial data
- **Authentication**: JWT-based authentication
- **Maps**: OpenStreetMap integration

## 🛠️ Quick Start

### Prerequisites
- Node.js (v18+)
- PostgreSQL with PostGIS extension
- Git

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/lfgranja/fruitmap.git
cd fruitmap
```

2. **Install backend dependencies**
```bash
cd backend
npm install
```

3. **Install frontend dependencies**
```bash
cd ../frontend
npm install
```

4. **Set up environment variables**
```bash
# In the backend directory
cp .env.example .env
# Edit the .env file with your configuration
```

5. **Set up the database**
```bash
# Make sure PostgreSQL is running
# Create database and run migrations
cd backend
npm run migrate
```

6. **Run the development server**
```bash
# Terminal 1: Start the backend
cd backend
npm run dev

# Terminal 2: Start the frontend
cd frontend
npm start
```

## 🤝 Contributing

We welcome contributions! Please read our [Contribution Guide](docs/Contribution-Guide.md) for details on our code of conduct and the process for submitting pull requests.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Original Fruit Map team for inspiring this project
- OpenStreetMap for map data
- The Brazilian foraging and sustainability communities

---

Made with ❤️ for the Brazilian community and sustainable food access