import { createBlock } from 'slack-blockx';
import { PokerUser } from '../lib/types';
import { findAverage, findMedian, toFixed, getTimestamp } from '../lib/utils';

interface Props {
  id: string;
  title?: string;
  users: PokerUser[];
  isHidden: boolean;
  response_type?: string;
  replace_original?: boolean;
}

const points = [1, 2, 3, 5, 8, 13, 20, '?'];

function PokerSummary({
  users,
  isHidden,
}: {
  users: PokerUser[];
  isHidden: boolean;
}) {
  const sortedUsers = users.sort(
    (a, b) => getTimestamp(a.lastEdited) - getTimestamp(b.lastEdited)
  );

  const userPoints = users
    .map(({ point }) => point)
    .filter((point) => typeof point === 'number') as number[];

  return (
    <fragment>
      <divider />

      <section>
        <mrkdwn>
          {sortedUsers.map(({ user, point }, index) =>
            isHidden ? (
              <fragment>
                {index === 0 ? <b>Participants: </b> : ', '}
                <mention>{user.id}</mention>
              </fragment>
            ) : (
              <fragment>
                {index !== 0 && <br />}
                <mention>{user.id}</mention>: <b>{point}</b>
              </fragment>
            )
          )}
        </mrkdwn>
      </section>

      {!isHidden && userPoints.length > 0 && (
        <fragment>
          <divider />

          <context>
            <mrkdwn>
              <b>Average</b>: <code>{toFixed(findAverage(...userPoints))}</code>
            </mrkdwn>
            <mrkdwn>
              <b>Median</b>: <code>{toFixed(findMedian(...userPoints))}</code>
            </mrkdwn>
            <mrkdwn>
              <b>Votes</b>: <code>{userPoints.length}</code>
            </mrkdwn>
          </context>
        </fragment>
      )}

      <divider />

      <actions>
        <button
          style={isHidden ? 'primary' : undefined}
          action_id="toggle-is-hidden"
        >
          {isHidden ? 'Show' : 'Hide'}
        </button>
        <button style="danger" action_id="reset-poker">
          Reset
        </button>
      </actions>
    </fragment>
  );
}

export default function Poker({
  id,
  title,
  users,
  isHidden,
  ...props
}: Props): any {
  return (
    <blocks {...props}>
      <section>
        <mrkdwn>
          <b>{title || 'Planning Poker'}</b>
        </mrkdwn>
      </section>

      <actions block_id="estimate-point">
        {points.map((point) => (
          <button value={String(point)}>{point}</button>
        ))}
      </actions>

      {users.length > 0 && <PokerSummary users={users} isHidden={isHidden} />}

      <divider block_id={id} />
    </blocks>
  );
}
