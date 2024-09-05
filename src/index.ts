import {definePlugin} from 'sanity'

interface aiInputConfig {
  /* nothing here yet */
}

/**
 * Usage in `sanity.config.ts` (or .js)
 *
 * ```ts
 * import {defineConfig} from 'sanity'
 * import {aiInput} from 'sanity-plugin-ai-input'
 *
 * export default defineConfig({
 *   // ...
 *   plugins: [aiInput()],
 * })
 * ```
 */
export const aiInput = definePlugin<aiInputConfig | void>((config = {}) => {
  // eslint-disable-next-line no-console
  console.log('hello from sanity-plugin-ai-input')
  return {
    name: 'sanity-plugin-ai-input',
  }
})
