import React from 'react';
import "../module_css/index.css"

const RatingsAvatar = () => { 
    return (
        <>
       <div className="avatar-group">
	<div class="avatar">
		<img src="http://localhost:7000/images/ds18:57:50.643Z.png" alt="..." className="avatar-img rounded-circle border border-white"/>
	</div>
	<div className="avatar">
		<img src="https://via.placeholder.com/50x50" alt="..." className="avatar-img rounded-circle border border-white"/>
	</div>
	<div className="avatar">
		<img src="https://via.placeholder.com/50x50" alt="..." className="avatar-img rounded-circle border border-white"/>
	</div>
	<div className="avatar">
		<span className="avatar-title rounded-circle border border-white">CF</span>
	</div>
</div>
<span className="text-black-50"> + 23</span>
<br/>
    </>
    );
};

export default RatingsAvatar;