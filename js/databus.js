
let instance

/**
 * 全局状态管理器
 */
export default class DataBus {
  constructor() {
    if ( instance )
      return instance

    instance = this

    this.reset()
  }

  reset() {
    this.frame      = 0
    this.score      = 0
    this.gameOver   = true
    this.hasStart = false
  }

}
