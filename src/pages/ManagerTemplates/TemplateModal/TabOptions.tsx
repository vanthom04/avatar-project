import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import short from 'short-uuid'
import clsx from 'clsx'
import { FaPlus } from 'react-icons/fa6'

import { CategoryType } from '~/types'
import { deleteImageTemplateOption, deleteTemplateOption } from '~/services/templates'
import { Option, Category, initialData, useFormData, useTemplateModal, useUser } from '~/hooks'
import Spinner from '~/components/Spinner'
import OptionItem from './OptionItem'

interface TabOptionProps {
  tab: CategoryType
}

const TabOptions: React.FC<TabOptionProps> = ({ tab }) => {
  const [categories, setCategories] = useState<Category[]>([])
  const [category, setCategory] = useState<Category | undefined>()
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const { accessToken } = useUser()
  const templateModal = useTemplateModal()
  const formData = useFormData()

  useEffect(() => {
    if (templateModal.mode === 'create') {
      setCategories([...initialData])
    } else {
      const result: Category[] =
        templateModal.template?.categories.map((category) => ({
          name: category.name ?? '',
          type: category.type,
          options: category.options.map((option) => ({
            id: option.id,
            name: option.name ?? '',
            image_path: option.image_path ?? '',
            image_url: option.image_url ?? ''
          }))
        })) ?? []
      setCategories(result)
    }
  }, [templateModal.mode, templateModal.template?.categories])

  useEffect(() => {
    setCategory(categories.find((c) => c.type === tab))
  }, [tab, categories])

  const handleSelectFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files) return

    const options: Option[] = Array.from(files).map((file) => {
      const name = `${tab}-${short.generate()}`
      return {
        name,
        image_url: URL.createObjectURL(file),
        image_path: `${tab}/${name}.${file.type.split('/')[1]}`,
        file
      }
    })

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

    // clear files
    e.target.value = ''
  }

  const handleDeleteOption = async (id: string | null, index: number, imagePath?: string) => {
    if (!category) return
    setIsLoading(true)

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
        newCategories[newCategoryIndex].options = newOptions
      }
      return newCategories
    })

    console.log('render delete options')
    setIsLoading(false)
    toast.success('Remove option successfully')
  }

  return (
    <>
      <div className="p-2 w-full h-full max-h-[calc(35vh-80px)] grid grid-cols-8 xl:grid-cols-11 gap-2 lg:gap-3 overflow-auto select-none">
        {category?.options.map((option, index) => (
          <OptionItem
            key={index}
            index={index}
            option={option}
            onDeleteOption={handleDeleteOption}
          />
        ))}
        <div className="w-16 h-16 flex items-center justify-center">
          <label
            htmlFor="image-option-file"
            className="flex flex-col items-center justify-center w-16 h-16 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-10"
          >
            <FaPlus className="w-8 h-8 text-gray-400" />
            <input
              multiple
              type="file"
              accept="image/*"
              className="hidden"
              id="image-option-file"
              onChange={handleSelectFiles}
            />
          </label>
        </div>
      </div>
      <div
        className={clsx('fixed inset-0 items-center justify-center z-50 hidden', {
          '!flex': isLoading
        })}
      >
        <div className="w-[90px] h-[90px] bg-white rounded-xl shadow-md flex items-center justify-center">
          <Spinner className="w-10 h-10" />
        </div>
      </div>
    </>
  )
}

export default TabOptions
