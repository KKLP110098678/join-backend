function initStaticPages() {
	const isLoggedIn = sessionStorage.getItem("isLoggedIn");
	if (isLoggedIn === "true") {
		return;
	} else {
		renderLoginSidbar();
		renderEmptyHeader();
	}
}

function renderLoginSidbar() {
	const emptySidebar = document.getElementById("sidebar-nav");
	emptySidebar.classList.remove("sidenav");
	emptySidebar.innerHTML = "";
	emptySidebar.innerHTML = `
      <div class="empty-nav">

<div>
<a class="btn-menu" href="./login.html"
          ><img
            src="/assets/icon/sign/login.svg"
            alt="Add Task Icon"
          />Log In</a
        >
</div>

 <div class="sidebar-links">
	<a href="./datenschutz.html" >
		Privacy Policy
	</a>
	<a href="./legalnotice.html" >
		Legal Notice
	</a>
</div>
        </div>

  `;
}

function renderEmptyHeader() {
	const userHeadere = document.getElementById("menu-user");
	userHeadere.innerHTML = "";
	userHeadere.innerHTML = `<p>Kanban Project Management Tool</p>`;
}

