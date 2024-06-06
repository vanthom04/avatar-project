import clsx from 'clsx'
import { useEffect, useState } from 'react'
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io'
import { FaPlus } from 'react-icons/fa6'

import { useUser } from '~/hooks'
import { useQueryMyAvatars } from '~/queries'
import Spinner from '~/components/Spinner'
import AvatarTableRow from './AvatarTableRow'
import AvatarTableEmpty from './AvatarTableEmpty'
import NewAvatarModal from './NewAvatarModal'

function MyAvatars() {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 4

  const { accessToken } = useUser()
  const { data: myAvatars, isLoading, refetch } = useQueryMyAvatars(accessToken ?? '')

  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage

  const visibleAvatars = myAvatars?.slice(startIndex, endIndex)

  const totalPages = Math.ceil((myAvatars?.length || 0) / itemsPerPage)

  useEffect(() => {
    setCurrentPage(1)
  }, [myAvatars])

  const handlePageChange = (page: number) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page)
    }
  }

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
                  'mt-2 flex justify-center items-center border border-gray-500 hover:bg-gray-300 text-gray-900 w-6 h-6 rounded-full',
                  { 'opacity-50 cursor-not-allowed hover:bg-white': currentPage === 1 }
                )}
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                <IoIosArrowBack />
              </button>
              {Array.from({ length: totalPages }, (_, index) => (
                <button
                  className={clsx(
                    'mt-2 px-2 ml-3 text-white rounded-full bg-blue-300 hover:bg-blue-500',
                    {
                      'font-medium !bg-blue-500 hover:bg-blue-500': currentPage === index + 1
                    }
                  )}
                  key={index}
                  onClick={() => handlePageChange(index + 1)}
                  disabled={currentPage === index + 1}
                >
                  {index + 1}
                </button>
              ))}
              <button
                className={clsx(
                  'mt-2 ml-3 flex justify-center items-center border border-gray-500 hover:bg-gray-300 text-gray-900 w-6 h-6 rounded-full',
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
      {/* Modal new avatar */}
      <NewAvatarModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  )
}

export default MyAvatars
