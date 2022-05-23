var gas;
var rotation = 0;
var rotact = 0;
var speed = 0;
var rotSpeed = 0;

var leftdown = false;
var rightdown = false;
var updown = false;
var downdown = false;

var move_x = 0;
var move_y = 0;

var missionsComplete = 1;

var movel = false;
var mover = false;     
var moveu = false;
var moved = false;
var trackl = false;
var trackr = false;

var neutraling = false;
var alligning = false;
var retryactive = false;

// Colors
var sandcolor, sandcolornight, roadcolor, roadcolornight, playcolor;

// objects
var playbutton, playtext;
var gamenametext, gamenametext2, gamenametext3, controlstext, versiontext;
var retrybutton, retrytext;
var gaspos1x, gaspos2x, gaspos3x, gaspos4x, gaspos1y, gaspos2y, gaspos3y, gaspos4y;
var milecounter, gasnum, gascounter;

var desert1, desert2, desert3, desert4;
var cactus, roadintersect, roadcolor, roadLeft, roadRight, roadBottom, roadTop, house, cactusImage, gasImage;
var miles; 
var carbody;
var music1, track0, track1;
var tracknum;
var mousex, mousey;

var collected = 0;
var numToCollect;
var taskLabel;

function tracknext(){
    music1.pause();
    if(tracknum < 1){
        tracknum = tracknum + 1;
    }
    if(tracknum == 0){
        desert1.setColor(sandcolor);
        desert2.setColor(sandcolor);
        desert3.setColor(sandcolor);
        desert4.setColor(sandcolor);
        music1 = track0;
        music1.play(track0);
        music1.loop = true;
    }
    if(tracknum == 1){
        desert1.setColor(sandcolornight);
        desert2.setColor(sandcolornight);
        desert3.setColor(sandcolornight);
        desert4.setColor(sandcolornight);
        music1 = track1;
        music1.play(track1);
        music1.loop = true;
    }
}
function askMathQuestion() {
    var x = Randomizer.nextInt(4, 13);
    var y = Randomizer.nextInt(2, 12);

    var response = parseInt(prompt("What is " + x + "x" + y + "?"));

    var answer = x * y;
    while(response != answer) {
        response = parseInt(prompt("Try again: what is " + x + "x" + y + "?"));
    }
}

function trackprevious(){
    music1.pause();
    if(tracknum > 0){
        tracknum = tracknum - 1;
    }
    if(tracknum == 0){
        desert1.setColor(sandcolor);
        desert2.setColor(sandcolor);
        desert3.setColor(sandcolor);
        desert4.setColor(sandcolor);
        music1 = track0;
        music1.play(track0);
        music1.loop = true;
    }
    if(tracknum == 1){
        desert1.setColor(sandcolornight);
        desert2.setColor(sandcolornight);
        desert3.setColor(sandcolornight);
        desert4.setColor(sandcolornight);
        music1 = track1;
        music1.play();
        music1.loop = true;
    }
}

function onMouseMove(e) {
	mouse_x = e.getX();
	mouse_y = e.getY();
}

function whatisclicked(){
    var clicked = getElementAt(mouse_x,mouse_y);
    if(clicked == playbutton || clicked == playtext){
        addgame();
        removemenu();
    }else if(clicked == retrybutton || clicked == retrytext){
        remove(retrybutton);
        remove(retrytext);
        carretry();
    }
}


function died() {
    if(retryactive == false){
        remove(carbody);
        speed = 0;
        rotSpeed = 0;
        stopTimer(depletetank);
        add(retrybutton);
        add(retrytext);
        retryactive = true;
        askMathQuestion();
        stopTimer(driftLeft);
        stopTimer(driftRight);
        stopTimer(accelerate);
        stopTimer(decelerate);
    }
}

function addmenu() {
    add(playbutton);
    add(playtext);
    add(gamenametext);
    add(gamenametext2);
    add(gamenametext3);
    add(controlstext);
    add(versiontext);
}

function removemenu() {
    remove(playbutton);
    remove(playtext);
    remove(gamenametext);
    remove(gamenametext2);
    remove(gamenametext3);
    remove(controlstext);
    remove(versiontext);
}

