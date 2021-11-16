//loading spinner
//okay so this is basically saying Loader is now an object that returns a DOM element
//and since that dom element has a class name, global css files implement the actual look/animation
//holy shit thats cool
//this {show} denotes a bool value passed 
//through div tag in index.js on whether or not to show the loading circle 
export default function Loader({ show }){ 
    return show ? <div className="loader"></div> : null;
}