import Sprite   from '../base/sprite'
import DataBus from '../databus'
import Music from '../runtime/music.js'

let databus = new DataBus()
let music = new Music()

const screenWidth    = window.innerWidth
const screenHeight   = window.innerHeight

// 玩家相关常量设置

let BIRD_UP_IMG = new Image();
BIRD_UP_IMG.src = 'images/bird_up.png';

let BIRD_MIDDLE_IMG = new Image();
BIRD_MIDDLE_IMG.src = 'images/bird_middle.png';

let BIRD_DOWN_IMG = new Image();
BIRD_DOWN_IMG.src = 'images/bird_down.png';

const BIRD_LIST = [BIRD_MIDDLE_IMG, BIRD_UP_IMG, BIRD_MIDDLE_IMG, BIRD_DOWN_IMG]

const BIRD_WIDTH = 37.4;
const BIRD_HEIGHT = 26;
const ROAD_HEIGHT = 53;
// 翅膀煽动间隔毫秒数
const TIME_SPACE = 80;

// 速度变量
const speedMax = 8;

export default class Player extends Sprite {
  constructor() {
    super(BIRD_MIDDLE_IMG.src, BIRD_WIDTH, BIRD_HEIGHT)
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
   * 上升事件
   */
  initEvent() {
    canvas.addEventListener('touchend', ((e) => {
      e.preventDefault()
      if (databus.gameOver) return
      this.up();
    }).bind(this))
  }

  /**
   * 煽动翅膀
   */
  fly() {
    if (Date.now() - this.lastTime < TIME_SPACE) return;

    const index = this.index % BIRD_LIST.length;
    this.img = BIRD_LIST[index];
    this.index = index + 1;
    this.lastTime = Date.now();
  }

  down() {
    this.y += this.speed;
  }

  up() {
    this.speed = -speedMax;
    music.playSwoosh();
  }

  // 触碰上下边界
  overflow() {
    if (this.y > screenHeight - BIRD_HEIGHT - ROAD_HEIGHT) {
      return true;
    } else if (this.y < 0) {
      return true;
    } else return false
  }

  update() {
    this.fly()
    if(!databus.hasStart) return
    this.speed += 0.5; 
    if (this.speed >= speedMax) {
      this.speed = speedMax;
    }
    this.down()
    this.overflow()
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
