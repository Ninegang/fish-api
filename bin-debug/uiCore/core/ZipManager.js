var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var uiCore;
(function (uiCore) {
    var ZipManager = (function () {
        function ZipManager() {
        }
        ZipManager.zipResourceProgress = function (zipName) {
            if (this.ZIP_CONFIG.projectConfig == zipName) {
                uiCore.ProtobufManager.init(zipName);
                FishGameManager.initFishManager(zipName);
            }
            else if (this.ZIP_CONFIG.particleEffect.indexOf(zipName) >= 0) {
                this.zipParticleLoading(zipName);
            }
            else if (this.ZIP_CONFIG.movieClipEffect.indexOf(zipName) >= 0) {
                this.zipMovieClipLoading(zipName);
            }
            else if (this.ZIP_CONFIG.sounds.indexOf(zipName) >= 0) {
                this.zipSoundsLoading(zipName);
            }
            else if (this.ZIP_CONFIG.dragonBoneEffect.indexOf(zipName) >= 0) {
                this.dragonBoneLoading(zipName);
            }
            else if (this.ZIP_CONFIG.sheetImage.indexOf(zipName) >= 0) {
                this.sheetImageLoading(zipName);
            }
            else if (this.ZIP_CONFIG.fontImage.indexOf(zipName) >= 0) {
                this.fontImageLoading(zipName);
            }
        };
        ZipManager.fontImageLoading = function (zipName) {
            var data = RES.getRes(zipName);
            if (data) {
                JSZip.loadAsync(data).then(function (zipdata) {
                    zipdata.forEach(function (relativePath, file) {
                        var keyName = relativePath.substr(0, relativePath.lastIndexOf("."));
                        file.async('text').then(function (content) {
                            uiCore.ZipManager.FontImageJsonMap[keyName] = JSON.parse(content);
                        });
                    });
                });
            }
            else {
                RES.getResAsync(zipName, this.checkFontImage, this);
            }
        };
        ZipManager.checkFontImage = function (data, key) {
            this.fontImageLoading(key);
        };
        ZipManager.initFont = function (fontNames) {
            if (fontNames.length > 0) {
                for (var name in fontNames) {
                    this.fontLoading(fontNames[name]);
                }
            }
        };
        ZipManager.fontLoading = function (imageName) {
            if (!this.FontImageMap[imageName + "_fnt"]) {
                if (RES.hasRes(imageName)) {
                    var imageData = RES.getRes(imageName);
                    if (imageData) {
                        if (this.FontImageJsonMap[imageName]) {
                            this.FontImageMap[imageName + "_fnt"] = new egret.BitmapFont(imageData, this.FontImageJsonMap[imageName]);
                        }
                    }
                    else {
                        RES.getResAsync(imageName, this.checkFont, this);
                    }
                }
                else if (this.SubkeyImageMap[imageName] && this.FontImageJsonMap[imageName]) {
                    this.FontImageMap[imageName + "_fnt"] = new egret.BitmapFont(this.SubkeyImageMap[imageName], this.FontImageJsonMap[imageName]);
                }
            }
        };
        ZipManager.getFontImageMap = function (key) {
            if (this.FontImageMap[key]) {
                return this.FontImageMap[key];
            }
            return null;
        };
        ZipManager.checkFont = function (data, key) {
            this.fontLoading(key);
        };
        ZipManager.sheetImageLoading = function (zipName) {
            var data = RES.getRes(zipName);
            if (data) {
                JSZip.loadAsync(data).then(function (zipdata) {
                    zipdata.forEach(function (relativePath, file) {
                        file.async('string').then(function (content) {
                            var dataJson = JSON.parse(content);
                            uiCore.ZipManager.saveTexture(dataJson);
                        });
                    });
                });
            }
            else {
                RES.getResAsync(zipName, this.checkSheetImage, this);
            }
        };
        ZipManager.checkSheetImage = function (data, key) {
            this.sheetImageLoading(key);
        };
        ZipManager.saveTexture = function (data) {
            var imageName = data.file;
            imageName = imageName.replace(".", "_");
            this.SheetImageMap[imageName] = data;
            this.textureLoading(imageName);
        };
        ZipManager.textureLoading = function (imageName) {
            var imageData = RES.getRes(imageName);
            if (imageData) {
                if (this.SheetImageMap[imageName]) {
                    var frames = this.SheetImageMap[imageName].frames;
                    var spriteSheet = new egret.SpriteSheet(imageData);
                    for (var subkey in frames) {
                        var config = frames[subkey];
                        var texture = spriteSheet.createTexture(subkey, config.x, config.y, config.w, config.h, config.offX, config.offY, config.sourceW, config.sourceH);
                        if (config["scale9grid"]) {
                            var str = config["scale9grid"];
                            var list = str.split(",");
                            texture["scale9Grid"] = new egret.Rectangle(parseInt(list[0]), parseInt(list[1]), parseInt(list[2]), parseInt(list[3]));
                        }
                        this.SubkeyImageMap[subkey] = texture;
                    }
                    delete this.SheetImageMap[imageName];
                }
            }
            else {
                RES.getResAsync(imageName, this.checkTexture, this);
            }
        };
        ZipManager.checkTexture = function (data, key) {
            this.textureLoading(key);
        };
        ZipManager.getSubkeyImageMap = function (key) {
            if (this.SubkeyImageMap[key]) {
                return this.SubkeyImageMap[key];
            }
            return null;
        };
        ZipManager.setSubkeyImageMap = function (key, value) {
            if (key && value) {
                this.SubkeyImageMap[key] = value;
            }
        };
        ZipManager.dragonBoneLoading = function (zipName) {
            var data = RES.getRes(zipName);
            if (data) {
                JSZip.loadAsync(data).then(function (zipdata) {
                    zipdata.forEach(function (relativePath, file) {
                        var dragonBoneName = relativePath.substr(0, relativePath.lastIndexOf("."));
                        if (!ZipManager.DragonBoneJsonMap[dragonBoneName]) {
                            file.async('text').then(function (content) {
                                ZipManager.DragonBoneJsonMap[dragonBoneName] = JSON.parse(content);
                            });
                        }
                    });
                });
            }
            else {
                RES.getResAsync(zipName, this.checkDragonBoneJsonMap, this);
            }
        };
        ZipManager.checkDragonBoneJsonMap = function (data, key) {
            this.dragonBoneLoading(key);
        };
        ZipManager.zipSoundsLoading = function (zipName) {
            var data = RES.getRes(zipName);
            if (data) {
                JSZip.loadAsync(data).then(function (zipdata) {
                    zipdata.forEach(function (relativePath, file) {
                        var soundsName = relativePath.substr(0, relativePath.lastIndexOf("."));
                        if (!ZipManager.SoundsMap[soundsName]) {
                            file.async('base64').then(function (base64) {
                                ZipManager.SoundsMap[soundsName] = "data:audio/mp3;base64," + base64;
                            });
                        }
                    });
                });
            }
            else {
                RES.getResAsync(zipName, this.checkSoundsMap, this);
            }
        };
        ZipManager.checkSoundsMap = function (data, key) {
            this.zipSoundsLoading(key);
        };
        ZipManager.zipMovieClipLoading = function (zipName) {
            var data = RES.getRes(zipName);
            if (data) {
                JSZip.loadAsync(data).then(function (zipdata) {
                    zipdata.forEach(function (relativePath, file) {
                        if (!file.dir) {
                            var movieClipName_1 = relativePath.substr(0, relativePath.lastIndexOf("."));
                            if (!ZipManager.MovieClipJsonMap[movieClipName_1]) {
                                file.async('text').then(function (content) {
                                    ZipManager.MovieClipJsonMap[movieClipName_1] = JSON.parse(content);
                                });
                            }
                        }
                    });
                });
            }
            else {
                RES.getResAsync(zipName, this.checkMovieClipJsonMap, this);
            }
        };
        ZipManager.checkMovieClipJsonMap = function (data, key) {
            this.zipMovieClipLoading(key);
        };
        ZipManager.zipParticleLoading = function (zipName) {
            var data = RES.getRes(zipName);
            if (data) {
                JSZip.loadAsync(data).then(function (zipdata) {
                    zipdata.forEach(function (relativePath, file) {
                        var particleName = relativePath.substr(0, relativePath.lastIndexOf("."));
                        if (!ZipManager.ParticleJsonMap[particleName]) {
                            file.async('text').then(function (content) {
                                ZipManager.ParticleJsonMap[particleName] = JSON.parse(content);
                            });
                        }
                    });
                });
            }
            else {
                RES.getResAsync(zipName, this.checkParticleJsonMap, this);
            }
        };
        ZipManager.checkParticleJsonMap = function (data, key) {
            this.zipParticleLoading(key);
        };
        ZipManager.getParticleJsonMap = function (particleName) {
            if (this.ParticleJsonMap[particleName]) {
                return this.ParticleJsonMap[particleName];
            }
            return null;
        };
        ZipManager.getMovieClipJsonMap = function (movieClipName) {
            if (this.MovieClipJsonMap[movieClipName]) {
                return this.MovieClipJsonMap[movieClipName];
            }
            return null;
        };
        ZipManager.getSoundsMap = function (soundsName) {
            if (this.SoundsMap[soundsName]) {
                return this.SoundsMap[soundsName];
            }
            else {
                var soundData = RES.getRes(soundsName);
                if (soundData) {
                    return "data:audio/mp3;base64," + egret.Base64Util.encode(soundData);
                    // return "data:audio/wav;base64,"+egret.Base64Util.encode(soundData);
                }
                else {
                    RES.getResAsync(soundsName);
                }
            }
            return null;
        };
        ZipManager.getDragonBoneJsonMap = function (dragonBoneName) {
            if (this.DragonBoneJsonMap[dragonBoneName]) {
                return this.DragonBoneJsonMap[dragonBoneName];
            }
            return null;
        };
        ZipManager.ZIP_CONFIG = {
            projectConfig: "config_zip",
            particleEffect: "publicParticle_zip",
            movieClipEffect: "publicMovieClip_zip",
            dragonBoneEffect: "publicDragonBone_zip",
            sounds: "FishAudio_zip",
            sheetImage: "publicSheet_zip,fishGameSheet_zip",
            fontImage: "fishGameFnt_zip" //字体Json文件集合
        };
        ZipManager.ParticleJsonMap = {};
        ZipManager.MovieClipJsonMap = {};
        ZipManager.DragonBoneJsonMap = {};
        ZipManager.SoundsMap = {};
        ZipManager.SheetImageMap = {};
        ZipManager.SubkeyImageMap = {};
        ZipManager.FontImageJsonMap = {};
        ZipManager.FontImageMap = {};
        return ZipManager;
    }());
    uiCore.ZipManager = ZipManager;
    __reflect(ZipManager.prototype, "uiCore.ZipManager");
})(uiCore || (uiCore = {}));
//# sourceMappingURL=ZipManager.js.map