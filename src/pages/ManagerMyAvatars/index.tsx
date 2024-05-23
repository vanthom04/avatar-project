import { useEffect, useState } from 'react'
import { useQueryMyAvatars } from '~/queries'
import Spinner from '~/components/Spinner'
import AvatarTableRow from './AvatarTableRow'
import AvatarTableEmpty from './AvatarTableEmpty'
import { AvatarsType } from '~/types/avatars'

import { httpRequest } from '~/utils/httpRequest'
import { getImageUrl } from '~/utils'
import { useUser } from '~/hooks'

function ManagerMyAvatars() {
  const [dataMyAvatars, setDataMyAvatars] = useState<AvatarsType[]>([])

  const { isLoading, refetch } = useQueryMyAvatars()
  const { accessToken } = useUser()

  useEffect(() => {
    const fetchMyAvatars = async () => {
      try {
        const response = await httpRequest.get<AvatarsType[]>('rest/v1/my_avatars', {
          params: {
            select: '*'
          },
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
          }
        })
        setDataMyAvatars(response)
      } catch (error) {
        console.log(error)
      }
    }
    fetchMyAvatars()
  }, [accessToken])

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
            ) : (dataMyAvatars as AvatarsType[]).length > 0 ? (
              dataMyAvatars?.map((avatar) => (
                <AvatarTableRow
                  key={avatar.id}
                  id={avatar.id}
                  template_id={avatar.template_id}
                  name={avatar.name}
                  image_path={avatar.image_path}
                  thumbnail={getImageUrl('my_avatars', avatar.image_path)}
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

export default ManagerMyAvatars
