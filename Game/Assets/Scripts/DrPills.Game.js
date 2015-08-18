﻿/// <reference path="libs/easeljs-0.7.1.min.js" />
/// <reference path="DrPills.PillJar.js" />
/// <reference path="DrPills.Sprites.js" />
var DrPills = DrPills || {};


DrPills.Game = function (options) {
    this.loader = new createjs.LoadQueue(false);
    this.player1Jar = null;
    this.options = options;

    this.Init = function () {
        if (!createjs) throw "Unable to find create JS";
    };


    this.Start = function () {
        this.loader.addEventListener("complete", this.AssetsLoaded.bind(this));
        this.loader.loadManifest(DrPills.Sprites.Manifest);
    };

    this.AssetsLoaded = function () {
        DrPills.Sprites.Load(this.loader);

        this.player1Jar = new DrPills.PillJar(this.options.player1JarId);

        //Start Game Loop
        createjs.Ticker.addEventListener("tick", this.Update.bind(this));
    };

    this.Update = function (event) {

    }



    this.Init();
};