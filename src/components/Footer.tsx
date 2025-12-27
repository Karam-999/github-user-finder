import { useQueryClient } from '@tanstack/react-query';
import { fetchGitHubUser } from '../api/github';

type FooterProps = {
    username: string;
    setUsername: (username: string) => void;
    submittedUsername: (username: string) => void;
}
const Footer = ({ username, setUsername, submittedUsername }: FooterProps) => {
  const queryClient = useQueryClient();
  return (
    <footer className='footer'>
      <p>
        developed by{' '}
        <a
          style={{
            cursor: 'pointer',
            color: '#10009fff',
            fontWeight: 'bold',
          }}
          onClick={() => {
            setUsername(username);
            submittedUsername(username);
                  }}
                  onMouseEnter={() => {
                  queryClient.prefetchQuery({
                    queryKey: ['userss', username],
                    queryFn: () => fetchGitHubUser(username),
                  });
              }}>
          Karam
        </a>{' '}
        &copy; 2025
      </p>
    </footer>
  );
};

export default Footer;
