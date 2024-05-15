import short from 'short-uuid'
import { FaPlus } from 'react-icons/fa6'

import { useFormData } from '~/hooks'
import { Option } from '~/hooks/useFormData'

interface TabOptionProps {
  tab: 'hair' | 'eyes' | 'mouth' | 'accessory' | 'hand'
}

const TabOptions: React.FC<TabOptionProps> = ({ tab }) => {
  const formData = useFormData()

  const category = formData.data.filter((c) => c.type === tab)[0]

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files) return

    const options: Option[] = []
    for (let i = 0; i < files.length; i++) {
      const name = `${category.type}-${short.generate()}`
      options.push({
        name,
        image_url: URL.createObjectURL(files[i]),
        image_path: `${category.type}/${name}.${files[i].type.split('/')[1]}`,
        file: files[i]
      })
    }

    formData.setOption(tab, options)
  }

  return (
    <div className="mt-2 w-full h-36 max-h-36 grid grid-cols-8 xl:grid-cols-11 gap-2 lg:gap-3 overflow-y-auto">
      {category.options.map((option, index) => (
        <div key={index} className="cursor-pointer">
          <img
            className="w-16 h-16 rounded-md border border-gray-300"
            src={option.image_url}
            alt={option.name}
          />
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
            onChange={handleChangeInput}
          />
        </label>
      </div>
    </div>
  )
}

export default TabOptions
