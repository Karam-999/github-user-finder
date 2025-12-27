import type { GitHubUser } from '../types';

type SuggestionsDropProps = {
  suggestionns: GitHubUser[];
  show: boolean;
  onSelect: (username: string) => void;
};

const SuggestionsDrop = ({
  suggestionns,
  show,
  onSelect,
}: SuggestionsDropProps) => {
  if (!show || suggestionns.length === 0) return null;
  return (
    <ul className='suggestions'>
      {suggestionns.slice(0, 100).map((user: GitHubUser) => (
        <li
          key={user.login}
          onClick={() => {
            onSelect(user.login);
          }}>
          <img src={user.avatar_url} alt={user.login} className='avatar-xs' />
          {user.login}
        </li>
      ))}
    </ul>
  );
};

export default SuggestionsDrop;
