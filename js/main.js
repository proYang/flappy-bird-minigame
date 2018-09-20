import Player from './player/index'
import Npc from './npc/index.js'
import BackGround from './runtime/background/index.js'
import GameInfo from './runtime/gameinfo'
import Music from './runtime/music'
import DataBus from './databus'
import { isCollision } from './util.js'

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
  
    this.startEvent()
  
    this.bg = new BackGround(ctx)
    this.player = new Player(ctx)
    this.npc = new Npc(ctx)
    this.gameinfo = new GameInfo()
    this.music = new Music()

    this.bindLoop = this.loop.bind(this)

    // 清除上一局的动画
    window.cancelAnimationFrame(this.aniId);
    this.aniId = window.requestAnimationFrame(
      this.bindLoop)
  }

  startEvent() {
    const eventHandle = () => {
      databus.gameOver = false;
      databus.hasStart = true;
      canvas.removeEventListener(
        'touchend',
        eventHandle
      )
    }
    canvas.addEventListener(
      'touchend',
      eventHandle
    )
  }


  // 游戏结束后的触摸事件处理逻辑
  endEvent() {
    const endEventHandle = (e) => {

      let x = e.changedTouches[0].clientX
      let y = e.changedTouches[0].clientY
      let area = this.gameinfo.btnArea

      if (x >= area.startX
        && x <= area.endX
        && y >= area.startY
        && y <= area.endY) {
          canvas.removeEventListener(
            'touchend',
            endEventHandle
          )
          this.restart()
        }
    }
    canvas.addEventListener(
      'touchend',
      endEventHandle
    )
   
  }

  addNpc() {
    if (databus.gameOver) return
    if (databus.frame % 100 === 0) {
      this.npc.generate()
    }
  }
  // 全局碰撞检测
  collisionDetection() {
    this.npc.list.forEach(npc => {
      // 检测是否碰撞管道所在矩形（包括空白区域）
      const isCrash = isCollision({
        left: npc.x,
        top: 0,
        width: npc.width,
        height: screenHeight
      }, {
        left: this.player.x,
        top: this.player.y,
        width: this.player.width,
        height: this.player.height
      })
      // 排除空白区域
      const isThrough = isCollision({
        left: npc.x,
        top: npc.spaceY + npc.height,
        width: npc.width,
        height: npc.spaceHeight
      }, {
        left: this.player.x,
        top: this.player.y,
        width: this.player.width,
        height: this.player.height
      })
      if (isCrash && !isThrough ) {
        // 发生碰撞，游戏结束
        databus.gameOver = true;
        this.music.playHit();
        this.endEvent();
      }
      if (npc.x + npc.width < this.player.x && npc.AddToscore) {
        // 通过加分
        databus.score ++;
        npc.AddToscore = false;
        this.music.playPoint();
      }
    })
    // 地图边缘碰撞检测
    if(this.player.overflow()) {
      // 发生碰撞，游戏结束
      databus.gameOver = true;
      this.endEvent();
    }
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
    this.gameinfo.renderGameScore(ctx, databus.score)
    if (databus.gameOver && databus.hasStart) {
      this.gameinfo.renderGameOver(ctx, databus.score);
    }
  }

  // 游戏逻辑更新主函数
  update() {
    this.player.update()

    if (databus.gameOver) return
    this.bg.update()
    this.npc.update()
    this.collisionDetection()
  }

  // 实现游戏帧循环
  loop() {
    databus.frame++

    this.update()
    this.addNpc()
    this.render()

    this.aniId = window.requestAnimationFrame(
      this.bindLoop)
  }
}
