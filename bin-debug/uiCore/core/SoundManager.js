var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var uiCore;
(function (uiCore) {
    /**
     * 声音管理器
     * 必须要预加载所有声音文件
     */
    var SoundManager = (function () {
        function SoundManager() {
        }
        Object.defineProperty(SoundManager, "musicVolume", {
            get: function () {
                return this._musicVolume;
            },
            set: function (value) {
                this._musicVolume = value;
                if (this.musicChannel) {
                    this.musicChannel.volume = value;
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SoundManager, "effectVolume", {
            get: function () {
                return this._effectVolume;
            },
            set: function (value) {
                this._effectVolume = value;
                for (var i = 0; i < this.effectList.length; i++) {
                    this.effectList[i].volume = value;
                }
            },
            enumerable: true,
            configurable: true
        });
        SoundManager.getHallMusicMute = function () {
            this.init();
            return this._hallMusicMute;
        };
        SoundManager.init = function () {
            var _this = this;
            if (!this.isInited) {
                this.isInited = true;
                uiCore.EventManager["getInstance"]().addEventListener(uiCore.Application.APPEVENT_PAUSE, this.onAppPause, this);
                uiCore.EventManager["getInstance"]().addEventListener(uiCore.Application.APPEVENT_RESUME, this.onAppResume, this);
                // 获取本地声音状态
                this._hallMusicMute = uiCore.Utils.getLocalStorageItem(this.kGameHallMusicStatus, "Boolean");
                this.musicVolume = this._hallMusicMute ? 0 : 1;
                this._gameMusicMute = {};
                // 获取所有操作过声音状态的游戏
                this._controlGames = uiCore.Utils.getLocalStorageItem(this.kGamesControlMute, "Array");
                this._controlGames.forEach(function (element) {
                    _this._gameMusicMute[element] = uiCore.Utils.getLocalStorageItem(_this.kGamesControlMute + "_" + element, "Array");
                });
            }
        };
        SoundManager.onAppPause = function () {
            this._lastmusicVolume = this.musicVolume;
            if (this.musicVolume != 0) {
                this.musicVolume = 0;
            }
            this._lasteffectVolume = this.effectVolume;
            if (this.effectVolume != 0) {
                this.effectVolume = 0;
            }
            this.stopAllEffects();
        };
        SoundManager.onAppResume = function () {
            if (this._lastmusicVolume != undefined) {
                this.musicVolume = this._lastmusicVolume;
                this._lastmusicVolume = 0;
            }
            if (this._lasteffectVolume != undefined) {
                this.effectVolume = this._lasteffectVolume;
                this._lasteffectVolume = 0;
            }
        };
        /**
         * 播放音乐，建议用mp3格式
         * @param source 相对于resource的音乐资源路径
         * @param loop 是否循环播放
         */
        SoundManager.playMusic = function (source, loop, startTime, cb, tg) {
            var _this = this;
            if (loop === void 0) { loop = 0; }
            if (startTime === void 0) { startTime = 0; }
            if (cb === void 0) { cb = null; }
            if (tg === void 0) { tg = null; }
            this.init();
            if (this.music) {
                if (this.musicSource == source) {
                    return;
                }
                this.musicChannel.stop();
                this.music = null;
                this.musicChannel = null;
            }
            this.musicSource = source;
            this.musicLoop = loop;
            var sound = RES.getRes(source);
            if (sound) {
                this.music = sound;
                this.musicChannel = this.music.play(startTime, loop);
                this.musicChannel.volume = this._musicVolume;
            }
            else {
                RES.getResAsync(source, function (data, key) {
                    if (key == _this.musicSource) {
                        _this.playMusic(_this.musicSource, _this.musicLoop);
                    }
                }, this);
            }
        };
        /**
         * 停止播放音乐
         */
        SoundManager.stopMusic = function () {
            this.musicSource = null;
            if (this.music) {
                this.musicChannel.stop();
                this.music = null;
                this.musicChannel = null;
            }
        };
        /**
        * 播放音效，建议用mp3格式
        * @param source 相对于resource的音效资源路径
        * @param loop 是否循环播放
        */
        SoundManager.playEffect = function (source, loop, volume) {
            if (loop === void 0) { loop = 1; }
            if (volume === void 0) { volume = -1; }
            this.init();
            var effectVolume = volume == -1 ? this._effectVolume : volume;
            var sound = RES.getRes(source);
            if (sound) {
                var effect = sound.play(0, loop);
                effect.volume = effectVolume;
                for (var i = 0; i < uiCore.SoundManager.effectList.length; i++) {
                    if (uiCore.SoundManager.effectList[i] == effect) {
                        uiCore.SoundManager.effectList.splice(i, 1);
                    }
                }
                uiCore.SoundManager.effectList.push(effect);
            }
            else {
                RES.getResAsync(source, function (data, key) { }, this);
            }
        };
        /**
         * 停止播放所有音效
         */
        SoundManager.stopAllEffects = function () {
            while (this.effectList.length) {
                this.effectList.shift().stop();
            }
        };
        /**
         * 关闭大厅背景音乐
         */
        SoundManager.muteHallMusic = function (isMute) {
            this.init();
            this._hallMusicMute = isMute;
            egret.localStorage.setItem(this.kGameHallMusicStatus, String(isMute));
            this.musicVolume = isMute ? 0 : 1;
        };
        /**
         * 游戏内调整声音大小, 下次播放自动使用此大小
         * volume: 声音大小 0-1
         * isEffects: 是否特效
         * serverID: 游戏 ID
         */
        SoundManager.setGameMusicVolume = function (volume, isEffects, serverID) {
            this.init();
            if (this._controlGames.indexOf(serverID) == -1) {
                this._controlGames.push(serverID);
                this._gameMusicMute[serverID] = [0.8, 0.8];
            }
            if (this._gameMusicMute[serverID][isEffects ? 0 : 1] != volume) {
                this._gameMusicMute[serverID][isEffects ? 0 : 1] = volume;
                egret.localStorage.setItem(this.kGamesControlMute, "[" + this._controlGames.toString() + "]");
                egret.localStorage.setItem(this.kGamesControlMute + "_" + serverID, "[" + this._gameMusicMute[serverID].toString() + "]");
            }
            // 调整音量
            if (isEffects)
                this.effectVolume = volume;
            else
                this.musicVolume = volume;
        };
        /**
         * 0: 特效声音
         * 1: 背景声音
         */
        SoundManager.getGameMusicVolume = function (serverID) {
            this.init();
            if (this._controlGames.indexOf(serverID) == -1) {
                this._controlGames.push(serverID);
                this._gameMusicMute[serverID] = [0.8, 0.8];
                egret.localStorage.setItem(this.kGamesControlMute, "[" + this._controlGames.toString() + "]");
                egret.localStorage.setItem(this.kGamesControlMute + "_" + serverID, "[" + this._gameMusicMute[serverID].toString() + "]");
            }
            return this._gameMusicMute[serverID];
        };
        SoundManager._musicStartTime = 0;
        SoundManager._musicVolume = 1;
        SoundManager.effectList = [];
        SoundManager._effectVolume = 1;
        /**
         * 暂时先定义属性来保存状态
         */
        SoundManager.kGameHallMusicStatus = "kGameHallMusicStatus";
        SoundManager.kGameMusicStatus = "kGameMusicStatus";
        SoundManager.kGamesControlMute = "kGamesControlMute";
        SoundManager._hallMusicMute = false;
        return SoundManager;
    }());
    uiCore.SoundManager = SoundManager;
    __reflect(SoundManager.prototype, "uiCore.SoundManager");
})(uiCore || (uiCore = {}));
//# sourceMappingURL=SoundManager.js.map