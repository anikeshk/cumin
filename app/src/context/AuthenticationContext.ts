import { createContext } from 'react';

import { AuthenticationContextType } from '@/types';

const AuthenticationContext = createContext<AuthenticationContextType | undefined>(undefined);

export default AuthenticationContext;
