/*
If you deal with event handling for clicking inside of wrapped components then 
the useClickInside hook is the right choice for you. First, we create a custom 
hook that takes in a ref and a callback to handle the click event. 
Then we make use of useEffect to append and clean up the click event. 
Finally, we use useRef to create a ref for the component to be clicked and pass
 it to the useClickInside hook.
*/

const useClickInside = (ref, callback) => {
    const handleClick = e => {
        if (ref.current && ref.current.contains(e.target)) {
            callback();
        }
    };
    React.useEffect(() => {
        document.addEventListener('click', handleClick);
        return () => {
            document.removeEventListener('click', handleClick);
        };
    });
};

/*
// Example

const HitBox = ({ onClickInside }) => {
    const clickRef = React.useRef();
    useClickInside(clickRef, onClickInside);
    return (
        <div
            className="hit-box"
            ref={clickRef}
            style={{
                border: '5px solid green',
                height: 300,
                width: 600,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }}
        >
            <p>Hit the box!</p>
        </div>
    );
};

ReactDOM.render(
    <HitBox onClickInside={() => alert('hit the box')} />,
    docment.getElementById('root')
);
*/
