import { FaClock } from 'react-icons/fa';
import { FaUser } from 'react-icons/fa6';
import { useQueryClient } from '@tanstack/react-query';
import { fetchGitHubUser } from '../api/github';

type RecentSearchesProps = {
  recentUssers: string[];
  showSelect: (username: string) => void;
  onSelect: (username: string) => void;
};

const RecentSearches = ({
  recentUssers,
  showSelect,
  onSelect,
}: RecentSearchesProps) => {
  const queryClient = useQueryClient();

  return (
    <div className='recent-searches'>
      <div className='recent-header'>
        <FaClock />
        <h3>Recent Searches:</h3>
      </div>
      <ul>
        {recentUssers.map((user) => (
          <li key={user}>
            <button
              className='recent-user-btn'
              onMouseEnter={() => {// Prefetch user data on hover for better user experience using React Query
                queryClient.prefetchQuery({
                  queryKey: ['userss', user],
                  queryFn: () => fetchGitHubUser(user),
                });
              }}
              onClick={() => {
                showSelect(user);
                onSelect(user);
              }}>
              <FaUser className='user-icon' />
              {user}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecentSearches;
