//loading spinner
//okay so this is basically saying Loader is now an object that returns a DOM element
//and since that dom element has a class name, global css files implement the actual look/animation
//holy shit thats cool
export default function Loader({ show }){
    return show ? <div className="loader"></div> : null;
}