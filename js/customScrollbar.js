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

	// Account for track top position (205px) and thumb height (48px)
	const trackTop = 205;
	const thumbHeight = 48;
	const maxThumbTop = window.innerHeight - trackTop - thumbHeight;
	const thumbTop = scrollPercentage * maxThumbTop;

	thumb.style.top = thumbTop + "px";
}

// 3. Handle mouse down on thumb
function handleMouseDown(e) {
	isDragging = true;
	startY = e.clientY;
	startScrollTop = window.pageYOffset || document.documentElement.scrollTop;
}

// 4. Handle mouse move during drag
function handleMouseMove(e) {
	if (!isDragging) return;

	const deltaY = e.clientY - startY;
	const scrollHeight = document.documentElement.scrollHeight;
	const clientHeight = document.documentElement.clientHeight;

	// Account for track top position (205px) and thumb height (48px)
	const trackTop = 205;
	const thumbHeight = 48;
	const maxThumbTop = window.innerHeight - trackTop - thumbHeight;

	const scrollAmount = (deltaY / maxThumbTop) * (scrollHeight - clientHeight);
	window.scrollTo(0, startScrollTop + scrollAmount);
}

// 5. Handle mouse up to stop dragging
function handleMouseUp() {
	isDragging = false;
}

// 6. Setup mouse events for dragging
function setupMouseEvents() {
	thumb.onmousedown = handleMouseDown;
	document.onmousemove = handleMouseMove;
	document.onmouseup = handleMouseUp;
}

// 7. Attach scroll and resize events
function attachScrollbarEvents() {
	window.onscroll = updateThumbPosition;
	window.onresize = updateThumbPosition;

	// Initial position
	updateThumbPosition();
}

// 8. Main initialization function
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
