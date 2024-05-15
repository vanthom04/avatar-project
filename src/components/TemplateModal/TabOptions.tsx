import short from 'short-uuid'
import { FaPlus } from 'react-icons/fa6'
import { IoMdClose } from 'react-icons/io'

import { supabase } from '~/config'
import { useFormData, Option } from '~/hooks'

interface TabOptionProps {
  tab: 'hair' | 'eyes' | 'mouth' | 'accessory' | 'hand'
}

const TabOptions: React.FC<TabOptionProps> = ({ tab }) => {
  const formData = useFormData()

  const category = formData.data?.filter((c) => c.type === tab)[0]

  const handleSelectFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || !category) return

    const options: Option[] = []
    for (const file of files) {
      const name = `${category?.type}-${short.generate()}`
      options.push({
        name,
        image_url: URL.createObjectURL(file),
        image_path: `${category?.type}/${name}.${file.type.split('/')[1]}`,
        file
      })
    }

    formData.setOptions(tab, [...category.options, ...options])
  }

  const handleDeleteOption = async (id: string | null, index: number) => {
    if (category) {
      if (id) {
        const { error: errorDeleteOption } = await supabase.from('options').delete().eq('id', id)
        if (errorDeleteOption) {
          console.error(errorDeleteOption)
        }
      }

      const newOptions = [...category.options]
      newOptions.splice(index, 1)
      formData.setOptions(tab, newOptions)
    }
  }

  return (
    <div className="mt-2 w-full h-36 max-h-36 grid grid-cols-8 xl:grid-cols-11 gap-2 lg:gap-3 overflow-y-auto">
      {category?.options.map((option, index) => (
        <div
          key={index}
          className="relative w-16 h-16 rounded-md overflow-hidden cursor-pointer group"
        >
          <img
            className="w-full h-full absolute border border-gray-300"
            src={option.image_url}
            alt={option.name}
          />
          <div className="absolute top-0 left-0 right-0 bottom-0 hidden items-center justify-center bg-neutral-400/35 group-hover:flex">
            <IoMdClose
              className="w-6 h-6 hover:text-red-500"
              onClick={() => handleDeleteOption(option.id ?? null, index)}
            />
          </div>
        </div>
      ))}
      <div className="w-16 h-16 flex items-center justify-center">
        <label
          htmlFor="dropzone-file"
          className="flex flex-col items-center justify-center w-16 h-16 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-10"
        >
          <FaPlus className="w-8 h-8 text-gray-400" />
          <input
            id="dropzone-file"
            type="file"
            multiple
            accept="image/*"
            className="hidden"
            onChange={handleSelectFiles}
          />
        </label>
      </div>
    </div>
  )
}

export default TabOptions
