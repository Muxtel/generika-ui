import { GenerikaTable, type ValidationSchema } from './GenerikaTable.tsx'
import { type ItemPublic, ItemService, ItemPublicSchema } from '@/client'
import { OpenAPI } from '@/client'
import { type QueryKey } from "@tanstack/react-query"
import type { Item } from '@/services/GenerikaService.ts'
import { Box } from '@chakra-ui/react'
import { GenerikaAdd } from './GenerikaAdd'


function GenerikaExample() {
  const validationSchema: ValidationSchema<Item> = {
    name: {
      required: "Le nom est obligatoire",
    },
  }

  const queryKey: QueryKey = ["Item"]
  const hiddenFields: (keyof ItemPublic)[] = ["id"]
  const mutationEditFn = (data:ItemPublic) => {
    return ItemService.updateItem({ id: data.id, requestBody: data})
      
  }
  const mutationDeleteFn = (data:ItemPublic) => ItemService.deleteItem({id: data.id})
  const getFn = async () => {
    const res= await ItemService.readItems()
    return res?.data ?? []
  }

  const mutationFn = (data:ItemPublic) => ItemService.createItem({ requestBody: data })

  return (
    <Box>
            <GenerikaAdd 
                model_name={"item"} 
                hiddenFields={hiddenFields as any} 
                validationSchema={validationSchema  as ValidationSchema<ItemPublic>} 
                mutationFn={mutationFn} 
                schema={ItemPublicSchema} 
                queryKey={queryKey}
                openAPI={OpenAPI}
            />

            <GenerikaTable 
            getFn={getFn}
            mutationEditFn={mutationEditFn} 
            hiddenFields={hiddenFields as any} 
            mutationDeleteFn={mutationDeleteFn}
            validationSchema={validationSchema as ValidationSchema<ItemPublic>}
            schema = {ItemPublicSchema} 
            queryKey = {queryKey}
            openAPI={OpenAPI}
            />
    </Box>
  )
}

export default GenerikaExample