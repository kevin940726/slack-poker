import { firestore } from 'firebase-admin';

export interface User {
  id: string;
  username: string;
  name: string;
  team_id: string;
}

export interface Team {
  id: string;
  domain: string;
}

export interface PokerUser {
  user: User;
  point: number | string;
}

export interface Poker {
  id: string;
  title: string;
  author: User;
  workspace: Team;
  users: {
    [userID: string]: PokerUser;
  };
  isHidden: boolean;
  createdTime: firestore.FieldValue;
}
