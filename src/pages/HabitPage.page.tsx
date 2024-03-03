import { HabitBox } from "@/components/HabitBox/HabitBox";
import { Title, Box, Flex, Button } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useCollection } from "react-firebase-hooks/firestore";
import { MonthPickerInput } from "@mantine/dates";
import { useState } from "react";
import { IconPlus } from "@tabler/icons-react";
import {
  doc,
  collection,
  updateDoc,
  addDoc,
  deleteDoc,
} from "firebase/firestore";
import { AddHabitModal } from "@/components/AddHabitModal/AddHabitModal";
import { db } from "@/data/firebase";

export function HabitPage() {
  const [value, setValue] = useState<Date | null>(new Date());
  const [opened, { open, close }] = useDisclosure(false);
  const habitRef = collection(db, "habits");

  const [hData, loading, error] = useCollection(habitRef);

  const habitData =
    (hData?.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    })) as Array<HabitType>) || [];

  const onAdd = async (habitName: string) => {
    try {
      await addDoc(habitRef, {
        name: habitName,
        entries: {},
      });
    } catch (e) {
      console.error("Error adding document: ", e);
    }
    close();
  };

  async function updateHabit(habit: HabitType) {
    const habitDocRef = doc(db, "habits", habit.id);
    try {
      await updateDoc(habitDocRef, { ...habit });
    } catch (e) {
      console.error("Error updating document: ", e);
    }
  }

  async function deleteHabit(habit: HabitType) {
    const habitDocRef = doc(db, "habits", habit.id);
    try {
      await deleteDoc(habitDocRef);
    } catch (e) {
      console.error("Error updating document: ", e);
    }
  }

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
          userSelect: "none",
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
              updateHabit={updateHabit}
              deleteHabit={deleteHabit}
            />
          );
        })}
      </Box>
      <AddHabitModal opened={opened} onClose={close} onAdd={onAdd} />
    </Box>
  );
}
