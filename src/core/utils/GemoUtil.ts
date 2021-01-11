namespace core
{
    export class GemoUtil
    {
        public static eps:number = 1;

        // 返回三个点组成三角形的面积  
        private static triangleArea(p1:egret.Point, p2:egret.Point, p3:egret.Point):number
        {
            let area = Math.abs((p1.x * p2.y + p2.x * p3.y + p3.x * p1.y - p2.x * p1.y - p3.x * p2.y - p1.x * p3.y) / 2);
            return area;
        }

        // 点是否在四边形内
        public static pInQuad(p1:egret.Point, p2:egret.Point, p3:egret.Point, p4:egret.Point, p:egret.Point):boolean
        {
            let area1:number = GemoUtil.triangleArea(p1, p2, p) + GemoUtil.triangleArea(p2, p3, p) + GemoUtil.triangleArea(p3, p4, p) + GemoUtil.triangleArea(p4, p1, p);
            let area2:number = GemoUtil.triangleArea(p1, p2, p3) + GemoUtil.triangleArea(p3, p4, p1);

            return Math.abs(area1 - area2) < GemoUtil.eps;
        }

        //-----------------------------------------------------------------------------------------------------------------
        public static sgn(x:number):number
        {
            if (Math.abs(x) < GemoUtil.eps)
            {
                return 0;
            }
            
            return x < 0 ? -1 : 1;
        }

        /** 点积 */
        public static dot(p1:egret.Point, p2:egret.Point):number
        {
            return p1.x * p2.x + p1.y * p2.y;
        }

        /** 叉积 */
        public static cross(p1:egret.Point, p2:egret.Point):number
        {
            return p1.x * p2.y - p1.y * p2.x;
        }

        public static len(p:egret.Point):number
        {
            return Math.sqrt(GemoUtil.dot(p, p));
        }

        public static len2(p:egret.Point):number
        {
            return GemoUtil.dot(p, p);
        }

        /** 计算P点到直线(lp1--lp2)的最短距离 */
        public static distTL(p:egret.Point, lp1:egret.Point, lp2:egret.Point):number
        {
            let v1 = lp2.subtract(lp1);
            let v2 = p.subtract(lp1);
            return Math.abs(GemoUtil.cross(v1, v2) / GemoUtil.len(v1));
        }

        /** 计算P点到线段(lp1--lp2)的最短距离 */
        public static distTS(p:egret.Point, lp1:egret.Point, lp2:egret.Point):number
        {
            if (lp1.equals(lp2))
            {
                return GemoUtil.len(p.subtract(lp1));
            }
            let v1 = lp2.subtract(lp1);
            let v2 = p.subtract(lp1);
            let v3 = p.subtract(lp2);
            if (GemoUtil.sgn(GemoUtil.dot(v1, v2)) < 0)
            {
                return GemoUtil.len(v2);
            }
            else if (GemoUtil.sgn(GemoUtil.dot(v1, v3)) > 0)
            {
                return GemoUtil.len(v3);
            }
            return Math.abs(GemoUtil.cross(v1, v2) / GemoUtil.len(v1));
        }

        /** 判断点是否在线段(lp1--lp2)上 */
        public static pointOnSeg(p:egret.Point, lp1:egret.Point, lp2:egret.Point):boolean
        {
            return GemoUtil.distTL(p, lp1, lp2) == 0 && GemoUtil.sgn(GemoUtil.dot(p.subtract(lp1), p.subtract(lp2))) < 0;
        }

        /** 直线(l1p1--l1p2)与直线(l2p1--l2p2)的交点 */
        public static lineIntersect(l1p1:egret.Point, l1p2:egret.Point, l2p1:egret.Point, l2p2:egret.Point):egret.Point
        {
            let v = l1p1.subtract(l2p1);
            let v1 = l1p2.subtract(l1p1);
            let v2 = l2p2.subtract(l2p1);
            let t = GemoUtil.cross(v2, v) / GemoUtil.cross(v1, v2);
            return l1p1.add(v1.setTo(v1.x * t, v1.y * t));
        }

        /** 直线(l1p1--l1p2)与线段(l2p1--l2p2)相交 */
        public static isLSI(l1p1:egret.Point, l1p2:egret.Point, l2p1:egret.Point, l2p2:egret.Point):boolean
        {
            let v = l1p2.subtract(l1p1);
            let u = l2p1.subtract(l1p1);
            let w = l2p2.subtract(l1p1);
            return GemoUtil.sgn(GemoUtil.cross(v, u)) != GemoUtil.sgn(GemoUtil.cross(v, w));
        }

        /** 线段与线段相交：两遍直线与线段(有时候特判重合) */
        public static isSSI(l1p1:egret.Point, l1p2:egret.Point, l2p1:egret.Point, l2p2:egret.Point):boolean
        {
            return GemoUtil.isLSI(l1p1, l1p2, l2p1, l2p2) && GemoUtil.isLSI(l2p1, l2p2, l1p1, l1p2);
        }

        public static isRRI(r1ps:egret.Point[], r2ps:egret.Point[]):boolean
        {
            // let r1ps:egret.Point[] = [egret.Point.create(r1p1.x, r1p1.y), egret.Point.create(r1p2.x, r1p1.y), 
            //                             egret.Point.create(r1p2.x, r1p2.y), egret.Point.create(r1p1.x, r1p2.y)];
            // let r2ps:egret.Point[] = [egret.Point.create(r2p1.x, r2p1.y), egret.Point.create(r2p2.x, r2p1.y), 
            //                             egret.Point.create(r2p2.x, r2p2.y), egret.Point.create(r2p1.x, r2p2.y)];

            let r1ls:egret.Point[][] = [[r1ps[0], r1ps[1]], [r1ps[1], r1ps[2]], [r1ps[2], r1ps[3]], [r1ps[3], r1ps[0]]];
            let r2ls:egret.Point[][] = [[r2ps[0], r2ps[1]], [r2ps[1], r2ps[2]], [r2ps[2], r2ps[3]], [r2ps[3], r2ps[0]]];

            for (let i:number = 0; i < 4; i++)
            {
                for (let j:number = 0; j < 4; j++)
                {
                    if (GemoUtil.isSSI(r1ls[i][0], r1ls[i][1], r2ls[j][0], r2ls[j][1]))
                    {
                        return true;
                    }
                }
            }

            return false;
        }

        /** 多边形面积 */
        public static polygonArea(poly:egret.Point[]):number
        {
            let area = 0;
            let len = poly.length - 1;
            for (let i:number = 1; i < len; i++)
            {
                area += GemoUtil.cross(poly[i].subtract(poly[0]), poly[i + 1].subtract(poly[0]));
            }
            return area;
        }

        public static pointInPolygon(p:egret.Point, poly:egret.Point[]):boolean
        {

            return false;
        }

        /** 绕指定点旋转 */
        public static pointRotate(cP:egret.Point, p:egret.Point, cosV:number, sinV:number, retPoint?:egret.Point):egret.Point
        {
            let tP = retPoint || new egret.Point();
            tP.x = (p.x - cP.x) * cosV - (p.y - cP.y) * sinV + cP.x;
            tP.y = (p.x - cP.x) * sinV + (p.y - cP.y) * cosV + cP.y;

            return tP;
        }
    }
}