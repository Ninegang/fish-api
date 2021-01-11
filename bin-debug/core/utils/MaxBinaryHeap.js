var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var core;
(function (core) {
    /** 最大二叉堆 */
    var MaxBinaryHeap = (function () {
        function MaxBinaryHeap() {
            this._heapVec = [];
        }
        Object.defineProperty(MaxBinaryHeap.prototype, "length", {
            get: function () {
                return this._heapVec.length;
            },
            enumerable: true,
            configurable: true
        });
        MaxBinaryHeap.prototype.clear = function () {
            this._heapVec.length = 0;
        };
        Object.defineProperty(MaxBinaryHeap.prototype, "minVal", {
            get: function () {
                return this._heapVec[0].f;
            },
            enumerable: true,
            configurable: true
        });
        MaxBinaryHeap.prototype.push = function (val) {
            var heapVec = this._heapVec;
            heapVec.push(val);
            var curIdx = heapVec.length - 1;
            var parentIdx = (curIdx - 1) >> 1;
            var tmpObj;
            while (curIdx > 0 && heapVec[curIdx].f > heapVec[parentIdx].f) {
                tmpObj = heapVec[curIdx];
                heapVec[curIdx] = heapVec[parentIdx];
                heapVec[parentIdx] = tmpObj;
                curIdx = parentIdx;
                parentIdx = (curIdx - 1) >> 1;
            }
        };
        MaxBinaryHeap.prototype.pop = function () {
            var heapVec = this._heapVec;
            if (heapVec.length == 1) {
                return heapVec.pop();
            }
            var min = heapVec[0];
            heapVec[0] = heapVec.pop();
            var len = heapVec.length;
            var curIdx = 0;
            var leftIdx = 0;
            var rightIdx = 0;
            var minIdx = 0;
            var tmpObj;
            leftIdx = curIdx * 2 + 1;
            rightIdx = leftIdx + 1;
            while (leftIdx < len) {
                if (rightIdx < len) {
                    minIdx = heapVec[leftIdx].f > heapVec[rightIdx].f ? leftIdx : rightIdx;
                }
                else {
                    minIdx = leftIdx;
                }
                if (heapVec[minIdx].f > heapVec[curIdx].f) {
                    tmpObj = heapVec[minIdx];
                    heapVec[minIdx] = heapVec[curIdx];
                    heapVec[curIdx] = tmpObj;
                    curIdx = minIdx;
                    leftIdx = curIdx * 2 + 1;
                    rightIdx = leftIdx + 1;
                }
                else {
                    break;
                }
            }
            return min;
        };
        return MaxBinaryHeap;
    }());
    core.MaxBinaryHeap = MaxBinaryHeap;
    __reflect(MaxBinaryHeap.prototype, "core.MaxBinaryHeap");
})(core || (core = {}));
//# sourceMappingURL=MaxBinaryHeap.js.map