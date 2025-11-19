function initStaticPages() {
  let isLoggedIn = sessionStorage.getItem("isLoggedIn");
  if (isLoggedIn === "true") {
    console.log(isLoggedIn);
    return;
  } else {
    renderLoginSidbar();
  }
}

function renderLoginSidbar() {
  emptySidebar = document.getElementById("sidebar-section");
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
      <div class="sidebar-footer d-flex">
        <a href="/html/datenschutz.html" class="selected-link"
          >Privacy Policy</a
        >
        <a href="/html/impressum.html" class="pad-8">Legal Notice</a>
      </div>
  `;
}
