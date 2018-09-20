import Sprite from '../base/sprite'

const screenWidth = window.innerWidth
const screenHeight = window.innerHeight

const PIPILINE_IMG_SRC = 'images/pipeline_head.png'
const PIPILINE_WIDTH = 58
const PIPILINE_HEIGHT = 30

let PIPELINE_BODY = new Image();
PIPELINE_BODY.src = 'images/pipeline_body.png';

let PIPELINE_HEAD_UP = new Image();
PIPELINE_HEAD_UP.src = 'images/pipeline_head_up.png';

const ROAD_HEIGHT = 53

// 随机范围生成
function rand(min, max) {
  return parseInt(Math.random() * (max - min) + min);
}

/**
 * 游戏背景类
 * 提供update和render函数实现无限滚动的背景功能
 */
export default class BackGround extends Sprite {
  constructor() {
    super(PIPILINE_IMG_SRC, PIPILINE_WIDTH, PIPILINE_HEIGHT)
    // 空挡初始坐标值
    this.spaceHeight = 170;

    this.spaceY = rand(this.spaceHeight, screenHeight - this.spaceHeight * 2);
    this.visible = false;
    // 是否通过，加分锁
    this.AddToscore = true;
  }

  init(x) {
    this.x = x;
    this.visible = true;
  }

  update() {
    this.x -= 2;
    if(this.x < - this.width) {
      this.visible = false;
    }
  }

  /**
   * 背景图重绘函数
   */
  render(ctx) {
    if (!this.visible) return;
    ctx.drawImage(
      PIPELINE_BODY,
      this.x+2,
      0,
      54,
      this.spaceY)

    ctx.drawImage(
      this.img,
      this.x,
      this.spaceY,
      this.width,
      this.height)

    ctx.drawImage(
      PIPELINE_HEAD_UP,
      this.x,
      this.spaceY + this.spaceHeight,
      this.width,
      this.height)

    ctx.drawImage(
      PIPELINE_BODY,
      this.x + 2,
      this.spaceY + this.spaceHeight + this.height,
      54,
      screenHeight - this.spaceY - this.spaceHeight - this.height - ROAD_HEIGHT)
  }
}
