import { NowRequest, NowResponse } from '@now/node';
import actions from '../actions';
import { respond } from '../lib/apis';
import verify from '../lib/verify';

export default async (req: NowRequest, res: NowResponse) => {
  if (req.method !== 'POST') {
    res.status(404);
    return;
  }

  await verify(req);

  const payload = JSON.parse(req.body.payload);

  const params = {
    payload,
    req,
    res,
    respond,
    ack: () => res.status(200).send(''),
  };

  if (payload.type === 'view_submission') {
    if (actions.has(payload.view.callback_id)) {
      return actions.get(payload.view.callback_id)(params);
    }
  } else if (payload.type === 'block_actions') {
    if (actions.has(payload.actions[0].block_id)) {
      return actions.get(payload.actions[0].block_id)(params);
    } else if (actions.has(payload.actions[0].action_id)) {
      return actions.get(payload.actions[0].action_id)(params);
    }
  }

  res.status(404);
};
