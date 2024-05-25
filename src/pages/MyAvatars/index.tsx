import { useUser } from '~/hooks'
import { MyAvatar } from '~/types'
import { useQueryMyAvatars } from '~/queries'
import Spinner from '~/components/Spinner'
import AvatarTableRow from './AvatarTableRow'
import AvatarTableEmpty from './AvatarTableEmpty'

function MyAvatars() {
  const { accessToken } = useUser()
  const { data: myAvatars, isLoading, refetch } = useQueryMyAvatars(accessToken ?? '')

  return (
    <div className="select-none">
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
    </div>
  )
}

export default MyAvatars
