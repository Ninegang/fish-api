var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var uiCore;
(function (uiCore) {
    /**
     * 声音管理器
     * 必须要预加载所有声音文件
     */
    var SoundByteManager = (function () {
        function SoundByteManager() {
        }
        SoundByteManager.setVolumes = function (setType, value) {
            if (setType === void 0) { setType = 2; }
            for (var i in this.SoundArray) {
                if (setType == 2 || this.SoundArray[i].getSoundType == setType) {
                    this.SoundArray[i].music.volume(value == null ? uiCore.Utils.getLocalStorageItem(this.SoundArray[i].getSoundType == 0 ? this.FISH_MUSIC_VALUE : this.FISH_SOUND_VALUE, "Number") : value);
                }
            }
        };
        SoundByteManager.onAppPause = function () {
            this.setVolumes(2, 0);
        };
        /**
         * 确保在调用onAppPause后调用此方法, 否则会出现问题
         */
        SoundByteManager.onAppResume = function () {
            this.setVolumes();
        };
        SoundByteManager.stopMusic = function () {
            if (this.currMusic) {
                this.currMusic.music.pause();
            }
        };
        SoundByteManager.stopEffectAll = function () {
            for (var i in this.SoundArray) {
                if (this.SoundArray[i].getSoundType == 1) {
                    this.SoundArray[i].music.pause();
                }
            }
        };
        SoundByteManager.stopEffect = function () {
            if (this.currSound) {
                this.currSound.music.pause();
            }
        };
        SoundByteManager.getSoundByName = function (soundName) {
            for (var i in this.SoundArray) {
                if (this.SoundArray[i].getSoundName == soundName) {
                    return this.SoundArray[i];
                }
            }
            return null;
        };
        SoundByteManager.getSoundByPaused = function (soundName) {
            for (var i in this.SoundArray) {
                if (this.SoundArray[i].getSoundName == soundName && !this.SoundArray[i].music.playing()) {
                    return this.SoundArray[i];
                }
            }
            return null;
        };
        //播放背景音乐
        SoundByteManager.playMusic = function (soundName) {
            if (soundName == null)
                return;
            if (this.currMusic && this.currMusic.getSoundName == soundName) {
                if (!this.currMusic.music.playing()) {
                    this.currMusic.music.volume(this.musicValue);
                    this.currMusic.music.loop(true);
                    this.currMusic.music.play();
                }
                return;
            }
            var sound = this.getSoundByName(soundName);
            if (sound) {
                if (this.currMusic) {
                    this.currMusic.music.pause();
                }
                this.currMusic = sound;
            }
            else {
                var base64Str = uiCore.ZipManager.getSoundsMap(soundName);
                if (!base64Str) {
                    return;
                }
                if (this.currMusic) {
                    this.currMusic.music.pause();
                }
                this.currMusic = new Sound(new Howl({ src: [base64Str] }), 0, soundName);
                this.SoundArray.push(this.currMusic);
            }
            this.currMusic.music.volume(this.musicValue);
            this.currMusic.music.loop(true);
            this.currMusic.music.play();
        };
        SoundByteManager.playEffectLoop = function (effectName) {
            if (effectName == null)
                return;
            if (this.currSound && this.currSound.getSoundName == effectName) {
                if (!this.currSound.music.playing()) {
                    this.currSound.music.volume(this.soundValue);
                    this.currSound.music.loop(true);
                    this.currSound.music.play();
                }
                return;
            }
            var sound = this.getSoundByPaused(effectName);
            if (sound) {
                if (this.currSound) {
                    this.currSound.music.pause();
                }
                this.currSound = sound;
            }
            else {
                var base64Str = uiCore.ZipManager.getSoundsMap(effectName);
                if (!base64Str) {
                    return;
                }
                if (this.currSound) {
                    this.currSound.music.pause();
                }
                this.currSound = new Sound(new Howl({ src: [base64Str] }), 1, effectName);
                this.SoundArray.push(this.currSound);
            }
            this.currSound.music.volume(this.soundValue);
            this.currSound.music.loop(true);
            this.currSound.music.play();
        };
        SoundByteManager.playEffect = function (effectName) {
            if (effectName == null)
                return;
            var sound = this.getSoundByPaused(effectName);
            if (!sound) {
                var base64Str = uiCore.ZipManager.getSoundsMap(effectName);
                if (!base64Str) {
                    return;
                }
                sound = new Sound(new Howl({ src: [base64Str] }), 1, effectName);
                this.SoundArray.push(sound);
            }
            sound.music.volume(this.soundValue);
            sound.music.loop(false);
            sound.music.play();
        };
        SoundByteManager.SoundArray = [];
        SoundByteManager.musicValue = 0.5;
        SoundByteManager.soundValue = 0.8;
        SoundByteManager.FISH_MUSIC_VALUE = "fishMusicValue";
        SoundByteManager.FISH_SOUND_VALUE = "fishSoundValue";
        return SoundByteManager;
    }());
    uiCore.SoundByteManager = SoundByteManager;
    __reflect(SoundByteManager.prototype, "uiCore.SoundByteManager");
})(uiCore || (uiCore = {}));
//# sourceMappingURL=SoundByteManager.js.map