import { Center, Flex, For, ScrollArea, Text, VStack } from "@chakra-ui/react";
import { type FC } from "react";
import { useConfigure, useHits, useInstantSearch } from "react-instantsearch";

interface RightPanelProps {
  search: string;
}

export const RightPanel: FC<RightPanelProps> = ({ search }) => {
  useConfigure({ hitsPerPage: 100 });
  const results = useHits();
  const { status } = useInstantSearch();

  if (!search) {
    return null;
  }

  if (status === "loading") {
    return (
      <Center w="100%" h="100%">
        Loading...
      </Center>
    );
  }

  return (
    <VStack h="100%" w="100%" align="start" gap="24px">
      <Flex w="100%" justify="space-between" align="center">
        <Text>{results.items.length} objects found</Text>
      </Flex>
      <ScrollArea.Root variant="always">
        <ScrollArea.Viewport>
          <ScrollArea.Content paddingEnd="3" textStyle="sm">
            <VStack gap="16px" align="start" w="100%">
              <For each={results.items}>
                {(item) => (
                  <VStack
                    align="start"
                    p="8px"
                    borderRadius="4px"
                    w="100%"
                    border="1px solid"
                    borderColor="gray.200"
                    key={item.objectID}
                    gap="8px"
                  >
                    <Text>{item.name}</Text>
                    <Text>Price: {item.price}</Text>
                    <Text color="gray.500">{item.categories.join(", ")}</Text>
                  </VStack>
                )}
              </For>
            </VStack>
          </ScrollArea.Content>
        </ScrollArea.Viewport>
        <ScrollArea.Scrollbar />
      </ScrollArea.Root>
    </VStack>
  );
};
