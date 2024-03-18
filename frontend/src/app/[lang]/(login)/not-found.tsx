import React from 'react'
import Image from 'next/image'; 

const PageNotFound = () => {
    return (
    	<div className="PageNotFound">
			<div className="imgClass" >
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
