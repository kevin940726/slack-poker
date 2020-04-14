import got from 'got';
import { WebClient } from '@slack/web-api';
import { firestore } from 'firebase-admin';
import db from './db';
import { User, Team, Poker } from './types';

export const web = new WebClient(process.env.SLACK_BOT_TOKEN);

export const respond = (responseURL: string, body: any) =>
  got.post(responseURL, {
    json: body,
  });

export const createPokerSession = async ({
  pokerID,
  title,
  author,
  workspace,
}: {
  pokerID: string;
  title: string;
  author: User;
  workspace: Team;
}): Promise<Poker> => {
  const pokerRef = db.collection('pokers').doc(pokerID);

  const pokerData: Poker = {
    id: pokerID,
    title,
    author,
    workspace,
    users: {},
    isHidden: true,
    createdTime: firestore.FieldValue.serverTimestamp(),
  };

  await pokerRef.set(pokerData);

  return pokerData;
};

export const getPoker = async ({
  pokerID,
}: {
  pokerID: string;
}): Promise<Poker | null> => {
  const pokerRef = db.collection('pokers').doc(pokerID);
  const poker = await pokerRef.get();

  if (!poker.exists) {
    return null;
  }

  return poker.data() as Poker;
};

export const toggleIsHidden = async ({
  pokerID,
}: {
  pokerID: string;
}): Promise<Poker | null> =>
  db.runTransaction(async (t) => {
    const pokerRef = db.collection('pokers').doc(pokerID);
    const poker = await t.get(pokerRef);

    if (!poker.exists) {
      return null;
    }

    const pokerData = poker.data() as Poker;

    t.update(pokerRef, {
      isHidden: !pokerData.isHidden,
    });

    return {
      ...pokerData,
      isHidden: !pokerData.isHidden,
    };
  });

export const resetPoker = async ({
  pokerID,
}: {
  pokerID: string;
}): Promise<Poker | null> => {
  const pokerRef = db.collection('pokers').doc(pokerID);

  await pokerRef.update({
    users: {},
    isHidden: true,
  });

  return getPoker({ pokerID });
};

export const estimatePoint = ({
  pokerID,
  user,
  point,
}: {
  pokerID: string;
  user: User;
  point: number | string;
}): Promise<Poker | null> =>
  db.runTransaction(async (t) => {
    const pokerRef = db.collection('pokers').doc(pokerID);
    const poker = await t.get(pokerRef);

    if (!poker.exists) {
      return null;
    }

    const pokerData = poker.data() as Poker;
    const { users } = pokerData;

    const updated = {
      ...users,
      [user.id]: {
        user,
        point,
      },
    };

    await t.update(pokerRef, {
      users: updated,
    });

    return {
      ...pokerData,
      users: updated,
    };
  });
