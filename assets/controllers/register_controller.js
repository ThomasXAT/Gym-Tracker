import { Controller } from '@hotwired/stimulus';
import { verify } from './common';
import { input } from './common';

export default class extends Controller {
    connect() {
        $("#form-register").on("keyup", function() {
            $.ajax({
                url: '/ajax/athlete',
                type: 'GET',
                dataType: 'json',
                success: function(response) {
                    let username;
                    if (response[$("#register_username").val().toLowerCase()]) {
                        $("#help-username").html("Cet identifiant n'est pas disponible.");
                        input.setInvalid("register_username");
                    }
                    else {
                        username = verify.username("register_username", true);
                    }
                    let fullname = verify.fullname("register_firstname", "register_surname", true);
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
                }
            });
        });
    }
}

