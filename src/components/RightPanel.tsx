import { Center, For, ScrollArea, VStack } from "@chakra-ui/react";
import { useEffect, useState, type FC } from "react";
import { useConfigure, useHits, useInstantSearch } from "react-instantsearch";
import type { SearchState } from "../types/types";

interface RightPanelProps {
  searchState: SearchState;
}

export const RightPanel: FC<RightPanelProps> = ({ searchState }) => {
  useConfigure({ hitsPerPage: 100 });
  const results = useHits();
  const { status } = useInstantSearch();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [frozenItems, setFrozenItems] = useState<any[]>([]);

  useEffect(() => {
    if (!searchState.isEditing) {
      setFrozenItems(results.items);
    }
  }, [searchState.isEditing, results.items]);

  if (!searchState.query) {
    return null;
  }

  if (status === "loading" && !searchState.isEditing) {
    return <Center w="100%">Loading...</Center>;
  }

  return (
    <ScrollArea.Root variant="always">
      <ScrollArea.Viewport>
        <ScrollArea.Content paddingEnd="3" textStyle="sm">
          <VStack gap="16px" align="start" w="100%">
            <For each={frozenItems}>
              {(item) => <div key={item.objectID}>{item.name}</div>}
            </For>
          </VStack>
        </ScrollArea.Content>
      </ScrollArea.Viewport>
      <ScrollArea.Scrollbar />
    </ScrollArea.Root>
  );
};
