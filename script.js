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
let animationWrapper = document.querySelector(".animationWrapper")
let lineHolder = document.querySelector(".lineHolder")
let word = []
let arrOfLetters = []

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

function gameLogic(theword){
    let letteredWord = theword.split("")
    console.log(letteredWord)
    for(let i = 0; i < letteredWord.length; i++){
        arrOfLetters.push(letteredWord[i])
        let li = document.createElement("li")
        lineHolder.appendChild(li)
        li.innerHTML = letteredWord[i]
        li.value = 
        li.classList.add("line")

        
    }
    //Event listener that does something if the key pressed is in the word
    document.addEventListener('keydown', e => {
        let key = e.key || String.fromCharCode(e.keyCode);
        for(let i = 0; i < arrOfLetters.length; i++)
        if (arrOfLetters[i] === key) {
            // Do something with `,` key
            console.log("yo")
            e.preventDefault()
        }
        // else if(key != arrOfLetters[i]){
        //     console.log("yer")
        // }
    }, false);
}

function createGame(){
    startGame.addEventListener("click", () => {
        startGame.remove()
        //create a new element to display the animation 
        let animationStart = document.createElement("img")
        animationWrapper.appendChild(animationStart)
        animationStart.src = "https://cdn.dribbble.com/users/3368906/screenshots/6218050/e-9-2-dead_walk.gif"

        fetch('https://random-word-api.herokuapp.com/word?number=1&swear=0')

        .then(res => {
            console.log(res)
        
            return res.json()
        })
        .then(result =>{
            console.log(result)
            word.push(result[0])
            let newWord = word[0].split("")
            console.log(newWord)
            gameLogic(result[0])

        
        })
    })

}


createGame()
