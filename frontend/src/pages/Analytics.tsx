import { useState, useEffect } from "react";
import { useForm } from "@mantine/form";
import { Title, Button, NumberInput, MultiSelect, Container, Group } from "@mantine/core";
import "./css/hidden.modules.css";


interface formValues {
    bmr: number;
    cal: number;
    dpi: number;
    dfi: number;
    dci: number;
    brf: string[];
    lch: string[];
    dnr: string[];
}

export default function Analytics() {
    const [initialValues, setInitialValues] = useState<formValues | null>(null);
    const [isDisabled, setIsDisabled] = useState<boolean>(true);
    const toggleFields = () => {setIsDisabled((prevState) => !prevState);};
    const form = useForm<formValues>({
        initialValues: {
            bmr: 102.2,
            cal: 2281,
            dpi: 171.1,
            dfi: 76.0,
            dci: 228.1,
            brf: ["Каша", "Блины", "Мёд", "Фрукты", "Сок"],
            lch: ["Суп", "Мясо", "Картофельное пюре", "Овощной салат", "Ломтики хлеба", "Чай"],
            dnr: ["Рыба", "Рис", "Чай", "Конфеты"],
        }
    });
    useEffect(() => {
        const fetchAnalytics = async () => {
          try {
            const response = await fetch('http://localhost:5000/api/analytics', {
              headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
              }
            });
            if (!response.ok) throw new Error('Не удалось загрузить аналитику');
            const data = await response.json();
            setInitialValues(data);
            form.setValues(data);
          } catch (error) {
            console.error('Ошибка загрузки аналитики:', error);
          }
        };
        fetchAnalytics();
    }, []);
    const handleSave = async () => {
        try {
            const { brf, lch, dnr } = form.values;
            const response = await fetch('http://localhost:5000/api/analytics', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({ brf, lch, dnr })
            });
            if (!response.ok) throw new Error('Не удалось сохранить план питания');
            const data = await response.json();
            setInitialValues(prev => ({
                ...(prev || form.values),
                brf: data.brf,
                lch: data.lch,
                dnr: data.dnr
            }));
            toggleFields();
        } catch (error) {
          console.error('Ошибка сохранения плана питания:', error);
        }
    };
    const handleCancel = () => {
        if (initialValues) {
          form.setValues(initialValues);
        }
        toggleFields();
    };
    return (
        <Container mt={20} mb={20}>
            <Title order={2} ta={"center"} mb="xl">Аналитика</Title>
            <Title order={4} mb="md">Расчет суточных потребностей в калориях и макронутриентах</Title>
            <Container ml={20} mt={20} mb={80}>
                <NumberInput
                    {...form.getInputProps("bmr")}
                    key={form.key("bmr")}
                    label="Базовая скорость метаболизма (BMR)"
                    mt="md"
                    disabled
                />
                <NumberInput
                    {...form.getInputProps("cal")}
                    key={form.key("cal")}
                    label="Норма калорий"
                    mt="md"
                    disabled
                />
                <NumberInput
                    {...form.getInputProps("dpi")}
                    key={form.key("dpi")}
                    label="Норма белков, г"
                    mt="md"
                    disabled
                />
                <NumberInput
                    {...form.getInputProps("dfi")}
                    key={form.key("dfi")}
                    label="Норма жиров, г"
                    mt="md"
                    disabled
                />
                <NumberInput
                    {...form.getInputProps("dci")}
                    key={form.key("dci")}
                    label="Норма углеводов, г"
                    mt="md"
                    disabled
                />
            </Container>
            <Title order={4} mb="md">Персонализированный план питания</Title>
            <Container ml={20} mt={20} mb={20}>
                <Title order={6} mb="md">Завтрак</Title>
                <Container ml={20} mt={20} mb={40}>
                    <MultiSelect
                        {...form.getInputProps("brf")}
                        key={form.key("brf")}
                        label="Выбор рецептов"
                        placeholder="Выбор рецептов"
                        data={[
                            "Каша", "Омлет", "Яичница", "Мюсли", "Творог", "Блины",
                            "Сырники", "Мёд", "Джем", "Фрукты", "Сок", "Чай"
                        ]}
                        comboboxProps={{ shadow: "md" }}
                        maxDropdownHeight={200}
                        mt="md"
                        disabled={isDisabled}
                    />
                </Container>
                <Title order={6} mb="md">Обед</Title>
                <Container ml={20} mt={20} mb={40}>
                    <MultiSelect
                        {...form.getInputProps("lch")}
                        key={form.key("lch")}
                        label="Выбор рецептов"
                        placeholder="Выбор рецептов"
                        data={[
                            "Суп", "Мясо", "Рыба", "Макароны", "Рис", "Картофельное пюре",
                            "Овощной салат", "Ломтики хлеба", "Компот", "Чай"
                        ]}
                        comboboxProps={{ shadow: "md" }}
                        maxDropdownHeight={200}
                        mt="md"
                        disabled={isDisabled}
                    />
                </Container>
                <Title order={6} mb="md">Ужин</Title>
                <Container ml={20} mt={20} mb={40}>
                    <MultiSelect
                        {...form.getInputProps("dnr")}
                        key={form.key("dnr")}
                        label="Выбор рецептов"
                        placeholder="Выбор рецептов"
                        data={[
                            "Мясо", "Рыба", "Каша", "Рис", "Картофельное пюре",
                            "Молоко", "Чай", "Печенье", "Пряники", "Конфеты"
                        ]}
                        comboboxProps={{ shadow: "md" }}
                        maxDropdownHeight={200}
                        mt="md"
                        disabled={isDisabled}
                    />
                </Container>
                <Group justify="right">
                    <Button onClick={toggleFields} className={isDisabled ? "" : "hidden"} mt="md">Изменить</Button>
                    <Button onClick={handleSave} className={isDisabled ? "hidden" : ""} mt="md">Сохранить</Button>
                    <Button onClick={handleCancel} className={isDisabled ? "hidden" : ""} mt="md">Отмена</Button>
                </Group>
            </Container>
        </Container>
    )
}
