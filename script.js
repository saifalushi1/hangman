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
let newGame = document.querySelector(".newGame")
let body = document.body
let startGame = document.querySelector(".startGame")
let lifeWrapper = document.querySelector(".lifeWrapper")
let animationWrapper = document.querySelector(".animationWrapper")
let lineHolder = document.querySelector(".lineHolder")
let word = []
let arrOfLetters = []
let incorrectGuesses = 0

//shows menu options (new game, theme) on click
function menuCreation(){
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
                // options[i].remove()
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
}

function changeAnimation(){
    for(let i = 0 ; i < 3; i++){
        let img = document.createElement("img")
        img.classList.add("life", `heart${i}`)
        lifeWrapper.appendChild(img)
        img.src = "https://pbs.twimg.com/profile_images/554699922138624000/0AopZpk4_400x400.png"
    }
}

/*Takes word from paramater and splits it into letters and pushes each letter into an array.
Then created a list item with the inner html = array[i]*/
function gameLogic(theword){
    let letteredWord = theword.split("")
    console.log(letteredWord)
    for(let i = 0; i < letteredWord.length; i++){
        arrOfLetters.push(letteredWord[i])
        let li = document.createElement("li")
        lineHolder.appendChild(li)
        // li.innerHTML = letteredWord[i]
        li.innerHTML = "__"
        li.setAttribute("id", letteredWord[i])
        li.classList.add(letteredWord[i])
        li.classList.add("line")
        
        
    }
    //try .reduce() or filter() to return false and remove a letter and causedamage
    //TODO: find a way to cause an event if the key pressed does not match the letters in the word
    //REFACTOR: MAYBE
    /*Event listener that does something if the key pressed matches a letter in the word*/
    document.addEventListener('keydown', e => {
        let key = e.key 
        let correct = 0
        for(let i = 0; i < arrOfLetters.length; i++){
            if (arrOfLetters[i] === key) {
                correct++
                let lineElement = document.querySelector(`#${arrOfLetters[i]}`)
                let multipleLineElement = document.querySelectorAll(`.${arrOfLetters[i]}`)
                lineElement.innerHTML = arrOfLetters[i]
                    if(multipleLineElement.length > 1){
                        for(let j = 0; j < multipleLineElement.length; j++){
                            multipleLineElement[j].innerHTML = arrOfLetters[i]
                        }
                    }
                e.preventDefault()
            }
            
        }
        if(correct === 0 && incorrectGuesses < 3){
            let life = document.querySelector(`.heart${incorrectGuesses}`)
            let animation = document.querySelector(".animation")
            animation.src = "https://cdn.dribbble.com/users/3368906/screenshots/6223135/e-9-2-dead_damage.gif"
            life.src = "https://cdn.staticcrate.com/stock-hd/effects/footagecrate-Broken_Heart_Icon_Sweet_Pixel@3X.png"
            incorrectGuesses++
            setTimeout(() => {animation.src = "https://cdn.dribbble.com/users/3368906/screenshots/6218050/e-9-2-dead_walk.gif"}, 500);
                if(incorrectGuesses >= 3){
                    setTimeout(() => {animation.src = "https://cdn.dribbble.com/users/3368906/screenshots/6223136/e-9-2-dead_dead.gif"}, 500);
                }  
        }
    }, false);
}


function createGame(){
    startGame.addEventListener("click", () => {
        startGame.remove()
        changeAnimation()
        //create a new element to display the animation 
        let animationStart = document.createElement("img")
        animationStart.classList.add("animation")
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
menuCreation()
//FIX NEWGAME LOGIC
newGame.addEventListener("click", ()=> {
    let removedImg = document.querySelector(".animation")
    removedImg.remove()
    let removedLines = document.querySelectorAll(".line")
    let removedHearts = document.querySelectorAll(".life")
    console.log(removedLines)
    removedLines.forEach((item) =>{
        item.remove()
    })
    removedHearts.forEach((item) => {
        item.remove()
    })
    changeAnimation()
    let animationStart = document.createElement("img")
        animationStart.classList.add("animation")
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
