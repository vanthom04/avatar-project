import { useEffect, useRef, useState } from 'react'
import { IoIosArrowRoundBack, IoMdArrowDropdown } from 'react-icons/io'
import clsx from 'clsx'
import { fabric } from 'fabric'
import { BsCloudCheck } from 'react-icons/bs'

import { useDebounce, useRouter } from '~/hooks'
import LayoutCategories from './LayoutCategories'
import { GoDownload } from 'react-icons/go'
import { VscSymbolColor } from 'react-icons/vsc'
import { IoColorFillOutline } from 'react-icons/io5'
import { downloadBase64Image } from '~/utils'

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

function CustomAvatar() {
  const [isEdit, setIsEdit] = useState(false)
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [isOpenColor, setIsOpenColor] = useState<boolean>(false)
  const [isOpenBackgroundColor, setIsOpenBackgroundColor] = useState<boolean>(false)
  const [color, setColor] = useState<string>('#000000')
  const [bgColor, setBgColor] = useState<string>('#ffffff')
  const [categories, setCategories] = useState<{ id: string; value: string }[]>([])

  const handleOpen = () => setIsOpen(!isOpen)
  const handleOpenColor = () => setIsOpenColor(!isOpenColor)
  const handleOpenBackgroundColor = () => setIsOpenBackgroundColor(!isOpenBackgroundColor)

  const router = useRouter()

  const debouncedColor = useDebounce(color, 300)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const fabricCanvasRef = useRef<fabric.Canvas | null>(null)

  useEffect(() => {
    if (!canvasRef.current) return

    const canvas = new fabric.Canvas(canvasRef.current, {
      width: 620,
      height: 620,
      backgroundColor: bgColor
    })

    fabricCanvasRef.current = canvas

    categories.forEach((category) => {
      fabric.Image.fromURL(
        category.value,
        (image) => {
          image.scaleToWidth(canvas.getWidth())
          image.scaleToHeight(canvas.getHeight())
          canvas.add(image)
        },
        { crossOrigin: 'anonymous' }
      )
    })

    return () => {
      canvas.dispose()
    }
  }, [bgColor, categories])

  useEffect(() => {
    if (!fabricCanvasRef.current) return
    fabricCanvasRef.current.forEachObject((obj) => {
      if (obj instanceof fabric.Image) {
        obj.filters?.push(
          new fabric.Image.filters.BlendColor({
            color: debouncedColor,
            mode: 'tint'
          })
        )
        obj.applyFilters()
      }
    })
    fabricCanvasRef.current.renderAll()
  }, [debouncedColor])

  const handleSaveNameAvatar = (e: React.KeyboardEvent) => {
    e.preventDefault()

    if (e.key === 'Enter') {
      setIsEdit(false)
    }
  }

  const handleDownload = () => {
    const dataUrl = fabricCanvasRef.current?.toDataURL({ format: 'image/png' }) ?? ''
    downloadBase64Image(dataUrl, 'custom_avatar.png')
  }

  const handleSelect = (id: string, value: string) => {
    setCategories((prevState) => {
      const selectedIndex = categories.findIndex((c) => c.id === id)
      if (selectedIndex !== -1) {
        categories[selectedIndex].value = value
        return [...prevState]
      } else {
        return [
          ...prevState,
          {
            id,
            value
          }
        ]
      }
    })
  }

  return (
    <div className="max-h-screen h-screen">
      <div className="h-[60px] px-6 py-2 font-medium">
        <div className="flex justify-between">
          <button
            className="flex flex-row items-center bg-gray-400 text-white px-3 py-2 rounded-md outline-none"
            onClick={() => router.back()}
          >
            <IoIosArrowRoundBack size={24} />
            Back
          </button>

          <div className="relative flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
            <button
              id="button-user-menu"
              className="flex flex-row justify-center items-center bg-blue-500 text-white py-2 px-3 rounded-md outline-none hover:bg-blue-700 active:scale-95 transition-transform duration-300"
              type="button"
              onClick={handleOpen}
            >
              <span>Options</span>
              <IoMdArrowDropdown size={24} />
            </button>
            <div
              id="menu-options"
              className={clsx(
                'absolute top-[80%] right-0 z-50 my-4 text-base list-none bg-white divide-y divide-gray-200 rounded-lg shadow',
                { hidden: !isOpen }
              )}
            >
              <ul className="py-2">
                <li>
                  <button className="flex flex-row w-full text-left px-3 py-2 text-sm text-gray-800 hover:bg-gray-200">
                    <BsCloudCheck size={22} />
                    <span className="ml-2">Save</span>
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
        <div className="relative">
          <h1
            onDoubleClick={() => setIsEdit(true)}
            className={clsx(
              'text-2xl absolute translate-x-[600px] translate-y-[-40px] text-black',
              {
                hidden: isEdit
              }
            )}
          >
            Custom Avatar
          </h1>
          <input
            value={'Custom Avatar'}
            type="text"
            className={clsx(
              'outline-none text-2xl absolute translate-x-[600px] translate-y-[-40px] hidden',
              {
                '!block': isEdit
              }
            )}
            onKeyDown={handleSaveNameAvatar}
            onChange={() => {}}
          />
        </div>
      </div>
      <div className="w-full h-[calc(100vh-60px)] bg-[#252627] flex">
        {/* LayoutCategories */}
        <LayoutCategories onSelect={handleSelect} />

        <div className="w-full basis-3/5 flex justify-center pl-4 flex-col items-center bg-[#ebecf0] relative">
          <div className="absolute left-6 top-6 bg-white rounded-lg p-3 flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse hover:bg-gray-300">
            <button
              id="button-user-menu"
              className="flex flex-row justify-center items-center"
              type="button"
              onClick={handleOpenColor}
            >
              <span>
                <VscSymbolColor size={24} />
              </span>
            </button>
            <div
              id="menu-options"
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
                      className="flex flex-row w-14 h-14 p-1 border rounded-md bg-white border-gray-500 cursor-pointer"
                      onClick={() => setColor(color)}
                    ></div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="absolute left-6 top-20 bg-white rounded-lg p-3 flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse hover:bg-gray-300">
            <button
              id="button-user-menu"
              className="flex flex-row justify-center items-center"
              type="button"
              onClick={handleOpenBackgroundColor}
            >
              <span>
                <IoColorFillOutline size={24} />
              </span>
            </button>
            <div
              id="menu-options"
              className={clsx(
                'absolute top-[80%] right-0 z-50 my-4 text-base list-none bg-white divide-y divide-gray-200 rounded-lg shadow',
                { hidden: !isOpenBackgroundColor }
              )}
            >
              <div className="w-full flex flex-col gap-y-1 p-3">
                <h2 className="w-full text-left font-medium ml-2 mb-2">Bảng màu</h2>
                <input
                  type="color"
                  width={30}
                  height={30}
                  className="w-14 h-14 p-1 border rounded-md bg-white border-gray-500 cursor-pointer"
                  onChange={(e) => setBgColor(e.target.value)}
                />
              </div>
              <div className="w-full flex flex-col gap-y-1 p-3">
                <div className="flex flex-row">
                  <VscSymbolColor size={24} />
                  <h2 className="w-full text-left font-medium ml-2 mb-2">Màu sắc mặc định</h2>
                </div>
                <div className="grid grid-cols-4 w-[280px] gap-3">
                  {colors.map((color) => (
                    <button
                      key={color}
                      style={{ backgroundColor: color }}
                      className="flex flex-row w-14 h-14 p-1 border rounded-md bg-white border-gray-500 cursor-pointer"
                      onClick={() => setBgColor(color)}
                    ></button>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <canvas ref={canvasRef} className="pointer-events-none rounded-lg shadow-md"></canvas>
        </div>
      </div>
    </div>
  )
}

export default CustomAvatar
