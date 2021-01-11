var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var FishGen = (function (_super) {
    __extends(FishGen, _super);
    function FishGen() {
        var _this = _super.call(this) || this;
        _this.lockFish = null;
        _this.isSelfGen = false; //玩家自己
        _this.targetPos = new egret.Point();
        _this.genPoint = new egret.Point();
        _this.currGenPoint = new egret.Point();
        _this.fx = new egret.Point();
        _this.fishPoint = new egret.Point();
        _this.skinName = "FishGenSceneSkin";
        _this.isCannon = false;
        _this.tagIndex = 0;
        _this.lockTag = 0;
        _this.isAware = false;
        _this.isRobot = false;
        _this.isInited = false;
        _this.allBullets = [];
        _this.fireRate = 0.4;
        _this.visible = false;
        return _this;
    }
    FishGen.prototype.initCoinColumnAnimation = function () {
        this.currGenPoint.x = this.fishGen.x;
        this.currGenPoint.y = this.fishGen.y;
        var leftResultPoint = uiCore.CircleUtils.getCirclePoint(this.currGenPoint, 80, this.fishGen.rotation - 92);
        var rightResultPoint = uiCore.CircleUtils.getCirclePoint(this.currGenPoint, 80, this.fishGen.rotation - 88);
        this.LfireLight.x = leftResultPoint.x;
        this.LfireLight.y = leftResultPoint.y;
        this.LlittleLight.x = leftResultPoint.x;
        this.LlittleLight.y = leftResultPoint.y;
        this.RfireLight.x = rightResultPoint.x;
        this.RfireLight.y = rightResultPoint.y;
        this.RlittleLight.x = rightResultPoint.x;
        this.RlittleLight.y = rightResultPoint.y;
    };
    FishGen.prototype.SetId = function (id) {
        var self = this;
        this.bulletPool = new BulletPool(function () {
            var bulletimage = new eui.Image();
            bulletimage.source = FishGameController.getGameView().getBulletPrefab(id, false);
            var bullet = new Bullet(bulletimage);
            bullet.setFishGen(self);
            return bullet;
        });
        this.bulletPool.Init(6);
        this.SeatNo = id;
        this.lockFishTraker = new eui.Image();
        this.lockFishTraker.source = "locknum" + (id + 1);
        FishGameController.getGameView().addChild(this.lockFishTraker);
        this.lockFishTraker.anchorOffsetX = 50;
        this.lockFishTraker.anchorOffsetY = 50;
        this.lockFishTraker.visible = false;
        this.lockFishTraker.touchEnabled = false;
    };
    //炮台数据
    FishGen.prototype.initInfo = function (playerInfo) {
        // alert("座位号："+this.name+"    玩家座位号："+playerInfo.SeatNo);
        this.playerInfo = null;
        this.playerInfo = playerInfo;
        //添加值 
        this.playername.text = playerInfo.nickname;
        this.setGoldNum(playerInfo.userMoney);
        this.moneybg.source = "0" + (playerInfo.SeatNo + 1); //添加每个座位的金币的bg图片
        this.visible = true;
        // 显示自己加减金币btn,和炮台效果
        if (playerInfo == FishGameController.getSelfPlayerInfo()) {
            this.addbtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onRightClick, this);
            this.downbtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onLeftClick, this);
            this.addbtn.visible = true;
            this.downbtn.visible = true;
            this.isSelfGen = true;
            if (FishGameController.getGameView()) {
                if (!FishGameController.getGameView().isShowSelfPlayerGenPosion) {
                    FishGameController.getGameView().showSelfPlayerGenPosion(this.x, this.y);
                }
                if (this.lockFishTraker) {
                    FishGameController.getGameView().setChildIndex(this.lockFishTraker, FishGameController.getGameView().numChildren - 1);
                }
            }
        }
        var gameSetting = FishGameController.getFishGameSetting();
        this.bulletOdssList = gameSetting.CannonLevelValue;
        this.CannonShowNumList = gameSetting.CannonShowNum;
        if (playerInfo.userId == "0") {
            this.isRobot = true;
            this.bulletOddsSelected = uiCore.Utils.getRandom(1, 4);
        }
        else {
            this.isRobot = false;
            if (this.bulletOddsSelected == null) {
                this.bulletOddsSelected = 1;
            }
        }
        if (this.goldPillarPool) {
            this.goldPillarPool.initGoldPillarPool();
        }
        else {
            this.goldPillarPool = new GoldPillarPool(this);
        }
        egret.Tween.get(this.lockFishView, { loop: true }).to({ factor: 360 }, 2000);
        egret.Tween.pauseTweens(this.lockFishView);
        egret.Tween.get(this.card, { loop: true }).to({ factor: 360 }, 2000);
        egret.Tween.pauseTweens(this.card);
        this.addEventListener(egret.Event.ENTER_FRAME, this.update, this);
        this.AIUpdateLastTime = 0;
        this.BulletUpdateLastTime = 0;
        this.fireTime = 0;
        this.isInited = true;
        this.setCannon(false);
    };
    FishGen.prototype.ResetInfo = function () {
        this.isInited = false;
        this.setLockFish(null);
        this.lockFish = null;
        this.visible = false;
        this.removeEventListener(egret.Event.ENTER_FRAME, this.update, this);
        this.addbtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onRightClick, this);
        this.downbtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onLeftClick, this);
        this.removeAllBullet();
        if (this.bulletPool) {
            this.bulletPool.Dispose();
        }
        if (this.goldPillarPool) {
            this.goldPillarPool.Dispose();
        }
        egret.Tween.removeTweens(this.lockFishView);
        egret.Tween.removeTweens(this.card);
        egret.Tween.removeTweens(this.fishGen);
    };
    FishGen.prototype.checkLockFishInScreen = function (fish) {
        return fish.x > 0 && fish.x < uiCore.Application.app.stage.stageWidth && fish.y > 0 && fish.y < uiCore.Application.app.stage.stageHeight;
    };
    FishGen.prototype.setBulletSelected = function (num) {
        this.bulletOddsSelected = num;
        this.onOddsChange();
    };
    FishGen.prototype.setCannon = function (bool) {
        this.isCannon = bool;
        this.card.visible = bool;
        if (bool) {
            egret.Tween.resumeTweens(this.card);
        }
        else {
            egret.Tween.pauseTweens(this.card);
        }
        this.onOddsChange();
    };
    //赔率变动
    FishGen.prototype.onOddsChange = function () {
        // 数值和炮台图片
        var bulletOdds = this.getBulletOdds();
        if (LibCore.GameConfig.IsPayExchange && SceneManager.exchangeValue) {
            bulletOdds = (bulletOdds / SceneManager.exchangeValue).toFixed(2);
        }
        this.oddsMoney.text = bulletOdds;
        this.fishGen.source = this.getGunSpritePic();
    };
    FishGen.prototype.CreateCoinColumn = function (money, fishId) {
        this.goldPillarPool.getGoldPillarObject().init(money, fishId, this.fishSeat.x - 90, (this.fishSeat.x - 90) - this.goldPillarPool.getGoldPillarCount() * 27);
    };
    FishGen.prototype.getBulletOdds = function () {
        return this.bulletOdssList[this.bulletOddsSelected - 1];
    };
    FishGen.prototype.getGunSpritePic = function () {
        var pic = "gun1";
        if (this.isCannon) {
            pic = "gun2";
        }
        var gunNum = this.CannonShowNumList[this.bulletOddsSelected - 1] - 1;
        if (gunNum > 3) {
            gunNum = 3;
        }
        if (gunNum > 0) {
            pic = pic + "_" + gunNum;
        }
        return pic;
    };
    FishGen.prototype.setAware = function (bl) {
        this.isAware = bl;
        this.clearLock();
    };
    FishGen.prototype.setFireRate = function (rate) {
        this.fireRate = rate / 2000;
    };
    FishGen.prototype.update = function () {
        // if(this.allBullets&&this.allBullets.length>100){
        //     console.log("allBullets:"+this.allBullets.length);
        // }
        // if(this.bulletPool&&this.bulletPool.objList&&this.bulletPool.objList.length>100){
        //     console.log("objList:"+this.bulletPool.objList.length);
        // }
        if (this.isAware || !this.isInited) {
            return;
        }
        // let startTime:number=egret.getTimer();
        if (this.isRobot && !this.isSelfGen) {
            this.fireTime = this.fireTime + FishGameManager.deltaTime / 3500;
            if (this.fireTime > this.fireRate) {
                this.fire();
                this.fireTime = 0;
            }
            this.AIUpdateLastTime++;
            if (this.AIUpdateLastTime > 50) {
                this.findFishToBind();
            }
            this.BulletUpdateLastTime = this.BulletUpdateLastTime + FishGameManager.deltaTime / 2000;
            if (this.BulletUpdateLastTime > 10) {
                this.updateBulletOdds();
            }
        }
        this.SetAutoLockFish();
        this.UpdateGenRotation();
        if (this.lockFish) {
            this.lockFishTraker.x = this.lockFish.x;
            this.lockFishTraker.y = this.lockFish.y;
        }
        // var diffTime:number=egret.getTimer()-startTime;
        // if(diffTime>10){
        // 	console.log("FishGen:"+this.SeatNo+":"+diffTime);
        // }
    };
    //发炮
    FishGen.prototype.fire = function () {
        if (!FishGameController.getGameView()) {
            return;
        }
        if (this.bulletPool.activeNum() >= FishGameController.getFishGameSetting().MaxBulletCount) {
            return;
        }
        if (FishGameController.getGameView().isPlayWave()) {
            return;
        }
        if (!FishGameController.isOnLine()) {
            return;
        } //算法服断开或重连状态则不能开炮
        this.BulletOdds = this.getBulletOdds();
        // console.log("发送倍率："+(this.bulletOddsSelected-1)+"    座位号："+this.SeatNo);
        if (this.isSelfGen) {
            var Gold_num = GameData.getInstance().userData("gold_num");
            if (Number(Gold_num) >= this.BulletOdds) {
                GameData.getInstance().setUserData("gold_num", (Gold_num - this.BulletOdds)); //自己先减去玩家的金币        
                var bulletContract = new Bullet_Contract();
                bulletContract.SeatNo = this.playerInfo.SeatNo;
                bulletContract.BulletId = this.getTagIndex();
                bulletContract.BulletNum = this.bulletOddsSelected - 1;
                bulletContract.PlayerMoney = GameData.getInstance().userData("gold_num"); //自己的金币（好像服务器没有使用
                bulletContract.LocalRotation = { x: 0, y: 0, z: this.fishGen.rotation < 0 ? this.fishGen.rotation + 360 : this.fishGen.rotation };
                FishGameController.sendCreateBullet(bulletContract, true); //发送数据
                this.createBullet(bulletContract, false, this.BulletOdds);
            }
            // Gold_num = GameData.getInstance().userData("gold_num");
            // if(Gold_num<this.BulletOdds){
            //     egret.setTimeout(function(){
            //         Net.GameService.send(HallSocketType.UserInfo,{AccountName:GameData.getInstance().userData("username")},0);
            //     }, this, 100);
            // }
        }
        else if (this.isRobot) {
            var robotNum = Number(this.money.text);
            if (LibCore.GameConfig.IsPayExchange && SceneManager.exchangeValue) {
                robotNum = Math.round(robotNum * SceneManager.exchangeValue);
            }
            if (robotNum >= this.BulletOdds) {
                var bulletContract = new Bullet_Contract();
                bulletContract.SeatNo = this.playerInfo.SeatNo;
                bulletContract.BulletId = this.getTagIndex();
                bulletContract.BulletNum = this.bulletOddsSelected - 1;
                // console.log("发送："+bulletContract.BulletNum);
                bulletContract.PlayerMoney = robotNum - this.BulletOdds;
                var bendijiaodu = 0;
                if (uiCore.Utils.getRandom(1, 100) < 7) {
                    bendijiaodu = uiCore.Utils.getRandom(-95, 95);
                    bendijiaodu = bendijiaodu < 0 ? bendijiaodu + 360 : bendijiaodu;
                }
                bulletContract.LocalRotation = { x: 0, y: 0, z: bendijiaodu };
                FishGameController.sendCreateBullet(bulletContract, false);
            }
            else {
                if (this.bulletOddsSelected > 1) {
                    this.onLeftClick(); //机械人金币不足时自动调低倍数
                    this.fire();
                }
            }
        }
    };
    FishGen.prototype.findFishToBind = function () {
        var fishTypeCount = 0;
        var gameId = uiCore.Application.currGameId; //获取游戏id
        if (gameId == uiCore.Application.currGameId) {
            fishTypeCount = 22;
        }
        else {
            fishTypeCount = 27;
        }
        var fish = FishGameController.getGameView().ContainFishTypeInScreen(uiCore.Utils.getRandom(10, fishTypeCount));
        if (fish != null) {
            if (uiCore.Utils.getRandom(1, 100) < 8) {
                if (this.lockFish == null) {
                    if (this.checkLockFishInScreen(fish)) {
                        // this.setLockFish(fish);
                        this.SendLockFishData(fish);
                    }
                }
            }
            this.AIUpdateLastTime = 0;
        }
    };
    FishGen.prototype.updateBulletOdds = function () {
        // console.log("===================================改变："+this.bulletOddsSelected+"=======================================");
        if (uiCore.Utils.getRandom(1, 100) < 20) {
            this.bulletOddsSelected = uiCore.Utils.getRandom(1, 4);
            // this.setBulletSelected(uiCore.Utils.getRandom(1,4))
        }
        this.BulletUpdateLastTime = 0;
    };
    FishGen.prototype.SetAutoLockFish = function () {
        if (this.wantToLockFish == true && this.wantToGetAutofile == true && this.lockFish == null) {
            var allFishes = FishGameController.getGameView().getAllFishes();
            var ActFish = [];
            for (var key in allFishes) {
                if (allFishes[key].fishInfo.Odds >= 10 || allFishes[key].fishInfo.FishId > 9) {
                    ActFish.push(allFishes[key]);
                }
            }
            if (ActFish.length > 0) {
                var fishs = ActFish[uiCore.Utils.getRandom(0, ActFish.length - 1)];
                if (fishs && fishs.isRunning && this.lockFish == null && this.checkLockFishInScreen(fishs)) {
                    this.setLockFish(fishs);
                }
            }
            else if (this.lockFish) {
                this.setLockFish(null);
            }
        }
    };
    FishGen.prototype.UpdateGenRotation = function () {
        if (this.lockFish) {
            this.targetPos.x = this.lockFish.x;
            this.targetPos.y = this.lockFish.y;
            if (!this.checkLockFishInScreen(this.lockFish) || !this.lockFish.isRunning) {
                this.setLockFish(null);
            }
        }
        else {
            if (this.isSelfGen) {
                if (this.wantToLockFish == true && this.wantToGetAutofile == true) {
                    this.fishGen.rotation = 0;
                    return;
                }
                this.targetPos = FishGameController.getGameView().mousePositionToViewPort(); // mouse.MouseEvent.MOUSE_MOVE //document.oncontextmenu  //鼠屏幕坐标，手指触摸屏幕也为屏幕坐标，触摸屏幕坐标。
            }
            else {
                return;
            }
        }
        if (this.targetPos.y > 0 && this.targetPos.x > 0 && this.targetPos.x < uiCore.Application.app.stage.stageWidth && this.targetPos.y < uiCore.Application.app.stage.stageHeight) {
            this.localToGlobal(this.fishSeat.x, this.fishSeat.y, this.genPoint);
            this.fx.x = this.genPoint.x - this.targetPos.x;
            this.fx.y = this.genPoint.y - this.targetPos.y;
            var rate = (Math.atan2(this.fx.y, this.fx.x) * (180 / Math.PI));
            if (this.fx.x >= 0 && this.fx.y >= 0) {
                rate = rate - 90;
            }
            else if (this.fx.x <= 0 && this.fx.y >= 0) {
                rate = rate - 90;
            }
            else if (this.fx.x <= 0 && this.fx.y <= 0) {
                rate = 270 + rate;
            }
            else {
                rate = rate - 90;
            }
            if (this.SeatNo > 2) {
                this.fishGen.rotation = rate + 180;
            }
            else {
                if (rate >= -95 && rate <= 95) {
                    this.fishGen.rotation = rate;
                }
            }
        }
    };
    //服务器下发发泡后的数据
    FishGen.prototype.createBullet = function (bulletContract, socketConnected, GenBulletOdds) {
        if (socketConnected === void 0) { socketConnected = true; }
        if (GenBulletOdds === void 0) { GenBulletOdds = 0; }
        if (!this.isInited) {
            return;
        }
        if (this.isSelfGen && socketConnected) {
            return;
        }
        this.initCoinColumnAnimation();
        var ResultPoint = uiCore.CircleUtils.getCirclePoint(this.currGenPoint, 10, this.fishGen.rotation + 90);
        egret.Tween.get(this.fishGen).to({ x: ResultPoint.x, y: ResultPoint.y }, 50).to({ x: 40, y: 40 }, 50);
        // .call(function(){
        //     egret.Tween.removeTweens(this.fishGen);
        // },this);
        if (this.LfireLight.getParticleSystem && this.RfireLight.getParticleSystem && this.LlittleLight.getParticleSystem && this.RlittleLight.getParticleSystem) {
            // this.LfireLight.getParticleSystem.stop(true);
            // this.RfireLight.getParticleSystem.stop(true);
            // this.LlittleLight.getParticleSystem.stop(true);
            // this.RlittleLight.getParticleSystem.stop(true);
            this.LfireLight.getParticleSystem.start(100);
            this.RfireLight.getParticleSystem.start(100);
            this.LlittleLight.getParticleSystem.start(100);
            this.RlittleLight.getParticleSystem.start(100);
        }
        // console.log("bulletOddsSelected:"+this.bulletOddsSelected+"    BulletNum:"+bulletContract.BulletNum);
        if (bulletContract.BulletNum != undefined && bulletContract.BulletNum != null && this.bulletOddsSelected != bulletContract.BulletNum + 1) {
            this.setBulletSelected(bulletContract.BulletNum + 1);
        }
        if (this.isSelfGen) {
            FishGameController.playGenAudio(this.isCannon);
        }
        else if (this.lockFish == null && bulletContract.LocalRotation) {
            this.fishGen.rotation = bulletContract.LocalRotation.z;
        }
        this.setGoldNum(bulletContract.PlayerMoney);
        var bullet = this.bulletPool.GetObject();
        if (!bullet.gameObject.parent) {
            FishGameController.getGameView().bulletGroup.addChild(bullet.gameObject);
        }
        else if (!bullet.gameObject.hasEventListener(egret.Event.ENTER_FRAME)) {
            bullet.gameObject.addEventListener(egret.Event.ENTER_FRAME, bullet.Update, bullet);
        }
        //设置位置
        //设置父节点
        bullet.setDirection(this.fishGen.rotation);
        bullet.setLockFish(this.lockFish);
        if (this.isRobot) {
            GenBulletOdds = this.BulletOdds;
        }
        bullet.initInfo(bulletContract, this.CannonShowNumList[this.bulletOddsSelected - 1], this.isCannon, GenBulletOdds, this.SeatNo, this);
        this.allBullets.push(bullet);
    };
    FishGen.prototype.getTagIndex = function () {
        this.tagIndex = this.tagIndex + 1;
        if (this.tagIndex > 2147483647) {
            this.tagIndex = 0;
        }
        return this.tagIndex;
    };
    FishGen.prototype.setLockFish = function (fish) {
        //点击已锁定的鱼，则开火
        if (fish && this.lockFish && this.lockFish == fish) {
            return;
        }
        //不在想要锁定鱼的情况下，点击鱼，则开火
        if (fish && !this.wantToLockFish && this.isSelfGen == true) {
            return;
        }
        //锁定鱼或更换锁定鱼
        this.lockFish = fish;
        if (fish) {
            this.lockTag = fish.FishTag;
        }
        else {
            this.lockTag = 0;
            this.bulletPool.setLockFish();
            if (this.lockFishViewContent) {
                //删除缩略图 
                this.lockFishView.removeChild(this.lockFishViewContent);
                this.lockFishViewContent = null;
            }
        }
        if (this.lockFish) {
            //打开显示标识
            this.lockFishTraker.visible = true;
            this.lockFishView.visible = true;
            egret.Tween.resumeTweens(this.lockFishView);
            //显示或取消鍞定鱼的追踪标识	 
            this.lockFishTraker.x = fish.x;
            this.lockFishTraker.y = fish.y;
            //显示或取消鍞定鱼的缩略图
            if (this.lockFishViewContent) {
                //删除缩略图 
                this.lockFishView.removeChild(this.lockFishViewContent);
                this.lockFishViewContent = null;
            }
            if (FishGameController.getGameView()) {
                this.lockFishViewContent = FishGameController.getGameView().fishBorn(fish.FishId, false);
                if (this.lockFishViewContent) {
                    this.lockFishView.addChild(this.lockFishViewContent);
                    this.lockFishViewContent.FishId = fish.FishId;
                    //锁定鱼 鱼图片调整位置
                    FishGameController.getGameView().allFishes.setFishAnchorOff(this.lockFishViewContent);
                    if (fish.fishSet.type == 4 && fish.fishInfo.GroupFishId > 0) {
                        var mc = uiCore.MovieClipManager.getGenerateMovieClipData(fish.fishInfo.GroupFishId[0] + "");
                        if (mc) {
                            this.lockFishViewContent.addChild(mc);
                            FishGameController.getGameView().setMcAnchorOff(mc, fish.fishInfo.GroupFishId[0]);
                            fish.globalToLocal(fish.x, fish.y, this.fishPoint);
                            mc.x = this.fishPoint.x;
                            mc.y = this.fishPoint.y;
                        }
                    }
                    var scale = Math.min(this.lockFishView.width / this.lockFishViewContent.getChildAt(0).width * 0.9, this.lockFishView.height / this.lockFishViewContent.getChildAt(0).height * 0.9);
                    if (scale > 0.6) {
                        scale = 0.5;
                    }
                    this.lockFishViewContent.scaleX = scale;
                    this.lockFishViewContent.scaleY = scale;
                    if (fish.FishId == 22 || fish.FishId == 21 || fish.FishId == 24 || fish.FishId == 25) {
                        this.lockFishViewContent.rotation = 0;
                    }
                    else {
                        this.lockFishViewContent.rotation = -90;
                    }
                    this.lockFishViewContent.x = this.lockFishView.width / 2;
                    this.lockFishViewContent.y = this.lockFishView.height / 2;
                    this.lockFishViewContent.playOrStopMC(true);
                }
            }
        }
        else {
            //关闭显示标识
            //取消鍞定鱼的缩略图
            this.lockFishTraker.visible = false;
            this.lockFishView.visible = false;
            egret.Tween.pauseTweens(this.lockFishView);
        }
        this.SendLockFishData(fish);
    };
    FishGen.prototype.SendLockFishData = function (fish) {
        //如果是自已，则向服务器发送鍞定或取消鱼的消息
        if (this.isSelfGen || this.isRobot && fish) {
            var lockFishData = new lock_FishData();
            if (fish != null) {
                lockFishData.FishId = fish.fishInfo.FishId;
                lockFishData.FishTag = fish.fishInfo.FishTag;
            }
            else {
                lockFishData.FishTag = 0;
                lockFishData.FishId = 0;
            }
            lockFishData.SeatNo = this.playerInfo.SeatNo;
            if (lockFishData.FishId > 9) {
                FishGameController.sendLockFish(lockFishData);
            }
        }
    };
    //锁定的鱼死了
    FishGen.prototype.LockFishDead = function (fishTag) {
        if (this.isInited == false) {
            if (fishTag == this.lockTag) {
                this.bulletPool.setLockFish();
                return;
            }
        }
        // let tempfishTag: number = 0;
        // if (this.lockFish) {
        //     if (this.lockFish.fishInfo == null) {
        //         console.log(this.lockFish);
        //     }
        //     tempfishTag = this.lockFish.fishInfo.FishTag;
        // } 
        if (fishTag == this.lockTag) {
            this.setLockFish(null);
        }
        // if (this.wantToGetAutofile == true) {
        //     if (fishTag == tempfishTag) {
        //         this.setLockFish(null);
        //     }
        // }  
    };
    FishGen.prototype.setRobot = function (bool) {
        this.isRobot = true;
    };
    //获取倍率后做判断 	
    FishGen.prototype.SetGenHitFish = function (Odds) {
        // let t3 = Math.round(99/uiCore.Utils.getRandom(1,99))  
        // if (Odds>50&&Odds<100){
        //     if (t3==3){
        //         this.setBulletSelected(4);
        //     }    	   
        // }else if(Odds>300){           
        //     if (t3==3){
        //         this.setBulletSelected(1);
        //     }    	 
        // }
    };
    // end
    FishGen.prototype.onLeftClick = function () {
        this.bulletOddsSelected = this.bulletOddsSelected - 1;
        if (this.bulletOddsSelected < 1) {
            this.bulletOddsSelected = this.bulletOdssList.length;
        }
        this.onOddsChange();
        if (!FishGameController.getGameView().IsAutoFire) {
            FishGameController.getGameView().fireTimer.stop();
        }
    };
    FishGen.prototype.onRightClick = function () {
        this.bulletOddsSelected = this.bulletOddsSelected + 1;
        if (this.bulletOddsSelected > this.bulletOdssList.length) {
            this.bulletOddsSelected = 1;
        }
        this.onOddsChange();
        if (!FishGameController.getGameView().IsAutoFire) {
            FishGameController.getGameView().fireTimer.stop();
        }
    };
    //设置想要锁定鱼或取消当前已锁定鱼
    FishGen.prototype.setWantToLockFish = function (bool) {
        if (this.isSelfGen) {
            this.wantToLockFish = bool;
            if (!bool) {
                this.RemoveLockFish();
            }
        }
    };
    //清除所有的锁定的鱼
    FishGen.prototype.RemoveLockFish = function () {
        this.setLockFish(null);
    };
    //获取自动的状态 
    FishGen.prototype.GetAutoFile = function (bool) {
        this.wantToGetAutofile = bool;
    };
    FishGen.prototype.clearLock = function () {
        this.RemoveLockFish();
    };
    //改变的钱数
    FishGen.prototype.setGoldNum = function (num) {
        if (num <= 0) {
            this.money.text = "0";
        }
        else {
            if (LibCore.GameConfig.IsPayExchange && SceneManager.exchangeValue) {
                num = (num / SceneManager.exchangeValue).toFixed(2);
            }
            this.money.text = num;
        }
    };
    FishGen.prototype.getallBullet = function () {
        if (this.allBullets.length > 0) {
            var result = new Array();
            for (var key in this.allBullets) {
                result.push(this.allBullets[key]);
            }
            return result;
        }
    };
    //删除当前子弹
    FishGen.prototype.removeBullet = function (bullet) {
        for (var i = 0; i < this.allBullets.length; i++) {
            if (this.allBullets[i].BulletId == bullet.BulletId) {
                this.allBullets.splice(i, 1);
            }
        }
        this.creatFishNet(bullet);
        bullet.returnObjectPool();
    };
    FishGen.prototype.removeBulletNotNet = function (bullet) {
        for (var i = 0; i < this.allBullets.length; i++) {
            if (this.allBullets[i].BulletId == bullet.BulletId) {
                this.allBullets.splice(i, 1);
            }
        }
        bullet.returnObjectPool();
    };
    //删除所有子弹
    FishGen.prototype.removeAllBullet = function () {
        if (this.allBullets.length > 0) {
            for (var key in this.allBullets) {
                this.allBullets[key].returnObjectPool();
            }
            this.allBullets = [];
        }
    };
    FishGen.prototype.creatFishNet = function (bullet) {
        if (!this.isInited) {
            return;
        }
        // if (this.isSelfGen){
        //     let name = "net1";
        //     if (bullet.isCannon){
        //         name = "net2"
        //     }  
        //     //播放音乐
        //     //SoundManager.PlayNetAudio(name)
        // }
        FishnetPool.getFishnetObject().Init(bullet);
    };
    FishGen.prototype.Dispose = function () {
        this.isInited = false;
        this.lockFish = null;
        if (this.lockFishView) {
            egret.Tween.removeTweens(this.lockFishView);
        }
        if (this.card) {
            egret.Tween.removeTweens(this.card);
        }
        if (this.lockFishTraker) {
            //关掉 
            FishGameController.getGameView().removeChild(this.lockFishTraker);
        }
        this.removeAllBullet();
        this.removeEventListener(egret.Event.ENTER_FRAME, this.update, this);
        this.addbtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onRightClick, this);
        this.downbtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onLeftClick, this);
        this.bulletPool.Dispose();
        if (this.goldPillarPool) {
            this.goldPillarPool.Dispose();
        }
        if (this.fishGen) {
            egret.Tween.removeTweens(this.fishGen);
        }
    };
    return FishGen;
}(eui.Component));
__reflect(FishGen.prototype, "FishGen");
var Player_Info = (function () {
    function Player_Info() {
    }
    return Player_Info;
}());
__reflect(Player_Info.prototype, "Player_Info");
var Bullet_Contract = (function () {
    function Bullet_Contract() {
    }
    return Bullet_Contract;
}());
__reflect(Bullet_Contract.prototype, "Bullet_Contract");
var lock_FishData = (function () {
    function lock_FishData() {
    }
    return lock_FishData;
}());
__reflect(lock_FishData.prototype, "lock_FishData");
//# sourceMappingURL=FishGen.js.map