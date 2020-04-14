import { createBlock } from 'slack-blockx';

interface Props {
  responseURL: string;
}

export default function NewPokerModal({ responseURL }: Props): any {
  return (
    <modal
      title="New Poker"
      submit="Create"
      close="Cancel"
      private_metadata={JSON.stringify({ responseURL })}
      callback_id="new-poker-modal"
    >
      <input label="Title" optional block_id="title">
        <plain_text_input multiline />
      </input>
    </modal>
  );
}
