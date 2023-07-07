import { QueryCache, QueryClient } from "@tanstack/react-query";

function queryErrorHandler(error: unknown): void {
  const title =
    error instanceof Error ? error.message : "error connecting to server";
  console.error(title);
}

export function generateQueryClient(): QueryClient {
  return new QueryClient({
    queryCache: new QueryCache({
      onError: queryErrorHandler,
    }),
    defaultOptions: {
      queries: {
        retry: false,
        cacheTime: Infinity,
      },
    },
    logger: {
      log: console.log,
      warn: console.warn,
      error: () => {},
    },
  });
}

export const generateTestQueryClient = () => {
  const client = generateQueryClient();
  const options = client.getDefaultOptions();
  options.queries = { ...options.queries, retry: false };
  return client;
};

export const queryClient = generateQueryClient();
