import { Lightning, Utils } from '@lightningjs/sdk'

export default class BasicAnimComponent extends Lightning.Component {
  static _template() {
    return {
      Background: {
        w: 1920,
        h: 1080,
        color: 0xfffbb03b,
        src: Utils.asset('images/background.png'),
      },
      Logo: {
        mountX: 0.5,
        mountY: 1,
        x: 960,
        y: 600,
        src: Utils.asset('images/logo.png'),
      },
      Text: {
        mount: 0.5,
        x: 960,
        y: 720,
        text: {
          text: "Let's start building!",
          fontFace: 'Regular',
          fontSize: 64,
          textColor: 0xbbffffff,
        },
      },
    }
  }

  _init() {
    this.textAnimation = this.tag('Text').animation({
      duration: 10,
      repeat: -1,
      actions: [
        {
          p: 'text.text', //property that we'll modify
          v: {
            //v should be the property value. 0 is the beginning of the animation
            0: "Let's start building!",
            0.33: "Let's start learning!",
            0.66: "Let's start lightning",
          },
        },
        {
          p: 'y',
          v: {
            0: 720,
            0.5: 1000,
            1: 720,
          },
        },
      ],
    })
    this.tag('Background')
      .animation({
        duration: 15,
        repeat: -1,
        actions: [
          {
            t: '',
            p: 'color',
            v: { 0: { v: 0xfffbb03b }, 0.5: { v: 0xfff46730 }, 0.8: { v: 0xfffbb03b } },
          },
        ],
      })
      .start()
  }

  _handleLeft() {
    this.textAnimation.play()
  }

  _handleRight() {
    this.textAnimation.pause()
  }
}
