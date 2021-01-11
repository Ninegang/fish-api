module Net
{
	export class ByteArrayLittle extends egret.ByteArray
	{
		constructor()
		{
			super();
			this.endian = egret.Endian.LITTLE_ENDIAN;
		}
		
		public toString():string
		{
			return "<ByteArrayLittle len=" + this.length + ",pos=" + this.position + ">";
		}
	}
}