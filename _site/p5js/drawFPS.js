
function drawFPS(deltaTimeStep){

	// DRAW AVERAGE FRAMERATE
	if (frameCount == 1){
		deltaTime_Sum = 0;
		deltaTime_Av = 0;
	}
	deltaTimeStep = 50;
	deltaTime_Sum = deltaTime_Sum + deltaTime;
	if(frameCount % deltaTimeStep == 0){
		deltaTime_Av = deltaTime_Sum / deltaTimeStep;
		text(deltaTime_Av.toFixed(1), 0, 10);
		deltaTime_Sum = 0;
	}
	else{
		text((1000./deltaTime_Av).toFixed(1), 0, 10);
	}


}