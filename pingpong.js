var ball=document.getElementById("ball");
var rod1=document.getElementById("rod1");
var rod2=document.getElementById("rod2");
var s=document.getElementById("scoreofplayer");

let maxscore=0;
let score=0;
let speedx=4;
let speedy=4;
let gameover=false;



// ball.style.left = window.innerWidth/2+'px';
// ball.style.top = (rod2.offsetTop - rod2.offsetHeight-8) + 'px';



const storeName = "PlayerName";
const storeScore = "PlayerMaxScore";
const resetall = function resetLocalStorage() {
    localStorage.removeItem(storeName);
    localStorage.removeItem(storeScore);
}

// Use of A D and Enter key
window.addEventListener('keypress',function(event){
    
    let rodcoord=rod1.getBoundingClientRect();
    if(event.code==="KeyD"&&rodcoord.right<this.window.innerWidth-20){
    rod1.style.left=rodcoord.x+30+'px';
    rod2.style.left=rodcoord.x+30+'px';
    }
    else if(event.code==="KeyA"&&rodcoord.x>10){
       rod1.style.left=rodcoord.x-30+'px';
       rod2.style.left=rodcoord.x-30+'px';
    }



    if(event.code==="Enter"){
        
        
        // Game executes till the gameover condition is true
        if(gameover==false){

            let ballcoord=ball.getBoundingClientRect();
            let ballx=ballcoord.x;
            let bally=ballcoord.y;

            // Ball movement in x and y direction when hit by the rod and side window
            movement=setInterval(function(){
                let rodcoord1=rod1.getBoundingClientRect();

                let rodcoord2=rod2.getBoundingClientRect();

                
                    ballx+=speedx;
                    bally+=speedy;
                    ball.style.left=ballx+'px';
                    ball.style.top=bally+'px';
                    if(ballx<0||ballx>=window.innerWidth-20){
                        speedx=-speedx;
                    }
                    if(bally<=rodcoord1.bottom){
                        if(ballx>(rodcoord1.x)&&ballx<(rodcoord1.right)){
                            speedy=-speedy;
                            score++;
                            s.innerText="Score:"+score*100;
                        }
                        else if(bally<=0||(bally<rodcoord1.bottom&&(ballx>rodcoord1.x&&ballx<rodcoord1.right)))
                        endofgame("Rod2",score);

                    }  
                    else if(bally>=rodcoord2.y-20){
                        if(ballx>=rodcoord2.x&&ballx<=rodcoord2.right){
                            speedy=-speedy;
                            score++;
                            s.innerText="Score:"+score*100;

                        }
                        else if(bally>=rodcoord2.y)
                        endofgame("Rod1",score);

                    }  
               },10);
        
        }
    }
});

// Store the maximum score and player name in local storage
function endofgame(rodname,score){
    if(score>maxscore){
        maxscore=score;
        localStorage.setItem(storeName, rodname);
        localStorage.setItem(storeScore,maxscore);
    }
    clearInterval(movement);
    resetgame(rodname);
    alert(rodname+"is the winner. Score= "+(score*100)+" Max score is= "+(maxscore*100));

    
}

// After the end of game the rods and balls are reset to the original position with the ball being with the losing rod
// function resetgame(rodname){
//     rod1.style.left = (window.innerWidth - rod1.offsetWidth) / 2 + 'px';
//     rod2.style.left = (window.innerWidth - rod2.offsetWidth) / 2 + 'px';
//     ball.style.left = window.innerWidth/2+'px';

//     if(rodname==="Rod2"){
//         ball.style.top = (rod1.offsetTop + rod1.offsetHeight+2) + 'px';
//         ballSpeedY = 4;
//         score=0;
//     }
//     else if (rodname === "Rod1") {
//         ball.style.top = (rod2.offsetTop - rod2.offsetHeight-8) + 'px';
//         ballSpeedY = -4;
//         score=0;
//     }

//     score = 0;
//     s.innerText="Score:0";
    
    


// }


function resetgame(rodname) {
    rod1.style.left = (window.innerWidth - rod1.offsetWidth) / 2 + 'px';
    rod2.style.left = (window.innerWidth - rod2.offsetWidth) / 2 + 'px';

    // Set the initial position of the ball above rod2
    ball.style.left = (rod2.offsetLeft + rod2.offsetWidth / 2 - ball.offsetWidth / 2) + 'px';
    ball.style.top = (rod2.offsetTop - ball.offsetHeight) + 'px';

    if (rodname === "Rod2") {
        ballSpeedY = 4;
        score = 0;
    } else if (rodname === "Rod1") {
        ballSpeedY = -4;
        score = 0;
    }

    s.innerText = "Score:0";
}

window.addEventListener('beforeunload', function () {
    resetall();
});

// To display appropriate message when the player plays for the first time
(function () {
    rodname = localStorage.getItem(storeName);
    maxscore = localStorage.getItem(storeScore);

    if (rodname === "null" || maxscore === "null") {
        alert("Welcome to Ping Pong Game. Let's begin.");
        maxscore = 0;
        rodname = "Rod1";
    } else {
        if(!rodname){
            alert("Press enter to begin");
        }
        else{
            alert(rodname + " has maximum score of " + maxscore * 100);
        }
        
        // alert("Press Enter to begin");
    }
    score=0;

    resetgame(rodname);
})();



