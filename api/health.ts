import { NowRequest, NowResponse } from '@now/node';

export default async (_req: NowRequest, res: NowResponse) => {
  res.send('OK');
};
