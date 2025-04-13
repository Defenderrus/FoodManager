import '@mantine/core/styles.css';
import '@mantine/charts/styles.css';
import cx from 'clsx';
import { Outlet } from 'react-router';
import { IconAdjustments, IconLock, IconNotes, IconSun, IconMoon } from '@tabler/icons-react';
import { AppShell, Burger, Group, Title, ScrollArea,
  ActionIcon, useMantineColorScheme, useComputedColorScheme } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { LinksGroup } from './components/NavbarLinksGroup';
import { UserButton } from './components/UserButton';
import headerClasses from './css/header.module.css';
import navbarClasses from './css/navbar.module.css';


const mockdata = [
  {
    label: 'Личный кабинет',
    icon: IconNotes,
    initiallyOpened: true,
    links: [
      { label: 'Основное', link: 'account/info' },
      { label: 'Аналитика', link: 'account/analytics' },
      { label: 'Графики', link: 'account/charts' },
      { label: 'Другое', link: 'account/other' },
    ],
  },
  {
    label: 'Настройки',
    icon: IconAdjustments,
    links: [
      { label: 'Язык', link: 'account/language' },
    ],
  },
  {
    label: 'Безопасность',
    icon: IconLock,
    links: [
      { label: 'Сменить пароль', link: 'account/security' },
    ],
  },
];


export default function App() {
  const [opened, { toggle: toggle }] = useDisclosure(true);
  const links = mockdata.map((item) => <LinksGroup {...item} key={item.label} />);
  const { setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme('dark', { getInitialValueInEffect: true });

  return (
    <>
      <AppShell
        header={{ height: 80 }}
        navbar={{ width: 300, breakpoint: 0, collapsed: { mobile: !opened, desktop: !opened } }}
        padding="md"
      >
        <AppShell.Header className={headerClasses.header}>
          <Group className={headerClasses.inner}>
            <Burger opened={opened} onClick={toggle}/>
            <Title className={headerClasses.title} order={1}>FoodManager</Title>
            <ActionIcon
                onClick={() => setColorScheme(computedColorScheme === 'light' ? 'dark' : 'light')}
                variant="default"
                size="xl"
                aria-label="Toggle color scheme"
            >
              <IconSun className={cx(headerClasses.icon, headerClasses.light)} stroke={1.5} />
              <IconMoon className={cx(headerClasses.icon, headerClasses.dark)} stroke={1.5} />
            </ActionIcon>
          </Group>
        </AppShell.Header>

        <AppShell.Navbar>
          <nav className={navbarClasses.navbar}>
            <div className={navbarClasses.header}>
              <Title order={3}>Профиль</Title>
            </div>

            <ScrollArea className={navbarClasses.links}>
              <div className={navbarClasses.linksInner}>{links}</div>
            </ScrollArea>

            <div className={navbarClasses.footer}>
              <UserButton />
            </div>
          </nav>
        </AppShell.Navbar>

        <AppShell.Main>
          <Outlet />
        </AppShell.Main>
      </AppShell>
    </>
  )
}
