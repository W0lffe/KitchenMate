# 🧑‍🍳 KitchenMate

KitchenMate is a smart food service solution designed for home cooks and professionals who want to make life easier. It simplifies meal preparation through technology, offering convenient cooking support that saves time while delivering delicious results.

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

Frontend: ReactJS, React Router, TailwindCSS
Backend: PHP (due to restrictions on server)
Auth: Session-based login system built with PHP (no third-party auth provider)
Hosting: Firebase Hosting

## 🧩 Future Plans

1. Refactoring & Improvements
    - [ ] Reconstruct app from mostly conditional rendering to use React Router pages
    - [ ] Testing (Jest / Vitest)
2. Documentation
    - [ ] JSDoc documentation
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
    - [ ] Convert current JSON data to MySQL/SQLite
    - [ ] Python backend
    - [ ] Data export to Excel format or PDF
8. User Features
    - [ ] Community shared recipes (public)
    - [ ] User profile
    - [ ] Profile-based user experience (home cook vs professional)
9. Authentication & Security
    - [ ] Role-based permissions (admin, user)
    - [ ] Password reset and account recovery

## 💡 Why I Built This

KitchenMate started as thought of managing recipes, creating dishes/meals and generating a shopping basket based on those. The app is still in development and will grow in to a full-featured cooking companion

#### What is already done?

Check out the [old readme](https://github.com/W0lffe/KitchenMate/blob/StageFive/docs/README_old.md)


#### Known Issues

1. On some browsers, the site may fail to load or behave unexpectedly due to issues with session authentication handling.  
   - This can occur if cookies or session data are blocked, expired, or not set correctly.  
   - Refreshing the page or clearing the browser’s cache and cookies sometimes resolves the issue.  




