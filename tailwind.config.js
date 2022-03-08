module.exports = {
	content: ["./views/**/*.ejs"],
	theme: {
		extend: {
			fontFamily: {
				"tf-medium": ["TTFirsNeue-Medium"],
				"tf-bold": ["TTFirsNeue-Bold"],
				"tf-demi-bold": ["TTFirsNeue-DemiBold"],
				"tf-regular": ["TTFirsNeue-Regular"],
			},
			colors: {
				"custom-blue": "#0052ff",
				"custom-green": "#098551",
			},
		},
	},
	plugins: [],
};
