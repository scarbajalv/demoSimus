let pi = 3.1415926;
let frame = 0;
let slider;
let aux_deltaTime_Sum = 0;
let aux_deltaTime_Av = 0;

let amplitude = 4;
let omega = 1;
let b = 1;

// ##################### SETUP #####################

function setup() {

	//frameRate(30);
	
	canvas_w = 1000;
	canvas_h = 0.5*canvas_w;

	canvas = createCanvas(canvas_w, canvas_h);
	canvas.parent('simple-sketch-holder');	

	// AXES

	plotRange = [[0,5], [-5,5]];
	imageSize = [500, 300];
	imagePos = [200,100];

	tickSize = 4;
	tickDistance = 8;
	textSizeVal = 12;

	textSize(textSizeVal);

	ticksX = [];
	for(var i = plotRange[0][0]; i <= plotRange[0][1]; i = i + 1){
		ticksX.push(i);
	}
	ticksY = [];
	for(var i = plotRange[1][0]; i <= plotRange[1][1]; i = i + 0.5){
		ticksY.push(i);
	}

	// PLOT

	plotPoints = 500;
	domRange = [0, 10];

	slider = createSlider(domRange[0], domRange[1], 4, 0.01);
	slider.parent("simple-sketch-holder");
	slider.position(10, 10);
	slider.style('width', '1000px');

	slider_b = createSlider(0, 5, 0.5, 0.1);
	slider_b.parent("simple-sketch-holder");
	slider_b.position(10, 50);
	slider_b.style('width', '100px');

	slider_omega = createSlider(1, 5, 4, 1);
	slider_omega.parent("simple-sketch-holder");
	slider_omega.position(10, 100);
	slider_omega.style('width', '100px');

	
}

// ##############################################################################################
// ##############################################################################################
// ##############################################################################################
// ########################################      DRAW    ########################################

function draw() {

	background(200);	

	domRange[1] = slider.value();
	//domRange[1] = frameCount/100;

	b = slider_b.value();
	omega = slider_omega.value();	

	push();
		fill(255);
		noStroke();
		rect(imagePos[0], imagePos[1],
			imageSize[0], imageSize[1]);
		fill(0);
	pop();

	drawFPS(1000);

	

	strokeWeightVal = 2;
	colorVal = "red";
	dashVal = [10];
	
	drawAxes(imagePos, imageSize, plotRange, textSizeVal, tickSize, tickDistance);

	drawFunction(f, domRange, plotRange, plotPoints, colorVal, strokeWeightVal, dashVal, imagePos, imageSize);

	//img.remove();	

}

// ##############################################################################################
// ##############################################################################################
// ##############################################################################################
// ########################################  FUNCTIONS   ########################################

function f(t){
	return amplitude*exp(-b*t)*cos(omega*t);
}


