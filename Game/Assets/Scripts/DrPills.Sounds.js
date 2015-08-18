var DrPills = DrPills || {};

DrPills.SoundEngine = function(queue) {
    queue = queue || new createjs.LoadQueue();
    createjs.Sound.alternateExtensions = ["mp3", "m4a"];
    queue.installPlugin(createjs.Sound);
    this.loader = queue;
};

DrPills.SoundEngine.Initialize = function soundEngine_initialize(queue) {
    var se = new DrPills.SoundEngine(queue);
    se.loader.loadManifest(DrPills.SoundEngine.Manifest)
    return se;
};

DrPills.SoundEngine.prototype.startTheme = function soundEngine_startTheme() {
    if(!this.theme) {
        this.theme = createjs.Sound.play('theme-music');
        this.theme.volume = 0.25;
    }
};

DrPills.SoundEngine.prototype.effect = function soundEngine_effect(id) {
    createjs.Sound.play(id);
};

DrPills.SoundEngine.Manifest = [
    { src: "Assets/Sounds/Pill-Swallow.m4a", id: "pill-swallow" },
    { src: "Assets/Sounds/Pill-Turn.m4a", id: "pill-turn" },
    { src: "Assets/Sounds/Pill-Move-Right.m4a", id: "pill-move-right" },
    { src: "Assets/Sounds/Pill-Move-Left.m4a", id: "pill-move-left" },
    { src: "Assets/Sounds/Pill-Land.m4a", id: "pill-land" },
    { src: "Assets/Sounds/Pill-Drop.m4a", id: "pill-drop" },
    { src: "Assets/Sounds/05 Burlesque Show.mp3", id: "theme-music" }
]

// var se = DrPills.SoundEngine.Initialize();
// se.loader.addEventListener("complete", function() { se.startTheme(); });
