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
let parabol_p;





// ##################### SETUP #####################

function setup() {

	//frameRate(30);
	
	canvas_w = 1000;
	canvas_h = 0.75*canvas_w;

	canvas = createCanvas(canvas_w, canvas_h);
	canvas.parent('simple-sketch-holder');	

	// AXES

	center_x = 0.6*canvas_w;
	center_y = 0.5*canvas_h;

	parabolDisp = 200;
	parabol_p = 600;
	alpha = 1/(4*parabol_p);
	focus = [ center_x + parabolDisp - parabol_p, center_y];

	candlePos = [300 , 200];
	newcandlePos = [candlePos[0], candlePos[1]];
	candlePos_trans = [-400, 100];

	slider_focus = createSlider(0, 1000, center_x + parabolDisp - parabol_p, 1);
  //slider_focus.input(f_slider_time_input);
  slider_focus.parent("simple-sketch-holder");
  slider_focus.position( 75, 25 );
  slider_focus.style('width', str(0.21*canvas_w)+'px');

  slider_center_x = createSlider(0, 1000, center_x, 1);
  //slider_center_x.input(f_slider_time_input);
  slider_center_x.parent("simple-sketch-holder");
  slider_center_x.position( 75, 50 );
  slider_center_x.style('width', str(0.21*canvas_w)+'px');

	
}

// ##############################################################################################
// ##############################################################################################
// ##############################################################################################
// ########################################      DRAW    ########################################

