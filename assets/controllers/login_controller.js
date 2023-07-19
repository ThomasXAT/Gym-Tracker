import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
    connect() {
      $("#form-login").on("input", function() {
            let username = $("#login_username").val() !== "";
            let password = $("#login_password").val() !== "";
            let submit = $("#login_submit");
            username && password ? submit.prop("disabled", false) : submit.prop("disabled", true);
      });
    }
}
