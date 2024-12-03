

// let content = ["black", "white", "black", "white"];

// function createGrid() {
//     const gameContainer = document.getElementById("game-container");
//     gameContainer.innerHTML = '';
    
//     content.forEach((a) => {
//         const divelement = document.createElement("div");
//         divelement.textContent = a;
//         divelement.style.display = "flex";
//         divelement.style.alignItems = "center";
//         divelement.style.justifyContent = "center";
//         divelement.style.border = "1px solid black";
//         divelement.style.backgroundColor = "blue";
//         divelement.style.height = "100px";

//         divelement.style.color = "transparent";
                
        
//         divelement.addEventListener("click", function () {
            
//             divelement.style.color = "black"; 
//             divelement.style.backgroundColor = "cadetblue"; 
//         });

//         gameContainer.appendChild(divelement);
//     });
// }

// document.getElementById("reset-button").onclick = createGrid;

// createGrid();

// document.getElementById("reset-button").addEventListener("click", createGrid);


let content = [
    "A", "B", "C", "D",
    "E", "F", "G", "H",
    "A", "B", "C", "D",
    "E", "F", "G", "H"
]; 
let firstCard = null; 
let secondCard = null; 
let isProcessing = false;

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; 
    }
    console.log("Shuffled content:", array);
}

function createGrid() {
    const gameContainer = document.getElementById("game-container");
    gameContainer.innerHTML = ''; 

    content.forEach((a) => {
        const divelement = document.createElement("div");
        divelement.classList.add("cell");

        const flipCard = document.createElement("div");
        flipCard.classList.add("flip-card");

        const front = document.createElement("div");
        front.classList.add("front");
        front.textContent = a; 

        const back = document.createElement("div");
        back.classList.add("back");

        flipCard.appendChild(front);
        flipCard.appendChild(back);

        flipCard.addEventListener("click", () => handleCardClick(flipCard));

        divelement.appendChild(flipCard);

        gameContainer.appendChild(divelement);
    });
}


function handleCardClick(card) {
    if (isProcessing || card.classList.contains("flipped") || card.classList.contains("matched")) {
        return; 
    }

    card.classList.add("flipped");

    if (!firstCard) {
        firstCard = card;
    } else {
        secondCard = card;
        isProcessing = true;

        const firstText = firstCard.querySelector(".front").textContent;
        const secondText = secondCard.querySelector(".front").textContent;

        if (firstText === secondText) {
            firstCard.classList.add("matched");
            secondCard.classList.add("matched");
            resetTurn();
        } else {
            setTimeout(() => {
                firstCard.classList.remove("flipped");
                secondCard.classList.remove("flipped");
                resetTurn();
            }, 1000); 
        }
    }
}

function resetTurn() {
    firstCard = null;
    secondCard = null;
    isProcessing = false;
}

document.getElementById("reset-button").onclick = function () {
    shuffleArray(content); 
    createGrid(); 
    resetTurn();
};

shuffleArray(content);
createGrid();