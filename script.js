const ingredients = {
    lowerbun: 'burger-images/Ingredients/Lower-Bun.png',
    cheese: 'burger-images/Ingredients/Cheese.png',
    topbun: 'burger-images/Ingredients/Upper-Bun.png',
    mayo: 'burger-images/Ingredients/Mayo.png',
    burgermeat: 'burger-images/Ingredients/Meat.png',
    lettuce: 'burger-images/Ingredients/Lettuce.png',
    onions: 'burger-images/Ingredients/Onions.png',
    mushrooms: 'burger-images/Ingredients/Mushrooms.png',
    pickles: 'burger-images/Ingredients/Pickles.png',
    egg: 'burger-images/Ingredients/Egg.png',
    ketchup: 'burger-images/Ingredients/Ketchup.png',
    tomatoes: 'burger-images/Ingredients/Tomatoes.png'
};

const ingredientSpacing = { 
    lowerbun: 0,
    cheese: 30,
    topbun: 25,
    mayo: 15,
    burgermeat: 60,
    lettuce: 20,
    onions: 15,
    mushrooms: 15,
    pickles: 25,
    egg: 15,
    ketchup: 43,
    tomatoes: 40
};

const ingredientSize = {
    lowerbun: 120,
    cheese: 140,
    topbun: 175,
    mayo: 120,
    burgermeat: 130,
    lettuce: 140,
    onions: 100,
    mushrooms: 120,
    pickles: 100,
    egg: 120,
    ketchup: 90,
    tomatoes: 140
};

const ingredientExtra = {
    onions: 1.00,
    mushrooms: 1.75,
    pickles: 0.50,
    egg: 2.25,
    ketchup: 0.25,
}

let totalHeight = 40; //Keep track of total height of all ingredients

const clickSound = new Audio('sound/mouse-click.mp3');
const cashSound = new Audio('sound/cash-register.mp3');
const resetSound = new Audio('sound/reset.mp3');

document.querySelectorAll('.button-image-container').forEach(button => {
    const defaultImg = button.querySelector('.button-image');
    const hoverImg = button.querySelector(".button-image-hover");
    const clickedImg = button.querySelector(".button-image-clicked");

    button.addEventListener('mouseenter', () => {
        defaultImg.style.display = 'none';
        hoverImg.style.display = 'block';
    });

    button.addEventListener('mouseleave', () => {
        // Only show default or clicked image on mouseout
        clickedImg.style.display === 'none'
        defaultImg.style.display = 'block';
        hoverImg.style.display = 'none';
    });

    button.addEventListener('mousedown', () => {
        //Play sound effect when button is pressed
        clickSound.currentTime = 0;
        cashSound.currentTime = 0;
        resetSound.currentTime = 0;
        
        defaultImg.style.display = 'none';
        hoverImg.style.display = 'none';
        clickedImg.style.display = 'block';
 
        //Add ingredient to burger
        const ingredientType = button.getAttribute('data-ingredient');

        if (ingredientType === 'reset') {
            //Do nothing but play the reset sound
            resetSound.play();
        } else if (ingredientType === 'done') {
            cashSound.play();
            displayTotal();
        } else {
            clickSound.play();
            addIngredient(ingredientType);
            addIngredientText(ingredientType);
        }
    });

    button.addEventListener('mouseup', () => {
    });
});

// Function to display total price at the end

function displayTotal() {
    const receiptContainer = document.getElementById('receiptArea');
    totalCost = extrasCost + 14.00

    //Create a new div to display the total price text
    const totalDiv = document.createElement('div');
    totalDiv.classList.add('total');
    totalDiv.style.fontSize = '25pt'
    totalDiv.textContent = `Total: ${totalCost}`;
    receiptContainer.appendChild(totalDiv);
}


