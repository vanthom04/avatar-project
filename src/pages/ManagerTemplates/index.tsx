import toast from 'react-hot-toast'
import { FaPlus } from 'react-icons/fa6'

import { Template } from '~/types'
import { useQueryTemplates } from '~/queries'
import { useTemplateModal, useUser } from '~/hooks'
import Spinner from '~/components/Spinner'
import TemplateTableRow from './TemplateTableRow'
import TemplateTableEmptyRow from './TemplateTableEmptyRow'

function ManagerTemplatesPage() {
  const { accessToken, role } = useUser()
  const templateModal = useTemplateModal()
  const { data: templates, isLoading, refetch } = useQueryTemplates(accessToken ?? '')

  const handleCreateNewTemplate = async () => {
    if (role && !['admin', 'editor'].includes(role)) {
      return toast.error('You do not have access')
    }

    templateModal.onOpen()
    templateModal.setMode('create')
  }

  return (
    <div className="w-full flex flex-col gap-y-4">
      <div className="flex flex-row items-center justify-between">
        <h1 className="text-[22px] lg:text-2xl font-normal">Manager templates</h1>
        <button
          className="flex items-center justify-center bg-blue-500 text-white px-2.5 py-2 lg:px-3 lg:py-2.5 rounded-md active:scale-95 transition-transform duration-300"
          onClick={handleCreateNewTemplate}
        >
          <FaPlus className="w-[16px] h-[16px] lg:w-[18px] lg:h-[18px] mr-1" />
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
                    id="input-checkbox-all"
                    type="checkbox"
                    name="checkbox"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded"
                  />
                  <label htmlFor="input-checkbox-all" className="sr-only">
                    checkbox
                  </label>
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
            {isLoading ? (
              <tr className="bg-white">
                <td colSpan={5} className="p-4">
                  <Spinner className="mx-auto" />
                </td>
              </tr>
            ) : (templates as Template[]).length > 0 ? (
              templates?.map((template) => (
                <TemplateTableRow key={template.id} template={template} onRefetch={refetch} />
              ))
            ) : (
              <TemplateTableEmptyRow />
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ManagerTemplatesPage
