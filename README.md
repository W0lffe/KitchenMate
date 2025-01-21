# KitchenMate

## State of Project

Currently the project is in starting point. Program now includes recipe creation along with features to remove recipes from database, and modify them.
Shopping list creation has been started.

As this is a work in progress, certain features are still being developed, and program may contain bugs or issues.

### To run the program

In Visual Studio Code:
* ~~Run task using tasks.json tasks, Compile -> Build JAR -> Run JAR~~

**Compile**
```
javac -cp "lib/javafx-sdk-23/lib/*;lib/gson/*" src/*.java -d out
```
**Run**
```
java --module-path "lib/javafx-sdk-23/lib/" --add-modules javafx.controls,javafx.fxml -cp "out;lib/gson/*" Main
```


## Brief
#### Objective:
Develop a software where you can create recipes, modify them, and create shopping lists based on your created recipes.

#### Functionality:
This project will involve creating and manipulating various recipes and shopping lists. Project will be iteratively created and refined.

## Roadmap

### So far planned functionality:

#### In Java:
* [X] Create recipes
    * [X] Ingredients with quantities and units
    * [X] Instructions
* [X] Modify created recipes
* [X] Delete recipes
* [ ] Browse created recipes
    * [X] List
    * [ ] Sorting
    * [ ] Search
* [X] Connections to Server
    * [X] POST
    * [X] GET
* [ ] UI (Implementing JavaFX from the beginning)
* [ ] Add recipe ingredients to shopping list
* [ ] Shopping list view
    * [ ] Modifying list(removing, modify amounts)

#### Browser (Probably will try React):
* [ ] Recipe Browsing
* [ ] Add recipe ingredients to shopping list
* [ ] Shopping list view
    * [ ] Modifying list(removing, modify amounts)
    * [ ] Marking items gathered

