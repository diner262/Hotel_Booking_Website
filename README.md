# Introduction

Xin chào thầy và các bạn,

# Getting Started

## Feature

- CRUD
- Validation
- Security
- Responsive
- User module + Admin module

## Requirement

- Nodejs >= 18.11
- MongoDBCompass >= 1.36

## Technologies

- NodeJS
- ExpressJS
- Handlebars
- Upload - Multer
- passport
- cookie/session
- flash
- CSS
- Boostrap 5
- MongoDB

## Installation

```
$ git clone https://gitlab.duthu.net/S52000895/website-hotel-booking-online-n3.git
$ cd website-hotel-booking-online-n3
```

## Endpoints

### HTML

#### Client Module

| HTTP Method | URL                            | Description       | Note             |
| ----------- | ------------------------------ | ----------------- | ---------------- |
| `GET`       | http://localhost:3030/home     | Home Page         |                  |
| `GET`       | http://localhost:3030/login    | Login Page        |                  |
| `GET`       | http://localhost:3030/register | Register Page     |                  |
| `GET`       | http://localhost:3030/room     | Booking Room Page |                  |
| `GET`       | http://localhost:3030/profile  | Profile Page      | Require to login |

#### Admin Module

| HTTP Method | URL                                    | Description       |
| ----------- | -------------------------------------- | ----------------- |
| `GET`       | http://localhost:3030/admin/dashboard  | Dashboard         |
| `GET`       | http://localhost:3030/admin/customers  | Manage Customers  |
| `GET`       | http://localhost:3030/admin/orders     | Manage Orders     |
| `GET`       | http://localhost:3030/admin/room_types | Manage Room Types |
| `GET`       | http://localhost:3030/admin/rooms      | Manage Room hotel |

### CRUD

#### Customer Service

| HTTP Method | URL                                                    | Description      |
| ----------- | ------------------------------------------------------ | ---------------- |
| `GET`       | http://localhost:3030/admin/customers                  | Customer Manager |
| `GET`       | http://localhost:3030/admin/customers/:username        | Customer Detail  |
| `GET`       | http://localhost:3030/admin/customers/update/:username | Customer Edit    |
| `POST`      | http://localhost:3030/admin/customers/update/:username | Customer Update  |
| `DELETE`    | http://localhost:3030/customers/delete/:username       | Customer Delele  |

#### Order Service

| HTTP Method | URL                                                 | Description |
| ----------- | --------------------------------------------------- | ----------- |
| `GET`       | http://localhost:3030/admin/orders/update/{orderId} |             |
| `GET`       | http://localhost:3030/orders/delete/{orderId}       |             |

#### Order Service

| HTTP Method | URL                                                       | Description |
| ----------- | --------------------------------------------------------- | ----------- |
| `GET`       | http://localhost:3030/admin/customers/update/{customerId} |             |
| `GET`       | http://localhost:3030/customers/delete/{customerId}       |             |
