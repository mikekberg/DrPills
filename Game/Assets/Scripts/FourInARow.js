function FourInARow(x, y) {
    currentCellColour = gameGrid[x][y];

    if (gameGrid[x][y] == currentCellColour &&
        gameGrid[x+1][y] == currentCellColour &&
        gameGrid[x+2][y] == currentCellColour &&
        gameGrid[x+3][y] == currentCellColour) {

    }

    if (gameGrid[x][y] == currentCellColour &&
        gameGrid[x-1][y] == currentCellColour &&
        gameGrid[x-2][y] == currentCellColour &&
        gameGrid[x-3][y] == currentCellColour) {

    }

    if (gameGrid[x][y] == currentCellColour &&
        gameGrid[x][y+1] == currentCellColour &&
        gameGrid[x][y+2] == currentCellColour &&
        gameGrid[x][y+3] == currentCellColour) {

    }

    if (gameGrid[x][y] == currentCellColour &&
        gameGrid[x][y-1] == currentCellColour &&
        gameGrid[x][y-2] == currentCellColour &&
        gameGrid[x][y-3] == currentCellColour) {

    }
}
