function setHeightAndWidthCanvas() {
    canvas.width = screen.width * 0.80;
    canvas.height = screen.height * 0.80;
}
function setBackgroudOfCanvas() {
    back.height = canvas.height;
    back.width = canvas.width;
    ctx.drawImage(back, 0, 0, canvas.width, canvas.height);
    ctx.drawImage(life, 1000, 5, life.width * 0.03, life.height * 0.03);
}
function setgirlOnCanvas() {
    var startX = 54;
    var startY = 391;
    girl = new Girl(girlImg);
    girl.draw();
}
function drawGirl() {
    // updateStackGameCanvas();
    girl.draw();
}
function setplanks() {
    /* var startX = canvas.width*0.245;
    var startY = canvas.height*0.8;  */
    var startX = 301;
    var startY = 553;
    for (let i = 0; i < 6; i++) {
        planks[i] = new Plank(new Point(startX, startY), plank);
        startX += plank.width + 20;
        planks[i].draw();
    }
}
function drawPlanks() {
    for (let i = 0; i < 6; i++) {
        planks[i].draw();
    }
}
function putPlank(plank, pt) {
    plank.p = pt;
    updateStackGameCanvas();
    plank.draw();
}
function setladderOnCanvas() {
    /*  var startX = canvas.width/11;
     var startY = canvas.height/3.3;  */
    var startX = 112;
    var startY = 209;
    // console.log("x= "+startX+"   y= "+startY);
    ladders[0] = new Ladder(canvas, ctx, new Point(startX, startY), ladder);
    ladders[0].draw();
    // startX = canvas.width/3;
    startX = 409;
    ladders[1] = new Ladder(canvas, ctx, new Point(startX, startY), ladder);
    ladders[1].draw();
    //startX = canvas.width/1.7;
    startX = 772;
    //console.log("x= "+startX+"   y= "+startY);
    ladders[2] = new Ladder(canvas, ctx, new Point(startX, startY), ladder);
    ladders[2].draw();
    ladders[0].correctPositions = [new Point(290, 490),
        new Point(290, 445),
        new Point(290, 400),
        new Point(290, 355),
        new Point(290, 310),
        new Point(290, 263)];
    ladders[1].correctPositions = [new Point(586, 490),
        new Point(586, 445),
        new Point(586, 400),
        new Point(586, 355),
        new Point(586, 310),
        new Point(586, 263)];
    ladders[2].correctPositions = [new Point(950, 490),
        new Point(950, 445),
        new Point(950, 400),
        new Point(950, 355),
        new Point(950, 310),
        new Point(950, 263)];
    curruntLadder = ladders[ladderCount];
}
function drawLadderOnCanvas() {
    for (let i = 0; i < ladders.length; i++) {
        ladders[i].draw();
    }
}
function checkPlankForCorrectPosition(ladder, plank) {
    if (ladder.top == 6)
        ladder.top = 5;
    if (ladder.isinside(plank.p, plank))
        return true;
    return false;
}
function updateStackGameCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setBackgroudOfCanvas();
    drawLadderOnCanvas();
    drawGolds();
    drawPlanks();
    drawGirl();
}
function main() {
    setHeightAndWidthCanvas();
    setladderOnCanvas();
    setplanks();
    setgirlOnCanvas();
    updateStackGameCanvas();
}
function drawGolds() {
    for (let i = 0; i < 3; i++) {
        if (goldCollectedCount >= i + 1)
            ctx.drawImage(bag, goldPoints[i].x, goldPoints[i].y, bag.width * 0.24, bag.height * 0.23);
        else
            ctx.drawImage(gold, goldPoints[i].x, goldPoints[i].y, gold.width * 0.50, gold.height * 0.50);
    }
}
function godownGirl(ladder) {
    if (girl.isOnTop) {
        console.log("hi1");
        if (girl.pt.y < girl.originalPt.y) {
            console.log("hi2");
            girl.pt.y++;
            updateStackGameCanvas();
        }
        else {
            console.log("hi3");
            girl.isOnTop = false;
        }
    }
    else if (girl.pt.x < ((ladder.p.x + ladder.width * 0.24) + 100)) {
        console.log("hi4");
        girl.pt.x++;
        updateStackGameCanvas();
    }
    requestAnimationFrame(() => { godownGirl(ladder); });
}
function animateGirl(ladder) {
    //  console.log(ladder.p.x+ladder.width*0.23);
    if (girl.isOnTop) {
        if (girl.pt.y < girl.originalPt.y) {
            girl.pt.y++;
            updateStackGameCanvas();
        }
        else {
            girl.isOnTop = false;
        }
    }
    else if (girl.pt.x < (ladder.p.x + ladder.width * 0.24)) {
        girl.pt.x++;
        updateStackGameCanvas();
    }
    else if (girl.pt.y > ladder.p.y) {
        girl.pt.y--;
        updateStackGameCanvas();
    }
    else {
        girl.isOnTop = true;
        goldCollectedCount++;
        updateStackGameCanvas();
        godownGirl(ladder);
        return;
    }
    requestAnimationFrame(() => { animateGirl(ladder); });
}
//# sourceMappingURL=StackGameUtils.js.map