function addgame() {
    add(desert1);
    add(desert2);
    add(desert3);
    add(desert4);
    add(roadintersect);
    add(roadLeft);
    add(roadRight);
    add(roadBottom);
    add(roadTop);
    add(milecounter);
    add(gascounter);
    add(gas);
    add(cactusImage);
    add(gasImage);
    add(house);
    add(carbody);
    add(taskLabel);
    music1.play();
    music1.loop = true;
    settimers();
    add(cactus);
    add(musiccred);

}

function carretry() {
    remove(retrybutton);
    remove(retrytext);
    leftdown = rightdown = updown = downdown = false;
    rotation = 0;
    rotact = 0;
    speed = 0;
    rotSpeed = 0;
    miles = 0;
    gasnum = 90;
    gas.setPosition(gaspos1x,gaspos1y);
    carbody = new WebImage("car.png");
    carbody.setSize(40, 20);
    carbody.setRotation(rotation);
    carbody.setPosition(getWidth()/2,getHeight()/2);
    add(carbody);
    setTimer(depletetank,500);
    milecounter.setText("Collected: " + collected);
    gascounter.setText("Gas: " + gasnum);
    retryactive = false;
    collected = 0;
}

function settimers(){
    setTimer(drive,20);
    setTimer(drift,20);
    setTimer(periodicchecks,100);
    setTimer(depletetank,500);
    setTimer(periodic2s,10);
}

function keyDown(e){
    
	if(e.keyCode == Keyboard.letter('A')){
	    if(movel == false){
	        movel = true;
	        setTimer(driftLeft,50);
	        stopTimer(reallign);
	    }
	}
	
	if(e.keyCode == Keyboard.letter('D')){
		if(mover == false){
	        mover = true;
	        setTimer(driftRight,50);
	        stopTimer(reallign);
	    }
	}
	
	if(e.keyCode == Keyboard.letter('W')){
		if(moveu == false){
	        moveu = true;
	        setTimer(accelerate,50);
	        stopTimer(neutralout);
	        neutraling = false;
	    }
	}
	
	if(e.keyCode == Keyboard.letter('S')){
	    if(moved == false){
	        moved = true;
	        setTimer(decelerate,50);
	        stopTimer(neutralout);
	        neutraling = false;
	    }
	}
	
	if(e.keyCode == Keyboard.letter('O') ){
	    if(trackl == false){
            trackl = true;
            trackprevious();
	    }
	}
	
	if(e.keyCode == Keyboard.letter('P') ){
	    if(trackr == false){
            trackr = true;
            tracknext();
	    }
	}
}

function drive(){
    var con = speed/90;
    if(rotact >= 0 && rotact < 90){
        var angle1 = 90 - rotact;
        move_y = -(rotact * con);
        move_x = (angle1 * con);
    }
    if(rotact >= 90 && rotact < 180){
        var angle1 = 90 - (rotact-90);
        move_x = -((rotact-90) * con);
        move_y = -(angle1 * con);
    }
    if(rotact >= 180 && rotact < 270){
        var angle1 = 90 - (rotact-180);
        move_y = ((rotact-180) * con);
        move_x = -(angle1 * con);
    }
    if(rotact >= 270 && rotact < 360){
        var angle1 = 90 - (rotact-270);
        move_x = ((rotact-270) * con);
        move_y = (angle1 * con);
    }
    if(speed != 0){
        carbody.move(move_x,move_y);
    }
}

function drift() {
    rotation = rotation + rotSpeed;
    rotact = rotact - rotSpeed;
    if(rotation >= 360){
        rotation = 0;
    }
    if(rotation <= -1){
        rotation = 359;
    }
    if(rotact >= 360){
        rotact = 0;
    }
    if(rotact <= -1){
        rotact = 359;
    }
    carbody.setRotation(rotation); 
}

var yeah = 0.2;

function driftRight() {
    rotSpeed = (rotSpeed + yeah);
} 

function driftLeft() {
    rotSpeed = (rotSpeed - yeah);
} 

