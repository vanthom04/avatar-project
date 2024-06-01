import { useRouter, useUser } from '~/hooks'
import { useQueryTemplates } from '~/queries'
import Spinner from '~/components/Spinner'
import TemplateItem from './TemplateItem'
import { useEffect, useState } from 'react'
import { httpRequest } from '~/utils/httpRequest'
import { Template } from '~/types'

function TemplatesPage() {
  const router = useRouter()
  const { accessToken } = useUser()
  const { data: templates, isLoading } = useQueryTemplates(accessToken ?? '')

  const [dataTemplates, setDataTemplates] = useState<Template[]>([])

  useEffect(() => {
    const getDataTemplates = async () => {
      try {
        const response = await httpRequest.get<Template[]>('rest/v1/templates?select=*', {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`
          }
        })
        setDataTemplates(response)
      } catch (error) {
        console.log(error)
      }
    }
    getDataTemplates()
  }, [accessToken])

  return (
    <div className="w-full h-full flex flex-col gap-y-4">
      {isLoading ? (
        <div className="w-full h-full flex items-center justify-center">
          <Spinner className="w-12 h-12" />
        </div>
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
          {dataTemplates?.map((template) => (
            <TemplateItem
              key={template.id}
              data={template}
              onClick={(id) => router.push('/custom-avatar/create/' + id)}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default TemplatesPage
