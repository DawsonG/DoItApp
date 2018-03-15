# DoItApp
A simple todo list application written in React specifically for my portfolio.  It uses React, Redux, Sagas and React-DnD on the front end.  Styling is from Material-UI.

The backend uses NodeJs with Express and Postgres with Sequelize.

## View Online Demo
http://doit.dawsongoodell.com 

## Install Locally
There are two apps tied together by some common run scripts.

1) Install the API
```
cd doit-api
yarn install
```

2) Configure the Database
```
Open config/config.json and insert your own information over the development profile.
```

3) Install the Client
```
cd ../doit-client
yarn install
```

4) Install the run scripts and libraries
```
cd ../
yarn install
```

5) Run it (Migrations should auto-run on start)
```
yarn start
```