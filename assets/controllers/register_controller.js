import { Controller } from '@hotwired/stimulus';
import { verify } from './common';

export default class extends Controller {
    connect() {
        $("#form-register").on("keyup", function() {
            let fullname = verify.fullname("register_firstname", "register_surname", true);
            let username = verify.username("register_username", true);
            let email = verify.email("register_email", true);
            let password = verify.password("register_password", true);
            let submit = $("#register_submit");
            if (password) {
                $("#section-confirmation").prop("hidden", false);
                let confirmation = verify.confirmation("register_confirmation", "register_password", true);
                fullname && username && email && confirmation ?
                    submit.prop("disabled", false) :
                    submit.prop("disabled", true);
            }
            else {
                $("#section-confirmation").prop("hidden", true);
                $("#register_confirmation").val("");
            }
        });
    }
}

