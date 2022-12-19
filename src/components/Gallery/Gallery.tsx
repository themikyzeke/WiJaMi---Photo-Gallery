import { useToken } from "../../contexts/authTokenContext"

export const Gallery = () => {
    const[token ]= useToken()
    return (
        <div className="main-menu">
            <div className="content-layer">

            <div className="about">
                <h3>👋 Cześć user!</h3>
                <h4>Galeria zdjęć</h4>
            </div>

            <div className="line-breaker">
                <hr></hr>
            </div>  

            <div className="photo-grid-row">
                <div className="photo-grid-column">
                    <img src="1.png"/>
                    <img src="2.jpeg"/> 
                    <img src="3.jpg"/>
                </div>

                <div className="photo-grid-column">
                    <img src="4.jpg"/>
                    <img src="5.jpg"/> 
                    <img src="6.jpg"/>
                </div>
        
            </div> 
            </div>
        </div>
    )
}