namespace uiCore {
    export class H5Vector3 { 
        public static x:number;
        public static y:number;
        public static z:number;
        public constructor() {

		}
        public static New(x:number,y:number,z:number):H5Vector3{
            let v:any = {x:x || 0, y: y || 0, z: z || 0};
	        return v;
        }
        public static Clone():H5Vector3{
            return this.New(this.x, this.y, this.z);
        }
        public static MulQuat(quat):H5Vector3{
            let num:number 	= quat.x * 2;
            let num2:number = quat.y * 2;
            let num3:number = quat.z * 2;
            let num4:number = quat.x * num;
            let num5:number = quat.y * num2;
            let num6:number = quat.z * num3;
            let num7:number = quat.x * num2;
            let num8:number = quat.x * num3;
            let num9:number = quat.y * num3;
            let num10:number = quat.w * num;
            let num11:number = quat.w * num2;
            let num12:number = quat.w * num3;
            
            let x:number = (((1 - (num5 + num6)) * this.x) + ((num7 - num12) * this.y)) + ((num8 + num11) * this.z);
            let y:number = (((num7 + num12) * this.x) + ((1 - (num4 + num6)) * this.y)) + ((num9 - num10) * this.z);
            let z:number = (((num8 - num11) * this.x) + ((num9 + num10) * this.y)) + ((1 - (num4 + num5)) * this.z);
            
           return this;
        }
        public static SqrMagnitude():number{
            return this.x * this.x + this.y * this.y + this.z * this.z;
        }
        public static div(va, d):H5Vector3{
            return this.New(va.x / d, va.y / d, va.z / d);
        }
        public static mul(va, d):H5Vector3{
            if (typeof (d) == "number"){
                return this.New(va.x * d, va.y * d, va.z * d);
            }else{
                let vec:any = va.Clone();
                vec.MulQuat(d);
                return vec
            } 
        }
        public static add(va, vb):H5Vector3{
            return this.New(va.x + vb.x, va.y + vb.y, va.z + vb.z);
        }
        public static sub(va, vb):H5Vector3{
            return this.New(va.x - vb.x, va.y - vb.y, va.z - vb.z);
        }
        public static unm(va):H5Vector3{
            return this.New(-va.x, -va.y, -va.z);
        }
        public static eq(a,b):boolean{
            let v:any = a - b;
            let delta:number = v.SqrMagnitude();
            return delta < 1e-10;
        }
    }
}