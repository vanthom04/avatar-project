import { useEffect, useRef, useState } from 'react'
import toast from 'react-hot-toast'
import { CiCamera } from 'react-icons/ci'

import { useUser } from '~/hooks'
import { supabase } from '~/config'
import { getImageUrl, slugify } from '~/utils'

function ProfilePage() {
  const [name, setName] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [phone, setPhone] = useState<string>('')
  const [selectedImage, setSelectedImage] = useState<string>('')

  const { user, role, userDetails } = useUser()
  const inputRef = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    if (userDetails) {
      setName(userDetails.full_name)
      setEmail(userDetails.email)
      setPhone(user?.phone ?? '')
      setSelectedImage(getImageUrl('profile', userDetails.avatar))
    }
  }, [user, userDetails])

  const handleSelectImage = () => {
    if (inputRef.current) {
      inputRef.current?.click()
    }
  }

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string)
      }
      reader.readAsDataURL(file)

      // upload and update avatar user
      const imagePath = `${slugify(name)}/${user?.id}.${file.type.split('.')[1]}`
      // userDetails && userDetails.avatar = imagePath
      try {
        await supabase.auth.updateUser({
          data: {
            avatar: imagePath
          }
        })

        try {
          await supabase.storage.from('profile').upload(imagePath, file, {
            cacheControl: '3600',
            upsert: true
          })
        } catch (error) {
          return toast.error((error as Error).message)
        }
      } catch (error) {
        return toast.error((error as Error).message)
      }
    }
  }

  const handleErrorImage = () => {
    setSelectedImage('/assets/images/no-avatar.jpg')
  }

  return (
    <div className="w-full h-full flex flex-row">
      <div className="basis-2/5 flex flex-col items-center justify-center">
        <div className="mb-6 w-[180px] h-[180px] rounded-full relative cursor-pointer overflow-hidden border-[4px] border-[#f0eeff] select-none group">
          <img
            className="w-full h-full object-cover"
            src={selectedImage || '/assets/images/no-avatar.jpg'}
            alt={name}
            onError={handleErrorImage}
          />
          <div
            className="absolute top-0 left-0 right-0 bottom-0 bg-gray-700 bg-opacity-40 hidden items-center justify-center group-hover:flex"
            onClick={handleSelectImage}
          >
            <CiCamera className="w-12 h-12 text-white" />
          </div>
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageChange}
          />
        </div>
        <div className="flex flex-col items-center gap-y-1">
          <h3 className="text-xl font-medium">{name}</h3>
          <p>{email}</p>
        </div>
      </div>
      <div className="2/3 w-full flex items-center justify-center">
        <ul className="list-none w-full p-12">
          <li className="w-full p-7 rounded-[10px] flex flex-row odd:bg-[#f0f5f8] even:bg-white">
            <label htmlFor="" className="basis-1/3">
              Name
            </label>
            <span className="mx-20">:</span>
            <p className="basis-2/3">{name}</p>
          </li>
          <li className="w-full p-7 rounded-[10px] flex flex-row odd:bg-[#f0f5f8] even:bg-white">
            <label htmlFor="" className="basis-1/3">
              Email
            </label>
            <span className="mx-20">:</span>
            <p className="basis-2/3">{email}</p>
          </li>
          <li className="w-full p-7 rounded-[10px] flex flex-row odd:bg-[#f0f5f8] even:bg-white">
            <label htmlFor="" className="basis-1/3">
              Phone
            </label>
            <span className="mx-20">:</span>
            <p className="basis-2/3">{phone || 'No phone'}</p>
          </li>
          <li className="w-full p-7 rounded-[10px] flex flex-row odd:bg-[#f0f5f8] even:bg-white">
            <label htmlFor="" className="basis-1/3">
              Status
            </label>
            <span className="mx-20">:</span>
            <p className="basis-2/3">Active</p>
          </li>
          <li className="w-full p-7 rounded-[10px] flex flex-row odd:bg-[#f0f5f8] even:bg-white">
            <label htmlFor="" className="basis-1/3">
              Role
            </label>
            <span className="mx-20">:</span>
            <p className="basis-2/3">{role.charAt(0).toUpperCase() + role.substring(1)}</p>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default ProfilePage
