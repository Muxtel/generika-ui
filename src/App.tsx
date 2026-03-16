import './App.css'
import GenerikaExample from './components/GenerikaExample.tsx'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ChakraProvider } from '@chakra-ui/react'
import { system } from "./theme"



function App() {
  const queryClient = new QueryClient();
  return (
    <ChakraProvider value={system}>
      <QueryClientProvider client={queryClient}>
        <GenerikaExample />
      </QueryClientProvider>
    </ChakraProvider>
  )
}

export default App
