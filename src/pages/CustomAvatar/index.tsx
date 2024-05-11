import { useEffect, useRef, useState } from 'react'
import { IoIosArrowRoundBack } from 'react-icons/io'
import clsx from 'clsx'
import { useRouter } from '~/hooks'
import { fabric } from 'fabric'

function CustomAvatar() {
  const [isEdit, setIsEdit] = useState(false)

  const router = useRouter()

  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    if (!canvasRef.current) return

    const canvas = new fabric.Canvas(canvasRef.current, {
      width: 580,
      height: 580,
      backgroundColor: '#fff'
    })

    fabric.Image.fromURL(
      'https://gcs.tripi.vn/public-tripi/tripi-feed/img/474015GCy/anh-gai-xinh-4.jpg',
      (image) => {
        image.scaleToWidth(canvas.getWidth())
        image.scaleToHeight(canvas.getHeight())

        canvas.add(image)
      }
    )

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
    <div>
      <div className="px-6 pt-3 font-medium">
        <div className="flex justify-between">
          <button
            className="flex flex-row items-center bg-gray-400 text-white px-3 py-2 rounded-lg"
            onClick={() => router.back()}
          >
            <IoIosArrowRoundBack size={22} />
            Back
          </button>
          <button className="bg-blue-500 text-white px-4 py-2 rounded-lg active:scale-95 transition-transform duration-300">
            Save
          </button>
        </div>
        <div className="relative">
          <h1
            onDoubleClick={() => setIsEdit(true)}
            className={clsx('text-2xl absolute translate-x-[600px] translate-y-[-40px]', {
              hidden: isEdit
            })}
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
      <div className="w-full h-screen flex flex-grow p-6 overflow-hidden">
        <div className="h-full flex flex-col items-center gap-y-4 mr-2">
          <canvas
            ref={canvasRef}
            className="pointer-events-none border border-gray-500 rounded-lg"
          ></canvas>
          <button className="px-3.5 py-2 bg-blue-500 font-medium rounded-lg text-white active:scale-95 transition-transform duration-300">
            Download
          </button>
        </div>
        <div className="w-full flex pl-4 flex-col">
          <div className="h-[500px] flex flex-col gap-y-4 overflow-y-auto">
            <div className="flex flex-col gap-y-1">
              <label className="text-base font-medium">Color</label>
              <input
                type="color"
                width={30}
                height={30}
                className="w-14 h-14 p-1 border rounded-md bg-white border-gray-500 cursor-pointer relative"
              />
            </div>
            <div className="flex flex-col gap-y-1">
              <label className="text-base font-medium">Background</label>
              <input
                type="color"
                width={30}
                height={30}
                className="w-14 h-14 p-1 border rounded-md bg-white border-gray-500 cursor-pointer relative"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CustomAvatar
