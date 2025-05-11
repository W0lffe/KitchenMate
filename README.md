# KitchenMate

## Goal
To create a simple program to create and manage recipies, and create dishes out of those components. Also to be able to create a shopping list based on all the products and their quantities in those recipes/dishes.

## State of Project

The project is in its early stages but has a solid foundation in terms of app structure and styling. It includes a working navigation system, modal component, and forms for login and signup. Core recipe features such as creation, reading, updating, and deleting are fully functional locally.
State management is handled using React Context combined with useReducers, currently managing utility-related features such as navigation, modal visibility, and app slogans, as well as recipe-related features such as adding new recipes, tracking the currently active recipe, and managing the list of available recipes.

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
            - [x] Recipe 
            - [ ] Basket
            - [ ] Dish
- State Management
    - [x] Set up RecipeReducer
    - [ ] Set up BasketReducer
    - [ ] Set up DishReducer
- API Integration
    - [ ] Implement CRUD
        - [x] Fetch
        - [x] Post
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
    - [ ] Optimizing styling
    - [ ] Polishing
- Testing
    - [ ] Testing on different devices
    - [ ] Bug fixes
    - [ ] Testing of components
- Deployment
    - [ ] Deploying first version to Firebase


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

- [ ] DishCreation

### State Management

#### Context

- [ ] Implement Context for the app
    - [x] Work in Progress

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

- [ ] "ADD_ITEM"

- [ ] "DELETE_ITEM"

- [ ] "MODIFY_ITEM

#### DishReducer actions

- [x] "SET_DISHES"

- [x] "SET_ACTIVE_DISH"

- [ ] "ADD_DISH"

- [x] "DELETE_DISH"


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

