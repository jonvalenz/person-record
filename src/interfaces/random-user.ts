import randomUserResult from '@/models/random-user-request';

function queryApi(request: string) {
  return fetch(request).then((response) => response.json());
}

export default async (request: string): Promise<randomUserResult> => queryApi(request);
