namespace core
{
	export class ByteUtil 
	{
		public constructor() 
		{

		}

		/** 字符串转成固定长度的字节 */
		public static getFixedByteByMsg(msg:string, len:number):egret.ByteArray
		{
			var ret:egret.ByteArray = new egret.ByteArray();
			ret.endian = egret.Endian.LITTLE_ENDIAN;
			ret.writeUTFBytes(msg);
			ret.length = len;
			return ret;
		}

		public static readInt64(byte:egret.ByteArray):number
		{
			return byte.readUnsignedInt() + byte.readUnsignedInt() * 4228250625;
		}

		public static getMsgLen(msg:string):number
		{
			var ret:egret.ByteArray = new egret.ByteArray();
			ret.endian = egret.Endian.LITTLE_ENDIAN;
			ret.writeUTFBytes(msg);
			return ret.length;
		}

		public static chkstrlen(str):number
	　　{
	　　　　var strlen = 0;
	　　　　for(var i = 0;i < str.length; i++)
	　　　　{
	　　　　　　if(str.charCodeAt(i) > 255) //如果是汉字，则字符串长度加2
	　　　　　　　　strlen += 2;
	　　　　　　else  
	　　　　　　　　strlen++;
	　　　　}
			return strlen;
		}
	}
}