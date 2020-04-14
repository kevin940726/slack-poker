import { createBlock } from 'slack-blockx';
import { respond, estimatePoint } from '../lib/apis';
import Poker from '../components/Poker';
import { User } from '../lib/types';

interface Payload {
  user: User;
  actions: [
    {
      value: string;
    }
  ];
  response_url: string;
  message: {
    blocks: { block_id?: string }[];
  };
}

export default async ({
  payload,
  ack,
}: {
  payload: Payload;
  ack: () => void;
}) => {
  const {
    user,
    actions: [{ value }],
    response_url,
    message,
  } = payload;

  let point: number | string = parseInt(value, 10);
  if (Number.isNaN(point)) {
    point = value;
  }

  const pokerID = message.blocks[message.blocks.length - 1].block_id;

  if (!pokerID) {
    return;
  }

  const poker = await estimatePoint({
    pokerID,
    user,
    point,
  });

  if (!poker) {
    return;
  }

  await respond(
    response_url,
    <Poker
      id={poker.id}
      title={poker.title}
      users={Object.values(poker.users)}
      isHidden={poker.isHidden}
      replace_original
    />
  );

  ack();
};
