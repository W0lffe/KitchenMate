import LoginForm from "../LoginForm/LoginForm";
import ContentWrapper from "../ContentWrapper/ContentWrapper";

/**
 * Modal for content sections.
 * @param {string} section The current section of the modal.
 * @param {Object} editStatus status of edit mode for basket items
 * @returns Content to modal based on section
 */
export default function ContentModal({section, editStatus}){

    const isLogin = section === "login";
    const showContent = ["recipes", "dishes"].includes(section) || editStatus?.status;

    return(
        <>
            {isLogin ? <LoginForm /> : null}
            {showContent ? <ContentWrapper /> : null}
        </>
    )
}