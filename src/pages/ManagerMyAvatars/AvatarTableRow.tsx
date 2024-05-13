import clsx from 'clsx'
import { useEffect, useState } from 'react'

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

interface AvatarTableRowProps {
  id: number | string
  name: string
  thumbnail: string
  created_at: Date | string
}

function AvatarTableRow({ id, name, thumbnail, created_at }: AvatarTableRowProps) {
  const [isPreview, setIsPreview] = useState<boolean>(false)
  const [isDelete, setIsDelete] = useState<boolean>(false)

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
                <img src={thumbnail} alt="Preview Image" className="w-full h-full object-cover" />
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
      <td className="px-6 py-4">
        <button className="font-medium text-blue-600 hover:underline">Edit</button>
        <span className="px-1">/</span>
        <button
          className="font-medium text-red-600 hover:underline"
          onClick={() => setIsDelete(true)}
        >
          Delete
        </button>

        <div
          id="popup-modal"
          className={clsx(
            'overflow-y-auto overflow-x-hidden fixed top-0 left-1/2 -translate-x-1/2 z-50 transition-transform duration-500',
            {
              'translate-y-0 opacity-100': isDelete,
              '!-translate-y-56 duration-500': !isDelete
            }
          )}
        >
          <div className="relative p-4 w-full max-w-md max-h-full">
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
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
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
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>
                <h3 className="mb-5 text-lg font-normal text-gray-500">
                  Are you sure you want to delete "{name}" ?
                </h3>
                <button
                  type="button"
                  className="text-white bg-red-600 hover:bg-red-700 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center"
                >
                  Yes, I'm sure
                </button>
                <button
                  type="button"
                  className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700"
                  onClick={() => setIsDelete(false)}
                >
                  No, cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </td>
    </tr>
  )
}

export default AvatarTableRow
