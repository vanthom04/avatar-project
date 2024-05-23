import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import short from 'short-uuid'
import { FaPlus } from 'react-icons/fa6'
import { IoMdClose } from 'react-icons/io'

import {
  Option,
  Category,
  useFormData,
  useTemplateModal,
  initialData as defaultCategories,
  useUser
} from '~/hooks'
import { deleteImageTemplateOption, deleteTemplateOption } from '~/services/templates'

interface TabOptionProps {
  tab: 'hair' | 'eyes' | 'mouth' | 'accessory' | 'hand'
}

const TabOptions: React.FC<TabOptionProps> = ({ tab }) => {
  const [categories, setCategories] = useState<Category[]>([])
  const [category, setCategory] = useState<Category>()

  const { accessToken } = useUser()
  const templateModal = useTemplateModal()
  const formData = useFormData()

  useEffect(() => {
    if (templateModal.mode === 'create') {
      setCategories(defaultCategories)
    } else {
      const result: Category[] = []
      templateModal.template?.categories.forEach((category) => {
        const options = category.options.map((option) => ({
          id: option.id,
          name: option.name ?? '',
          image_path: option.image_path ?? '',
          image_url: option.image_url ?? ''
        }))
        result.push({
          name: category.name ?? '',
          type: category.type,
          options
        })
      })
      setCategories(result)
    }
  }, [templateModal.mode, templateModal.template?.categories])

  useEffect(() => {
    setCategory(categories.filter((c) => c.type === tab)[0])
  }, [tab, categories])

  const handleSelectFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files) return

    const options: Option[] = []
    for (const file of files) {
      const name = `${tab}-${short.generate()}`
      options.push({
        name,
        image_url: URL.createObjectURL(file),
        image_path: `${tab}/${name}.${file.type.split('/')[1]}`,
        file
      })
    }

    formData.setOptions(tab, options)
    setCategories((prevCategories) => {
      const newCategories = [...prevCategories]
      const newCategoryIndex = newCategories.findIndex((c) => c.type === tab)
      if (newCategoryIndex !== -1) {
        const newOptions = [...newCategories[newCategoryIndex].options, ...options]
        newCategories[newCategoryIndex] = {
          ...newCategories[newCategoryIndex],
          options: newOptions
        }
      }
      return newCategories
    })
  }

  const handleDeleteOption = async (id: string | null, index: number, imagePath?: string) => {
    if (!category) return
    if (id) {
      if (!accessToken) return
      try {
        await deleteTemplateOption(accessToken, id)
        imagePath && (await deleteImageTemplateOption(accessToken, imagePath))
      } catch (error) {
        return toast.error((error as Error).message)
      }
    }

    const newOptions = [...category.options]
    newOptions.splice(index, 1)
    formData.setOptions(tab, newOptions)
    setCategories((prevCategories) => {
      const newCategories = [...prevCategories]
      const newCategoryIndex = newCategories.findIndex((c) => c.type === tab)
      if (newCategoryIndex !== -1) {
        newCategories[newCategoryIndex] = {
          ...newCategories[newCategoryIndex],
          options: newOptions
        }
      }
      return newCategories
    })

    toast.success('Remove option successfully')
  }

  return (
    <div className="p-2 w-full h-full max-h-[calc(35vh-80px)] grid grid-cols-8 xl:grid-cols-11 gap-2 lg:gap-3 overflow-auto select-none">
      {category?.options.map((option, index) => (
        <div
          key={index}
          className="relative w-16 h-16 rounded-md overflow-hidden cursor-pointer border border-gray-300 group"
        >
          <img className="w-full h-full" src={option.image_url} alt={option.name} />
          <div className="absolute top-0 left-0 right-0 bottom-0 hidden items-center justify-center bg-neutral-400/35 group-hover:flex">
            <IoMdClose
              className="w-6 h-6 hover:text-red-500"
              onClick={() => handleDeleteOption(option.id ?? null, index, option.image_path)}
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
