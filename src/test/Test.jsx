import React, { useState } from 'react'
import { View, Text, Button, StyleSheet, Alert } from 'react-native'
import DocumentPicker from 'react-native-document-picker'

const Test = () => {
  const [fileUri, setFileUri] = useState(null)
  const [fileName, setFileName] = useState(null)

  const handleFilePick = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.images, DocumentPicker.types.pdf, DocumentPicker.types.plainText],
      })

      setFileUri(res.uri)
      setFileName(res.name)
      Alert.alert('File selected:', res.name)
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log('User canceled file picker')
      } else {
        console.error('File picker error:', err)
      }
    }
  }

  return (
    <View style={styles.container}>
      <Button title="Pick a file" onPress={handleFilePick} />
      {fileUri && (
        <Text style={styles.text}>Selected file: {fileName}</Text>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    marginTop: 10,
    fontSize: 16,
    color: 'gray',
  },
})

export default Test
