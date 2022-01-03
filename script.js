/*
First - we want to build the most constant things 
- background,win/lose game screen,start button, instructions, letters guessed, and the stand for the hangman

Second - we need to add functionality. 
-On key press we need to check if they key press matches with a letter in the word(use switch cases).
-If the letter is not in the word we need to remove that key from the available guesses and put the letter in the guessed box.
-We need to draw the hangman in accordence to how many they incorrectly guess
-all buttons and or screens should have functionality
*/

let themeCounter = 0
let gameOptions = document.querySelector(".gameOptions")
let options = document.querySelectorAll(".hidden")
let theme = document.querySelector(".theme")
let body = document.body
let startGame = document.querySelector(".startGame")

for(let i = 0; i < options.length; i++){
    let counter = 0
    gameOptions.addEventListener("click", ()=>{
        counter++
        if(counter % 2 != 0){
            options[i].classList.remove("hidden")
            let x = document.createElement("li")
            //COMEBACK LATER CREATE OPTIONS ON CLICK
            // x.appendChild("")
        }
        else{
            options[i].classList.add("hidden")
        }
    })
}

theme.addEventListener("click", ()=>{
    themeCounter++
        if(themeCounter % 2 === 0 ){
            body.style.backgroundColor = "#E2DFD2"
            
        }
        else{
            body.style.backgroundColor = "#404040"

        }
})

function createGame(){
    startGame.addEventListener("click", () => {
        startGame.remove()

        fetch('https://random-word-api.herokuapp.com/word?number=10&swear=0')

        .then(res => {
            console.log(res)
        
            return res.json()
        })
        .then(result =>{
            console.log(result)
        })
    })

}


createGame()
