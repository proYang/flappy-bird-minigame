import Player from './player/index'
import Npc from './npc/index.js'
import BackGround from './runtime/background/index.js'
import GameInfo from './runtime/gameinfo'
import Music from './runtime/music'
import DataBus from './databus'

const screenHeight = window.innerHeight

let ctx = canvas.getContext('2d')
let databus = new DataBus()

/**
 * 游戏主函数
 */
export default class Main {
  constructor() {
    // 维护当前requestAnimationFrame的id
    this.aniId = 0

    this.restart()
  }

  restart() {
    databus.reset()

    canvas.removeEventListener(
      'touchstart',
      this.touchHandler
    )

    this.bg = new BackGround(ctx)
    this.player = new Player(ctx)
    this.npc = new Npc(ctx)
    // this.gameinfo = new GameInfo()
    // this.music = new Music()

    this.bindLoop = this.loop.bind(this)
    // this.hasEventBind = false

    // 清除上一局的动画
    window.cancelAnimationFrame(this.aniId);
    this.aniId = window.requestAnimationFrame(
      this.bindLoop,
      canvas
    )
  }

  addNpc() {
    if (databus.frame % 100 === 0) {
      this.npc.generate()
    }
  }
  // 全局碰撞检测
  collisionDetection() {
  }

  // 游戏结束后的触摸事件处理逻辑
  touchEventHandler(e) {
    e.preventDefault()

    let x = e.touches[0].clientX
    let y = e.touches[0].clientY

    let area = this.gameinfo.btnArea

    if (x >= area.startX
      && x <= area.endX
      && y >= area.startY
      && y <= area.endY)
      this.restart()
  }

  /**
   * canvas重绘函数
   * 每一帧重新绘制所有的需要展示的元素
   */
  render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    this.bg.render(ctx)
    this.npc.render(ctx)
    this.player.render(ctx)
  }

  // 游戏逻辑更新主函数
  update() {
    if (databus.gameOver) return
    this.bg.update()
    this.npc.update()
    this.player.update()
  }

  // 实现游戏帧循环
  loop() {
    databus.frame++
    this.addNpc()
    this.update()
    this.render()

    this.aniId = window.requestAnimationFrame(
      this.bindLoop,
      canvas
    )
  }
}
