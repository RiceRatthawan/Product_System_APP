# ระบบจัดการรายการสินค้า
- สามารถ เพิ่ม ลบ แก้ไข รายการสินค้า 
- ค้นหาสินค้าด้วยชื่อหรือหมวดหมู่
- แสดงรายการสินค้าทั้งหมดพร้อมราคาทั้งหมดของสินค้าที่แสดงอยู่ในหน้าปัจจุบัน
- รองรับการทำงานกับฐานข้อมูล MySQL
  
## Requirement
- **Node.js**: v20.18.0
- **npm**: 10.9.0
```
node -v   # This will display the version of Node.js
npm -v    # This will display the version of npm
```
## Install
```
git clone https://github.com/RiceRatthawan/Product_System_APP.git
```
- **MySQL Database**
  1. Create a database named `mysql_db`
  2. Create a Products Table
     ```
     CREATE TABLE products (
        id INT PRIMARY KEY,
        product_name VARCHAR(45) NOT NULL,
        category VARCHAR(45) NOT NULL,
        price FLOAT NOT NULL
      );
     ```
  3. Import `ProductsData.csv` file from resource folder into products table
  4. View Products Table
     ```
     SELECT * FROM mysql_db.products;
     ```
  
 - **Backend Setup**: Go to `backend` folder
```
# Install
npm install express nysql2 cors
# Run
node index.js
```
- **Fronend**: Go to `product-system-app` folder
```
# Install
npm install -g @angular/cli
# Run
ng serve
```
## API Documentation
- **Base URL**: 
```http://localhost:3000/api```

- **Endpoints**
  1. Get all products
     - Method: `GET`
     - Endpoint: `/products`
     - Description: Fetches all products from the database.
     - Response:
       ```
       [
         {
            "id": 101,
            "product_name": "32GB MicroSD Card",
            "category": "Electronics",
            "price": 290
          },
          {
            "id": 102,
            "product_name": "4K Ultra HD Smart TV",
            "category": "Electronics",
            "price": 9999
          },
          ...
        ]
      ```
  2. Get all products
     - Method: `GET`
     - Endpoint: `/products/:id`
     - Description: Fetches a single product by its ID.
     - Path Parameter:
        - `id` (integer): ID of the product to retrieve.
     - Response:
       ```
       [
         {
            "id": 101,
            "product_name": "32GB MicroSD Card",
            "category": "Electronics",
            "price": 290
         }
        ]
      ```
