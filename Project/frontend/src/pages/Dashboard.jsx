import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Spinner from '../components/Spinner';
import GoalForm from '../components/GoalForm';
import GoalItem from '../components/GoalItem';
import EldenRingComponent from '../components/EldenRingComponent';
import { getGoals, reset as resetGoals } from '../features/goals/goalSlice';

function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { goals, isLoading, isError, message } = useSelector((state) => state.goals);

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (!user) {
      navigate('/login');
    } else {
      dispatch(getGoals());
    }

    return () => {
      dispatch(resetGoals());
    };
  }, [user, navigate, isError, message, dispatch]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <section className="heading">
        <h1>Welcome {user && user.name}</h1>
        <p>How many can you kill before the timer runs out?</p>
      </section>

      <EldenRingComponent />
    </>
  );
}

export default Dashboard;