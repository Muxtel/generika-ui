import './App.css'
import { GenerikaTable, type ValidationSchema } from './components/GenerikaTable.tsx'
import { type ItemPublic, ItemService, ItemPublicSchema } from '@/client'
import { OpenAPI } from '@/client'
import { type QueryKey, QueryClient, QueryClientProvider } from "@tanstack/react-query"
import type { Item } from './services/GenerikaService.ts'
import { ChakraProvider } from '@chakra-ui/react';


function App() {
  const queryClient = new QueryClient();
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
    const data = await ItemService.readItems()
    return data.data
  }

  return (
    <ChakraProvider>
      <QueryClientProvider client={queryClient}>
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
      </QueryClientProvider>
    </ChakraProvider>
  )
}

export default App
