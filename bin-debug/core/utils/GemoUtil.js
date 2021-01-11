var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var core;
(function (core) {
    var GemoUtil = (function () {
        function GemoUtil() {
        }
        // 返回三个点组成三角形的面积  
        GemoUtil.triangleArea = function (p1, p2, p3) {
            var area = Math.abs((p1.x * p2.y + p2.x * p3.y + p3.x * p1.y - p2.x * p1.y - p3.x * p2.y - p1.x * p3.y) / 2);
            return area;
        };
        // 点是否在四边形内
        GemoUtil.pInQuad = function (p1, p2, p3, p4, p) {
            var area1 = GemoUtil.triangleArea(p1, p2, p) + GemoUtil.triangleArea(p2, p3, p) + GemoUtil.triangleArea(p3, p4, p) + GemoUtil.triangleArea(p4, p1, p);
            var area2 = GemoUtil.triangleArea(p1, p2, p3) + GemoUtil.triangleArea(p3, p4, p1);
            return Math.abs(area1 - area2) < GemoUtil.eps;
        };
        //-----------------------------------------------------------------------------------------------------------------
        GemoUtil.sgn = function (x) {
            if (Math.abs(x) < GemoUtil.eps) {
                return 0;
            }
            return x < 0 ? -1 : 1;
        };
        /** 点积 */
        GemoUtil.dot = function (p1, p2) {
            return p1.x * p2.x + p1.y * p2.y;
        };
        /** 叉积 */
        GemoUtil.cross = function (p1, p2) {
            return p1.x * p2.y - p1.y * p2.x;
        };
        GemoUtil.len = function (p) {
            return Math.sqrt(GemoUtil.dot(p, p));
        };
        GemoUtil.len2 = function (p) {
            return GemoUtil.dot(p, p);
        };
        /** 计算P点到直线(lp1--lp2)的最短距离 */
        GemoUtil.distTL = function (p, lp1, lp2) {
            var v1 = lp2.subtract(lp1);
            var v2 = p.subtract(lp1);
            return Math.abs(GemoUtil.cross(v1, v2) / GemoUtil.len(v1));
        };
        /** 计算P点到线段(lp1--lp2)的最短距离 */
        GemoUtil.distTS = function (p, lp1, lp2) {
            if (lp1.equals(lp2)) {
                return GemoUtil.len(p.subtract(lp1));
            }
            var v1 = lp2.subtract(lp1);
            var v2 = p.subtract(lp1);
            var v3 = p.subtract(lp2);
            if (GemoUtil.sgn(GemoUtil.dot(v1, v2)) < 0) {
                return GemoUtil.len(v2);
            }
            else if (GemoUtil.sgn(GemoUtil.dot(v1, v3)) > 0) {
                return GemoUtil.len(v3);
            }
            return Math.abs(GemoUtil.cross(v1, v2) / GemoUtil.len(v1));
        };
        /** 判断点是否在线段(lp1--lp2)上 */
        GemoUtil.pointOnSeg = function (p, lp1, lp2) {
            return GemoUtil.distTL(p, lp1, lp2) == 0 && GemoUtil.sgn(GemoUtil.dot(p.subtract(lp1), p.subtract(lp2))) < 0;
        };
        /** 直线(l1p1--l1p2)与直线(l2p1--l2p2)的交点 */
        GemoUtil.lineIntersect = function (l1p1, l1p2, l2p1, l2p2) {
            var v = l1p1.subtract(l2p1);
            var v1 = l1p2.subtract(l1p1);
            var v2 = l2p2.subtract(l2p1);
            var t = GemoUtil.cross(v2, v) / GemoUtil.cross(v1, v2);
            return l1p1.add(v1.setTo(v1.x * t, v1.y * t));
        };
        /** 直线(l1p1--l1p2)与线段(l2p1--l2p2)相交 */
        GemoUtil.isLSI = function (l1p1, l1p2, l2p1, l2p2) {
            var v = l1p2.subtract(l1p1);
            var u = l2p1.subtract(l1p1);
            var w = l2p2.subtract(l1p1);
            return GemoUtil.sgn(GemoUtil.cross(v, u)) != GemoUtil.sgn(GemoUtil.cross(v, w));
        };
        /** 线段与线段相交：两遍直线与线段(有时候特判重合) */
        GemoUtil.isSSI = function (l1p1, l1p2, l2p1, l2p2) {
            return GemoUtil.isLSI(l1p1, l1p2, l2p1, l2p2) && GemoUtil.isLSI(l2p1, l2p2, l1p1, l1p2);
        };
        GemoUtil.isRRI = function (r1ps, r2ps) {
            // let r1ps:egret.Point[] = [egret.Point.create(r1p1.x, r1p1.y), egret.Point.create(r1p2.x, r1p1.y), 
            //                             egret.Point.create(r1p2.x, r1p2.y), egret.Point.create(r1p1.x, r1p2.y)];
            // let r2ps:egret.Point[] = [egret.Point.create(r2p1.x, r2p1.y), egret.Point.create(r2p2.x, r2p1.y), 
            //                             egret.Point.create(r2p2.x, r2p2.y), egret.Point.create(r2p1.x, r2p2.y)];
            var r1ls = [[r1ps[0], r1ps[1]], [r1ps[1], r1ps[2]], [r1ps[2], r1ps[3]], [r1ps[3], r1ps[0]]];
            var r2ls = [[r2ps[0], r2ps[1]], [r2ps[1], r2ps[2]], [r2ps[2], r2ps[3]], [r2ps[3], r2ps[0]]];
            for (var i = 0; i < 4; i++) {
                for (var j = 0; j < 4; j++) {
                    if (GemoUtil.isSSI(r1ls[i][0], r1ls[i][1], r2ls[j][0], r2ls[j][1])) {
                        return true;
                    }
                }
            }
            return false;
        };
        /** 多边形面积 */
        GemoUtil.polygonArea = function (poly) {
            var area = 0;
            var len = poly.length - 1;
            for (var i = 1; i < len; i++) {
                area += GemoUtil.cross(poly[i].subtract(poly[0]), poly[i + 1].subtract(poly[0]));
            }
            return area;
        };
        GemoUtil.pointInPolygon = function (p, poly) {
            return false;
        };
        /** 绕指定点旋转 */
        GemoUtil.pointRotate = function (cP, p, cosV, sinV, retPoint) {
            var tP = retPoint || new egret.Point();
            tP.x = (p.x - cP.x) * cosV - (p.y - cP.y) * sinV + cP.x;
            tP.y = (p.x - cP.x) * sinV + (p.y - cP.y) * cosV + cP.y;
            return tP;
        };
        GemoUtil.eps = 1;
        return GemoUtil;
    }());
    core.GemoUtil = GemoUtil;
    __reflect(GemoUtil.prototype, "core.GemoUtil");
})(core || (core = {}));
//# sourceMappingURL=GemoUtil.js.map