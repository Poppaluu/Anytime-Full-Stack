import axios from 'axios';

const API_URL1 = 'https://eldenring.fanapis.com/api/creatures?limit=100';
const API_URL2 = 'https://eldenring.fanapis.com/api/bosses?limit=100';


//shuffle the list
const getRandomItems = (array, numItems) => {
  const shuffled = array.sort(() => 0.5 - Math.random());
  //console.log(shuffled.slice(0, numItems));
  return shuffled.slice(0, numItems);
};

//get creatures from api
const getCreatures = async () => {
  const response = await axios.get(API_URL1);
  const creatures = response.data.data;
  const shuffledCreatures = getRandomItems(creatures, 10)
  //console.log(shuffledCreatures)
  return shuffledCreatures;
};

//get bosses form api
const getBosses = async () => {
  const response = await axios.get(API_URL2);
  const bosses = response.data.data;
  const shuffledBosses = getRandomItems(bosses, 5)
  //console.log(shuffledBosses)
  return shuffledBosses;
};

const eldenRingService = {
  getCreatures,
  getBosses,
};

export default eldenRingService;