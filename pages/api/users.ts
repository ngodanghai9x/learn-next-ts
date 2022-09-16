// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { NextApiRequestWithToken, TokenInfo, withToken } from '../../middlewares/withToken';

type Data = {
  name: string;
  tokenInfo: TokenInfo | null;
};
// api/users
function handler(req: NextApiRequestWithToken, res: NextApiResponse<Data[]>) {
  const tokenInfo = req?.tokenInfo ?? null;
  res.status(200).json([{ name: 'John Doe', tokenInfo }]);
}

export default withToken(handler);
