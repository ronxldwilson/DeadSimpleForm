// tests/api/submitForm.test.ts
import { POST } from '@/app/api/forms/route';
import { NextRequest } from 'next/server';

const mockUser = { id: 'user_123' };

jest.mock('@/lib/supabase-server', () => ({
  createSupabaseServerClient: async () => ({
    auth: {
      getUser: async () => ({ data: { user: mockUser }, error: null }),
    },
    from: () => ({
      select: () => ({
        eq: () => ({
          single: () => ({ data: null }), // Mock "slug doesn't exist"
        }),
      }),
      insert: () => ({
        select: () => ({
          single: () => ({
            data: {
              id: 'form_id',
              name: 'Test Form',
              slug: 'form_test',
              webhook_url: '',
              user_id: mockUser.id,
            },
          }),
        }),
      }),
    }),
  }),
}));

function createMockRequest(body: any): NextRequest {
  return {
    method: 'POST',
    json: async () => body,
    headers: new Headers(),
  } as unknown as NextRequest;
}

test('creates a form successfully', async () => {
  const req = createMockRequest({ name: 'Test Form', webhook_url: '' });
  const res = await POST(req);

  const result = await res.json();

  expect(res.status).toBe(200);
  expect(result.form.name).toBe('Test Form');
});
