// Challenge 1: Your Age in Days

function ageInDays() {
    var birthYear = prompt("What year were you born... Good friend?");
    var ageInDay = (2021 - birthYear) * 365;
    var h1 = document.createElement('h1');
    var textAnswer = document.createTextNode('You are ' + ageInDay + ' days old.');
    h1.setAttribute('id', 'ageInDays');
    h1.appendChild(textAnswer);
    document.getElementById('flex-box-result').appendChild(h1);
    // console.log(ageInDay);
}

function reset() {
    document.getElementById('ageInDays').remove();
}

function generateCat() {
    var image = document.createElement('img');
    var div = document.getElementById('flex-cat-gen');
    image.src = "http://thecatapi.com/api/images/get?mime_types=gif&size=small";
    div.appendChild(image);
}

//Challenge 3: Rock Paper Scissors
function rpsGame(yourChoice) {
    console.log(yourChoice.src);
    var humanChoice, botChoice;
    humanChoice = yourChoice.id;
    botChoice = numberToChoice(randToRpsInt());
    console.log(botChoice);
    results = decideWinner(humanChoice, botChoice); // [0,1]/[1,0]/[0.5,0.5]
    console.log(results);
    message = finalMessage(results); // {'message': "You won!", 'color':'green'}
    console.log(message);
    rpsFrontEnd(yourChoice.id, botChoice, message);
}

function randToRpsInt() {
    return Math.floor(Math.random() * 3);
}

function numberToChoice(number) {
    return ['rock', 'paper', 'scissors'][number];
}

function decideWinner(yourChoice, computerChoice) {
    var rpsDatabase = {
        'rock': { 'scissors': 1, 'rock': 0.5, 'paper': 0 },
        'paper': { 'scissors': 0, 'rock': 1, 'paper': 0.5 },
        'scissors': { 'scissors': 0.5, 'rock': 0, 'paper': 1 },
    }

    var yourScore = rpsDatabase[yourChoice][computerChoice];
    var computerScore = rpsDatabase[computerChoice][yourChoice];

    return [yourScore, computerScore];
}

function finalMessage([yourScore, computerScore]) {
    if (yourScore === 0) {
        return { 'message': 'You lost!', 'color': 'red' };
    } else if (yourScore === 0.5) {
        return { 'message': 'You tied!', 'color': 'yellow' };
    } else {
        return { 'message': 'You won!', 'color': 'green' };
    }
}

function rpsFrontEnd(humanImageChoice, botImageChoice, finalMessage) {
    var imagesDatabase = {
        'rock': document.getElementById('rock').src,
        'paper': document.getElementById('paper').src,
        'scissors': document.getElementById('scissors').src
    }

    document.getElementById('rock').remove();
    document.getElementById('paper').remove();
    document.getElementById('scissors').remove();

    var humanDiv = document.createElement('div');
    var botDiv = document.createElement('div');
    var messageDiv = document.createElement('div');

    humanDiv.innerHTML = "<img src='" + imagesDatabase[humanImageChoice] + "' height=150 width=150 style='box-shadow: 0px 10px 50px rgba(37,50,233,1)'>";
    botDiv.innerHTML = "<img src='" + imagesDatabase[botImageChoice] + "' height=150 width=150 style='box-shadow: 0px 10px 50px rgba(243,38,24,1);'>";
    messageDiv.innerHTML = "<h1 style='color:" + finalMessage['color'] + "; font-size: 60px; padding: 30px; '>" + finalMessage['message'] + "</h1>";

    document.getElementById("flex-box-rps-div").appendChild(humanDiv);
    document.getElementById("flex-box-rps-div").appendChild(messageDiv);
    document.getElementById("flex-box-rps-div").appendChild(botDiv);
}

// Challenge 4: Change the Color of All Buttons
var all_buttons = document.getElementsByTagName('button')
console.log(all_buttons);

var copyAllButtons = [];
for (let i = 0; i < all_buttons.length; i++) {
    copyAllButtons.push(all_buttons[i].classList[1]);
}

console.log(copyAllButtons);



