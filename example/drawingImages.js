function DrawingImages(nextScene, imageLoader) {
	this.next = nextScene;
	this.timeOut = 180;
	this.cat = imageLoader.initImage('images/cat.png');
	
	this.beginScene = function() {			
		
	}
	
	this.update = function() {
	
	}
	
	this.draw = function (drawingTool, tics) {
		
		drawingTool.getContext().drawImage(this.cat, 150, 100);
		drawingTool.drawTextCentered('You can draw images...', 40);	
	}
}
