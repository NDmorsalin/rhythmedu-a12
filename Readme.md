# [KhelaGor](https://khelagor-1602a.web.app) Toy Marketplace Backend

This repository contains the backend code for the [KhelaGor](https://khelagor-1602a.web.app) Toy Marketplace website. It provides the server-side functionality for managing user accounts, product listings, orders, and other related features.

## Getting Started

To set up the backend locally, follow these steps:

1. Clone the repository to your local machine:

   ```
   git clone git@github.com:programming-hero-web-course-4/b7a11-toy-marketplace-server-side-NDmorsalin.git
   ```

2. Install the necessary dependencies:

   ```
   cd b7a11-toy-marketplace-server-side-NDmorsalin
   npm install
   ```

3. Set up the database:

   - Create a MongoDB database instance and obtain the connection URL.
   - Rename the `.env.example` file to `.env` and update the `MONGODB_URI` variable with your database connection URL.

4. Start the server:
   ```
   npm start
   ```

The backend server should now be running locally on `http://localhost:5000`.

## Features

The [KhelaGor](https://khelagor-1602a.web.app) Toy Marketplace backend provides the following features:

- User can crete a new toy
- User can get all toys
- User can get a single toy
- User can update a toy
- User can delete a toy
- User can filter toys
- User can search toys
- API endpoints for interacting with the frontend

## Technologies Used

The backend is built using the following technologies and frameworks:

- Node.js: JavaScript runtime
- Express.js: Web application framework
- MongoDB: NoSQL database
- JWT (JSON Web Tokens): Authentication mechanism
- cors (Cross-Origin Resource Sharing): HTTP header for allowing cross-origin access

## Deployment

To deploy an Express.js application on Vercel, you can follow these steps:

1. Create an account on Vercel: Visit the Vercel website (https://vercel.com/) and create an account if you don't have one already.

2. Install Vercel CLI: Install the Vercel CLI globally by running the following command in your terminal:

   ```
   npm install -g vercel
   ```

3. Build your Express.js application: Make sure your Express.js application is ready for deployment. Ensure that you have a `package.json` file with the necessary dependencies and a `start` script to run your application.

4. Configure the deployment settings: Create a `vercel.json` file in the root directory of your project and add the following configuration:

   ```json
   {
     "version": 2,
     "builds": [
       {
         "src": "./index.js",
         "use": "@vercel/node"
       }
     ],
     "routes": [
       {
         "src": "/(.*)",
         "dest": "/",
         "methods": ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"]
       }
     ]
   }
   ```

5. Test your application locally: Run your Express.js application locally to ensure it's working as expected by executing the command:

   ```
   npm start
   ```

6. Login to Vercel CLI: Run the following command to authenticate with Vercel CLI and link your account:

   ```
   vercel login
   ```

7. Deploy your application: Run the deployment command to deploy your Express.js application to Vercel:

   ```
   vercel
   ```

8. Follow the prompts: Vercel CLI will guide you through the deployment process. It will ask for your permission to deploy, provide an option to set a name for your project, and may ask for other configuration details.

9. Wait for deployment: Vercel will build and deploy your Express.js application. Once the deployment is complete, it will provide you with a unique URL for your application.

10. Access your deployed application: Visit the URL provided by Vercel to access your deployed Express.js application.

By following these steps, you should be able to successfully deploy your Express.js application on Vercel. Remember to adjust the configuration and deployment settings as per your specific application requirements.
