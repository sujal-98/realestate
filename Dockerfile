# Frontend Stage
FROM node:20-alpine AS frontend

WORKDIR /frontend
COPY frontend/package*.json .  
RUN npm install --force
RUN npm install date-fns --force
RUN npm install lucide-react --force

COPY ./frontend .              
EXPOSE 5173

CMD ["npm", "run", "start"]

