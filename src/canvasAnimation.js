


function CanvasAnimation(configObj) {
    configObj = configObj || { domNode: document.querySelector(".date-detail"), lineN: 6, rowN: 7 , R: 70};
    this.canvas = undefined;
    this.dateDetail = configObj.domNode;
    this.context = undefined;
    this.lineN = configObj.lineN;
    this.rowN = configObj.rowN;
    this.curPos = {
        x: 0,
        y: 0
    };
    this.allPoint = [];
    this.R = configObj.R;
    this.gap = 2;
    this.xSpace = undefined;
    this.ySpace = undefined;
    this.mouseMoveAciton = undefined;
}


CanvasAnimation.prototype = {
    constructor: CanvasAnimation,
    
    init() {
        if (!this.canvas) {
            let computedStyle = document.defaultView.getComputedStyle(this.dateDetail, null);
            this.canvas = document.createElement(`canvas`);
            this.canvas.width  = Number(computedStyle.width.replace("px",""));
            this.canvas.height = Number(computedStyle.height.replace("px",""));
            this.canvas.style.marginTop = computedStyle.marginTop;
            this.canvas.className = "canvas-animate";
            this.dateDetail.parentNode.insertBefore(this.canvas, this.dateDetail);
            this.xSpace = this.canvas.width / this.rowN;
            this.ySpace = this.canvas.height / this.lineN;
            this.context = this.canvas.getContext("2d");
            for (let i = 0; i < this.lineN; i++) {
                for (let j = 0; j < this.rowN; j++) {
                    this.allPoint.push({
                        leftTop: {
                            x: this.ySpace * j + this.gap,
                            y: this.ySpace * i + this.gap,
                            need: 1
                        },
                        rightTop: {
                            x: this.ySpace * j + this.ySpace - this.gap,
                            y: this.ySpace * i + this.gap,
                            need: 1
                        },
                        rightBottom: {
                            x: this.ySpace * j + this.ySpace - this.gap,
                            y: this.ySpace * i + this.ySpace - this.gap,
                            need: 1
                        },
                        leftBottom: {
                            x: this.ySpace * j + this.gap,
                            y: this.ySpace * i + this.ySpace - this.gap,
                            need: 1
                        }
                    });
                }
            }
        }
    },

    startAnimation() {
        if(!this.mouseMoveAciton){
            this.mouseMoveAciton = this._animationAction.bind(this);
        }
        this.dateDetail.addEventListener("mousemove",  this.mouseMoveAciton);
        this.closeAnimation();
    },

    _animationAction(e){
        this.curPos.x = e.pageX - this.canvas.offsetLeft;
        this.curPos.y = e.pageY - this.canvas.offsetTop;
        let point = this._judgePos(this.curPos);
        this.allPoint.forEach((ele, index) => {
            let s1 = this._calDis(ele.leftTop, this.curPos);
            let s2 = this._calDis(ele.rightTop, this.curPos);
            let s3 = this._calDis(ele.rightBottom, this.curPos);
            let s4 = this._calDis(ele.leftBottom, this.curPos);
            s1 > this.R ? ele.leftTop.need = 1 : ele.leftTop.need = 0;
            s2 > this.R ? ele.rightTop.need = 1 : ele.rightTop.need = 0;
            s3 > this.R ? ele.rightBottom.need = 1 : ele.rightBottom.need = 0;
            s4 > this.R ? ele.leftBottom.need = 1 : ele.leftBottom.need = 0;
        });
        this.clearCanvas(this.context);
        this.context.save();
        this.context.strokeStyle = "white";
        this.context.beginPath();
        this.context.moveTo(this.ySpace * point.row + this.gap, this.ySpace * point.line + this.gap);
        this.context.lineTo(this.ySpace * point.row + this.ySpace - this.gap, this.ySpace * point.line + this.gap);
        this.context.lineTo(this.ySpace * point.row + this.ySpace - this.gap, this.ySpace * point.line + this.ySpace - this.gap);
        this.context.lineTo(this.ySpace * point.row + this.gap, this.ySpace * point.line + this.ySpace - this.gap);
        this.context.lineTo(this.ySpace * point.row + this.gap, this.ySpace * point.line + this.gap);
        this.context.stroke();
        this.context.closePath();
        this.context.restore();
        this.drawLineAccordNeed();
    },

    stopAnimation(){
        this.clearCanvas();
        if( this.mouseMoveAciton){
            this.dateDetail.removeEventListener("mousemove", this.mouseMoveAciton);
        }
    },

    closeAnimation(){
        this.dateDetail.addEventListener("mouseleave",()=>{
            this.clearCanvas();
        });
    },

    drawLineAccordNeed() {
        let R = this.R;
        this.allPoint.forEach((ele) => {
            this.context.strokeStyle = "rgb(98,98,98)";
            this.context.beginPath();
            if (ele.leftTop.need == 0 && ele.rightTop.need == 0) {
                this.context.moveTo(ele.leftTop.x, ele.leftTop.y);
                this.context.lineTo(ele.rightTop.x, ele.rightTop.y);
            } else if ((ele.leftTop.need == 1 && ele.rightTop.need == 0)) {
                this.context.moveTo(ele.rightTop.x, ele.rightTop.y);
                this.context.lineTo(this.curPos.x - Math.sqrt(R * R - (ele.leftTop.y - this.curPos.y) * (ele.leftTop.y - this.curPos.y)), ele.rightTop.y);
            } else if (ele.leftTop.need == 0 && ele.rightTop.need == 1) {
                this.context.moveTo(ele.leftTop.x, ele.leftTop.y);
                this.context.lineTo(this.curPos.x + Math.sqrt(R * R - (ele.leftTop.y - this.curPos.y) * (ele.leftTop.y - this.curPos.y)), ele.rightTop.y);
            }
            if (ele.rightTop.need == 0 && ele.rightBottom.need == 0) {
                this.context.moveTo(ele.rightTop.x, ele.rightTop.y);
                this.context.lineTo(ele.rightBottom.x, ele.rightBottom.y);
            } else if ((ele.rightTop.need == 1 && ele.rightBottom.need == 0)) {
                this.context.moveTo(ele.rightBottom.x, ele.rightBottom.y);
                this.context.lineTo(ele.rightBottom.x, this.curPos.y - Math.sqrt(R * R - (ele.rightTop.x - this.curPos.x) * (ele.rightTop.x - this.curPos.x)));
            } else if (ele.rightTop.need == 0 && ele.rightBottom.need == 1) {
                this.context.moveTo(ele.rightTop.x, ele.rightTop.y);
                this.context.lineTo(ele.rightTop.x, this.curPos.y + Math.sqrt(R * R - (ele.rightTop.x - this.curPos.x) * (ele.rightTop.x - this.curPos.x)));
            }
            if (ele.rightBottom.need == 0 && ele.leftBottom.need == 0) {
                this.context.moveTo(ele.rightBottom.x, ele.rightBottom.y);
                this.context.lineTo(ele.leftBottom.x, ele.leftBottom.y);
            } else if ((ele.rightBottom.need == 1 && ele.leftBottom.need == 0)) {
                this.context.moveTo(ele.leftBottom.x, ele.leftBottom.y);
                this.context.lineTo(this.curPos.x + Math.sqrt(R * R - (ele.leftBottom.y - this.curPos.y) * (ele.leftBottom.y - this.curPos.y)), ele.rightBottom.y);
            } else if (ele.rightBottom.need == 0 && ele.leftBottom.need == 1) {
                this.context.moveTo(ele.rightBottom.x, ele.rightBottom.y);
                this.context.lineTo(this.curPos.x - Math.sqrt(R * R - (ele.rightBottom.y - this.curPos.y) * (ele.rightBottom.y - this.curPos.y)), ele.leftBottom.y);
            }
            if (ele.leftBottom.need == 0 && ele.leftTop.need == 0) {
                this.context.moveTo(ele.leftBottom.x, ele.leftBottom.y);
                this.context.lineTo(ele.leftTop.x, ele.leftTop.y);
            } else if ((ele.leftBottom.need == 1 && ele.leftTop.need == 0)) {
                this.context.moveTo(ele.leftTop.x, ele.leftTop.y);
                this.context.lineTo(ele.leftTop.x, this.curPos.y + Math.sqrt(R * R - (ele.leftTop.x - this.curPos.x) * (ele.leftTop.x - this.curPos.x)));
            } else if (ele.leftBottom.need == 0 && ele.leftTop.need == 1) {
                this.context.moveTo(ele.leftBottom.x, ele.leftBottom.y);
                this.context.lineTo(ele.leftBottom.x, this.curPos.y - Math.sqrt(R * R - (ele.leftBottom.x - this.curPos.x) * (ele.leftBottom.x - this.curPos.x)));
            }
            this.context.stroke();
            this.context.closePath();
        })

    },

    clearCanvas() {
        this.context && this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },

    _judgePos(curPos) {
        return {
            line: Math.floor(this.curPos.y / this.ySpace),
            row: Math.floor(this.curPos.x / this.xSpace),
        }
    },
    _calDis(point1, point2) {
        return Math.sqrt((point1.x - point2.x) * (point1.x - point2.x) + (point1.y - point2.y) * (point1.y - point2.y));
    }
}

export default CanvasAnimation;
// let canvasAnimation = new CanvasAnimation();
// canvasAnimation.init();
// canvasAnimation.startAnimation();