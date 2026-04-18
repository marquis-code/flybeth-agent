import { ref } from 'vue';
import { io, Socket } from 'socket.io-client';
import { useCustomToast } from './useCustomToast';

export const useRealtime = () => {
  const { showToast } = useCustomToast();
  const socket = ref<Socket | null>(null);
  const isConnected = ref(false);
  const notifications = ref<any[]>([]);
  const newMessages = ref<any[]>([]);

  const connect = () => {
    if (socket.value && socket.value.connected) return;

    const token = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : '';
    
    // We allow connection without token for guest chat, 
    // but we log it for debugging
    if (!token) {
        console.log('[Agent] Connecting as Guest (no token)');
    }

    const config = useRuntimeConfig();
    const apiBase = config.public.apiBase || 'http://localhost:3000/api/v1';
    // Sockets usually connect to the root + namespace, NOT the /api/v1 prefix
    const rootUrl = apiBase.split('/api/v1')[0];
    const socketUrl = `${rootUrl.replace(/\/+$/, '')}/chat`;
    
    console.log(`[Agent] Connecting to WebSocket at: ${socketUrl}`);

    socket.value = io(socketUrl, {
      auth: { token },
      transports: ['websocket', 'polling'],
      reconnection: true,
      reconnectionAttempts: 10,
    });

    socket.value.on('connect', () => {
      isConnected.value = true;
      console.log('[Agent] WebSocket connected');
    });

    socket.value.on('disconnect', () => {
      isConnected.value = false;
      console.log('[Agent] WebSocket disconnected');
    });

    socket.value.on('connect_error', (err) => {
      console.error('[Agent] WebSocket connection error:', err);
    });

    socket.value.on('notification', (notification) => {
      notifications.value.unshift(notification);
      showToast({
        title: notification.title || 'Support Update',
        message: notification.message || notification.content,
        toastType: 'info',
      });
      
      // Emit local event for components to listen
      window.dispatchEvent(new CustomEvent('new-notification', { detail: notification }));
    });

    socket.value.on('newMessage', (message) => {
      newMessages.value.push(message);
      window.dispatchEvent(new CustomEvent('new-chat-message', { detail: message }));
    });
  };

  const disconnect = () => {
    if (socket.value) {
      socket.value.disconnect();
      socket.value = null;
    }
  };

  return {
    socket,
    isConnected,
    notifications,
    newMessages,
    connect,
    disconnect
  };
};
