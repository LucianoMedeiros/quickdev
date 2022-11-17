import { getDownloadURL, ref, uploadString } from 'firebase/storage'
import { fbStorage } from './config'
import { getFileExtension } from './get-file-extension'

export const saveOnFirebase = async (file: string, initials: string, folder: string): Promise<string> => {
  const storageRef = ref(fbStorage, `${folder}/${initials.toLowerCase()}${getFileExtension(file)}`)

  const fileUploaded = await uploadString(storageRef, file, 'data_url').then(snapshot => {
    return snapshot
  })

  return getDownloadURL(fileUploaded.ref).then(downloadURL => {
    return downloadURL
  })
}
