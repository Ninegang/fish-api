class FrameRateManager
{
    public static HIGH_RATE:number = 60;

    public static LOW_RATE:number = 30;

    private static gameRun:boolean = false;
    private static noticeRun:boolean = false;

    private static stage:egret.Stage;
    public static setup(stage:egret.Stage):void
    {
        FrameRateManager.stage = stage;

        FrameRateManager.resetAll();
    }

    public static setGameRun(val:boolean):void
    {
        FrameRateManager.gameRun = val;

        FrameRateManager.updateFrameRate();
    }

    public static setNoticeRun(val:boolean):void
    {
        FrameRateManager.noticeRun = val;

        FrameRateManager.updateFrameRate();
    }

    private static updateFrameRate():void
    {
        if (egret.Capabilities.isMobile)
        {
            if (FrameRateManager.gameRun || FrameRateManager.noticeRun)
            {
                FrameRateManager.stage.frameRate = FrameRateManager.HIGH_RATE;
            }
            else
            {
                FrameRateManager.stage.frameRate = FrameRateManager.LOW_RATE;
            }
        }
    }

    public static resetAll():void
    {
        FrameRateManager.gameRun = false;
        FrameRateManager.noticeRun = false;

        FrameRateManager.updateFrameRate();
    }
}