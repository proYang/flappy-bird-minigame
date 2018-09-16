import Sprite from '../../base/sprite'
import Tree from './tree.js'
import Building from './building.js'


const screenWidth = window.innerWidth
const screenHeight = window.innerHeight

const BG_IMG_SRC = 'images/background.png'
const BG_WIDTH = screenWidth
const BG_HEIGHT = screenHeight

/**
 * 游戏背景类
 * 提供update和render函数实现无限滚动的背景功能
 */
export default class BackGround extends Sprite {
  constructor(ctx) {
    super(BG_IMG_SRC, BG_WIDTH, BG_HEIGHT)
    this.tree = new Tree(ctx);
    this.buidling = new Building(ctx);
    this.render(ctx)
  }

  update() {
    this.tree.update();
    this.buidling.update();
  }

  /**
   * 背景图重绘函数
   */
  render(ctx) {
    ctx.drawImage(
      this.img,
      0,
      0,
      this.width,
      this.height)
    this.tree.render(ctx);
    this.buidling.render(ctx);
  }
}
