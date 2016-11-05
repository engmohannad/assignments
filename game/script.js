var myGamePiece;
var myObstacle;
function startGame() {
  myGameArea.start();
  myGamePiece = new component(15,15,"red", 40, 40);
  myGamePieceblue = new component(70,10,"blue", 50, 500);
}

var myGameArea = {
  canvas: document.createElement("canvas"),
  start: function() {
    this.canvas.width = 500;
    this.canvas.height = 550;
    // this.canvas.style.cursor = "none"; 
    this.context = this.canvas.getContext("2d");
    document.body.insertBefore(this.canvas, document.body.childNodes[0]);
    this.interval = setInterval(updateGameArea, 20);
    window.addEventListener('keydown', function (e) {
            myGameArea.keys = (myGameArea.keys || []);
            myGameArea.keys[e.keyCode] = true;
        })
        window.addEventListener('keyup', function (e) {
            myGameArea.keys[e.keyCode] = false;
        })
        window.addEventListener('mousemove', function (e) {
            myGameArea.x = e.pageX;
            myGameArea.y = e.pageY;
        })
     },
  clear: function(){
  				this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }   
}
function component(width, height, color, x, y,type) {
    this.type=type;
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;
    this.x = x;
    this.y = y;
    this.gravity = 0.04;
    this.gravitySpeed = 0;
    this.update = function(){
    ctx = myGameArea.context;
    ctx.fillStyle = color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
    }
    this.newPos = function() {
        this.x += this.speedX;
        this.y += this.speedY; 
    } 
    
    this.moveDown = function() {
        this.gravitySpeed += this.gravity;
        this.x += this.speedX;
        this.y += this.speedY + this.gravitySpeed; 
        this.hitBottom();
    } 
    this.hitBottom = function() {
        var rockbottom = myGameArea.canvas.height - this.height;
        if (this.y > rockbottom) {
            this.y = rockbottom;
        }
    }
    this.stopRight = function() {
        var myright = this.x + (this.width);
        var stopMoveRight = true;                    
          if (myright > 500){stopMoveRight = false; }
           return stopMoveRight;
    }
     this.stopLeft = function() {
     		 var myleft = this.x;
         var stopMoveLeft = true;
        if (myleft < 0){ stopMoveLeft = false;}
        return stopMoveLeft;
     }
      this.stopTop = function() {
       var mytop = this.y;
       var stopMoveTop = true;
       if (mytop < 400) { stopMoveTop = false; }
      return stopMoveTop;
      }
       this.stopBottom = function() {
         var mybottom = this.y + (this.height);
         var stopMoveBottom = true;
       if (mybottom >550){  stopMoveBottom = false;}
       return stopMoveBottom;
       }
}
  function updateGameArea() {
    myGameArea.clear();
    myGamePieceblue.speedX = 0;
    myGamePieceblue.speedY = 0; 
    myGamePiece.moveDown();
    myGamePiece.update();
     
      if (myGameArea.keys && myGameArea.keys[37]&& myGamePieceblue.stopLeft()) {myGamePieceblue.speedX = -1; }
   	  if (myGameArea.keys && myGameArea.keys[39]&& myGamePieceblue.stopRight()) {myGamePieceblue.speedX = 1; }
    	if (myGameArea.keys && myGameArea.keys[38]&& myGamePieceblue.stopTop()) {myGamePieceblue.speedY = -1; }
      if (myGameArea.keys && myGameArea.keys[40]&& myGamePieceblue.stopBottom()) {myGamePieceblue.speedY = 1; }
    
      myGamePieceblue.newPos();
      myGamePieceblue.update();
   }