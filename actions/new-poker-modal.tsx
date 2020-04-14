import { createBlock } from 'slack-blockx';
import { nanoid } from 'nanoid';
import Poker from '../components/Poker';
import { respond, createPokerSession } from '../lib/apis';
import { User, Team } from '../lib/types';

interface Payload {
  user: User;
  team: Team;
  view: {
    state: {
      values: {
        [block_id: string]: {
          [action_id: string]: {
            type: string;
            value: string;
          };
        };
      };
    };
    private_metadata: string;
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
    team,
    view: {
      state: { values },
      private_metadata,
    },
  } = payload;
  const { responseURL } = JSON.parse(private_metadata);

  const title = Object.values(values.title)[0].value || '';
  const pokerID = nanoid();

  const poker = await createPokerSession({
    pokerID,
    title,
    author: user,
    workspace: team,
  });

  await respond(
    responseURL,
    <Poker
      id={poker.id}
      title={poker.title}
      users={Object.values(poker.users)}
      isHidden={poker.isHidden}
      response_type="in_channel"
    />
  );

  ack();
};
