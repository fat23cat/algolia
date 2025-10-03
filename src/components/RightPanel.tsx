import { For, ScrollArea, VStack } from "@chakra-ui/react";
import type { FC } from "react";
import { useConfigure, useHits } from "react-instantsearch";

interface RightPanelProps {
  isSubmitted: boolean;
}

export const RightPanel: FC<RightPanelProps> = ({ isSubmitted }) => {
  useConfigure({ hitsPerPage: 100 });
  const results = useHits();

  if (!isSubmitted) {
    return null;
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
