import { useEffect, useRef, useState } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import { IoMdClose } from 'react-icons/io'
import { GoPencil } from 'react-icons/go'
import { PiSpinner } from 'react-icons/pi'
import { v4 as uuidv4 } from 'uuid'
import toast from 'react-hot-toast'
import { format } from 'date-fns'
import clsx from 'clsx'

import { getImageUrl, slugify } from '~/utils'
import { actions, useGlobalContext } from '~/context'
import { useTemplateModal, useFormData, useUser } from '~/hooks'
import {
  insertTemplate,
  uploadImageTemplate,
  insertTemplateCategory,
  insertTemplateOption,
  uploadImageTemplateOption,
  updateTemplate,
  deleteImageTemplate,
  moveImageTemplate
} from '~/services/templates'
import TabHead from './TabHead'
import { Category, Option, Template } from '~/types'

const initialName = 'Create new template'

const TemplateModal: React.FC = () => {
  const [name, setName] = useState<string>('')
  const [file, setFile] = useState<File | null>(null)
  const [createdAt, setCreatedAt] = useState<Date | string>(new Date())
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isEditName, setIsEditName] = useState<boolean>(false)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  const { accessToken } = useUser()
  const formData = useFormData()
  const [, dispatch] = useGlobalContext()
  const templateModal = useTemplateModal()

  const inputRef = useRef<HTMLInputElement>(null)
  const inputTimer = useRef<NodeJS.Timeout | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (templateModal.mode === 'create') {
      setName(initialName)
      setCreatedAt(new Date())
    } else {
      setName(templateModal.template?.name ?? '')
      setCreatedAt(templateModal.template?.created_at ?? '')
      setSelectedImage(templateModal.template?.image_url ?? '')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [templateModal.mode, templateModal.template])

  const handleClickEditName = () => {
    setIsEditName(true)

    if (inputTimer.current) {
      clearTimeout(inputTimer.current)
    }

    inputTimer.current = setTimeout(() => {
      inputRef.current?.focus()
      inputRef.current?.select()
    }, 0)
  }

  const handleSelectImage = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string)
      }
      setFile(file)
      reader.readAsDataURL(file)
    }

    // clear file
    e.target.value = ''
  }

  const handleClose = () => {
    setName(initialName)
    setSelectedImage(null)
    setFile(null)
    formData.reset()
    templateModal.setTemplate(null)
    templateModal.onClose()
  }
  console.log(formData.data)

  const handleSaveTemplate = async () => {
    if (!accessToken) return toast.error('No access token!')
    if (!name || !formData.data) return toast.error('No data!')

    try {
      if (templateModal.mode === 'create') {
        if (!file) return toast.error('No image file')
        setIsLoading(true)
        const template: Template = {} as Template

        const templateId = uuidv4()
        const slugName = slugify(name)
        const type = file?.type.split('/')[1]
        const imagePath = `${slugName}/${slugName}-${templateId}.${type}`

        // add template
        template.id = templateId
        template.name = name
        template.image_path = imagePath
        template.image_url = getImageUrl('templates', imagePath)
        template.created_at = new Date()
        template.updated_at = null

        await insertTemplate(accessToken, { id: templateId, name, image_path: imagePath })
        await uploadImageTemplate(accessToken, file, imagePath)

        const categories: Category[] = []
        await Promise.all(
          formData.data.map(async (data) => {
            const categoryId = uuidv4()
            await insertTemplateCategory(accessToken, {
              id: categoryId,
              template_id: templateId,
              name: data.name,
              type: data.type
            })

            const options: Option[] = []
            await Promise.all(
              data.options.map(async (option) => {
                if (option.file) {
                  const optionId = uuidv4()
                  await insertTemplateOption(accessToken, {
                    id: optionId,
                    category_id: categoryId,
                    name: option.name,
                    image_path: option.image_path
                  })
                  await uploadImageTemplateOption(accessToken, option.file, option.image_path)
                  options.push({
                    id: optionId,
                    category_id: categoryId,
                    name: option.name,
                    image_path: option.image_path,
                    image_url: getImageUrl('template_options', option.image_path),
                    created_at: new Date()
                  })
                }
              })
            )

            categories.push({
              id: categoryId,
              template_id: templateId,
              name: data.name,
              type: data.type,
              options,
              created_at: new Date()
            })
          })
        )

        dispatch(actions.addTemplate({ ...template, categories }))

        toast.success('Create new template successfully')
      } else {
        const { template } = templateModal
        const { data: categories } = formData

        if (!template || !categories) return
        setIsLoading(true)

        const slug = slugify(name)
        const type = template.image_path.split('.')[1]
        const imagePath = `${slug}/${slug}-${template.id}.${type}`

        const updatedTemplate: Template = {} as Template

        await updateTemplate(accessToken, template.id, {
          name,
          image_path: imagePath,
          updated_at: new Date()
        })

        // add updated template
        updatedTemplate.id = template.id
        updatedTemplate.name = name
        updatedTemplate.image_path = imagePath
        updatedTemplate.image_url = getImageUrl('templates', imagePath)
        updatedTemplate.created_at = template.created_at
        updatedTemplate.updated_at = new Date()

        if (file) {
          await deleteImageTemplate(accessToken, template.image_path)
          await uploadImageTemplate(accessToken, file, imagePath)
        } else {
          await moveImageTemplate(accessToken, {
            bucketId: 'templates',
            destinationKey: imagePath,
            sourceKey: template.image_path
          })
        }

        const updatedCategories: Category[] = []
        await Promise.all(
          categories.map(async (data) => {
            const category = template.categories.find((c) => c.type === data.type)
            const categoryId = category?.id

            const options: Option[] = []
            await Promise.all(
              data.options.map(async (option) => {
                if (!option.id) {
                  if (option.file) {
                    const optionId = uuidv4()
                    await insertTemplateOption(accessToken, {
                      id: optionId,
                      category_id: categoryId,
                      name: option.name,
                      image_path: option.image_path
                    })
                    await uploadImageTemplateOption(accessToken, option.file, option.image_path)

                    options.push({
                      id: optionId,
                      category_id: categoryId ?? '',
                      name: option.name,
                      image_path: option.image_path,
                      image_url: getImageUrl('template_options', option.image_path)
                    })
                  }
                } else {
                  options.push({
                    id: option?.id ?? '',
                    category_id: categoryId ?? '',
                    name: option.name,
                    image_path: option.image_path,
                    image_url: getImageUrl('template_options', option.image_path)
                  })
                }
              })
            )

            console.log(options)
            updatedCategories.push({
              id: categoryId ?? '',
              template_id: template.id,
              name: data.name,
              type: data.type,
              options
            })
          })
        )

        dispatch(actions.updateTemplate({ ...updatedTemplate, categories: updatedCategories }))

        toast.success('Updated template successfully')
      }
    } catch (error) {
      toast.error((error as Error).message)
    }

    setIsLoading(false)
    handleClose()
  }

  return (
    <Dialog.Root open={templateModal.isOpen}>
      <Dialog.Portal>
        <Dialog.Overlay className="bg-neutral-900/80 backdrop-blur-sm fixed z-50 inset-0" />
        <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] lg:w-[65%] h-full max-h-[95vh] p-4 drop-shadow-md rounded-lg border border-neutral-700 bg-white focus:outline-none z-50 animate-fade-in">
          <div className="relative text-2xl text-left mb-12">
            <h1
              className={clsx('absolute left-0 top-0 p-1 border border-transparent rounded', {
                hidden: isEditName
              })}
            >
              {name}
              <div
                className="absolute left-full top-1/2 -translate-y-1/2 ml-1.5 cursor-pointer p-2 hover:bg-gray-200 hover:rounded-full transition-all duration-300 select-none"
                onClick={handleClickEditName}
              >
                <GoPencil className="w-5 h-5" />
              </div>
            </h1>
            <input
              ref={inputRef}
              type="text"
              value={name}
              name="input-name"
              spellCheck="false"
              autoComplete="off"
              className={clsx(
                'absolute left-0 top-0 w-auto outline-none rounded p-1 border border-white hover:border-gray-700 transition-all duration-300 focus:border-gray-700 hidden',
                { '!block': isEditName }
              )}
              onChange={(e) => setName(e.target.value)}
              onBlur={() => {
                setIsEditName(false)
                !name && setName(initialName)
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  setIsEditName(false)
                  !name && setName(initialName)
                }
              }}
            />
          </div>
          <div className="flex flex-col gap-y-2">
            <div className="relative w-[230px] h-[230px] rounded cursor-pointer overflow-hidden select-none border group">
              <img
                className="w-full h-full rounded-md shadow-sm object-cover border-none cursor-pointer fill-slate-500"
                src={selectedImage || '/assets/images/no-image.png'}
                alt={name}
                loading="lazy"
              />
              <div
                className={clsx(
                  'absolute top-0 left-0 right-0 bottom-0 bg-gray-900 bg-opacity-35 items-center justify-center hidden group-hover:flex',
                  { 'cursor-not-allowed': isLoading }
                )}
                onClick={handleSelectImage}
              >
                <div className="text-white flex flex-col items-center justify-center">
                  <GoPencil className="w-10 h-10" />
                  <span>Chọn ảnh</span>
                </div>
              </div>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />
            <div>
              <p>Created at: {createdAt ? format(new Date(createdAt), 'PP') : 'No date'}</p>
            </div>
            <div className="w-full">
              <TabHead />
            </div>
            <div className="absolute right-[16px] bottom-[16px] flex items-center justify-end gap-x-3">
              <button
                disabled={isLoading}
                className={clsx(
                  'px-4 py-2 bg-red-500 hover:bg-red-600 rounded-lg text-white active:scale-95 transition-all duration-300',
                  {
                    'cursor-not-allowed bg-opacity-55 hover:!bg-red-500/55 active:!scale-100':
                      isLoading
                  }
                )}
                onClick={handleClose}
              >
                Cancel
              </button>
              <button
                disabled={isLoading}
                className={clsx(
                  'px-4 py-2 min-w-20 flex items-center justify-center bg-blue-500 hover:bg-blue-600 rounded-lg text-white active:scale-95 transition-all duration-300',
                  {
                    'cursor-not-allowed hover:!bg-blue-500 active:!scale-100': isLoading
                  }
                )}
                onClick={handleSaveTemplate}
              >
                {isLoading ? <PiSpinner className="w-6 h-6 animate-spin" /> : <span>Save</span>}
              </button>
            </div>
          </div>
          <Dialog.Close asChild>
            <button
              disabled={isLoading}
              className={clsx(
                'p-1.5 text-neutral-900 absolute top-[16px] right-[16px] inline-flex appearance-none items-center justify-center rounded-full focus:outline-none hover:bg-neutral-300 transition-colors duration-300',
                { 'cursor-not-allowed hover:bg-transparent': isLoading }
              )}
              onClick={handleClose}
            >
              <IoMdClose className="w-6 h-6" />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

export default TemplateModal