function keyUp(e) {
    if(e.keyCode == Keyboard.letter('A')){
      stopTimer(driftLeft);
	    move_x = 0;
	    movel = false;
	}
	if(e.keyCode == Keyboard.letter('D')){
		  stopTimer(driftRight);
	    move_x = 0;
	    mover = false;
	}
  if(e.keyCode == Keyboard.letter('W')){
		  stopTimer(accelerate);
	    move_y = 0;
	    moveu = false;
	}
	if(e.keyCode == Keyboard.letter('S')){
	    stopTimer(decelerate);
	    move_y = 0;
	    moved = false;
	}
	if(e.keyCode == Keyboard.letter('O')){
        trackl = false;
	}
	if(e.keyCode == Keyboard.letter('P')){
        trackr = false;
	}
}

function accelerate(){
    if(speed < 0) {
        speed += 2 * yeah
    } else {
        speed += yeah;
    }
}

function decelerate(){
    if(speed > 0) {
        speed -= 2 * yeah
    } else {
        speed -= yeah;
    }
}

function neutralout(){
    if(speed > yeah){
        decelerate();
    }
    if(speed < -yeah){
        accelerate();
    }
    if(speed >= -yeah && speed <= yeah){
        speed = 0;
    }
}

function reallign(){
    if(rotSpeed > 0){
        driftLeft();
    }
    if(rotSpeed < 0){
        driftRight();
    }
    if( (rotSpeed < yeah && rotSpeed > -yeah) || (movel == true && rotSpeed < 0 && mover == false) || (movel == false && rotSpeed > 0 && mover == true) ){
        alligning = false;
        stopTimer(reallign);
    }
}

function periodicchecks(){
    if(moveu == false && moved == false && neutraling == false){
        neutraling = true;
	    setTimer(neutralout,75);
	}
	
	if( ( (movel == false && rotSpeed < 0 && mover == true) || (movel == true && rotSpeed > 0 && mover == false) || (movel == false && mover == false && (rotSpeed > 0 || rotSpeed < 0) ) ) && alligning == false){
        alligning = true;
	    setTimer(reallign,10);
	}else{
	    alligning = false;
	    stopTimer(reallign);
	}
}

function periodic2s(){
    checkOff();
  	checkOut();
  	gassedup();
}

function checkOut() {
    var xpos = carbody.getX();
    var ypos = carbody.getY();
    if (xpos > getWidth()){
        carbody.setPosition(0,ypos);
    }
    if (xpos < 0){
        carbody.setPosition(getWidth(),ypos);
    }
    if (ypos > getHeight()){
        carbody.setPosition(xpos,0);
    }
    if (ypos < 0){
        carbody.setPosition(xpos,getHeight());
    }
    
}

function depositCollection() {
    if(numToCollect == collected) {
        alert("Completed Mission " + missionsComplete);
        missionsComplete++;
        createTask();
    }
    collected = 0;
    milecounter.setText("Collected: " + collected);

}

function checkOff() {
    var basepointx = carbody.getX();
    var basepointy = carbody.getY();

    if(house.containsPoint(basepointx, basepointy)) {
        depositCollection();
        return;
    }
    if(gasImage.containsPoint(basepointx, basepointy)) {
        gasnum = 50;
        return;
    }
  
    if ( basepointx < ( (getWidth()/2 )-70 ) && basepointy < ( ( getHeight()/2 ) -70 ) ) {
        died();
    }
    
    if ( basepointx > ((getWidth()/2)+55) && basepointy < ((getHeight()/2)-70) ) {
        died();
    }
    
    if ( basepointx < ((getWidth()/2)-75) && basepointy > ((getHeight()/2)+55) ) {
        died();
    }
    
    if ( basepointx > ((getWidth()/2)+50) && basepointy > ((getHeight()/2)+50) ) {
        died();
    }
}

