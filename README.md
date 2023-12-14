There are two main folders, one for backend and one for frontend.
To run the project: -
1. For backend
   a. cd backend
   b. npm i
   c. npm run dev
2. For frontend
   a. cd frontend
   b. remove @mui/styles dependency from package.json (as it will cause conflicts)
   c. npm i
   d. npm i @mui/styles --force
   e. npm start
   
NOTE - 1. Open different terminals to run both backend and frontend
       2. Make sure to install mongoDB compass
          Here is the link to download:- https://www.mongodb.com/try/download/community
