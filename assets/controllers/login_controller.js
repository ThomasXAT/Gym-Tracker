import { Controller } from '@hotwired/stimulus';
import { verify } from './common';

export default class extends Controller {
    connect() {
      $("#form-login").on("keyup", function() {
            let username = verify.username($("#login_username"));
            let password =  verify.password($("#login_password"));
            let submit = $("#login_submit");
            username && password ? submit.prop("disabled", false) : submit.prop("disabled", true);
      });
    }
}
