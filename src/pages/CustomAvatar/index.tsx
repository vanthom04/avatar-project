import { useEffect, useRef, useState } from 'react'
import { IoIosArrowRoundBack } from 'react-icons/io'
import clsx from 'clsx'
import { fabric } from 'fabric'
import { BsCloudCheck } from 'react-icons/bs'

import { useRouter } from '~/hooks'
import LayoutCategories from './LayoutCategories'

function CustomAvatar() {
  const [isEdit, setIsEdit] = useState(false)

  const router = useRouter()

  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    if (!canvasRef.current) return

    const canvas = new fabric.Canvas(canvasRef.current, {
      width: 620,
      height: 620,
      backgroundColor: '#fff'
    })

    // fabric.Image.fromURL(
    //   'https://gcs.tripi.vn/public-tripi/tripi-feed/img/474015GCy/anh-gai-xinh-4.jpg',
    //   (image) => {
    //     image.scaleToWidth(canvas.getWidth())
    //     image.scaleToHeight(canvas.getHeight())

    //     canvas.add(image)
    //   }
    // )

    return () => {
      canvas.dispose()
    }
  }, [])

  const handleSaveNameAvatar = (e: React.KeyboardEvent) => {
    e.preventDefault()

    if (e.key === 'Enter') {
      setIsEdit(false)
    }
  }

  return (
    <div className="max-h-screen h-screen">
      <div className="h-[60px] px-6 py-2 font-medium">
        <div className="flex justify-between">
          <button
            className="flex flex-row items-center bg-gray-400 text-white px-3 py-2 rounded-md outline-none"
            onClick={() => router.back()}
          >
            <IoIosArrowRoundBack size={22} />
            Back
          </button>
          <button className="flex flex-row items-center bg-blue-500 text-white px-3 py-2 rounded-md active:scale-95 transition-transform duration-300 outline-none">
            <BsCloudCheck size={22} />
            <span className="ml-1">Save</span>
          </button>
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
        <LayoutCategories />
        {/* <div className="w-full flex flex-col pl-4">
          <div className="flex flex-col gap-y-4">
            <div className="flex flex-col gap-y-1">
              <label className="text-base font-medium text-white">Color</label>
              <input
                type="color"
                width={30}
                height={30}
                className="w-14 h-14 p-1 border rounded-md bg-white border-gray-500 cursor-pointer relative"
              />
            </div>
            <div className="flex flex-col gap-y-1">
              <label className="text-base font-medium text-white">Background</label>
              <input
                type="color"
                width={30}
                height={30}
                className="w-14 h-14 p-1 border rounded-md bg-white border-gray-500 cursor-pointer relative"
              />
            </div>
          </div>
        </div> */}
        <div className="w-full basis-3/5 flex justify-center pl-4 flex-col items-center bg-[#ebecf0]">
          <canvas ref={canvasRef} className="pointer-events-none rounded-lg shadow-md"></canvas>
        </div>
      </div>
    </div>
  )
}

export default CustomAvatar
