import PropTypes from 'prop-types';
import Button from './Button';

const Header = ({title, onAdd, text, showText, showState}) => {
    console.log(showText, "showText");
    console.log(showState, "showAddTask");
    return (
        <header className = 'header'>
            <h1>Task Tracker</h1>
            <h1>{title}</h1>
            <Button color= {showState ? 'red' : 'green'} text={showText} onClick={onAdd}/>
        </header>
    );
};

Header.defaultProps = {
    title: 'Task Tracker',
};

Header.propTypes = {
    title: PropTypes.string.isRequired,
};

//css in js
/*
const headingStyle = {
    color: 'red',
    backgroundColor: 'black',
};
*/

export default Header;