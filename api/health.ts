import { NowRequest, NowResponse } from '@now/node';

export default async (req: NowRequest, res: NowResponse) => {
  res.send('OK');
};
