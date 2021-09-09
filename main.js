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
            var elements = this.bars;
            return elements;
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
        }
    }

    function draw(ctx, element) {
        switch (element.kind) {
            case "rectangle":
                ctx.fillRect(element.x, element.y, element.width, element.height);
                break;
        }
    }
})();

function main() {
    board_view.clean();
    board_view.draw();
    window.requestAnimationFrame(main);
}

var board = new Board(800, 400);
//let bar_2;
let bar_2=new Bar(20,100,40,100, board);

bar_2 = new Bar(bar_2.x, bar_2.y, bar_2.width, bar_2.height, bar_2.board);
var bar = new Bar(700, 100, 40, 100, board);
this.board.bars.push(bar);
this.board.bars.push(bar_2);
var canvas = document.getElementById('canvas');
var board_view = new BoardView(canvas, board);

document.addEventListener('keydown', function (ev) {
    // try{
    //     bar_2.getData();
    // } catch(err){
    //     console.log(err)
    //     bar_2 = new Bar(bar_2.x, bar_2.y, bar_2.width, bar_2.height, bar_2.board);
    // }
    
    if (ev.keyCode == 87) {
        bar_2.up();
    }
    if (ev.keyCode == 83) {
        bar_2.down();
    }
    if (ev.keyCode == 38) {
        bar.up();
    }
    if (ev.keyCode == 40) {
        bar.down();
    }
}
);

window.addEventListener('load', main);
window.requestAnimationFrame(main);