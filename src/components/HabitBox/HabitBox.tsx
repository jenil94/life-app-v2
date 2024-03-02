import { Box, Flex, Title, Text } from "@mantine/core";
import { Calendar } from "../Calendar/Calendar";
import dayjs from "dayjs";

interface HabitBoxProps {
  habitName: string;
  habit: HabitType;
  selectedMonth: Date;
}

export function HabitBox({ habitName, selectedMonth, habit }: HabitBoxProps) {
  return (
    <Box w={280} p={16}>
      <Flex align="center" justify={"space-between"} pb={16}>
        <Title order={5}>{habitName}</Title>
        <Text>{dayjs(selectedMonth).format("MMM YYYY")}</Text>
      </Flex>
      <Calendar habit={habit} selectedDate={selectedMonth} />
    </Box>
  );
}
