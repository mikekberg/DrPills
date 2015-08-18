/// <reference path="DrPills.Controlls.js" />
/// <reference path="DrPills.Pill.js" />
/// <reference path="libs/underscore-min.js" />
/// <reference path="DrPills.Pill.js" />
/// <reference path="libs/easeljs-0.7.1.min.js" />
var DrPills = DrPills || {};

DrPills.PillJar = function (canvasId) {
    this.canvas = document.getElementById(canvasId);
    this.stage = null;
    this.currentPill = null;
    this.nextPill = null;
    this.jarGrid = [];
    this.pills = [];
    this.keyDown = false;

    this.gameOptions = {
        dropRate: 25,
        stepUpdate: 300,
        stepMovement: 100
    };

    this.pillUpdateCounter = 0;
    this.movementUpdateCounter = 0;

    this.CreateNextPill = function () {
        this.currentPill = this.nextPill;
        this.nextPill = DrPills.Pill.Random();
        this.nextPill.gameGrid = this.gameGrid;

        this.pills.push(this.currentPill);
        this.stage.addChild(this.currentPill.sprite);

        return this.currentPill;
    };

    this.Init = function () {
        this.gameGrid = [];
        for (var i = 0; i < (DrPills.Sprites.Options.JarCellWidth); i++) {
            this.gameGrid[i] = [];
            for (var j = 0; j < (DrPills.Sprites.Options.JarCellHeight); j++) {
                this.gameGrid[i][j] = null;
            }
        }

        this.canvas.width = (DrPills.Sprites.Options.PillWidth / 2) * DrPills.Sprites.Options.JarCellWidth;
        this.canvas.height = DrPills.Sprites.Options.PillHeight * DrPills.Sprites.Options.JarCellHeight;
        this.stage = new createjs.Stage(this.canvas.id);
        this.nextPill = DrPills.Pill.Random();
        this.nextPill.gameGrid = this.gameGrid;

        this.CreateNextPill();
        createjs.Ticker.addEventListener("tick", this.Update.bind(this));
        window.addEventListener("keydown", this.KeyDown.bind(this));
        window.addEventListener("keyup", this.KeyUp.bind(this));
    };

    this.KeyDown = function(event) {
        if (event.keyCode == DrPills.Controls.Player1.MoveLeft) {
            this.currentPill.movement.x = -1;
            this.keyDown = true;
        }
        if (event.keyCode == DrPills.Controls.Player1.MoveRight) {
            this.currentPill.movement.x = 1;
            this.keyDown = true;
        }
    };

    this.KeyUp = function(event) {
        this.keyDown = false;
        this.currentPill.movement.x = 0;
        this.currentPill.movement.y = 1;
    };

    this.Update = function (event) {
        this.pillUpdateCounter += event.delta;
        this.movementUpdateCounter += event.delta;

        if (this.pillUpdateCounter >= this.gameOptions.stepUpdate) {
            this.pillUpdateCounter -= this.gameOptions.stepUpdate;
            this.PillLocationUpdate(event);
        }

        if (this.movementUpdateCounter >= this.gameOptions.stepMovement) {
            this.movementUpdateCounter -= this.gameOptions.stepMovement;
            this.MovementUpdate(event);
        }

        this.stage.update(event);
    };

    this.PillCollides = function (pill) {
        if (this.currentPill.NextStepY() >= this.canvas.height) {
            return true;
        }

        var nextX = pill.NextStepGridX();
        var nextY = pill.NextStepGridY();

        var rslt = (this.gameGrid[nextX][nextY] != null && this.gameGrid[nextX][nextY].pill != pill) ||
               (this.gameGrid[nextX + 1][nextY] != null && this.gameGrid[nextX + 1][nextY].pill != pill);

        return rslt;
    }

    this.MovementUpdate = function (event) {
        if (this.keyDown && !this.PillCollides(this.currentPill)) {
            this.currentPill.StepX();
        }
    };

    this.PillLocationUpdate = function (event) {
        if (this.PillCollides(this.currentPill)) {
            this.CreateNextPill();
        } else {
            this.currentPill.Update(event);
        }

        //console.log("X: " + this.currentPill.gridPosition.x + ", Y: " + this.currentPill.gridPosition.y);
    };

    this._printGrid = function () {
        console.log("-------------------------------------");
        for (var y = 0; y < (DrPills.Sprites.Options.JarCellHeight) ; y++) {
            s = "";
            for (var x = 0; x < (DrPills.Sprites.Options.JarCellWidth) ; x++) {
                s += this.gameGrid[x][y];
            }
            console.log(s);
        }
    }


    this.Init();
};