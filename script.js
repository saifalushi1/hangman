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
let lineWrapper = document.querySelector(".lineWrapper")
let conga = document.querySelector(".conga")
let word = []
let arrOfLetters = []
let guessedLetters = []
let incorrectGuesses = 0
let gameWinningCounter = 0

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
            body.style.backgroundColor = "#FFFACD"
            
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
    //TODO: CREATE LOSE AND WIN GAME SCREENS
    //REFACTOR LATER
    /*Event listener that does something if the key pressed matches a letter in the word*/
    // if correct answer is made push guessed letters to an array and respond by saying you have chosen this letter chose again.
    document.addEventListener('keyup', e => {
        let key = e.key 
        let correct = 0
        for(let i = 0; i < arrOfLetters.length; i++){
            // console.log(arrOfLetters)
            if (arrOfLetters[i] === key) {
                correct++
                gameWinningCounter+=1
                console.log(gameWinningCounter)
                let lineElement = document.querySelector(`#${arrOfLetters[i]}`)
                let multipleLineElement = document.querySelectorAll(`.${arrOfLetters[i]}`)
                lineElement.innerHTML = arrOfLetters[i]
                guessedLetters.push(key)
                // console.log(correct)
                    if(multipleLineElement.length > 1){
                        for(let j = 0; j < multipleLineElement.length; j++){
                            multipleLineElement[j].innerHTML = arrOfLetters[i]
                        }
                    }
                e.preventDefault()
            }
            
        }
            //Fix This
        // for(let i = 0; i < guessedLetters.length; i++){
        //     if (guessedLetters[i] === key){
        //         let tryAgain = document.createElement("h4")
        //         tryAgain.innerHTML = "You have guessed this letter please try a different letter"
        //         animationWrapper.appendChild(tryAgain)
        //         setTimeout(() => {tryAgain.remove()}, 3000)
        //     }
        // }

        if(correct === 0 && incorrectGuesses < 3){
            let life = document.querySelector(`.heart${incorrectGuesses}`)
            let animation = document.querySelector(".animation")
            animation.src = "https://cdn.dribbble.com/users/3368906/screenshots/6223135/e-9-2-dead_damage.gif"
            life.src = "https://cdn.staticcrate.com/stock-hd/effects/footagecrate-Broken_Heart_Icon_Sweet_Pixel@3X.png"
            console.log(life)
            incorrectGuesses++
            setTimeout(() => {animation.src = "https://cdn.dribbble.com/users/3368906/screenshots/6218050/e-9-2-dead_walk.gif"}, 500);
                if(incorrectGuesses >= 3){
                    setTimeout(() => {animation.src = "https://cdn.dribbble.com/users/3368906/screenshots/6223136/e-9-2-dead_dead.gif"}, 500);
                    lineHolder.remove()
                    let deathScreen = document.createElement("h2")
                    lineWrapper.appendChild(deathScreen)
                    deathScreen.innerHTML = "GAME OVER"
                }  
        }

        else if(gameWinningCounter === arrOfLetters.length){
            document.querySelector(".animation").src = "https://c.tenor.com/Y6CdzQSlXyMAAAAi/skeleton-necrodancer.gif"
            document.querySelector(".animation").style.width = "150px"
            document.querySelector(".animation").style.height = "100px"
            lineHolder.remove()
            let winningScreen = document.createElement("h2")
            lineWrapper.appendChild(winningScreen)
            winningScreen.innerHTML = "YOU WIN"
            conga.play()
        }

    }, false);
}



function createGame(){
    startGame.addEventListener("click", function backend(){
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
            console.log(arrOfLetters)
            gameLogic(result[0])
            
        })
    }
    )
    
}


createGame()
menuCreation()

// newGame.addEventListener("click", ()=> {
//     incorrectGuesses = 0
//     let removedImg = document.querySelector(".animation")
//     removedImg.remove()
//     let removedLines = document.querySelectorAll(".line")
//     let removedHearts = document.querySelectorAll(".life")
//     console.log(removedLines)
//     removedLines.forEach((item) =>{
//         item.remove()
//     })
//     removedHearts.forEach((item) => {
//         item.remove()
//     })
//     createGame()
// })

newGame.addEventListener("click", () =>{ 
window.location.reload()
})