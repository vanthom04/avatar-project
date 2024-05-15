import { useId, useEffect, useState } from 'react'
import clsx from 'clsx'

import { months } from '~/utils'
import { useTemplateModal } from '~/hooks'
import { Template } from '~/queries/useQueryTemplates/fetch'

interface TemplateTableRowProps {
  template: Template
}

function TemplateTableRow({ template }: TemplateTableRowProps) {
  const [isPreview, setIsPreview] = useState<boolean>(false)

  const inputId = useId()
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

  const handleEditTemplate = () => {
    templateModal.onOpen()
    templateModal.setMode('edit')
    templateModal.setTemplate(template)
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
          src={template.image_url}
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
                  src={template.image_url}
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
        <button className="font-medium text-red-600 hover:underline">Delete</button>
      </td>
    </tr>
  )
}

export default TemplateTableRow
