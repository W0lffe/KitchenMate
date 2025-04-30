
export default function ListItem({item, active}){

    return(
        <li className="h-fit w-9/10 flex justify-between items-center border border-white bg-gray-400/40  mb-3 p-2 lg:p-5 font-medium rounded-custom">
            <label className="w-20 lg:w-45 text-wrap break-normal">{item.name}</label>
            <label>{item.portions}</label>
            <label>{item.prepTime}</label>
            <button>Icon</button>
        </li>
    )
}
