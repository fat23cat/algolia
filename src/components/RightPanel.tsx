import { Center, For, ScrollArea, VStack } from "@chakra-ui/react";
import { useEffect, type FC } from "react";
import {
  useConfigure,
  useHits,
  useInstantSearch,
  useSearchBox,
} from "react-instantsearch";

interface RightPanelProps {
  searchQuery: string;
}

export const RightPanel: FC<RightPanelProps> = ({ searchQuery }) => {
  const { refine, clear } = useSearchBox();
  useConfigure({ hitsPerPage: 100 });
  const results = useHits();
  const { status } = useInstantSearch();

  useEffect(() => {
    if (searchQuery) {
      refine(searchQuery);
    } else {
      clear();
    }
  }, [refine, clear, searchQuery]);

  if (!searchQuery) {
    return null;
  }

  if (status === "loading") {
    return <Center w="100%">Loading...</Center>;
  }

  return (
    <ScrollArea.Root variant="always">
      <ScrollArea.Viewport>
        <ScrollArea.Content paddingEnd="3" textStyle="sm">
          <VStack gap="16px" align="start" w="100%">
            <For each={results.items}>
              {(item) => <div key={item.objectID}>{item.name}</div>}
            </For>
          </VStack>
        </ScrollArea.Content>
      </ScrollArea.Viewport>
      <ScrollArea.Scrollbar />
    </ScrollArea.Root>
  );
};
