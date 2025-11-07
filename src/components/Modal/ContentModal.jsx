import LoginSignupForm from "../LoginSignupForm/LoginSignupForm";
import ContentWrapper from "../ContentWrapper/ContentWrapper";

/**
 * Modal for content sections.
 * @param {string} section The current section of the modal.
 * @param {Object} editStatus status of edit mode for basket items
 * @returns Content to modal based on section
 */
export default function ContentModal({section, editStatus}){

    const isLoginSignup = ["signup", "login"].includes(section);
    const showContent = ["recipes", "dishes"].includes(section) || editStatus?.status;

    return(
        <>
            {isLoginSignup ? <LoginSignupForm /> : null}
            {showContent ? <ContentWrapper /> : null}
        </>
    )
}