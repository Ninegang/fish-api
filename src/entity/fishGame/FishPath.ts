class FishPath {
	private _elapsed: number = 0;
	private delay: number = 0;
	private _activated: boolean = false;
	private _points: Array<number>;
	private _forward: boolean = true;
	private _index: number = 0;
	private _hidden: boolean = false;
	private _ratio: number;
	private isActive: boolean;
	private _mat: Matrix32;
	private _freeGroup: boolean = false;
	private _inScreen: boolean = false;
	private offest: egret.Point;
	private _nextOffset: egret.Point;
	public fixedScreen: number;
	private _tween: FishStat_Tween;
	private lastIndex: number;
	private learp: number = 0;
	private fangxiang: egret.Point;//方向
	private fishangle: number;
	private fishangle_: number;
	anlengle: number;
	private pont_done: number = -1;
	public IsCanDown: boolean = true;
	public isStatic: boolean = false;
	public IsShake: boolean = false;
	private tweens: Array<fishDataTween>;
	public fish:Fish;
	private last_pos: egret.Point;
	private fishStatPoint: egret.Point;
	private fishStartInitPoint:egret.Point;

	public constructor(fish:Fish) {
		this.fish=fish;
		this._nextOffset = new egret.Point();
		this.offest = new egret.Point();
		this._tween = new FishStat_Tween();
		this.last_pos = new egret.Point();
		this.fishStatPoint = new egret.Point();
		this.fangxiang = new egret.Point();
		this.fishStartInitPoint = new egret.Point();
	}
	public setGroupPath(pathName: string, lifeTime: number = 0, roat: number = 0, speed: number = 0, UpSideDown: boolean = false): void {
		let fspd: any = FishGameManager.groupPathDic[pathName];
		if(fspd){
			this._points = fspd.paths.points;
			this._ratio = fspd.config.fps * speed / fspd.config.speed;
			this._elapsed = lifeTime;
			this.isActive = this._elapsed > 0;
			if (UpSideDown) {
				this._mat = new Matrix32(-fspd.paths.pos.x / 100, -fspd.paths.pos.y / 100, 0);
			}
			else {
				this._mat = new Matrix32(fspd.paths.pos.x / 100, fspd.paths.pos.y / 100, 0);
			}
			this._forward = true;
			this._mat.roated(roat);
			this.fishStat_init();
		}else{
			this.removeFish();
			if(FishGameController.getGameView()){
				FishGameController.getGameView().isInFishArray=false;
			}
		}
	}

	public setPath(pathName: string, lifeTime: number = 0, freeGroup: boolean = false, roat: number = 0, speed: number = 0): void {
		let fspd: any = FishGameManager.pathDic[pathName];
		if(fspd){
			this._points = fspd.paths;
			this._ratio = fspd.config.fps * speed / fspd.config.speed;
			this._elapsed = lifeTime;
			this.isActive = this._elapsed > 0;
			this._mat = new Matrix32(0, 0, 0);
			this._forward = true;
			this._freeGroup = freeGroup;
			this._inScreen = false;
			if (this._freeGroup) {
				this.offest.x=uiCore.Utils.getRandom(-40, 40);
				this.offest.y=uiCore.Utils.getRandom(-40, 40);
				this._nextOffset.x=uiCore.Utils.getRandom(-40, 40);
				this._nextOffset.y=uiCore.Utils.getRandom(-40, 40);
			}
			this._mat.roated(roat);
			this.fishStat_init();
		}else{
			this.removeFish();
			if(FishGameController.getGameView()){
				FishGameController.getGameView().isInFishArray=true;
			}
		}
	}

	private fishStat_init(): void {
		//设置初始位置 / 方向
		let posStat: egret.Point = this.fishStat_get_point_pos(0);
		this.fishStartInitPoint.x = posStat.x;
		this.fishStartInitPoint.y = posStat.y;
		this.fish.x = this.fishStartInitPoint.x;
		this.fish.y = this.fishStartInitPoint.y;
		// 朝向的点
		let faceto: egret.Point = this.fishStat_get_point_pos(1);
		this.lastIndex = 1;
		let rot: number = Math.atan2(this.fishStartInitPoint.y - faceto.y, this.fishStartInitPoint.x - faceto.x);
		let rot_anlengle = (rot * (180 / Math.PI));
		if (this.fishStartInitPoint.x - faceto.x >= 0 && this.fishStartInitPoint.y - faceto.y >= 0) {
			rot_anlengle = rot_anlengle - 180;
		} else if (this.fishStartInitPoint.x - faceto.x <= 0 && this.fishStartInitPoint.y - faceto.y >= 0) {
			rot_anlengle = rot_anlengle - 180;
		} else {
			rot_anlengle = 180 + rot_anlengle;
		}
		this.fish.rotation = rot_anlengle;
	}

	private fishStat_get_point_pos(p_index: number): egret.Point {
		return this._mat.xform(this.stat_get_point_pos(p_index));
	}

	private stat_get_point_pos(index: number): egret.Point {
		this.fishStatPoint.x=this._points[index * 2] * 0.01 * uiCore.Application.fishPathXmultiple;
		this.fishStatPoint.y=this._points[index * 2 + 1] * 0.01 * uiCore.Application.fishPathYmultiple;
		return this.fishStatPoint;
	}

	public addTween(fps_: number, frames_: number, weight_: number, eases_: string, trans_: string) {
		if (this.tweens == null) {
			this.tweens = new Array<fishDataTween>();
		}
		let Tween: any = { fps: fps_, frames: frames_, weight: weight_, eases: eases_, trans: trans_ };
		this.tweens.push(Tween);
	}

	public setTween() {
		if (this.tweens == null)
			return;
		this._tween.phases=[];
		let total_delta: number = 0;
		let total_weight: number = 0;
		let fps: number = this.tweens[0].fps;
		for (var i = 0; i < this.tweens.length; i++) {
			let info: fishDataTween = this.tweens[i];
			var delta = 1.0 * info.frames / fps;
			total_delta += delta;
			total_weight += info.weight;
			var tmp = new FishStat_Phase();
			tmp.delta = delta;
			tmp.weight = info.weight;
			tmp.trans = info.trans;
			tmp.eases = info.eases;
			this._tween.phases.push(tmp);
		}
		this._tween.delta = total_delta;
		this._tween.weight = total_weight;
		this.tweens = null;
	}

	public update(): void {
		// console.log("FishId:"+this.fish.FishId+"  X:"+this.fish.x+"    Y:"+this.fish.y+"    角度："+this.fish.rotation+"   比例："+this.fish.scaleX+" "+this.fish.scaleY);
		// if(this.tweens&&this.tweens.length>100){
		// 	console.log("tweens:"+this.tweens.length);
		// }
		// if(this._tween&&this._tween.phases&&this._tween.phases.length>100){
		// 	console.log("phases:"+this._tween.phases.length);
		// }
		if (this._points == null){
			return;
		}
		this.fishUpdate();
	}

	//更新鱼位置 鱼游动
	private fishUpdate(): void {
		if (this.fixedScreen > 0) {
			this.fixedScreen -= FishGameManager.deltaTime / 1000;
			return;
		}
		let index: number = this.fishStat_get_index();
		let isRotation: boolean = true;
		if (index > 1 && index == this.lastIndex) {
			isRotation = false;
		}
		this.lastIndex = index;
		if (index >= this._points.length / 2) {
			this.removeFish();
			return;
		}
		this.last_pos.x=this.fish.x;
		this.last_pos.y=this.fish.y;
		let pos:egret.Point = this.fishStat_get_point_pos(index);
		if (this._freeGroup) {
			pos.x += this.offest.x + (this._nextOffset.x - this.offest.x) * this.Lerp(0, 1, this.learp / 120);
			pos.y += this.offest.y + (this._nextOffset.y - this.offest.y) * this.Lerp(0, 1, this.learp / 120);
		}
		if (this.last_pos.equals(pos)) {
			return;
		}
		
		this.learp++;
		if (this._freeGroup && this.learp > 120) {
			this.offest.x = this._nextOffset.x;
			this.offest.y = this._nextOffset.y;
			this._nextOffset.x=uiCore.Utils.getRandom(-40, 40);
			this._nextOffset.y=uiCore.Utils.getRandom(-40, 40);
			this.learp = 0;
		}
		this.fish.x = pos.x;
		this.fish.y = pos.y;
		var inScreen = pos.x > 0 && pos.x < uiCore.Application.app.stage.stageWidth && pos.y > 0 && pos.y < uiCore.Application.app.stage.stageHeight;

		if (this.fish && this._inScreen != inScreen) {
			this.fish.onInScreen(inScreen);
			this._inScreen = inScreen;
		}
		//旋转
		if (isRotation) {
			this.fangxiang.x=this.last_pos.x-pos.x;
			this.fangxiang.y=this.last_pos.y-pos.y;
			this.getFishData();
		}
	}
	// <summary>
	// 获取方向和速度
	// </summary>
	private getFishData(learp: boolean = true): void {
		if (this.fangxiang.x != 0 || this.fangxiang.y != 0) {
			this.fishangle_ = Math.atan2(this.fangxiang.y, this.fangxiang.x);
			this.fishangle = (this.fishangle_ * (180 / Math.PI));
			if (this.fangxiang.x >= 0 && this.fangxiang.y >= 0) {
				this.fishangle = this.fishangle - 180;
			} else if (this.fangxiang.x <= 0 && this.fangxiang.y >= 0) {
				this.fishangle = this.fishangle - 180;
			} else {
				this.fishangle = 180 + this.fishangle;
			}
			let isUpFish: boolean;
			let fishRotation: number = this.fish.rotation;
			let duilidian: number = 180;
			let rotationDushu: number = 0;
			if (fishRotation > 0) {
				duilidian = fishRotation - 180;
				if (this.fishangle < fishRotation && this.fishangle > duilidian) {
					isUpFish = false;
					rotationDushu = fishRotation - this.fishangle;
				} else if (this.fishangle > fishRotation || this.fishangle < duilidian) {
					isUpFish = true;
					if (this.fishangle > 0) {
						rotationDushu = this.fishangle - fishRotation;
					} else {
						rotationDushu = 360 + this.fishangle - fishRotation;
					}
				}
			} else if (fishRotation < 0) {
				duilidian = 180 + fishRotation;
				if (this.fishangle > fishRotation && this.fishangle < duilidian) {
					isUpFish = true;
					rotationDushu = this.fishangle - fishRotation;
				} else if (this.fishangle < fishRotation || this.fishangle > duilidian) {
					isUpFish = false;
					if (this.fishangle > 0) {
						rotationDushu = 360 + fishRotation - this.fishangle;
					} else {
						rotationDushu = fishRotation - this.fishangle;
					}
				}
			} else if (this.fishangle > 0) {
				isUpFish = true;
				rotationDushu = this.fishangle - fishRotation;
			} else if (this.fishangle < 0) {
				isUpFish = false;
				rotationDushu = fishRotation - this.fishangle;
			}
			rotationDushu = rotationDushu / 60;
			if (isUpFish) {
				this.fishangle = fishRotation + rotationDushu;
			} else {
				this.fishangle = fishRotation - rotationDushu;
			}
			if (this.fishangle > 10 || this.fishangle < -10) {
				if (this.IsCanDown) {
					this.fish.scaleX = 1;
					this.fish.scaleY = -1;
				} else {
					this.fish.scaleX = 1;
					this.fish.scaleY = 1;
				}
			}			
			this.fish.rotation = this.fishangle;
		}
		 this.NotCanDown();
	}
	//判断宝箱之类的 不旋转
	public NotCanDown():void{
	    if (!this.IsCanDown){ 
	        // let angle_s:number = Math.atan2(this.fish.x,this.fish.y);
	        // let angle_es:number = (this.fishangle_ * (180 / Math.PI));
	        if (this.fish.rotation < 90 &&this.fish.rotation > -90 && !this.isStatic){
	            this.fish.scaleX =-1; 
				this.fish.scaleY = 1; 
	        }
	        else{
	          this.fish.scaleX = 1; 
			  this.fish.scaleY = 1;
			  //子节点
	        }
			this.fish.rotation = 0;    
	    }
	}
	private removeFish(): void {
		if (this.fish) {
			this.fish.recovery();
		}
	}

	private fishStat_get_index(): number {
		let index: number = this.stat_get_index();
		if (index == 0 || this._tween == null || this._tween.delta == 0) {
			return index;
		}
		let elapsed_time: number = this._elapsed - this.delay;
		let t: number = elapsed_time % this._tween.delta;
		let b: number = Math.floor(elapsed_time / this._tween.delta) * this._tween.delta;
		for (var i = 0; i < this._tween.phases.length; i++) {
			let phase = this._tween.phases[i];
			if (t > phase.delta) {
				t -= phase.delta;
				t += phase.delta;
				continue;
			}
			let d = phase.delta;
			let c = d;
			elapsed_time = uiCore.TweenManager.Call(phase.trans, phase.eases, t, b, c, d);
			break;
		}
		t = elapsed_time % this._tween.delta;
		for (var i = 0; i < this._tween.phases.length; i++) {
			let phase = this._tween.phases[i];
			if (t <= 0) break;
			let weight = phase.weight / this._tween.weight;
			let dweight = this._tween.delta * weight;
			let rate = dweight / phase.delta;
			if (t >= phase.delta) {
				elapsed_time += (phase.delta * (rate - 1));
			} else {
				elapsed_time += (t * (rate - 1));
			}
			t -= phase.delta;
		}
		return Math.floor(elapsed_time * this._ratio);
	}
	private stat_get_index(): number {
		this._elapsed += FishGameManager.deltaTime / 1000;
		return Math.max(Math.floor(this._elapsed * this._ratio), 0);
	}
	//计算插值
	public Clamp01(value: number): number {
		let result: number;
		if (value < 0) {
			result = 0;
		}
		else if (value > 1) {
			result = 1;
		}
		else {
			result = value;
		}
		return result;
	}
	public Lerp(a: number, b: number, t: number): number {
		return a + (b - a) * this.Clamp01(t);
	}
}

