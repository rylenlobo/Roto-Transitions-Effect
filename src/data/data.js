import img1 from "../assets/1.jpg";
import img2 from "../assets/2.jpg";
import img3 from "../assets/3.jpg";
import { uid } from 'uid';


const data = [{
    id: uid(),
    img: img1,
    quote: "The best way to predict your future is to create it",
    author:"Abraham Lincoln"
},{
    id: uid(),
    img: img2,
    quote: "Everything you want is on the other side of fear.",
    author:"Jack Canfield"
    },
{
    id: uid(),
    img: img3,
    quote: "Life is made of ever so many partings welded together.",
    author:"Charles Dickens"

}]

export default data