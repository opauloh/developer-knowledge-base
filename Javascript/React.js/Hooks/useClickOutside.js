/*
The useClickOutside hook is quite similar to the useClickInside hook but it 
takes care of clicking outside a wrapped component and not inside. So again, 
we create a custom hook that takes in a ref and a callback to handle the click
 event. Then we make use of useEffect to append and clean up the click event. 
 Finally, we use useRef to create a ref for the component and pass it to the 
 useClickOutside hook.
*/

const useClickOutside = (ref, callback) => {
    const handleClick = e => {
        if (ref.current && !ref.current.contains(e.target)) {
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
const HitBox = ({ onClickOutside }) => {
    const clickRef = React.useRef();
    useClickOutside(clickRef, onClickOutside);
    return (
        <div className="hit—box"
            ref={clickRef}
            style={{
                border: '5px dashed blue',
                height: 300,
                width: 600,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }}
        ><p> Don't hit the box!</p>
        </div>
    );
};

ReactDOM.render(<HitBox onClickOutside={() => alert(`don't hit the box`)} />,
    document.getElementById('root'));
*/
