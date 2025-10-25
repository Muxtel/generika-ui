import { http } from 'msw'

export const handlers = [
  http.get('/api/v1/items', () => {
    return new Response(
      JSON.stringify({
        data: [
          { id: 1, rel_id: 1, name: 'Name 1' },
          { id: 2, rel_id: 1, name: 'Name 2' },
          { id: 3, rel_id: 2, name: 'Name 3' }
        ],
        count: 3
      }),
      { status: 200 }
    )
  }),
  http.get('/api/v1/rel_items', () => {
    return new Response(
      JSON.stringify({
        data: [
          { id: 1, name: 'Rel Name 1' },
          { id: 2, name: 'Rel Name 2' },
          { id: 3, name: 'Rel Name 3' }
        ],
        count: 3
      }),
      { status: 200 }
    )
  })
]
