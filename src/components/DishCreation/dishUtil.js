export default function createComponentUpdater({dish, mode, setActiveDish}) {

    const addComponent = (itemID) => {

        setActiveDish({
            dish: {
                ...dish,
                components: [...(dish?.components || []), itemID]
            },
            mode: mode
        })
    }

    const deleteComponent = (itemID) => {
        //console.log("deleting component id", itemID);
        const filtered = dish.components.filter((component) => component !== itemID)

        setActiveDish({
            dish: {
                ...dish,
                components: filtered
            },
            mode: mode
        })
    }

    const updateComponents = (itemID) => {
        //console.log("updating components", itemID);

        const foundComponent = dish?.components.includes(itemID);
        //console.log("found component", foundComponent);

        if (foundComponent) {
            //console.log("deleting component", foundComponent);
            deleteComponent(itemID);
        }
        else {
            //console.log("adding component", itemID);
            addComponent(itemID);
        }
    }

    return { updateComponents };
}