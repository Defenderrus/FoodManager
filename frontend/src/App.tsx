import '@mantine/core/styles.css';
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
      { label: 'Основное', link: '/' },
      { label: 'Аналитика', link: '/' },
      { label: 'Графики', link: '/' },
      { label: 'Другое', link: '/' },
    ],
  },
  { label: 'Настройки', icon: IconAdjustments },
  {
    label: 'Безопасность',
    icon: IconLock,
    links: [
      { label: 'Сменить пароль', link: '/' },
    ],
  },
];

export default function App() {
  const [opened, { toggle }] = useDisclosure(false);
  const links = mockdata.map((item) => <LinksGroup {...item} key={item.label} />);

  return (
    <MantineProvider>
      <AppShell
        layout='alt'
        header={{ height: 60 }}
        footer={{ height: 60 }}
        navbar={{ width: 300, breakpoint: 'sm', collapsed: { mobile: !opened } }}
        padding="md"
      >
        <AppShell.Header className={headerClasses.header}>
          <Container p="md" className={headerClasses.inner}>
            <Title order={3}>FoodManager</Title>
            <Burger opened={opened} onClick={toggle} hiddenFrom="xs" size="sm" />
          </Container>
        </AppShell.Header>

        <AppShell.Navbar>
          <nav className={navbarClasses.navbar}>
            <Burger opened={opened} onClick={toggle} hiddenFrom="xs" size="sm" />      
            
            <ScrollArea className={navbarClasses.links}>
              <div className={navbarClasses.linksInner}>{links}</div>
            </ScrollArea>
      
            <div className={navbarClasses.footer}>
              <UserButton />
            </div>
          </nav>
        </AppShell.Navbar>
        
        <AppShell.Main>
          Main
        </AppShell.Main>

        <AppShell.Footer p="md">
          Footer
        </AppShell.Footer>
      </AppShell>
    </MantineProvider>
  )
}
