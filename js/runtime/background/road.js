import Sprite from '../../base/sprite'

const screenWidth = window.innerWidth
const screenHeight = window.innerHeight

const ROAD_IMG_SRC = 'images/road.png'
const ROAD_WIDTH = 27
const ROAD_HEIGHT = 53

const ROAD_NUM = Math.ceil(screenWidth / ROAD_WIDTH) * 2
/**
 * 游戏背景类
 * 提供update和render函数实现无限滚动的背景功能
 */
export default class BackGround extends Sprite {
  constructor(ctx) {
    super(ROAD_IMG_SRC, ROAD_WIDTH, ROAD_HEIGHT)

    this.render(ctx)

    this.left = 0
  }

  update() {
    this.left -= 2
    if (this.left <= -ROAD_WIDTH * ROAD_NUM / 2)
      this.left = 0
  }

  /**
   * 背景图重绘函数
   */
  render(ctx) {
    for (let i = 0; i < ROAD_NUM; i++) {
      ctx.drawImage(
        this.img,
        this.left + i * this.width,
        screenHeight - ROAD_HEIGHT,
        this.width,
        this.height)
    }
  }
}
