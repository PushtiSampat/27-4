const canvas = document.getElementById("canvas");
const back = document.getElementById("background");
back.style.display = "none";
const girlImg = document.getElementById("girl");
girlImg.style.display = "none";
const ladder = document.getElementById("ladder");
ladder.style.display = "none";
const plank = document.getElementById("plank");
plank.style.display = "none";
const gold = document.getElementById("gold");
gold.style.display = "none";
const bag = document.getElementById("bag");
bag.style.display = "none";
const life = document.getElementById("life");
life.style.display = "none";
const ctx = canvas.getContext("2d");
let rect = canvas.getBoundingClientRect();
const cmpStackGame = new CanvasComponent(canvas);
['load', 'resize'].forEach(event => {
    window.addEventListener(event, () => {
        main();
    }), false;
});
var ladders = [];
var ladderCount = 0;
var goldCollectedCount = 0;
var curruntLadder;
var planks = Array();
var girl;
var prevLadderCount = 0;
var goldPoints = [new Point(250, 100), new Point(550, 100), new Point(920, 100)];
canvas.addEventListener("mousedown", mouseDown, false);
function mouseDown(e) {
    var i = 0;
    var [canvasX, canvasY] = cmpStackGame.getCursorPosition(e);
    let pt = new Point(canvasX, canvasY);
    for (i = 0; i < planks.length; i++) {
        if (planks[i].isinside(pt)) {
            if (planks[i].status != "putted") { //if plank is on ground
                planks[i].isDragable = true;
            }
            else if (ladders[prevLadderCount].isTopPlank(planks[i])) { //to pop the top plank from ladder
                planks[i].isDragable = true;
            }
        }
    }
}
canvas.addEventListener('mousemove', e => {
    var [canvasX, canvasY] = cmpStackGame.getCursorPosition(e);
    let pt = new Point(canvasX, canvasY);
    for (let i = 0; i < planks.length; i++) {
        if (planks[i].isDragable) {
            let pt1 = new Point(pt.x - planks[i].width / 2, pt.y - planks[i].height / 2);
            putPlank(planks[i], pt1); //draw plank on mouse move
        }
    }
});
var isLadderFull = false;
canvas.addEventListener('mouseup', e => {
    var [canvasX, canvasY] = cmpStackGame.getCursorPosition(e);
    let pt = new Point(canvasX, canvasY);
    for (let i = 0; i < planks.length; i++) {
        if (planks[i].isDragable) {
            if (planks[i].status == "putted") { // if putted so for pop
                ladders[prevLadderCount].top--;
                ladders[prevLadderCount].pop();
                planks[i].status = "outside";
            }
            if (!checkPlankForCorrectPosition(curruntLadder, planks[i])) //wrong position
             {
                planks[i].p = planks[i].originalPoints;
            }
            else { //corect posiion push
                curruntLadder.push(planks[i]); //push currunt plank on ladders plank array
                planks[i].p = curruntLadder.correctPositions[curruntLadder.top];
                planks[i].status = "putted";
                if (curruntLadder.top == 5)
                    prevLadderCount = ladderCount;
                curruntLadder.top++;
                if (curruntLadder.top > 5) {
                    isLadderFull = true;
                    animateGirl(ladders[ladderCount]);
                    console.log("hi");
                    curruntLadder = ladders[++ladderCount];
                }
            }
            planks[i].isDragable = false;
        }
    }
    updateStackGameCanvas();
});
//# sourceMappingURL=GameApp.js.map