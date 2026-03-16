import { http, HttpResponse } from 'msw'

export const handlers = [
  http.get('/api/v1/items', () => {
    return HttpResponse.json({
      data: [
        { id: 1, rel_id: 1, name: 'Name 1' },
        { id: 2, rel_id: 1, name: 'Name 2' },
        { id: 3, rel_id: 2, name: 'Name 3' },
      ],
      count: 3,
    })
  }),
  http.put('/api/v1/items/:id', async ({ params, request }) => {
    const { id } = params;
    const body = await request.json();

    console.log('PUT reçu pour item', id, body);

    // Simule une réponse réussie
    return HttpResponse.json({
      message: `Item ${id} mis à jour avec succès`,
      item: { body },
    });
  }),

  http.get('/api/v1/rel_items', () => {
    return HttpResponse.json({
      data: [
        { id: 1, name: 'Rel Name 1' },
        { id: 2, name: 'Rel Name 2' },
        { id: 3, name: 'Rel Name 3' },
      ],
      count: 3,
    })
  }),
]
