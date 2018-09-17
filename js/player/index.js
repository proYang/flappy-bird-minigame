import Sprite   from '../base/sprite'
import DataBus from '../databus'

let databus = new DataBus()

const screenWidth    = window.innerWidth
const screenHeight   = window.innerHeight

// 玩家相关常量设置
const middleBird = {
  src: 'images/bird_middle.png',
  width: 37,
  height: 26
}
const BIRDS_LIST = ['images/bird_middle.png', 'images/bird_up.png', 'images/bird_down.png', 'images/bird_middle.png'];

const BIRD_WIDTH = 37;
const BIRD_HEIGHT = 26;

// 翅膀煽动间隔毫秒数
const TIME_SPACE = 80;

// 速度变量
const speedMax = 8;

export default class Player extends Sprite {
  constructor() {
    super(BIRDS_LIST[0], BIRD_WIDTH, BIRD_HEIGHT)
    this.speed = 0;
    this.index = 0;
    this.lastTime = Date.now();
    // 玩家默认处于屏幕垂直居中位置
    this.x = 50;
    this.y = (screenHeight - this.height)/2
    // 初始化事件监听
    this.initEvent()
  }

  /**
   * 玩家响应手指的触摸事件
   * 改变战机的位置
   */
  initEvent() {
    canvas.addEventListener('touchend', ((e) => {
      e.preventDefault()
      this.up();
    }).bind(this))
  }

/**
 * 煽动翅膀
 */
  fly() {
    if (Date.now() - this.lastTime < TIME_SPACE) return;

    const index = this.index % BIRDS_LIST.length;
    this.img.src = BIRDS_LIST[index];
    this.index += 10;
    this.lastTime = Date.now();
  }

  down() {
    this.y += this.speed;
  }

  up() {
    this.speed = -speedMax;
  }

  // 触碰上下边界
  overflow() {
    if (this.y > screenHeight - BIRD_HEIGHT) {
      databus.gameOver = true;
    } else if (this.y < 0) {
      databus.gameOver = true;
    }
  }

  update() {
    this.speed += 0.5; 
    if (this.speed >= speedMax) {
      this.speed = speedMax;
    }
    this.down()
    this.overflow()
    this.fly()
  }

  render (ctx) {
    ctx.drawImage(
      this.img,
      this.x,
      this.y,
      this.width,
      this.height)
  }
}
