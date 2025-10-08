import { inputStyle } from "./toolbarStyles";

export default function SearchBar({filter}){

    return(
        <input type="text" 
                                name="search" 
                                placeholder="Search..." 
                                className={inputStyle} 
                                onChange={(event) => filter(event.target.value)}/>
    )
}