let user_score = 0;
let comp_score = 0;
const user_score_span = document.getElementById("user-score");
const comp_score_span = document.getElementById("comp-score");
const score_board_div = document.querySelector(".score-board");
const result_p = document.querySelector(".result > p");
const rock_div = document.getElementById("r");
const paper_div = document.getElementById("p");
const scissors_div = document.getElementById("s");

function get_comp_choice(){
    const choices = ['r', 'p', 's']
    return choices[Math.floor(Math.random()*3)] 
}

function convToWord(letter){
    if(letter === "r") return "Rock";
    if(letter === "p") return "Paper";
    return "Scissors";
}
function win(user_choice, comp_choice){
    const user_label_div = document.getElementById("user-label");
    const user_choice_div = document.getElementById(user_choice);
    const comp_choice_div = document.getElementById(comp_choice);
    user_score++;
    user_score_span.innerHTML = user_score;
    comp_score_span.innerHTML = comp_score;
    result_p.innerHTML = `${convToWord(user_choice)} beats ${convToWord(comp_choice)}. You win!`;
    user_choice_div.classList.add("green-glow");
    comp_choice_div.classList.add("red-glow");
    user_label_div.classList.add("highlight");
    setTimeout( () => { user_choice_div.classList.remove("green-glow"); 
                        comp_choice_div.classList.remove("red-glow");
                        user_label_div.classList.remove("highlight")} , 500);
}

function lose(user_choice, comp_choice){
    const comp_label_div = document.getElementById("comp-label");
    const user_choice_div = document.getElementById(user_choice);
    const comp_choice_div = document.getElementById(comp_choice);
    comp_score++;
    user_score_span.innerHTML = user_score;
    comp_score_span.innerHTML = comp_score;
    result_p.innerHTML = `${convToWord(user_choice)} loses to ${convToWord(comp_choice)}. You Lost!`;
    user_choice_div.classList.add("red-glow");
    comp_choice_div.classList.add("green-glow");
    comp_label_div.classList.add("highlight");
    setTimeout( () => { user_choice_div.classList.remove("red-glow"); 
                        comp_choice_div.classList.remove("green-glow"),
                        comp_label_div.classList.remove("highlight")} , 500);
}

function draw(user_choice, comp_choice){
    const user_label_div = document.getElementById("user-label");
    const comp_label_div = document.getElementById("comp-label");
    const user_choice_div = document.getElementById(user_choice);
    result_p.innerHTML = `Both chose ${convToWord(user_choice)}. It's a Draw!`;
    user_choice_div.classList.add("grey-glow");
    user_label_div.classList.add("highlight");
    comp_label_div.classList.add("highlight");
    setTimeout( () => { user_choice_div.classList.remove("grey-glow"),
                        user_label_div.classList.remove("highlight"),
                        comp_label_div.classList.remove("highlight")} , 500);
}

function game(user_choice){
    const comp_choice = get_comp_choice()
    switch(user_choice+comp_choice){
        case "rs":
        case "pr":
        case "sp":
            win(user_choice, comp_choice);
            break;
        case "sr":
        case "rp":
        case "ps":
            lose(user_choice, comp_choice);
            break;
        default:
            draw(user_choice, comp_choice);
    }
}
function main(){
    rock_div.addEventListener('click', () => game("r"))
    paper_div.addEventListener('click', () => game("p"))
    scissors_div.addEventListener('click', () => game("s"))
}

main()