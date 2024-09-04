# Product Management Kuka Backend APIs

This project provides a basic API for user authentication and product management using Node.js, Express.js, and MongoDB. It includes endpoints for user sign-up, sign-in, and product operations.

## Features

- **User sign-up** and **sign-in** with JWT authentication

- **Add a Product**: Create and manage product details including name, category, code, description, size, wood type, finish type, and price.
- **Retrieve Products**: Fetch a list of all products.
- **Create variant**: Add a variant to an existing product.
- **Show variant**:Display detailed information about the main product and its variants.
- **Apply Discounts**: Apply a percentage discount to a product's price.
- **Edit Products**: Edit product details and update images.
- **Remove Products**: Soft delete (remove) products, making them invisible in the product list.
- **Restore Products(Put Back)**: Restore previously removed products.
- **Permanently Delete Products**: Permanently delete a product from the database.
- **Send Notifications via email**
- **Add Review for a product:** Add a review to a product, including a star rating, description, and images.
- **Retrieve Product reviews:** Retrieve all reviews associated with a product.
- **Add Item to Cart**: Add products to a user's cart with specific variants and quantities.
- **Retrieve Cart Items**: Fetch the cart items for a specific user, including product details and variants.
- **Create new coupon codes**: Add new coupon codes with details like discount percentage, expiry date, and validity status.
- **Retrieve all coupon codes or a specific coupon by code**: Implement an endpoint to fetch all coupon codes.
- **Update existing coupon codes (e.g., mark as invalid, change expiry date)**: Implement an endpoint to update coupon code details.
- **Delete coupon codes**: Implement an endpoint to remove a specific coupon code from the system.


# User API Endpoints 

## User Endpoints

### Sign Up
- **URL:** `http://localhost:6000/api/user/signup`
- **Method:** `POST`
- **Description:** Registers a new user.
- **Request Body:**
  ```json
  {
    "username": "string",
    "email": "string",
    "password": "string"
  }

### Sign In

 **URL:** `http://localhost:6000/api/user/signin`

**Method:** `POST`

**Description:** Authenticate a user and return a JWT token.

**Request Headers:**
- Content-Type: `application/json`

**Request Body:**
```json
{
  "email": "string",
  "password": "string"
}
```
# Product API Endpoint

## Upload a Product
### Product 
- **URL:** `http://localhost:6000/api/product`
- **Method:** `POST`


### Form Data
The request must be sent as `form-data` and include the following fields:

- **productName** (string, required): The name of the product.
- **productCategory** (string, required): The category of the product.
- **productCode** (string, required): A unique code for the product.
- **smallDescription** (string, required): A brief description of the product.
- **detailedDescription** (string, required): A detailed description of the product.
- **productSize** (string, required): The size of the product.
- **productWoodType** (string, required): The type of wood used for the product.
- **finishType** (string, required): The type of finish applied to the product.
- **productPrice** (number, required): The price of the product.
- **images** (file, multiple, up to 10 files): Upload one or more image files of the product.


## Retrieve All Products

### Description
Retrieves a list of all products from the database.
### Product 
- **URL:** `http://localhost:6000/api/product`
- **Method:** `GET`


## Add Variant to a Product

**URL:** `http://localhost:6000/api/product/:mainProductName/variant`

**Method:** `POST`

**Description:** Adds a variant to an existing product by providing variant details and uploading images.


### Body

- `variantName` (string): Name of the variant.
- `productSize` (string): Size of the product.
- `productWoodType` (string): Wood type used.
- `finishType` (string): Finish type of the product.
- `productPrice` (number): Price of the variant.

### Responses

- **201 Created:** The variant was successfully added.
- **404 Not Found:** The main product was not found.
- **500 Server Error:** An error occurred on the server.

## Show Variants of a Product

**URL:** `http://localhost:6000/api/:productName/variants`

**Method:** `GET`

**Description:** Retrieve all variants associated with a specified main product.

### Responses

- **200 OK:** Returns the main product and its associated variants.
- **404 Not Found:** The specified main product was not found.
- **500 Server Error:** An error occurred on the server.

### Apply Discount to a Product
**Method:** `PATCH`
- **URL**: ` http://localhost:6000/api/product/:productId/discount`

- **Description**: Applies a percentage discount to the product price.
- **Request Body**:
```
{
  "discountPercentage": 10
}
```
- **Response**: Returns the updated product with the discounted price.

### Edit a Product

- **Endpoint**: `PUT /:productId/edit`
- **Description**: Edits product details and updates images.
- **Request Body**:
  - `productName` (string): The name of the product.
  - `productCategory` (string): The category of the product.
  - `productCode` (string): The code of the product.
  - `smallDescription` (string): A brief description of the product.
  - `detailedDescription` (string): A detailed description of the product.
  - `productSize` (string): The size of the product.
  - `productWoodType` (string): The wood type of the product.
  - `finishType` (string): The finish type of the product.
  - `productPrice` (number): The price of the product.
  - `images` (array of files): Array of images to upload (max 4).
- **Response**: Returns the updated product.

### Soft Delete (Remove) a Product

