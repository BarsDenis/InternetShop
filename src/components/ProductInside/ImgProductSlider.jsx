import Slider from "react-slick";

export default function ImgProductSlider({ image }) {
	const settings = {
		dots: true,
		arrows: false,
		infinite: false,
		speed: 500,
		slidesToShow: 1,
		slidesToScroll: 1,
		autoplay: true,
		autoplaySpeed: 3000,
		pauseOnHover: true,
		appendDots: (dots) => (
			<div className="dots-container">
				<ul style={{ margin: "0px" }}> {dots} </ul>
			</div>
		),
		customPaging: () => <i className="fas fa-circle"></i>,
	};

	return (
		<div className="slider-wrapper">
			<Slider {...settings}>{image}</Slider>
		</div>
	);
}
