# Express

- Fast, unopinionated, minimalist, web framework for node.js
- next() is provided by express library that is the third argument of the callback function and is used to call the next route handler
- All the callback functions are also called as route handler/request handler/middleware

# Error Handling

- Good way to handle errors is to use try catch block Always
- Another alternate way is to use a middleware function addressing all routes app.use("/",(err,req,res,next)=>{})
- err,req,res,next ios the sequence of the parameters

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
- MongoDB fields have _id and __v created by mongodb itself
  
  ## Process to store data
  - create a free cluster
  - install mongoose
  - connect ur application to the db using connection string
  - create userSchema and userModel
  - create POST /signup API and add data to db
  - enclose all the db related code inside try block
  - Push some documents using API calls using Postman

# Howework

- Why are we adding package-lock.json and package.json to git
- difference between app.use and app.all
- What is __v in the Mogodb fields
- Read more on _id and __v
