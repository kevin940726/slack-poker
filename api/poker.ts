import { NowRequest, NowResponse } from '@now/node';
import NewPokerModal from '../components/NewPokerModal';
import { web } from '../lib/apis';
import verify from '../lib/verify';

export default async (req: NowRequest, res: NowResponse) => {
  if (req.method !== 'POST') {
    res.status(404);
    return;
  }

  await verify(req);

  const { trigger_id, response_url } = req.body;

  await web.views.open({
    trigger_id,
    view: NewPokerModal({
      responseURL: response_url,
    }),
  });

  res.status(200).send('');
};
