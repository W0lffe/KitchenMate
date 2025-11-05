import { listSection, getListStyle } from "./inspectStyles";

export default function ItemInstructionSection({instructions}){

    return(
        <section className={listSection}>
                        <label className="italic font-bold">Instructions</label>
                        <ul className={getListStyle()}>
                            {instructions.length > 0 ? (
                                instructions.map((step, i) => 
                                <li key={i}>{`${i+1}. ${step}`}</li>)
                            ) : (
                                <h3 className="italic">No instructions added</h3>
                            )}
                        </ul>
        </section>
    )

}