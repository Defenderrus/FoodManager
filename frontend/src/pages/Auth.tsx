import { useState } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import { TextInput, PasswordInput, Checkbox, Anchor, Paper, Title, Text, Container, Group, Button } from '@mantine/core';
import { useForm } from '@mantine/form';
import { IconAt, IconLock } from '@tabler/icons-react';
import classes from './css/auth.module.css';

interface FormValues {
  email: string;
  password: string;
  remember: boolean;
}

export default function Auth() {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  const form = useForm<FormValues>({
    initialValues: {
      email: '',
      password: '',
      remember: false,
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Некорректный email'),
      password: (value) => (value.length >= 6 ? null : 'Пароль должен содержать минимум 6 символов'),
    },
  });

  const handleSubmit = (values: FormValues) => {
    setLoading(true);
    console.log('Submitted values:', values);
    setTimeout(() => {
      localStorage.setItem("isAuth", "true");
      setLoading(false);
      navigate(location.state?.from?.pathname || "/", { replace: true });
    }, 1000);
  };

  return (
    <Container size={420} my={40} className={classes.container}>
      <Title ta="center" className={classes.title}>
        Добро пожаловать!
      </Title>
      <Text c="dimmed" size="sm" ta="center" mt={5}>
        Нет аккаунта?{' '}
        <Anchor size="sm" component="button">
          Зарегистрироваться
        </Anchor>
      </Text>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <TextInput
            label="Email"
            placeholder="your@email.com"
            required
            leftSection={<IconAt size={16} />}
            {...form.getInputProps('email')}
          />
          <PasswordInput
            label="Пароль"
            placeholder="Ваш пароль"
            required
            mt="md"
            leftSection={<IconLock size={16} />}
            {...form.getInputProps('password')}
          />
          <Group justify="space-between" mt="lg">
            <Checkbox
              label="Запомнить меня"
              {...form.getInputProps('remember', { type: 'checkbox' })}
            />
            <Anchor component="button" size="sm">
              Забыли пароль?
            </Anchor>
          </Group>
          <Button fullWidth mt="xl" type="submit" loading={loading}>
            Войти
          </Button>
        </form>
      </Paper>
    </Container>
  );
}
