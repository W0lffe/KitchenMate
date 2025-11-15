# 🧑‍🍳 KitchenMate

[KitchenMate](https://kitchenmate-efe45.web.app/) is a smart food service solution designed for home cooks and professionals who want to make life easier. It simplifies meal preparation through technology, offering convenient cooking support that saves time while delivering delicious results.

## 🚀 Features
- ✏️ Full CRUD for meals and lists
    - Recipes
    - Dishes
    - Basket

- 🧾 Recipe details page with ingredients and cooking steps

- 👥 Session-based user authentication

- 🖼️ Image uploads for dishes

- 🏠 React Router-powered homepage and application

- 📱 Responsive design – optimized for desktop and mobile users.

- 🚪 Protected data – only logged-in users can access their own data.

## 🧠 Tech Stack

- Frontend: ReactJS, React Router, TailwindCSS
- Backend: PHP (due to restrictions on server)
- Database: MariaDB (due to restrictions on server)
- Auth: Token-based (JWT) login system built with PHP (no frameworks, or third party providers)
- Hosting: Firebase Hosting

## 🧩 Future Plans

### Checkout my [Github Project](https://github.com/users/W0lffe/projects/3/views/6)!

1. Refactoring & Improvements
    - [ ] Reconstruct app from mostly conditional rendering to use React Router pages
    - [ ] Testing (Jest / Vitest)
2. Documentation
    - [x] JSDoc documentation
    - [x] PHPDoc documentation
3. Creation Improvements
    - [ ] New categories for recipes
    - [ ] \(Optional) Temperature inputs
    - [ ] Time tracking per instruction step
    - [ ] Rework product and instruction adding/removing in creation 
    - [ ] Tags
4. Inspection Improvements
    - [ ] Show recipes from dish inspection
5. Cooking Mode
    - [ ] Cooking Mode view
        - Opens up from recipe inspection
        - Requires time tracking for instruction steps
        - Includes timer, possibility to set steps done
6. Artificial Intelligence
    - [ ] Solution to ingredient/product unit mismatches when adding to basket
    - [ ] Generate recipes based on wanted ingredients
    - [ ] Nutrition estimates
7. Backend & Database
    - [x] Convert current JSON data to MariaDB
    - [ ] Python backend
    - [ ] Data export to Excel format or PDF
8. User Features
    - [ ] Community shared recipes (public)
    - [ ] User profile
    - [ ] Profile-based user experience (home cook vs professional)
9. Authentication & Security
    - [ ] Role-based permissions (admin, user)
    - [ ] Password reset and account recovery
10. Error Handling
    - [x] HTTP Response Codes 
    - [ ] Front-end handling for response codes

## 💡 Why I Built This

KitchenMate started as thought of managing recipes, creating dishes/meals and generating a shopping basket based on those. The app is still in development and will grow in to a full-featured cooking companion

#### What is already done?

Check out the [old README.](https://github.com/W0lffe/KitchenMate/blob/StageFive/docs/README_old.md)


#### Known Issues

1. On some browsers, the site may fail to load or behave unexpectedly due to issues with session authentication handling.  
    - **NOTES:**
        - This can occur if cookies or session data are blocked, expired, or not set correctly.  
        - Refreshing the page or clearing the browser’s cache and cookies sometimes resolves the issue.  
        - I have tested the app on Chrome, Edge and Firefox with successful login.
        - Will look into switching to token-based authentication in the future.
   - **STATUS:**
        - **Fixed with token-based authentication.**
   




