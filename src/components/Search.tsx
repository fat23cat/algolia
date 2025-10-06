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
  setFrozen: (value: boolean) => void;
  setSearchState: React.Dispatch<React.SetStateAction<SearchState>>;
}

export const Search: FC<SearchProps> = ({ setFrozen, setSearchState }) => {
  const { refine } = useSearchBox();
  const [value, setValue] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const results = useHits();

  const endElement = value ? (
    <CloseButton
      size="xs"
      onClick={(e) => {
        refine("");
        setValue("");
        setSearchState({ isEditMode: false, query: "" });
        inputRef.current?.blur();
        e.stopPropagation();
      }}
      me="-2"
    />
  ) : undefined;

  const handleSubmit = () => {
    refine(value);
    setIsOpen(false);
    setSearchState((prev) => ({ ...prev, query: value }));
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
        inputRef.current?.blur();
      }}
    >
      <Box position="relative" className="ais-SearchBox">
        <InputGroup w="360px" endElement={endElement} position="relative">
          <Input
            ref={inputRef}
            placeholder="Search"
            value={value}
            onChange={(e) => {
              setValue(e.currentTarget.value);
              refine(e.currentTarget.value);
            }}
            onBlur={() => {
              setTimeout(() => {
                handleSubmit();
                setFrozen(false);
                setSearchState((prev) => ({ ...prev, isEditMode: false }));
              }, 100);
            }}
            onFocus={() => {
              setIsOpen(true);
              setFrozen(true);
              setSearchState((prev) => ({ ...prev, isEditMode: true }));
            }}
          />
        </InputGroup>
        {isOpen && value && results.items.length > 0 && (
          <List.Root
            w="360px"
            overflow="scroll"
            pos="absolute"
            zIndex={1}
            bg="white"
            border="1px solid"
            h="380px"
          >
            <For each={results.items}>
              {(item) => (
                <List.Item
                  cursor="pointer"
                  key={item.objectID}
                  onClick={() => {
                    setValue(item.name);
                    refine(item.name);
                    setIsOpen(false);
                    setSearchState({
                      query: item.name,
                      isEditMode: false,
                    });
                  }}
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
