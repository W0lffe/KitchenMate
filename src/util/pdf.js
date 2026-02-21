import jsPDF from "jspdf";

export const exportRecipePDF = (item) => {

    const recipe = item.recipe
    console.log(recipe)

    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text(recipe.name, 10, 20);

    doc.setFontSize(12);
    doc.text("Ingredients:", 10, 40);

    const ingStrings = [];
    recipe.ingredients.forEach(ingredient => {
        ingStrings.push(ingredient.product + " " + ingredient.quantity + " " + ingredient.unit)
    });
    doc.text(ingStrings, 10, 50);

    doc.text("Instructions:", 10, 90);
    doc.text(recipe.instructions, 10, 100);

    doc.save(`${recipe.name}.pdf`);
};
