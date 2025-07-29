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
import dynamic from 'next/dynamic';
import { Home } from 'lucide-react';

// ClientOnly component for client-side rendering
//@ts-ignore
const ClientOnly = ({ children }) => {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return null;
  }

  return <>{children}</>;
};

// Define Avatar component props interface
interface AvatarProps {
  hasActiveTool: boolean;
}

// Dynamic import of Avatar component
const Avatar = dynamic<AvatarProps>( // render react component dynamically
  () =>
    Promise.resolve(({ hasActiveTool }: AvatarProps) => {
      // This function will only execute on the client
      const isIOS = () => {
        // Multiple detection methods
        const userAgent = window.navigator.userAgent;
        const platform = window.navigator.platform;
        const maxTouchPoints = window.navigator.maxTouchPoints || 0;

        // UserAgent-based check
        const isIOSByUA =
          //@ts-ignore
          /iPad|iPhone|iPod/.test(userAgent) && !window.MSStream;

        // Platform-based check
        const isIOSByPlatform = /iPad|iPhone|iPod/.test(platform);

        // iPad Pro check
        const isIPadOS =
          //@ts-ignore
          platform === 'MacIntel' && maxTouchPoints > 1 && !window.MSStream;

        // Safari check
        const isSafari = /Safari/.test(userAgent) && !/Chrome/.test(userAgent);

        return isIOSByUA || isIOSByPlatform || isIPadOS || isSafari;
      };

      // Conditional rendering based on detection
      return (
        <div
          className={`flex items-center justify-center rounded-full transition-all duration-300 ${hasActiveTool ? 'h-20 w-20' : 'h-28 w-28'
            }`}
        >
          <div
            className="relative cursor-pointer flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-full p-4"
            onClick={() => (window.location.href = '/')}
          >
            <Home className="w-6 h-6 text-gray-700" />
          </div>
        </div>
      );
    }),
  { ssr: false }
);


function MyVideoConference() {
  const tracks = useTracks(
    [
      { source: Track.Source.Camera, withPlaceholder: false }, // don't show camera
    ],
    {
      onlySubscribed: true,
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



export default function VoiceAgentPage() {


  // dynamically generate room name & username
  const roomName = `voice-agent-room-${uuidv4()}`;
  const userName = `voice-user-${Math.floor(Math.random() * 10000)}`;
  const [roomInstance] = useState(() => new Room({
    adaptiveStream: true,
    dynacast: true,
  }));
  const [hasActiveTool, sethasActiveTool] = useState(true)
  const [agentJoined, setAgentJoined] = useState(false);
  const [msg, setMsg] = useState("Agent is joining...")

  // control bar visual control
  const visibleControls = {
    camera: false,
    screenShare: false,
    microphone: true,
    chat: true,
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
          setMsg('We couldn’t detect your microphone. Please ensure it’s connected and enabled in your browser settings.')
          return;
        }

        await navigator.mediaDevices.getUserMedia({ audio: true });

        // Step 2: If granted, fetch token
        const resp = await fetch(`/api/livekit-token?room=${roomName}&username=${userName}`);
        const data = await resp.json();
        if (!mounted) return;

        // Step 3: Connect to LiveKit room if token received
        if (data.token) {
          const connect = await roomInstance.connect(process.env.NEXT_PUBLIC_LIVEKIT_URL!, data.token);
          console.log("connect", connect)
        }

        // Listen for new participant connection
        roomInstance.on(RoomEvent.ParticipantConnected, (participant) => {
          console.log('Agent joined:', participant.identity);
          if (participant.identity?.startsWith('tavus')) {
            console.log('Agent joined:', participant.identity);
            setAgentJoined(true);

            // Unmute local mic when agent joins
            const localParticipant = roomInstance.localParticipant;
            if (!localParticipant.isMicrophoneEnabled) {
              localParticipant.setMicrophoneEnabled(true);
            }
          }
        });
      } catch (err) {
        // Handle permission denial or other errors
        toast.error(`Unable to connect voice agent due to ${err}`);
        setMsg("Ketan's voice agent is not available.")
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
      <div className="flex flex-col items-center space-y-6">
        {/* Top: Centered Home Button */}
        <div className="mt-4">
          <ClientOnly>
            <Avatar hasActiveTool={hasActiveTool} />
          </ClientOnly>
        </div>

        {/* Bottom: Rendered Room */}
        <RoomContext.Provider value={roomInstance}>
          <div
            data-lk-theme="default"
            className="w-full max-w-4xl rounded-xl bg-white shadow-md p-4"
            style={{ height: '50dvh' }}
          >
            {!agentJoined ? (
              <div className="flex h-full flex-col m4 items-center justify-center text-black space-y-4 bg-gray-200">
                <span className="text-xl font-semibold px-4 py-2">{msg}</span>
                <div className="w-8 h-8 bg-blue-700 rounded-full animate-ping"></div>
              </div>
            ) : (
              <div className="bg-gray-100 h-full w-full">
                <MyVideoConference />
                <RoomAudioRenderer />
                <ControlBar controls={visibleControls} />
              </div>
            )}
          </div>
        </RoomContext.Provider>
      </div>

    </motion.div>
  );
}

