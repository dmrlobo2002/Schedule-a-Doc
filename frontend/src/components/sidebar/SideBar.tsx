import "./SideBar.css";

const SideBar = () => {
    return(
        <div className="Sidebar">
            <div className="top">
                <span className="User">
                    user name</span> 
                </div>
            <div className="center">
                <ul>
                    <li>
                        <span> Dashboard</span>
                    </li>
                    <li>
                        <span> Dashboard</span>
                    </li>
                    <li>
                        <span> Dashboard</span>
                    </li>
                    <li>
                        <span> Dashboard</span>
                    </li>
                    
                </ul>
                 
                 </div>
            <div className="bottom">logout</div>
        </div>
    )
}

export default SideBar