function gassedup() {
    var hitUp = getElementAt(gas.getX(),gas.getY()-gas.getRadius());
    var hitDown = getElementAt(gas.getX(),gas.getY()+gas.getRadius());
    var hitRight = getElementAt(gas.getX()+gas.getRadius(),gas.getY());
    var hitLeft = getElementAt(gas.getX()-gas.getRadius(),gas.getY());
    
    if( ( hitRight == carbody )
        || ( hitLeft == carbody )
    	  || ( hitUp == carbody )
    	  || ( hitDown == carbody ) ){
        collected ++;
	      remove(gas);
        gas = new Circle(10);
        gas.setColor(Color.red);
        miles++;
        milecounter.setText("Collected: " + collected);
        gascounter.setText("Gas: " + gasnum);
        var pos = Randomizer.nextInt(1, 4);
        if(pos == 1){
            gas.setPosition(gaspos1x,gaspos1y);
        }
        if(pos == 2){
            gas.setPosition(gaspos2x,gaspos2y);
        }
        if(pos == 3){
            gas.setPosition(gaspos3x,gaspos3y);
        }
        if(pos == 4){
            gas.setPosition(gaspos4x,gaspos4y);
        }
        add(gas);
	}
}

function depletetank() {
    gasnum--;
    gascounter.setText("Gas: " + gasnum);
    
    if(gasnum <= 0){
        died();
    }
}

function createTask() {
    numToCollect = Randomizer.nextInt(1 + missionsComplete, 3 + missionsComplete);

    if(taskLabel) {
        taskLabel.setText("Collect " + numToCollect + " and deliver to the hut!");
    } else {
        taskLabel = new Text("Collect " + numToCollect + " and deliver to the hut!", "16pt Arial")
    }
    taskLabel.setPosition(10, getHeight() / 6);
}

function setup() {
    sandcolor = new Color(239, 202, 52);
    sandcolornight = new Color(3, 23, 69);
    desert1 = new Rectangle((getWidth()/2)-50,(getHeight()/2)-50);
    desert1.setColor(sandcolor);
    desert1.setPosition(0,0);
    
    desert2 = new Rectangle( ((getWidth()/2)-50),((getHeight()/2)-50));
    desert2.setColor(sandcolor);
    desert2.setPosition(getWidth()-desert2.getWidth(),0);
    
    desert3 = new Rectangle((getWidth()/2)-50,(getHeight()/2)-50);
    desert3.setColor(sandcolor);
    desert3.setPosition(0,(getHeight()/2)+50);
    
    desert4 = new Rectangle((getWidth()/2)-50,(getHeight()/2)-50);
    desert4.setColor(sandcolor);
    desert4.setPosition(getWidth()-desert3.getWidth(),(getHeight()/2)+50);
    
    cactus = new WebImage("https://codehs.com/uploads/6368403ef56fb9363e90be605794eb43");
    cactus.setSize(20,40);
    cactus.setColor(Color.green);
    cactus.setPosition(getWidth()-desert3.getWidth()+25,(getHeight()/2)+75);

    roadintersect = new Rectangle(100,100);
    roadcolor = new Color(90, 90, 90);
    roadintersect.setColor(roadcolor);
    roadintersect.setPosition(getWidth()/2-(roadintersect.getWidth()/2),getHeight()/2-(roadintersect.getHeight()/2));
    
    roadLeft = new Rectangle((getWidth()/2)-50,100);
    roadLeft.setColor(roadcolor);
    roadLeft.setPosition(0,roadintersect.getY());
    
    roadRight = new Rectangle((getWidth()/2)-50,100);
    roadRight.setColor(roadcolor);
    roadRight.setPosition((getWidth()/2)+50,roadintersect.getY());
    
    roadBottom = new Rectangle(100,(getHeight()/2)+50);
    roadBottom.setColor(roadcolor);
    roadBottom.setPosition(roadintersect.getX(),(getHeight()/2)-50);
    
    roadTop = new Rectangle(100,(getHeight()/2)+50);
    roadTop.setColor(roadcolor);
    roadTop.setPosition(roadintersect.getX(),0);

    house = new WebImage("house.png");
    house.setSize(getWidth()/6, getHeight()/3);
    house.setPosition(getWidth() - house.getWidth() - 50, roadRight.getY() - house.getHeight());

    gasImage = new WebImage("gas.png");
    gasImage.setSize(getWidth()/8, getHeight()/8);
    gasImage.setPosition(getWidth()/4, roadLeft.getY() - gasImage.getHeight());

    cactusImage = new WebImage("cactis.png");
    cactusImage.setSize(getWidth()/3, getHeight()/3);
    cactusImage.setPosition(50, getHeight() - cactusImage.getHeight() - 50);
    
    
    miles = 0;
    pink = new Color(255,0,255);
    milecounter = new Text("Collected: " + collected, "15pt Arial");
    milecounter.setPosition((getWidth()/6)-(milecounter.getWidth()/2), 25);
    milecounter.setColor(pink);
    
    gasnum = 50;
    pink = new Color(255,0,255);
    gascounter = new Text("Gas: " + gasnum, "15pt Arial");
    gascounter.setPosition(((getWidth()/6)*5)-(gascounter.getWidth()/2), 25);
    gascounter.setColor(pink);
    
    carbody = new WebImage("car.png");
    carbody.setSize(40, 20);
    
    gaspos1x = (getWidth()/4);
    gaspos2x = ((getWidth()/4)*3);
    gaspos3x = (getWidth()/2);
    gaspos4x = (getWidth()/2);
    gaspos1y = (getHeight()/2);
    gaspos2y = (getHeight()/2);
    gaspos3y = (getHeight()/4);
    gaspos4y = ((getHeight()/4)*3);
    
    gas = new Circle(10);
    gas.setColor(Color.red);
    gas.setPosition(gaspos1x,gaspos1y);

    carbody.setPosition(getWidth()/2,getHeight()/2);

    createTask();
}

