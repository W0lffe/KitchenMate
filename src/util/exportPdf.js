import jsPDF from "jspdf";

/**Simple function for exporting PDF of recipe
 * @param {Object} item recipe item given from inspection
 */
export const exportRecipePDF = (item) => {
    const recipe = item;
    console.log(recipe)

    const doc = new jsPDF();

    let y = 20;

    doc.setFontSize(18);
    doc.text(recipe.name, 10, y);

    y += 10;

    doc.setFontSize(12);
    if (recipe.output !== "N/A") {
        const line = `Output: ${recipe.outputType} (base recipe, 1 per ${recipe.portions} portions) `
        doc.text(line, 12, y)
        y += 8;
    }
    doc.text(`Prep time: ${recipe.time} ${recipe.timeFormat}`, 12, y)
    y += 8;
    doc.text(`Portions: ${recipe.portions}`, 12, y)

    y += 15;

    doc.setFontSize(14);
    doc.text("Ingredients:", 10, y);

    y += 10;

    doc.setFontSize(12);

    recipe.ingredients.forEach((ingredient) => {
        const line = `${ingredient.product} ${ingredient.quantity} ${ingredient.unit}`;
        doc.text(line, 12, y);
        y += 8;
    });

    y += 10;

    doc.setFontSize(14);
    doc.text("Instructions:", 10, y);

    y += 10;

    doc.setFontSize(12);

    recipe.instructions.forEach((step, index) => {
        const line = `${index + 1}. ${step}`;
        doc.text(line, 12, y);
        y += 8;
    });

    doc.save(`${recipe.name}.pdf`);
};
