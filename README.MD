# JOB TRACKER

JOB TRACKER is an app to track your job applications.

Check [Live Demo](https://jobtracker-pqwp.onrender.com/) (The app may take some time to load for first time as render puts inactive apps to sleep)

[Backend](https://jobtracker-api-5fv4.onrender.com/)

## Back-end

- Built with Node/Express and MongoDB.

- Provides API endpoint for retrieving, creating,editing and deleting jobs.

- User authentication and authorization done using JWT tokens.

- Error handling with custom classes.

- Uses third-party libraries for input sanitization and security.(Helmet, xss-clean)

- API Documentation using Swagger

![Swagger](/client/src/assets/screenshots/swagger.jpg?raw=true)

## Front-end

- Built with React, Redux-Toolkit and Styled-components.

### Landing Page

![Landing Page](/client/src/assets/screenshots/landing.jpg?raw=true)

### Register/Login

![Register](/client/src/assets/screenshots/register.jpg?raw=true)
![Login](/client/src/assets/screenshots/login.jpg?raw=true)

### Dashboard

![Dashboard](/client/src/assets/screenshots/home.jpg?raw=true)

### Add Job

![Add New](/client/src/assets/screenshots/addjob.jpg?raw=true)

## Setup

To setup locally

- Clone repo.

### Back-end Setup

- Set mongodb URI,jwt key and jwt lifetime(eg:30d) in `.env` file

```
DB_URI=
JWT_SECRET=
JWT_LIFETIME=
```

```
cd server
npm install
npm run devstart
```

### Front-end Setup

```
cd client
npm install
npm run dev
```
