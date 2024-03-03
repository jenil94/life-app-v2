import { Modal, Box, TextInput, Button, Flex } from "@mantine/core";
import { useState } from "react";

interface AddHabitModalProps {
  opened: boolean;
  onClose: () => void;
  onAdd: (name: string) => void;
}

export function AddHabitModal({ opened, onClose, onAdd }: AddHabitModalProps) {
  const [name, setName] = useState("");
  return (
    <Modal opened={opened} onClose={onClose} title="Add Item">
      <Box>
        <TextInput
          label="Name"
          placeholder="Item Name"
          value={name}
          onChange={(event) => setName(event.currentTarget.value)}
          inputWrapperOrder={["label", "error", "input", "description"]}
        />
        <Flex mt={20}>
          <Button onClick={() => onAdd(name)}>Save</Button>
          <Button ml={8} variant="default" onClick={onClose}>
            Cancel
          </Button>
        </Flex>
      </Box>
    </Modal>
  );
}
