'use client';

import {
  ControlBar,
  GridLayout,
  ParticipantTile,
  RoomAudioRenderer,
  RoomContext,
  useTracks,
} from '@livekit/components-react';
import { v4 as uuidv4 } from 'uuid';
import { Room, Track } from 'livekit-client';
import '@livekit/components-styles';
import { useEffect, useState } from 'react';

export default function VoiceAgentPage() {

  // dynamically generate room name & username
  const roomName = `voice-agent-room-${uuidv4()}`;
  const userName = `voice-user-${Math.floor(Math.random() * 10000)}`;
  
  const [roomInstance] = useState(() => new Room({
    adaptiveStream: true,
    dynacast: true,
  }));

  // control bar visual control
  const visibleControls = {
    camera: false,
    screenShare: false,
    microphone: true,
    chat: false,
  };

  // Generating livekit token here and create room
  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const resp = await fetch(`/api/livekit-token?room=${roomName}&username=${userName}`);
        const data = await resp.json();
        if (!mounted) return;
        if (data.token) {
          await roomInstance.connect(process.env.NEXT_PUBLIC_LIVEKIT_URL!, data.token);
        }
      } catch (e) {
        console.error(e);
      }
    })();

    return () => {
      mounted = false;
      roomInstance.disconnect();
    };
  }, [roomInstance]);

  return (
    <RoomContext.Provider value={roomInstance}>
      <div data-lk-theme="default" style={{ height: '100dvh' }}>
        <MyVideoConference />
        <RoomAudioRenderer />
        <ControlBar controls={visibleControls} />
      </div>
    </RoomContext.Provider>
  );
}

function MyVideoConference() {
  const tracks = useTracks(
    [
      { source: Track.Source.Camera, withPlaceholder: true },
      { source: Track.Source.ScreenShare, withPlaceholder: false },
    ],
    { onlySubscribed: false },
  );

  return (
    <GridLayout
      tracks={tracks}
      style={{ height: 'calc(100vh - var(--lk-control-bar-height))' }}
    >
      <ParticipantTile />
    </GridLayout>
  );
}
