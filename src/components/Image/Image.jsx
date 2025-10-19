import { useState } from "react"
import { imageSection, 
    inputStyle, 
    imageStyle, 
    imageDivStyle } from "./imageStyles"
import IconButton from "../Buttons/IconButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons";

export default function Image() {

    const [selectedFile, setSelectedFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);

    const handleImageChange = (e) => {

        const image = e.target.files[0];
        console.log(image)
        if(image){
            setSelectedFile(image);
            setImagePreview(URL.createObjectURL(image));
        }
    }

    return (
        <section className={imageSection}>
            <div className={imageDivStyle}>
                {imagePreview ?
                (
                    <label htmlFor="image-upload">
                        <img src={imagePreview} className={imageStyle} />
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
            />
            </div>
        </section>
    )
}