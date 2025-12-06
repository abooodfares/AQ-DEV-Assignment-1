

const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:8080/api/transactions/add-many';
const INTERVAL = 5000; // 5 seconds

const cities = [
  { name: 'Riyadh', code: '011', lat: 24.7136, lng: 46.6753 },
  { name: 'Jeddah', code: '012', lat: 21.5433, lng: 39.1728 },
  { name: 'Mecca', code: '012', lat: 21.3891, lng: 39.8579 },
  { name: 'Medina', code: '014', lat: 24.5247, lng: 39.5692 },
  { name: 'Dammam', code: '013', lat: 26.4207, lng: 50.0888 },
  { name: 'Khobar', code: '013', lat: 26.2172, lng: 50.1971 },
  { name: 'Taif', code: '012', lat: 21.2703, lng: 40.4158 },
  { name: 'Tabuk', code: '014', lat: 28.3838, lng: 36.5550 },
  { name: 'Abha', code: '017', lat: 18.2164, lng: 42.5053 },
  { name: 'Khamis Mushait', code: '017', lat: 18.3000, lng: 42.7333 }
];

const propertyTypes = ['Land', 'Villa', 'Apartment'];

function randomElement(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function generateCoordinates(city) {
  const latOffset = (Math.random() - 0.5) * 0.1;
  const lngOffset = (Math.random() - 0.5) * 0.1;
  return {
    lat: city.lat + latOffset,
    lng: city.lng + lngOffset
  };
}

function generatePrice(type) {
  switch (type) {
    case 'Land':
      return 100000 + Math.random() * 900000;
    case 'Villa':
      return 500000 + Math.random() * 2500000;
    case 'Apartment':
      return 200000 + Math.random() * 800000;
    default:
      return 100000;
  }
}

function generateTransaction() {
  const city = randomElement(cities);
  const type = randomElement(propertyTypes);
  const coords = generateCoordinates(city);

  return {
    city: city.name,
    cityCode: city.code,
    lat: coords.lat,
    lng: coords.lng,
    price: generatePrice(type),
    type: type
  };
}


async function sendTransaction(transactions) {
  try {
    const response = await fetch(BACKEND_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(transactions)
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log(`✓ Sent ${transactions.length} transactions successfully`);
  } catch (error) {
    console.error(`✗ Failed to send transactions: ${error.message} `);
  }
}

async function sendTransactions() {
  const transactions = [];
  for (let i = 0; i < 10; i++) {
    const transaction = generateTransaction();
    transactions.push(transaction);
  }
  await sendTransaction(transactions);
}

function startGenerator() {
  console.log('Transaction Generator Started');
  console.log(`Backend URL: ${BACKEND_URL} `);
  console.log(`Generating transactions every ${INTERVAL / 1000} seconds...\n`);

  sendTransactions();

  // Then send every 5 seconds
  setInterval(() => {
    sendTransactions();
  }, INTERVAL);
}

startGenerator();
