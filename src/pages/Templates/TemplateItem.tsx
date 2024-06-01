import { Template } from '~/types'
import { getImageUrl } from '~/utils'
import Avatar from '../CustomAvatar/Avatar'

interface TemplateItemProps {
  data: Template
  onClick?: (id: string) => void
}

const TemplateItem: React.FC<TemplateItemProps> = ({ data, onClick }) => {
  return (
    <div
      className="flex flex-col gap-y-2 p-2 sm:p-4 border rounded-xl cursor-pointer"
      onClick={() => onClick?.(data.id)}
    >
      <div>
        <img
          className="w-full h-full object-center origin-center lg:hover:scale-105 transition-transform duration-300"
          src={getImageUrl('templates', data.image_path)}
          alt={data.name}
          loading="lazy"
        />
      </div>
      <h3 className="text-black sm:text-xl font-normal sm:font-medium text-center">{data.name}</h3>
    </div>
  )
}

export default TemplateItem
