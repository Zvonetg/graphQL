import fetch, { Response as NFResponse } from 'node-fetch';
import { AuthCookie } from 'clients/AuthClient';

type Headers = { cookie: string | AuthCookie | undefined } | { [prop: string]: string };
const createHeader = (headers: Headers = {}): { [prop: string]: string } => {
  const { cookie, ...rest } = headers;
  let finalCookie: string;
  if (cookie) {
    finalCookie = typeof cookie === 'string' ? cookie : cookie.rawCookie;
  } else {
    // @ts-ignore: We have to prepare cookie interface for global object
    finalCookie = global.cookie;
  }
  return {
    accept: 'application/json',
    'content-type': 'application/json',
    'X-UTMOST-REQUIRE-LATEST-ORG-TREE': 'true',
    'X-XSRF-TOKEN': 'MOCK_XSRF_VALUE',
    cookie: finalCookie,
    ...rest
  };
};

const createGraphqlFetch = (baseUrl, headers: Headers, query: any, variables: any) => {
  // Turn off SSL checking
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

  const body = JSON.stringify({
    query,
    variables
  });

  return fetch(`${baseUrl}/gwp/graphql`, {
    method: 'POST',
    headers: createHeader(headers),
    body
  });
};

type GraphQLProps = {
  baseUrl?: string;
  query: string;
  variables?: any;
  headers?: Headers;
  throwError?: boolean;
};

type GraphQLResponse<T> = { data: T; errors?: { message: string }[]; response: NFResponse };

export async function graphql<T>({
  baseUrl = process.env.WEBAPP_URL,
  query,
  variables,
  headers,
  throwError = true
}: GraphQLProps): Promise<GraphQLResponse<T>> {
  const resp = await createGraphqlFetch(baseUrl, headers || {}, query, variables);
  const json = await resp.json();
  if (throwError && json?.errors) {
    throw new Error(`GraphQL: ${(json?.errors as { message: string }[])?.map((e) => e.message).join(';')}`);
  }
  return { data: json.data, errors: json.errors, response: resp };
}
