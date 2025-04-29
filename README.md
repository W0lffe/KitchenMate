# KitchenMate

## Goal
To create a simple program to create and manage recipies, and create dishes out of those components. Also to be able to create a shopping list based on all the products and their quantities in those recipies/dishes.

## State of Project

The project is in its early stages but has a solid foundation in terms of app structure and styling. 
It includes a working navigation system, modal component, and forms for login and signup. 
State management is handled using React Context combined with useReducer, currently managing utility-related features such as navigation and modal visibility, and app slogans.
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

#### Stage 2 
    Recipe & Dish Management

- Front-End
    - [ ] Components and functionalities for
       - [ ] Create, Read, Update
            - [ ] Recipe
            - [ ] Basket
            - [ ] Dish
- State Management
    - [ ] Set up RecipeReducer
    - [ ] Set up BasketReducer
    - [ ] Set up DishReducer
- API Integration
    - [ ] Implement CRUD
        - [ ] Fetch
        - [ ] Post
        - [ ] Modify
        - [ ] Delete

#### Stage 3 
    Backend Functionality
- [ ] GET
    - [ ] Basket
    - [ ] Recipes
    - [ ] Dishes
    - [ ] User Authentication
- [ ] POST
    - [ ] Basket
    - [ ] Recipes
    - [ ] Dishes
    - [ ] New User
- [ ] DELETE
    - [ ] Basket
    - [ ] Recipes
    - [ ] Dishes
- [ ] PUT
    - [ ] Basket
    - [ ] Recipes
    - [ ] Dishes

#### Stage 4 
    Final Integration & Testing
- Front-End
    - [ ] Connecting front-end to backend
    - [ ] Testing of components
- Testing
    - [ ] Testing on different devices
    - [ ] Bug fixes

- Deployment
    - [ ] Deploying first version to Firebase


# Backlog
## Front-end

### Components

- [x] Header

- [x] Login/Signup

- [x] Modal

- [x] Navigation

- [ ] MainContainer

- [ ] RecipeList/ShoppingList (wrapper)

- [ ] RecipeForm

- [ ] Recipe/Dish Card (wrapper)

- [ ] DishCreation

### State Management

#### Context

- [ ] Implement Context for the app
    - [x] Work in Progress

#### UtilityReducer

- [x] "SET_USER"

- [x] "SET_MODAL_STATE"

- [x] "SET_ACTIVE_SECTION"

- [x] "SET_NAVIGATION_STATE"

- [x] "SET_SLOGAN"

#### RecipeReducer actions

- [ ] "SET_RECIPES"

- [ ] "ADD_RECIPE"

- [ ] "DELETE_RECIPE"

#### BasketReducer actions

- [ ] "SET_BASKET"

- [ ] "ADD_BASKET"

- [ ] "DELETE_BASKET"

#### DishReducer actions

- [ ] "SET_DISHES"

- [ ] "ADD_DISH"

- [ ] "DELETE_DISH"


### API Integration

- [ ] fetchData
    - [ ] basket
    - [ ] recipes
    - [ ] dishes
- [ ] postData
    - [ ] basket
    - [ ] recipes
    - [ ] dishes
- [ ] modifyData
    - [ ] basket
    - [ ] recipes
    - [ ] dishes
- [ ] deleteData
    - [ ] basket
    - [ ] recipes
    - [ ] dishes

- [x] authenticateUser
- [x] createNewUser

- [ ] Connect front-end to backend

## Backend

### Functionality

- [ ] GET
    - [ ] basket
    - [ ] recipes
    - [ ] dishes
    - [ ] userAuth
- [ ] POST
    - [ ] basket
    - [ ] recipes
    - [ ] dishes
    - [ ] newUser
- [ ] DELETE
    - [ ] basket
    - [ ] recipes
    - [ ] dishes
- [ ] PUT
    - [ ] basket
    - [ ] recipes
    - [ ] dishes

