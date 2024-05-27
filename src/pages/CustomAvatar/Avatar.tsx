import { useEffect, useRef } from 'react'
import { fabric } from 'fabric'

import { useWindowSize } from '~/hooks'
import { AvatarOption } from '~/types'

interface AvatarProps {
  options: AvatarOption[]
  setFabricCanvas?: (canvas: fabric.Canvas) => void
}

const Avatar: React.FC<AvatarProps> = ({ options, setFabricCanvas }) => {
  const windowSize = useWindowSize()

  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const fabricRef = useRef<fabric.Canvas | null>(null)
  const imagesRef = useRef<fabric.Image[]>([])

  useEffect(() => {
    if (!canvasRef.current) return

    const canvas = new fabric.Canvas(canvasRef.current, {
      width: canvasRef.current.clientWidth,
      height: canvasRef.current.clientHeight
    })
    fabricRef.current = canvas
    setFabricCanvas?.(canvas)
    return () => {
      canvas.dispose()
    }
  }, [setFabricCanvas])

  useEffect(() => {
    if (!fabricRef.current) return

    const canvas = fabricRef.current

    // Update background color
    const backgroundColor = options.find((opt) => opt.type === 'background')?.value || '#fff'
    canvas.setBackgroundColor(backgroundColor, canvas.renderAll.bind(canvas))

    // Apply image filters and update images
    const applyImageFilters = (image: fabric.Image) => {
      image.filters?.push(
        new fabric.Image.filters.BlendColor({
          color: options.find((opt) => opt.type === 'color')?.value || '#000000',
          mode: 'tint'
        })
      )
      image.applyFilters()
    }

    // Remove old images
    imagesRef.current.forEach((image) => canvas.remove(image))
    imagesRef.current = []

    // Render new image options
    options
      .filter((option) => !['background', 'color'].includes(option.type))
      .forEach((option) => {
        fabric.Image.fromURL(
          option.value,
          (image) => {
            image.scaleToWidth(canvas.getWidth())
            image.scaleToHeight(canvas.getHeight())
            applyImageFilters(image)
            canvas.add(image)
            imagesRef.current.push(image)
          },
          { crossOrigin: 'anonymous' }
        )
      })

    canvas.renderAll()
  }, [options])

  return (
    <canvas
      ref={canvasRef}
      width={windowSize.width > 1420 ? 620 : windowSize.width < 460 ? 320 : 520}
      height={windowSize.width > 1420 ? 620 : windowSize.width < 460 ? 320 : 520}
      className="pointer-events-none rounded-lg shadow-md"
    ></canvas>
  )
}

export default Avatar
