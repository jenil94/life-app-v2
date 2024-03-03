import { Box, Flex, Title, Group, Menu } from "@mantine/core";
import { Calendar } from "../Calendar/Calendar";
import { IconDotsVertical, IconTrash } from "@tabler/icons-react";

interface HabitBoxProps {
  habitName: string;
  habit: HabitType;
  selectedMonth: Date;
  updateHabit: (habit: HabitType) => void;
  deleteHabit: (habit: HabitType) => void;
}

export function HabitBox({
  habitName,
  selectedMonth,
  habit,
  updateHabit,
  deleteHabit,
}: HabitBoxProps) {
  function handleDateClick(date: string) {
    const updatedHabit = { ...habit };
    updatedHabit.entries[date] = !habit.entries[date];

    if (updatedHabit.entries[date] === false) {
      delete updatedHabit.entries[date];
    }

    updateHabit(updatedHabit);
  }

  return (
    <Box w={280} p={16}>
      <Flex align="center" justify={"space-between"} pb={16}>
        <Title order={5}>{habitName}</Title>
        <Group>
          <Menu shadow="md" width={160} position="bottom-end">
            <Menu.Target>
              <IconDotsVertical size={16} />
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Item
                color="red"
                leftSection={<IconTrash size={16} />}
                onClick={() => {
                  deleteHabit(habit);
                }}
              >
                Delete
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Group>
      </Flex>
      <Calendar
        habit={habit}
        selectedDate={selectedMonth}
        handleDateClick={handleDateClick}
      />
    </Box>
  );
}
