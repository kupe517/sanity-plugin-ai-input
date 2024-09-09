import {Button, Label, Stack, TextArea} from '@sanity/ui'
import React, {JSX, useCallback, useState} from 'react'
import {FormSetPatch, FormUnsetPatch, set, unset, useFormValue} from 'sanity'

interface AIInputConfig {
  apiKey: string
  aiModel?: string
}

interface AIInputProps {
  type?: string
  onChange: (value: string | FormSetPatch | FormUnsetPatch) => void
  value?: string
  pluginConfig: AIInputConfig
  options: {
    prompt: string
    reference?: string
  }
}

export default function AIInput(props: AIInputProps): JSX.Element {
  const {onChange, value = '', pluginConfig, type, options} = props
  const {prompt, reference} = options
  const referenceValue = useFormValue(reference ? [reference] : [])
  const fullPrompt = reference ? `${prompt} "${referenceValue}"` : prompt
  const aiModel = pluginConfig?.aiModel || 'gpt-3.5-turbo'

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      const nextValue = event.currentTarget.value
      onChange(nextValue ? set(nextValue) : unset())
    },
    [onChange],
  )

  const [isLoading, setIsLoading] = useState(false)

  const generateDescription = async () => {
    setIsLoading(true)

    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${pluginConfig.apiKey}`,
        },
        body: JSON.stringify({
          model: aiModel,
          messages: [{role: 'user', content: fullPrompt}],
        }),
      })
      const data = await response.json()
      const generatedContent = data.choices[0].message.content
      onChange(set(generatedContent))
    } catch (error) {
      console.error('Error generating description:', error)
    }

    setIsLoading(false)
  }

  return (
    <Stack space={2}>
      <TextArea onChange={handleChange} value={value} type={type} />
      <Button
        text="Generate Description"
        tone="primary"
        onClick={generateDescription} // eslint-disable-line
        loading={isLoading}
      />
      <Label size={1}>Prompt: {fullPrompt}</Label>
    </Stack>
  )
}
