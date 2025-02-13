import Router from '@/router/Router';
import { AuthenticationProvider } from '@/context/AuthenticationProvider';

const App = () => {
  return (
    <AuthenticationProvider>
      <Router />
    </AuthenticationProvider>
  );
};

export default App;
