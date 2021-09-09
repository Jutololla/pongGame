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
        this.board.bars.push(this);
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
    board_view.draw();
    window.requestAnimationFrame(main);
}

var board = new Board(800, 400);

var barbar = new Bar(20,100,40,100, board);
var bar = new Bar(700, 100, 40, 100, board);

var canvas = document.getElementById('canvas');
var board_view = new BoardView(canvas, board);

document.addEventListener('keydown', function (ev) {
    try{
        barbar.getData();
    } catch(err){
        console.log(err)
        barbar = new Bar(barbar.x, barbar.y, barbar.width, barbar.height, barbar.board);
    }
    
    if (ev.keyCode == 87) {
        barbar.up();
    }
    if (ev.keyCode == 83) {
        barbar.down();
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