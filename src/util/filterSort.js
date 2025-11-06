/**
 * Function to filter a list based on a search key and dispatch the filtered list
 * @param {Object} parameters includes fullList, value, dispatch, type
 * @property {Array} fullList: complete list to filter from
 * @property {string} value: search key to filter the list
 * @property {Function} dispatch: dispatch function to update state
 * @property {string} type: action type for dispatch
 */
export const filter = (parameters) => {
    console.log(parameters)
    
    const list = parameters.fullList;
    const key = parameters.value;
    const dispatch = parameters.dispatch;
    const type = parameters.type;

    const filtered = key.length > 0 ? 
                    list.filter((item) => 
                        item.name?.toLowerCase().includes(key.toLowerCase()) ||
                        item.product?.toLowerCase().includes(key.toLowerCase())  ) 
                        : list;

    dispatch({
        type,
        payload: filtered
    })
}

/**
 * Function to sort a list based on a specified key and dispatch the sorted list
 * @param {Object} parameters includes fullList, value, dispatch, type
 * @property {Array} fullList: complete list to sort
 * @property {string} value: key to sort the list by
 * @property {Function} dispatch: dispatch function to update state
 * @property {string} type: action type for dispatch
 */
export const sort = (parameters) => {

    console.log(parameters)
    const list = parameters.fullList;
    const key = parameters.value;
    const dispatch = parameters.dispatch;
    const type = parameters.type;

    const sorted = [...list].sort((a, b) => {
        let valA;
        let valB;

        switch(key){
            case "time":
                valA = a.time;
                valB = b.time;
                return valA - valB;
            case "name":
                valA = a.name ? a.name : a.product;
                valB = b.name ? b.name : b.product;
                return valA.localeCompare(valB)
            case "fav":
                valA = a.favorite;
                valB = b.favorite;
                return valB - valA;
            case "date":
                valA = a.date;
                valB = b.date;
                return valB.localeCompare(valA)
            case "quantity":
                valA = a.quantity ? a.quantity : a.components.length;
                valB = b.quantity ? b.quantity : b.components.length;
                return valB - valA;
            case "check":
                valA = a.obtained ? 1 : 0;
                valB = b.obtained ? 1 : 0;
                return valB - valA;
            case "course": 
                valA = a.course;
                valB = b.course;
                return valB.localeCompare(valA)
        }
    })

    dispatch({
        type,
        payload: sorted
    })
}