import { Notification, NotificationAction } from '@/types';

const NotificationsReducer = (
  state: Notification[],
  action: NotificationAction
): Notification[] => {
  switch (action.type) {
    case 'ADD_NOTIFICATION':
      console.log('Adding notification:', action.payload);
      return [...state, action.payload];
    case 'REMOVE_NOTIFICATION':
      return state.filter((n) => n.id !== action.payload);
    default:
      return state;
  }
};

export default NotificationsReducer;
