import { IoMdClose } from 'react-icons/io'
import { Option } from '~/hooks'

interface OptionItemProps {
  index: number
  option: Option
  onDeleteOption: (id: string | null, index: number, imagePath?: string) => void
}

const OptionItem: React.FC<OptionItemProps> = ({ index, option, onDeleteOption }) => {
  const { id, image_url, name, image_path } = option

  return (
    <div className="relative w-16 h-16 rounded-md overflow-hidden cursor-pointer border border-gray-300 group">
      <img className="w-full h-full" src={image_url} alt={name} loading="lazy" />
      <div className="absolute top-0 left-0 right-0 bottom-0 hidden items-center justify-center bg-neutral-400/35 group-hover:flex">
        <IoMdClose
          className="w-6 h-6 hover:text-red-500"
          onClick={() => onDeleteOption(id ?? null, index, image_path)}
        />
      </div>
    </div>
  )
}

export default OptionItem
