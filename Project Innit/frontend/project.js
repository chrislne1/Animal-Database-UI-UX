// Gloabal Variables
// Holds all the different screens
const promptarea = document.querySelector("#promptUser");
const gamearea = document.querySelector("#startGame");
const resultarea = document.querySelector("#resultScreen");
const endarea = document.querySelector("#gameOver");
// Image of the correct animal
const img = document.getElementById("image");
// String of the cirrect animal and if user was right
const result = document.getElementById("result");
// String of the description of the animal
const desc = document.getElementById("description");
// String of the users inputted name
let userName = "";
// How many questions were correct
var correctcount = 0;
// Index of the animal
var aindex = 0;
// Array of all animals
let aname = ["shush", "elephant", "bird", "snake", "lion", "dog", "cat", "cheetah", "panther", "monkey", "gorilla"]
// If the users guess was correct or not
var answerResult = false;

// Action eveent listener to allow the code to reload the game after losing
document.addEventListener("DOMContentLoaded", () => 
{
    loadGame();
});

//Function to remove the titlpage and start the game
function loadGame() 
{
    // Variables to hold object data from HTML
    const form = document.querySelector("#myform");
    const submit = document.querySelector("input[type=submit]");
    const clear = document.querySelector("input[type=reset]");
    const text = document.querySelector("#name");
    const title = document.getElementById("title");
    const prompt = document.getElementById("prompt");

    //Assuming if user is retrying, hide the game over screen
    endarea.style.display = "none";
    
    //Assuming the user is retrying, re-display the titlepage
    title.style.display = "block";
    prompt.style.display = "block";
    submit.style.display = "block";
    clear.style.display = "block";
    text.style.display = "block";

    // When the user clicks submit
    submit.addEventListener("click", (event) => 
    {
        //Store the string of the users inputted name
        userName = document.querySelector("#name").value;

        // Prevent the user from getting redirected
        event.preventDefault();

        // Hide all objects on the titlepage
        title.style.display = "none";
        prompt.style.display = "none";
        submit.style.display = "none";
        clear.style.display = "none";
        text.style.display = "none";

        //Start the game
        loadRound();

        // Input the users name into the answer prompt
        const greet = document.getElementById("promptUser");
        greet.textContent = `Please enter an animal's name ${userName}`;
    });
}

//Start the Game
function loadRound()
{
    //Start the game and display all objects part of the function
    gamearea.style.display = "flex";

    //Randomly select an animal that is on the list and prompt the description on the screen
    aindex = Math.floor(Math.random()*10+1);
    desc.textContent =  describeAnimal(aindex);
    
    //Fetch data from server
    fetch(`/getAnimal?index=${aindex}`)
        .then(response => response.json())
        .then(animal => 
        {
            //Set the description of the animal with data from server
            desc.textContent = animal.description;
        });
}

//Showcase the results of the answer the user submitted
function submitAnimal()
{
    //Change display from the game screen to the result screen
    gamearea.style.display = "none";
    resultarea.style.display = "block";

    //Grab the animal the user guessed
    let selected = document.getElementById("animalName").value;

    //Grab the object holding the image of the generated animal and change it
    img.src = "images/animal" + aindex + ".jpg?" + new Date().getTime();
    img.style.display = "block";

    //Grab the result text of the guess of the generated animal
    result.style.display = "block";

    //If the user guessed the right animal
    if (selected.toLowerCase() == aname[aindex])
    {
        //Set the string as correct and set the boolean as true
        result.textContent = "Correct! ";
        answerResult = true;
    }

    //If the user guessed the wrong animal
    else
    {
        //Set the string as incorrect and set the boolean as false
        result.textContent = "Incorrect! ";
        answerResult = false;
    }

    //Add the correct animal to the result string
    result.textContent += "the animal is a " + aname[aindex] + "!";
}

//Screens shown based on the users answer
function continueOrQuit()
{
    //Hide the result screen
    resultarea.style.display = "none";
    //Assuming the user is correct, set the animal guess textbox as empty
    document.getElementById("animalName").value = "";

    //If the users guess was correct
    if (answerResult == true)
    {
        //Add a count to the correct answers count
        correctcount++;
        //Reload the game
        loadRound();
    }

    //If the users guess was wrong
    else
    {
        //Show the game over screen and update the users score
        document.getElementById("finalScore").textContent = "Congratulations, your final score was " + correctcount + "!";
        endarea.style.display = "block";
        //Assuming the user retrys, restart the correct score count
        correctcount = 0;
    }
}

//Manually clear the textbox
function clearText()
{
    //Set the text as empty for the titlepage textbox
    document.getElementById("name").value = "";
}