(function () {
    self.Board = function (width, height) {
        this.width = width;
        this.height = height;
        this.playing = false;
        this.game_over = false;
        this.bars = [];
        this.ball = null;
    }

    self.Board.prototype = {
        get elements() {
            var elements = this.bars.map(function(bar){return bar;});
            elements.push(this.ball);
            return elements;
        }
    }
})();

(function(){
    self.Ball=function(x,y,radius,board){
        this.x=x;
        this.y=y;
        this.radius=radius;
        this.speed_y=0;
        this.speed_x=3;
        this.board=board;
        this.direction=1;
        board.ball=this;
        this.kind="circle";
    }
    self.Ball.prototype={
        move: function(){
            this.x+=(this.speed_x*this.direction);
            this.y+=(this.speed_y);
        }
    }
})();

(function () {
    self.Bar = function (x, y, width, height, board) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.board = board;
        //this.board.bars.push(this);
        this.kind = "rectangle";
        this.speed = 10;
        self.Bar.prototype = {
            down: function () {
                this.y += this.speed;
            },
            up: function () {
                this.y -= this.speed;
            },
            getData: function () {
                return "x " + this.x + "; y " + this.y;
            }
        }
    }
})();

(function () {
    self.BoardView = function (canvas, board) {
        this.canvas = canvas;
        this.canvas.width = board.width;
        this.canvas.height = board.height;
        this.board = board;
        this.ctx = canvas.getContext("2d");
    }

    self.BoardView.prototype = {
        clean: function(){
            this.ctx.clearRect(0,0,this.board.width,this.board.height);
        },
        draw: function () {
            for (let index = this.board.elements.length - 1; index >= 0; index--) {
                var el = this.board.elements[index];
                draw(this.ctx, el);
            }
        },
        play: function(){
            if(this.board.playing){
            this.clean();
            this.draw();
            this.board.ball.move();
            }
        }
    }

    function draw(ctx, element) {
        switch (element.kind) {
            case "rectangle":
                ctx.fillRect(element.x, element.y, element.width, element.height);
                break;
            case "circle":
                ctx.beginPath();
                ctx.arc(element.x,element.y,element.radius,0,7);
                ctx.fill();
                ctx.closePath();
        }
    }
})();

function main() {
    board_view.draw();
    board_view.play();
    window.requestAnimationFrame(main);
}

var board = new Board(800, 400);
let bar_2=new Bar(20,100,40,100, board);//se agrega esta linea porque por alguna misteriosa razon, 
bar_2 = new Bar(bar_2.x, bar_2.y, bar_2.width, bar_2.height, bar_2.board); //cuando creo el objeto, esta no es de tipo Bar.
var bar = new Bar(740, 100, 40, 100, board);
this.board.bars.push(bar);
this.board.bars.push(bar_2);
var ball = new Ball(400,200,15,board);
var canvas = document.getElementById('canvas');
var board_view = new BoardView(canvas, board);

document.addEventListener('keydown', function (ev) {
    ev.preventDefault();
    if (ev.keyCode == 87) {
        bar_2.up();
    }
    else if (ev.keyCode == 83) {
        bar_2.down();
    }
    else if (ev.keyCode == 38) {
        bar.up();
    }
    else if (ev.keyCode == 40) {
        bar.down();
    }
    else if (ev.keyCode == 32) {
        board.playing=!board.playing;
    }
}
);

window.addEventListener('load', main);
window.requestAnimationFrame(main);