import { algoliasearch } from "algoliasearch";
import type { FC, PropsWithChildren } from "react";
import { InstantSearch } from "react-instantsearch";

const searchClient = algoliasearch(
  import.meta.env.VITE_ALGOLIA_APP_ID!,
  import.meta.env.VITE_ALGOLIA_SEARCH_KEY!
);

export const SearchProvider: FC<PropsWithChildren> = ({ children }) => {
  return (
    <InstantSearch
      searchClient={searchClient}
      indexName={import.meta.env.VITE_ALGOLIA_INDEX!}
    >
      {children}
    </InstantSearch>
  );
};
