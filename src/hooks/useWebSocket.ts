import { WS_URL } from '@/constants/api';
import { useEffect } from 'react';

const useWebSocket = (identifier: string, onMessage: (data: any) => void) => {
    useEffect(() => {
        if (!identifier) return;

        const socket = new WebSocket(`${WS_URL}/${identifier}`);

        socket.onmessage = (event) => {
            const data = JSON.parse(event.data);
            onMessage(data);
        };

        socket.onerror = (error) => {
            console.error('WebSocket error:', error);
        };

        return () => {
            socket.close();
        };
    }, [identifier, onMessage]);
};

export default useWebSocket;