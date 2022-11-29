import { Link } from "react-router-dom";
import img from '../../resources/img/404gif.gif';

const Page404 = () => {
    return (
        <div>
            <img style={{ display: 'block', width: '500px', height: '500px', objectFit: 'contain', margin: '0 auto'}} src={img} alt='Error'/>
            <p style={{'textAlign': 'center', 'fontWeight': 'bold', 'fontSize': '24px', 'color': 'grey'}}>Page doesn't exist</p>
            <Link style={{'display': 'block', 'textAlign': 'center', 'fontWeight': 'bold', 'fontSize': '24px', 'marginTop': '24px', 'color': 'grey'}} to='/'>Back to main page</Link>
        </div>
    )
}

export default Page404;