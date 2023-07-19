import { Controller } from "@hotwired/stimulus";
import { validator } from "./common";

export default class extends Controller {
    connect() {
        $.ajax({
            url: "/api/athlete",
            type: "GET",
            dataType: "json",
            success: function(response) {  
                $("#section-firstname").on("input", function() {
                    validator.verify.surname($("#register_surname"), true);
                    validator.verify.firstname($("#register_firstname"), true);
                });
                $("#section-surname").on("input", function() {
                    validator.verify.firstname($("#register_firstname"), true);
                    validator.verify.surname($("#register_surname"), true);
                });
                $("#form-register").on("input", function() {
                    let fullname = false;
                        if (validator.verify.firstname($("#register_firstname")) && validator.verify.surname($("#register_surname"))) {
                            $("#help-fullname").html("");
                            fullname = true;
                        }
                    let username = false;
                        let available = true;
                        $.each(response, function(i, athlete) {
                            if ($("#register_username").val().toLowerCase() === athlete.username.toLowerCase()) {
                                available = false;
                            }
                        }); 
                        if (!available) {
                            $("#help-username").html("Cet identifiant n'est pas disponible.");
                            validator.setInvalid($("#register_username"));
                        }
                        else {
                            username = validator.verify.username($("#register_username"), true);
                        }
                    let email = validator.verify.email($("#register_email"), true);
                    let password = false;
                        if (validator.verify.password($("#register_password"), true)) {
                            $("#section-confirmation").prop("hidden", false);
                            if (validator.verify.confirmation($("#register_confirmation"), $("#register_password"), true)) {
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