- **Endpoint**: `PATCH /:productId/remove`
- **Description**: Soft deletes a product, making it invisible in the product list.
- **Response**: Returns the removed product.

### Restore a Removed Product

- **Endpoint**: `PATCH /:productId/restore`
- **Description**: Restores a previously removed product.
- **Response**: Returns the restored product.

### Permanently Delete a Product

- **Endpoint**: `DELETE /:productId/delete`
- **Description**: Permanently deletes a product from the database.
- **Response**: Returns a success message indicating that the product has been deleted.


# Contact API Endpoint

This API endpoint allows users to submit a contact form, which sends an email to the specified email address.

## API Endpoint



### Contact
- **URL:** `http://localhost:6000/api/contact`
- **Method:** `POST`
- **Description:** Handles contact form submissions and sends an email with the submitted details..
**Request Body:**

The request body should be in JSON format and include the following fields:
- `name` (string): The name of the person submitting the form.
- `email` (string): The email address of the person submitting the form.
- `message` (string): The message/content of the contact form.

**Example Request:**

```json

{
  "name": "Chetan Mendhe",
  "email": "surajmendhe498@gmail.com",
  "message": "I am interested in your web development services. Please provide more information."
}

```
**Response:**

```json
{
  "message": "Email sent successfully"
}
```

# Review Product EndPoints
## Add a review to a product.

#### POST `http://localhost:6000/api/product/:productId/review`

The request must be sent as form-data and include the following fields:


  - `stars` (Number) - The rating of the product (1-5)
  - `reviewDescription` (String) - The description of the review
- `images`: Up to 4 image files

- **Response**: 
  - `201 Created` - Returns a success message and the created review
  - `404 Not Found` - Product not found
  - `500 Internal Server Error` - Server error

  ## Retrieve all reviews for a product.

#### GET `http://localhost:6000/api/product/:productId/reviews`


- **Response**:
  - `200 OK` - Returns an array of reviews
  - `404 Not Found` - No reviews found for this product
  - `500 Internal Server Error` - Server error


  # Cart API Endpoints

### Add Item to Cart

- **URL**: `http://localhost:6000/api/cart/add`
- **Method**: `POST`
- **Description**: Adds a product to the user's cart. If the product with the specified variant already exists in the cart, the quantity is updated.

**Request Body**:
```json
{
  "userId": "string",
  "productId": "string",
  "variantId": "string", // Optional
  "quantity": "number"
}

```

### Retrieve Cart Items

- **URL:** `http://localhost:6000/api/cart/:userId`
- **Method:** `GET`
- **Description:** Retrieves the cart items for the specified user.

#### URL Parameters

- **userId**: The ID of the user whose cart is being retrieved.

# Coupon Code API

This is a Node.js and Express application that provides an API for managing coupon codes. The API allows you to create, read, update, and delete coupon codes stored in a MongoDB database.

## Features

- Create new coupon codes
- Retrieve all coupon codes or a specific coupon by code
- Update existing coupon codes (e.g., mark as invalid, change expiry date)
- Delete coupon codes


## Endpoints

### 1. Create a New Coupon

- **URL**: `http://localhost:6000/api/coupons`
- **Method**: `POST`
- **Description**: Creates a new coupon.
- **Request Body**:
  - `code` (string, required): The unique code for the coupon.
  - `expiryDate` (Date, required): The expiration date of the coupon.
  - `discountAmount` (number, required): The discount amount for the coupon.
- **Response**:
  - `201 Created`: The newly created coupon.
  - `500 Internal Server Error`: An error message if the coupon could not be created.

**Example Request**:
```json
{
  "code": "SAVE20",
  "expiryDate": "2024-12-31",
  "discountAmount": 20
}
```
### 2. Get All Coupons

- **URL**: `http://localhost:6000/api/coupons`
- **Method**: `GET`
- **Description**: Retrieves all available coupons from the database.
- **Response**:
  - **200 OK**: Returns an array of all coupons in the database.
  - **500 Internal Server Error**: An error message if the coupons could not be retrieved.

### 3. Get a Coupon by Code

- **URL**: `http://localhost:6000/api/coupons/:code`
- **Method**: `GET`
- **Response**:
  - **200 OK**: Returns the coupon with the specified code.
  - **404 Not Found**: If no coupon is found with the specified code.
  - **500 Internal Server Error**: An error message if the coupon could not be retrieved.

**Example Request**:
```http
GET /api/coupons/SAVE20
```

### 4. Update a Coupon

**Endpoint:** `http://localhost:6000/api/coupons/:code`
- **Method**: `PUT`


#### Request Body

The request body should contain the updated coupon details in JSON format. For example:

```json
{
  "discount": 20,
  "expiresAt": "2024-12-31"
}
```
### 5. Delete a Coupon

**Endpoint:** `http://localhost:6000/api/coupons/:code`
- **Method**: `DELETE`



## Set Up Environment Variables

Create a `.env` file in the root directory of your project and add your environment variables. Below is an example `.env` file:

**Example `.env` file:**
```env

PORT=6000
MONGO_URI=mongodb://localhost:27017/defaultdb
SecretKey=your_jwt_secret_key

EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-email-password