function draw() {	

	background(255);
	fill(0);
	drawFPS(1000);	

	


	parabol_p = slider_focus.value();
	textAlign("center", "center");
	text("Distancia", 50, 30); text("focal", 50, 40);

	center_x = slider_center_x.value();
	text("Vértice", 50, 60);



	alpha = 1/(4*parabol_p);
	focus = [ center_x + parabolDisp - parabol_p, center_y];

	//if ( candlePos[1] < 100 ) candlePos[1] = 100;



	mouseX_trans = mouseX - center_x;
	mouseY_trans = -(mouseY - center_y);

	candlePos_trans = [candlePos[0] - center_x, -(candlePos[1] - center_y)];


	objectStrokeWeight = 2;
	candleDiameter = 15;
	candleBaseWidth = 0.25*candleDiameter;

	// MIRROR + CANDLE
	push();

		noFill();

		translate(center_x, center_y);
		scale(1,-1);
		lenDiameter = 600;		

		push();
			fill(0);
			if( pow( mouseX_trans - candlePos_trans[0], 2 ) + pow( mouseY_trans - candlePos_trans[1], 2) < pow(candleDiameter, 2) ){
		  	overCircle = true;
		  }
		  else overCircle = false;
		pop();

		strokeWeight(8);
		fill(220);
		beginShape();
			for(var y = - 0.6*canvas_h ; y <= 0.6*canvas_h; y = y + 1){
				x = parabolDisp - alpha*pow(y,2);
				vertex(x, y);
			}
			vertex(parabolDisp - alpha*pow(0.6*canvas_h,2),  0.6*canvas_h);
			vertex(canvas_w,  0.6*canvas_h);
			vertex(canvas_w,  -0.6*canvas_h);
			vertex(parabolDisp - alpha*pow(- 0.6*canvas_h,2), - 0.6*canvas_h);
		endShape();

		push();
			textSize(30);
			fill(0);
			scale(1, -1);
			text("Real", parabolDisp - alpha*pow(- 0.5*canvas_h,2) - 200, - 0.6*canvas_h + 100);
			text("Virtual", parabolDisp - alpha*pow(- 0.5*canvas_h,2) + 200, - 0.6*canvas_h + 100);
		pop();
			
		strokeWeight(objectStrokeWeight);
		fill(100);
		rect(candlePos_trans[0] - 0.5*candleBaseWidth, candlePos_trans[1], candleBaseWidth, -candlePos_trans[1]);

		fill("yellow");
		circle( candlePos_trans[0], candlePos_trans[1], candleDiameter);
		

	pop();

	push();
		noStroke();
		circle(focus[0], focus[1], 10);
	pop();


	// RAY 1
	pointA = [, ];
	pointB = [, ];
	if( candlePos[0] < focus[0] ){
		push();
		stroke("red");
		point_1 = [  center_x + parabolDisp - alpha*pow(center_y - candlePos[1] ,2), candlePos[1] ];
		line (candlePos[0], candlePos[1], point_1[0], point_1[1]);

		point_2 = [ , ];
		point_2[0] = point_1[0] + 10 * (focus[0] - point_1[0]);
		point_2[1] = point_1[1] + 10 * (focus[1] - point_1[1]);
		
		stroke("red");
		line (point_1[0], point_1[1], point_2[0], point_2[1]);

		pointA[0] = point_1[0];
		pointA[1] = point_1[1];
		pointB[0] = point_2[0];
		pointB[1] = point_2[1];
	
		pop();

	}
	else if( candlePos[0] > focus[0] ){
		push();

		stroke("red");
		point_1 = [  center_x + parabolDisp - alpha*pow(center_y - candlePos[1] ,2), candlePos[1] ];
		line (candlePos[0], candlePos[1], point_1[0], point_1[1]);

		push();
			stroke("red");
			drawingContext.setLineDash([3, 5]);
			line (point_1[0], point_1[1], point_1[0] + 10 *(point_1[0] - focus[0]), point_1[1] + 10 *(point_1[1] - focus[1]) );
		pop();
		pointA[0] = point_1[0];
		pointA[1] = point_1[1];
		pointB[0] = point_1[0] + 10 *(point_1[0] - focus[0]);
		pointB[1] = point_1[1] + 10 *(point_1[1] - focus[1]);

		point_2 = [ , ];
		point_2[0] = point_1[0] + 10 * (focus[0] - point_1[0]);
		point_2[1] = point_1[1] + 10 * (focus[1] - point_1[1]);
		
		stroke("red");
		line (point_1[0], point_1[1], point_2[0], point_2[1]);
	
		pop();

	}
	
	

	// RAY 2
	pointC = [, ];
	pointD = [, ];
	push();
		//stroke("blue");
		point_3 = [center_x + parabolDisp, center_y];
		//line( candlePos[0], candlePos[1], focus[0], focus[1] );
		
		if( candlePos[0] < focus[0] ){

			m = (focus[1] - candlePos[1])/(focus[0] - candlePos[0]);
			b = -m * candlePos[0] + candlePos[1];

			eq_a = -alpha;
			eq_b =  -1./m + 2*alpha*center_y ;
			eq_c = -alpha*pow(center_y, 2) + center_x + parabolDisp + b/m;

			sol1_y = (- eq_b + sqrt( pow(eq_b, 2) - 4*eq_a*eq_c ) )/ (2*eq_a);
			sol2_y = (- eq_b - sqrt( pow(eq_b, 2) - 4*eq_a*eq_c ) )/ (2*eq_a);
			
			sol1_x = -alpha*pow(sol1_y - center_y, 2) + center_x + parabolDisp;
			sol2_x = -alpha*pow(sol2_y - center_y, 2) + center_x + parabolDisp;

			sol_x = 0;
			sol_y = 0;

			if (sol1_x > candlePos[0]) {
				sol_x = sol1_x;
				sol_y = sol1_y;
			}
			else {
				sol_x = sol2_x;
				sol_y = sol2_y;
			}

			push();
				stroke("blue");
				line (candlePos[0], candlePos[1], sol_x, sol_y);
				stroke("blue");
				line (sol_x, sol_y, -10, sol_y);
				pointC[0] = sol_x;
				pointC[1] = sol_y;
				pointD[0] = -10;
				pointD[1] = sol_y;
			pop();

			// DIBUJAR IMAGEN

			imageLambda = ( (pointC[0]-pointA[0])*(pointD[1]-pointC[1]) - (pointC[1]-pointA[1])*(pointD[0]-pointC[0]) ) 
										/ ( (pointB[0]-pointA[0])*(pointD[1]-pointC[1]) - (pointB[1]-pointA[1])*(pointD[0]-pointC[0]) );

			imagePos = [ pointA[0] + imageLambda*(pointB[0] - pointA[0]), pointA[1] + imageLambda*(pointB[1] - pointA[1]) ];
				
			imageScale = abs( (imagePos[1] - center_y) / (candlePos[1] - center_y) );
			imageDiameter = imageScale * candleDiameter;
			imageBaseWidth = imageScale * candleBaseWidth;
			
			push();
				strokeWeight(2);
				fill(200);
				stroke(100);
				rect(imagePos[0] - 0.5*imageBaseWidth, center_y, imageBaseWidth, imagePos[1] - center_y);								
				circle(imagePos[0], imagePos[1], imageScale * candleDiameter);
				//circle(focus[0], focus[1], 100);
			pop();
			



		} else if ( candlePos[0] > focus[0] ){

			m = (focus[1] - candlePos[1])/(focus[0] - candlePos[0]);
			b = -m * candlePos[0] + candlePos[1];

			eq_a = -alpha;
			eq_b =  -1./m + 2*alpha*center_y ;
			eq_c = -alpha*pow(center_y, 2) + center_x + parabolDisp + b/m;

			sol1_y = (- eq_b + sqrt( pow(eq_b, 2) - 4*eq_a*eq_c ) )/ (2*eq_a);
			sol2_y = (- eq_b - sqrt( pow(eq_b, 2) - 4*eq_a*eq_c ) )/ (2*eq_a);
			
			sol1_x = -alpha*pow(sol1_y - center_y, 2) + center_x + parabolDisp;
			sol2_x = -alpha*pow(sol2_y - center_y, 2) + center_x + parabolDisp;

			sol_x = 0;
			sol_y = 0;

			if (sol1_x > candlePos[0]) {
				sol_x = sol1_x;
				sol_y = sol1_y;
			}
			else {
				sol_x = sol2_x;
				sol_y = sol2_y;
			}

			push();
				stroke("blue");
				line (candlePos[0], candlePos[1], sol_x, sol_y);
				line (sol_x, sol_y, -10, sol_y);
				push();
					stroke("blue");
					drawingContext.setLineDash([3, 5]);
					line (sol_x, sol_y, 1.1*canvas_w, sol_y);
				pop();
				pointC[0] = sol_x;
				pointC[1] = sol_y;
				pointD[0] = -10;
				pointD[1] = sol_y;
			pop();

			imageLambda = ( (pointC[0]-pointA[0])*(pointD[1]-pointC[1]) - (pointC[1]-pointA[1])*(pointD[0]-pointC[0]) ) 
										/ ( (pointB[0]-pointA[0])*(pointD[1]-pointC[1]) - (pointB[1]-pointA[1])*(pointD[0]-pointC[0]) );

			imagePos = [ pointA[0] + imageLambda*(pointB[0] - pointA[0]), pointA[1] + imageLambda*(pointB[1] - pointA[1]) ];
				
			imageScale = abs( (imagePos[1] - center_y) / (candlePos[1] - center_y) );
			imageDiameter = imageScale * candleDiameter;
			imageBaseWidth = imageScale * candleBaseWidth;
			
			push();
				strokeWeight(2);
				fill(100);

				rect(imagePos[0] - 0.5*imageBaseWidth, center_y, imageBaseWidth, imagePos[1] - center_y);				
				fill("yellow")				
				circle(imagePos[0], imagePos[1], imageScale * candleDiameter);
				//circle(focus[0], focus[1], 100);
			pop();


		}
		
	pop();


	push();
		noFill();
		stroke(0);
		rect(0, 0, canvas_w, canvas_h);
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
  xOffset = mouseX - candlePos[0];
  yOffset = mouseY - candlePos[1];
}

