let firstPage = document.querySelector('.section1')
let secondpage =document.querySelector('.section2')
let play =document.querySelector('.play')

let letters = document.querySelector('.letters')
let hangmanWord =document.querySelector('.hangman-word')
let point = document.querySelector('.point')
let hangmanPicture = document.querySelector('#hangman-picture')

// ICON TROPHY PART 
let currentPoint=0

function updatePoint(){
    currentPoint+=10
    point.textContent = currentPoint

}


play.addEventListener('click', function(){
    firstPage.style.display="none";
    secondpage.style.display = 'block'
   getRandomAnimal()
})


let animals = ['frog','cat','dog','elephant','bird','bear','bee','lion']
let randomAnimal

function getRandomAnimal(){
    randomAnimal = animals[Math.floor(Math.random() *animals.length)];
    createWord()
}

function createWord(){
    hangmanWord.innerHTML = randomAnimal.replace(/[a-zA-Z]/g, '_ ')
}



letters.addEventListener('click',function(event){
    if(event.target.classList.contains('btn')){
        let clickedLetter = event.target.value
        checkLetter(clickedLetter)
    }
})

function checkLetter(letter){
    let arr = []
    let correctGuess = false 
    for(let i =0; i<randomAnimal.length; i++){
        if(randomAnimal[i]===letter){
            arr.push(i)
            correctGuess = true
        }
    }
    if(correctGuess){
     updateLetter(arr,letter)
     updatePoint()
     playCorrectSound()
     if(hangmanWord.textContent.replace(/\s/g, '') === randomAnimal){
        playVictorySound()
        
     }
    }else{
        markWrong(letter)
        playWrongSound()
        updateHangman()

    }
}

//Find right letter
function updateLetter(arr,letter){
    let word= hangmanWord.textContent.split(' ')
    arr.forEach(function(index){
        word[index] = letter
    })
    hangmanWord.textContent = word.join(' ')
    let button = document.querySelector(`.btn[value="${letter}"]`);
    button.style.color = 'green'
    button.style.boxShadow = '0 0 3px rgba(0, 255, 0, 0.5)'
}


// FOR BRINGING red color on wrong letter
function markWrong(letter) {
    let button = document.querySelector(`.btn[value="${letter}"]`);
    // button.classList.add('wrong')
    button.style.color ='red'
    button.style.boxShadow = '0 0 3px rgba(255, 0, 0, 0.5)'
}

//BRING SOUND
function playCorrectSound() {
    let correctSound = document.getElementById('correct-sound');
    correctSound.play();
}

// BRING SOUND
function playWrongSound(){
    let wrongSound = document.getElementById('wrong-sound')
    wrongSound.play()
}

// BRINg SOUND
function playVictorySound(){
    let victorySound = document.getElementById('victory-sound')
    victorySound.play()
    showResult("You Win!")
}


//HANGMAN CONTAINER
let hangmanStep=0

function updateHangman(){
    hangmanStep++
    hangmanPicture.src = `hangman-${hangmanStep}.svg`
    if(hangmanStep===6){
    // alert('You lost the game!')
    showResult("You Lose! The word was " + randomAnimal)
    resetPoints()

    }
}

//ZERO THE POINT
function resetPoints() {
    currentPoint = 0;
    point.textContent = currentPoint;
}

//RESULT POPUP

function showResult(resultMessage) {
    let resultText = document.getElementById("result-text");
    resultText.textContent = resultMessage;

  
    let newGamePopup = document.getElementById("new-game-popup");
    newGamePopup.style.display = "block";

    let newGameButton = document.getElementById("new-game-button");
    newGameButton.addEventListener("click", newGame);
}


//NEW GAME FUNCTION
function newGame() {
    let newGamePopup = document.getElementById("new-game-popup");
    newGamePopup.style.display = "none";

    hangmanStep = 0;
    hangmanPicture.src = `./hangman-${hangmanStep}.svg`;

    let buttons = document.querySelectorAll('.btn');
    buttons.forEach(function(button) {
        button.style.color = '';
        button.style.boxShadow = '';
    });

    hangmanWord.textContent = '';
    createWord();

    secondpage.style.display = 'block';
    getRandomAnimal();
}


