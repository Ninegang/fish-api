namespace uiCore {
/**
 * 帧动画按钮
 * @author none
 */
     export class AnimationButton extends uiCore.Button {
         public animDisplay: uiCore.Animation;
    
        public constructor() {
            super();
        }
    
        public get getanimDisplay(): uiCore.Animation {
            return this.animDisplay;
        }
    }
}
