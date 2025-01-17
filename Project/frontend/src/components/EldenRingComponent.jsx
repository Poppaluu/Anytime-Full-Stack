import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCreatures, fetchBosses, reset, incrementTimer, incrementScore, removeBoss, removeCreature } from '../features/eldenRing/eldenRingSlice';
import Spinner from './Spinner';

function EldenRingComponent() {
  const dispatch = useDispatch();

  const { creatures = [], bosses = [], score, timer, isLoading, isError, message } = useSelector((state) => state.eldenRing);

  useEffect(() => {
    dispatch(fetchCreatures());
    dispatch(fetchBosses());

    const interval = setInterval(() => {
      dispatch(incrementTimer(1));
    }, 1000);

    return () => {
      clearInterval(interval);
      dispatch(reset());
    };
  }, [dispatch]);

  const handleKillCreature = (id, points) => {
    dispatch(removeCreature(id));
    dispatch(incrementScore(Math.round(points * (timer/60))));
  };

  const handleKillBoss = (id, health) => {
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
    dispatch(removeBoss(id));
    dispatch(incrementScore(Math.round(points * (timer/60))));
  };

  const handleResetGame = () => {
    dispatch(reset());
    dispatch(fetchCreatures());
    dispatch(fetchBosses());
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <section className="content">
      <button className='btn' onClick={handleResetGame}>Reset Game</button>
      {timer > 0 && (creatures.length !== 0 || bosses.length !== 0) ? (
        <>
          <h2>Timer: {timer} seconds</h2>
          <h2>Score: {score} points</h2>
          <h2>Elden Ring Creatures</h2>
          {isError ? (
            <p>Error loading creatures: {message}</p>
          ) : (
            <ul>
              {creatures[0] ? (
                <li key={creatures[0].id} className="creature-item">
                  <div className="creature-content">
                    <div className="creature-details">
                      <h3>{creatures[0].name}</h3>
                      <img src={creatures[0].image} alt={creatures[0].name} className="creature-image" />
                      <button className='btn' onClick={() => handleKillCreature(creatures[0].id, 100)}>Mark as Killed</button>
                      <button className='btn' onClick={() => handleKillCreature(creatures[0].id, 0)}>skip</button>
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
              {bosses[0] ? (
                <li key={bosses[0].id} className="boss-item">
                  <div className="boss-content">
                    <div className="boss-details">
                      <h3>{bosses[0].name}</h3>
                      <img src={bosses[0].image} alt={bosses[0].name} className="boss-image" />
                      <button className='btn' onClick={() => handleKillBoss(bosses[0].id, bosses[0].healthPoints)}>Mark as Killed</button>
                      <button className='btn' onClick={() => handleKillBoss(bosses[0].id, 0)}>skip</button>
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
        <h2>Your final score is {score} points.</h2>
        </div>
      )}
    </section>
  );
}

export default EldenRingComponent;