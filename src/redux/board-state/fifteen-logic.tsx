export class FifteenLogic {
    
    size:number
    gameBoard: number [][] = [
        [0, 1, 2, 3],
        [4, 5, 6, 7],
        [8, 9, 10, 11],
        [12, 13, 14, 15]
        ]
    emptyX:number
    emptyY:number
    gameOver:boolean = false
    scrambling:boolean = false

    constructor(size:number) {
        this.size = size
        this.emptyX = size - 1
        this.emptyY = size - 1
        this.gameOver = false
    }
    
    getCell(col: number, row: number) : number {
        return this.gameBoard[col][row]
    }
   
    moveBlocks(x: number, y: number, currentBoard: number [][]): number[][] {

        this.gameBoard = currentBoard
        
        if (!this.gameOver) {

            if (this.emptyX == x && this.emptyY > y) {
                this.arrangeBlocks(x, y, null, this.emptyY - 1)
            }
            else if (this.emptyX == x && this.emptyY < y) {
                this.arrangeBlocks(x, y, null, this.emptyY + 1)
            }
            else if (this.emptyY == y && this.emptyX > x) {
                this.arrangeBlocks(x, y,this.emptyX - 1, null)
            }
            else if (this.emptyY == y && this.emptyX < x) {
                this.arrangeBlocks(x, y,this.emptyX + 1, null)
            }
            return this.gameBoard
        }
    }

    arrangeBlocks(clickX: number, clickY: number, emptyCoordX?: number, emptyCoordY?: number){
        let valueX:number = emptyCoordX != null ? emptyCoordX : this.emptyX
        let valueY:number = emptyCoordY != null ? emptyCoordY : this.emptyY
        let value = this.gameBoard[valueX][valueY]
        
        this.gameBoard[valueX][valueY] = this.gameBoard[this.emptyX][this.emptyY]
        this.gameBoard[this.emptyX][this.emptyY] = value
        this.emptyX = valueX
        this.emptyY = valueY
        this.moveBlocks(clickX, clickY, this.gameBoard)
    }

    scramble() {
        this.scrambling = true

        for (let i = 0; i < 500; i++) {
            var x = -1
            var y = -1
            let randomNumber = Math.floor(Math.random() * 100) + 1 
            
            if (randomNumber % 2 == 0) {
                x = (Math.floor(Math.random() * this.size) + 1) - 1
                y = this.emptyY
            } else {
                x = this.emptyX
                y = (Math.floor(Math.random() * this.size) + 1) - 1
            }
            this.moveBlocks(x, y, this.gameBoard)
        }
        this.scrambling=false
    }

    isGameOver() : boolean {
        for (let y = 3; y >= 0; y--) {
            for (let x = 3; x >= 0; x--) {
                let position = this.gameBoard[y][x]
                let currentPos = 3*y+x+y
                if (position != currentPos) {
                    return false
                }
            }
        }
        return this.scrambling == true ?  false : true;
    }
}
