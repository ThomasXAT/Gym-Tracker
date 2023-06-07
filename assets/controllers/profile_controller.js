import { Controller } from "@hotwired/stimulus";
import { verify } from "./common";
import { input } from "./common";

let RECTO = $("#recto");
const VERSO = $("#verso");

export default class extends Controller {
    connect() {
    }
    recto() {
        VERSO.removeClass("d-flex").addClass("d-none");
        RECTO.removeClass("d-none").addClass("d-flex");
    }
    verso() {
        RECTO.removeClass("d-flex").addClass("d-none");
        VERSO.removeClass("d-none").addClass("d-flex");
    }
    edit() {
        verify.firstname($("#profile_firstname"), true);
        verify.surname($("#profile_surname"), true);
        verify.email($("#profile_email"), true);
        let picture = true;
        $("#profile_file").on("change", function() {
            let file = this.files[0];
            if (file) {
                $("#profile__delete_picture").prop('checked', false);
                if (file.size > 2 * 1024 * 1024) {
                    input.setInvalid($("#profile_file"));
                    $("#profile_picture").attr("src", "images/dirtybulk-jaycutler.jpg");
                    $("#help-file").text("Fichier trop lourd. Taille maximale : 2 Mo.");
                    picture = false;
                }
                else {
                    input.setValid($("#profile_file"));
                    $("#help-file").text("");
                    picture = true;
                    let img = new Image();
                    img.onload = function() {
                        let width = this.width;
                        let height = this.height;
                        let size = Math.min(width, height);
                        let x = (width - size) / 2;
                        let y = (height - size) / 2;
                        let canvas = document.createElement("canvas");
                        let context = canvas.getContext("2d");
                        canvas.width = size;
                        canvas.height = size;
                        context.drawImage(img, x, y, size, size, 0, 0, size, size);
                        let croppedImageDataURL = canvas.toDataURL("image/jpeg");
                        $("#profile_picture").attr("src", croppedImageDataURL);
                    };
                    let path = URL.createObjectURL(file);
                    img.src = path;  
                }
            }
        });
        $("#delete_picture").on("click", function() {
            picture = true;
            $("#profile_picture").attr("src", "images/placeholder-athlete.jpg");
            input.setNeutral($("#profile_file"));
            $("#profile_file").val("");
            $("#help-file").text("");
            $("#profile__delete_picture").prop('checked', true);
        })
        $("#section-firstname").on("input", function() {
            verify.surname($("#profile_surname"), true);
            verify.firstname($("#profile_firstname"), true);
        });
        $("#section-surname").on("input", function() {
            verify.firstname($("#profile_firstname"), true);
            verify.surname($("#profile_surname"), true);
        });
        $("#form-profile").on("input change click", function() {
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
            picture && fullname && email && password ? submit.prop("disabled", false) : submit.prop("disabled", true);
        });
    }
}