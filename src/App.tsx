import { HStack } from "@chakra-ui/react";
import { LeftPanel } from "./components/LeftPanel";
import { RightPanel } from "./components/RightPanel";
import { useState } from "react";
import type { SearchState } from "./types/types";

function App() {
  const [searchState, setSearchState] = useState<SearchState>({
    query: "",
    isEditing: false,
  });

  return (
    <HStack gap="24px" p="16px" align="start" h="100%">
      <LeftPanel setSearchState={setSearchState} />
      <RightPanel searchState={searchState} />
    </HStack>
  );
}

export default App;
