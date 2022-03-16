import Button from "@material-ui/core/Button";
import { useNavigate } from "react-router-dom";

function Home(props)
{
    const navigate = useNavigate();
    const go = () => { navigate('/profile?user=piMachado'); };
    return<>
        Home
        <Button onClick={go}>Prapanch</Button>
    </>
}

export default Home;