import config from '~/config'
import { useRouter } from '~/hooks'
import { useQueryMyAvatars } from '~/queries'
import AvatarTableRow from './AvatarTableRow'
import Spinner from '~/components/Spinner'

function ManagerMyAvatars() {
  const router = useRouter()
  const { data, isLoading } = useQueryMyAvatars()

  return (
    <div className="p-4">
      <div className="flex justify-end mb-4">
        <button
          onClick={() => router.push(config.routes.customAvatar)}
          type="button"
          className="flex justify-center items-center cursor-pointer text-white bg-[#138e1b] hover:bg-green-800 rounded-md px-3.5 py-1"
        >
          <span className="mr-2 text-[25px] text-center font-light">+</span>
          <span className="uppercase text-sm">new avatar</span>
        </button>
      </div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg  bg-gray-300">
        <table className="table-auto w-full text-sm text-left rtl:text-right text-gray-600">
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
            ) : (
              data?.map((data) => (
                <AvatarTableRow
                  key={data.id}
                  id={data.id}
                  name={data.name}
                  thumbnail={data.thumbnail}
                  created_at={data.created_at}
                />
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ManagerMyAvatars
