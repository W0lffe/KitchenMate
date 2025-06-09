import { faArrowDownAZ, 
        faClock, 
        faCalendarDays, 
        faStar,
        faArrowDown19, 
        faSquareCheck, 
        faUtensils, 
        faGears } from "@fortawesome/free-solid-svg-icons";

export const getSortOptions = (activeSection, isCreatingDish) => {

    if(isCreatingDish){
         return {
                labels: ["Name", "Prep Time", "Newest-Oldest", "Favorite"],
                icons: [
                        faArrowDownAZ,
                        faClock,
                        faCalendarDays,
                        faStar
                    ],
                values: ["name", "time", "date", "fav"]
            }
    }

    switch(activeSection){
        case "recipes":
            return {
                labels: ["Name", "Prep Time", "Newest-Oldest", "Favorite"],
                icons: [
                        faArrowDownAZ,
                        faClock,
                        faCalendarDays,
                        faStar
                    ],
                values: ["name", "time", "date", "fav"]
            }
        case "basket":
            return {
                labels: ["Name", "Quantity", "Obtained"],
                icons: [
                    faArrowDownAZ,
                    faArrowDown19,
                    faSquareCheck
                ],
                values: ["name", "quantity", "check"]
            }
        case "dishes": {
            return {
                labels: ["Name", "Course", "Components", "Favorite"],
                icons: [
                    faArrowDownAZ,
                    faUtensils,
                    faGears,
                    faStar
                ],
                values: ["name", "course", "quantity", "fav"]
            }
        }
    }
  
}