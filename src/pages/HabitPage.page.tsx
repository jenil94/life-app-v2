import { HabitBox } from "@/components/HabitBox/HabitBox";
import { Title, Box, Flex, Button } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { MonthPickerInput } from "@mantine/dates";
import { useState } from "react";
import { IconPlus } from "@tabler/icons-react";
import { HABIT_LIST } from "../data/habits";
import { AddHabitModal } from "@/components/AddHabitModal/AddHabitModal";

export function HabitPage() {
  const [value, setValue] = useState<Date | null>(new Date());
  const [opened, { open, close }] = useDisclosure(false);
  const [habitData, setHabitData] = useState(HABIT_LIST);

  const onAdd = (habitName: string) => {
    setHabitData((prev) => {
      return [
        ...prev,
        {
          name: habitName,
        },
      ];
    });
    close();
  };

  return (
    <Box px={16}>
      <Flex align="center" justify="space-between">
        <Title order={4}>Habit Tracker</Title>
        <Flex align="center">
          <MonthPickerInput
            w={240}
            label=""
            value={value}
            onChange={setValue}
            placeholder="Pick month"
          />
          <Button
            leftSection={<IconPlus size={14} />}
            ml={24}
            variant="filled"
            onClick={() => {
              open();
            }}
          >
            Add New X Item
          </Button>
        </Flex>
      </Flex>
      <Box
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gridGap: "20px",
        }}
        mt={24}
      >
        {habitData.map((habit) => {
          return (
            <HabitBox
              key={habit.name}
              habit={habit}
              habitName={habit.name}
              selectedMonth={value as Date}
            />
          );
        })}
      </Box>
      <AddHabitModal opened={opened} onClose={close} onAdd={onAdd} />
    </Box>
  );
}