function start() {
    setup();
    keyDownMethod(keyDown);
    keyUpMethod(keyUp);
    
    /* mhm */
    playcolor = new Color(255,0,0);
    playbutton = new Rectangle(80,40);
    playbutton.setPosition(getWidth()/2-playbutton.getWidth()/2,getHeight()/3);
    playbutton.setColor(playcolor);
    playtext = new Text("Play" , "12pt Arial");
    playtext.setPosition(getWidth()/2-playtext.getWidth()/2, getHeight()/3+playbutton.getWidth()/3);
    playtext.setColor(Color.black);
    gamenametext = new Text("Wrong Turn" , "30pt Arial");
    gamenametext.setPosition(getWidth()/2-gamenametext.getWidth()/2,gamenametext.getHeight()+10);
    gamenametext.setColor(pink);
    gamenametext2 = new Text("A game about driving in the desert." , "10pt Arial");
    gamenametext2.setPosition(getWidth()/2-gamenametext2.getWidth()/2,gamenametext.getHeight()+30);
    gamenametext2.setColor(pink);
    gamenametext3 = new Text("Collect the red circles and deliver them to the hut. Stop for gas before you run out." , "10pt Arial");
    gamenametext3.setPosition(getWidth()/2-gamenametext3.getWidth()/2,gamenametext.getHeight()+60);
    gamenametext3.setColor(pink);
    controlstext = new Text("W - Accelerate, S - decelerate, A - Left, D - Right, O/P - Change Song" , "8pt Arial");
    controlstext.setPosition(getWidth()/2-controlstext.getWidth()/2,getHeight()/2);
    controlstext.setColor(pink);
    versiontext = new Text("V 0.1.6" , "10pt Arial");
    versiontext.setPosition(getWidth()/2-versiontext.getWidth()/2,getHeight()-50);
    versiontext.setColor(pink);
    
    retrybutton = new Rectangle(80,40);
    retrybutton.setPosition(getWidth()/2-retrybutton.getWidth()/2,getHeight()/3);
    retrybutton.setColor(pink);
    retrytext = new Text("Retry" , "12pt Arial");
    retrytext.setPosition(getWidth()/2-retrytext.getWidth()/2, getHeight()/3+retrybutton.getWidth()/3);
    retrytext.setColor(Color.black);
    
    addmenu();
    mouseClickMethod(whatisclicked);
    mouseMoveMethod(onMouseMove);
    
    
    tracknum = 0;
    
    music1 = new Audio("https://codehs.com/uploads/a9ae5bcbe2d946181fc8268b9625766d");
    
    track0 = new Audio("https://codehs.com/uploads/a9ae5bcbe2d946181fc8268b9625766d");
    track1 = new Audio("https://codehs.com/uploads/1cfc0258447c0b8d37e60086239c8e11");
}