import config from '~/config'
import { useRouter } from '~/hooks'

function ManagerMyAvatars() {
  const router = useRouter()

  return (
    <div className="p-4">
      <div className="flex justify-end">
        <button
          onClick={() => router.push(config.routes.customAvatar)}
          type="button"
          className="flex justify-center items-center cursor-pointer text-white bg-[#138e1b] hover:bg-green-800 rounded-md px-3.5 py-1 me-2 mb-4 focus:outline-none "
        >
          <span className="mr-2 text-[25px] text-center font-light">+</span>
          <span className="uppercase text-sm">Create avatar</span>
        </button>
      </div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg  bg-gray-300">
        <table className="w-full text-sm text-left rtl:text-right text-gray-600">
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
                Images
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
            <tr className="bg-white border-b">
              <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                1
              </th>
              <td className="px-6 py-4">Silver</td>
              <td className="px-6 py-4">Laptop</td>
              <td className="px-6 py-4">$2999</td>
              <td className="px-6 py-4">$2999</td>
              <td className="px-6 py-4">
                <a href="#" className="font-medium text-blue-600  hover:underline">
                  Edit
                </a>
                <span className="px-1">/</span>
                <a href="#" className="font-medium text-red-600  hover:underline">
                  Delete
                </a>
              </td>
            </tr>
            <tr className="bg-white border-b">
              <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                2
              </th>
              <td className="px-6 py-4">White</td>
              <td className="px-6 py-4">Laptop PC</td>
              <td className="px-6 py-4">$1999</td>
              <td className="px-6 py-4">$2999</td>
              <td className="px-6 py-4">
                <a href="#" className="font-medium text-blue-600  hover:underline">
                  Edit
                </a>
                <span className="px-1">/</span>
                <a href="#" className="font-medium text-red-600  hover:underline">
                  Delete
                </a>
              </td>
            </tr>
            <tr className="bg-white ">
              <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                3
              </th>
              <td className="px-6 py-4">Black</td>
              <td className="px-6 py-4">Accessories</td>
              <td className="px-6 py-4">$99</td>
              <td className="px-6 py-4">$2999</td>
              <td className="px-6 py-4">
                <a href="#" className="font-medium text-blue-600  hover:underline">
                  Edit
                </a>
                <span className="px-1">/</span>
                <a href="#" className="font-medium text-red-600  hover:underline">
                  Delete
                </a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ManagerMyAvatars
