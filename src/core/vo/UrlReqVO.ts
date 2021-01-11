namespace core
{
    /** 
     * {url:string, urlLoader: egret.URLLoader, sucessFunc: Function, errorFunc: Function, thisObject: any, isJson: boolean }
     */
    export interface UrlReqVO
    {
        url:string;

        urlLoader:egret.URLLoader;

        sucessFunc:Function;

        errorFunc:Function;

        thisObject:any;

        isJson:boolean;
    }
}