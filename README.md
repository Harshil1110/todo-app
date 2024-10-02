Frontend setup:
- open the file in vs code and open the terminal now write below command for starting the frontend:-
- command : npm run dev
- After running this command paste  http://localhost:5173/ this url on the browser and you will see the login screen.

Backend Setup:
- open the terminal and write below command:
- command: cd backend
- After this command write below command:
- command: nodemon index.js

- Details about the tools and libraries used:

- Tools:
- vs code: A free, open-source code editor by Microsoft, known for its versatility, extensions, and powerful features for developers.
- Postman: A widely-used API development platform that simplifies creating, testing, and documenting APIs with an intuitive interface and powerful tools.

- Library:
- react-hook-form: Efficient form handling and validation for React applications.
- react-icons: Collection of popular icons as React components.
- react-router-dom: Declarative routing library for React web applications.
- bcrypt: Library for hashing passwords securely in JavaScript.
- cors: Middleware for handling Cross-Origin Resource Sharing in Node.js.
- dotenv: Loads environment variables from a .env file into process.env.
- express: Minimalist web framework for Node.js, building web applications.
- jsonwebtoken: Library for generating and verifying JSON Web Tokens.
- mongoose: MongoDB object modeling tool for Node.js.
- nodemon: Tool for automatically restarting Node.js server on file changes.

Challenges faced and decisions made during the project:

Challenge: Handling Middleware in Express.js

One of the significant challenges encountered during the project was managing middleware in our Express.js application. Middleware functions are crucial as they process requests before they reach the route handlers, but improper handling can lead to various issues.
