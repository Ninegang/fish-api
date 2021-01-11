var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Sound = (function () {
    function Sound(music, soundType, soundName) {
        this.music = music;
        this.soundType = soundType;
        this.soundName = soundName;
    }
    Object.defineProperty(Sound.prototype, "getSoundType", {
        get: function () {
            return this.soundType;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Sound.prototype, "getSoundName", {
        get: function () {
            return this.soundName;
        },
        enumerable: true,
        configurable: true
    });
    return Sound;
}());
__reflect(Sound.prototype, "Sound");
//# sourceMappingURL=Sound.js.map