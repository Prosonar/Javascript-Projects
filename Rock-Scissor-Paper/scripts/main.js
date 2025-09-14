const moves = ["rock", "paper", "scissor" ];
const results = ["Player wins!", "Computer wins!", "Tie!"];

function makeMove(playerMove) {

  if(!moves.includes(playerMove)){
    return;
  }

  const randomNumber = Math.random();
  let computerMove = "";

  if(randomNumber < 1/ 3){
    computerMove = moves[0];
  }
  else if(randomNumber > 1/3 && randomNumber < 2/ 3){
    computerMove = moves[1];
  }else{
    computerMove = moves[2];
  }

  let result = checkResult(playerMove, computerMove);

  document.querySelector('.js-result-text').innerHTML = `<strong>${result}</strong>`;
  document.querySelector('.js-moves-text').innerHTML = `You <img src="images/${playerMove}.png" class="move-icon" /> - <img src="images/${computerMove}.png" class="move-icon" /> Computer`;
  
  updateScore(result);
}

function checkResult(playerMove, computerMove) {
  let result = "";

  if(playerMove === computerMove){
    result = results[2];
  }
  else{
    if(playerMove === moves[0]){
      if(computerMove === moves[2]){
        result = results[0];
      }else{
        result = results[1];
      }
    }else if(playerMove === moves[2]){
      if(computerMove === moves[1]){
        result = results[0];
      }else{
        result = results[1];
      }
    }else{
      if(computerMove === moves[0]){
        result = results[0];
      }
      else{
        result = results[1];
      }
    }
  }

  return result;
}

function updateScore(result) {
  const scores = localStorage.getItem('scores') ? JSON.parse(localStorage.getItem('scores')) : {
    wins: 0,
    losses: 0,
    ties: 0
  };
  console.log(result);
  if (result === results[0]) {
    scores.wins ++;
  }
  else if (result === results[1]) {
    scores.losses ++;
  } else {
    scores.ties ++;
  }

  localStorage.setItem('scores', JSON.stringify(scores));

  document.querySelector('.js-scores-text').innerHTML = `Wins: ${scores.wins}, Losses: ${scores.losses}, Ties:${scores.ties}`;
}

function resetGame() {
  localStorage.removeItem('scores');
  document.querySelector('.js-scores-text').innerHTML = ``;
  document.querySelector('.js-result-text').innerHTML = ``;
  document.querySelector('.js-moves-text').innerHTML = ``;
}