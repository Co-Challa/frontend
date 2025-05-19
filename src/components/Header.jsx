import "./header.css";

export default function Header() {
	return (
		<>
			<header className="header_wrapper">
				<div className="header_frame" />

				<div className="header_frame_shadow" />

				<div class="header_content_frame">
					<div className="cochalla_frame">
						<img class="cochalla_logo" src="src\assets\logo\logo.png" />
						<span class="cochalla_text">Cochalla</span>
					</div>

					<div className="feature_frame">
						<div className="question_box">
							<span className="question_text">질문하기</span>
							<img className="question_icon" src="src\assets\icons\stars.png"/>
						</div>
						<div>
							<span className="login">로그인</span>
						</div>
					</div>

					{/* <div className="feature_frame">
						<div className="question_box">
							<span className="question_text">질문하기</span>
							<img className="question_icon" src="src\assets\icons\stars.png"/>
						</div>
						<div>
							<img className="user_img" src="src\assets\images\profile\profile_1.png" />
						</div>
					</div> */}
				</div>

			</header>
		</>
	);
}
