# Express

- Fast, unopinionated, minimalist, web framework for node.js
- next() is provided by express library that is the third argument of the callback function and is used to call the next route handler
- All the callback functions are also called as route handler/request handler/middleware
- express.json() middleware is given by express that converts all the JSON into JS objects when used as app.use(express.json());

  # Express Router

  - The best industry practise is to create greoup all the APIs and create different routers

# Error Handling

- Good way to handle errors is to use try catch block Always
- Another alternate way is to use a middleware function addressing all routes app.use("/",(err,req,res,next)=>{})
- err,req,res,next ios the sequence of the parameters

# Validators in schema

- validation function will be working by default only on creation APIs. For them to work on updation APIs, runValidators attribute should be added.
- Validators like type, default, required, minLength, maxLength, unique, lowercase, min, max, validate(), trim
- bcrypt is a package in npm that is used to encrypt our passwords and validate them.
  - More the number of salt rounds, tougher will be the password to break

# JWT Token

- JSON Web Token which is an encrypted way to store the information.
- It contains header, payload and signature.
- We hide the information in the payload
- JWT uses the signature to check if the token is valid or not
- jsonwebtoken is a good package to use

# Notes

- v1.2.3
  - 1 is major version
  - 2 is minor version
  - 3 is patch version
  - installing v1.2.4 from v1.2.3 is safe as it is just a patch change.
- ^4.19.2
  - automatically updates the package if there's any newer version of 4.x.x series
  - If there is no "^" symbol in the beginning, my project will always use 4.19.2
  - package.json does not give the exact version that is used in the project.
  - package-lock.json gives the exact version of the project that is being used

# MongoDB

- connection string points to the cluster
- We can have multiple db in a single cluster
- To connected to a particulat db, we add the db name to the end of the connection string in our code.
- It is very important that first we connect to the db and then only we listen to the server
  - It would be a pretty bad practise, if we are connected to the server but APIs are not working cause we're not connected to the db yet.
  - So, ALWAYS connect to your db and then call app.listen()
- MongoDB fields have \_id and \_\_v created by mongodb itself
- unique:true automatically indexes the collection. Otherwise, we have to use index:true

  ## Process to store data

  - create a free cluster
  - install mongoose
  - connect ur application to the db using connection string
  - create userSchema and userModel
  - create POST /signup API and add data to db
  - enclose all the db related code inside try block
  - Push some documents using API calls using Postman

# Pagination

- skip() and limit() are two very important functions in Mongodb
- skip() skips the first specified number of users
- limit() returns the specified number of users
  - /feed?page=1&limit=10 => .skip(0) & .limit(10)
  - /feed?page=2&limit=10 => .skip(10) & .limit(10)
  - /feed?page=3&limit=10 => .skip(20) & .limit(10)
  - Formula for skip is skip=(page-1)*limit;

# Howework

- Why are we adding package-lock.json and package.json to git
- difference between app.use and app.all
- What is \_\_v in the Mogodb fields
- Read more on \_id and \_\_v
- Difference between JS object and JSON
- Difference between PATCH and PUT
- optimizing using compound index
- $or in mongodb
