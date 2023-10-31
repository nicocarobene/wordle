import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'

const MAX_LETTERS = 5

@customElement('wordle-word')
export class WordleWord extends LitElement {
  static styles = css` 
  :host {
    --size-letter: 50px;

    position: relative;
  }

  .container {
    display: flex;
  }

  .letter {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    width: var(--size-letter);
    height: var(--size-letter);
    border: 2px solid #404040;
    padding: 5px;
    margin: 2px;
    font-size: 2rem;
    text-transform: uppercase;
  }

  .letter.pop {
    animation: pop 0.25s ease-in-out 1 forwards;
  }

  @keyframes pop {
    0, 100% { transform: scale(1); }
    50% { transform: scale(1.15); }
  }

  .rae {
    position: absolute;
    font-size: 2rem;
    text-decoration: none;
    display: inline-flex;
    align-items: center;
    right: -130px;
    top: 10px;
    transition:
      transform 0.5s,
      opacity 0.5s;
    opacity: 0;
  }

  .rae.visible {
    opacity: 1;
  }

  .rae:hover {
    transform: translateY(-4px);
  }
  :host(.sended) .letter {
    background: var(--used-color);
    border-color: var(--used-color);
    transform: scaleY(0);
    transition: background-color 1s ease;
  }

  .container .letter.exist {
    background-color: var(--exist-color);
    border-color: var(--exist-color);
  }

  .container .letter.exact {
    background-color: var(--exact-color);
    border-color: var(--exact-color);
  }

  :host(.sended) .letter {
    animation: spin 0.25s ease-out 1 forwards var(--delay);
  }

  :host(.sended) .letter:nth-child(1) { --delay: 0s; }
  :host(.sended) .letter:nth-child(2) { --delay: 0.2s; }
  :host(.sended) .letter:nth-child(3) { --delay: 0.4s; }
  :host(.sended) .letter:nth-child(4) { --delay: 0.6s; }
  :host(.sended) .letter:nth-child(5) { --delay: 0.8s; }

  @keyframes spin {
    0% { transform: scaleY(0); }
    100% { transform: scaleY(1); }
  } 
  `
  @property({ type: String })
    word = ' '.repeat(MAX_LETTERS)

  getTemplateLetters () {
    return this.word
      .split('')
      .map(letter => html`<div class='letter'>${letter}</div>`)
  }

  isEmpty () {
    return this.word.split('').some(letter => letter === ' ')
  }

  resolve (secretWord: string) {
    const word = secretWord.split('')
    const posibleLetters = this.word.split('')
    posibleLetters.forEach((letter, index) => {
      const isExactLetter = letter === word[index]
      if (isExactLetter) {
        word[index] = ' '
        this.setExactLetter(index)
        return
      }

      const isExistLetter = word.includes(letter)
      if (isExistLetter) {
        const indexLetter = word.findIndex(l => l === letter)
        word[indexLetter] = ' '
        this.setExistLetter(index)
      }
    })
    this.classList.add('sended')
    this.setRaeLink(this.word)
    return this.isSolved()
  }

  setExactLetter (index: number) {
    this.shadowRoot?.querySelector(`.letter:nth-child(${index + 1})`)?.classList.add('exact')
  }

  setExistLetter (index: number) {
    this.shadowRoot?.querySelector(`.letter:nth-child(${index + 1})`)?.classList.add('exist')
  }

  isSolved () {
    const letters = Array.from(this.shadowRoot?.querySelectorAll('.letter') ?? [])
    return letters.every(letter => letter.classList.contains('exact'))
  }

  setRaeLink (word: string) {
    const link = document.createElement('a')
    link.classList.add('rae')
    link.href = `https://dle.rae.es/${word}`
    link.target = '_blank'
    link.innerText = 'RAE 📚'
    this.shadowRoot?.appendChild(link)
    setTimeout(() => {
      link.classList.add('visible')
    }, 500)
  }

  removeLetter () {
    const newWord = this.toString().slice(0, -1)
    this.word = newWord.padEnd(MAX_LETTERS, ' ')
  }

  addLetter (letter: string) {
    const index = this.toString().length
    const box = this.shadowRoot?.querySelectorAll('.letter')[index]
    box?.classList.add('pop')
    const newWord = this.toString() + letter
    this.word = newWord.padEnd(MAX_LETTERS, ' ')
  }

  toString () {
    return this.word.replace(/ /g, '')
  }

  protected render () {
    return html`
      <div class="container">
        ${this.getTemplateLetters()}
      </div>
      `
  }
}
