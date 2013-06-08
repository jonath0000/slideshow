function Animation(image, x1, y1, x2, y2, startDelay, speed, loop) {
	this.image = image;
	this.x1 = x1;
	this.y1 = y1;
	this.x2 = x2;
	this.y2 = y2;
	this.startDelay = startDelay;
	this.loop = loop;
	this.speed = speed;
	
	this.x = x1;
	this.y = y1;
	this.vx = 0;
	this.vy = 0;

	
	this.update = update;
	function update() {
		if (this.startDelay > 0) {
			this.startDelay --;
			return;
		}
		
		var oldvx = this.vx;
		var oldvy = this.vy;
							
		var maxvx = Math.abs((this.x2 - this.x) / 20);
		var maxvy = Math.abs((this.y2 - this.y) / 20);
		
		if (maxvx > this.vx) this.vx += this.speed; else this.vx = maxvx;
		if (maxvy > this.vy) this.vy += this.speed; else this.vy = maxvy;
		
		if (this.x2 > this.x) this.x += this.vx;
		if (this.x2 < this.x) this.x -= this.vx;
		if (this.y2 > this.y) this.y += this.vy;
		if (this.y2 < this.y) this.y -= this.vy;

		if (Math.abs(this.x2 - this.x) < 1 && Math.abs(this.y2 - this.y) < 1 && this.loop == true) {
			var tmpx = this.x1;
			var tmpy = this.y1;
			this.x1 = this.x2;
			this.y1 = this.y2;
			this.x2 = tmpx;
			this.y2 = tmpy;
			this.vx = 0;
			this.vy = 0;
		}
		
	}

}