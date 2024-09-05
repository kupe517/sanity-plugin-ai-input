import {Button, Stack, Text, TextArea} from '@sanity/ui'
import React, {useCallback, useState} from 'react'
import {set, unset, useFormValue} from 'sanity'

interface AIInputConfig {
  apiKey: string
  prompt?: string
}

interface AIInputProps {
  type?: string
  onChange: (value: any) => void
  value?: string
  pluginConfig: AIInputConfig
}

export default function AIInput(props: AIInputProps): JSX.Element {
  const {onChange, value = '', pluginConfig, type} = props

  const name = useFormValue(['name'])

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
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
          model: 'gpt-3.5-turbo',
          messages: [{role: 'user', content: `${pluginConfig.prompt} ${name}`}],
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
        onClick={generateDescription}
        loading={isLoading}
      />
    </Stack>
  )
}
