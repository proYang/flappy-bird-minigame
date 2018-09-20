let instance

/**
 * 统一的音效管理器
 */
export default class Music {
  constructor() {
    if ( instance )
      return instance

    instance = this

    this.pointAudio = new Audio()
    this.pointAudio.src  = 'audio/point.wav'

    this.swooshAudio     = new Audio()
    this.swooshAudio.src = 'audio/swoosh.wav'

    this.hitAudio     = new Audio()
    this.hitAudio.src = 'audio/hit.wav'

  }

  playPoint() {
    this.swooshAudio.currentTime = 0
    this.pointAudio.play()
  }

  playSwoosh() {
    this.swooshAudio.currentTime = 0
    this.swooshAudio.play()
  }

  playHit() {
    this.hitAudio.currentTime = 0
    this.hitAudio.play()
  }
}
