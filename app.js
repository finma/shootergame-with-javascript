const jet = document.getElementById("jet");
const board = document.getElementById("board");

let score = 0;
let timeSpawnRock = 1500;

window.addEventListener("keydown", (e) => {
  const left = parseInt(window.getComputedStyle(jet).getPropertyValue("left"));
  if (e.key == "ArrowLeft" && left > 0) {
    jet.style.left = left - 20 + "px";
  }
  //460  =>  board width - jet width
  else if (e.key == "ArrowRight" && left <= 460) {
    jet.style.left = left + 20 + "px";
  }

  if (e.key == "ArrowUp" || e.keyCode == 32) {
    //32 is for space key
    const audio = new Audio("assets/pew-sound-effect.mp3");
    const bullet = document.createElement("div");

    audio.play();

    bullet.classList.add("bullets");
    board.appendChild(bullet);

    const movebullet = setInterval(() => {
      const rocks = document.getElementsByClassName("rocks");

      for (let i = 0; i < rocks.length; i++) {
        const rock = rocks[i];
        if (rock != undefined) {
          const rockbound = rock.getBoundingClientRect();
          const bulletbound = bullet.getBoundingClientRect();

          //Condition to check whether the rock/alien and the bullet are at the same position..!
          //If so,then we have to destroy that rock

          if (
            bulletbound.left >= rockbound.left &&
            bulletbound.right <= rockbound.right &&
            bulletbound.top <= rockbound.top &&
            bulletbound.bottom <= rockbound.bottom
          ) {
            rock.parentElement.removeChild(rock); //Just removing that particular rock;
            //Scoreboard
            document.getElementById("points").innerHTML =
              parseInt(document.getElementById("points").innerHTML) + 1;
            score++;
          }
        }
      }
      const bulletbottom = parseInt(
        window.getComputedStyle(bullet).getPropertyValue("bottom")
      );

      //Stops the bullet from moving outside the gamebox
      if (bulletbottom >= 500) {
        clearInterval(movebullet);
      }

      bullet.style.left = left + "px"; //bullet should always be placed at the top of my jet..!
      bullet.style.bottom = bulletbottom + 3 + "px";
    });
  }
});

const generaterocks = setInterval(() => {
  const rock = document.createElement("div");
  rock.classList.add("rocks");
  //Just getting the left of the rock to place it in random position...
  const rockleft = parseInt(
    window.getComputedStyle(rock).getPropertyValue("left")
  );
  //generate value between 0 to 450 where 450 => board width - rock width
  rock.style.left = Math.floor(Math.random() * 450) + "px";

  board.appendChild(rock);

  // Level game
  if (score >= 50) {
    timeSpawnRock = 1000;
  } else if (score >= 40) {
    timeSpawnRock = 1100;
  } else if (score >= 30) {
    timeSpawnRock = 1200;
  } else if (score >= 20) {
    timeSpawnRock = 1300;
  } else if (score >= 10) {
    timeSpawnRock = 1400;
  }
}, timeSpawnRock);

const moverocks = setInterval(() => {
  const rocks = document.getElementsByClassName("rocks");

  if (rocks != undefined) {
    for (let i = 0; i < rocks.length; i++) {
      //Now I have to increase the top of each rock,so that the rocks can move downwards..
      const rock = rocks[i]; //getting each rock
      const rocktop = parseInt(
        window.getComputedStyle(rock).getPropertyValue("top")
      );
      //475 => boardheight - rockheight + 25
      if (rocktop >= 475) {
        alert("Game Over");
        clearInterval(moverocks);
        window.location.reload();
      }

      rock.style.top = rocktop + 25 + "px";
    }
  }
}, 450);
