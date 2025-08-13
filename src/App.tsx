import { useState } from 'react'
import './App.css'
import { GenerikaTable } from './components/GenerikaTable.tsx'
import { type ModelPublic, type ModelDeleteModelData, ModelService, type RelModelPublic } from './TypesAndData.ts'

function App() {
  const [count, setCount] = useState(0)

  const mutationEditFn = (data:ModelPublic) => {
    return ModelService.updateModel({ id: data.id, requestBody: data})
      
  }
  const mutationDeleteFn = (data:ModelDeleteModelData) => ModelService.deleteModel({id: data.id})
  const getFn = () => {
    const data = ModelService.readModels().then(data => data.data)
    return data
  }

  return (
    <>
      <GenerikaTable 
      getFn={getFn}
      mutationEditFn={mutationEditFn} 
      hiddenFields={hiddenFields as any} 
      mutationDeleteFn={mutationDeleteFn}
      validationSchema={validationSchema}
      schema = {ModelPublicSchema} 
      queryKey = {queryKey}
      openAPI={openAPI}
    />
    </>
  )
}

export default App
