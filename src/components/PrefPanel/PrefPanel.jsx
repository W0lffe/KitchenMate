
export default function PrefPanel() {

    return (
        <div>
            <fieldset>
                <legend>Which one are you? Pick one:</legend>
                <label>
                    <input type="radio" name="cookType" value="home" />
                    Home Cook
                </label>
                <label>
                    <input type="radio" name="cookType" value="professional" />
                    Professional Cook
                </label>
                <p>Used to customize your experience in the app.</p>
            </fieldset>
            <fieldset>
                <legend>Which units would you like to use? Pick one:</legend>
                <label>
                    <input type="radio" name="unitType" value="metric" />
                    Metric units
                </label>
                <label>
                    <input type="radio" name="unitType" value="imperial" />
                    Imperial units
                </label>
                <p>Choose your preferred measurement units.</p>
            </fieldset>
        </div>
    )
}