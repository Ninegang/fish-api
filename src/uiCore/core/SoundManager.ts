namespace uiCore {
    /**
     * 声音管理器
     * 必须要预加载所有声音文件
     */
    export class SoundManager {
        public static music:egret.Sound;
        public static musicChannel:egret.SoundChannel;
        private static _musicStartTime:number = 0;
        private static _musicVolume: number = 1;

        public static get musicVolume(): number {
            return this._musicVolume;
        }
        public static set musicVolume(value: number) {
            this._musicVolume = value;
            if (this.musicChannel) {
                this.musicChannel.volume=value;
            }
        }

        private static effectList: any[] = [];

        private static _effectVolume: number = 1;
        public static get effectVolume(): number {
            return this._effectVolume;
        }
        public static set effectVolume(value: number) {
            this._effectVolume = value;
            for (var i: number = 0; i < this.effectList.length; i++) {
                this.effectList[i].volume = value;
            }
        }
        private static _lastmusicVolume: number;
        private static _lasteffectVolume: number;
        private static musicSource: string;
        private static musicLoop: number;
        private static isInited: boolean;

        /**
         * 暂时先定义属性来保存状态
         */
        
        public static kGameHallMusicStatus = "kGameHallMusicStatus";
        public static kGameMusicStatus = "kGameMusicStatus";
        public static kGamesControlMute = "kGamesControlMute";
        private static _hallMusicMute: boolean = false;
        private static _gameMusicMute: Map<Array<number>>;
        private static _controlGames: Array<number>;
        public static getHallMusicMute() {
            this.init();
            return this._hallMusicMute;
        }

         private static init(): void {
            if (!this.isInited) {
                this.isInited = true;
                EventManager["getInstance"]().addEventListener(Application.APPEVENT_PAUSE, this.onAppPause, this);
                EventManager["getInstance"]().addEventListener(Application.APPEVENT_RESUME, this.onAppResume, this);
                // 获取本地声音状态
                this._hallMusicMute = Utils.getLocalStorageItem(this.kGameHallMusicStatus, "Boolean");
                this.musicVolume = this._hallMusicMute ? 0 : 1;
                this._gameMusicMute = {};
                // 获取所有操作过声音状态的游戏
                this._controlGames = Utils.getLocalStorageItem(this.kGamesControlMute, "Array");
                this._controlGames.forEach(element => {
                    this._gameMusicMute[element] = Utils.getLocalStorageItem(this.kGamesControlMute + "_" + element, "Array");
                });
            }
        }

        private static onAppPause(): void {
            this._lastmusicVolume = this.musicVolume;
            if (this.musicVolume != 0) {
                this.musicVolume = 0;
            }
            this._lasteffectVolume = this.effectVolume;
            if (this.effectVolume != 0) {
                this.effectVolume = 0;
            }
            this.stopAllEffects();
        }

        private static onAppResume(): void {
            if (this._lastmusicVolume != undefined) {
                this.musicVolume = this._lastmusicVolume;
                this._lastmusicVolume = 0;
            }
            if (this._lasteffectVolume != undefined) {
                this.effectVolume = this._lasteffectVolume;
                this._lasteffectVolume = 0;
            }
        }

        /**
         * 播放音乐，建议用mp3格式
         * @param source 相对于resource的音乐资源路径
         * @param loop 是否循环播放
         */
        public static playMusic(source: string, loop: number = 0, startTime: number = 0, cb: Function = null, tg: any = null): void {
            this.init();

            if (this.music) {
                if (this.musicSource == source) {
                    return;
                }
                this.musicChannel.stop();
                this.music = null;
                this.musicChannel=null;
            }
            this.musicSource = source;
            this.musicLoop = loop;
            var sound: egret.Sound = RES.getRes(source);
            if (sound) {
                this.music = sound;
                this.musicChannel=this.music.play(startTime,loop);
                this.musicChannel.volume=this._musicVolume;
            } else {
                RES.getResAsync(source, (data, key) => {
                    if (key == this.musicSource) {
                        this.playMusic(this.musicSource, this.musicLoop);
                    }
                }, this);
            }
        }

        /**
         * 停止播放音乐
         */
        public static stopMusic(): void {
            this.musicSource = null;
            if (this.music) {
                this.musicChannel.stop();
                this.music = null;
                this.musicChannel=null;
            }
        }

         /**
         * 播放音效，建议用mp3格式
         * @param source 相对于resource的音效资源路径
         * @param loop 是否循环播放
         */
        public static playEffect(source: string, loop: number = 1, volume: number = -1): void {
            this.init();
            var effectVolume = volume == -1 ? this._effectVolume : volume;
            var sound: egret.Sound = RES.getRes(source);
            if (sound) {
                var effect:egret.SoundChannel=sound.play(0,loop);
                effect.volume=effectVolume;
                for (var i = 0; i < uiCore.SoundManager.effectList.length; i++) {
                    if (uiCore.SoundManager.effectList[i] == effect) {
                        uiCore.SoundManager.effectList.splice(i, 1);
                    }
                }
                uiCore.SoundManager.effectList.push(effect);
            } else {
                RES.getResAsync(source, (data, key) => { }, this);
            }
        }
        /**
         * 停止播放所有音效
         */
        public static stopAllEffects(): void {
            while (this.effectList.length) {
                this.effectList.shift().stop();
            }
        }

        /**
         * 关闭大厅背景音乐
         */
        public static muteHallMusic(isMute){
            this.init();
            this._hallMusicMute = isMute;
            egret.localStorage.setItem(this.kGameHallMusicStatus, String(isMute));
            this.musicVolume = isMute ? 0 : 1;
        }

        /**
         * 游戏内调整声音大小, 下次播放自动使用此大小
         * volume: 声音大小 0-1
         * isEffects: 是否特效
         * serverID: 游戏 ID
         */
        public static setGameMusicVolume(volume, isEffects, serverID: number) {
            this.init();
            
            if (this._controlGames.indexOf(serverID) == -1) {
                this._controlGames.push(serverID);
                this._gameMusicMute[serverID] = [ 0.8, 0.8];
            }

            if (this._gameMusicMute[serverID][isEffects ? 0 : 1] != volume) {
                this._gameMusicMute[serverID][isEffects ? 0 : 1] = volume;
                egret.localStorage.setItem(this.kGamesControlMute, "["+this._controlGames.toString()+"]");
                egret.localStorage.setItem(this.kGamesControlMute + "_" + serverID, "["+this._gameMusicMute[serverID].toString()+"]");
            }

            // 调整音量
            if (isEffects) this.effectVolume = volume; 
            else this.musicVolume = volume;
        }
        /**
         * 0: 特效声音
         * 1: 背景声音
         */
        public static getGameMusicVolume(serverID: number) {
            this.init();

            if (this._controlGames.indexOf(serverID) == -1) {
                this._controlGames.push(serverID);
                this._gameMusicMute[serverID] = [ 0.8, 0.8];
                egret.localStorage.setItem(this.kGamesControlMute, "["+this._controlGames.toString()+"]");
                egret.localStorage.setItem(this.kGamesControlMute + "_" + serverID, "["+this._gameMusicMute[serverID].toString()+"]");
            }

            return this._gameMusicMute[serverID];
        }
    }
}