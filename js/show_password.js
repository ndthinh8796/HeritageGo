function showPassword() {
    input = document.querySelector("#password");
    lockIcon = document.querySelector("#lockIcon");
    if (input.type === "password") {
      input.type = "text";
      lockIcon.className = "fas fa-unlock-alt";
    } else if (input.type === "text") {
      input.type = "password";
      lockIcon.className = "fas fa-lock";
    }
  }