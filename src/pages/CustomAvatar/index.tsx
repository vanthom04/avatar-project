import { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import toast from 'react-hot-toast'
import { IoIosArrowRoundBack, IoMdArrowDropdown } from 'react-icons/io'
import { GoDownload, GoPencil } from 'react-icons/go'
import { BsCloudCheck } from 'react-icons/bs'
import { v4 as uuidv4 } from 'uuid'
import { PiSpinner } from 'react-icons/pi'
import { VscSymbolColor } from 'react-icons/vsc'
import { IoColorFillOutline } from 'react-icons/io5'
import { fabric } from 'fabric'
import clsx from 'clsx'

import { MyAvatar, Template } from '~/types'
import { downloadBase64Image, slugify } from '~/utils'
import { useQueryMyAvatars, useQueryTemplates } from '~/queries'
import { useDebounce, useRouter, useUser, useWindowSize } from '~/hooks'
import {
  deleteImageAvatar,
  insertMyAvatar,
  updateMyAvatar,
  uploadImageMyAvatar
} from '~/services/avatars'
import LayoutCategories from './LayoutCategories'

const colors = [
  '#FF0000',
  '#00FF00',
  '#0000FF',
  '#FFFF00',
  '#FF00FF',
  '#00FFFF',
  '#000000',
  '#808080',
  '#C0C0C0',
  '#FFFFFF'
]

const bgColors = [
  'transparent',
  '#FF0000',
  '#00FF00',
  '#0000FF',
  '#FFFF00',
  '#FF00FF',
  '#00FFFF',
  '#000000',
  '#808080',
  '#C0C0C0',
  '#fff'
]

export interface OptionType {
  id?: string
  type: 'hair' | 'eyes' | 'mouth' | 'accessory' | 'hand' | 'color' | 'background'
  value: string
}

function CustomAvatar() {
  const [isEdit, setIsEdit] = useState(false)
  const [isOpenOptions, setIsOpenOptions] = useState<boolean>(false)
  const [isOpenColor, setIsOpenColor] = useState<boolean>(false)
  const [isOpenBackgroundColor, setIsOpenBackgroundColor] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [color, setColor] = useState<string>('#000000')
  const [bgColor, setBgColor] = useState<string>('#fff')
  const [options, setOptions] = useState<OptionType[]>([])
  const [name, setName] = useState('Custom Avatar')
  const [template, setTemplate] = useState<Template>({} as Template)
  const [avatar, setAvatar] = useState<MyAvatar>({} as MyAvatar)

  const router = useRouter()
  const { accessToken, user } = useUser()
  const debouncedColor = useDebounce(color, 300)
  const debouncedBgColor = useDebounce(bgColor, 300)
  const params = useParams<{
    mode: 'create' | 'edit'
    templateId: string
    id?: string
  }>()
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const fabricCanvasRef = useRef<fabric.Canvas | null>(null)
  const inputRef = useRef<HTMLInputElement | null>(null)
  const inputTimer = useRef<NodeJS.Timeout | null>(null)

  const windowSize = useWindowSize()
  const { data: myAvatars } = useQueryMyAvatars(accessToken ?? '')
  const { data: templates } = useQueryTemplates(accessToken ?? '')

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        e.target instanceof Element &&
        !e.target.closest('#button-menu-options') &&
        !e.target.closest('#menu-options')
      ) {
        setIsOpenOptions(false)
      }

      if (
        e.target instanceof Element &&
        !e.target.closest('#button-select-color') &&
        !e.target.closest('#menu-color-options')
      ) {
        setIsOpenColor(false)
      }

      if (
        e.target instanceof Element &&
        !e.target.closest('#button-select-bg-color') &&
        !e.target.closest('#menu-bg-color-options')
      ) {
        setIsOpenBackgroundColor(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  useEffect(() => {
    if (params.mode === 'edit') {
      const avatar = myAvatars?.find((avatar) => +avatar.id === Number(params.id))
      const template = templates?.find((template) => template.id === params.templateId)
      if (template) setTemplate(template)
      if (avatar) {
        setAvatar(avatar)
        setName(avatar.name)
        if (avatar.options) setOptions(avatar.options as unknown as OptionType[])
      }
    } else {
      const template = templates?.find((template) => template.id === params.templateId)
      if (template) setTemplate(template)

      const defaultOptions: OptionType[] = []
      template?.categories.forEach((category) => {
        const option = category.options[0]
        if (option) {
          defaultOptions.push({
            id: option.id ?? '',
            type: category.type,
            value: option.image_url ?? ''
          })
        }
      })

      setOptions([
        ...defaultOptions,
        {
          type: 'background',
          value: '#fff'
        },
        {
          type: 'color',
          value: '#000000'
        }
      ])
    }
  }, [myAvatars, params.id, params.mode, params.templateId, templates])

  useEffect(() => {
    if (!canvasRef.current) return

    const canvas = new fabric.Canvas(canvasRef.current, {
      width: canvasRef.current.width,
      height: canvasRef.current.height,
      backgroundColor: options.find((opt) => opt.type === 'background')?.value || '#fff'
    })
    fabricCanvasRef.current = canvas

    options
      .filter((opt) => !['color', 'background'].includes(opt.type))
      .forEach((option) => {
        fabric.Image.fromURL(
          option.value,
          (image) => {
            image.scaleToWidth(canvas.getWidth())
            image.scaleToHeight(canvas.getHeight())

            image.filters?.push(
              new fabric.Image.filters.BlendColor({
                color: options.find((opt) => opt.type === 'color')?.value || '#000000',
                mode: 'tint'
              })
            )

            image.applyFilters()
            canvas.add(image)
          },
          { crossOrigin: 'anonymous' }
        )
      })
    canvas.renderAll()

    return () => {
      canvas.dispose()
    }
  }, [options])

  useEffect(() => {
    setOptions((prevOptions) => {
      const index = options.findIndex((opt) => opt.type === 'color')
      if (index !== -1) {
        options[index].value = debouncedColor
      }
      return [...prevOptions]
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedColor])

  useEffect(() => {
    setOptions((prevOptions) => {
      const index = options.findIndex((opt) => opt.type === 'background')
      if (index !== -1) {
        options[index].value = debouncedBgColor
      }
      return [...prevOptions]
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedBgColor])

  const handleOpenOptions = () => setIsOpenOptions(!isOpenOptions)
  const handleOpenColor = () => setIsOpenColor(!isOpenColor)
  const handleOpenBackgroundColor = () => setIsOpenBackgroundColor(!isOpenBackgroundColor)
  const handleClickEdit = () => {
    setIsEdit(true)

    if (inputTimer.current) {
      clearTimeout(inputTimer.current)
    }

    inputTimer.current = setTimeout(() => {
      inputRef.current?.focus()
      inputRef.current?.select()
    }, 0)
  }

  const handleSaveNameAvatar = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      if (!name) {
        setName('Custom Avatar')
      }
      setIsEdit(false)
    }
  }

  const handleBlurInput = () => {
    if (!name) {
      setName('Custom Avatar')
    }
    setIsEdit(false)
  }

  const handleDownload = () => {
    const dataUrl = fabricCanvasRef.current?.toDataURL({ format: 'image/png' }) ?? ''
    downloadBase64Image(dataUrl, 'custom_avatar.png')
  }

  const handleSelect = (
    id: string,
    type: 'hair' | 'eyes' | 'mouth' | 'accessory' | 'hand',
    value: string
  ) => {
    setOptions((prevOptions) => {
      const selectedIndex = options.findIndex((opt) => opt.type === type)
      if (selectedIndex !== -1) {
        options[selectedIndex].id = id
        options[selectedIndex].value = value
        return [...prevOptions]
      } else {
        return [...prevOptions, { type, id, value }]
      }
    })
  }

  const handleSaveAvatar = async () => {
    if (!accessToken) return
    setIsLoading(true)
    if (params.mode === 'create') {
      // handle create new avatar

      const uid = uuidv4()
      const slug = slugify(name)
      const imagePath = `${slug}/${slug}-${uid}.png`

      try {
        await insertMyAvatar(accessToken, {
          name,
          user_id: user?.id,
          template_id: template.id,
          image_path: imagePath,
          options
        })

        // handle upload image my avatar
        const dataUrl = fabricCanvasRef.current?.toDataURL({ format: 'image/png' }) ?? ''
        if (!dataUrl) {
          setIsLoading(false)
          return console.error('Failed to generate data URL from canvas.')
        }

        const blob = await fetch(dataUrl).then((res) => res.blob())
        const file = new File([blob], `${slugify(name)}.png`, { type: 'image/png' })

        try {
          // upload image my avatar
          await uploadImageMyAvatar(accessToken, file, imagePath)
        } catch (error) {
          setIsLoading(false)
          return toast.error((error as Error).message)
        }
      } catch (error) {
        setIsLoading(false)
        return toast.error((error as Error).message)
      }
    } else {
      // handle update avatar
      if (!params.id) return
      const uid = uuidv4()
      const slug = slugify(name)
      const imagePath = `${slug}/${slug}-${uid}.png`

      try {
        await updateMyAvatar(accessToken, params.id, {
          name,
          user_id: user?.id,
          template_id: template.id,
          image_path: imagePath,
          options,
          updated_at: new Date()
        })

        // handle upload image my avatar
        const dataUrl = fabricCanvasRef.current?.toDataURL({ format: 'image/png' }) ?? ''
        if (!dataUrl) {
          setIsLoading(false)
          return console.error('Failed to generate data URL from canvas.')
        }

        const blob = await fetch(dataUrl).then((res) => res.blob())
        const file = new File([blob], `${slugify(name)}.png`, { type: 'image/png' })

        try {
          // delete image my avatar
          await deleteImageAvatar(accessToken, avatar.image_path)

          // upload image my avatar
          await uploadImageMyAvatar(accessToken, file, imagePath)
        } catch (error) {
          setIsLoading(false)
          return toast.error((error as Error).message)
        }
      } catch (error) {
        setIsLoading(false)
        return toast.error((error as Error).message)
      }
    }

    toast.success('Save avatar successfully')
    setIsLoading(false)
    setIsOpenOptions(false)
  }

  return (
    <div className="max-h-screen h-screen select-none">
      <div className="h-[60px] px-6 py-2 font-medium">
        <div className="flex flex-row item-center justify-between">
          <button
            className="flex flex-row items-center bg-gray-400 text-white px-3 py-2 rounded-md outline-none"
            onClick={() => router.back()}
          >
            <IoIosArrowRoundBack size={24} />
            Back
          </button>

          <div className="relative min-w-56 flex justify-center items-center text-2xl">
            <h1
              className={clsx('absolute left-0 top-0 p-1 border border-transparent rounded', {
                hidden: isEdit
              })}
            >
              {name}
              <div
                className="absolute left-full top-1/2 -translate-y-1/2 ml-1.5 cursor-pointer p-2 hover:bg-gray-200 hover:rounded-full transition-all duration-300 select-none"
                onClick={handleClickEdit}
              >
                <GoPencil className="w-5 h-5" />
              </div>
            </h1>
            <input
              ref={inputRef}
              value={name}
              name="avatar"
              type="text"
              spellCheck="false"
              className={clsx(
                'w-56 absolute left-0 top-0 outline-none rounded p-1 border border-white hover:border-gray-700 transition-all duration-300 focus:border-gray-700 hidden',
                { '!block': isEdit }
              )}
              onChange={(e) => setName(e.target.value)}
              onKeyDown={handleSaveNameAvatar}
              onBlur={handleBlurInput}
            />
          </div>

          <div className="relative flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
            <button
              id="button-menu-options"
              className="flex flex-row justify-center items-center bg-blue-500 text-white py-2 px-3 rounded-md outline-none hover:bg-blue-700 active:scale-95 transition-transform duration-300"
              type="button"
              onClick={handleOpenOptions}
            >
              <span>Options</span>
              <IoMdArrowDropdown size={24} />
            </button>
            <div
              id="menu-options"
              className={clsx(
                'absolute top-[80%] right-0 z-50 my-4 text-base list-none bg-white divide-y divide-gray-200 rounded-lg shadow',
                { hidden: !isOpenOptions }
              )}
            >
              <ul className="py-2">
                <li>
                  <button
                    disabled={isLoading}
                    className="flex flex-row w-full text-left px-3 py-2 text-sm text-gray-800 hover:bg-gray-200"
                    onClick={handleSaveAvatar}
                  >
                    {isLoading ? (
                      <PiSpinner className="w-6 h-6 animate-spin mx-auto" />
                    ) : (
                      <div className="flex flex-row justify-center">
                        <BsCloudCheck size={22} />
                        <span className="ml-2">Save</span>
                      </div>
                    )}
                  </button>
                </li>
                <li>
                  <button
                    className="flex flex-row w-full text-left px-3 py-2 text-sm text-gray-800 hover:bg-gray-200"
                    onClick={handleDownload}
                  >
                    <GoDownload size={22} />
                    <span className="ml-2">Download</span>
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full h-[calc(100vh-60px)] bg-[#252627] flex">
        {/* LayoutCategories */}
        <LayoutCategories template={template} options={options} onSelect={handleSelect} />

        <div className="w-full basis-3/5 flex justify-center pl-4 flex-col items-center bg-[#ebecf0] relative">
          <div
            id="button-select-color"
            className="absolute left-6 top-6 bg-white rounded-lg p-3 flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse hover:bg-gray-300 cursor-pointer"
            onClick={handleOpenColor}
          >
            <button className="flex flex-row justify-center items-center" type="button">
              <span>
                <VscSymbolColor size={24} />
              </span>
            </button>
            <div
              id="menu-color-options"
              className={clsx(
                'absolute top-[80%] right-0 z-50 my-4 text-base list-none bg-white divide-y divide-gray-200 rounded-lg shadow',
                { hidden: !isOpenColor }
              )}
            >
              <div className="w-full flex flex-col gap-y-1 p-3">
                <h2 className="w-full text-left font-medium ml-2 mb-2">Bảng màu</h2>
                <input
                  type="color"
                  width={30}
                  height={30}
                  className="w-14 h-14 p-1 border rounded-md bg-white border-gray-500 cursor-pointer"
                  onChange={(e) => setColor(e.target.value)}
                />
              </div>
              <div className="w-full flex flex-col gap-y-1 p-3">
                <div className="flex flex-row">
                  <VscSymbolColor size={24} />
                  <h2 className="w-full text-left font-medium ml-2 mb-2">Màu sắc mặc định</h2>
                </div>
                <div className="grid grid-cols-4 w-[280px] gap-3">
                  {colors.map((color) => (
                    <div
                      key={color}
                      style={{ backgroundColor: color }}
                      className={clsx(
                        'flex flex-row w-14 h-14 bg-clip-content border rounded-md bg-white border-gray-500 cursor-pointer',
                        {
                          'p-1 border-2 !border-blue-500':
                            color &&
                            options.find((opt) => opt.type === 'color' && opt.value === color)
                        }
                      )}
                      onClick={() => setColor(color)}
                    ></div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div
            className="absolute left-6 top-20 bg-white rounded-lg p-3 flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse hover:bg-gray-300 cursor-pointer"
            onClick={handleOpenBackgroundColor}
          >
            <button
              id="button-select-bg-color"
              className="flex flex-row justify-center items-center"
              type="button"
            >
              <span>
                <IoColorFillOutline size={24} />
              </span>
            </button>
            <div
              id="menu-bg-color-options"
              className={clsx(
                'absolute top-[80%] right-0 z-50 my-4 text-base list-none bg-white divide-y divide-gray-200 rounded-lg shadow',
                { hidden: !isOpenBackgroundColor }
              )}
            >
              <div className="w-full flex flex-row gap-y-1 p-3">
                <div>
                  <h2 className="w-full text-left font-medium ml-2 mb-2">Bảng màu</h2>
                  <input
                    type="color"
                    width={30}
                    height={30}
                    className="w-14 h-14 p-1 border rounded-md bg-white border-gray-500 cursor-pointer"
                    onChange={(e) => setBgColor(e.target.value)}
                  />
                </div>
                <div className="ml-3">
                  <h2 className="w-full text-left font-medium ml-2 mb-2">Transparent</h2>
                </div>
              </div>
              <div className="w-full flex flex-col gap-y-1 p-3">
                <div className="flex flex-row">
                  <VscSymbolColor size={24} />
                  <h2 className="w-full text-left font-medium ml-2 mb-2">Màu sắc mặc định</h2>
                </div>
                <div className="grid grid-cols-4 w-[280px] gap-3">
                  {bgColors.map((bgColor) => (
                    <button
                      key={bgColor}
                      style={{ backgroundColor: bgColor }}
                      className={clsx(
                        'flex flex-row w-14 h-14 bg-clip-content border rounded-md border-gray-500 cursor-pointer',
                        {
                          'p-1 border-2 !border-blue-500':
                            bgColor &&
                            options.find(
                              (opt) => opt.type === 'background' && opt.value === bgColor
                            )
                        },
                        {
                          '!bg-[url("/assets/bg-transparent.jpg")]': bgColor === 'transparent'
                        }
                      )}
                      onClick={() => setBgColor(bgColor)}
                    ></button>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <canvas
            ref={canvasRef}
            width={windowSize.width > 1420 ? 620 : 520}
            height={windowSize.width > 1420 ? 620 : 520}
            className="pointer-events-none rounded-lg shadow-md"
          ></canvas>
        </div>
      </div>
    </div>
  )
}

export default CustomAvatar
