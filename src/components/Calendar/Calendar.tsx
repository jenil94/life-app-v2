import dayjs from "dayjs";
import isoWeek from "dayjs/plugin/isoWeek";
import advancedFormat from "dayjs/plugin/advancedFormat";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import { Grid, Center, Box } from "@mantine/core";
import { IconX } from "@tabler/icons-react";
import classes from "./Calendar.module.css";

dayjs.extend(isoWeek);
dayjs.extend(advancedFormat);
dayjs.extend(isSameOrBefore);
dayjs.extend(advancedFormat);

interface CalendarProps {
  selectedDate: Date;
  habit: HabitType;
  handleDateClick: (date: string, habit: HabitType) => void;
}

export function Calendar({
  selectedDate,
  habit,
  handleDateClick,
}: CalendarProps) {
  const date = dayjs(selectedDate);

  const startingDate = date.startOf("month").startOf("week");
  const endDate = date.endOf("month").endOf("week");

  const getDates = () => {
    const calendar = [];

    calendar.push(
      ["S", "M", "T", "W", "T", "F", "S"].map((day) => (
        <Grid.Col span={1}>
          <Center>{day}</Center>
        </Grid.Col>
      )),
    );

    let currentDate = startingDate;
    while (currentDate.isSameOrBefore(endDate)) {
      let temparr = new Array(7).fill("");
      for (let i = 0; i < 7; i++) {
        const dateClone = currentDate.add(i, "day");
        const isChecked =
          dateClone.format("x") in habit.entries &&
          habit.entries[dateClone.format("x")];
        if (dateClone.get("month") === date.get("month")) {
          temparr[i] = (
            <Grid.Col
              className={classes.day}
              span={1}
              onClick={() => handleDateClick(dateClone.format("x"), habit)}
            >
              <Center
                style={{
                  position: "relative",
                }}
              >
                {dateClone.date()}
                {isChecked && (
                  <IconX
                    color={"#E03131"}
                    style={{
                      position: "absolute",
                    }}
                  />
                )}
              </Center>
            </Grid.Col>
          );
        } else {
          temparr[i] = (
            <Grid.Col span={1} c={"gray.4"}>
              {dateClone.date()}
            </Grid.Col>
          );
        }
      }
      calendar.push(temparr);
      currentDate = currentDate.add(7, "day");
    }
    return <Grid columns={7}>{calendar}</Grid>;
  };

  return <Box>{getDates()}</Box>;
}
