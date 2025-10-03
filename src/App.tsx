import { HStack } from "@chakra-ui/react";
import { LeftPanel } from "./components/LeftPanel";
import { RightPanel } from "./components/RightPanel";
import { useState } from "react";

function App() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  return (
    <HStack gap="24px" p="16px" align="start" h="100%">
      <LeftPanel onSubmit={setIsSubmitted} />
      <RightPanel isSubmitted={isSubmitted} />
    </HStack>
  );
}

export default App;
