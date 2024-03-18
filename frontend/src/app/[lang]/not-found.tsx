import React from 'react'
import Image from 'next/image'; 
import easeLogo from "../../public/new_assets/logo/darkLogo.png"
import Link from 'next/link';

const PageNotFound = () => {
    return (
    	<div className="flex justify-center content-center items-center h-screen ">
			<div className="imgClass" >
				<Link className="flex justify-center" href="/">
					<Image
						width={100}
						height={100}
						src={"/new_assets/logo/darkLogo.png"}
						alt="Logo"
					/>
				</Link>
				<Image className="img" src="/404.png" alt='404' width={400} height={300} />
      			<p className='text-[2rem] text-center'>Coming Soon</p>
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
