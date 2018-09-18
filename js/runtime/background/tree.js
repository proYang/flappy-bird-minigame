import Sprite from '../../base/sprite'

const screenWidth = window.innerWidth
const screenHeight = window.innerHeight

const TREE_IMG_SRC = 'images/trees.png'
const TREE_WIDTH = screenWidth
const TREE_HEIGHT = screenWidth / 1.45

const IMG_SPACE = 24
const ROAD_HEIGHT = 53

/**
 * 游戏背景类
 * 提供update和render函数实现无限滚动的背景功能
 */
export default class BackGround extends Sprite {
  constructor(ctx) {
    super(TREE_IMG_SRC, TREE_WIDTH, TREE_HEIGHT)

    this.render(ctx)

    this.left = 0
  }

  update() {
    this.left -= 2

    if (this.left <= -screenWidth + IMG_SPACE)
      this.left = 0
  }

  /**
   * 背景图重绘函数
   */
  render(ctx) {
    const y = screenHeight - ROAD_HEIGHT - this.height;
    ctx.drawImage(
      this.img,
      this.left,
      y,
      this.width,
      this.height)

    ctx.drawImage(
      this.img,
      this.left + this.width - IMG_SPACE,
      y,
      this.width,
      this.height)
  }
}
