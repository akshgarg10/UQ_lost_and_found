# UQ Lost & Found

Cloud-hosted web app for browsing and managing lost/found items across UQ
campuses. Students and staff can post items with location/time details, view
recent listings, and remove resolved entries.

## Features
- Item management: create, view, delete.
- Rich metadata: "found at", "placed at", description, quantity, timestamp.
- Basic authentication: sign up and login (local credentials).
- Cloud-ready deployment: containerized frontend/backend, Kubernetes manifests,
  probes, autoscaling, and rolling updates.

## Tech Stack
- Frontend: React (CRA), Tailwind CSS, NGINX (static hosting).
- Backend: Node.js, Express, Mongoose.
- Database: MongoDB Atlas.
- Infra: Docker, GKE Autopilot, GKE Ingress, Artifact Registry.

## Architecture (High Level)
1. Browser -> GCP HTTP(S) Load Balancer -> GKE Ingress.
2. Ingress routes:
   - `/` -> `frontend-svc` (NGINX serving CRA build).
   - `/api/*` -> `api-svc` (Express).
3. API performs CRUD on MongoDB Atlas over TLS.
4. Kubernetes health checks, HPA autoscaling, and PDB ensure reliability.

## Local Development
### Prerequisites
- Node.js 18+ (or use Docker)
- Docker + Docker Compose

### Run with Docker Compose
From `uq_lost_and_found/`:
```
docker compose up --build
```
Services:
- Frontend: http://localhost:8080
- Backend: http://localhost:3000

### Run Backend Locally
From `backend/`:
```
npm install
npm run devStart
```

### Run Frontend Locally
From `frontend/`:
```
npm install
npm start
```

## Environment Variables
### Backend
Create `backend/.env`:
```
MONGO_URI=mongodb+srv://<user>:<password>@<cluster>/<db>
ALLOWED_ORIGINS=http://localhost:8080
PORT=3000
```

### Frontend
The frontend reads the API base at build time:
```
REACT_APP_API_BASE=http://localhost:3000
```
When using Docker Compose, this is set in the build args.

## API Endpoints
Base URL: `/api`
- `GET /reviewItems` -> list all items
- `POST /createItems` -> create item
- `DELETE /deleteItems/:id` -> delete item
- `POST /signin` -> create user
- `POST /login` -> login user

Sample requests are available in `backend/src/routes/route.rest`.

## Kubernetes Deployment
Manifests are in `k8s/`:
- `namespace.yaml`
- `frontend.yaml`
- `backend.yaml`
- `ingress.yaml`
- `api-hpa.yaml`
- `api-pdb.yaml`
- `secret.yaml`

Apply (example):
```
kubectl apply -f k8s/namespace.yaml
kubectl apply -f k8s/secret.yaml
kubectl apply -f k8s/backend.yaml
kubectl apply -f k8s/frontend.yaml
kubectl apply -f k8s/ingress.yaml
kubectl apply -f k8s/api-hpa.yaml
kubectl apply -f k8s/api-pdb.yaml
```

## Cost Notes (GCP)
Observed usage during a small student project was low. A modeled always-on dev
setup (24x7, no credits) was estimated around A$50–120/month depending on load.

## Security Notes
- Passwords are stored in plaintext for simplicity in this assignment.
  For production use, add hashing (bcrypt/argon2), auth tokens, and input
  validation.
- Rotate any credentials committed to source control.

## License
For coursework use. Add a license if publishing publicly.

