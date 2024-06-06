import { useQueryMyAvatars } from '~/queries'
import Spinner from '~/components/Spinner'
import AvatarTableRow from './AvatarTableRow'
import AvatarTableEmpty from './AvatarTableEmpty'
import { useUser } from '~/hooks'
import { useState } from 'react'
import clsx from 'clsx'
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io'
import { FaPlus } from 'react-icons/fa6'

function MyAvatars() {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(4)

  const { accessToken } = useUser()
  const { data: myAvatars, isLoading, refetch } = useQueryMyAvatars(accessToken ?? '')

  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage

  const visibleAvatars = myAvatars?.slice(startIndex, endIndex)

  const totalPages = Math.ceil((myAvatars?.length || 0) / itemsPerPage)

  const handlePageChange = (page: number) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page)
    }
  }

  const getPaginationItems = (currentPage: number, totalPages: number) => {
    const pages = []
    const maxPagesToShow = 1

    if (totalPages <= 4) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      pages.push(1)

      if (currentPage > maxPagesToShow + 1) {
        pages.push('...')
      }

      const startPage = Math.max(2, currentPage - maxPagesToShow)
      const endPage = Math.min(totalPages - 1, currentPage + maxPagesToShow)

      for (let i = startPage; i <= endPage; i++) {
        pages.push(i)
      }

      if (currentPage < totalPages - maxPagesToShow - 1) {
        pages.push('...')
      }

      pages.push(totalPages)
    }
    return pages
  }

  const paginationItems = getPaginationItems(currentPage, totalPages)

  return (
    <>
      <div className="select-none">
        <div className="flex flex-row justify-end mb-3">
          <button
            className="flex items-center bg-blue-500 text-white px-2.5 py-2 lg:px-3 lg:py-2.5 rounded-md active:scale-95 transition-transform duration-300"
            onClick={() => setIsOpen(true)}
          >
            <FaPlus className="w-[16px] h-[16px] lg:w-[18px] lg:h-[18px] mr-1" />
            <span>New avatar</span>
          </button>
        </div>
        <div className="relative shadow-md rounded-lg overflow-hidden bg-gray-300">
          <div className="overflow-x-auto">
            <table className="table-auto sm:w-full text-sm text-left rtl:text-right text-gray-600">
              <thead className="text-xs text-center text-white uppercase bg-[#0e64f1]">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    ID
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Thumbnail
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Created at
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="text-center">
                {isLoading ? (
                  <tr className="bg-white bg-opacity-50">
                    <th colSpan={5} className="w-full p-6">
                      <Spinner className="mx-auto text-white" />
                    </th>
                  </tr>
                ) : myAvatars && myAvatars.length > 0 ? (
                  visibleAvatars?.map((avatar) => (
                    <AvatarTableRow
                      key={avatar.id}
                      id={avatar.id}
                      template_id={avatar.template_id}
                      name={avatar.name}
                      image_path={avatar.image_path}
                      thumbnail={avatar.thumbnail ?? ''}
                      created_at={avatar.created_at}
                      onRefetch={refetch}
                    />
                  ))
                ) : (
                  <AvatarTableEmpty />
                )}
              </tbody>
            </table>
          </div>
          {myAvatars && myAvatars.length > 0 && (
            <div className="w-full flex justify-end items-center bg-white p-2">
              <button
                className={clsx(
                  'mt-2 flex justify-center items-center border border-gray-400 hover:bg-gray-300 text-gray-900 w-6 h-6 rounded-full',
                  { 'opacity-50 cursor-not-allowed hover:bg-white': currentPage === 1 }
                )}
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                <IoIosArrowBack />
              </button>
              {paginationItems.map((item, index) => (
                <button
                  className={clsx('text-sm mt-2 ml-3 rounded-full w-6 h-6', {
                    'hover:bg-blue-300 hover:text-white border border-gray-400': item !== '...',
                    'font-medium text-white bg-blue-500': currentPage === item,
                    'cursor-not-allowed': item === '...'
                  })}
                  key={index}
                  onClick={() => typeof item === 'number' && handlePageChange(item)}
                  disabled={item === '...'}
                >
                  {item}
                </button>
              ))}
              <button
                className={clsx(
                  'mt-2 ml-3 flex justify-center items-center border border-gray-400 hover:bg-gray-300 text-gray-900 w-6 h-6 rounded-full',
                  { 'opacity-50 cursor-not-allowed hover:bg-white': currentPage === totalPages }
                )}
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                <IoIosArrowForward />
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default MyAvatars
