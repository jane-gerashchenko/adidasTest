# Adidas test

To install packages use npm install command. To run the script use npm run cypress:open command.

## Requirement:
- Open https://www.adidas.co.uk/men-shoes
- Click on any product so this will navigate you to the Product Details Page (aka PDP)
- On PDP page, mock the API calls /availability and /personalizationengine.
- Choose any size.
- Click on "Add To Bag" button.
- By mocking the API call /items modify the "Total Product Cost" information as 100.
- Verify the title of the pop up is "Successfully Added To Bag!"

## Implemented:
Success flow for above requirements using [Cypress](https://www.cypress.io/)
