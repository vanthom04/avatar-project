import { templates } from '~/_mock'
import { useRouter } from '~/hooks'
import TemplateItem from './TemplateItem'

function HomePage() {
  const router = useRouter()

  const handleClick = (id: number) => {
    router.push('/templates/' + id)
  }

  return (
    <div className="w-full h-full">
      <div className="p-3 grid grid-cols-2 lg:grid-cols-3 gap-6">
        {templates.map((template) => (
          <TemplateItem key={template.id} data={template} onClick={handleClick} />
        ))}
      </div>
    </div>
  )
}

export default HomePage
