import config from '~/config'
import { useRouter } from '~/hooks'
import { useQueryMyAvatars } from '~/queries'
import AvatarTableRow from './AvatarTableRow'
import Spinner from '~/components/Spinner'
import AvatarTableEmpty from './AvatarTableEmpty'
import { MyAvatar } from '~/types'
import { FaPlus } from 'react-icons/fa6'

function ManagerMyAvatars() {
  const router = useRouter()
  const { data: myAvatars, isLoading } = useQueryMyAvatars()

  return (
    <div className="select-none">
      <div className="flex justify-end mb-4">
        <button
          onClick={() => router.push(config.routes.customAvatar)}
          type="button"
          className="bg-[#138e1b] hover:bg-green-800 flex items-center justify-center text-white px-2.5 py-2 lg:px-3 lg:py-2.5 rounded-md active:scale-95 transition-all duration-300"
        >
          <FaPlus className="w-[16px] h-[16px] lg:w-[18px] lg:h-[18px] mr-1" />
          <span>New avatar</span>
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
            ) : (myAvatars as MyAvatar[]).length > 0 ? (
              myAvatars?.map((avatar) => (
                <AvatarTableRow
                  key={avatar.id}
                  id={avatar.id}
                  template_id={avatar.template_id}
                  name={avatar.name}
                  image_path={avatar.image_path}
                  thumbnail={avatar.thumbnail}
                  created_at={avatar.created_at}
                />
              ))
            ) : (
              <AvatarTableEmpty />
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ManagerMyAvatars
