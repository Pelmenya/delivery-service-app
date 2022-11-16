* docker run -d -t --name delivery --rm -v %cd%/services/delivery:/app node:18
* docker exec -it delivery bash
* curl  -H "Content-Type: application/json" -X POST http://localhost:80
* docker network inspect delivery-service-app_default 
* docker compose -f docker-compose.dev.yml up --build
* docker rmi $(docker images -a -q)