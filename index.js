'use strick';
const keyboard = document.getElementById('keyboard');
const tryWord = document.getElementById('wordle');
const del = document.getElementById('del');
let trying = tryWord.children;
let flagEvent = true;

let tryCounter = 0;
let wordCounter = 0;
const correctWord = "HOUSE"
// events //////////////////////////////////////////////////////////////////////
const addEvent = () => {
    for(let i=0; i<keyboard.children.length; i++){
        let n = keyboard.children[i].children.length;
        for(let j=0; j<n; j++){
            keyboard.children[i].children[j].addEventListener('click', (e)=>game(e))
        }
    }
}

addEvent();
// GAME FUNCTIONS //////////////////////////////////////////////////////////////
const dlt = (e)=>{
    if(wordCounter>0){
        wordCounter--;
        trying[tryCounter].children[wordCounter].textContent="";
    }
    
}
const write = (e, input) =>{
    trying[tryCounter].children[wordCounter].textContent = input;
    wordCounter++;
}

const check = (e, input) =>{
    let corrects = 0;
    if(wordCounter<5) {
        console.log("write a complete word");
        return;
    }
    //get word
    let word = "";
    let attempt = trying[tryCounter].children;
    for(let i=0; i<5; i++) word = word + attempt[i].textContent;
    // correctnes check
    for(let i=0; i<5; i++) {
        if(word[i]==correctWord[i]) {
            attempt[i].classList.add('green');
            corrects++;
        }
        else if (correctWord.includes(word[i])) attempt[i].classList.add('orange');
        else attempt[i].classList.add('checked');
    }
    tryCounter++;
    wordCounter=0;

    //winning
    if(corrects==5) {
        console.log("You won!");
        keyboard.classList.add('none');
        return;
    }
    //loosing
    if(tryCounter==6) {
        console.log("You loose!");
        keyboard.classList.add('none');
        return;
    }
}

const game = (e) =>{
    let input = e.target.textContent;
    if(wordCounter<5 && input!='DEL' && input!='INTRO') write(e, input);
    if(input=='DEL') dlt(e);
    if(input=='INTRO') check(e);
}
