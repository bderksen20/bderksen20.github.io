import './style.css'
import typescriptLogo from './typescript.svg'
import viteLogo from '/vite.svg'
import { setupCounter } from './counter.ts'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <p class="read-the-docs">
      Under construction
    </p>
  </div>
`

setupCounter(document.querySelector<HTMLButtonElement>('#counter')!)
