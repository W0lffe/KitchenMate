import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDownAZ, faClock, faCalendarDays, faStar } from "@fortawesome/free-solid-svg-icons";


const slogans = [
    "Cook Smarter, Not Harder with KitchenMate.",
    "Your Culinary Companion for Every Meal.",
    "Simplify Your Cooking with KitchenMate.",
    "From Prep to Plate.",
    "Where Great Meals Begin – KitchenMate."
];

export const units = [ 
    "kg", "l", "g", "dl", "pcs"
]

export const getRandomSlogan = () => {
    return slogans[Math.floor(Math.random() * slogans.length)];
}

export const getToolbarLabels = (isMobile) => {

    const labels = ["Name", "Prep Time", "Newest-Oldest", "Favorite"]
/* 
    if(isMobile){
        const icons = [
        <FontAwesomeIcon icon={faArrowDownAZ} className="text-gray-400"/>,
        <FontAwesomeIcon icon={faClock} className="text-gray-400"/>,
        <FontAwesomeIcon icon={faCalendarDays} className="text-gray-400"/>,
        <FontAwesomeIcon icon={faStar} className="text-gray-400"/>,
        ]
        return icons;
    }
 */
    return labels;
}