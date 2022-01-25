export const elementObserver = ({ fetch, element }) => {
	if (element) {
		const observer = new IntersectionObserver(
			(entries) => {
				const entry = entries[0];
				if (entry.isIntersecting) {
					fetch();
				}
			},
			{ threshold: 0 }
		);
		observer.observe(element);
	}
};
