// Custom Scrollbar for Mobile (Mouse only - no touch support)
let scrollbar, thumb, isDragging, startY, startScrollTop;

// 1. Get scrollbar elements
function getScrollbarElements() {
	scrollbar = document.querySelector(".custom-scrollbar");
	thumb = document.querySelector(".custom-scrollbar-thumb");
	return scrollbar && thumb;
}

// 2. Update thumb position based on scroll
function updateThumbPosition() {
	if (!thumb) return;

	const scrollHeight = document.documentElement.scrollHeight;
	const clientHeight = document.documentElement.clientHeight;
	const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

	const scrollPercentage = scrollTop / (scrollHeight - clientHeight);
	const maxThumbTop = window.innerHeight - 48;
	const thumbTop = scrollPercentage * maxThumbTop;

	thumb.style.top = thumbTop + "px";
}

// 3. Setup mouse events for dragging
function setupMouseEvents() {
	thumb.onmousedown = (e) => {
		isDragging = true;
		startY = e.clientY;
		startScrollTop = window.pageYOffset || document.documentElement.scrollTop;
	};

	document.onmousemove = (e) => {
		if (!isDragging) return;

		const deltaY = e.clientY - startY;
		const scrollHeight = document.documentElement.scrollHeight;
		const clientHeight = document.documentElement.clientHeight;
		const maxThumbTop = window.innerHeight - 48;

		const scrollAmount = (deltaY / maxThumbTop) * (scrollHeight - clientHeight);
		window.scrollTo(0, startScrollTop + scrollAmount);
	};

	document.onmouseup = () => {
		isDragging = false;
	};
}

// 4. Attach scroll and resize events
function attachScrollbarEvents() {
	window.onscroll = updateThumbPosition;
	window.onresize = updateThumbPosition;

	// Initial position
	updateThumbPosition();
}

// 5. Main initialization function
function initCustomScrollbar() {
	if (window.innerWidth > 500) return;
	if (!getScrollbarElements()) return;

	isDragging = false;
	startY = 0;
	startScrollTop = 0;

	setupMouseEvents();
	attachScrollbarEvents();
}

// Initialize on page load
if (document.readyState === "loading") {
	document.onreadystatechange = () => {
		if (document.readyState === "complete") {
			initCustomScrollbar();
		}
	};
} else {
	initCustomScrollbar();
}
