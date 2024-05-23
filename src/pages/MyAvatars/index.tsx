import { MyAvatar } from '~/types'
import { useQueryMyAvatars } from '~/queries'
import Spinner from '~/components/Spinner'
import AvatarTableRow from './AvatarTableRow'
import AvatarTableEmpty from './AvatarTableEmpty'
import { useUser } from '~/hooks'
import { useEffect, useState } from 'react'
import clsx from 'clsx'
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io'

function MyAvatars() {
  const { accessToken } = useUser()
  const { data: myAvatars, isLoading, refetch } = useQueryMyAvatars(accessToken ?? '')

  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(5)

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
    <div className="select-none">
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg  bg-gray-300">
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
            ) : (myAvatars as MyAvatar[]).length > 0 ? (
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

export default MyAvatars
