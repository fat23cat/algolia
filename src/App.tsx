import { HStack } from "@chakra-ui/react";
import { LeftPanel } from "./components/LeftPanel";
import { RightPanel } from "./components/RightPanel";
import { useState } from "react";
import { useSearchBox } from "react-instantsearch";

function App() {
  const { refine } = useSearchBox();
  const [search, setSearch] = useState("");

  const onSearchChange = (value: string) => {
    setSearch(value);
    refine(value);
  };

  return (
    <HStack gap="24px" p="16px" align="start" h="100%">
      <LeftPanel setSearch={onSearchChange} />
      <RightPanel search={search} />
    </HStack>
  );
}

export default App;
