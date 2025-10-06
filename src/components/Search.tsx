import {
  Box,
  CloseButton,
  For,
  Input,
  InputGroup,
  List,
  Text,
} from "@chakra-ui/react";
import { useRef, useState, type FC } from "react";
import { useHits, useSearchBox } from "react-instantsearch";
import type { SearchState } from "../types/types";

interface SearchProps {
  setSearchState: React.Dispatch<React.SetStateAction<SearchState>>;
}

export const Search: FC<SearchProps> = ({ setSearchState }) => {
  const { refine, query, clear } = useSearchBox();
  const { items } = useHits();
  const [focused, setFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const open = focused && !!query && items.length > 0;

  const reset = () => {
    clear();
    setSearchState({ query: "", isEditing: false });
    inputRef.current?.blur();
  };

  const endElement = query ? (
    <CloseButton size="xs" onClick={reset} me="-2" />
  ) : undefined;

  const handleSelect = (query: string) => {
    refine(query);
    setSearchState({ query, isEditing: false });
    setFocused(false);
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setSearchState({ query, isEditing: false });
        setFocused(false);
      }}
    >
      <Box position="relative" className="ais-SearchBox">
        <InputGroup w="360px" endElement={endElement} position="relative">
          <Input
            ref={inputRef}
            placeholder="Search"
            value={query}
            onChange={(e) => {
              const q = e.currentTarget.value;
              refine(q);
            }}
            onFocus={() => {
              setFocused(true);
              setSearchState((s) => ({ ...s, isEditing: true }));
            }}
            onBlur={() => {
              setTimeout(() => {
                handleSelect(inputRef.current?.value || "");
              }, 100);
            }}
          />
        </InputGroup>
        {open && (
          <List.Root
            w="360px"
            overflow="auto"
            pos="absolute"
            zIndex={1}
            bg="white"
            border="1px solid"
            h="380px"
          >
            <For each={items}>
              {(item) => (
                <List.Item
                  key={item.objectID}
                  cursor="pointer"
                  onClick={() => handleSelect(item.name)}
                >
                  <Text color="black" fontWeight="medium" truncate>
                    {item.name}
                  </Text>
                </List.Item>
              )}
            </For>
          </List.Root>
        )}
      </Box>
    </form>
  );
};
