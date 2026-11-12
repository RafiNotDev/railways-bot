import axios from 'axios';

async function getCoordinates(city) {
  let { data } = await axios.get(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(city)}&format=json`, {
    headers: { 'User-Agent': 'Node.js' }
  });
  if (!data.length) throw new Error('Kota tidak ditemukan : ' + city);
  return { lat: +data[0].lat, lon: +data[0].lon };
}

function haversine(lat1, lon1, lat2, lon2, unit = 'km') {
  let R = unit === 'km' ? 6371 : 3958.8;
  let dLat = (lat2 - lat1) * Math.PI / 180, dLon = (lon2 - lon1) * Math.PI / 180;
  let a = Math.sin(dLat / 2) ** 2 + Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.sin(dLon / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

async function getDriving(lat1, lon1, lat2, lon2, unit = 'km') {
  let { data } = await axios.get(`http://router.project-osrm.org/route/v1/driving/${lon1},${lat1};${lon2},${lat2}?overview=false`);
  return data.routes?.[0]?.distance ? (unit === 'km' ? data.routes[0].distance / 1000 : data.routes[0].distance / 1609.34) : null;
}

function formatTime(m) {
  let h = Math.floor(m / 60), min = Math.floor(m % 60), s = Math.floor((m * 60) % 60);
  return `${h}j ${min}m ${s}d`;
}

function estimate(crow, drive, unit = 'km') {
  let speed = {
    motor: unit === 'km' ? 40 : 25,
    mobil: unit === 'km' ? 80 : 50,
    bus: unit === 'km' ? 50 : 31,
    kereta: unit === 'km' ? 100 : 62,
    pesawat: unit === 'km' ? 800 : 497
  };
  let calc = (d, s) => d ? formatTime((d / s) * 60) : 'N/A';
  return {
    motor: calc(drive, speed.motor),
    mobil: calc(drive, speed.mobil),
    bus: calc(drive, speed.bus),
    kereta: calc(drive, speed.kereta),
    pesawat: calc(crow, speed.pesawat)
  };
}

let handler = async (m, { text }) => {
  let [a, b] = text.split('|').map(v => v.trim());
  if (!a || !b) return m.reply('Format salah. Contoh: *jarak kota1|kota2*');
  try {
    let A = await getCoordinates(a), B = await getCoordinates(b);
    let lurus = haversine(A.lat, A.lon, B.lat, B.lon);
    let darat = await getDriving(A.lat, A.lon, B.lat, B.lon);
    let t = estimate(lurus, darat);
    m.reply(
      `Rute : ${a} ke ${b}\n` +
      `Jarak garis lurus : ${lurus.toFixed(2)} km\n` +
      `Jarak darat : ${darat ? darat.toFixed(2) : 'N/A'} km\n` +
      `Motor : ${t.motor}\nMobil : ${t.mobil}\nBus : ${t.bus}\nKereta : ${t.kereta}\nPesawat : ${t.pesawat}`
    );
  } catch (e) {
    m.reply('Gagal : ' + e.message);
  }
};

handler.help = ['jarak'];
handler.command = ['jarak'];
handler.tags = ['tools'];

export default handler;