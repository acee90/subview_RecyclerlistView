import React, { useEffect, useRef } from "react";
// import logo from './logo.svg';
// import './App.css';
import "./hypermeetingwebcss-master/dist/css/style.css";
import ReactWindowExample from "./ReactWindow";
import RecycleTestComponent, {
	RecycleTestComponent2,
} from "./recyclelist/RecycleList";
// import RecycleSampleComponent from './recyclelist/Sample1';
import SampleMediaStream from "./recyclelist/SampleMediaStream";

function App() {
	const mainVideoRef = useRef<HTMLVideoElement>(null);

	useEffect(() => {
		if (mainVideoRef.current) {
			mainVideoRef.current.srcObject = SampleMediaStream();
		}
	}, []);

	// return (
	// 	<div id="aaaa">
	// 		<div></div>
	// 		<RecycleTestComponent2 />
	// 	</div>
	// );

	return (
		<>
			<RecycleTestComponent />
		</>
	);

	return (
		<>
			<div className="MeetingPagePresenter">
				<div className="MeetingHeaderPresenter">
					<div className="room-title">
						<span className="room-title-logo"></span>
						<p>회의실 ID : 111-111-1111</p>
						<button type="button" className="btn-icon btn-copy">
							<span>copy</span>
						</button>
					</div>
					<div className="room-topMenu">
						<button
							type="button"
							className="btn-icon hm-tooltip bottom center btn-info-room on"
							data-title="회의실 정보"
						>
							<span>회의실 정보</span>
						</button>
						<button
							type="button"
							className="btn-icon hm-tooltip bottom center btn-info-entry"
							data-title="참여자 정보"
							data-number="6"
						>
							<span>참여자 정보</span>
						</button>
						<button
							type="button"
							className="btn-icon hm-tooltip bottom right btn-set"
							data-title="설정"
						>
							<span>설정</span>
						</button>
					</div>
				</div>
				<div className="room-container">
					<div className="room-content">
						<div className="room-viewBox view-focus">
							<div className="room-mainView">
								<div className="mainView-box">
									<div className="view-video-wrap">
										<video height="300" ref={mainVideoRef} controls></video>
									</div>
								</div>
							</div>
							<div className="room-thumbView">
								{/* <button type="button" className="thumbView-arrow arrow-prev disabled"><span></span></button> */}
								<div className="thumbView-slider">
									{/* <RecycleTestComponent2 /> */}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default App;
