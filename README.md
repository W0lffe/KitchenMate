# KitchenMate

## Goal
To create a simple program to create and manage recipies, and create dishes out of those components. Also to be able to create a shopping list based on all the products and their quantities in those recipes/dishes.

## State of Project

The project is currently in a solid and stable state, with application architecture and consistent styling throughout. It features a complete navigation system, modals, and forms for user authentication (login/signup) as well as for creating dishes, recipes, and basket items. Basic core CRUD (Create, Read, Update, Delete) functionality is fully implemented and operational locally for all main entities: recipes, dishes, and basket entries. Additionally, the app includes basic filtering and sorting capabilities to enhance usability. State management is efficiently handled through React's Context API combined with reducer functions, providing a maintainable foundation for future development.

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

#### Stage 3 
    Backend Functionality
- [x] GET
    - [x] Basket
    - [x] Recipes
    - [x] Dishes
    - [x] User Authentication
- [ ] POST
    - [ ] Basket
    - [ ] Recipes
    - [ ] Dishes
    - [x] New User
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
    - [ ] Error Handling
    - [ ] Polishing
- Testing
    - [ ] Testing on different devices
    - [ ] Bug fixes
    - [ ] Testing of components
- Deployment
    - [ ] Deploying first version to Firebase


#### Stage 5
    Implementing and testing new visions for app
- Front-End
    - [ ] Sections for creation modals
        - NOTE: Idea is to traverse through sections like Basic Info -> Ingredients -> Steps etc. 
                Instead of showing all things at once.
    - [ ] Possibility to show whole recipe in dish creation instead of just recipe name
    - [ ] Recipe scalability feature
    - [ ] Public recipe bank, visible for every user
    - [ ] Utilizing localStorage for saving basket with obtained items
    - [ ] Creating a homepage
    - [ ] Dish creation image preview
    - [ ] Modular dispatch functions


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

- [ ] Connect front-end to backend

## Backend

### Functionality

- [x] GET
    - [x] basket
    - [x] recipes
    - [x] dishes
- [ ] POST
    - [ ] basket
    - [ ] recipes
    - [ ] dishes
    - [x] userAPI (handles login and signup)
- [ ] DELETE
    - [ ] basket
    - [ ] recipes
    - [ ] dishes
- [ ] PUT
    - [ ] basket
    - [ ] recipes
    - [ ] dishes

