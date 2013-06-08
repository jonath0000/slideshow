function Title(nextScene, imageLoader) {
	this.next = nextScene;
	this.timeOut = 180;
	this.hi = imageLoader.initImage('images/hi.png');
	
	this.beginScene = function() {			
		
	}
	
	this.update = function() {
	
	}
	
	this.draw = function (drawingTool, tics) {
		
		drawingTool.getContext().drawImage(this.hi, 300, 100);
		drawingTool.drawTextCentered('Hi! This is the demo.', 40);	
	}
}
