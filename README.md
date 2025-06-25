# KitchenMate

## Goal
To create a simple program to create and manage recipies, and create dishes out of those components. Also to be able to create a shopping list based on all the products and their quantities in those recipes/dishes.

## State of Project

First working version is published to Firebase hosting!

All initially planned functionalities have been implemented and manually tested. The application features a solid and stable architecture with consistent styling throughout. It includes a complete navigation system, modals, and forms for user authentication (login/signup), as well as for creating dishes, recipes, and basket items. Core CRUD (Create, Read, Update, Delete) functionality is fully operational for all main entities: recipes, dishes, and basket entries. Basic filtering and sorting capabilities are also in place to improve usability. State management is handled efficiently using React's Context API with reducer functions, ensuring a scalable and maintainable codebase. Backend functionalities are fully written and tested via Postman, and integration with the frontend is the final step before release. Further refinements will continue post-launch to enhance performance and user experience.

### Planned Stages of Development

#### Stage 1 **COMPLETED**
    App Structure & Basic Components

- Front-End
    - [x] Set up basic structure and styled view for the application
    - [x] Functionality to create user
- State Management
    - [x] Set up Context 
    - [x] Set up Utility Reducer and its actions
- Initial API Integration
    - [x] Creating a new user
    - [x] Authenticating user

#### Stage 2 **COMPLETED**
    Recipe & Dish Management

- Front-End
    - [x] Components and functionalities for
       - [x] Create, Read, Update
            - [x] Recipe 
            - [x] Basket
            - [x] Dish
- State Management
    - [x] Set up RecipeReducer
    - [x] Set up BasketReducer
    - [x] Set up DishReducer
- API Integration
    - [x] Implement CRUD
        - [x] Fetch
        - [x] Post
        - [x] Modify
        - [x] Delete

#### Stage 3 **COMPLETED**
    Backend Functionality
- [x] GET
    - [x] Basket
    - [x] Recipes
    - [x] Dishes
    - [x] User Authentication
- [x] POST
    - [x] Basket
    - [x] Recipes
    - [x] Dishes
    - [x] New User
- [x] DELETE
    - [x] Basket
    - [x] Recipes
    - [x] Dishes
- [x] PUT
    - [x] Basket
    - [x] Recipes
    - [x] Dishes

#### Stage 4 
    Final Integration & Testing
- Front-End
    - [x] Connecting front-end to backend
    - [ ] Optimizing styling
    - [x] Error Handling 
    - [x] Polishing
- Testing
    - [ ] Testing on different devices
    - [x] Bug fixes
    - [ ] Testing of components
- Deployment
    - [x] Deploying first version to Firebase


#### Stage 5
    Implementing and testing new visions for app
- Front-End
    - [ ] Sections for creation modals
        - NOTE: Idea is to traverse through sections like Basic Info -> Ingredients -> Steps etc. 
                Instead of showing all things at once.
    - [ ] Possibility to show whole recipe in dish creation instead of just recipe name
    - [ ] Recipe scalability feature
    - [ ] Public recipe bank, visible for every user
    - [ ] Creating a homepage
    - [ ] Dish creation image preview
    - [ ] Implement useOptimistic
    - [ ] Delete confirmation
    - [ ] Checking product duplicates/units
    - [x] Toasts!
    - [ ] Real user authenticating, tokens
    - [ ] Modular function for handleRequest with toasts, now its repeatitive in multiple components

# Backlog
## Front-end

### Components

- [x] Header

- [x] Login/Signup

- [x] Modal

- [x] Navigation
    - [x] NaviSection
    - [x] UserSection

- [x] MainContainer

- [x] List(wrapper for changing content between basketlist, recipelist, dishlist)
    - [x] Recipes
    - [x] Dishes
    - [x] Basket
    - [x] Toolbar (sorting and filtering)

- [x] RecipeCreation
    - [x] InfoSection
    - [x] IngredientForm / InstructionsForm

- [x] Product

- [x] Instruction

- [x] Recipe/Dish Card (wrapper)

- [x] DishCreation

### State Management

#### Context

- [x] Implement Context for the app

#### Hooks

- [x] Custom Hook: useIsMobile, to detect if user device is mobile

#### UtilityReducer

- [x] "SET_USER"

- [x] "SET_MODAL_STATE"

- [x] "SET_ACTIVE_SECTION"

- [x] "SET_NAVIGATION_STATE"

- [x] "SET_SLOGAN"

- [x] "SET_MOBILE" 

#### RecipeReducer actions

- [x] "SET_RECIPES"

- [x] "ADD_RECIPE"

- [x] "DELETE_RECIPE"

- [x] "SET_ACTIVE_RECIPE"

- [x] "MODIFY_RECIPE"

#### BasketReducer actions

- [x] "SET_BASKET"

- [x] "ADD_PRODUCTS"

- [X] "DELETE_PRODUCT"

- [x] "MODIFY_PRODUCT"

#### DishReducer actions

- [x] "SET_DISHES"

- [x] "SET_ACTIVE_DISH"

- [X] "ADD_DISH"

- [x] "DELETE_DISH"

- [x] "MODIFY_DISH"

### API Integration

- [x] fetchData
    - [x] basket
    - [x] recipes
    - [x] dishes
- [x] postData
    - [x] basket
    - [x] recipes
    - [x] dishes
- [x] modifyData
    - [x] basket
    - [x] recipes
    - [x] dishes
- [x] deleteData
    - [x] basket
    - [x] recipes
    - [x] dishes

- [x] authenticateUser
- [x] createNewUser

- [x] Connect front-end to backend

## Backend

### Functionality

- [x] GET
    - [x] basket
    - [x] recipes
    - [x] dishes
- [x] POST
    - [x] basket
    - [x] recipes
    - [x] dishes
    - [x] userAPI (handles login and signup)
- [x] DELETE
    - [x] basket
    - [x] recipes
    - [x] dishes
- [x] PUT
    - [x] basket
    - [x] recipes
    - [x] dishes

