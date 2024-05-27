import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { PiSpinner } from 'react-icons/pi'
import { RefetchOptions } from '@tanstack/react-query'
import clsx from 'clsx'

import { supabase } from '~/config'
import { useRouter, useUser } from '~/hooks'
import { downloadBase64Image, months } from '~/utils'
import { deleteImageAvatar, deleteMyAvatar } from '~/services/avatars'

interface AvatarTableRowProps {
  id: number | string
  template_id: string
  name: string
  image_path: string
  thumbnail: string
  created_at: Date | string
  onRefetch?: (option?: RefetchOptions | undefined) => void
}

function AvatarTableRow({
  id,
  template_id,
  name,
  image_path,
  thumbnail,
  created_at,
  onRefetch
}: AvatarTableRowProps) {
  const [isPreview, setIsPreview] = useState<boolean>(false)
  const [isDelete, setIsDelete] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const router = useRouter()
  const { accessToken } = useUser()

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (e.target instanceof Element && !e.target.closest('#model-image-preview')) {
        setIsPreview(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const handleDeleteMyAvatar = async () => {
    if (!accessToken) return

    // handle delete my avatar
    try {
      await deleteMyAvatar(accessToken, String(id))

      // handle delete image in storage
      try {
        // delete image my avatar
        await deleteImageAvatar(accessToken, image_path)
      } catch (error) {
        setIsLoading(false)
        return toast.error((error as Error).message)
      }
    } catch (error) {
      setIsLoading(false)
      return toast.error((error as Error).message)
    }

    toast.success('Avatar deleted successfully')
    setIsDelete(false)
    onRefetch?.()
  }

  const handleDownloadAvatar = async () => {
    try {
      const { data, error } = await supabase.storage.from('my_avatars').download(image_path)

      if (error) throw error

      const dataUrl = URL.createObjectURL(data)

      downloadBase64Image(dataUrl, `${name}.${data.type.split('/').pop()}`)

      URL.revokeObjectURL(dataUrl)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <tr className="bg-white border-b">
      <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
        {id}
      </th>
      <td className="px-6 py-4">{name}</td>
      <td className="px-6 py-4 flex justify-center">
        <img
          src={thumbnail}
          alt={name}
          loading="lazy"
          className="w-16 h-16 cursor-pointer"
          onClick={() => setIsPreview(true)}
        />
        <div
          className={clsx('fixed inset-0 z-50 overflow-y-auto', {
            'block animate-fade-in': isPreview,
            'hidden animate-fade-out': !isPreview
          })}
          role="dialog"
        >
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-gray-900 bg-opacity-30 transition-opacity"></div>
            <div className="rounded-lg inline-block overflow-hidden shadow-xl transform transition-all sm:align-middle sm:max-w-lg sm:w-full absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              <div id="model-image-preview" className="bg-white sm:p-6 sm:pb-4">
                <img
                  src={thumbnail}
                  alt="Preview Image"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </td>
      <td className="px-6 py-4">
        {`${new Date(created_at).getDate()}
        ${months[new Date(created_at).getMonth()]}
        ${new Date(created_at).getFullYear()}`}
      </td>
      <td className="px-2 py-2">
        <button
          className="font-medium text-blue-600 hover:underline"
          onClick={() => router.push(`/custom-avatar/edit/${template_id}/${id}`)}
        >
          Edit
        </button>
        <span className="px-1">/</span>
        <button
          className="font-medium text-red-600 hover:underline"
          onClick={() => setIsDelete(true)}
        >
          Delete
        </button>
        <span className="px-1">/</span>
        <button
          className="font-medium text-green-600 hover:underline"
          onClick={handleDownloadAvatar}
        >
          Download
        </button>
        <div
          className={clsx(
            'fixed top-0 left-0 right-0 bottom-0 z-50 bg-neutral-800/45 backdrop-blur-sm hidden',
            { '!block': isDelete }
          )}
        ></div>
        <div
          className={clsx(
            'overflow-y-auto overflow-x-hidden fixed top-0 left-1/2 -translate-x-1/2 z-50 transition-transform duration-500',
            {
              'translate-y-0 opacity-100': isDelete,
              '-translate-y-96 md:-translate-y-64 duration-500': !isDelete
            }
          )}
        >
          <div className="relative p-4 w-[380px] md:w-full md:max-w-md max-h-full">
            <div className="relative bg-white rounded-lg shadow">
              <button
                type="button"
                className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
                onClick={() => setIsDelete(false)}
              >
                <svg
                  className="w-3 h-3"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Close</span>
              </button>
              <div className="p-4 md:p-5 text-center">
                <svg
                  className="mx-auto mb-4 text-red-500 w-12 h-12"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>
                <h3 className="mb-5 text-lg font-normal text-gray-500">
                  Are you sure you want to delete "{name}"?
                </h3>
                <div className="w-full flex flex-row items-center justify-center">
                  <button
                    disabled={isLoading}
                    type="button"
                    className="min-w-24 h-10 text-white bg-red-600 hover:bg-red-700 font-normal rounded-lg text-sm flex items-center justify-center"
                    onClick={() => {
                      setIsLoading(true)
                      handleDeleteMyAvatar()
                    }}
                  >
                    {isLoading ? (
                      <PiSpinner className="w-6 h-6 animate-spin" />
                    ) : (
                      <span>Yes, I'm sure</span>
                    )}
                  </button>
                  <button
                    disabled={isLoading}
                    type="button"
                    className="min-w-24 h-10 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700"
                    onClick={() => setIsDelete(false)}
                  >
                    No, cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </td>
    </tr>
  )
}

export default AvatarTableRow
