import { createClient } from './server'

const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB
const ALLOWED_MIME_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif']

export async function uploadFile(bucket: string, file: File, path: string) {
  if (file.size > MAX_FILE_SIZE) {
    throw new Error('O arquivo excede o limite de 5MB')
  }
  if (!ALLOWED_MIME_TYPES.includes(file.type)) {
    throw new Error('Tipo de arquivo não permitido. Apenas imagens (JPG, PNG, WEBP, GIF)')
  }
  
  const supabase = await createClient()
  
  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(path, file, {
      cacheControl: '3600',
      upsert: false
    })

  if (error) {
    throw error
  }

  const { data: publicUrlData } = supabase.storage
    .from(bucket)
    .getPublicUrl(data.path)

  return publicUrlData.publicUrl
}

export async function deleteFile(bucket: string, path: string) {
  const supabase = await createClient()
  const { error } = await supabase.storage.from(bucket).remove([path])
  if (error) {
    console.error('Error deleting file:', error)
    throw error
  }
}
