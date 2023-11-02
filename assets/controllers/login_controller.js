import { Controller } from "@hotwired/stimulus";
import { Validator } from "./common";

export default class extends Controller {
    connect() {
      Validator.verify.login_form();
      $("#form-login").on("input click keyup", function() {
        Validator.verify.login_form();
      });
    }
}
