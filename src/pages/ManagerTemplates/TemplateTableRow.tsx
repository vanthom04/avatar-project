import { useId, useEffect, useState } from 'react'
import { PiSpinner } from 'react-icons/pi'
import toast from 'react-hot-toast'
import { format } from 'date-fns'
import clsx from 'clsx'

import { Template } from '~/types'
import { useTemplateModal, useUser } from '~/hooks'
import {
  deleteImageTemplate,
  deleteImageTemplateOption,
  deleteTemplate,
  deleteTemplateCategory,
  deleteTemplateOption
} from '~/services/templates'
import { actions, useGlobalContext } from '~/context'

interface TemplateTableRowProps {
  template: Template
  selected: boolean
  onSelect: () => void
}

function TemplateTableRow({ template, selected, onSelect }: TemplateTableRowProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isDelete, setIsDelete] = useState<boolean>(false)
  const [isPreview, setIsPreview] = useState<boolean>(false)

  const inputId = useId()
  const { accessToken, role } = useUser()
  const templateModal = useTemplateModal()
  const [, dispatch] = useGlobalContext()

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (e.target instanceof Element && e.target.closest('#modal-preview-image')) {
        setIsPreview(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleEditTemplate = async () => {
    if (role && !['admin', 'editor'].includes(role)) {
      return toast.error('You do not have access')
    }

    templateModal.onOpen()
    templateModal.setMode('edit')
    templateModal.setTemplate(template)
  }

  const handleOpenDialogDelete = async () => {
    if (role && !['admin', 'editor'].includes(role)) {
      return toast.error('You do not have access')
    }

    setIsDelete(true)
  }

  const handleDeleteTemplate = async () => {
    if (!accessToken) return

    setIsLoading(true)

    try {
      const deleteOptionPromises = []
      const deleteImagePromises = []

      for (const category of template.categories) {
        for (const option of category.options) {
          deleteOptionPromises.push(deleteTemplateOption(accessToken, option.id))

          if (option.image_path) {
            deleteImagePromises.push(deleteImageTemplateOption(accessToken, option.image_path))
          }
        }
      }

      await Promise.all(deleteOptionPromises)
      await Promise.all(deleteImagePromises)

      const deleteCategoryPromises = template.categories.map((category) =>
        deleteTemplateCategory(accessToken, category.id)
      )

      await Promise.all(deleteCategoryPromises)

      await deleteTemplate(accessToken, template.id)

      if (template.image_path) {
        await deleteImageTemplate(accessToken, template.image_path)
      }

      dispatch(actions.removeTemplate(template.id))

      toast.success('Delete template successfully')
    } catch (error) {
      toast.error((error as Error).message)
    } finally {
      setIsLoading(false)
      setIsDelete(false)
    }
  }

  return (
    <tr className="bg-white border-b hover:bg-gray-50">
      <td className="w-4 p-4">
        <div className="flex items-center">
          <input
            id={`checkbox-${inputId}`}
            checked={selected}
            type="checkbox"
            name="checkbox"
            onChange={onSelect}
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded"
          />
          <label htmlFor={`checkbox-${inputId}`} className="sr-only">
            checkbox
          </label>
        </div>
      </td>
      <th scope="row" className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap">
        {template.name}
      </th>
      <td className="px-4 py-2 flex items-center justify-center">
        <img
          className="object-cover w-16 h-16 cursor-pointer"
          src={template.image_url}
          alt={template.name}
          loading="lazy"
          onClick={() => setIsPreview(true)}
        />
        <div
          role="dialog"
          id="modal-preview-image"
          className={clsx('fixed inset-0 z-50 overflow-y-auto', {
            'block animate-fade-in': isPreview,
            'hidden animate-fade-out': !isPreview
          })}
        >
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-gray-900 bg-opacity-30 transition-opacity"></div>
            <div className="rounded-lg inline-block overflow-hidden shadow-xl transform transition-all sm:align-middle sm:max-w-lg sm:w-full absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              <div id="model-image-preview" className="bg-white sm:p-6 sm:pb-4">
                <img
                  src={template.image_url}
                  alt="Preview Image"
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </td>
      <td className="px-4 py-2 text-center">{format(new Date(template.created_at), 'PP')}</td>
      <td className="px-4 py-2 text-center">
        <button className="font-medium text-blue-600 hover:underline" onClick={handleEditTemplate}>
          Edit
        </button>
        <span className="mx-0.5">/</span>
        <button
          className="font-medium text-red-600 hover:underline"
          onClick={handleOpenDialogDelete}
        >
          Delete
        </button>
        <div
          className={clsx(
            'fixed top-0 left-0 right-0 bottom-0 bg-gray-900/60 backdrop-blur-sm hidden z-30',
            { '!block': isDelete }
          )}
        ></div>
        <div
          className={clsx(
            'fixed top-0 left-1/2 -translate-x-1/2 z-50 transition-transform duration-500',
            {
              'translate-y-0 opacity-100': isDelete,
              '!-translate-y-60': !isDelete
            }
          )}
        >
          <div className="relative p-4 w-full max-w-md max-h-full">
            <div className="relative bg-white rounded-lg shadow">
              <button
                type="button"
                disabled={isLoading}
                className={clsx(
                  'absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center z-50',
                  {
                    'cursor-not-allowed': isLoading
                  }
                )}
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
                  Are you sure you want to delete "{template.name}"?
                </h3>
                <div className="w-full flex items-center justify-center">
                  <button
                    type="button"
                    disabled={isLoading}
                    className={clsx(
                      'min-w-24 h-10 text-white bg-red-600 hover:bg-red-700 font-normal rounded-lg text-sm flex items-center justify-center',
                      {
                        'cursor-not-allowed hover:!bg-red-600': isLoading
                      }
                    )}
                    onClick={handleDeleteTemplate}
                  >
                    {isLoading ? (
                      <PiSpinner className="w-6 h-6 animate-spin" />
                    ) : (
                      <span>Yes, I'm sure</span>
                    )}
                  </button>
                  <button
                    type="button"
                    disabled={isLoading}
                    className={clsx(
                      'min-w-24 h-10 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700',
                      {
                        'cursor-not-allowed hover:text-gray-900 hover:bg-white': isLoading
                      }
                    )}
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

export default TemplateTableRow
