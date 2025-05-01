import { useRouter } from 'next/router';
import { useEffect } from 'react';

const AuthPage = () => {
  const router = useRouter();
  const { authType } = router.query;

  useEffect(() => {
    if (authType === 'login') {
      // Implement login logic here
    } else if (authType === 'register') {
      // Implement registration logic here
    } else {
      // Handle other authentication types or redirect
    }
  }, [authType]);

  return (
    <div>
      <h1>{authType === 'login' ? 'Login' : 'Register'}</h1>
      {/* Add your form or authentication UI here */}
    </div>
  );
};

export default AuthPage;
