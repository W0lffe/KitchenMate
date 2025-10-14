import LoginSignupForm from "../LoginSignupForm/LoginSignupForm";
import ContentWrapper from "../ContentWrapper/ContentWrapper";

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