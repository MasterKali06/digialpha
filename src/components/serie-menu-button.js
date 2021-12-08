

const SerieMenuButton = ({title, icon, active, tabClicked}) => {

    return (
        <div className="serie-menu-button from-center"  
            onClick={tabClicked}
        >
            {icon}
            <h3>{title}</h3>
            {active && 
                <div className="serie-menu-active">            
                </div>
            }
        </div>
    )
}

export default SerieMenuButton;