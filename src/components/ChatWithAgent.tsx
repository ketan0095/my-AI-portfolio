'use client';

import { useEffect, useState } from 'react';
import { Room, RemoteAudioTrack, Track } from 'livekit-client';
import { createLocalAudioTrack } from 'livekit-client';
import {useTracks,GridLayout,ParticipantTile} from '@livekit/components-react';

export async function getMicrophoneTrack() {
  try {
    const audioTrack = await createLocalAudioTrack();
    return audioTrack;
  } catch (error) {
    console.error('Could not get microphone track:', error);
    throw error;
  }
}

export function MyVideoConference() {
  // `useTracks` returns all camera and screen share tracks. If a user
  // joins without a published camera track, a placeholder track is returned.
  const tracks = useTracks(
    [
      { source: Track.Source.Camera, withPlaceholder: true },
      { source: Track.Source.ScreenShare, withPlaceholder: false },
    ],
    { onlySubscribed: false },
  );
  return (
    <GridLayout tracks={tracks} style={{ height: 'calc(100vh - var(--lk-control-bar-height))' }}>
      {/* The GridLayout accepts zero or one child. The child is used
      as a template to render all passed in tracks. */}
      <ParticipantTile />
    </GridLayout>
  );
}

type ChatWithAgentProps = {
  room_global: Room;
};

export default function ChatWithAgent({room_global}:ChatWithAgentProps) {
    const [isConnected, setIsConnected] = useState(false);
    const [micOn, setMicOn] = useState(false);
    const [transcripts, setTranscripts] = useState<string[]>([]);
    const [connected, setConnected] = useState(false)
    // const [room, setRoom] = useState<Room | null>(null);

    type ConnectOptions = {
        onTranscription?: (text: string) => void;
        onMicStatusChange?: (micOn: boolean) => void;
    }

    async function connectToRoom(options?: ConnectOptions) {
        const livekitUrl = process.env.NEXT_PUBLIC_LIVEKIT_URL;
        if (!livekitUrl) {
            throw new Error('LiveKit URL not set in env');
        }

        const res = await fetch('/api/livekit-token?identity=visitor-123');
        const { token } = await res.json();

        const room = room_global;

        await room.connect(livekitUrl, token);

        // Example: publish mic audio track
        const audioTrack = await getMicrophoneTrack(); // your helper to get mic track
        await room.localParticipant.publishTrack(audioTrack);

        // Report mic status
        options?.onMicStatusChange?.(audioTrack.mediaStreamTrack.enabled);

        // Listen for participant connections
        room.on('participantConnected', (participant) => {
            console.log('Participant joined:', participant.identity);
        });

        // Example: listen for transcription data on DataTrack
        room.on('dataReceived', (payload, participant) => {
            if (!participant) return ""
            const message = new TextDecoder().decode(payload);
            console.log('Data from', participant.identity, ':', message);

            // Call transcription callback
            options?.onTranscription?.(message);
        });

        // Return the room so caller can store/use it
        return room;
    }

    const handleConnect = async () => {
        try {
            await connectToRoom({
                onTranscription: (text: string) => {
                    console.log("Transcript:", text);
                    // update state or UI here
                },
                onMicStatusChange: (on) => setMicOn(on),
            });
        } catch (err) {
            console.error('Failed to connect:', err);
        }
    };

    const handleDisconnect = () => {
        // implement your disconnect logic here
        setIsConnected(false);
        setMicOn(false);
        setTranscripts([]);
    };

    return (
        <div className="max-w-xl mx-auto p-4 rounded-2xl shadow bg-white space-y-4">
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Talk to Voice Agent</h2>
                <span className={`text-sm ${micOn ? 'text-green-600' : 'text-red-600'}`}>
                    Mic: {micOn ? 'On' : 'Off'}
                </span>
            </div>

            <div className="space-y-2 max-h-64 overflow-y-auto border p-2 rounded">
                {transcripts.map((line, idx) => (
                    <div key={idx} className="text-sm text-gray-800">
                        🗣️ {line}
                    </div>
                ))}
            </div>

            <div className="flex gap-2">
                {!isConnected ? (
                    <button onClick={handleConnect} className="bg-blue-500 text-black px-4 py-2 rounded">
                        Connect
                    </button>
                ) : (
                    <button onClick={handleDisconnect} className="bg-red-500 text-black px-4 py-2 rounded">
                        Disconnect
                    </button>
                )}
            </div>
        </div>
    );
}
