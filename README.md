# KitchenMate

## Goal
To create a simple program to create and manage recipies, and create dishes out of those components. Also to be able to create a shopping list based on all the products and their quantities in those recipes/dishes.

## State of Project

Working version is live on Firebase. All initially planned features have been implemented and are currently being refined for improvements. The app has a stable architecture and consistent styling, functioning properly on both large screens and mobile devices (with further styling adjustments planned).

It includes basic login functionality and core CRUD operations for recipes, dishes, and basket items. State management is handled via React Context, with reducers, states, and refs for efficient control. The frontend communicates with the backend through a fully functional REST API, which has been tested via Postman and is currently running locally on my server for testing purposes.

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

#### Stage 4 **PARTIALLY COMPLETED**
    Final Integration & Testing
- Front-End
    - [x] Connecting front-end to backend
    - [ ] Optimizing styling 
        - **POSTPONED**
    - [x] Error Handling 
    - [x] Polishing
- Testing
    - [ ] Testing on different devices
        - **POSTPONED**
    - [x] Bug fixes
    - [ ] Testing of components 
        - **POSTPONED**
- Deployment
    - [x] Deploying first version to Firebase


#### Stage 5
    Implementing and testing new visions for app
- Front-End
    - [x] Sections for creation modals
    - [ ] Possibility to show whole recipe in dish inspection instead of just recipe name
    - [x] Recipe scalability feature
    - [ ] Public recipe bank, visible for every user
    - [ ] Creating a homepage
    - [ ] Dish creation image preview
    - [x] Implement useReducer for local data updating
    - [x] Delete confirmation
    - [x] Toasts!
    - [ ] Real user authenticating, tokens
    - [x] Modular function for toasts
    - [ ] More details to recipe creation
        - Like category, optional heat for oven/sous-vide
        - Time per instruction step
    - [x] Error handling for dishes, that contain a recipe that has been deleted
  - Backend
    - [x] Checking product duplicates/units
        - Work In Progress, currently only checks if product names matches and combines quantity, does not consider units yet!
    - [ ] Re-arrange ID's when deleting items from basket
    
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

