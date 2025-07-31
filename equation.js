const inputs = document.getElementsByTagName("input");
let firstValue = inputs[0];
let secondValue = inputs[1];
let thirdValue = inputs[2];
const resultArea = document.getElementById("result-area");
const styleOfResults = ["mt-4", "d-flex", "justify-content-center"];

function resolution() {
    let a = parseInt(firstValue.value);
    let b = parseInt(secondValue.value);
    let c = parseInt(thirdValue.value);
    resetForm();
    if (oneIsNaN(a, b, c) === -1 && firstValue !== 0) {
        let discriminant = calculerDiscriminant(a, b, c);
        console.log(discriminant);
        if (discriminant > 0) {
            resultArea.appendChild(createDiscriminantArea(true, a, b, c));
            resultArea.appendChild(createResultArea(discriminant, a, b, c));
        } else if (discriminant === 0) {
            resultArea.appendChild(createDiscriminantArea(false, a, b, c));
            resultArea.appendChild(createResultArea(discriminant, a, b, c));
        } else {
            resultArea.appendChild(createWarningArea(`Le discriminant en lien avec les valeurs ${a}, ${b} et ${c} 
                    étant négatif; il n'existe aucune solution pour celles-ci`));
        }
    } else {
        resultArea.appendChild(createWarningArea("Impossible de résoudre l'équation car l'une de vos entrées est invalide; veuillez recommencer"));
    }
    resultArea.appendChild(createResetButton());
}

let calculerDiscriminant = (a, b, c) => Math.pow(b, 2) - (4 * a * c);

function createDiscriminantArea(discriminantPositif, a, b, c) {
    const discriminantArea = document.createElement("div");
    discriminantArea.id = "discrimination-area";
    discriminantArea.classList.add(...styleOfResults);
    discriminantArea.innerText = `Le discriminant en lien avec les valeurs ${a}, ${b} et ${c} est ${discriminantPositif ? 'positif' : 'nul'},` + 
    ` il existe donc ${discriminantPositif > 0 ? 'deux' : 'une seule'} solution${discriminantPositif ? 's' : ''}`;
    return discriminantArea;
}

function createResultArea(discriminant, a, b, c) {
    const positif = discriminant > 0;
    const resultArea = document.createElement("div");
    resultArea.id = "result-area";
    resultArea.classList.add(...styleOfResults);
    resultArea.innerText = `L${positif ? 'es' : 'a'} solution${positif ? 's' : ''} permettant de résoudre cette équation` + 
    ` ${positif ? 'sont' : 'est'} ${((b * -1) + Math.sqrt(discriminant)) / (2 * a)}` + 
    ` ${positif ? `et ${((b * -1) - Math.sqrt(discriminant)) / (2 * a)}` : ""}`;
    return resultArea;
}

function createWarningArea(alertMessage) {
    const errorArea = document.createElement("div");
    errorArea.id = "warning-area";
    errorArea.classList.add(...styleOfResults);
    errorArea.classList.add("text-danger");
    errorArea.innerText = alertMessage;
    return errorArea;
}

function createResetButton() {
    div = document.createElement("div");
    div.classList.add(...styleOfResults);
    resetButton = document.createElement("button");
    resetButton.onclick = resetForm;
    resetButton.classList.add("btn", "btn-secondary", "fw-bold");
    resetButton.innerText = "Réinitialiser";
    div.appendChild(resetButton);
    return div;
}

function resetForm() {
    firstValue.value = "";
    secondValue.value = "";
    thirdValue.value = "";
    // Tant que l'on trouve un enfant à resultArea; on le supprime
    while (resultArea.firstChild) {
        resultArea.removeChild(resultArea.firstChild);
    }
}

let oneIsNaN = (...params) => params.findIndex(elem => isNaN(elem));