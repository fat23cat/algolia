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

interface SearchProps {
  onSubmit: (value: boolean) => void;
}

export const Search: FC<SearchProps> = ({ onSubmit }) => {
  const { refine } = useSearchBox();
  const [value, setValue] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const results = useHits();

  const endElement = value ? (
    <CloseButton
      size="xs"
      onClick={() => {
        refine("");
        setValue("");
        inputRef.current?.focus();
        onSubmit(false);
      }}
      me="-2"
    />
  ) : undefined;

  const handleSubmit = () => {
    refine(value);
    setIsOpen(false);
    onSubmit(!!value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box position="relative" className="ais-SearchBox">
        <InputGroup w="360px" endElement={endElement} position="relative">
          <Input
            ref={inputRef}
            placeholder="Search"
            value={value}
            onChange={(e) => {
              refine(e.currentTarget.value);
              setValue(e.currentTarget.value);
            }}
            onBlur={() =>
              setTimeout(() => {
                handleSubmit();
              }, 100)
            }
            onFocus={() => setIsOpen(true)}
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
                    onSubmit(true);
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
