import { setupWorker } from 'msw/browser'
import { handlers } from './handlers'

export const worker = setupWorker(...handlers)

// Expose worker to window in dev only
if (import.meta.env.DEV) {
  window.msw = { worker }
}
