import { Title } from '@mantine/core';
import { useState } from 'react';
import { MonthPickerInput } from '@mantine/dates';
import { IconDatabase } from '@tabler/icons-react';
import { Button, Flex } from '@mantine/core';
const HabitPage = () => {
    const [value, setValue] = useState(new Date());

return <>
    <Title order={3} size="h3">
        Habits
    </Title>
    <Flex
        justify="space-between"
        align="center"
        direction="row"
    >
    <MonthPickerInput
        label=""
        placeholder="Pick Month"
        value={value}
        onChange={setValue}
    />
    <Button leftIcon={<IconDatabase size="1rem" />}>
        Add New Habit
    </Button>
    </Flex>
</>
}

export default HabitPage