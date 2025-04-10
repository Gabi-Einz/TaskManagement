## Prerequisites  
Install docker  
Install docker-compose  
Use node v20.12.0
Install nestjs: npm install -g @nestjs/cli    

## Installation  

Execute the next commands:  
1- Download project: git clone https://github.com/Gabi-Einz/TaskManagement.git  
2- Switch to develop branch: git checkout develop  
3- Copy and paste ".env" file in the root folder of the project.  
4- Install dependencies: npm install  
5- Create redis and postgresql instances: docker-compose up -d  
6- Verify if redis and postgresql containers is ok: docker ps  
7- Execute migrations: npx prisma migrate dev --name init  
8- Execute SQL queries, insert mock users in postgresql database using file "_User__202504100054.sql"  
9- Start nestjs project: npm run start  

## How to use?  
1- import "thunder-collection_postman_TaskManagement.json" file using client like postman.  