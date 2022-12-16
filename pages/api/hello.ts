// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

type MyResponse = {
  name: string;
};

export const config = {
  api: {
    // tells the server that this route is being handled by an external resolver like express or connect.
    // Enabling this option disables warnings for unresolved requests.
    externalResolver: false,
    bodyParser: {
      // https://github.com/visionmedia/bytes.js
      sizeLimit: '1',
    },
    responseLimit: 2,
  },
};

// api/hello
export default function handler(req: NextApiRequest, res: NextApiResponse<MyResponse[]>) {
  res.status(200).json([{ name: 'John Doe' }, { name: 'John Doe' }]);
}
