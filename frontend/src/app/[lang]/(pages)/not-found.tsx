import React from 'react'
import Image from 'next/image'; 
import Link from 'next/link';
import easeLogo from "../../../public/new_assets/logo/lightLogo.png"

const PageNotFound = () => {
    return (
    	<div className="PageNotFound">
			<div className="imgClass" >
				<Link className="block flex-shrink-0" href="/">
					<Image
						width={60}
						height={60}
						src={"/new_assets/logo/lightLogo.png"}
						alt="Logo"
					/>
				</Link>
				<Image className="img" src="/404.png" alt='404' width={400} height={300} />
      			<p>Bientot Disponible</p>
			</div>
    	</div>
  	);
}

export default PageNotFound


// import React from 'react';

// const NotFound = () => {
//   return <div>not-found</div>;
// };

// export default NotFound;
