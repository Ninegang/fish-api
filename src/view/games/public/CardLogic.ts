/**
 * 全局模块-牌型判断逻辑
 * @author none
 *
 */
class CardLogic {
    public static instance: CardLogic;
    public constructor() {
        CardLogic.instance = this;
    }
    /**
	  * 获取牌型点数
	  */
    public getCardPoit(num: number, isGetRealValue = false): number {
        if (num == 0) return 0;
        num = num % 13 + 1
        if (num > 10 && !isGetRealValue) {
            num = 10;
        }
        return num;
    }
    /** 获取数值 （A-13）**/
    public getCardValue(cardData: number): number {
        if (cardData == 0) return 0;
        return cardData % 13 + 1;
    }
    /** 获取花色 **/
    public getCardColor(cardData: number): number {
        if (cardData == 53) return 4;
        if (cardData == 54) return 5;
        if (cardData / 13 <= 1) return 3;
        if (cardData / 13 <= 2) return 2;
        if (cardData / 13 <= 3) return 1;
        if (cardData / 13 <= 4) return 0;
        return 0;
    }
    /** 根据值获取牌数据 **/
    public getCardByValue(cardData: number[], cardValue: number): number {
        for (var i: number = 0; i < cardData.length; i++) {
            if (this.getCardValue(cardData[i]) == cardValue) {
                return cardData[i];
            }
        }
        return 0;
    }
    /** 根据数值排序，从大到小 **/
    public SortByValue(cardData: number[]): void {
        var self: CardLogic = this;
        cardData.sort((left, right) => {
            if (self.getCardValue(left) > self.getCardValue(right)) {
                return -1;
            }
            else if (self.getCardValue(left) < self.getCardValue(right)) {
                return 1;
            }
            else {
                return 0;
            }
        });
    }
    /** 根据数值排序，从小到大  如果有A  特殊处理 **/
    public sortCardByValue(cardData1, cardData2): number {
        var card1 = this.getCardValue(cardData1), card2 = this.getCardValue(cardData2);
        if (card1 == 1) return 1;
        if (card2 == 1 && card1 != 1) return -1;
        if (card1 > card2) {
            return 1;
        } else if (card1 < card2) {
            return -1;
        } else {
            return 0;
        }
    }
    /** 根据颜色排序   黑红梅方 **/
    public sortCardByColor(cardData1, cardData2): number {
        var card1 = this.getCardColor(cardData1), card2 = this.getCardColor(cardData2);
        if (card1 > card2) {
            return -1;
        } else if (card1 < card2) {
            return 1;
        } else {
            return 0;
        }
    }

    /** 根据数值排序，从大到小 **/
    public SortByCards(localcardData: number[]): number[] {
        var isTurn = false;
        var cardData: number[] = [];
        if (localcardData) {
            for (var i = 0; i < localcardData.length; i++) {
                cardData.push(localcardData[i]);
            }
        }
        for (var i = 0; i < cardData.length; i++) {
            if (isTurn) {
                break;
            }
            for (var j = 0; j < cardData.length; j++) {
                if (isTurn) {
                    break;
                }
                for (var z = 0; z < cardData.length; z++) {
                    if (i != j && i != z && z != j) {
                        var cardValue1 = this.getCardPoit(cardData[i]);
                        var cardValue2 = this.getCardPoit(cardData[j]);
                        var cardValue3 = this.getCardPoit(cardData[z]);
                        if ((cardValue1 + cardValue2 + cardValue3) % 10 == 0) {
                            isTurn = true;
                            var card1 = cardData[i];
                            var card2 = cardData[j];
                            var card3 = cardData[z];
                            cardData.splice(cardData.indexOf(card1), 1);
                            cardData.splice(cardData.indexOf(card2), 1);
                            cardData.splice(cardData.indexOf(card3), 1);
                            var list = [card1, card2, card3];
                            this.SortByValue(list);
                            this.SortByValue(cardData);
                            list.push(cardData[0]);
                            list.push(cardData[1]);
                            cardData = list;
                            break;
                        }
                    }
                }
            }
        }
        if (!isTurn) {
            this.SortByValue(cardData);
        }
        return cardData;
    }
    /** 根据数值排序，从小到大   **/
    public sortCardsByValue(cardData: number[]): number[] {
        var cardList = [];
        for (var i = 0; i < cardData.length; i++) {
            cardList.push(cardData[i]);
        }
        cardList.sort((left, right) => {
            return this.sortCardByValue(left, right);
        });
        return cardList;
    }
    /** 根据颜色排序  黑红梅方  **/
    public sortCardsByColor(cardData: number[]): number[] {
        var cardList = [];
        for (var i = 0; i < cardData.length; i++) {
            cardList.push(cardData[i]);
        }
        cardList.sort((left, right) => {
            return this.sortCardByColor(left, right);
        });
        return cardList;
    }
    // 颜色 黑红梅方 数值 从小到大 同时排序  没有大小王
    public sortCardsByColorValue(cardData: number[]): number[] {
        var cardList = [], len, temp, cardList2 = [[], [], [], []];
        // cardList = this.sortCardsByColor(cardData);
        len = cardData.length;
        for (var i = 0; i < len; i++) {
            var card1 = cardData[i];
            cardList2[3 - this.getCardColor(card1)].push(card1);
        }
        for (var k = 0, len2 = cardList2.length; k < len2; k++) {
            var list = cardList2[k];
            if (list.length > 0)
                cardList = cardList.concat(this.sortCardsByValue(list));
        }
        return cardList;
    }
}
