/// <reference path="DrPills.Sprites.js" />
/// <reference path="libs/underscore-min.js" />
var DrPills = DrPills || {};

DrPills.IDs = 0;

DrPills.Pill = function (sprite, value) {
    this.id = DrPills.IDs++;
    this.sprite = sprite;
    this.value = value;
    this.gridPosition = {
        x: 0,
        y: 0
    };
    this.lastGridPosition = {
        x: 0,
        y: 0
    };
    this.movement = {
        x: 0,
        y: 1
    }

    this.X = function (val) {
        if (val) {
            this.sprite.x = val;
            this.lastGridPosition.x = this.gridPosition.x;
            this.gridPosition.x = Math.floor(this.sprite.x / (DrPills.Sprites.Options.PillWidth / 2));
            this.UpdateGridLocation();
        }
        else
            return this.sprite.x;
    };

    this.Y = function (val) {
        if (val) {
            this.sprite.y = val;
            this.lastGridPosition.y = this.gridPosition.y;
            this.gridPosition.y = Math.floor(this.sprite.y / DrPills.Sprites.Options.PillHeight);
            this.UpdateGridLocation();
        }
        else
            return this.sprite.y;
    };

    this.NextStepGridY = function (direction) {
        var nextY = this.Y() + (DrPills.Sprites.Options.PillHeight * (direction || this.movement.y));
        return (direction != 0) ? Math.floor(nextY / DrPills.Sprites.Options.PillHeight) : Math.floor(this.Y() / DrPills.Sprites.Options.PillHeight);
    }

    this.NextStepY = function (direction) {
        return this.Y() + (DrPills.Sprites.Options.PillHeight * (direction || this.movement.y));
    }

    this.StepY = function (direction) {
        if (this.NextStepY() >= 0 && this.NextStepY() <= (DrPills.Sprites.Options.PillHeight * DrPills.Sprites.Options.JarCellHeight))
        this.Y(this.NextStepY());
    };

    this.NextStepX = function (direction) {
        return this.X() + ((DrPills.Sprites.Options.PillWidth/2) * (direction || this.movement.x));
    }

    this.NextStepGridX = function (direction) {
        var nextX = this.X() + ((DrPills.Sprites.Options.PillWidth/2) * (direction || this.movement.x));
        return  direction == 0  ? this.gridPosition.x :
                                  Math.floor(nextX / (DrPills.Sprites.Options.PillWidth / 2))
    }

    this.StepX = function (direction) {
        if (this.NextStepX() >= 0 && this.NextStepX() <= (DrPills.Sprites.Options.PillWidth * DrPills.Sprites.Options.JarCellWidth))
            this.X(this.NextStepX());
    };

    this.Init = function () {
        this.X(0);
        this.Y(0);
    };

    this.UpdateGridLocation = function () {
        for (var y = 0; y < (DrPills.Sprites.Options.JarCellHeight) ; y++) {
            for (var x = 0; x < (DrPills.Sprites.Options.JarCellWidth) ; x++) {
                if (this.gameGrid[x][y] && this.gameGrid[x][y].pill.id == this.id)
                    this.gameGrid[x][y] = null;
            }
        }

        this.gameGrid[this.gridPosition.x][this.gridPosition.y] = { val: this.value[0], pill: this }
        this.gameGrid[this.gridPosition.x + 1][this.gridPosition.y] = { val: this.value[1], pill: this };
    };
    
    this.Update = function () {
        if (this.NextStepX() != this.X()) this.StepX();
        if (this.NextStepY() != this.Y()) this.StepY();

    };

    this.Init();
}

DrPills.Pill.Random = function () {
    var allPills = _.keys(DrPills.Pills);
    return DrPills.Pills[allPills[Math.floor(Math.random() * allPills.length)]]();
};


DrPills.Pills = {};

DrPills.Pills.Red = function () {
    return new DrPills.Pill(DrPills.Sprites.Pills.Red(), [1, 1]);
};