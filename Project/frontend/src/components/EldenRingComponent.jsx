import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCreatures, fetchBosses, reset as resetCreatures } from '../features/eldenRing/eldenRingSlice';
import Spinner from './Spinner';

function EldenRingComponent() {
  const dispatch = useDispatch();

  const { creatures = [], bosses = [], isLoading, isError, message } = useSelector((state) => state.eldenRing);

  const [killedCreatures, setKilledCreatures] = useState([]);
  const [killedBosses, setKilledBosses] = useState([]);
  const [timer, setTimer] = useState(100);
  const [score, setScore] = useState(0);

  useEffect(() => {
    dispatch(fetchCreatures());
    dispatch(fetchBosses());

    const interval = setInterval(() => {
      setTimer((prevTimer) => prevTimer - 1);
    }, 1000);

    return () => {
      clearInterval(interval);
      dispatch(resetCreatures());
    };
  }, [dispatch]);

  const handleKillCreature = (id, points) => {
    setKilledCreatures([...killedCreatures, id]);
    setScore((prevScore) => prevScore + points);
  };

  const handleKillBoss = (id, health) => {
    setKilledBosses([...killedBosses, id]);
    let points = 0
    if(health === '???'){
      points = 1000
    } else if(health === 0){
      points = 0
    } else{
      const numericHealth = parseInt(health.replace(/[^\d]/g, ''), 10);
      points = numericHealth;
    }
    console.log(health)
    setScore((prevScore) => prevScore + points);
  };

  const handleResetGame = () => {
    setScore(0);
    setTimer(100);
    setKilledCreatures([]);
    setKilledBosses([]);
    dispatch(fetchCreatures());
    dispatch(fetchBosses());
  };

  const nextCreature = creatures.find((creature) => !killedCreatures.includes(creature.id));
  const nextBoss = bosses.find((boss) => !killedBosses.includes(boss.id));

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <section className="content">
      <button className='btn' onClick={handleResetGame}>Reset Game</button>
      {timer > 0 ? (
        <>
          <h2>Timer: {timer} seconds</h2>
          <h2>Score: {score} points</h2>
          <h2>Elden Ring Creatures</h2>
          {isError ? (
            <p>Error loading creatures: {message}</p>
          ) : (
            <ul>
              {nextCreature ? (
                <li key={nextCreature.id} className="creature-item">
                  <div className="creature-content">
                    <div className="creature-details">
                      <h3>{nextCreature.name}</h3>
                      <img src={nextCreature.image} alt={nextCreature.name} className="creature-image" />
                      <button className='btn' onClick={() => handleKillCreature(nextCreature.id, 100)}>Mark as Killed</button>
                      <button className='btn' onClick={() => handleKillCreature(nextCreature.id, 0)}>skip</button>
                    </div>
                  </div>
                </li>
              ) : (
                <p>All creatures have been killed!</p>
              )}
            </ul>
          )}

          <h2>Elden Ring Bosses</h2>
          {isError ? (
            <p>Error loading bosses: {message}</p>
          ) : (
            <ul>
              {nextBoss ? (
                <li key={nextBoss.id} className="boss-item">
                  <div className="boss-content">
                    <div className="boss-details">
                      <h3>{nextBoss.name}</h3>
                      <img src={nextBoss.image} alt={nextBoss.name} className="boss-image" />
                      <button className='btn' onClick={() => handleKillBoss(nextBoss.id, nextBoss.healthPoints)}>Mark as Killed</button>
                      <button className='btn' onClick={() => handleKillBoss(nextBoss.id, 0)}>skip</button>
                    </div>
                  </div>
                </li>
              ) : (
                <p>All bosses have been killed!</p>
              )}
            </ul>
          )}
        </>
      ) : (
        <div>
        <h2>Time's up! Your final score is {score} points.</h2>
        </div>
      )}
    </section>
  );
}

export default EldenRingComponent;