function buttonColorChange(buttonThingy) {
    if (buttonThingy.value === 'red') {
        buttonsRed();
    } else if (buttonThingy.value === 'green') {
        buttonsGreen();
    } else if (buttonThingy.value === 'reset') {
        buttonColorReset();
    } else if (buttonThingy.value === 'random') {
        randomColors();
    }
}

function buttonsRed() {
    for (let i = 0; i < all_buttons.length; i++) {
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add('btn-danger');
    }
}

function buttonsGreen() {
    for (let i = 0; i < all_buttons.length; i++) {
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add('btn-success');
    }
}

function buttonColorReset() {
    for (let i = 0; i < all_buttons.length; i++) {
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add(copyAllButtons[i]);
    }
}

function randomColors() {
    var choices = ['btn-primary', 'btn-danger', 'btn-success', 'btn-warning']

    for (let i = 0; i < all_buttons.length; i++) {
        var randomNumber = Math.floor(Math.random() * 4);
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add(choices[randomNumber]);
    }
}

//Challenge 5： Blackjack
let blackjackGame = {
    'you': { 'scoreSpan': '#your-blackjack-result', 'div': '#your-box', 'score': 0 },
    'dealer': { 'scoreSpan': '#dealer-blackjack-result', 'div': '#dealer-box', 'score': 0 },
    'cards': ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'],
    'cardsMap': { '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9, '10': 10, 'K': 10, 'J': 10, 'Q': 10, 'A': [1, 11] },
    'wins': 0,
    'losses': 0,
    'draws': 0,
    'isStand': false,
    'turnsOver': false,
}

const YOU = blackjackGame['you'];
const DEALER = blackjackGame['dealer']

const hitSound = new Audio('static/sounds/swish.m4a');
const winSound = new Audio('static/sounds/cash.mp3');
const lossSound = new Audio('static/sounds/aww.mp3');

// querySelector is another way to get an element
// also add event listener save people from add onclick attr in html

document.querySelector('#blackjack-hit-button').addEventListener('click', blackjackHit);
document.querySelector('#blackjack-stand-button').addEventListener('click', dealerLogic);
document.querySelector('#blackjack-deal-button').addEventListener('click', blackjackDeal);

function blackjackHit() {
    if (blackjackGame['isStand'] === false) {
        let card = randomCard();
        console.log(card);
        showCard(YOU, card);
        updateScore(card, YOU);
        console.log(YOU['score']);
        showScore(YOU);
    }
}

function randomCard() {
    let randomIndex = Math.floor(Math.random() * 13);
    return blackjackGame['cards'][randomIndex];
}


function showCard(activePlayer, card) {
    if (activePlayer['score'] <= 21) {
        let cardImage = document.createElement('img');
        /*
        One way to do that is using string concatention
        cardImage.src = 'static/images/' + card + '.png';
        */
        //notice that the string below is quoted using the sign "`"
        //instead of single quote
        cardImage.src = `static/images/${card}.png`;
        document.querySelector(activePlayer['div']).appendChild(cardImage);
        hitSound.play();
    } else {

    }
}

function blackjackDeal() {
    if (blackjackGame['turnsOver'] === true) {
        let yourImages = document.querySelector('#your-box').querySelectorAll('img');
        let dealerImages = document.querySelector('#dealer-box').querySelectorAll('img');
        for (let i = 0; i < yourImages.length; i++) {
            yourImages[i].remove();
        }
        for (let i = 0; i < dealerImages.length; i++) {
            dealerImages[i].remove();
        }

        YOU['score'] = 0;
        DEALER['score'] = 0;

        blackjackGame['isStand'] = false;
        blackjackGame['turnsOver'] = false;

        document.querySelector(YOU['scoreSpan']).textContent = 0;
        document.querySelector(DEALER['scoreSpan']).textContent = 0;
        document.querySelector(YOU['scoreSpan']).style.color = 'white';
        document.querySelector(DEALER['scoreSpan']).style.color = 'white';

        document.querySelector('#blackjack-result').textContent = "Let's play";
        document.querySelector('#blackjack-result').style.color = "black";
    }
}

function updateScore(card, activePlayer) {
    if (card === 'A') {
        // if adding 11 keeps me below 21, add 11. Otherwise, add 1
        if (activePlayer['score'] + blackjackGame['cardsMap'][card][1] <= 21) {
            activePlayer['score'] += blackjackGame['cardsMap'][card][1];
        } else {
            activePlayer['score'] += blackjackGame['cardsMap'][card][0];
        }
    } else {
        activePlayer['score'] += blackjackGame['cardsMap'][card];
    }

}

function showScore(activePlayer) {
    if (activePlayer['score'] > 21) {
        document.querySelector(activePlayer['scoreSpan']).textContent = 'BUST!';
        document.querySelector(activePlayer['scoreSpan']).style.color = 'red';
    } else {
        document.querySelector(activePlayer['scoreSpan']).textContent = activePlayer['score'];
    }
}

function sleep(ms){
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function dealerLogic() {
    blackjackGame['isStand'] = true;

    while (DEALER['score'] < 16 && blackjackGame['isStand'] === true) {
        let card = randomCard();
        showCard(DEALER, card);
        updateScore(card, DEALER);
        showScore(DEALER);
        await sleep(1000);
    }
     
    blackjackGame['turnsOver'] = true;
    let winner = computeWinner();
    showResult(winner);
    console.log(blackjackGame['turnsOver']);

}

//compute winner and return who just won
// update the wins, draws, and losses
function computeWinner() {
    let winner;
    if (YOU['score'] <= 21) {
        // condition: higher score than dealer or when dealer busts but you're 21 or under
        if (YOU['score'] > DEALER['score'] || DEALER['score'] > 21) {
            console.log('You won!');
            blackjackGame['wins']++;
            winner = YOU;
        } else if (YOU['score'] < DEALER['score']) {
            console.log('You lost!');
            blackjackGame['losses']++;
            winner = DEALER;
        } else if (YOU['score'] === DEALER['score']) {
            console.log('You drew!');
            blackjackGame['draws']++;
        }
    } else if (YOU['score'] > 21 && DEALER['score'] <= 21) {
        // condition: when user busts but dealer doesn't
        console.log('You Lost!')
        blackjackGame['losses']++;
        winner = DEALER;
    } else if (YOU['score'] > 21 && DEALER['score'] > 21) {
        blackjackGame['draws']++;
        console.log('You drew!')
    }

    console.log("Winner is：" + winner);
    console.log(blackjackGame)
    return winner;
}

function showResult(winner) {
    let message, messageColor;

    if (blackjackGame['turnsOver'] === true) {

        if (winner === YOU) {
            document.querySelector('#wins').textContent = blackjackGame['wins'];
            message = 'You won!';
            messageColor = 'green';
            winSound.play();
        } else if (winner === DEALER) {
            document.querySelector('#losses').textContent = blackjackGame['losses'];
            message = 'You lost!';
            messageColor = 'red';
            lossSound.play();
        } else {
            document.querySelector('#draws').textContent = blackjackGame['draws'];
            message = 'You drew!';
            messageColor = 'black';
        }

        let result = document.querySelector('#blackjack-result');
        result.textContent = message;
        result.style.color = messageColor;
    }
}

// Challenge 6: AJAX & API's with Javascript
const url = 'https://randomuser.me/api/?results=25'

fetch(url)
.then(resp => resp.json())
.then(data => {
    let authors = data.results;
    console.log(authors)
    for(let i = 0; i < authors.length; i++){
        let div = document.createElement('div')
        let image = document.createElement('img')
        let p = document.createElement('p')
        p.appendChild(document.createTextNode(`${title(authors[i].name.first)} ${title(authors[i].name.last)}`));
        image.src = authors[i].picture.large;
        div.appendChild(image)
        div.appendChild(p)
        document.querySelector('.container-6 .flex-ajax-row-1').appendChild(div);

    }
});

let title = str => str[0].toUpperCase() + str.slice(1);