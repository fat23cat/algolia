import { VStack } from "@chakra-ui/react";
import { Search } from "./Search";
import type { FC } from "react";
import { useRefinementList } from "react-instantsearch";
import { FiltersAccordion } from "./FiltersAccordion";
import type { SearchState } from "../types/types";

interface LeftPanelProps {
  setFrozen: (value: boolean) => void;
  setSearchState: React.Dispatch<React.SetStateAction<SearchState>>;
}

export const LeftPanel: FC<LeftPanelProps> = ({
  setFrozen,
  setSearchState,
}) => {
  const categories = useRefinementList({ attribute: "categories", limit: 30 });
  const brand = useRefinementList({ attribute: "brand", limit: 30 });

  return (
    <VStack gap="24px" w="360px" h="100%" align="start">
      <Search setFrozen={setFrozen} setSearchState={setSearchState} />
      <FiltersAccordion
        groups={[
          {
            title: "Categories",
            options: categories.items,
            onSelect: categories.refine,
          },
          { title: "Brand", options: brand.items, onSelect: brand.refine },
        ]}
      />
    </VStack>
  );
};
