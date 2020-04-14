import { NowRequest } from '@now/node';
import crypto from 'crypto';

const VERSION = 'v0';

export default async function verify(req: NowRequest) {
  const timestamp = parseInt(
    req.headers['x-slack-request-timestamp'] as string,
    10
  );

  const body = await new Promise((resolve) => {
    const data: Buffer[] = [];
    req.on('data', (chunk) => {
      data.push(chunk);
    });
    req.on('end', () => {
      resolve(Buffer.concat(data).toString('utf8'));
    });
  });

  if (!timestamp) {
    throw new Error('Invalid timestamp');
  }

  const fiveMinutesAgo = Math.floor(Date.now() / 1000) - 60 * 5;
  // The request timestamp is more than five minutes from local time.
  // It could be a replay attack, so let's ignore it
  if (timestamp < fiveMinutesAgo) {
    throw new Error('Timestamp exceeded');
  }

  const signBase = [VERSION, timestamp, body].join(':');
  const hmac = crypto.createHmac(
    'sha256',
    process.env.SLACK_SIGNING_SECRET as string
  );

  const sign = hmac.update(signBase);
  const [, hash] = (req.headers['x-slack-signature'] as string).split('=');
  const slackSign = Buffer.from(hash, 'hex');

  if (!crypto.timingSafeEqual(sign.digest(), slackSign)) {
    throw new Error('Not verified');
  }
}
