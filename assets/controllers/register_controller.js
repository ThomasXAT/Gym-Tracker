import { Controller } from '@hotwired/stimulus';
import { verify } from './common';

export default class extends Controller {
    connect() {
        $("#section-firstname").on("keyup", function() {
            verify.firstname("register_firstname", true);
        });
        $("#section-surname").on("keyup", function() {
            verify.surname("register_surname", true);
        });
        $("#section-fullname").on("keyup", function() {
            verify.fullname("register_firstname", "register_surname", true);
        });
        $("#section-username").on("keyup", function() {
            verify.username("register_username", true);
        });
        $("#section-email").on("keyup", function() {
            verify.email("register_email", true);
        });
        $("#section-password").on("keyup", function() {
            verify.password("register_password", true, true);
        });
        $("#section-confirmation").on("keyup", function() {
            verify.confirmation("register_confirmation", "register_password", true);
        });
        $("#form-register").on("keyup", function() {
            let button = $("#register_submit");
            if (
                verify.fullname("register_firstname", "register_surname") &&
                verify.username("register_username") &&
                verify.email("register_email") &&
                verify.password("register_password") &&
                verify.confirmation("register_confirmation", "register_password")
            ) {
                button.prop("disabled", false);
            }
            else {
                button.prop("disabled", true);
            }
        });
    }
}
