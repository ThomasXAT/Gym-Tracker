import { Controller } from '@hotwired/stimulus';
import { verify } from './common';

export default class extends Controller {
    connect() {
      $("#section-username").on("keyup", function() {
        verify.username("login_username");
      });
      $("#section-password").on("keyup", function() {
          verify.password("login_password");
      });
      $("#form-login").on("keyup", function() {
          let button = $("#login_submit");
          if (
              verify.username("login_username") &&
              verify.password("login_password")
          ) {
              button.prop("disabled", false);
          }
          else {
              button.prop("disabled", true);
          }
      });
    }
}
