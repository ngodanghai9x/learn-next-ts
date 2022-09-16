import type { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
export type TokenInfo = {
  jwt: string;
};
export type NextApiRequestWithToken = NextApiRequest & {
  tokenInfo?: TokenInfo;
};

export type NextApiHandlerWithToken = (req: NextApiRequestWithToken, res: NextApiResponse) => unknown | Promise<unknown>;

export function withToken(handler: NextApiHandler): NextApiHandlerWithToken {
  return async (req: NextApiRequestWithToken, res: NextApiResponse) => {
    req.tokenInfo = { jwt: '' };
    return handler(req, res);
  };
}
