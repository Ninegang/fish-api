namespace core
{
	/**
	 * Created by Administrator on 2018/1/1 0001.
	 */
	export class ColorUtils
	{
		/**置灰*/
		public static grayObj(obj: egret.DisplayObject, gray: boolean = true)
		{
			if ("enabled" in obj)
			{
				obj["enabled"] = !gray;
			}
			obj.filters = gray ? [core.FilterUtil.greyFilter] : null;
		}

		public static spliceColor(color:number):any{
			let result = {r: -1, g: -1, b: -1};
			result.b = color % 256;
			result.g = Math.floor((color / 256)) % 256;
			result.r = Math.floor((color / 256) / 256);
			return result;
		}
		//16进制颜色滤镜
		public static getColorMatrixFilter(color:number):egret.ColorMatrixFilter{
			var colorMatrix = [
				1,0,0,0,0,
				0,1,0,0,0,
				0,0,1,0,0,
				0,0,0,1,0
			];
			let result = this.spliceColor(color);
			colorMatrix[0] = result.r / 255;
			colorMatrix[6] = result.g / 255;
			colorMatrix[12] = result.b / 255;
			return new egret.ColorMatrixFilter(colorMatrix);
		}


	}
}