import { FaGithub } from 'react-icons/fa';
import type { GitHubUser } from '../types';

const UserCard = ({ userData }: { userData: GitHubUser }) => {
  return (
    <div className='user-card'>
      <img src={userData.avatar_url} alt={userData.login} className='avatar' />
      <h2>{userData.name || userData.login}</h2>
      <p className='bio'>
        {userData.bio || 'This user has no bio.'}
        <a
          href={userData.html_url}
          className='profile-btn'
          target='_blank'
          rel='noopener noreferrer'>
          <FaGithub /> View Profile
        </a>
      </p>
    </div>
  );
};

export default UserCard;
