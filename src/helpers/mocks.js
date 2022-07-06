export const MOCKED_ADVERTS = [
  {
    id: 0,
    model: 'Fiat Uno',
    version: 'Vivace',
    brand: 2,
    condition: 1,
    certifield: false,
    location: 0,
    price: 41.999,
    year: 2020,
    description: 'Fiat uno...',
    mileage: 'até 10.000 km',
    cartype: 'Hatback',
    color: 'Branco',
    photos: [
      'https://images.noticiasautomotivas.com.br/img/f/fiat-uno-vivace-1-9.jpeg',
    ],
    additional: ['Manual', 'Freio ABS', 'Air Bag'],
    fuel: [0, 1, 4],
  },
  {
    id: 1,
    model: 'Honda Civic',
    version: 'EXL',
    condition: 1,
    certifield: true,
    location: 0,
    brand: 1,
    year: 2022,
    price: 137.608,
    description: 'Honda Civic',
    mileage: '0 km',
    cartype: 'Coupe',
    color: 'Preto',
    photos: [
      'https://quatrorodas.abril.com.br/wp-content/uploads/2022/04/honda-civic-seda-e1650568274124.jpg',
    ],
    additional: ['Automático', 'Freio ABS', 'Air Bag', 'Kit Multimídia'],
    fuel: [0, 1, 4, 6, 7],
  },
]

export const MOCKED_FILTERS = {
  brands: [
    {
      id: 3,
      value: 'Renault',
      logo: 'https://www.imagemhost.com.br/images/2022/06/09/renault.png',
    },
    {
      id: 4,
      value: 'Honda',
      logo: 'https://www.imagemhost.com.br/images/2022/06/09/honda.png',
    },
    {
      id: 5,
      value: 'Infiniti',
      logo: 'https://www.imagemhost.com.br/images/2022/06/09/infiniti.png',
    },
    {
      id: 6,
      value: 'Lexus',
      logo: 'https://www.imagemhost.com.br/images/2022/06/09/lexus.png',
    },
    {
      id: 7,
      value: 'Mitsubishi',
      logo: 'https://www.imagemhost.com.br/images/2022/06/09/mitsubishi.png',
    },
    {
      id: 8,
      value: 'Mazda',
      logo: 'https://www.imagemhost.com.br/images/2022/06/09/mazda.png',
    },
    {
      id: 9,
      value: 'Hyundai',
      logo: 'https://www.imagemhost.com.br/images/2022/06/09/hyundai.png',
    },
    {
      id: 10,
      value: 'Audi',
      logo: 'https://www.imagemhost.com.br/images/2022/06/09/audi.png',
    },
    {
      id: 11,
      value: 'Mercedes Benz',
      logo: 'https://www.imagemhost.com.br/images/2022/06/09/mercedes-benz.png',
    },
  ],
  models: [
    {
      id: 1,
      value: 'Car Model Teste 1',
    },
    {
      id: 2,
      value: 'Car Model Teste 2',
    },
    {
      id: 3,
      value: 'Car Model Teste 3',
    },
    {
      id: 4,
      value: 'Car Model Teste 4',
    },
    {
      id: 5,
      value: 'Car Model Teste 5',
    },
  ],
  conditions: [
    {
      id: 1,
      value: 'Novo',
    },
    {
      id: 2,
      value: 'Usado',
    },
  ],
  colors: [
    {
      id: 1,
      value: 'Azul Metálico',
    },
    {
      id: 2,
      value: 'Preto',
    },
    {
      id: 3,
      value: 'Branco',
    },
    {
      id: 4,
      value: 'Vermelho',
    },
    {
      id: 5,
      value: 'Vinho',
    },
    {
      id: 6,
      value: 'Vinho',
    },
  ],
  fuels: [
    {
      id: 1,
      value: 'Gasolina',
    },
    {
      id: 2,
      value: 'Alcool',
    },
    {
      id: 3,
      value: 'Diesel',
    },
    {
      id: 4,
      value: 'Flex',
    },
    {
      id: 5,
      value: 'GNV',
    },
    {
      id: 6,
      value: 'Elétrico',
    },
    {
      id: 7,
      value: 'Híbrido',
    },
  ],
  mileages: [
    {
      id: 1,
      value: 'até 40.000 km',
    },
    {
      id: 2,
      value: 'até 10.000 km',
    },
    {
      id: 3,
      value: 'até 80.000 km',
    },
    {
      id: 4,
      value: 'até 100.000 km',
    },
  ],
  types: [
    {
      id: 1,
      value: 'Coupe',
    },
    {
      id: 2,
      value: 'Sedã',
    },
    {
      id: 3,
      value: 'Hatchback',
    },
    {
      id: 4,
      value: 'Picup',
    },
    {
      id: 5,
      value: 'Utilitário',
    },
    {
      id: 6,
      value: 'SUV',
    },
  ],
  transmissions: [
    {
      id: 0,
      value: 'Manual',
    },
    {
      id: 1,
      value: 'Semi-automático',
    },
    {
      id: 2,
      value: 'Automático',
    },
  ],
  additionals: [
    {
      id: 0,
      value: 'Teto solar',
    },
    {
      id: 1,
      value: 'Freio ABS',
    },
    {
      id: 2,
      value: 'Air Bags',
    },
    {
      id: 3,
      value: 'Kit Multimídia',
    },
    {
      id: 4,
      value: 'Ar Condicionado',
    },
    {
      id: 5,
      value: 'Banco de couro',
    },
    {
      id: 5,
      value: 'Rodas em liga leve',
    },
  ],
  locales: [
    {
      id: 1,
      value: 'São Paulo',
    },
    {
      id: 2,
      value: 'Rio de Janeiro',
    },
    {
      id: 3,
      value: 'Minas Gerais',
    },
    {
      id: 4,
      value: 'Rio Grande do Sul',
    },
    {
      id: 5,
      value: 'Ceará',
    },
    {
      id: 6,
      value: 'Bahia',
    },
  ],
}

// locales types mileage fuel color brands conditions
