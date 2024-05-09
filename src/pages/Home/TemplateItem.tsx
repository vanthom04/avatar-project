interface TemplateItemProps {
  data: {
    id: number
    name: string
    image_url: string
  }
  onClick?: (id: number) => void
}

const TemplateItem: React.FC<TemplateItemProps> = ({ data, onClick }) => {
  return (
    <div
      className="flex flex-col gap-y-2 p-4 border rounded-xl cursor-pointer"
      onClick={() => onClick?.(data?.id)}
    >
      <div>
        <img
          className="object-center origin-center hover:scale-105 transition-transform duration-300"
          src={data.image_url}
          alt={data.name}
        />
      </div>
      <h3 className="text-black text-xl font-medium text-center">{data.name}</h3>
    </div>
  )
}

export default TemplateItem
