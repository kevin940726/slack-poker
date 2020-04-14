import { createBlock } from 'slack-blockx';
import { respond, toggleIsHidden } from '../lib/apis';
import Poker from '../components/Poker';

interface Payload {
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
  const { response_url, message } = payload;

  const pokerID = message.blocks[message.blocks.length - 1].block_id;

  if (!pokerID) {
    return;
  }

  const poker = await toggleIsHidden({ pokerID });

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
