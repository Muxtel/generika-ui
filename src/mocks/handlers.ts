import { http } from 'msw'

export const handlers = [
    http.get('/api/v1/models', ({ request }) => {
        return new Response(
            JSON.stringify([
            { id: 1, rel_id: 1, name: 'Name 1' },
            { id: 2, rel_id: 1, name: 'Name 2' },
            { id: 3, rel_id: 2, name: 'Name 3' }
            ]),
            { status: 200 }
        )
        })
]
