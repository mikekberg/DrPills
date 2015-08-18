var DrPills = DrPills || {};
DrPills.Sprites = {};
DrPills.Sprites.Pills = {};

DrPills.Sprites.Options = {
    PillWidth: 51,
    PillHeight: 27,
    JarCellWidth: 8,
    JarCellHeight: 16
};

DrPills.Sprites.Manifest = [
    { src: "assets/sprites/Pills.png", id: "Pills" }
];

DrPills.Sprites.Load = function (loader) {
    DrPills.Sprites.Pills.Sheet = new createjs.SpriteSheet({
        "images": [loader.getResult("Pills")],
        "frames": { "height": DrPills.Sprites.Options.PillHeight, "width": DrPills.Sprites.Options.PillWidth },
        "animations": { "Red": [0, 0] }
    });



    DrPills.Sprites.Pills.Red = function () { return new createjs.Sprite(DrPills.Sprites.Pills.Sheet, "Red"); };
};