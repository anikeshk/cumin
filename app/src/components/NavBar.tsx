import { useState, useEffect, useReducer } from 'react';
import { Link, useNavigate } from 'react-router';
import { Bell } from 'lucide-react';

import { useAuth } from '@/providers/AuthenticationProvider';
import NotificationsReducer from '@/reducers/NotificationReducer';

const Navbar = () => {
  const { isAuthenticated, socket, logout } = useAuth();
  const navigate = useNavigate();

  const [notifications, dispatch] = useReducer(NotificationsReducer, []);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    socket?.on('notification', (data) => {
      dispatch({
        type: 'ADD_NOTIFICATION',
        payload: { id: Date.now().toString(), message: data.message, url: data.url },
      });
    });
    return () => {
      socket?.off('notification');
    };
  }, [socket]);

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const handleNotificationClick = (id: string, url?: string) => {
    console.log('Notification clicked:', id);
    console.log('URL:', url);
    dispatch({ type: 'REMOVE_NOTIFICATION', payload: id });

    if (url) {
      window.open(url, '_blank'); // Open link in a new tab
    }
  };

  return (
    <div>
      <nav className="bg-transparent p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div>
            <Link to="/" className="text-black text-2xl font-bold hover:text-gray-500">
              Cumin
            </Link>
          </div>
          <div className="flex items-center gap-4">
            {isAuthenticated && (
              <div className="relative">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="relative p-2 rounded-full hover:bg-gray-200"
                >
                  <Bell className="w-6 h-6 text-black" />
                  {notifications.length > 0 && (
                    <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full px-2">
                      {notifications.length}
                    </span>
                  )}
                </button>
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-white shadow-lg rounded-lg p-2">
                    {notifications.length === 0 ? (
                      <p className="text-sm text-gray-500 p-2">No new notifications</p>
                    ) : (
                      <ul>
                        {notifications.map((notification) => (
                          <li
                            key={notification.id}
                            onClick={() =>
                              handleNotificationClick(notification.id, notification.url)
                            }
                            className={`p-2 text-sm border-b last:border-b-0 cursor-pointer hover:bg-gray-100 ${
                              notification.url ? 'text-blue-500 underline' : ''
                            }`}
                          >
                            {notification.message}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                )}
              </div>
            )}
            {isAuthenticated ? (
              <button onClick={handleLogout} className="text-black hover:text-blue-500">
                Logout
              </button>
            ) : (
              <Link to="/register" className="text-black hover:text-gray-500">
                Register
              </Link>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
