import {Stack, Text, TextInput} from '@sanity/ui'
import {useCallback} from 'react'
import {set, unset} from 'sanity'

export default function AIInput(props) {
  const {elementProps, onChange, value = ''} = props

  const handleChange = useCallback(
    (event) => {
      const nextValue = event.currentTarget.value
      onChange(nextValue ? set(nextValue) : unset())
    },
    [onChange],
  )

  return (
    <Stack space={2}>
      <TextInput {...elementProps} onChange={handleChange} value={value} />
      <Text>Characters: {value.length}</Text>
    </Stack>
  )
}
