import {ThemeProvider} from '@sanity/ui'
import {createElement} from 'react'
import {definePlugin} from 'sanity'
import {ObjectSchemaType} from 'sanity'

import AIInput from './components/AIInput'

interface AIInputConfig {
  apiKey: string
  prompt: string
}

interface ExtendedFieldProps {
  schemaType: ObjectSchemaType
  value: string | undefined
  onChange: (value: any) => void
  schemeTheme: string
  options: {
    prompt: string
    reference?: string
  }
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
            input: (props: ExtendedFieldProps) =>
              createElement(
                ThemeProvider,
                {scheme: props.schemeTheme as 'light' | 'dark'},
                createElement(AIInput, {
                  type: props.schemaType.name,
                  onChange: props.onChange,
                  value: props.value,
                  pluginConfig: config,
                  options: props.schemaType.options,
                }),
              ),
          },
        },
      ],
    },
  }
})
