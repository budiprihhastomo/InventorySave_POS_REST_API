# Inventory Save POS (REST API)

[![N|Solid](https://cldup.com/dTxpPi9lDf.thumb.png)](https://nodesource.com/products/nsolid)

[![Build Status](https://travis-ci.org/joemccann/dillinger.svg?branch=master)](https://travis-ci.org/joemccann/dillinger)

# Introduce
Inventory Save POS is an API service created using Node.JS and Express. This service is created for the purpose of providing data exchange services that contain data for the purposes of the POS application.

  - Free access API service used for POS application data exchange
  - Created using the JS framework, Express with Node.JS
  - etc.

# Prerequiste

  - Node.js - Download and Install Node.js - Simple bash script to manage multiple active node.js versions.
  - Nodemon - Download and Install Nodemon - nodemon is a tool that automatically restarting the node application when file changes in the directory are detected.

Markdown is a lightweight markup language based on the formatting conventions that people naturally use in email.  As [John Gruber] writes on the [Markdown site][df1]
### Configuration
> - Basic Configuration
> - Structured
> - Input Validation
> - File Upload (Image + Validation)
> - Authorization with JWT
> - Redis Implementation

### Installation

Inventory Save POS requires [Node.js](https://nodejs.org/) v8+ to run.

Install the dependencies and start the server.

```sh
$ git clone https://github.com/budiprihhastomo/InventorySave_POS_REST_API.git
$ cd InventorySave_POS_REST_API
$ npm install
$ npm start
```

### Plugins

Inventory Save POS is currently extended with the following plugins. Instructions on how to use them in your own application are linked below.

| Plugin |
|--------|
| @hapi/joi |
| @types/jsonwebtoken |
| bcryptjs |
| body-parser |
| cors |
| express |
| express-fileupload |
| fs |
| morgan |
| mysql |
| path |
| util |
| uuid |

#### API Route URL (Public)
| Plugin | Purpose | Method |
|--------|---------|--------|
| /api/v1/register | to register a new user | POST |
| /api/v1/login | to login a user | POST |
| /api/v1/categories | to list view categories of products | GET |
| /api/v1/products | to list view products | GET |
| /api/v1/categories/:id | to view detail category of products | GET |
| /api/v1/products/:id | to view detail product | GET |
#### API Route URL : Need Authorization (auth-token Header)
| Plugin | Purpose | Method |
|--------|---------|--------|
| /api/v1/categories | to create a category of product | POST |
| /api/v1/categories/:id | to update a category | PATCH |
| /api/v1/categories/:id | to delete a category | DELETE |
| /api/v1/products | to create a category of product | POST |
| /api/v1/products/:id | to update a product | PATCH |
| /api/v1/products/:id | to delete a product | DELETE |

License
----

© Budi Prih Hastomo
