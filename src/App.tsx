import { HStack } from "@chakra-ui/react";
import { LeftPanel } from "./components/LeftPanel";
import { RightPanel } from "./components/RightPanel";
import { useState } from "react";
import type { SearchState } from "./types/types";

function App() {
  const [frozen, setFrozen] = useState(true);
  const [searchState, setSearchState] = useState<SearchState>({
    query: "",
    isEditMode: false,
  });

  return (
    <HStack gap="24px" p="16px" align="start" h="100%">
      <LeftPanel setFrozen={setFrozen} setSearchState={setSearchState} />
      <RightPanel frozen={frozen} searchState={searchState} />
    </HStack>
  );
}

export default App;
