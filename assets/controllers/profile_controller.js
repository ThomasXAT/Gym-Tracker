import { Controller } from "@hotwired/stimulus";
import { verify } from "./common";
import { input } from "./common";

const IDENTIFIER = parseInt($("#identifier").text());
let RECTO = $("#recto");
const VERSO = $("#verso");

export default class extends Controller {
    connect() {
            verify.firstname($("#profile_firstname"), true);
            verify.surname($("#profile_surname"), true);
            verify.email($("#profile_email"), true);
    }
    recto() {
        VERSO.removeClass("d-flex");
        RECTO.removeClass("d-none");
        VERSO.addClass("d-none");
        RECTO.addClass("d-flex");
    }
    verso() {
        RECTO.removeClass("d-flex");
        VERSO.removeClass("d-none");
        RECTO.addClass("d-none");
        VERSO.addClass("d-flex");
    }
    edit() {
        $("#section-firstname").on("input", function() {
            verify.surname($("#profile_surname"), true);
            verify.firstname($("#profile_firstname"), true);
        });
        $("#section-surname").on("input", function() {
            verify.firstname($("#profile_firstname"), true);
            verify.surname($("#profile_surname"), true);
        });
        $("#form-profile").on("input", function() {
            let fullname = false;
                if (verify.firstname($("#profile_firstname")) && verify.surname($("#profile_surname"))) {
                    $("#help-fullname").html("");
                    fullname = true;
                }
            let email = verify.email($("#profile_email"), true);
            let password = true;
            if ($("#profile_password").val()) {
                password = false;
            }
                if (verify.password($("#profile_password"), true)) {
                    $("#section-confirmation").prop("hidden", false);
                    if (verify.confirmation($("#profile_confirmation"), $("#profile_password"), true)) {
                        password = true;
                    }
                }
                else {
                    $("#section-confirmation").prop("hidden", true);
                    $("#profile_confirmation").val("");
                }
            let submit = $("#profile_submit");
            fullname && email && password ? submit.prop("disabled", false) : submit.prop("disabled", true);
        });
    }
}