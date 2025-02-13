import { useAuth } from '@/context/AuthProvider';

const Dashboard = () => {
  const { user } = useAuth();

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Welcome, {user.name}!</h1>
    </div>
  );
};

export default Dashboard;
