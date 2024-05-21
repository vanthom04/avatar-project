import { useState } from 'react'
// import { useUser } from '~/hooks'
// import { uploadImageTemplate } from '~/services/templates'

function HomePage() {
  const [file, setFile] = useState<File | null>(null)
  // const { accessToken } = useUser()

  const handleUpload = async () => {
    if (!file) return
    // const res = await uploadImageTemplate(accessToken ?? ''mfile)
    // console.log(res)
  }

  return (
    <div className="w-full h-full flex items-center justify-center">
      <input type="file" onChange={(e) => e.target.files && setFile(e.target.files[0])} />
      <button onClick={handleUpload}>Upload</button>
      <h1 className="text-4xl">Home Page</h1>
    </div>
  )
}

export default HomePage
