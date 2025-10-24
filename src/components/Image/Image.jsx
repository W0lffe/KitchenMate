import { useEffect, useState } from "react"
import { imageSection, 
    inputStyle, 
    imageStyle,
    getImageDivStyle} from "./imageStyles"
import IconButton from "../Buttons/IconButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons";
import { BASE_URL } from "../../../backend/api";
import { KitchenContext } from "../../context/KitchenContext";
import { useContext } from "react";


export const getImagePreview = (img, user) => {

    if(img instanceof File){
        return URL.createObjectURL(img);
    }

    if(typeof img === "string"){
        return `${BASE_URL}/index.php?user=${user.id}&endpoint=image&image=${img}`;
    }

    return null;
}

export default function Image({img, disable}) {

    const {user} = useContext(KitchenContext);

    const [imagePreview, setImagePreview] = useState(getImagePreview(img, user));

    useEffect(() => {
        setImagePreview(getImagePreview(img, user));
    }, [img])

    const handleImageChange = (e) => {

        const image = e.target.files[0];
        if(image){
            setImagePreview(URL.createObjectURL(image));
        }
    }

    return (
        <section className={imageSection}>
            <div className={getImageDivStyle(disable)}>
                {imagePreview ?
                (
                    <label htmlFor="image-upload">
                        <img src={imagePreview} className={imageStyle} name="image" />
                    </label>
                ) : ( 
                    <IconButton>
                        <label htmlFor="image-upload">
                            <FontAwesomeIcon icon={faCamera} className={inputStyle}/>
                        </label>
                    </IconButton>
                )
            }
            <input type="file"
                    id="image-upload"
                    name="image"
                    className="hidden w-0"
                    accept="image/*"
                    multiple={false}
                    onChange={(e) => handleImageChange(e)}
                    disabled={disable}
            />
            </div>
        </section>
    )
}