// Function to add ingredient to burger
function addIngredient(type) {
    const burgerContainer = document.getElementById("burgerHolder");

    //Create a new element for the ingredient
    const ingredientDiv = document. createElement('div');
    ingredientDiv.classList.add('ingredient');
    ingredientDiv.style.backgroundImage = `url(${ingredients[type]})`;

    //Set the default height
    let ingredientHeight = ingredientSize[type]; 

    // Set the height of the ingredient div
    ingredientDiv.style.height = `${ingredientHeight}px`;
    
    // let ingredientGap = ingredientSpacing[type]; //Default value for most ingredients

    // Adjust ingredient spacing based on ingredient

    //Position it based on previous ingredients
    const ingredientCount = burgerContainer.children.length;
    ingredientDiv.style.position = 'absolute';
    ingredientDiv.style.left = '50%';
    ingredientDiv.style.transform = 'translateX(-50%)';
    
    if (type == 'cheese'){
        totalHeight -= 0.3*ingredientHeight;
    }
    
    ingredientDiv.style.bottom = `${totalHeight}px`

    console.log("ingredientCount:", ingredientCount)
 
    //Add the new ingredients to the burger container
    burgerContainer.appendChild(ingredientDiv);
    
    // Update the total height to include the new ingredient
    totalHeight += (0.3*ingredientHeight);
}

let extrasCost = 0;

function addIngredientText(type){
    if (type in ingredientExtra) {
        //Get the extras price container
        const extrasContainer = document.getElementById('extrasPrice');
        //Update text in the extras area
        const extrasArea = document.createElement('div');
        extrasArea.classList.add('extras-display')
        extrasArea.textContent = `+ ${type.charAt(0).toUpperCase() + type.slice(1)} : $${ingredientExtra[type]}`;
        extrasArea.style.fontSize = '20pt';
        extrasArea.style.color = 'green';
        extrasArea.style.fontStyle = 'bold';

        extrasContainer.appendChild(extrasArea);
        extrasCost += ingredientExtra[type];
    }

    // Update the display area text
    const displayArea = document.getElementById('displayArea');
    displayArea.textContent = `+ ${type.charAt(0).toUpperCase() + type.slice(1)}`;
    displayArea.style.fontSize = '20pt';
    displayArea.style.color = 'brown';

    // Add the class for fade-in effect
    displayArea.classList.add('show')

    //Optionally clear previous text on new button press
    setTimeout(() => {
        displayArea.classList.remove('show'); // Fade out after a short delay
    }, 2000); // Fade out after 2 seconds

}

// Reset functionality
document.getElementById('resetButton').addEventListener('click', () => {
    const burgerContainer = document.getElementById("burgerHolder");
    const displayArea = document.getElementById('displayArea');
    const extrasContainer = document.getElementById('extrasPrice');
    const receiptContainer = document.getElementById('receiptArea');
    const total = receiptContainer.querySelector('.total');

   
    
    // Select all ingredient elements
    if (burgerContainer.children.length > 2) {
        const ingredients = burgerContainer.querySelectorAll('.ingredient');
        console.log(ingredients)

        // Loop through and remove each ingredient
        ingredients.forEach(ingredient => {
            // Check if the ingredient is still in the DOM before removing
            if (burgerContainer.contains(ingredient)) {
                burgerContainer.removeChild(ingredient);
            }
        });
    }

    // Select all extras price elements and remove the children
    if (extrasContainer.children.length > 1) {
        const extras = extrasContainer.querySelectorAll('.extras-display');

        //Loop through each ingredient and remove it
        extras.forEach(extra => {
            //Check if ingredient is still in the DOM before removing
            if (extrasContainer.contains(extra)) {
                extrasContainer.removeChild(extra);
            }

        });
    }

    

    // Check if total div exists then remove it 
    if (receiptContainer.contains(total)) {    
        receiptContainer.removeChild(total);

    }

 
    // Reset the total Height to default
    totalHeight = 40;

    extrasCost = 0; // Reset extras cost to default
    
    document.querySelectorAll('.button-image-container').forEach(button => {
        const defaultImg = button.querySelector('.button-image');
        const hoverImg = button.querySelector('.button-image-hover');
        const clickedImg = button.querySelector('.button-image-clicked');

        defaultImg.style.display = 'block';
        hoverImg.style.display = 'none';
        clickedImg.style.display = 'none';
    });
});