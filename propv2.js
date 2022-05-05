let xdaf=0, ydaf=0;

class Automata {
    constructor(size, ctx) {
        this.size = size
        this.ctx = ctx
        this.cells = [];
    }

    create() {
        const densidad = 0.47 //densidad del bosque

        //dibujar todo gris
        for (let x = 0; x < this.size; x++) {
            let row = []
            for (let y = 0; y < this.size; y++) {
                row.push(1)
            }
            this.cells.push(row);
        }

        //dibujar bosque
        for (let x = 100; x < 180; x++) {
            for (let y = 50; y < 100; y++) {
                let alive = 0
                if (Math.random() < densidad) alive = 0
                else alive = 1
                this.cells[x][y] = alive
            }
        }
        for (let x = 60; x < this.size/2+50; x++) {
            for (let y = 100; y < 180; y++) {
                let alive = 0
                if (Math.random() < densidad) alive = 0
                else alive = 1
                this.cells[x][y] = alive
            }
        }
        for (let x = 80; x < this.size/2-20; x++) {
            for (let y = 180; y < 280; y++) {
                let alive = 0
                if (Math.random() < densidad) alive = 0
                else alive = 1
                this.cells[x][y] = alive
            }
        }
        for (let x = 110; x < this.size/2-50; x++) {
            for (let y = 280; y < 400; y++) {
                let alive = 0
                if (Math.random() < densidad) alive = 0
                else alive = 1
                this.cells[x][y] = alive
            }
        }

        for (let x = this.size/2+80; x < this.size-120; x++) {
            for (let y = 80; y < 280; y++) {
                let alive = 0
                if (Math.random() < densidad) alive = 0
                else alive = 1
                this.cells[x][y] = alive
            }
        }
        for (let x = this.size/2+10; x < this.size-120; x++) {
            for (let y = 200; y < 300; y++) {
                let alive = 0
                if (Math.random() < densidad) alive = 0
                else alive = 1
                this.cells[x][y] = alive
            }
        }
        for (let x = this.size/2-30; x < this.size-80; x++) {
            for (let y = 300; y < 400; y++) {
                let alive = 0
                if (Math.random() < densidad) alive = 0
                else alive = 1
                this.cells[x][y] = alive
            }
        }
        for (let x = this.size/2+60; x < this.size-80; x++) {
            for (let y = 400; y < 450; y++) {
                let alive = 0
                if (Math.random() < densidad) alive = 0
                else alive = 1
                this.cells[x][y] = alive
            }
        }

        for (let x = 1; x < this.size - 1; x++) {
            for (let y = 1; y < this.size - 1; y++) {
                if (this.cells[x][y] == 0)
                    this.ctx.fillStyle = "green"
                if (this.cells[x][y] == 1)
                    this.ctx.fillStyle = "grey";
                if (this.cells[x][y] == 2)
                    this.ctx.fillStyle = "red";

                this.ctx.fillRect(x, y, 1, 1);
            }
        }


        
    }

    llamas() {
        this.cells[Math.ceil(xdaf)][Math.ceil(ydaf)] = 2;
        // console.log(xdaf, ydaf);

        for (let x = 1; x < this.size - 1; x++) {
            for (let y = 1; y < this.size - 1; y++) {
                if (this.cells[x][y] == 0)
                    this.ctx.fillStyle = "green"
                if (this.cells[x][y] == 1)
                    this.ctx.fillStyle = "grey";
                if (this.cells[x][y] == 2)
                    this.ctx.fillStyle = "red";

                this.ctx.fillRect(x, y, 1, 1);
            }
        }
    }

    evaluate() {
        let cellsAux = this.cells;
        for (let x = 1; x < this.size - 1; x++) {
            for (let y = 1; y < this.size - 1; y++) {
                //arboles
                if (this.cells[x][y] == 0)
                    this.ctx.fillStyle = "green"
                //material no combustible
                if (this.cells[x][y] == 1)
                    this.ctx.fillStyle = "grey";
                //fuego
                if (this.cells[x][y] == 2)
                    this.ctx.fillStyle = "red";
                //quemado
                if (this.cells[x][y] == 3)
                    this.ctx.fillStyle = '#FF7306';
                this.ctx.fillRect(x, y, 1, 1);


                if (this.cells[x][y] == 2) cellsAux[x][y] = 3
                else{
                if (this.cells[x][y] == 0) {
                    //arriba izq
                    if (this.cells[x - 1][y - 1] == 2) cellsAux[x][y] = 2
                    //arriba centro
                    if (this.cells[x][y - 1] == 2) cellsAux[x][y] = 2
                    //arriba der
                    if (this.cells[x + 1][y - 1] == 2) cellsAux[x][y] = 2
                    //centro izq
                    if (this.cells[x - 1][y] == 2) cellsAux[x][y] = 2
                    //centro der
                    if (this.cells[x + 1][y] == 2) cellsAux[x][y] = 2
                    //abajo izq
                    if (this.cells[x - 1][y + 1] == 2) cellsAux[x][y] = 2
                    //abajo centro
                    if (this.cells[x][y + 1] == 2) cellsAux[x][y] = 2
                    //abajo der
                    if (this.cells[x + 1][y + 1] == 2) cellsAux[x][y] = 2
                }
            }
            }
        }
        this.cells = cellsAux;
    }
}

const canvas = document.querySelector('canvas')
const cells = new Array(800).fill("").map(() => new Array(800).fill(false));
const ctx = canvas.getContext('2d');
const Automata1 = new Automata(500, ctx);
Automata1.create();
setInterval(() => Automata1.evaluate(), 1000);


canvas.addEventListener('mousedown', function(e) {
    getCursorPosition(canvas, e);
    Automata1.llamas();
})

function getCursorPosition(canvas, event) {
    const rect = canvas.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top
    xdaf=x;
    ydaf=y;
    // console.log("x: " + x + " y: " + y)
}