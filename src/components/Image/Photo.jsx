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
import { getImage } from "../../api/http";

/**
 * Photo component for displaying and uploading images.
 * @param {string|File} img Image source, either a URL string or a File object
 * @param {boolean} disable Flag to disable image upload
 * @returns component displaying the image and upload option
 */
export default function Photo({ img, disable }) {
    const [imagePreview, setImagePreview] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const getImagePreview = async (img) => {
        setIsLoading(true);
        //console.log(img)

        let preview = null;
        if (img instanceof File) {
            preview = URL.createObjectURL(img);
            //console.log("blobi",preview)
        }

        if (typeof img === "string") {
            const res = await getImage(img);
            //console.log("res from getImage",res);
            
            if(res instanceof Blob){
                preview = URL.createObjectURL(res);
                //console.log("preview after receiving", preview)
            }
            else{
                const {error} = res;
                handleToast({
                    error
                })
                setImagePreview(null);
                setIsLoading(false);
                return;
            }
        }

        //console.log("preview", preview)

        if (preview) {

            const image = new Image();
            //console.log("image",image);

            image.onload = () => {
                //console.log("load success");
                setImagePreview(preview);
                setIsLoading(false);
            }

            image.onerror = () => {
               // console.log("error happened");
                setImagePreview(null);
                setIsLoading(false);
                handleToast({
                    error: "Image could not be loaded."
                })
            }

            image.src = preview;
            return;
        }
        else{
            setImagePreview(null);
            setIsLoading(false);
        }
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

    if(isLoading){
        <>
            {isLoading && <label>Loading image...</label>}
        </>
    }

    return (
        <section className={imageSection}>
            <div className={getImageDivStyle(disable)}>
                {imagePreview ? (
                    <label htmlFor="image-upload">
                            <img src={imagePreview} className={imageStyle} name="image" />
                    </label>
                ) : (
                    <IconButton>
                            <label htmlFor="image-upload">
                                <FontAwesomeIcon icon={imagePreview === false ? faBan : faCamera} className={inputStyle} />
                            </label>
                    </IconButton>
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