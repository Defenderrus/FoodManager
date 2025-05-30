import { useState, useEffect } from "react";
import { useForm } from "@mantine/form";
import { useUser } from './UserContext';
import { Title, Button, TextInput, NumberInput, Select, MultiSelect, Container, Group } from "@mantine/core";
import "./css/hidden.modules.css";


interface FormValues {
    name: string;
    age: number;
    sex: string;
    weight: number;
    height: number;
    pa_lvl: string;
    purpose: string;
    preferences: string[];
    allergies: string[];
}

export default function Info() {
    const [initialValues, setInitialValues] = useState<FormValues | null>(null);
    const [isDisabled, setIsDisabled] = useState<boolean>(true);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const toggleFields = () => {setIsDisabled((prevState) => !prevState);};
    const { user, logout } = useUser();
    const form = useForm<FormValues>({
        mode: "uncontrolled",
        initialValues: {
            name: "",
            age: 0,
            sex: "",
            weight: 0,
            height: 0,
            pa_lvl: "",
            purpose: "",
            preferences: [],
            allergies: []
        }
    });
    useEffect(() => {
        const fetchProfile = async () => {
          try {
            const response = await fetch('/profile', {
              headers: {'Authorization': `Bearer ${user?.token}`}
            });
            if (!response.ok) throw new Error('Не удалось загрузить профиль');
            const data = await response.json();
            setInitialValues(data);
            form.setValues(data);
          } catch (error) {
            console.error('Ошибка загрузки профиля:', error);
          } finally {
            setIsLoading(false);
          }
        };
        if (user) {fetchProfile();}
    }, [user]);
    const handleSave = async () => {
        try {
          const values = form.getValues();
          const response = await fetch('/profile', {method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${user?.token}`
            },
            body: JSON.stringify(values)
          });
          if (!response.ok) throw new Error('Не удалось сохранить профиль');
          const data = await response.json();
          setInitialValues(data);
          toggleFields();
        } catch (error) {
          console.error('Ошибка сохранения профиля:', error);
        }
    };
    const handleCancel = () => {
        if (initialValues) {
          form.setValues(initialValues);
        }
        toggleFields();
    };
    if (isLoading) {return <div>Загрузка...</div>;}
    return (
        <Container mt={20} mb={20}>
            <Title order={2} ta={"center"} mb="xl">Личные данные</Title>
            <Container ml={20} mt={20} mb={20}>
                <TextInput
                    {...form.getInputProps("name")}
                    key={form.key("name")}
                    label="Имя"
                    placeholder="Имя"
                    mt="md"
                    disabled={isDisabled}
                />
                <NumberInput
                    {...form.getInputProps("age")}
                    key={form.key("age")}
                    label="Возраст"
                    placeholder="Возраст"
                    allowNegative={false}
                    allowDecimal={false}
                    mt="md"
                    disabled={isDisabled}
                />
                <Select
                    {...form.getInputProps("sex")}
                    key={form.key("sex")}
                    label="Пол"
                    placeholder="Пол"
                    data={["Мужской", "Женский"]}
                    comboboxProps={{ shadow: "md" }}
                    allowDeselect={false}
                    mt="md"
                    disabled={isDisabled}
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
                    disabled={isDisabled}
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
                    disabled={isDisabled}
                />
                <Select
                    {...form.getInputProps("pa_lvl")}
                    key={form.key("pa_lvl")}
                    label="Уровень активности"
                    placeholder="Уровень активности"
                    data={["Низкий", "Лёгкий", "Умеренный", "Интенсивный", "Высокий"]}
                    comboboxProps={{ shadow: "md" }}
                    allowDeselect={false}
                    mt="md"
                    disabled={isDisabled}
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
                    disabled={isDisabled}
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
                    disabled={isDisabled}
                />
                <MultiSelect
                    {...form.getInputProps("allergies")}
                    key={form.key("allergies")}
                    label="Аллергии и противопоказания"
                    placeholder="Аллергии и противопоказания"
                    data={[
                        "Молоко", "Пшеница", "Яйца", "Арахис",
                        "Орехи", "Соя", "Свинина", "Говядина",
                        "Морепродукты", "Рыба", "Бобовые",
                        "Цитрусовые", "Фрукты", "Клубника",
                        "Острое", "Жареное", "Сладкое", "Жирное"
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
            <Group justify="right">
                <Button onClick={logout} mt="md">Выйти</Button>
            </Group>
        </Container>
    );
}
