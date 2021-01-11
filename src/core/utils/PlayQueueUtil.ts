namespace core
{
    export class PlayQueueUtil<T>
    {
        private queue:T[];

        private playCount:number;
        private maxQueue:number;

        private playFn:(data:T)=>void;
        private playThis:any;

        constructor(playFn:(data:T)=>void, playThis:any, maxQueue:number = 1)
        {
            this.maxQueue = maxQueue;
            this.queue = [];

            this.playCount = 0;

            this.playFn = playFn;
            this.playThis = playThis;
        }

        public remove(data:T):void
        {
            let index:number = this.queue.indexOf(data);
            if (index != -1)
            {
                this.queue.splice(index, 1);

                this.checkState();
            }
        }

        public push(data:T):void
        {
            this.queue.push(data);

            this.checkState();
        }

        private checkState():void
        {
            if (this.playCount < this.maxQueue && this.queue.length > 0)
            {
                this.play();
            }
        }

        public over():void
        {
            this.playCount --;

            this.checkState();
        }

        private play():void
        {
            this.playCount++;

            let data:T = this.queue.shift();

            this.playFn.call(this.playThis, data);
        }

        public get isEmpty():boolean
        {
            return this.queue.length == 0;
        }

        public clear():void
        {
            this.queue.length = 0;
            this.playCount = 0;
        }
    }
}