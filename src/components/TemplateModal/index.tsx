import { useEffect, useRef, useState } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import { IoMdClose } from 'react-icons/io'
import { GoPencil } from 'react-icons/go'
import { PiSpinner } from 'react-icons/pi'
import { v4 as uuidv4 } from 'uuid'
import toast from 'react-hot-toast'
import clsx from 'clsx'

import { supabase } from '~/config'
import { slugify, months } from '~/utils'
import { useTemplateModal, useFormData } from '~/hooks'
import TabHead from './TabHead'

const initialName = 'Create new template'

const TemplateModal: React.FC = () => {
  const [name, setName] = useState<string>('')
  const [file, setFile] = useState<File | null>(null)
  const [createdAt, setCreatedAt] = useState<Date | string | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isEditName, setIsEditName] = useState<boolean>(false)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  const formData = useFormData()
  const templateModal = useTemplateModal()

  const inputRef = useRef<HTMLInputElement>(null)
  const inputTimer = useRef<NodeJS.Timeout | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (templateModal.mode === 'create') {
      setName(initialName)
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
  }

  const handleClose = () => {
    setName(initialName)
    setSelectedImage(null)
    setFile(null)
    formData.reset()
    templateModal.setTemplate(null)
    templateModal.onClose()
  }

  const handleSaveTemplate = async () => {
    if (templateModal.mode === 'create') {
      // Todo: handle create new template
      if (!name || !file || !formData.data) return toast.error('No data!')
      setIsLoading(true)

      const templateId = uuidv4()
      const slugName = slugify(name)
      const imagePath = `${slugName}/${slugName}-${templateId}.${file?.type.split('/')[1]}`
      const { error: errorTemplate } = await supabase.from('templates').insert({
        id: templateId,
        name,
        image_path: imagePath
      })
      if (errorTemplate) {
        setIsLoading(false)
        toast.error(errorTemplate.message)
        return console.log(errorTemplate)
      }

      const { error: errorUpload } = await supabase.storage
        .from('templates')
        .upload(imagePath, file, {
          cacheControl: '3600',
          upsert: false
        })
      if (errorUpload) {
        setIsLoading(false)
        toast.error(errorUpload.message)
        return console.log(errorUpload)
      }

      for (const data of formData.data) {
        const templateOptionsId = uuidv4()
        const { error: errorTemplateOptions } = await supabase.from('categories').insert({
          id: templateOptionsId,
          template_id: templateId,
          name: data.name,
          type: data.type
        })
        if (errorTemplateOptions) {
          setIsLoading(false)
          toast.error(errorTemplateOptions.message)
          return console.log(errorTemplateOptions)
        }

        for (const option of data.options) {
          if (!option.file) return

          const { error: errorOptions } = await supabase.from('options').insert({
            id: uuidv4(),
            template_options_id: templateOptionsId,
            name: option.name,
            image_path: option.image_path
          })
          if (errorOptions) {
            setIsLoading(false)
            toast.error(errorOptions.message)
            return console.log(errorOptions)
          }

          const { error: errorUploadOption } = await supabase.storage
            .from('template_options')
            .upload(option.image_path, option.file, {
              cacheControl: '3600',
              upsert: false
            })
          if (errorUploadOption) {
            setIsLoading(false)
            toast.error(errorUploadOption.message)
            return console.log(errorUploadOption)
          }
        }
      }

      toast.success('Create new template successfully')
    } else {
      // Todo: handle edit template
      if (!name || !formData.data) return toast.error('No data!')
      setIsLoading(true)

      const { template } = templateModal
      const { data: categories } = formData
      if (!template || !categories) return

      const slug = slugify(name)
      const imagePath = `${slug}/${slug}-${template.id}.${template.image_path.split('.')[1]}`
      const { error: errorUpdateTemplate } = await supabase
        .from('templates')
        .update({
          name,
          image_path: imagePath
        })
        .eq('id', template.id)
      if (errorUpdateTemplate) {
        setIsLoading(false)
        toast.error(errorUpdateTemplate.message)
        return console.log(errorUpdateTemplate)
      }

      if (file) {
        const { error: errorUploadTemplate } = await supabase.storage
          .from('templates')
          .upload(imagePath, file, {
            cacheControl: '3600',
            upsert: true
          })
        if (errorUploadTemplate) {
          setIsLoading(false)
          toast.error(errorUploadTemplate.message)
          return console.log(errorUploadTemplate)
        }
        await supabase.storage.from('templates').remove([template.image_path])
      } else {
        const { error: errorMoveImageTemplate } = await supabase.storage
          .from('templates')
          .move(template.image_path, imagePath)
        if (errorMoveImageTemplate) {
          setIsLoading(false)
          toast.error(errorMoveImageTemplate.message)
          return console.log(errorMoveImageTemplate)
        }
      }

      for (const data of categories) {
        const id = template.categories.filter((c) => c.type === data.type)[0].id
        for (const option of data.options) {
          if (!option.file) return

          if (!option?.id) {
            const { error: errorOptions } = await supabase.from('options').insert({
              id: uuidv4(),
              template_options_id: id,
              name: option.name,
              image_path: option.image_path
            })
            if (errorOptions) {
              setIsLoading(false)
              toast.error(errorOptions.message)
              return console.log(errorOptions)
            }

            const { error: errorUploadOption } = await supabase.storage
              .from('template_options')
              .upload(option.image_path, option.file, {
                cacheControl: '3600',
                upsert: false
              })
            if (errorUploadOption) {
              setIsLoading(false)
              toast.error(errorUploadOption.message)
              return console.log(errorUploadOption)
            }
          }
        }
      }

      toast.success('Updated template successfully')
    }

    setIsLoading(false)
    handleClose()
  }

  return (
    <Dialog.Root open={templateModal.isOpen}>
      <Dialog.Portal>
        <Dialog.Overlay className="bg-neutral-900/80 backdrop-blur-sm fixed inset-0" />
        <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] lg:w-[65%] h-full max-h-[95vh] p-4 drop-shadow-md rounded-lg border border-neutral-700 bg-white focus:outline-none">
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
                'absolute left-0 top-0 outline-none rounded p-1 border border-white hover:border-gray-700 transition-all duration-300 focus:border-gray-700 hidden',
                { '!block': isEditName }
              )}
              onChange={(e) => setName(e.target.value)}
              onBlur={() => {
                setIsEditName(false)
                !name && setName(initialName)
              }}
            />
          </div>
          <div className="flex flex-col gap-y-2">
            <div className="relative w-[230px] h-[230px] rounded cursor-pointer overflow-hidden select-none border group">
              <img
                className="w-full h-full rounded-md shadow-sm object-cover border-none cursor-pointer fill-slate-500"
                src={selectedImage || '/assets/images/no-image.png'}
                alt={name}
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
              <p>
                Created at:{' '}
                {createdAt
                  ? `${new Date(createdAt).getDate()} ${months[new Date(createdAt).getMonth()]} ${new Date(createdAt).getFullYear()}`
                  : 'No date'}
              </p>
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
                    'cursor-not-allowed bg-opacity-55 hover:bg-opacity-55 hover:bg-red-500 active:scale-100':
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
                    'cursor-not-allowed hover:!bg-blue-500': isLoading
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