class Matrix32 {
	private elements: Array<Array<number>>;
	private tmp:egret.Point;
	public constructor(x: number = 0, y: number = 0, p_rot: number = 0) {
		this.elements = new Array<Array<number>>(3);
		this.tmp = new egret.Point();
		for (var i = 0; i < 3; i++) {
			this.elements[i] = [];
		}
		let cr: number = Math.cos(p_rot);
		let sr: number = Math.sin(p_rot);
		this.elements[0][0] = cr;
		this.elements[1][1] = cr;
		this.elements[0][1] = -sr;
		this.elements[1][0] = sr;
		this.elements[2][0] = x;
		this.elements[2][1] = y;
	}
	private tdotx(tx: number, ty: number): number {
		return this.elements[0][0] * tx + this.elements[1][0] * ty;
	}
	private tdoty(tx: number, ty: number): number {
		return this.elements[0][1] * tx + this.elements[1][1] * ty;
	}
	public roated(rot: number): void {
		let p_transform: Matrix32 = new Matrix32(uiCore.Application.app.stage.stageWidth / 2, uiCore.Application.app.stage.stageHeight / 2, rot);
		this.elements[2][0] += this.tdotx(p_transform.elements[2][0], p_transform.elements[2][1]);
		this.elements[2][1] += this.tdoty(p_transform.elements[2][0], p_transform.elements[2][1]);
		let x0 = this.tdotx(p_transform.elements[0][0], p_transform.elements[0][1]);
		let x1 = this.tdoty(p_transform.elements[0][0], p_transform.elements[0][1]);
		let y0 = this.tdotx(p_transform.elements[1][0], p_transform.elements[1][1]);
		let y1 = this.tdoty(p_transform.elements[1][0], p_transform.elements[1][1]);
		this.elements[0][0] = x0;
		this.elements[0][1] = x1;
		this.elements[1][0] = y0;
		this.elements[1][1] = y1;
	}
	public xform(pos: egret.Point): egret.Point {
		this.tmp.x = this.tdotx(pos.x, pos.y) + this.elements[2][0];
		// tmp.y=this.tdoty(pos.x,pos.y)+this.elements[2][1];
		this.tmp.y = this.elements[2][1] - this.tdoty(pos.x, pos.y);
		return this.tmp;
	}
}

class FishStat_Tween {
	public delta: number;
	public weight: number;
	public phases: Array<FishStat_Phase>;

	public constructor() {
		this.phases = new Array<FishStat_Phase>();
	}
}

class FishStat_Phase {
	public delta: number;
	public weight: number;
	public trans: string;
	public eases: string;
}
class fishDataTween {
	public id: number;
	public name: string;
	public fps: number;
	public frames: number;
	public weight: number;
	public trans: string;
	public eases: string;
}