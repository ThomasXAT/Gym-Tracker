import { Controller } from "@hotwired/stimulus";
import { verify } from "./common";
import { input } from "./common";

export default class extends Controller {
    connect() {
        $.ajax({
            url: "/api/athlete",
            type: "GET",
            dataType: "json",
            success: function(response) {  
                $("#section-firstname").on("input", function() {
                    verify.surname($("#register_surname"), true);
                    verify.firstname($("#register_firstname"), true);
                });
                $("#section-surname").on("input", function() {
                    verify.firstname($("#register_firstname"), true);
                    verify.surname($("#register_surname"), true);
                });
                $("#form-register").on("input", function() {
                    let fullname = false;
                        if (verify.firstname($("#register_firstname")) && verify.surname($("#register_surname"))) {
                            $("#help-fullname").html("");
                            fullname = true;
                        }
                    let username = false;
                        let available = true;
                        $.each(response, function(id, athlete) {
                            if ($("#register_username").val().toLowerCase() === athlete.username.toLowerCase()) {
                                available = false;
                            }
                            else {
                                $.each(FORBIDDEN, function(i, word) {
                                    if ($("#register_username").val().toLowerCase() === word) {
                                        available = false;
                                    }
                                });
                            }
                        }); 
                        if (!available) {
                            $("#help-username").html("Cet identifiant n'est pas disponible.");
                            input.setInvalid($("#register_username"));
                        }
                        else {
                            username = verify.username($("#register_username"), true);
                        }
                    let email = verify.email($("#register_email"), true);
                    let password = false;
                        if (verify.password($("#register_password"), true)) {
                            $("#section-confirmation").prop("hidden", false);
                            if (verify.confirmation($("#register_confirmation"), $("#register_password"), true)) {
                                password = true;
                            }
                        }
                        else {
                            $("#section-confirmation").prop("hidden", true);
                            $("#register_confirmation").val("");
                        }
                    let submit = $("#register_submit");
                    fullname && username && email && password ? submit.prop("disabled", false) : submit.prop("disabled", true);
                });
            }
        });
    }
}