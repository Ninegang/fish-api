namespace core 
{
    export class UILanaguageUtil 
    {
        public static convert(ui: egret.DisplayObject): void 
        {
            var nameL: string[] = ui.name.split('_');

            if (nameL[0] == 'l') 
            {
                var lang: string = nameL[1] + "语言包";

                if (ui instanceof eui.TextInput) 
                {
                    ui.prompt = lang;
                }
                else if (ui instanceof egret.TextField) 
                {
                    ui.text = lang;
                }
                else if (ui instanceof eui.Button) 
                {
                    ui.label = lang;
                }
                else if (ui instanceof eui.RadioButton) 
                {
                    ui.label = lang;
                }
                else if (ui instanceof eui.CheckBox)
                {
                    ui.label = lang;
                }
            }

            if (ui instanceof egret.DisplayObjectContainer) 
            {
                var uiCon: egret.DisplayObjectContainer = <egret.DisplayObjectContainer>ui;
                var len: number = uiCon.numChildren;

                var childUI: egret.DisplayObject;
                for (var i: number = 0; i < len; i++) 
                {
                    childUI = uiCon.getChildAt(i);

                    UILanaguageUtil.convert(childUI);
                }
            }
        }
    }
}