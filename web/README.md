# RealTime-Room - Frontend (web)

Application React avec Vite pour l'interface du projet RealTime-Room.

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
Accès sur [http://localhost:5173](http://localhost:5173)

### Production
#### Build
```bash
pnpm build
```
#### Preview
```bash
pnpm preview
```
#### Docker
```bash
# Build et run via Docker
cd ..
docker compose up --build
```

## ⚙️ Variables d'environnement
- Pas de .env par défaut, mais Vite supporte les fichiers `.env` pour injecter des variables (voir [Vite docs](https://vitejs.dev/guide/env-and-mode.html)).
- Exemple :
```
VITE_API_URL=http://localhost:3000
```

## 🏗️ Architecture
```
web/
├── src/
│   ├── assets/         # Images, icônes
│   ├── components/     # Composants UI (Button, Card, Input)
│   ├── pages/          # Pages (Home, Room)
│   ├── styles/         # SCSS global
│   ├── App.jsx         # Point d'entrée React
│   └── main.jsx        # Bootstrap React/Vite
├── public/             # Fichiers statiques
├── Dockerfile          # Build frontend + Nginx
├── vite.config.js      # Config Vite
└── nginx.conf          # Config Nginx
```

## 🧩 Technologies
- React 19
- Vite
- Sass
- Socket.io-client
- Nginx (prod)

## 📦 Lint & format
```bash
pnpm lint
```

## 🔗 API
L'URL de l'API est configurable via `VITE_API_URL`.

---
Pour toute question, voir le README du backend ou contacter l'équipe.