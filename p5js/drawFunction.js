
function drawFunction(f, domRange, plotRange, plotPoints, colorVal, strokeWeightVal, dashVal, imagePos, imageSize){

	push();

		// Determinar la posicion del Origen de Coordenadas
		axesOrigin = [0 , 0];
		// posX
		if(plotRange[0][0] >= 0){ 
			axesOrigin[0] = imagePos[0];
		}
		else if (plotRange[0][0] < 0 && plotRange[0][1] > 0){
			delta = abs(plotRange[0][0])/(plotRange[0][1] - plotRange[0][0])*imageSize[0];
			axesOrigin[0] = imagePos[0] + delta;
		}
		else{
			axesOrigin[0] = imagePos[0] + imageSize[0];
		}
		// posY
		if(plotRange[1][0] >= 0){ 
			axesOrigin[1] = imagePos[1] + imageSize[1];
		}
		else if (plotRange[1][0] < 0 && plotRange[1][1] > 0){
			delta = abs(plotRange[1][1])/(plotRange[1][1] - plotRange[1][0])*imageSize[1];
			axesOrigin[1] = imagePos[1] + delta;
		}
		else{
			axesOrigin[1] = imagePos[1];
		}		
		
		img.noFill();
		img.stroke(colorVal);
		img.strokeWeight(strokeWeightVal);

		text( domRange[1], 100, 50);
		text( (domRange[1]-plotRange[0][0])/(plotRange[0][1] - plotRange[0][0]), 100, 100);

		plotStep = (plotRange[0][1]-plotRange[0][0])/plotPoints;

		limitsX = [0,0];

		if(domRange[0] < plotRange[0][0]){
			limitsX[0] = plotRange[0][0] - plotStep;
		}
		else{
			limitsX[0] = domRange[0] - plotStep;
		}
		if(domRange[1] > plotRange[0][1]){
			limitsX[1] = plotRange[0][1] + plotStep;
		}
		else{
			limitsX[1] = domRange[1] + plotStep;
		}

		push();
			img.drawingContext.setLineDash(dashVal);
			img.beginShape();
				for(var x = limitsX[0]; x <= limitsX[1]; x = x + plotStep){
					xPos = (x - plotRange[0][0])/(plotRange[0][1]-plotRange[0][0])*imageSize[0];
					yPos = imageSize[1] - (f(x) - plotRange[1][0])/(plotRange[1][1]-plotRange[1][0])*imageSize[1];
					img.curveVertex(xPos, yPos);
				}
			img.endShape();
		pop();


		image(img, imagePos[0], imagePos[1]);

		img.clear();

	pop();

}



