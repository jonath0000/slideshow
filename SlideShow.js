
function DrawingTool(context, w, h) {

	this.context = context;
	this.w = w;
	this.h = h;
	
	this.getContext = function() {
		return this.context;
	}
	
	this.drawTitleText = drawTitleText;
	function drawTitleText(text, x, y) {
		this.context.fillStyle = 'black';
		this.context.font = 'italic 40pt Calibri';
		this.context.textAlign = 'center';
		this.context.fillText(text, this.w/2, y);
	}
	
	this.drawText = drawText;
	function drawText(text, x, y) {
		this.context.fillStyle = 'black';
		this.context.font = '30pt Calibri';
		this.context.textAlign = 'center';
		this.context.fillText(text, x, y);
	}
	
	this.drawTextCentered = drawTextCentered;
	function drawTextCentered(text, y) {
		this.context.fillStyle = 'black';
		this.context.font = '30pt Calibri';
		this.context.textAlign = 'center';
		this.context.fillText(text, this.w/2, y);
	}	
}

function ImageLoader() {

	this.imagesToLoad = 0;

	this.initImage = initImage;
	function initImage(path) {
		this.imagesToLoad++;
		var im = new Image();
		im.src = path;
		var self = this;
		im.onload = function() {self.imageLoaded();}
		return im;
	}	
	
	this.imageLoaded = function() {
		this.imagesToLoad--;

	}
}

function SlideShow(w, h, fps, canvasElement) {

	this.w = w;
	this.h = h;
	this.fps = fps;
	this.canvasElement = canvasElement;
	this.startScene = null;
	this.lastAddedScene = null;

	this.imageLoader = new ImageLoader();
	
	
	this.getImageLoader = getImageLoader;
	function getImageLoader() {
		return this.imageLoader;
	}
	
	this.setStartScene = setStartScene;
	function setStartScene(scene) {
		this.startScene = scene;
	}
	
	
	this.addScene = addScene;
	function addScene(scene) {
	
		if (this.startScene == null) {
			this.startScene = scene;
		} else {		
			this.lastAddedScene.next = scene;
		}
		this.lastAddedScene = scene;
		this.lastAddedScene.next = this.startScene;		
	}
	

	this.reset = reset;
	function reset() {
		this.state = 'fade_in' // fade_in | fade_out | show
		this.canvas = document.getElementById(this.canvasElement);
		this.context = this.canvas.getContext('2d');
		this.alpha = 0.0;
		this.animationTicker = 0;

		this.drawingTool = new DrawingTool(this.context, this.w, this.h);
		
		this.currentScene = this.startScene;
		this.currentScene.beginScene();

		this.screenClear();
	}
	
	
	this.screenClear = screenClear;
	function screenClear() {
		this.context.beginPath();
		this.context.rect(0, 0, this.w, this.h);
		this.context.fillStyle = 'white';
		this.context.fill();
	}
	
	
	this.nextScene = nextScene;
	function nextScene() {
		this.animationTicker = 0;
		
		this.currentScene.next.beginScene();
		return this.currentScene.next;
	}

	
	this.fadeOutToNextScene = fadeOutToNextScene;
	function fadeOutToNextScene() {
		this.state = 'fade_out'
	}	
	
	
	this.draw = draw;
	function draw() {
		
		this.screenClear();
		
		if (this.imageLoader.imagesToLoad > 0) {
			this.context.globalAlpha = 1.0;
			this.drawingTool.drawTextCentered("Loading...", this.h / 2);
			return;
		}
	
		this.animationTicker++;
		
		if (this.state == 'fade_in' && this.alpha < 1.0) {
			this.alpha = this.alpha + 0.03;
			if (this.alpha >= 1.0) {
				this.state = 'show'
			}
		}
		if (this.state == 'fade_out' && this.alpha > 0.0) {
			this.alpha = this.alpha - 0.03;
			if (this.alpha <= 0.0) {
				this.state = 'fade_in'
				this.currentScene = this.nextScene();
			}
		}
		this.context.globalAlpha = this.alpha;

		this.currentScene.update();	
		this.currentScene.draw(this.drawingTool, this.animationTicker);		
		
		if (this.animationTicker > this.currentScene.timeOut) 
			this.fadeOutToNextScene();
		
		
	}
}