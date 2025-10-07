import { useRef, useState } from "react";
import {
  Box,
  CloseButton,
  For,
  Input,
  InputGroup,
  List,
  Text,
} from "@chakra-ui/react";
import { parseAlgoliaHitHighlight } from "@algolia/autocomplete-preset-algolia";
import { useAutocomplete } from "./useAutocomplete";
import type { BaseItem } from "@algolia/autocomplete-core";

interface AutocompleteProps {
  setSearch: (value: string) => void;
}

export function Autocomplete({ setSearch }: AutocompleteProps) {
  const [focused, setFocused] = useState(false);
  const { autocomplete, state } = useAutocomplete();
  const inputRef = useRef<HTMLInputElement | null>(null);

  const open =
    focused && !!state.query && state.collections[0]?.items.length > 0;
  const inputProps = autocomplete.getInputProps({
    inputElement: inputRef.current,
  });

  const onClose = () => {
    autocomplete.setQuery("");
    setSearch("");
    inputRef.current?.blur();
  };

  const onSelect = (query: string) => {
    setSearch(query);
    setFocused(false);
    inputRef.current?.blur();
  };

  const endElement = inputProps.value ? (
    <CloseButton size="xs" onClick={onClose} me="-2" />
  ) : undefined;

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setSearch(inputRef.current?.value || "");
        setFocused(false);
        inputRef.current?.blur();
      }}
    >
      <Box position="relative">
        <InputGroup w="360px" endElement={endElement} position="relative">
          <Input
            ref={inputRef}
            placeholder="Search"
            onChange={(e) => inputProps.onChange(e as unknown as Event)}
            value={inputProps.value}
            onFocus={() => {
              setFocused(true);
            }}
            onBlur={() => {
              setTimeout(() => {
                onSelect(inputRef.current?.value || "");
              }, 0);
            }}
          />
        </InputGroup>

        {open && (
          <List.Root
            listStyle="none"
            w="360px"
            overflow="auto"
            pos="absolute"
            zIndex={1}
            bg="white"
            border="1px solid"
            maxHeight="200px"
            p="0px 14px"
          >
            <For each={state.collections[0]?.items || []}>
              {(item) => {
                const parsed = parseAlgoliaHitHighlight({
                  hit: item as BaseItem,
                  attribute: "query",
                });

                const { onClick, onMouseDown, onMouseMove, ...rest } =
                  autocomplete.getItemProps({
                    item,
                    source: state.collections[0].source,
                  });

                return (
                  <List.Item key={item.objectID} cursor="pointer">
                    <Text
                      color="black"
                      fontWeight="medium"
                      truncate
                      onClick={(e) => {
                        onClick(e as unknown as MouseEvent);
                        onSelect(item.query);
                      }}
                      onMouseDown={(e) =>
                        onMouseDown(e as unknown as MouseEvent)
                      }
                      onMouseMove={(e) =>
                        onMouseMove(e as unknown as MouseEvent)
                      }
                      {...rest}
                    >
                      {parsed.map((part, index) =>
                        part.isHighlighted ? (
                          <b key={index}>{part.value}</b>
                        ) : (
                          part.value
                        )
                      )}
                    </Text>
                  </List.Item>
                );
              }}
            </For>
          </List.Root>
        )}
      </Box>
    </form>
  );
}
