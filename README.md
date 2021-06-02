# digiKIT

"digiKIT" is an e-commerce app to demonstrate how to put "full-stack" development together. It contains the basic CRUD for products, shopping cart, and making orders, except actual purchase.

## More Information

[Project introduction on my website](https://cyishere.dev/portfolio/digikit)

## Tech Stack

**Backend:**

- Node.js / Express.js
- MongoDB

**Frontend:**

- React
- Redux
- styled-components
- Storybook

## Features

- Filter products by category
- Filter products by brand
- Add product to shopping cart
- Checkout the shopping cart
- Add/update shipping (user's) information
- Confirm orders
- Cancel orders
- Manage category in admin panel
- Manage products in admin panel
- View/update order status in admin panel
- View user information in admin panel

## Lessons Learned

I've learned these four major features below by making this project, please read [my article](https://cyishere.dev/portfolio/digikit) for more details about these.

- Error handling
- Logic of auth
- Logic of Shopping Cart (with Redux)
- Protection of routes

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`MONGO_URI` - The uri of your MongoDB.

`USER_ROLE_ADMIN` - A string to specify the admin role of user.

`USER_ROLE_BASIC` - A string to specify the basic role of user.

`SECRET` - The app's secret for jwt token.

## Run Locally

Clone the project

```bash
  git clone https://github.com/cyishere/digikit
```

Go to the project directory

```bash
  cd digikit
```

Install dependencies

```bash
  cd frontent
  yarn install

  cd server
  yarn install
```

Start the server

```bash
  cd frontent
  yarn start

  cd server
  yarn dev
```

## Screenshots

![App Screenshot](https://via.placeholder.com/468x300?text=App+Screenshot+Here)

Create this file on [readme.so](https://readme.so/).
