import Pipeline from './pipeline.js'


const screenWidth = window.innerWidth
const screenHeight = window.innerHeight


/**
 * 游戏背景类
 * 提供update和render函数实现无限滚动的背景功能
 */
export default class NPC {
  constructor(ctx) {
    this.list = []
  }

  generate() {
    const newPipeline = new Pipeline()
    newPipeline.init(screenWidth);
    this.list.push(newPipeline);
    if (this.list.length >= 5) {
      this.list.shift();
    }
  }

  update() {
    console.log(this.list)
    this.list.forEach(item => item.update())
  }

  /**
   * 背景图重绘函数
   */
  render(ctx) {
    this.list.forEach(item => item.render(ctx))
  }
}
