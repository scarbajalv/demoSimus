let pi = 3.1415926;
let frame = 0;
let slider;
let aux_deltaTime_Sum = 0;
let aux_deltaTime_Av = 0;

let amplitude = 4;
let omega = 1;
let b = 1;

let overCircle = false;
let locked = false;
let xOffset = 0.0;
let yOffset = 0.0;

let clicCount = 0;

let circlePos = [300, 150];

let circlePos_trans = [-400, 100];

// ##################### SETUP #####################

function setup() {

	//frameRate(30);
	
	canvas_w = 1000;
	canvas_h = 0.5*canvas_w;

	canvas = createCanvas(canvas_w, canvas_h);
	canvas.parent('simple-sketch-holder');	

	// AXES

	
	
}

// ##############################################################################################
// ##############################################################################################
// ##############################################################################################
// ########################################      DRAW    ########################################

function draw() {

	background(200);
	fill(0);
	text(mouseX, 10, 50);
	text(mouseY, 50, 50);
	drawFPS(1000);	


	center_x = 0.65*canvas_w;
	center_y = 0.5*canvas_h;



	mouseX_trans = mouseX - center_x;
	mouseY_trans = -(mouseY - center_y);
	text(mouseX_trans, 10, 100);
	text(mouseY_trans, 50, 100);

	circlePos_trans = [circlePos[0] - center_x, -(circlePos[1] - center_y)];
	text(circlePos_trans[0], 10, 200);
	text(circlePos_trans[1], 50, 200);	

	push();

		noFill();

		translate(center_x, center_y);
		scale(1,-1);
		radius = 600;

		strokeWeight(10);
		point(0, 0);

		strokeWeight(2);
		arc(0, 0, radius, radius, -3.1415/4, 3.1415/4);	  

		
		rect1 = [circlePos_trans[0], circlePos_trans[1]];
		circleWidth = 15;
		rectWidth = 0.25*circleWidth;



		push();
			fill(0);
			if( pow( mouseX_trans - circlePos_trans[0], 2 ) + pow( mouseY_trans - circlePos_trans[1], 2) < pow(circleWidth, 2) ){
		  	push();
		  		scale(1, -1);
		  		text("overCircle" , 0, -60);
		  	pop();
		  	overCircle = true;
		  }
		pop();
		

			
		fill(100);
		rect(circlePos_trans[0] - 0.5*rectWidth, circlePos_trans[1], rectWidth, -circlePos_trans[1]);

		fill("red");
		circle( circlePos_trans[0], circlePos_trans[1], circleWidth);
		

	pop();


	line(0, 0.5*canvas_h, canvas_w, 0.5*canvas_h);
	

  /*if (
    (mouseX - ) + () == circleWidth^2
  ) {
    overBox = true;
    if (!locked) {
      stroke(255);
      fill(244, 122, 158);
    }
  } else {
    stroke(156, 39, 176);
    fill(244, 122, 158);
    overBox = false;
  }*/

  text(clicCount, 200, 200);


	

	

}

// ##############################################################################################
// ##############################################################################################
// ##############################################################################################
// ########################################  FUNCTIONS   ########################################




function mousePressed(){

	if (overCircle == true){
		locked = true;
		text("LOCKED", 100, 200);
		clicCount = clicCount + 1;
	}
	else{
		locked = false;
	}
  xOffset = mouseX - circlePos[0];
  yOffset = mouseY - circlePos[1];
}

function mouseDragged(){
	if (locked){
		text("DRAG NOW", 100, 220);
		clicCount = clicCount + 1;
		circlePos[0] = mouseX - xOffset;
    circlePos[1] = mouseY - yOffset;
	}

}

function mouseReleased() {
  locked = false;
}