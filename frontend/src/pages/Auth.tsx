import { useState } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import { TextInput, PasswordInput, Checkbox, Anchor, Paper, Title, Text, Container, Group, Button } from '@mantine/core';
import { useForm } from '@mantine/form';
import { IconAt, IconLock } from '@tabler/icons-react';
import { useUser } from './UserContext';
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
  const { login } = useUser();

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

  const handleSubmit = async (values: FormValues) => {
    setLoading(true);
    try {
      const response = await fetch('/user', {
        method: 'POST',
        headers: {'Content-Type': 'application/json',},
        body: JSON.stringify(values),
      });
      if (!response.ok) { throw new Error('Неверный email или пароль');}
      const { token, user } = await response.json();
      login({ ...user, token });
      navigate(location.state?.from?.pathname || '/', { replace: true });
    } catch (error) {
      console.error('Ошибка входа:', error);
      form.setErrors({ email: ' ', password: 'Неверный email или пароль' });
    } finally {
      setLoading(false);
    }
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
