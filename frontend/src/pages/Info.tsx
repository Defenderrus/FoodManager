import { useForm } from "@mantine/form";
import { Title, Button, TextInput, NumberInput, Select, MultiSelect, Container, Group } from "@mantine/core";
import "./css/info.modules.css";


interface FormValues {
    name: string;
    age: number | string;
    gender: string;
    weight: number | string;
    height: number | string;
    pa_lvl: string;
    purpose: string;
    preferences: any;
    allergies: any;
}

export default function Info() {
    const form = useForm<FormValues>({
        mode: "uncontrolled",
        initialValues: {
            name: "user123",
            age: "18",
            gender: "Мужской",
            weight: "65",
            height: "175",
            pa_lvl: "Умеренная",
            purpose: "Набор массы",
            preferences: ["Мясное"],
            allergies: ["Молоко"]
        }
    });
    return (
        <Container mt={10} mb={10}>
            <Title order={3} mb="md">Личные данные</Title>
            <TextInput
                {...form.getInputProps("name")}
                key={form.key("name")}
                label="Имя"
                placeholder="Имя"
                mt="md"
            />
            <NumberInput
                {...form.getInputProps("age")}
                key={form.key("age")}
                label="Возраст"
                placeholder="Возраст"
                allowNegative={false}
                allowDecimal={false}
                mt="md"
            />
            <Select
                {...form.getInputProps("gender")}
                key={form.key("gender")}
                label="Пол"
                placeholder="Пол"
                data={["Мужской", "Женский"]}
                comboboxProps={{ shadow: "md" }}
                allowDeselect={false}
                mt="md"
            />
            <NumberInput
                {...form.getInputProps("weight")}
                key={form.key("weight")}
                label="Вес"
                placeholder="Вес"
                allowNegative={false}
                decimalSeparator=","
                decimalScale={1}
                mt="md"
            />
            <NumberInput
                {...form.getInputProps("height")}
                key={form.key("height")}
                label="Рост"
                placeholder="Рост"
                allowNegative={false}
                decimalSeparator=","
                decimalScale={1}
                mt="md"
            />
            <Select
                {...form.getInputProps("pa_lvl")}
                key={form.key("pa_lvl")}
                label="Уровень активности"
                placeholder="Уровень активности"
                data={["Низкая", "Умеренная", "Высокая"]}
                comboboxProps={{ shadow: "md" }}
                allowDeselect={false}
                mt="md"
            />
            <Select
                {...form.getInputProps("purpose")}
                key={form.key("purpose")}
                label="Цель"
                placeholder="Цель"
                data={["Похудение", "Поддержание веса", "Набор массы"]}
                comboboxProps={{ shadow: "md" }}
                allowDeselect={false}
                mt="md"
            />
            <MultiSelect
                {...form.getInputProps("preferences")}
                key={form.key("preferences")}
                label="Предпочтения"
                placeholder="Предпочтения"
                data={[
                    "Сладкое", "Горькое", "Солёное",
                    "Острое", "Мясное", "Морепродукты",
                    "Молочные продукты", "Овощи и фрукты"
                ]}
                comboboxProps={{ shadow: "md" }}
                maxDropdownHeight={200}
                mt="md"
            />
            <MultiSelect
                {...form.getInputProps("allergies")}
                key={form.key("allergies")}
                label="Аллергии и противопоказания"
                placeholder="Аллергии и противопоказания"
                data={[
                    "Молоко", "Пшеница", "Яйцо", "Арахис",
                    "Орехи", "Соя", "Свинина", "Говядина",
                    "Морепродукты", "Рыба", "Бобовые",
                    "Цитрусовые", "Фрукты", "Клубника",
                    "Острое", "Жареное", "Сладкое", "Жирное"
                ]}
                comboboxProps={{ shadow: "md" }}
                maxDropdownHeight={200}
                mt="md"
            />
            <Group justify="right">
                <Button className="" id="edit" mt="md">Изменить</Button>
                <Button className="hidden" id="save" mt="md">Сохранить</Button>
                <Button className="hidden" id="cancel" mt="md">Отмена</Button>
            </Group>
        </Container>
    );
}
