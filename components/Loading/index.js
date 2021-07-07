/* eslint-disable @next/next/no-img-element */
import { Image } from "@material-ui/icons";
import { Circle } from "better-react-spinkit"

const Loading = () => {
    return (
		<center style={ { display: "grid", placeItems: "center", height: "100vh" } }>
			<div>
				<img 
                    src="http://assets.stickpng.com/images/580b57fcd9996e24bc43c543.png" alt="logo" 
                    height={200}
                    style={ { marginBottom: 10 } }    
                />
                <Circle color="#3CBC28" size={60} />
			</div>
		</center>
	);
}

export default Loading
