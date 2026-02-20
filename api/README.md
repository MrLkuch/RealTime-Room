# RealTime-Room - Backend (api)

Serveur Express + Socket.IO pour le backend du projet RealTime-Room.

## 🛠️ Installation

### Prérequis
- Node.js >= 18
- pnpm (recommandé)

### Installation des dépendances
```bash
pnpm install
```

## 🚀 Lancement

### Développement
```bash
pnpm dev
```
Accès sur [http://localhost:3000](http://localhost:3000)

### Production
```bash
pnpm start
```
#### Docker
```bash
# Build et run via Docker
cd ..
docker compose up --build
```

## ⚙️ Variables d'environnement
Créer un fichier `.env` à la racine de api :
```
PORT=3000
NODE_ENV=production
# Ajouter d'autres variables si besoin
```

## 🏗️ Architecture
```
api/
├── src/
│   └── server.js       # Serveur Express + Socket.IO
├── Dockerfile          # Build backend
├── package.json        # Dépendances
```

## 🧩 Technologies
- Express 5
- Socket.IO
- Helmet, CORS, express-rate-limit
- Nodemon (dev)

## 🔗 Frontend
Le frontend communique via Socket.IO et HTTP sur le port défini.

---
Pour toute question, voir le README du frontend ou contacter l'équipe.
