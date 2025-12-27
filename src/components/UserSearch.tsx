import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchGitHubUser, searchGitHubUser } from '../api/github';
import UserCard from './UserCard';
import RecentSearches from './RecentSearches';
import { useDebounce } from 'use-debounce';
import Footer from './Footer';
import SuggestionsDrop from './SuggestionsDropdown';

const UserSearch = () => {
  const [username, setUsername] = useState('');
  const [submittedUsername, setSubmittedUsername] = useState('');
  const [recentUsers, setRecentUsers] = useState<string[]>(() => {
    const stored = localStorage.getItem('recentUsers');
    return stored ? JSON.parse(stored) : [];
  });

  const [debouncedUsername] = useDebounce(username, 20);
  const [suggestions, setSuggestions] = useState(false);

  useEffect(() => {
    localStorage.setItem('recentUsers', JSON.stringify(recentUsers));
  }, [recentUsers]);
  //query to fetch specific user
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ['users', submittedUsername],
    queryFn: () => fetchGitHubUser(submittedUsername),

    enabled: !!submittedUsername,
  });
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmed = username.trim();
    if (!trimmed) return;
    setSubmittedUsername(trimmed);

    setRecentUsers((prev) => {
      return [trimmed, ...prev.filter((user) => user !== trimmed)].slice(0, 5);
    });
    //   [trimmed, ...prev.filter((users) => users !== trimmed)].slice(0, 5));
  };

  //query to fetch suggestions for search input
  const { data: suggestionns, isFetched } = useQuery({
    queryKey: ['suggest', debouncedUsername],
    queryFn: () => searchGitHubUser(debouncedUsername),
    enabled: debouncedUsername.length > 1,
  });

  return (
    <>
      <form className='form' onSubmit={handleSubmit}>
        <div className='dropdown-wrapper'>
          <input
            type='text'
            placeholder='Enter Github Username...'
            value={username}
            onChange={(e) => {
              const val = e.target.value;
              setUsername(val);
              setSuggestions(val.trim().length > 1);
            }}
          />
          {suggestions &&
            isFetched &&
            (suggestionns.length < 1 ? (
              <p>No suggestions found</p>
            ) : (
              <SuggestionsDrop
                suggestionns={suggestionns}
                show={suggestions}
                onSelect={(searchterm) => {
                  setUsername(searchterm);
                  setSuggestions(false);
                  if (searchterm.trim() !== submittedUsername) {
                    setSubmittedUsername(searchterm);
                  } else {
                    refetch();
                  }
                  setRecentUsers((prev) => {
                    return [
                      searchterm,
                      ...prev.filter((user) => user !== searchterm),
                    ].slice(0, 5);
                  });
                  //   [trimmed, ...prev.filter((users) => users !== trimmed)].slice(0, 5));
                }}
              />
            ))}
        </div>
        <button type='submit'>Search</button>
      </form>
      {isLoading && <p className='status'>Loading...</p>}
      {isError && <p className='status error'>{error.message}</p>}
      {data && <UserCard userData={data} />}
      {recentUsers.length > 0 && (
        <RecentSearches
          recentUssers={recentUsers}
          showSelect={setSubmittedUsername}
          onSelect={setUsername}
        />
      )}
      <Footer
        submittedUsername={setSubmittedUsername}
        setUsername={setUsername}
        username={'Karam-999'}
      />
    </>
  );
};

export default UserSearch;
