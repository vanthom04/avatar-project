import { useId, useEffect, useState } from 'react'
import { RefetchOptions } from '@tanstack/react-query'
import { PiSpinner } from 'react-icons/pi'
import toast from 'react-hot-toast'
import clsx from 'clsx'

import { getImageUrl, getRole, months } from '~/utils'
import { useTemplateModal, useUser } from '~/hooks'
import { Template } from '~/queries/useQueryTemplates/fetch'
import { supabase } from '~/config'

interface TemplateTableRowProps {
  template: Template
  onRefetch?: (options?: RefetchOptions | undefined) => void
}

function TemplateTableRow({ template, onRefetch }: TemplateTableRowProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isDelete, setIsDelete] = useState<boolean>(false)
  const [isPreview, setIsPreview] = useState<boolean>(false)

  const inputId = useId()
  const { user } = useUser()
  const templateModal = useTemplateModal()

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
    const role = await getRole(user?.id ?? '')
    if (role && !['admin', 'editor'].includes(role)) {
      return toast.error('You do not have access')
    }

    templateModal.onOpen()
    templateModal.setMode('edit')
    templateModal.setTemplate(template)
  }

  const handleOpenDialogDelete = async () => {
    const role = await getRole(user?.id ?? '')
    if (role && !['admin', 'editor'].includes(role)) {
      return toast.error('You do not have access')
    }

    setIsDelete(true)
  }

  const handleDeleteTemplate = async () => {
    setIsLoading(true)
    for (const category of template.categories) {
      for (const option of category.options) {
        // handle delete option in table options
        const { error: errorDeleteOption } = await supabase
          .from('options')
          .delete()
          .eq('id', option.id ?? '')
        if (errorDeleteOption) {
          return console.error('Error delete option: ', errorDeleteOption)
        }

        // handle delete image in storage
        if (!option.image_path) return
        const { error: errorDeleteImage } = await supabase.storage
          .from('template_options')
          .remove([option.image_path])
        if (errorDeleteImage) {
          return console.error('Error delete image: ', errorDeleteImage)
        }
      }

      // handle delete category in table categories
      const { error: errorDeleteCategory } = await supabase
        .from('categories')
        .delete()
        .eq('id', category.id ?? '')
      if (errorDeleteCategory) {
        return console.error('Error delete category: ', errorDeleteCategory)
      }
    }

    // handle delete template in table templates
    const { error: errorDeleteTemplate } = await supabase
      .from('templates')
      .delete()
      .eq('id', template.id ?? '')
    if (errorDeleteTemplate) {
      return console.error('Error delete template: ', errorDeleteTemplate)
    }

    // handle delete image template in storage
    const { error: errorImageTemplate } = await supabase.storage
      .from('templates')
      .remove([template.image_path])
    if (errorImageTemplate) {
      return console.error('Error delete image template: ', errorImageTemplate)
    }

    toast.success('Delete template successfully')
    setIsDelete(false)
    setIsLoading(false)
    onRefetch?.()
  }

  return (
    <tr className="bg-white border-b hover:bg-gray-50">
      <td className="w-4 p-4">
        <div className="flex items-center">
          <input
            id={`checkbox-${inputId}`}
            type="checkbox"
            name="checkbox"
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
          src={getImageUrl('templates', template.image_path)}
          alt={template.name}
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
                  src={getImageUrl('templates', template.image_path)}
                  alt="Preview Image"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </td>
      <td className="px-4 py-2 text-center">
        {`${new Date(template.created_at).getDate()} ${months[new Date(template.created_at).getMonth()]} ${new Date(template.created_at).getFullYear()}`}
      </td>
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
            'fixed top-0 left-0 right-0 bottom-0 bg-gray-900/60 backdrop-blur-sm hidden',
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
                  'absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center',
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
