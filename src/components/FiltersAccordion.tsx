import {
  Accordion,
  Checkbox,
  CheckboxGroup,
  For,
  ScrollArea,
  Span,
} from "@chakra-ui/react";
import type { FC } from "react";

interface FiltersAccordionProps {
  groups: Group[];
}

interface Group {
  title: string;
  options: Item[];
  onSelect: (value: string) => void;
}

interface Item {
  value: string;
  label: string;
  highlighted?: string;
  count: number;
  isRefined: boolean;
}

export const FiltersAccordion: FC<FiltersAccordionProps> = ({ groups }) => {
  return (
    <ScrollArea.Root variant="always">
      <ScrollArea.Viewport>
        <ScrollArea.Content paddingEnd="3" textStyle="sm">
          <Accordion.Root multiple>
            <For each={groups}>
              {(group) => (
                <Accordion.Item
                  key={group.title}
                  value={group.title}
                  border="none"
                >
                  <Accordion.ItemTrigger p="8px 24px">
                    <Span>
                      {group.title} (
                      {group.options.reduce((acc, item) => acc + item.count, 0)}
                      )
                    </Span>
                    <Accordion.ItemIndicator />
                  </Accordion.ItemTrigger>
                  <Accordion.ItemContent>
                    <Accordion.ItemBody>
                      <CheckboxGroup
                        p="0 28px"
                        gap="24px"
                        w="100%"
                        onChange={(e) => {
                          group.onSelect((e.target as HTMLInputElement).value);
                        }}
                      >
                        <For each={group.options}>
                          {(option) => (
                            <Checkbox.Root
                              key={option.label}
                              value={option.label}
                              checked={option.isRefined}
                            >
                              <Checkbox.HiddenInput />
                              <Checkbox.Control />
                              <Checkbox.Label>
                                {option.label} ({option.count})
                              </Checkbox.Label>
                            </Checkbox.Root>
                          )}
                        </For>
                      </CheckboxGroup>
                    </Accordion.ItemBody>
                  </Accordion.ItemContent>
                </Accordion.Item>
              )}
            </For>
          </Accordion.Root>
        </ScrollArea.Content>
      </ScrollArea.Viewport>
      <ScrollArea.Scrollbar />
    </ScrollArea.Root>
  );
};
