import { LitElement, css, html } from 'lit'
import confetti from 'canvas-confetti'
import { customElement, property, query } from 'lit/decorators.js'
import './wordleWord.ts'
import './wordleKeyboard.ts'
import WORDS from '../assets/words.json'

export const audioPlayer = {
  playLose: () => {
    new Audio('sound/lose.mp3').play()
  },
  playWin: () => {
    new Audio('sound/win.mp3').play()
  }
}

@customElement('wordle-board')
export class Wordle extends LitElement {
  constructor () {
    super()
    this._startGame()
    document.addEventListener('keyup', (e) => {
      this.pushLetter({ letter: e.key })
    })
    document.addEventListener('keyboard', ((e: CustomEvent<string>) => { this.pushLetter({ letter: e.detail }) }) as EventListener)
  }

  static styles = css`
    :host {
      width: 100vw;
      height: 100vh;
      display: grid;
      place-items: center;
      --exact-color: #6aaa64;
      --exist-color: #c9b458;
      --used-color: #3a3a3c;
      font-family: Montserrat, sans-serif;
    }

    .container {
      display: grid;
      place-item:center
      justify-content: space-between;
      align-items: center;
      height: 100vh;
    }

    h1 {
      text-align: center;
      text-transform: uppercase;
      border-bottom: 1px solid #555;
      margin-bottom: 0;
    }

    h2 {
      font-weight: lighter;
      font-size: 1rem;
      text-align: center;
      margin: 0;
    }
    h2 a {
      color: #f4b400;
    }

    h2 a:hover {
      color: #a22;
    }
    h4{
      visibility: var(--visibility-h4);
    }

    .words {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      font-weight: bold;
    }`
  // convert to regex test
  LETTERS = [
    'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p',
    'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'ñ',
    'z', 'x', 'c', 'v', 'b', 'n', 'm'
  ]

  @property({ type: Boolean })
    isGameOver = true

  @property({ type: Number })
    randomIndex = Math.floor(Math.random() * WORDS.length)

  @property({ type: String })
    secretWord = WORDS[this.randomIndex].toLowerCase()

  @query('wordle-word[current]')
    currentWord: any

  @query('wordle-keyboard')
    keyboard: any

  private _startGame () {
    this.isGameOver = false
  }

  private pushLetter ({ letter }: { letter: string }) {
    if (this.isGameOver) return
    const key = letter.toLowerCase()
    const isEnter = key === 'enter'
    const isBackSpace = key === 'backspace'
    isEnter && this.checkRestrictions()
    isBackSpace && this.currentWord.removeLetter()

    const isLetter = this.LETTERS.includes(key)
    const isEmptyWord: boolean = this.currentWord.isEmpty()

    if (isLetter && isEmptyWord) {
      this.currentWord.addLetter(key)
    }
  }

  private checkRestrictions () {
    const isEmpty: boolean = this.currentWord.isEmpty()
    if (isEmpty) {
      alert('the word have been 5 letters')
      return
    }
    const word = this.currentWord.toString()
    const existentWord = WORDS.includes(word)
    if (!existentWord) {
      alert('the word not exist in diccionary')
      return
    }
    const solved: boolean = this.currentWord.resolve(this.secretWord)
    if (!solved) {
      this.nextWord()
      return
    }
    this.win()
  }

  private nextWord () {
    const nextWord: HTMLElement | undefined = this.currentWord.nextElementSibling
    if (nextWord) {
      nextWord.setAttribute('current', '')
      this.currentWord.removeAttribute('current')
      return
    }
    this.lose()
  }

  win () {
    audioPlayer.playWin()
    confetti()
    // this.startSummary(true)
    this.isGameOver = true
  }

  lose () {
    audioPlayer.playLose()
    // this.startSummary(false)
    this.isGameOver = true
  }

  protected render () {
    return html`
    <div class="container">
      <header>
        <h1>Wordle</h1>
      </header>
      <div class="words">
        <wordle-word current></wordle-word>
        <wordle-word></wordle-word>
        <wordle-word></wordle-word>
        <wordle-word></wordle-word>
        <wordle-word></wordle-word>
        <wordle-word></wordle-word>
      </div>
        <wordle-keyboard></wordle-keyboard>
    </div>
    `
  }
}