function mouseDragged(){
	if (locked){

		newcandlePos[0] = mouseX - xOffset;
    newcandlePos[1] = mouseY - yOffset;

    limit_x = center_x + lenDiameter*1.414/4;
    limit_y_top = center_y + lenDiameter*1.414/4;
    limit_y_bot = center_y - lenDiameter*1.414/4;

    if (newcandlePos[0] < limit_x){
    	if ( newcandlePos[1] < limit_y_top &&  newcandlePos[1] < center_y){
    		candlePos[0] = newcandlePos[0];
    		candlePos[1] = newcandlePos[1];
    	}
    	else{
    		candlePos[0] = newcandlePos[0];
    	}
    }
    else{
    	if ( pow(newcandlePos[0] - center_x, 2) + pow(newcandlePos[1] - center_y, 2) < pow(lenDiameter/2, 2) ){
    		candlePos[0] = newcandlePos[0];
    		candlePos[1] = newcandlePos[1];
    	}
    }

    /*if ( 
    	( ( pow(mouseX - center_x, 2) + pow(mouseY - center_y, 2) < pow(lenDiameter/2, 2) ) 
    	&& (mouseY > center_y) )
    	\\ 
    	){
    	candlePos[0] = newcandlePos[0];
    	candlePos[1] = newcandlePos[1];
    }*/
    //candlePos[0] = newcandlePos[0];
    //candlePos[1] = newcandlePos[1];
    
	}

}

function mouseReleased() {  
  locked = false;
}