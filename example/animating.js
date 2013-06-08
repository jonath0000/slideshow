function Animating(nextScene, imageLoader) {
	this.next = nextScene;
	this.timeOut = 100000;
	this.car = imageLoader.initImage('images/car.png');
	
	this.beginScene = function() {			
		this.car1anim = new Animation(this.car, 600,40, 0,40, 0, 0.15, false);
		this.car2anim = new Animation(this.car, 600,240, 0,240, 120, 0.3, false);
		this.car3anim = new Animation(this.car, 600,340, 0,340, 0, 0.7, false);
		this.car4anim = new Animation(this.car, 300,400, 100,40, 60, 0.2, true);
	}
	
	this.update = function() {
		this.car1anim.update();
		this.car2anim.update();
		this.car3anim.update();
		this.car4anim.update();
	}
	
	this.draw = function (drawingTool, tics) {
		
		drawingTool.getContext().drawImage(this.car, this.car1anim.x, this.car1anim.y);
		drawingTool.getContext().drawImage(this.car, this.car2anim.x, this.car2anim.y);
		drawingTool.getContext().drawImage(this.car, this.car3anim.x, this.car3anim.y);
		drawingTool.getContext().drawImage(this.car, this.car4anim.x, this.car4anim.y);
		
		drawingTool.drawTextCentered('And do a bit of animation.', 40);	
		
		if (tics > 300) {
			drawingTool.drawTextCentered('...that\'s all folks!', 300);	
		}
	}
}
