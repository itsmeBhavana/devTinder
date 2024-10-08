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

# Howework

- Why are we adding package-lock.json and package.json to git
- difference between app.use and app.all
