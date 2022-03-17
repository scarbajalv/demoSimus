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
let newCirclePos = [circlePos[0], circlePos[1]];

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
	drawFPS(1000);	


	center_x = 0;
	center_y = 0.5*canvas_h;

	//if ( circlePos[1] < 100 ) circlePos[1] = 100;



	mouseX_trans = mouseX - center_x;
	mouseY_trans = -(mouseY - center_y);

	circlePos_trans = [circlePos[0] - center_x, -(circlePos[1] - center_y)];



	push();

		noFill();

		translate(center_x, center_y);
		scale(1,-1);
		lenDiameter = 1200;

		strokeWeight(10);
		point(0, 0);
		point(lenDiameter/4, 0);

		strokeWeight(2);
		arc(0, 0, lenDiameter, lenDiameter, -3.1415/4, 3.1415/4);	  

		
		rect1 = [circlePos_trans[0], circlePos_trans[1]];
		circleRadius = 15;
		rectWidth = 0.25*circleRadius;



		push();
			fill(0);
			if( pow( mouseX_trans - circlePos_trans[0], 2 ) + pow( mouseY_trans - circlePos_trans[1], 2) < pow(circleRadius, 2) ){
		  	overCircle = true;
		  }
		pop();
		

			
		fill(100);
		rect(circlePos_trans[0] - 0.5*rectWidth, circlePos_trans[1], rectWidth, -circlePos_trans[1]);

		fill("yellow");
		circle( circlePos_trans[0], circlePos_trans[1], circleRadius);
		

	pop();


	// RAY 1
	push();
		stroke("red");
		point_1 = [  center_x + sqrt( pow(lenDiameter/2, 2) - pow(center_y - circlePos[1], 2) ), circlePos[1] ];
		//circle(point_1[0], point_1[1], 10);
		line (circlePos[0], circlePos[1], point_1[0], point_1[1]);

		focus = [center_x + lenDiameter/4, center_y];
		point_2 = [ , ];
		point_2[0] = point_1[0] + 10 * (focus[0] - point_1[0]);
		point_2[1] = point_1[1] + 10 * (focus[1] - point_1[1]);
		//circle(point_2[0], point_2[1], 10);
		line (point_1[0], point_1[1], point_2[0], point_2[1]);
	pop()
	

	// RAY 2
	push();
		stroke("blue");
		point_3 = [center_x + lenDiameter/2, center_y];
		line( circlePos[0], circlePos[1], point_3[0], point_3[1] );
		
		point_4 = [circlePos[0] , center_y + center_y - circlePos[1]];	
		point_5 = [ , ];
		point_5[0] = point_3[0] + 100 * (point_4[0] - point_3[0]);
		point_5[1] = point_3[1] + 100 * (point_4[1] - point_3[1]);
		line (point_3[0], point_3[1], point_5[0], point_5[1]);
	pop();
	










	line(0, 0.5*canvas_h, canvas_w, 0.5*canvas_h);
	

  

	

	

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

		newCirclePos[0] = mouseX - xOffset;
    newCirclePos[1] = mouseY - yOffset;

    limit_x = center_x + lenDiameter*1.414/4;
    limit_y_top = center_y + lenDiameter*1.414/4;
    limit_y_bot = center_y - lenDiameter*1.414/4;

    if (newCirclePos[0] < limit_x){
    	if ( newCirclePos[1] < limit_y_top &&  newCirclePos[1] > limit_y_bot ){
    		circlePos[0] = newCirclePos[0];
    		circlePos[1] = newCirclePos[1];
    	}
    }
    else{
    	if ( pow(newCirclePos[0] - center_x, 2) + pow(newCirclePos[1] - center_y, 2) < pow(lenDiameter/2, 2) ){
    		circlePos[0] = newCirclePos[0];
    		circlePos[1] = newCirclePos[1];
    	}
    }

    /*if ( 
    	( ( pow(mouseX - center_x, 2) + pow(mouseY - center_y, 2) < pow(lenDiameter/2, 2) ) 
    	&& (mouseY > center_y) )
    	\\ 
    	){
    	circlePos[0] = newCirclePos[0];
    	circlePos[1] = newCirclePos[1];
    }*/
    //circlePos[0] = newCirclePos[0];
    //circlePos[1] = newCirclePos[1];
    
	}

}

function mouseReleased() {
  locked = false;
}