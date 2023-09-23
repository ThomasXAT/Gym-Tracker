import { Controller } from "@hotwired/stimulus";
import { Validator } from "./common";

export default class extends Controller {
    connect() {
        $.ajax({
            url: "/api/athlete",
            type: "GET",
            dataType: "json",
            success: function(response) {  
                $("#section-firstname").on("input click keyup", function() {
                    Validator.verify.surname($("#register_surname"), true);
                    Validator.verify.firstname($("#register_firstname"), true);
                });
                $("#section-surname").on("input click keyup", function() {
                    Validator.verify.firstname($("#register_firstname"), true);
                    Validator.verify.surname($("#register_surname"), true);
                });
                $("#form-register").on("input", function() {
                    let fullname = false;
                        if (Validator.verify.firstname($("#register_firstname")) && Validator.verify.surname($("#register_surname"))) {
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
                            Validator.setInvalid($("#register_username"));
                        }
                        else {
                            username = Validator.verify.username($("#register_username"), true);
                        }
                    let email = Validator.verify.email($("#register_email"), true);
                    let password = false;
                        if (Validator.verify.password($("#register_password"), true)) {
                            $("#section-confirmation").prop("hidden", false);
                            if (Validator.verify.confirmation($("#register_confirmation"), $("#register_password"), true)) {
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