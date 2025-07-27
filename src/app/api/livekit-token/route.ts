import { NextRequest, NextResponse as Response } from 'next/server';
import { AccessToken } from 'livekit-server-sdk';

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);

    const identity = url.searchParams.get('identity') || 'anonymous';
    const token = new AccessToken(
      process.env.NEXT_PUBLIC_LIVEKIT_API_KEY!,
      process.env.NEXT_PUBLIC_LIVEKIT_API_SECRET!,
      {
        identity,
        ttl: '10m',
      }
    );
    token.addGrant({ roomJoin: true, room: 'default' });
    const jwt = await token.toJwt();

    return Response.json({ token: jwt });
  } catch (error) {
    console.error('Error generating LiveKit token:', error);

    return new Response(
      JSON.stringify({ error: 'Failed to generate token' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
