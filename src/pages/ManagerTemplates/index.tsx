import toast from 'react-hot-toast'
import { FaPlus } from 'react-icons/fa6'

import { useTemplateModal, useUser } from '~/hooks'
import { useQueryTemplates } from '~/queries'
import Spinner from '~/components/Spinner'
import { IoIosArrowBack } from 'react-icons/io'
import { IoIosArrowForward } from 'react-icons/io'
import TemplateTableRow from './TemplateTableRow'
import TemplateTableEmptyRow from './TemplateTableEmptyRow'
import { Template } from '~/queries/useQueryTemplates/fetch'
import { getRole } from '~/utils'
import { useState } from 'react'
import clsx from 'clsx'

function ManagerTemplatesPage() {
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(2)

  const { user } = useUser()
  const templateModal = useTemplateModal()
  const { data: templates, isLoading, refetch } = useQueryTemplates()

  const handleCreateNewTemplate = async () => {
    const role = await getRole(user?.id ?? '')
    if (role && !['admin', 'editor'].includes(role)) {
      return toast.error('You do not have access')
    }

    templateModal.onOpen()
    templateModal.setMode('create')
  }

  const startIndex = (currentPage - 1) * itemsPerPage
  // startIndex = (1 -1) * 2 = 0
  // startIndex = (2-1) *  2 = 2
  // startIndex = (3-1) *  2  = 4
  // array[0,1,2,3,4,5] => 0-1 2-3 4

  const visibleTemplates = templates?.slice(startIndex, startIndex + itemsPerPage)
  //Total pages need to be display
  // array 5 item => 5/2 = 2,2,1
  const totalPages = Math.ceil((templates?.length || 0) / itemsPerPage)

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }
  return (
    <div className="w-full flex flex-col gap-y-4">
      <div className="flex  sm:flex-row  items-center  justify-between">
        <h1 className="text-[22px] sm:text-2xl font-normal sm:mb-0">Manager templates</h1>
        <button
          className="flex items-center justify-center bg-blue-500 text-white px-2.5 py-2 sm:px-3 sm:py-2.5 rounded-md active:scale-95 transition-transform duration-300 flex-shrink-0"
          onClick={handleCreateNewTemplate}
        >
          <FaPlus className="w-[16px] h-[16px] lg:w-[18px] lg:h-[18px] mr-1 flex" />
          <span>New template</span>
        </button>
      </div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg ">
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
              visibleTemplates?.map((template) => (
                <TemplateTableRow key={template.id} template={template} onRefetch={refetch} />
              ))
            ) : (
              <TemplateTableEmptyRow />
            )}
          </tbody>
        </table>
        <div className="flex justify-end bg-white p-2 ">
          {/* Previous Page Button */}
          <button
            className={clsx(
              'mt-2 flex justify-center items-center border border-gray-500 hover:bg-gray-300 text-gray-900 w-6 h-6 rounded-full',
              { 'opacity-50 cursor-not-allowed': currentPage === 1 }
            )}
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <IoIosArrowBack />
          </button>
          {/* Render page number buttons */}
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              className={clsx('mt-2 px-2 ml-3 hover:bg-blue-300 rounded-full hover:text-white', {
                'font-medium text-white bg-blue-500': currentPage === index + 1
              })}
              key={index}
              onClick={() => handlePageChange(index + 1)}
              disabled={currentPage === index + 1}
            >
              {index + 1}
            </button>
          ))}
          {/* Next Page Button */}
          <button
            className={clsx(
              'mt-2 ml-3 flex justify-center items-center border border-gray-500 hover:bg-gray-300 text-gray-900 w-6 h-6 rounded-full',
              { 'opacity-50 cursor-not-allowed': currentPage === totalPages }
            )}
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            <IoIosArrowForward />
          </button>
        </div>
      </div>
    </div>
  )
}

export default ManagerTemplatesPage
