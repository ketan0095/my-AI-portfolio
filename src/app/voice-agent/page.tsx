'use client';

import {
  ControlBar,
  GridLayout,
  ParticipantTile,
  RoomAudioRenderer,
  RoomContext,
  useTracks
} from '@livekit/components-react';
import { v4 as uuidv4 } from 'uuid';
import { Room, RoomEvent, Track } from 'livekit-client';
import '@livekit/components-styles';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';

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

    async function startConnection() {
      try {
        // Step 1: Request mic permission
        const devices = await navigator.mediaDevices.enumerateDevices();
        const hasMic = devices.some(d => d.kind === 'audioinput');

        if (!hasMic) {
          toast.error('No microphone detected. Please connect a microphone and try again.');
          console.log("No microphone detected.")
          return;
        }

        await navigator.mediaDevices.getUserMedia({ audio: true });

        // Step 2: If granted, fetch token
        const resp = await fetch(`/api/livekit-token?room=${roomName}&username=${userName}`);
        const data = await resp.json();
        if (!mounted) return;

        // Step 3: Connect to LiveKit room if token received
        if (data.token) {
          await roomInstance.connect(process.env.NEXT_PUBLIC_LIVEKIT_URL!, data.token);
        }
      } catch (err) {
        // Handle permission denial or other errors
        toast.error('Unable to access microphone or connect. Please check permissions.');
        console.log("No microphone detected.")
        // You can also set state here to show an error message to user
      }
    }

    startConnection();

    return () => {
      mounted = false;
      roomInstance.disconnect();
    };
  }, [roomInstance]);


  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-accent mx-auto mt-8 w-full max-w-4xl rounded-3xl px-6 py-8 font-sans sm:px-10 md:px-16 md:py-12"
    >
      <RoomContext.Provider value={roomInstance}>
        <div data-lk-theme="default" style={{ height: '100dvh' }}>
          <MyVideoConference />
          <RoomAudioRenderer />
          <ControlBar controls={visibleControls} />
        </div>
      </RoomContext.Provider>
    </motion.div>
  );
}

function MyVideoConference() {
  const tracks = useTracks(
    [
      { source: Track.Source.Camera, withPlaceholder: false }, // don't show camera
    ],
    { onlySubscribed: true,
      // Only include tracks that the local participant is currently subscribed to.
      // This helps avoid rendering placeholders or unsubscribed tracks.
      updateOnlyOn: [RoomEvent.TrackSubscribed, RoomEvent.TrackUnsubscribed], 
      // Re-render the component only when a track is subscribed or unsubscribed.
      // This avoids unnecessary updates and improves performance.
     },
  )

  tracks.forEach((t) => {
    const kind = t.publication ? t.publication.kind : 'unknown';
    console.log(`Track from participant: ${t.participant.identity}, kind: ${kind}, source: ${t.source}`);
  });

  return (
    <GridLayout
      tracks={tracks}
      style={{ height: 'calc(100vh - var(--lk-control-bar-height))' }}
    >
      <ParticipantTile />
    </GridLayout>
  );
}
