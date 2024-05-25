import { useEffect, useRef, useState } from 'react'
import clsx from 'clsx'
import short from 'short-uuid'
import toast from 'react-hot-toast'
import { CiCamera } from 'react-icons/ci'
import { GoPencil } from 'react-icons/go'

import { useUser } from '~/hooks'
import { supabase } from '~/config'
import { getImageUrl, slugify } from '~/utils'

function ProfilePage() {
  const [name, setName] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [phone, setPhone] = useState<string>('')
  const [selectedImage, setSelectedImage] = useState<string>('')
  const [isEditName, setIsEditName] = useState<boolean>(false)
  const [isEditPhone, setIsEditPhone] = useState<boolean>(false)

  const inputFileRef = useRef<HTMLInputElement | null>(null)
  const inputNameRef = useRef<HTMLInputElement | null>(null)
  const inputNameTimer = useRef<NodeJS.Timeout | null>(null)
  const inputPhoneRef = useRef<HTMLInputElement | null>(null)
  const inputPhoneTimer = useRef<NodeJS.Timeout | null>(null)

  const { user, role, userDetails, avatar, setAvatar } = useUser()

  useEffect(() => {
    if (userDetails) {
      setName(userDetails.full_name)
      setEmail(userDetails.email)
      setPhone(userDetails?.phone ?? '')
      setSelectedImage(getImageUrl('profile', avatar ?? ''))
    }
  }, [avatar, user, userDetails])

  const handleSelectImage = () => {
    if (inputFileRef.current) {
      inputFileRef.current.click()
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
      const type = file.type.split('/')[1]
      const imagePath = `${slugify(name)}/${slugify(name)}-${short.generate()}.${type}`
      try {
        const { error: updateUserError } = await supabase.auth.updateUser({
          data: {
            avatar: imagePath
          }
        })
        if (updateUserError) throw updateUserError

        if (avatar) {
          const { error: removeError } = await supabase.storage.from('profile').remove([avatar])
          if (removeError) throw removeError
        }

        const { error: uploadError } = await supabase.storage
          .from('profile')
          .upload(imagePath, file, { upsert: true })
        if (uploadError) throw uploadError

        toast.success('Avatar updated successfully')
      } catch (error) {
        toast.error((error as Error).message)
      }

      setSelectedImage(getImageUrl('profile', imagePath))
      setAvatar?.(imagePath)
    }
  }

  const handleErrorImage = () => {
    setSelectedImage('/assets/images/no-avatar.jpg')
  }

  const handleClickEditName = () => {
    setIsEditName(true)

    if (inputNameTimer.current) {
      clearTimeout(inputNameTimer.current)
    }

    inputNameTimer.current = setTimeout(() => {
      inputNameRef.current?.focus()
      inputNameRef.current?.select()
    }, 0)
  }

  const handleBlurInputName = () => {
    if (!name) {
      setName(userDetails?.full_name)
    }

    setIsEditName(false)
  }

  const handleUpdateName = async (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      if (!name) {
        return setName(userDetails?.full_name)
      }

      try {
        const { error } = await supabase.auth.updateUser({
          data: { full_name: name }
        })
        if (error) throw error

        setIsEditName(false)
        toast.success('Update name successfully')
      } catch (error) {
        return toast.error((error as Error).message)
      }
    }
  }

  const handleClickEditPhone = () => {
    setIsEditPhone(true)

    if (inputPhoneTimer.current) {
      clearTimeout(inputPhoneTimer.current)
    }

    inputPhoneTimer.current = setTimeout(() => {
      inputPhoneRef.current?.focus()
      inputPhoneRef.current?.select()
    }, 0)
  }

  const handleBlurInputPhone = () => {
    if (!phone) {
      setPhone(userDetails?.phone ?? '')
    }

    setIsEditPhone(false)
  }

  const handleUpdatePhone = async (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      if (!phone) {
        return setPhone(userDetails?.phone ?? '')
      }

      try {
        const { error } = await supabase.auth.updateUser({ data: { phone } })
        if (error) throw error

        setIsEditPhone(false)
        toast.success('Update phone successfully')
      } catch (error) {
        return toast.error((error as Error).message)
      }
    }
  }

  return (
    <div className="w-full h-full flex flex-col lg:flex-row">
      <div className="basis-2/5 flex flex-col items-center justify-center">
        <div className="mb-4 lg:mb-6 w-[180px] h-[180px] rounded-full relative cursor-pointer overflow-hidden border-[4px] border-[#f0eeff] select-none group">
          <img
            className="w-full h-full object-cover"
            src={selectedImage}
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
            ref={inputFileRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageChange}
          />
        </div>
        <div className="flex flex-col items-center gap-y-0.5 lg:gap-y-1">
          <h3 className="text-lg lg:text-xl font-medium">{name}</h3>
          <p>{email}</p>
        </div>
      </div>
      <div className="2/3 w-full flex items-center justify-center">
        <ul className="list-none w-full p-4 lg:p-12 select-none">
          <li className="w-full p-7 rounded-[10px] flex flex-row odd:bg-[#f0f5f8] even:bg-transparent">
            <div className="basis-1/6 lg:basis-1/5">Name</div>
            <span className="mx-6 lg:mx-12">:</span>
            <div className="basis-2/3 ml-8 lg:ml-0 xl:ml-6 relative">
              <div
                className={clsx('absolute p-1 border border-transparent rounded', {
                  hidden: isEditName
                })}
              >
                {name}
                <div
                  className="absolute left-full top-1/2 -translate-y-1/2 ml-1.5 cursor-pointer p-2 hover:bg-gray-200 hover:rounded-full transition-all duration-300 select-none"
                  onClick={handleClickEditName}
                >
                  <GoPencil className="w-4 h-4" />
                </div>
              </div>
              <input
                ref={inputNameRef}
                type="text"
                value={name}
                name="input-name"
                spellCheck="false"
                autoComplete="off"
                className={clsx(
                  'w-full absolute p-1 border border-transparent rounded text-base outline-none bg-transparent hover:border-gray-700 transition-all duration-300 focus:border-gray-700 hidden',
                  { '!block': isEditName }
                )}
                onChange={(e) => setName(e.target.value)}
                onBlur={handleBlurInputName}
                onKeyDown={handleUpdateName}
              />
            </div>
          </li>
          <li className="w-full p-7 rounded-[10px] flex flex-row odd:bg-[#f0f5f8] even:bg-transparent">
            <div className="basis-1/6 lg:basis-1/5">Email</div>
            <span className="mx-6 lg:mx-12">:</span>
            <div className="basis-2/3 ml-8 lg:ml-0 xl:ml-6 relative">
              <div className="p-1 border border-transparent">{email}</div>
            </div>
          </li>
          <li className="w-full p-7 rounded-[10px] flex flex-row odd:bg-[#f0f5f8] even:bg-transparent">
            <div className="basis-1/6 lg:basis-1/5">Phone</div>
            <span className="mx-6 lg:mx-12">:</span>
            <div className="basis-2/3 ml-8 lg:ml-0 xl:ml-6 relative">
              <div
                className={clsx('absolute p-1 border border-transparent rounded', {
                  hidden: isEditPhone
                })}
              >
                {phone || 'No phone'}
                <div
                  className="absolute left-full top-1/2 -translate-y-1/2 ml-1.5 cursor-pointer p-2 hover:bg-gray-200 hover:rounded-full transition-all duration-300 select-none"
                  onClick={handleClickEditPhone}
                >
                  <GoPencil className="w-4 h-4" />
                </div>
              </div>
              <input
                ref={inputPhoneRef}
                type="text"
                value={phone}
                name="input-phone"
                spellCheck="false"
                autoComplete="off"
                className={clsx(
                  'w-full absolute p-1 border border-transparent rounded text-base outline-none bg-transparent hover:border-gray-700 transition-all duration-300 focus:border-gray-700 hidden',
                  { '!block': isEditPhone }
                )}
                onChange={(e) => setPhone(e.target.value)}
                onBlur={handleBlurInputPhone}
                onKeyDown={handleUpdatePhone}
              />
            </div>
          </li>
          <li className="w-full p-7 rounded-[10px] flex flex-row odd:bg-[#f0f5f8] even:bg-transparent">
            <div className="basis-1/6 lg:basis-1/5">Status</div>
            <span className="mx-6 lg:mx-12">:</span>
            <p className="basis-2/3 ml-8 lg:ml-0 xl:ml-6">Active</p>
          </li>
          <li className="w-full p-7 rounded-[10px] flex flex-row odd:bg-[#f0f5f8] even:bg-transparent">
            <div className="basis-1/6 lg:basis-1/5">Role</div>
            <span className="mx-6 lg:mx-12">:</span>
            <p className="basis-2/3 ml-8 lg:ml-0 xl:ml-6">
              {role.charAt(0).toUpperCase() + role.substring(1)}
            </p>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default ProfilePage
