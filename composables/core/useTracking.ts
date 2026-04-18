import { useChat } from '../modules/chat/useChat'
import { useUser } from '../modules/auth/user'
import { useRoute } from 'vue-router'

export const useTracking = () => {
    const { activeRoom } = useChat()
    const { user } = useUser()
    const route = useRoute()
    const config = useRuntimeConfig()
    const gateway = config.public.GATEWAY_ENDPOINT
    
    // Persistent guest ID in cookies
    const guestCookie = useCookie('flybeth_agent_guest_id', { maxAge: 30 * 24 * 60 * 60 })
    if (!guestCookie.value) {
        guestCookie.value = 'guest-' + Math.random().toString(36).substring(2, 11)
    }

    const trackAction = async (event: string, metadata: any = {}) => {
        try {
            await $fetch(`${gateway}/tracking/event`, {
                method: 'POST',
                body: {
                    event,
                    metadata: {
                        ...metadata,
                        url: route.fullPath,
                        role: 'agent',
                        guestId: !user.value ? guestCookie.value : undefined,
                        userEmail: user.value ? user.value.email : (metadata.userEmail || metadata.email),
                        userName: user.value ? `${user.value.firstName} ${user.value.lastName}` : (metadata.userName || metadata.name)
                    },
                    roomId: activeRoom.value?._id
                }
            })
        } catch (err) {
            console.warn('[Tracking] Failed to log agent event:', err)
        }
    }

    return {
        trackAction
    }
}
