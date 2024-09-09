# sanity-plugin-ai-input

> This is a **Sanity Studio v3** plugin.

## Installation

```sh
npm install sanity-plugin-ai-input
```

## Usage

Add it as a plugin in `sanity.config.ts` (or .js):

```ts
import {defineConfig} from 'sanity'
import {aiInput} from 'sanity-plugin-ai-input'

export default defineConfig({
  //...
  plugins: [
    aiInput({
      apiKey: 'your-openai-api-key',
      aiModel: 'gpt-3.5-turbo', // Optional, defaults to 'gpt-3.5-turbo'
    }),
  ],
})
```

## Use the AI input field in your schema:

```ts
{
      name: 'description',
      title: 'Description',
      type: 'aiInput',
      options: {
        prompt:
          'Generate a description for the following:',
        reference: 'name', // Optional reference to another text field on the page which will be appended to the query
      },
    },
```

## License

[MIT](LICENSE) © Brian Kuperman

## Develop & test

This plugin uses [@sanity/plugin-kit](https://github.com/sanity-io/plugin-kit)
with default configuration for build & watch scripts.

See [Testing a plugin in Sanity Studio](https://github.com/sanity-io/plugin-kit#testing-a-plugin-in-sanity-studio)
on how to run this plugin with hotreload in the studio.
