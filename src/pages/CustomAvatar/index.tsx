import { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import toast from 'react-hot-toast'
import { IoIosArrowBack, IoIosMore, IoMdArrowDropdown } from 'react-icons/io'
import { GoDownload, GoPencil } from 'react-icons/go'
import { BsCloudCheck } from 'react-icons/bs'
import { v4 as uuidv4 } from 'uuid'
import { PiSpinner } from 'react-icons/pi'
import { VscSymbolColor } from 'react-icons/vsc'
import { IoColorFillOutline } from 'react-icons/io5'
import { fabric } from 'fabric'
import clsx from 'clsx'

import { actions, useGlobalContext } from '~/context'
import { downloadBase64Image, getImageUrl, slugify } from '~/utils'
import { useDebounce, useRouter, useUser } from '~/hooks'
import { AvatarOption, CategoryType, MyAvatar, Template } from '~/types'
import {
  deleteImageAvatar,
  insertMyAvatar,
  updateMyAvatar,
  uploadImageMyAvatar
} from '~/services/avatars'
import LayoutCategories from './LayoutCategories'
import Avatar from './Avatar'

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

type ParamsType = {
  mode: 'create' | 'edit'
  templateId: string
  id?: string
}

function CustomAvatar() {
  const [fabricCanvas, setFabricCanvas] = useState<fabric.Canvas | null>(null)
  const [isEdit, setIsEdit] = useState(false)
  const [isOpenOptions, setIsOpenOptions] = useState<boolean>(false)
  const [isOpenColor, setIsOpenColor] = useState<boolean>(false)
  const [isOpenBackgroundColor, setIsOpenBackgroundColor] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [color, setColor] = useState<string>('#000000')
  const [bgColor, setBgColor] = useState<string>('#fff')
  const [options, setOptions] = useState<AvatarOption[]>([])
  const [name, setName] = useState('Custom Avatar')
  const [template, setTemplate] = useState<Template>({} as Template)
  const [avatar, setAvatar] = useState<MyAvatar>({} as MyAvatar)

  const router = useRouter()
  const { accessToken, user } = useUser()
  const debouncedColor = useDebounce(color, 300)
  const debouncedBgColor = useDebounce(bgColor, 300)
  const params = useParams<ParamsType>()
  const inputRef = useRef<HTMLInputElement | null>(null)
  const inputTimer = useRef<NodeJS.Timeout | null>(null)

  const [state, dispatch] = useGlobalContext()
  const { myAvatars, templates } = state

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
      const template = templates?.find((template) => template.id === params.templateId)
      if (template) setTemplate(template)

      if (!avatar.id) {
        const newAvatar = myAvatars?.find((avatar) => avatar.id === params.id)
        if (newAvatar) {
          setAvatar(newAvatar)
          setName(newAvatar.name)
          if (newAvatar.options) setOptions(newAvatar.options as unknown as AvatarOption[])
        }
      }
    } else {
      const template = templates?.find((template) => template.id === params.templateId)
      if (template) setTemplate(template)

      if (options.length === 0) {
        const defaultOptions: AvatarOption[] = []
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
            id: null,
            type: 'background',
            value: '#fff'
          },
          {
            id: null,
            type: 'color',
            value: '#000000'
          }
        ])
      }
    }
  }, [avatar.id, myAvatars, options.length, params.id, params.mode, params.templateId, templates])

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
    const dataUrl = fabricCanvas?.toDataURL({ format: 'image/png' }) ?? ''
    downloadBase64Image(dataUrl, `${name}`)
    setIsOpenOptions(false)
  }

  const handleSelect = (id: string, type: CategoryType, value: string) => {
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
    if (!accessToken || !user?.id) return
    setIsLoading(true)
    if (params.mode === 'create') {
      // handle create new avatar

      const uid = uuidv4()
      const slug = slugify(name)
      const imagePath = `${slug}/${slug}-${uid}.png`

      try {
        const newAvatar = {
          id: uid,
          name,
          user_id: user.id,
          template_id: template.id,
          image_path: imagePath,
          options
        }
        await insertMyAvatar(accessToken, newAvatar)

        // handle upload image my avatar
        const dataUrl = fabricCanvas?.toDataURL({ format: 'image/png' }) ?? ''
        if (!dataUrl) {
          setIsLoading(false)
          return console.error('Failed to generate data URL from canvas.')
        }

        const blob = await fetch(dataUrl).then((res) => res.blob())
        const file = new File([blob], `${slugify(name)}.png`, { type: 'image/png' })

        try {
          // upload image my avatar
          await uploadImageMyAvatar(accessToken, file, imagePath)
          dispatch(
            actions.addMyAvatar({
              ...newAvatar,
              thumbnail: getImageUrl('my_avatars', newAvatar.image_path),
              created_at: new Date(),
              updated_at: null
            })
          )
        } catch (error) {
          return toast.error((error as Error).message)
        } finally {
          setIsLoading(false)
        }
      } catch (error) {
        return toast.error((error as Error).message)
      } finally {
        setIsLoading(false)
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
          image_path: imagePath,
          options,
          updated_at: new Date()
        })

        dispatch(
          actions.updateMyAvatar({
            id: params.id,
            name,
            user_id: user?.id,
            template_id: template.id,
            image_path: imagePath,
            thumbnail: getImageUrl('my_avatars', imagePath),
            options,
            created_at: avatar.created_at,
            updated_at: new Date()
          })
        )

        // handle upload image my avatar
        const dataUrl = fabricCanvas?.toDataURL({ format: 'image/png' }) ?? ''
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
          return toast.error((error as Error).message)
        } finally {
          setIsLoading(false)
        }
      } catch (error) {
        return toast.error((error as Error).message)
      } finally {
        setIsLoading(false)
      }
    }

    toast.success('Save avatar successfully')
    setIsLoading(false)
    setIsOpenOptions(false)
  }

  return (
    <div className="max-h-screen h-screen select-none">
      <div className="w-full h-[60px] flex flex-row items-center px-2 md:px-6 py-2 font-medium">
        <div className="w-full flex flex-row item-center justify-between">
          <button
            className="flex flex-row items-center bg-gray-400 text-white px-2 py-0 md:px-3 md:py-2 rounded-md outline-none"
            onClick={() => router.back()}
          >
            <IoIosArrowBack className="w-5 h-5" />
            <span className="hidden md:block">Back</span>
          </button>

          <div className="relative min-w-40 md:min-w-56 flex justify-center items-center text-xl md:text-2xl">
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
                'w-40 md:w-56 absolute left-0 top-0 outline-none rounded p-1 border border-white hover:border-gray-700 transition-all duration-300 focus:border-gray-700 hidden',
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
              className="flex flex-row justify-center items-center bg-blue-500 text-white py-2 px-3 rounded-md outline-none md:hover:bg-blue-600 active:scale-95 transition-transform duration-300"
              type="button"
              onClick={handleOpenOptions}
            >
              <span className="hidden md:block">Options</span>
              <IoMdArrowDropdown className="w-5 h-5 hidden md:block" />
              <IoIosMore className="w-5 h-5 md:hidden" />
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

      <div className="w-full h-[calc(100vh-60px)] bg-[#252627] flex flex-col-reverse md:flex-row">
        {/* LayoutCategories */}
        <LayoutCategories template={template} options={options} onSelect={handleSelect} />

        <div className="w-full basis-3/5 flex justify-center flex-col items-center bg-[#ebecf0] relative">
          <div
            id="button-select-color"
            className="w-12 h-12 absolute bottom-3 right-3 md:left-6 md:top-6 bg-white rounded-lg p-3 flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse md:hover:bg-gray-300 cursor-pointer"
            onClick={handleOpenColor}
          >
            <button className="flex flex-row justify-center items-center" type="button">
              <VscSymbolColor size={24} />
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
            className="w-12 h-12 absolute bottom-3 right-[70px] md:left-6 md:top-20 bg-white rounded-lg p-3 flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse md:hover:bg-gray-300 cursor-pointer"
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
                  <h2 className="w-full text-left font-medium mb-2">Bảng màu</h2>
                  <input
                    type="color"
                    width={30}
                    height={30}
                    className="w-14 h-14 p-1 border rounded-md bg-white border-gray-500 cursor-pointer"
                    onChange={(e) => setBgColor(e.target.value)}
                  />
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

          {/* Avatar preview */}
          <Avatar options={options} setFabricCanvas={setFabricCanvas} />
        </div>
      </div>
    </div>
  )
}

export default CustomAvatar
