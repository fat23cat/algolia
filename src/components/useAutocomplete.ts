import {
  createAutocomplete,
  type AutocompleteState,
  type BaseItem,
} from "@algolia/autocomplete-core";
import { liteClient } from "algoliasearch/lite";
import { createQuerySuggestionsPlugin } from "@algolia/autocomplete-plugin-query-suggestions";
import { useMemo, useRef, useState } from "react";

interface Hit extends BaseItem {
  objectID: string;
  query: string;
}

const DEBOUNCE_MS = 200;
const MIN_LENGTH = 3;

export function useAutocomplete() {
  const [searchClient] = useState(() =>
    liteClient(
      import.meta.env.VITE_ALGOLIA_APP_ID!,
      import.meta.env.VITE_ALGOLIA_SEARCH_KEY!
    )
  );
  const [state, setState] = useState<AutocompleteState<Hit>>({
    collections: [],
    completion: null,
    context: {},
    isOpen: false,
    query: "",
    activeItemId: null,
    status: "idle",
  });
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastQueryRef = useRef("");

  const querySuggestionsPlugin = useMemo(
    () =>
      createQuerySuggestionsPlugin({
        searchClient,
        indexName: import.meta.env.VITE_ALGOLIA_SUGGESTIONS_INDEX!,
        getSearchParams() {
          return { hitsPerPage: 10 };
        },
        transformSource({ source }) {
          return {
            ...source,
            async getItems(params) {
              const q = params.state.query.trim();
              if (q.length < MIN_LENGTH) {
                return [];
              }
              if (timerRef.current) {
                clearTimeout(timerRef.current);
              }
              lastQueryRef.current = q;

              return new Promise((resolve) => {
                timerRef.current = setTimeout(async () => {
                  const items = await source.getItems(params);
                  resolve(lastQueryRef.current === q ? items : []);
                }, DEBOUNCE_MS);
              });
            },
            onSelect({ item, setQuery, refresh }) {
              setQuery(item.query);
              refresh();
            },
          };
        },
      }),
    [searchClient]
  );

  const autocomplete = useMemo(
    () =>
      createAutocomplete<Hit>({
        plugins: [querySuggestionsPlugin],
        onStateChange({ state }) {
          setState(state);
        },
      }),
    [querySuggestionsPlugin]
  );

  return { autocomplete, state };
}
