import { useState } from 'react';
import { ImSearch } from 'react-icons/im';

import {
  SearchbarHeader,
  SearchForm,
  SearchFormBtn,
  FormInput,
} from './Searchbar.styled';

export function Searchbar({ onSubmit }) {
  const [query, setQuery] = useState('');

  const handleNameChange = event => {
    setQuery(event.currentTarget.value.toLowerCase());
  };

  const handleSubmit = event => {
    event.preventDefault();

    if (query.trim() === '') {
      alert('Enter your request please');

      return;
    }

    onSubmit(query);
  };

  return (
    <SearchbarHeader>
      <SearchForm onSubmit={handleSubmit}>
        <SearchFormBtn type="submit">
          <ImSearch />
        </SearchFormBtn>

        <FormInput
          type="text"
          autocomplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={query}
          onChange={handleNameChange}
        />
      </SearchForm>
    </SearchbarHeader>
  );
}
