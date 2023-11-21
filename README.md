# Demoblaze.com test automation
A cypress test automation project for demoblaze.com

# Requirements
- Node version 18 or above
  - MacOS: brew install node
  - Ubuntu: sudo apt install nodejs
- Chrome version 119 or above
- Cypress 12 or above
- Cucumber 4 or above

# SetUp
1. Clone the project in your machine
2. Go to the project directory
3. In the project directory run "npm install" in your terminal to install the dependencies needed
4. You can have a look at the tests inside cypress/integration/ folder

# Run the tests
1. In the terminal run "npx cypress open" to open up cypress UI (it might take some time if it is the first time)
2. Once in the Cypress menu you can select any of the .spec.js files to run their test suites.

# Important comments:
In the feature file successful-purchase.feature there is a test that requires login with a user to place an order. This user data is retrieved from cypress/fixtures/credentials.json. The first time running the test maybe you need to change the value of "existingUser" in this json file to a different one. (You can use the user generated in the signup.feature test). Otherwise the site will not recognise the user as existing user and the test will fail.
