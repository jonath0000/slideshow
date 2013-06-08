function DrawingText(nextScene, imageLoader) {
	this.next = nextScene;
	this.timeOut = 180;
	
	this.beginScene = function() {			
		
	}
	
	this.update = function() {
	
	}
	
	this.draw = function (drawingTool, tics) {

		drawingTool.drawText('With this framework you can draw text...', 40, 40);	
		drawingTool.drawTextCentered('...and centered text :)', 300);	
	}
}
