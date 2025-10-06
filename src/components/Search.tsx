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
import { useOutsideClick } from "./useOutsideClick";

interface SearchProps {
  setSearchQuery: (value: string) => void;
}

export const Search: FC<SearchProps> = ({ setSearchQuery }) => {
  const { refine, query, clear } = useSearchBox();
  const { items } = useHits();
  const [focused, setFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const open = focused && !!query && items.length > 0;

  useOutsideClick(inputRef, () => {
    setTimeout(() => {
      handleSelect(inputRef.current?.value || "");
    }, 100);
  });

  const reset = () => {
    clear();
    setSearchQuery("");
    inputRef.current?.blur();
  };

  const endElement = query ? (
    <CloseButton size="xs" onClick={reset} me="-2" />
  ) : undefined;

  const handleSelect = (name: string) => {
    refine(name);
    setSearchQuery(name);
    setFocused(false);
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setSearchQuery(query);
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
