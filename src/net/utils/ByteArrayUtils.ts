namespace Net
{
	export class ByteArrayUtils
	{
		/**
		 * 判断两个字节流内容是否相同
		 * @param bytes1	字节流1
		 * @param bytes2	字节流2
		 * @return			是否相同
		 */		
		public static isEqual( bytes1:egret.ByteArray, bytes2:egret.ByteArray ):boolean
		{
			var len:number = bytes1.length;
			if (len != bytes2.length) return false;
			var bytes1_arr:Uint8Array = ByteArrayUtils.getBytes( bytes1 );
			var bytes2_arr:Uint8Array = ByteArrayUtils.getBytes( bytes2 );
			for (var i:number = 0; i < len; i++)
			{
				if (bytes1_arr[i] != bytes2_arr[i]) return false;
			}
			return true;
		}
		
		/**
		 * 连接两个字节流
		 * @param bytes1	字节流1
		 * @param bytes		字节流2
		 * @param createNew	是否创建新字节流（取字节流1的类型，否则将把字节流2连接到字节流1的最后）
		 * @return			连接后的字节流（将定位到字节流最后）
		 */
		public static concat( bytes1:egret.ByteArray, bytes2:egret.ByteArray, createNew:boolean=false ):egret.ByteArray
		{
			var bytes:egret.ByteArray = createNew ? new (bytes1.constructor as any) : bytes1;
			var len:number = bytes.length;
			bytes.position = len;
			bytes.writeBytes(bytes2);
			return bytes;
		}

		/**
		 * 将给定字节流（或一部分）转为16进制字符串
		 * @param bytes		给定字节流
		 * @param sep		每个16进制数之间的分隔符
		 * @param cursor	当前位置光标的指示符
		 * @param offset	要转换部分的起始偏移量（若&lt;0，则从末尾往前数，若超出字节流长度，则取末尾）
		 * @param length	要转换部分的长度（若为0或超出字节流offset后的长度，则取末尾）
		 */		
		public static toHex( bytes:egret.ByteArray, sep:string=" ", cursor:string="", offset:number=0, length:number=0 ):string
		{
			offset = offset < 0 ? Math.max(0, bytes.length + offset) : Math.min(offset, bytes.length);
			length = Math.min(bytes.length - offset, length || 0x7fffffff);
			if (length > 0)
			{
				var hex_arr:string[] = [];
				var bytes_arr:Uint8Array = new Uint8Array(bytes.buffer);
				for (var i:number = 0; i < length; i++)
				{
					var hex:string = bytes_arr[i + offset].toString(16);
					hex_arr[i] = (cursor && i + offset == bytes.position ? cursor : "") + (hex.length == 1 ? "0" + hex : hex);
				}
				return hex_arr.join(sep);
			}
			return "";
		}

		///////////////////////////////////////////////////
		// SB新老版本不兼容的问题
		///////////////////////////////////////////////////////////////
		public static readAvailable(bytes:egret.ByteArray):number
		{
			return bytes.length - bytes.position
			
		}

		public static getBytes(bytes:egret.ByteArray):Uint8Array
		{
			// 新的版本用bytes代替只读
			if ( bytes['bytes'] )
			{
				return bytes["bytes"]
			}

			return new Uint8Array( bytes.buffer);
		}
	}
}