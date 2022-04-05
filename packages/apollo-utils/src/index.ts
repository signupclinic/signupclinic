import {
  ApolloClient,
  InMemoryCache,
  ApolloLink,
  HttpLink,
} from '@apollo/client';
import { relayStylePagination } from '@apollo/client/utilities';
import { useSnackbar } from 'notistack';
import { ApolloServer } from 'apollo-server-micro';

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        clinicConnection: relayStylePagination(),
      },
    },
  },
});

export default new ApolloClient({
  link: ApolloLink.from([
    new HttpLink({
      credentials: 'include',
      fetch,
      uri: `${process.env.NEXT_PUBLIC_APOLLO_URL || ''}/api/graphql`,
    }),
  ]),
  credentials: 'include',
  cache,
});

export function useMutation<T, U>(
  fn: (options: T) => U,
  options?: T & { completedMessage?: string; [key: string]: any }
) {
  const { enqueueSnackbar } = useSnackbar() || { enqueueSnackbar: () => {} };
  const { completedMessage, ...rest } = options || {};
  return fn({
    onCompleted() {
      enqueueSnackbar(completedMessage || 'Success', { variant: 'success' });
    },
    onError({ message }) {
      enqueueSnackbar(message, { variant: 'error' });
    },
    ...(rest as T),
  });
}

export function createServer(options: {
  context?: any;
  schema: any;
  connect?: any;
});
export function createServer(options: {
  typeDefs: any;
  resolvers: any;
  context?: any;
  connect?: any;
});
export function createServer({
  typeDefs,
  resolvers,
  schema,
  context,
  connect = async () => 'hi',
}) {
  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    context,
    schema,
  });
  const connectionPromise = connect().then((a) => a);
  const startServer = apolloServer.start();

  return async function handler(req, res) {
    await connectionPromise;

    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept, Referer, User-Agent'
    );
    res.setHeader('Access-Control-Expose-Headers', '*');
    if (process.env.NODE_ENV === 'development') {
      res.setHeader(
        'Access-Control-Allow-Origin',
        req.headers?.origin || req.headers?.referer || '*'
      );
    } else if (process.env.ROOT_DOMAIN) {
      if (
        (req.headers.origin || req.headers.referer)
          ?.replace('https://', '')
          .replace('http://', '')
          .includes(process.env.ROOT_DOMAIN)
      ) {
        res.setHeader(
          'Access-Control-Allow-Origin',
          req.headers?.origin || req.headers?.referer || '*'
        );
      } else {
        return res.end(); // will not spin up server if from different domain. Blocks CSRF attacks.
      }
    }

    res.setHeader(
      'Access-Control-Allow-Origin',
      req.headers?.origin || req.headers?.referer || '*'
    );

    if (req.method === 'OPTIONS') {
      res.end();
      return false;
    }

    await startServer;
    return apolloServer.createHandler({
      path: '/api/graphql',
    })(req, res);
  };
}
