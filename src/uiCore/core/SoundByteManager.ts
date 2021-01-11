namespace uiCore {
    /**
     * 声音管理器
     * 必须要预加载所有声音文件
     */
    export class SoundByteManager {
        public static SoundArray:Array<Sound>=[];
        public static currMusic:Sound;
        public static currSound:Sound;
        public static musicValue:number=0.5;
        public static soundValue:number=0.8;
        public static readonly FISH_MUSIC_VALUE="fishMusicValue";
        public static readonly FISH_SOUND_VALUE="fishSoundValue";
        public static currMusicHowl:Howl;

        public static setVolumes(setType:number=2,value?:number):void{
            for(var i in this.SoundArray){
                if(setType==2||this.SoundArray[i].getSoundType==setType){
                    this.SoundArray[i].music.volume(value==null?uiCore.Utils.getLocalStorageItem(this.SoundArray[i].getSoundType==0?this.FISH_MUSIC_VALUE:this.FISH_SOUND_VALUE, "Number"):value);
                }
            }
        }

        public static onAppPause(): void {
            this.setVolumes(2,0);
        }

        /**
         * 确保在调用onAppPause后调用此方法, 否则会出现问题
         */
        public static onAppResume(): void {
            this.setVolumes();
        }

        public static stopMusic(): void {
            if (this.currMusic) {
                this.currMusic.music.pause();
            }
        }

        public static stopEffectAll(): void {
            for(var i in this.SoundArray){
                if(this.SoundArray[i].getSoundType==1){
                    this.SoundArray[i].music.pause();
                }
            }
        }

        public static stopEffect(): void {
            if (this.currSound) {
                this.currSound.music.pause();
            }
        }

        private static getSoundByName(soundName:string):Sound{
            for(var i in this.SoundArray){
                if(this.SoundArray[i].getSoundName==soundName){
                    return this.SoundArray[i];
                }
            }
            return null;
        }

        private static getSoundByPaused(soundName:string):Sound{
            for(var i in this.SoundArray){
                if(this.SoundArray[i].getSoundName==soundName&&!this.SoundArray[i].music.playing()){
                    return this.SoundArray[i];
                }
            }
            return null;
        }
        //播放背景音乐
        public static playMusic(soundName:string): void {
            if (soundName == null) return;
            if(this.currMusic&&this.currMusic.getSoundName==soundName){
                if(!this.currMusic.music.playing()){
                    this.currMusic.music.volume(this.musicValue);
                    this.currMusic.music.loop(true);
                    this.currMusic.music.play();
                }
                return;
            }
            let sound:Sound = this.getSoundByName(soundName);
            if(sound){
                if(this.currMusic){
                    this.currMusic.music.pause();
                }
                this.currMusic=sound;
            }else{
                let base64Str:string = uiCore.ZipManager.getSoundsMap(soundName);
                if(!base64Str){
                    return;
                }
                if(this.currMusic){
                    this.currMusic.music.pause();
                }
                this.currMusic=new Sound(new Howl({src:[base64Str]}),0,soundName);
                this.SoundArray.push(this.currMusic);
            }
            this.currMusic.music.volume(this.musicValue);
            this.currMusic.music.loop(true);
            this.currMusic.music.play();
        }

         public static playEffectLoop(effectName:string): void {
            if (effectName == null) return;
            if(this.currSound&&this.currSound.getSoundName==effectName){
                if(!this.currSound.music.playing()){
                    this.currSound.music.volume(this.soundValue);
                    this.currSound.music.loop(true);
                    this.currSound.music.play();
                }
                return;
            }
            let sound:Sound = this.getSoundByPaused(effectName);
            if(sound){
                if(this.currSound){
                    this.currSound.music.pause();
                }
                this.currSound=sound;
            }else{
                var base64Str:string = uiCore.ZipManager.getSoundsMap(effectName);
                if(!base64Str){
                    return;
                }
                if(this.currSound){
                    this.currSound.music.pause();
                }
                this.currSound = new Sound(new Howl({src:[base64Str]}),1,effectName);
                this.SoundArray.push(this.currSound);
            }
            this.currSound.music.volume(this.soundValue);
            this.currSound.music.loop(true);
            this.currSound.music.play();
        }

        public static playEffect(effectName:string): void {
            if (effectName == null) return;
            let sound:Sound = this.getSoundByPaused(effectName);
            if(!sound){
                var base64Str:string = uiCore.ZipManager.getSoundsMap(effectName);
                if(!base64Str){
                    return;
                }
                sound = new Sound(new Howl({src:[base64Str]}),1,effectName);
                this.SoundArray.push(sound);
            }
            sound.music.volume(this.soundValue);
            sound.music.loop(false);
            sound.music.play();
        }
    }
}