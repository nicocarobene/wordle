# Wordle - Juego de Adivinanza de Palabras
Wordle es un juego en línea simple en el que debes adivinar una palabra en cinco intentos o menos. Este proyecto está construido utilizando [Lit Element](https://lit.dev/), y utiliza [Playwright](https://playwright.dev/) para pruebas end-to-end (E2E). También se incluye una configuración de GitHub Actions para la automatización de pruebas.

## Capturas de Pantalla

![Image Text](https://github.com/nicocarobene/wordle/blob/main/src/assets/wordleGame.png)

## Características

- **Adivinanza de Palabras**: Adivina la palabra secreta en seis intentos o menos.

## Cómo Jugar

1. Abre la página del juego en tu navegador.
2. Haz clic en las letras en el teclado virtual para adivinar la palabra.
3. Pulsa "Enter" para verificar tu adivinanza.
4. Continúa adivinando hasta que hayas adivinado la palabra o hayas agotado tus intentos.

## Instalación

1. Clona el repositorio:

```bash
  git clone https://github.com/nicocarobene/wordle.git
```

2. Instala las dependencias:

```js
  pnpm intall
```

## Uso
Para iniciar el servidor de desarrollo y jugar Wordle, ejecuta el siguiente comando:

```js
  pnpm run dev
```

Luego, abre tu navegador y visita http://localhost:5173/ para jugar el juego.

## Pruebas E2E

Este proyecto incluye pruebas end-to-end (E2E) automatizadas realizadas con Playwright. Puedes ejecutar estas pruebas con el siguiente comando:

```js
  pnpm run test
```
## Agradecimientos
Especial agredecimiento a ManzDev ya que el proyecto fue inspirado en unos de sus directo realizando este projecto con web component.