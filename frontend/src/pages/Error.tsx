import { Link } from "react-router-dom";


export default function Error() {
    return <div className="flex flex-col gap-2">
        <h3>404 Not Found</h3>
        <Link to="/account">Home</Link>
        </div>
}
