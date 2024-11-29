import '@mantine/core/styles.css';
import { Outlet } from 'react-router';
import {IconAdjustments, IconLock, IconNotes } from '@tabler/icons-react';
import { MantineProvider, AppShell, Burger, Container, Title, ScrollArea } from '@mantine/core';
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
      { label: 'Основное', link: 'info' },
      { label: 'Аналитика', link: 'analytics' },
      { label: 'Графики', link: 'charts' },
      { label: 'Другое', link: 'other' },
    ],
  },
  {
    label: 'Настройки',
    icon: IconAdjustments,
    links: [
      { label: 'Тема', link: 'theme' },
      { label: 'Язык', link: 'language' },
    ],
  },
  {
    label: 'Безопасность',
    icon: IconLock,
    links: [
      { label: 'Сменить пароль', link: 'security' },
    ],
  },
];

export default function App() {
  const [opened, { toggle: toggle }] = useDisclosure(true);
  const links = mockdata.map((item) => <LinksGroup {...item} key={item.label} />);

  return (
    <MantineProvider>
      <AppShell
        header={{ height: 60 }}
        navbar={{ width: 300, breakpoint: 0, collapsed: { mobile: !opened, desktop: !opened } }}
        padding="md"
      >
        <AppShell.Header className={headerClasses.header}>
          <Container p="md" className={headerClasses.inner}>
            <Burger opened={opened} onClick={toggle} size="sm" />
            <Title className={headerClasses.title} order={3}>FoodManager</Title>
          </Container>
        </AppShell.Header>

        <AppShell.Navbar>
          <nav className={navbarClasses.navbar}>
            <div className={navbarClasses.header}>
              <Title order={4}>Профиль</Title>
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
    </MantineProvider>
  )
}
