'use client';

import { useRef, useState, useEffect } from 'react';
import { Room, RemoteAudioTrack } from 'livekit-client';

export default function VoiceAgent() {
  const [connected, setConnected] = useState(false);
  const roomRef = useRef<Room | null>(null);

  // 👇 THIS IS THE RIGHT PLACE
  const connectToRoom = async () => {
    const livekitUrl = process.env.NEXT_PUBLIC_LIVEKIT_URL;
    if (!livekitUrl) {
      throw new Error('LiveKit URL not set in env');
    }

    const res = await fetch('/api/livekit-token?identity=visitor-123');
    const { token } = await res.json();

    console.log("token ",token)

    const room = new Room();
    await room.connect(livekitUrl, token);
    // ...

    setConnected(true);
  };

  useEffect(() => {
    return () => {
      roomRef.current?.disconnect();
    };
  }, []);

  return (
    <div>
      <button onClick={connectToRoom} disabled={connected}>
        {connected ? 'Connected' : 'Talk to AI Agent'}
      </button>
    </div>
  );
}
