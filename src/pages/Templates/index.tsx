import { templates } from '~/_mock'
import TemplateItem from './TemplateItem'
import { useRouter } from '~/hooks'

function TemplatesPage() {
  const router = useRouter()

  return (
    <div className="flex flex-col gap-y-4">
      <h1 className="text-3xl font-normal">Templates</h1>
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
        {templates.map((template) => (
          <TemplateItem
            key={template.id}
            data={template}
            onClick={(id) => router.push(id.toString())}
          />
        ))}
      </div>
    </div>
  )
}

export default TemplatesPage
