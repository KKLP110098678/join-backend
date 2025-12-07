function initStaticPages() {
  let isLoggedIn = sessionStorage.getItem("isLoggedIn");
  if (isLoggedIn === "true") {
    return;
  } else {
    renderLoginSidbar();
    renderEmptyHeader();
  }
}

function renderLoginSidbar() {
  let = emptySidebar = document.getElementById("sidebar-nav");
  emptySidebar.innerHTML = "";
  emptySidebar.innerHTML = `
      <nav class="sidenav d-flex">
        <a class="btn-menu" href="./login.html"
          ><img
            src="/assets/icon/sign/Login.svg"
            alt="Add Task Icon"
          />Log In</a
        >
      </nav>
  `;
}

function renderEmptyHeader() {
  let userHeadere = document.getElementById("menu-user");
  userHeadere.innerHTML = "";
  userHeadere.innerHTML = `<p>Kanban Project Management Tool</p>`;
}
 