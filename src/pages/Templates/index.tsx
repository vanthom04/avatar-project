import { useRouter } from '~/hooks'
import { useGlobalContext } from '~/context'
import TemplateItem from '~/components/TemplateItem'

function TemplatesPage() {
  const router = useRouter()
  const [state] = useGlobalContext()

  if (state.templates.length === 0) {
    return (
      <div className="h-full flex flex-col items-center justify-center">
        <img
          className="w-72 object-cover"
          src="/assets/images/not-found-templates.png"
          alt="Not Found Templates"
        />
        <h1 className="text-3xl">Not found templates!</h1>
      </div>
    )
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
