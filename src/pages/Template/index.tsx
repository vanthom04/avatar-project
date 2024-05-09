import { useEffect } from 'react'
import { useParams } from 'react-router-dom'

function Template() {
  const params = useParams<{ idTemplate: string }>()

  useEffect(() => {
    console.log(params?.idTemplate)
  }, [params])

  return <div>Template</div>
}

export default Template
