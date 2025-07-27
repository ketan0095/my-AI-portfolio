// src/app/api/livekit-token/route.ts
import { NextRequest } from 'next/server';
import { AccessToken } from 'livekit-server-sdk';

export async function GET(req: NextRequest) {
  const url = new URL(req.url);

  const identity = url.searchParams.get('identity') || 'anonymous';
  const token = new AccessToken(
    process.env.NEXT_PUBLIC_LIVEKIT_API_KEY,
    process.env.NEXT_PUBLIC_LIVEKIT_API_SECRET,
    {
      identity,
      ttl: '10m',
    }
  );
  token.addGrant({ roomJoin: true, room: 'default' });
  const jwt = await token.toJwt();

  console.log("jwt ----->>",jwt)
  return Response.json({ token: jwt });
}
