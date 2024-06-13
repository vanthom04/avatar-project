import { useRouter } from '~/hooks'
import { useGlobalContext } from '~/context'
import EmptyState from '~/components/EmptyState'
import TemplateItem from '~/components/TemplateItem'

function TemplatesPage() {
  const router = useRouter()
  const [state] = useGlobalContext()

  if (state.templates.length === 0) {
    return <EmptyState />
  }

  return (
    <div className="w-full h-full flex flex-col gap-y-4">
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
        {state.templates?.map((template) => (
          <TemplateItem
            key={template.id}
            data={template}
            onClick={(id) => router.push('/custom-avatar/create/' + id)}
          />
        ))}
      </div>
    </div>
  )
}

export default TemplatesPage
