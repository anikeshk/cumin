import Router from '@/router/Router';
import { AuthenticationProvider } from '@/providers/AuthenticationProvider';

const App = () => {
  return (
    <AuthenticationProvider>
      <Router />
    </AuthenticationProvider>
  );
};

export default App;
