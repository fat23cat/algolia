import { HStack } from "@chakra-ui/react";
import { LeftPanel } from "./components/LeftPanel";
import { RightPanel } from "./components/RightPanel";
import { useState } from "react";
import { SearchProvider } from "./components/SearchProvider";

function App() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <HStack gap="24px" p="16px" align="start" h="100%">
      <SearchProvider>
        <LeftPanel setSearchQuery={setSearchQuery} />
      </SearchProvider>
      <SearchProvider>
        <RightPanel searchQuery={searchQuery} />
      </SearchProvider>
    </HStack>
  );
}

export default App;
