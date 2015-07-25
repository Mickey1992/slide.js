function Slide(options) {
	this.options = options;
	this.images = options.images();
	this.init();
}

Slide.prototype = {
	init: function() {
		this.options.frame.style.position = "relative";
		this.options.frame.style.overflow = "hidden";
		this.options.frame.style.width = this.options.width + "px";
		this.options.frame.style.height = this.options.height + "px";
		this.initContainer();
	},

	initImages: function(container){
		container.style.left = (-this.options.width) + "px";
		container.innerHTML = this.generateImageHTML(this.images.length) + this.generateImageHTML(1) + this.generateImageHTML(2);
	},

	initContainer: function(){
		var container = document.createElement("div");
		container.id = "container";
		container.style.position = "absolute";
		container.style.top = 0;
		container.style.width = (this.options.width * 3) + "px";
		container.style.lineHeight = this.options.height + "px";
		this.options.frame.appendChild(container);
		this.initImages(container);
	},

	generateImageHTML: function(index) {
		return '<img src="' + this.images[index-1] + '" id = "' + index + '" style="max-width : ' + this.options.width + "px; max-height : " + this.options.height + 'px; vertical-align : middle" />';
	},

	

	moveDiv: function(div, distance, time, callback){
		var speed = distance / time;
		var elapsedTime = 0;
		var that = this;
		var intervalId = setInterval(function() {
			elapsedTime += 1;
			div.style.left = parseInt(div.style.left) + speed * 1 + "px";
			if (elapsedTime >= time) {			
				clearInterval(intervalId);
				if (callback !== undefined) callback(div,that);
			}
		}, 1);
	},

	leftMoveChange: function(div,that){
		var firstImg = div.querySelector("img");
		var midIndex = parseInt(firstImg.nextSibling.id);
		var imagesCount = that.images.length;
		var addIndex;
		if (midIndex == imagesCount - 1) {
			addIndex = 1;
		}
		else if (midIndex === imagesCount) {
			addIndex = 2;
		}
		else {
			addIndex = midIndex + 2;
		}
		div.innerHTML = div.innerHTML.trim() + that.generateImageHTML(addIndex);
		div.removeChild(div.querySelector("img") );
		div.style.left = parseInt(div.style.left) + that.options.width+"px";			
	},

	rightMoveChange: function(div,that){
		var firstImg = div.querySelector("img");
		var midIndex = parseInt(firstImg.nextSibling.id);
		var imagesCount = that.images.length;
		var addIndex;
		if (midIndex == 1) {
			addIndex = imagesCount - 1;
		}
		else if (midIndex === 2) {
			addIndex = imagesCount;
		}
		else {
			addIndex = midIndex-2;
		}
		div.innerHTML = that.generateImageHTML(addIndex)+div.innerHTML;
		div.style.left = parseInt(div.style.left) - that.options.width+"px";
		div.removeChild(div.lastElementChild);	
		
	},

	moveLeft: function() {
		this.moveDiv(this.options.frame.querySelector("#container"), -this.options.width, this.options.speed,this.leftMoveChange);
	},

	moveRight: function(){
		this.moveDiv(this.options.frame.querySelector("#container"), this.options.width, this.options.speed,this.rightMoveChange);
	},

};
Slide.prototype.constructor = Slide;



