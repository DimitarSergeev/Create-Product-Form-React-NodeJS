# Create-Product-Form-React-NodeJS

This is a product/garment creation form where basic parameters can be set and there is an option to add product varieties.

## 🛠 Technologies Used

- React.js
- Node.js
- Express.js
- MongoDB
- SweetAlert2
- CSS modules
- Cors
- Cloudinary 
- 💣💣💣
You need to set yours  
1. CLOUDINARY_API_KEY
2. CLOUDINARY_API_SECRET
3. CLOUDINARY_Name
- You need to set yours in .env on server!!!
- 💣💣💣

## Getting Started

***
 ### Client
1. git clone  https://github.com/DimitarSergeev/Create-Product-Form-React-NodeJS.git
2. cd client
3. npm i 

   --- to start app npm start --- 

***
***
### Server
 1. git clone https://github.com/DimitarSergeev/Create-Product-Form-React-NodeJS.git (if you haven't clone it already )
 2. cd server
 3. npm i 

   --- to start app npm start --- 
***
## Base URL
- Server : The Base URL for the API is: `http://localhost:3030` 
- React : `http://localhost:3000`

### Usage 💼

The form sends a request that looks like this: 
```
 {
    name: '',
    type: '', 
    products: [{
        img: 'dataURl',
        XS: '',
        S: '',
        M: '',
        L: '',
        price: '',
        code: '',
        images: [dataURls]
    } ...],
   descModel: '',
   productInfo: ''
 }
```
On the server, the information is processed by uploading the photos to cloudinary and returning an URL that is saved to the database . The base object looks like this:
```
{
  _id: ObjectId('655554w078ce00a635612350')
  "name": "Nike T32512",
  "type": "suits",
  "products": [
    {
      "img": "http://res.cloudinary.com/...",
      "XS": 10,
      "S": 10,
      "M": 10,
      "L": 10,
      "price": 120,
      "code": "1234",
      "images": [
        http://res.cloudinary.com/...,
        http://res.cloudinary.com/...,
        http://res.cloudinary.com/...
      ],
      "_id": {
        "$oid": "6415e410s8ce0aa63d612351"
      }
    }
  ],
  "descModel": "some description",
  "productInfo": "some product info",
  "__v": 0
}
```