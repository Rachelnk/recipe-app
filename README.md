# recipe-app
#### This application allows users to search for recipes, add and delete recipes to their favorite list.

# Prerequisites:
  * A [Spoonacular API key](https://spoonacular.com/food-api) for the recipe API
  * An account on [ElephantSQL](https://www.elephantsql.com/) for the database
  * Install node.js and npm

## Installation Instructions
1. Clone the repository
    *  `$ git clone remote URL`
    *  `cd recipe-app`

2. Setting up backend:
   
   * Navigate to backend directory: `cd backend`
   * Install the necessary packages: `npm install`
   * Spoonacular API: Add the api key to the API_KEY variable in the .env file
   * ElephantSQL Setup:
        1. Create a new database instance on ElephantSQL.
        2. Copy the connection string provided by ElephantSQL.
   * Prisma Setup:
      * Replace the DATABASE_URL in the .env file with your ElephantSQL connection string.
      * Initialize Prisma and generate the Prisma client:
          `npx prisma init`
          `npx prisma generate`
    * Start the backend server:
          `npm start`

   3. Setting up the Frontend:

      * Navigate to the frontend directory:
         `cd frontend`
       * Install the necessary packages:
         `npm install`
       * Start the frontend development server:
          `npm run dev`