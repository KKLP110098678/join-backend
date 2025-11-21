function initStaticPages() {
  let isLoggedIn = sessionStorage.getItem("isLoggedIn");
  if (isLoggedIn === "true") {
    console.log(isLoggedIn);
    return;
  } else {
    renderLoginSidbar();
  }
}

function renderLoginSidbar(seite) {
  emptySidebar = document.getElementById("sidebar-nav");
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
