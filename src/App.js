/*
 * If not stated otherwise in this file or this component's LICENSE file the
 * following copyright and licenses apply:
 *
 * Copyright 2020 Metrological
 *
 * Licensed under the Apache License, Version 2.0 (the License);
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { Lightning, Utils } from '@lightningjs/sdk'
import CardComponent from './components/CardComponent'

export default class App extends Lightning.Component {
  static getFonts() {
    return [{ family: 'Regular', url: Utils.asset('fonts/Roboto-Regular.ttf') }]
  }

  static _template() {
    return {
      Background: {
        w: 1920,
        h: 1080,
        color: 0xfffbb03b,
        src: Utils.asset('images/background.png'),
      },
      Container: {
        rect: true,
        w: 1920,
        Card1: {
          type: CardComponent,
          color: 0xfff03d3d,
          zIndex: 3,
        },
        Card2: {
          type: CardComponent,
          color: 0xff75e34a,
          zIndex: 2,
        },
        Card3: {
          type: CardComponent,
          color: 0xff1254ed,
          zIndex: 1,
        },
      },
    }
  }

  _init() {
    this.index = 0
    this.cards = this.tag('Container').children
    this.cards.map(card => {
      card.swap = card.animation({
        duration: 1,
        actions: [
          {
            p: 'x',
            v: {
              0: 960,
              0.5: 590,
              1: 960,
            },
          },
        ],
      })
    })
  }

  _handleRight() {
    if (this.index === this.cards.length - 1) {
      return
    }

    this.cards[this.index].swap.start()
    setTimeout(() => {
      for (const card of this.cards) {
        if (card.zIndex === 3) {
          card.patch({ zIndex: 1 })
        } else {
          card.patch({ zIndex: card.zIndex + 1 })
        }
      }
    }, 500)

    this.index++
  }

  _handleLeft() {
    if (this.index === 0) {
      return
    }
    this.index--
    this.cards[this.index].swap.start()
    setTimeout(() => {
      for (const card of this.cards) {
        if (card.zIndex === 1) {
          card.patch({ zIndex: 3 })
        } else {
          card.patch({ zIndex: card.zIndex - 1 })
        }
      }
    }, 500)
  }
}
