import { FaPlus } from 'react-icons/fa6'

import { useTemplateModal } from '~/hooks'
import { useQueryMyAvatars, useQueryTemplates } from '~/queries'
import TemplateTableRow from './TemplateTableRow'

function ManagerTemplatesPage() {
  const templateModal = useTemplateModal()
  const { data: myAvatars } = useQueryMyAvatars()
  const { data: templates } = useQueryTemplates()

  const handleCreateNewTemplate = () => {
    templateModal.onOpen()
    templateModal.setMode('create')
  }

  return (
    <div className="w-full flex flex-col gap-y-4">
      <div className="flex flex-row items-center justify-between">
        <h1 className="text-2xl font-normal">Manager templates</h1>
        <button
          className="flex items-center justify-center bg-blue-500 text-white px-3 py-2.5 rounded-md active:scale-95 transition-transform duration-300"
          onClick={handleCreateNewTemplate}
        >
          <FaPlus className="w-[18px] h-[18px] mr-1" />
          <span>New template</span>
        </button>
      </div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="p-4">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="checkbox"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded"
                  />
                  <label className="sr-only">checkbox</label>
                </div>
              </th>
              <th scope="col" className="px-4 py-2">
                Name
              </th>
              <th scope="col" className="px-4 py-2 text-center">
                Thumbnail
              </th>
              <th scope="col" className="px-4 py-2 text-center">
                Created at
              </th>
              <th scope="col" className="px-4 py-2 text-center">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {templates?.map((template) => (
              <TemplateTableRow
                key={template.id}
                id={template.id}
                name={template.name}
                thumbnail={template.image_url}
                created_at={template.created_at}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ManagerTemplatesPage
