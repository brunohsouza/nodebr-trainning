docker run \
    --name postgres \
    -e POSTGRES_USER=nodeadmin \
    -e POSTGRES_PASSWORD=node123 \
    -e POSTGRES_DB=heroes \
    -p 5432:5432 \
    -d \
    postgres

docker run --name adminer -p 8080:8080 -d --link postgres:postgres 

-- MONGODB

docker run \
    --name mongodb \
    -p 27017:27017 \
    -e MONGO_INITDB_ROOT_USERNAME=mongonode \
    -e MONGO_INITDB_ROOT_PASSWORD=mongonode \
    -d \
    mongo:4

docker run --name mongoclient -p 3000:3000 --link mongodb:mongodb -d mongoclient/mongoclient

docker exec -it mongodb mongo --host localhost -u mongonode -p mongonode --authenticationDatabase admin \
    --eval "db.getSiblingDB('heroes').createUser({user: 'mongonode', pwd: 'mongonode', roles: [{role: 'readWrite', db: 'heroes'}]})"