###Hackaton

## Участники проекта

- **Напалков Никита** - Backend, Team Lead [https://github.com/SVEND-1]
- **Ким Богдан** — Backend [https://github.com/Legend8883]
- **Напалков Данил** — Frontend [https://github.com/daniiiiiiiiiiil]
- **Куланов Иван** — Frontend [https://github.com/pslgod1]
- **Корделяну Георгий** — Frontend [https://github.com/IMM0RR]

### Stack

### Backend
- **Spring Boot**, Spring AI, Spring Security, Spring JPA, Spring Validate, Spring Mail
- JWT, Postgres (с векторным поиском), Ollama, Kafka
- Mapstruct, Lombok
- Swagger (OpenAPI), Minio

### Frontend
- React, TypeScript
- HTML, CSS
- d3.j

### Требования

Для запуска проекта на Linux необходим установленный **Docker** и **Docker Compose**.

### Deploy

# Команды для запуска 
```bash
mkdir opt
cd opt 

git clone https://github.com/SVEND-1/Hackaton

cd Hackaton

docker compose up -d --build

docker exec ollama ollama pull gemma3:270m(или любую другую нейронку ollama,но поменять конфиг gemma3:270m)
```

## Обновление проекта
```bash
cd opt/Hackaton

docker compose down

git pull

docker compose up -d --build
```

## Остановить проект
```bash
cd opt/Hackaton

docker compose down
```
