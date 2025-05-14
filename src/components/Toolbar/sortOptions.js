import { faArrowDownAZ, 
        faClock, 
        faCalendarDays, 
        faStar,
        faArrowDown19, faSquareCheck } from "@fortawesome/free-solid-svg-icons";

export const sortOptions = {
    "basket": {
        "labels": ["Name", "Quantity", "Obtained"],
        "icons": [
            faArrowDownAZ,
            faArrowDown19,
            faSquareCheck
        ],
        "values": ["name", "quantity", "check"]
    },
    "other": {
        "labels": ["Name", "Prep Time", "Newest-Oldest", "Favorite"],
        "icons": [
            faArrowDownAZ,
            faClock,
            faCalendarDays,
            faStar
        ],
        "values": ["name", "time", "date", "fav"]
    }
    
}