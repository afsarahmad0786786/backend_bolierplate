# Todo Task List - CRUD API

This Node.js project provides a CRUD API for managing a employee  list.

## Table of Contents

- [Introduction](#introduction)
- [Requirements](#requirements)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Setup](#setup)
- [Database Schema](#database-schema)
- [Usage](#usage)

## Introduction

The Employee List project is a Node.js-based API allowing users to perform CRUD operations (Create, Read, Update, Delete) on employee in a employee table list. The API serves as an efficient way to manage employee.

## Requirements

- Node.js (Minimum version 12. and above*)

## Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/afsarahmad0786786/backend_bolierplate.git
    ```

2. Copy the environment variables file:

    ```bash
    cp .env.example .env
    ```

## Environment Variables

Update the `.env` file with the following details:

- **MONGO_URI**: Add your MongoDB URL here.
- **JWT_TOKEN**: Set your JSON Web Token secret.

## Setup

1. Install project dependencies:

    ```bash
    npm install
    ```

## Database Schema

### Employee and User Schema

The `Employee` schema represents the structure of a employee list in the database. and `User` schema reresents the structure of user list in the database.

#### Attributes

- `name`: Unique identifier for the task.
- `email`: email of the employee.
- `dob`: dob of the employee.
- `designation`: designation of the employee
- `education`: education of the employee.

## Swagger

### How to access swagger

- The swagger will be run on `http://localhost:8080/api-docs/`

## Usage

Start the server:

```bash
npm start