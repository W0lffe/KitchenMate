import { useEffect, useState } from "react"
import {
    imageSection,
    inputStyle,
    imageStyle,
    getImageDivStyle
} from "./imageStyles"
import IconButton from "../Buttons/IconButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera, faBan } from "@fortawesome/free-solid-svg-icons";
import { BASE_URL } from "../../../backend/api";
import { handleToast } from "../../util/toast";

/**
 * Photo component for displaying and uploading images.
 * @param {string|File} img Image source, either a URL string or a File object
 * @param {boolean} disable Flag to disable image upload
 * @returns component displaying the image and upload option
 */
export default function Photo({ img, disable }) {
    const [imagePreview, setImagePreview] = useState(null);
    const [isLoading, setIsLoading] = useState(null);

    const getImagePreview = (img) => {

        //console.log(img)

        let preview = null;
        if (img instanceof File) {
            preview = URL.createObjectURL(img);
        }

        if (typeof img === "string") {
            preview = `${BASE_URL}/index.php?endpoint=image&image=${img}`;
        }

        //console.log(preview)

        if (preview) {
            setIsLoading(true);

            const image = new Image();
            image.src = preview;
            //console.log(image);

            image.onload = () => {
                //console.log("load success");
                setImagePreview(preview);
                setIsLoading(false);
            }

            image.onerror = () => {
                //console.log("error happened");
                setImagePreview(false);
                setIsLoading(false);
                handleToast({
                    error: "Image could not be loaded."
                })
            }

            return;
        }
        
        setImagePreview(preview);
    }

    useEffect(() => {
        getImagePreview(img);
    }, [img])

    const handleImageChange = (e) => {

        const img = e.target.files[0];
        if (img) {
            getImagePreview(img);
        }
    }

    return (
        <section className={imageSection}>
            <div className={getImageDivStyle(disable)}>
                {isLoading ? (
                    <label>Loading image...</label>
                ) : (
                    imagePreview ? (
                        <label htmlFor="image-upload">
                            <img src={imagePreview} className={imageStyle} name="image" />
                        </label>
                    ) : (
                        <IconButton>
                            <label htmlFor="image-upload">
                                <FontAwesomeIcon icon={imagePreview === false ? faBan : faCamera} className={inputStyle} />
                            </label>
                        </IconButton>
                    )
                )}

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