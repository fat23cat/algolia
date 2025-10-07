import { VStack } from "@chakra-ui/react";
import type { FC } from "react";
import { useRefinementList } from "react-instantsearch";
import { FiltersAccordion } from "./FiltersAccordion";
import { Autocomplete } from "./Autocomplete";

interface LeftPanelProps {
  setSearch: (value: string) => void;
}

export const LeftPanel: FC<LeftPanelProps> = ({ setSearch }) => {
  const categories = useRefinementList({ attribute: "categories", limit: 30 });
  const brand = useRefinementList({ attribute: "brand", limit: 30 });

  return (
    <VStack gap="24px" w="360px" h="100%" align="start">
      <Autocomplete setSearch={setSearch} />
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
