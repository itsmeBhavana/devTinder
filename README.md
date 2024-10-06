# Express
- Fast, unopinionated, minimalist, web framework for node.js


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