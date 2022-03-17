
let overCircle = false;
let locked = false;
let xOffset = 0.0;
let yOffset = 0.0;

let circlePos = [300, 150];
let circleRadius = 50;

// ##################### SETUP #####################

function setup() {
	
	canvas_w = 1000;
	canvas_h = 0.5*canvas_w;

	canvas = createCanvas(canvas_w, canvas_h);
	canvas.parent('simple-sketch-holder');

	
	
}

// ##############################################################################################
// ##############################################################################################
// ##############################################################################################
// ########################################      DRAW    ########################################

function draw() {

	background(200);
	fill(0);	
	drawFPS(1000);

	if( pow( mouseX - circlePos[0], 2 ) + pow( mouseY - circlePos[1], 2) < pow(circleRadius, 2) ){
  	overCircle = true;  	
  }

  circle (circlePos[0], circlePos[1], 50);

}

// ##############################################################################################
// ##############################################################################################
// ##############################################################################################
// ########################################  FUNCTIONS   ########################################




function mousePressed(){

	if (overCircle == true){
		locked = true;		
	}
	else{
		locked = false;
	}
  xOffset = mouseX - circlePos[0];
  yOffset = mouseY - circlePos[1];
}

function mouseDragged(){
	if (locked){		
		circlePos[0] = mouseX - xOffset;
    circlePos[1] = mouseY - yOffset;
	}
}

function mouseReleased() {
  locked = false;
}