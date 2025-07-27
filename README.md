# GENERIKA-UI
## Description
A CRUD scaffolding library for React+Chakra-UI

## Documentation

### Prerequisites

- Foreing keys need to be named like [model_name]_id. For example : item_id

### Use

#### CREATE - Add button
```
export const LayerAdd = () => {
  const mutationFn = (data:LayerCreate) => LayerService.createLayer({ requestBody: data })
  return( 
    <GenerikaAdd 
      model_name={model_name} 
      hiddenFields={hiddenFields as any} 
      validationSchema={validationSchema  as ValidationSchema<LayerPublic>} 
      mutationFn={mutationFn} 
      schema={LayerPublicSchema} 
      queryKey={queryKey}
      openAPI={openAPI}
    />
  )
}
```

### READ - UPDATE - DELETE - Table
```
function ModelsTable(){
  const mutationEditFn = (data:ModelPublic) => {
    return ModelService.updateModel({ id: data.id, requestBody: data})
      
  }
  const mutationDeleteFn = (data:ModelDeleteModelData) => ModelService.deleteModel({id: data.id})
  const getFn = () => {
    const data = ModelService.readModels().then(data => data.data)
    return data
  }

  return( 
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
  )
}
```


