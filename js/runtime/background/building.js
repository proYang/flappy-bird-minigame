import Sprite from '../../base/sprite'

const screenWidth = window.innerWidth
const screenHeight = window.innerHeight

const BUILDING_IMG_SRC = 'images/buildings.png'
const BUILDING_WIDTH = screenWidth
const BUILDING_HEIGHT = screenWidth / 2.1

/**
 * 游戏背景类
 * 提供update和render函数实现无限滚动的背景功能
 */
export default class BackGround extends Sprite {
  constructor(ctx) {
    super(BUILDING_IMG_SRC, BUILDING_WIDTH, BUILDING_HEIGHT)

    this.render(ctx)

    this.left = 0
  }

  update() {
    
    this.left -= 2

    if (this.left <= -screenWidth)
      this.left = 0
  }

  /**
   * 背景图重绘函数
   */
  render(ctx) {
    ctx.drawImage(
      this.img,
      this.left,
      BUILDING_HEIGHT,
      this.width,
      this.height)

    ctx.drawImage(
      this.img,
      this.left + this.width,
      BUILDING_HEIGHT,
      this.width,
      this.height)
  }
}
