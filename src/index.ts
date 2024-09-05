import {ThemeProvider} from '@sanity/ui'
import {createElement} from 'react'
import {definePlugin} from 'sanity'
import {FieldProps} from 'sanity'

import AIInput from './components/AIInput'

interface AIInputConfig {
  apiKey: string
  prompt: string
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
export const aiInput = definePlugin<AIInputConfig>((config) => {
  return {
    name: 'sanity-plugin-ai-input',
    schema: {
      types: [
        {
          name: 'aiInput',
          title: 'AI Input',
          type: 'string',
          components: {
            input: (props: FieldProps) =>
              createElement(
                ThemeProvider,
                {scheme: props.schemeTheme},
                createElement(AIInput, {...props, pluginConfig: config}),
              ),
          },
        },
      ],
    },
  }
})
