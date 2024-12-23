import { Container, Title } from "@mantine/core";
import { AreaChart } from "@mantine/charts";


export default function Charts() {
    const weight = [
        {
          date: 'Авг 23',
          Вес: 59,
        },
        {
          date: 'Сен 23',
          Вес: 60,
        },
        {
          date: 'Окт 23',
          Вес: 62,
        },
        {
          date: 'Нов 23',
          Вес: 63,
        },
        {
          date: 'Дек 23',
          Вес: 65,
        },
    ];
    const calories = [
        {
          date: 'Дек 19',
          Калории: 2174,
        },
        {
          date: 'Дек 20',
          Калории: 2058,
        },
        {
          date: 'Дек 21',
          Калории: 2301,
        },
        {
          date: 'Дек 22',
          Калории: 2243,
        },
        {
          date: 'Дек 23',
          Калории: 2156,
        },
    ];
    const pfc = [
        {
          date: 'Дек 19',
          Белки: 158.7,
          Жиры: 78.2,
          Углеводы: 214.3,
        },
        {
          date: 'Дек 20',
          Белки: 182.6,
          Жиры: 80.1,
          Углеводы: 221.9,
        },
        {
          date: 'Дек 21',
          Белки: 173.0,
          Жиры: 72.6,
          Углеводы: 239.6,
        },
        {
          date: 'Дек 22',
          Белки: 169.8,
          Жиры: 75.8,
          Углеводы: 229.1,
        },
        {
          date: 'Дек 23',
          Белки: 161.5,
          Жиры: 66.8,
          Углеводы: 225.0,
        },
    ];
    return (
        <Container mt={20} mb={20}>
            <Title order={2} ta={"center"} mb="lg">Графики</Title>
            <Title order={4} ta={"center"} mb="md">Изменение веса</Title>
            <Container ml={20} mt={20} mb={80}>
                <AreaChart
                    h={300}
                    data={weight}
                    dataKey="date"
                    series={[
                        { name: 'Вес', color: 'indigo.6' }
                    ]}
                    curveType="linear"
                />
            </Container>
            <Title order={4} ta={"center"} mb="md">Потребление калорий</Title>
            <Container ml={20} mt={20} mb={80}>
                <AreaChart
                    h={300}
                    data={calories}
                    dataKey="date"
                    series={[
                        { name: 'Калории', color: 'teal.6' }
                    ]}
                    curveType="linear"
                />
            </Container>
            <Title order={4} ta={"center"} mb="md">Потребление БЖУ</Title>
            <Container ml={20} mt={20} mb={80}>
                <AreaChart
                    h={300}
                    data={pfc}
                    dataKey="date"
                    series={[
                        { name: 'Белки', color: 'gray.6' },
                        { name: 'Жиры', color: 'yellow.6' },
                        { name: 'Углеводы', color: 'red.6' }
                    ]}
                    curveType="linear"
                />
            </Container>
        </Container>
    )
}
