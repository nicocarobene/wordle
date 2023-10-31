import { LitElement, css, html } from 'lit'
import { customElement, property, queryAll } from 'lit/decorators.js'
import KEYBOARD_INITIAL_STATE from '../assets/keyboardState.json'

@customElement('wordle-keyboard')
export class WordleKeyboard extends LitElement {
  static styles = css`
  :host{}
  .container {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    width:450px;
    margin: 1em 0;
    gap: 8px 4px
  }

  .letter {
    background: #777;
    color: #fff;
    font-family: Arial;
    font-weight: bold;
    padding: 20px 14px;
    border-radius: 4px;
    width: 12px;
    text-transform: uppercase;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    user-select: none;
  }

  .letter.special {
    width: 32px;
  }

  .letter.used {
    background: var(--used-color);
    color: #fff;
  }
  
  .letter.exist {
    background: var(--exist-color);
    color: #fff;
  }
  
  .letter.exact {
    background: var(--exact-color);
    color: #fff;
  }`

  @property({ type: String })
    letters = KEYBOARD_INITIAL_STATE

  setLetter (key: string, state: string) {
    console.log(key, state)
    const letter = this.letters.find(letter => letter.key === key)
    if (!letter) return
    if (letter.state !== 'exact') {
      letter.state = state
    }
  }

  updated () {
    this.listeners()
  }

  @queryAll('.letter')
    keys!: NodeListOf<HTMLElement>

  listeners () {
    this.keys?.forEach(key => {
      key.addEventListener('click', () => {
        const detail = key.textContent?.replace('NEXT', 'enter').replace('BACK', 'backspace')
        const options = { detail, bubbles: true, composed: true }
        const event = new CustomEvent('keyboard', options)
        this.dispatchEvent(event)
      })
    })
  }

  protected render () {
    return html`
    <div class="container">
      ${this.letters.map(letter => html`<div class="letter ${letter.state}" >${letter.key}</div>`)}
    </div>
    `
  }
}
