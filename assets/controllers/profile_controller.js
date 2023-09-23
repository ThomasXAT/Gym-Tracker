import { Controller } from "@hotwired/stimulus";
import { Validator } from "./common";

export default class extends Controller {
    connect() {
    }
    recto() {
        $("#verso").removeClass("d-flex").addClass("d-none");
        $("#recto").removeClass("d-none").addClass("d-flex");
    }
    verso() {
        $("#recto").removeClass("d-flex").addClass("d-none");
        $("#verso").removeClass("d-none").addClass("d-flex");
    }
    measurement() {
        $("#range-height").val($("#measurement_height").val());
        $("#range-weight").val($("#measurement_weight").val());
        $("#measurement_height").val($("#measurement_height").val().replace(".", ","));
        $("#measurement_weight").val($("#measurement_weight").val().replace(".", ","));
        if ($("#measurement_height").val() !== "" || $("#measurement_weight").val() !== "" ) {
            Validator.verify.height($("#measurement_height"), true);
            Validator.verify.weight($("#measurement_weight"), true);
        }
        $("#section-height").on("input click keyup", function() {
            Validator.verify.weight($("#measurement_weight"), true);
            Validator.verify.height($("#measurement_height"), true);
            $("#measurement_height").val($("#measurement_height").val().replace(".", ",").replace(/[^0-9,]/g, ""))
        });
        $("#section-weight").on("input click keyup", function() {
            Validator.verify.height($("#measurement_height"), true);
            Validator.verify.weight($("#measurement_weight"), true);
            $("#measurement_weight").val($("#measurement_weight").val().replace(".", ",").replace(/[^0-9,]/g, ""))
        });
        $("#form-measurement").on("input change click", function() {
            let measurement = false;
            if ((Validator.verify.height($("#measurement_height")) && Validator.verify.weight($("#measurement_weight"))) || ($("#measurement_height").val() === "" && $("#measurement_weight").val() === "")) {
                $("#help-measurement").html("");
                if (($("#measurement_height").val() === "" && $("#measurement_weight").val() === "")) {
                    Validator.setNeutral($("#measurement_height"));
                    Validator.setNeutral($("#measurement_weight"));
                }
                measurement = true;
            }
            let submit = $("#measurement_submit");
            measurement ? submit.prop("disabled", false) : submit.prop("disabled", true);
        });
        $("#range-height").on("input", function() {
            $("#measurement_height").val($(this).val().replace(".", ","));
        });
        $("#range-weight").on("input", function() {
            $("#measurement_weight").val($(this).val().replace(".", ","));
        });
        $("#measurement_height").on("input", function() {
            $("#range-height").val($(this).val().replace(",", "."));
        });
        $("#measurement_weight").on("input", function() {
            $("#range-weight").val($(this).val().replace(",", "."));
        });
        $("#delete_measurement").on("click", function() {
            $("#measurement_height").val("");
            $("#measurement_weight").val("");
            $("#range-height").val($("#measurement_height").val());
            $("#range-weight").val($("#measurement_weight").val());
            $("#help-measurement").html("");
            Validator.setNeutral($("#measurement_height"));
            Validator.setNeutral($("#measurement_weight"));
        });
        $("#measurement_submit").on("click", function() {
            $("#form-measurement").submit();
        });
    }
    edit() {
        Validator.verify.firstname($("#profile_firstname"), true);
        Validator.verify.surname($("#profile_surname"), true);
        Validator.verify.email($("#profile_email"), true);
        let picture = true;
        $("#profile_file").on("change", function() {
            let file = this.files[0];
            if (file) {
                $("#profile__delete_picture").prop("checked", false);
                if (file.size > 2 * 1024 * 1024) {
                    Validator.setInvalid($("#profile_file"));
                    $("#profile_picture").attr("src", "images/bulking-jay.jpg");
                    $("#help-file").text("Fichier trop lourd. Taille maximale : 2 Mo.");
                    picture = false;
                }
                else {
                    Validator.setValid($("#profile_file"));
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
                    img.src = URL.createObjectURL(file);
                }
            }
        });
        $("#delete_picture").on("click", function() {
            picture = true;
            $("#profile_picture").attr("src", "images/placeholder-athlete.jpg");
            Validator.setNeutral($("#profile_file"));
            $("#profile_file").val("");
            $("#help-file").text("");
            $("#profile__delete_picture").prop("checked", true);
        })
        $("#section-firstname").on("input click keyup", function() {
            Validator.verify.surname($("#profile_surname"), true);
            Validator.verify.firstname($("#profile_firstname"), true);
        });
        $("#section-surname").on("input click keyup", function() {
            Validator.verify.firstname($("#profile_firstname"), true);
            Validator.verify.surname($("#profile_surname"), true);
        });
        $("#section-measurement-checkbox").on("input", function() {
            Validator.verify.weight($("#measurement_weight"), true);
            Validator.verify.height($("#measurement_height"), true);
        });
        $("#form-profile").on("input change click", function() {
            let fullname = false;
                if (Validator.verify.firstname($("#profile_firstname")) && Validator.verify.surname($("#profile_surname"))) {
                    $("#help-fullname").html("");
                    fullname = true;
                }
            let email = Validator.verify.email($("#profile_email"), true);
            let password = true;
            if ($("#profile_password").val()) {
                password = false;
            }
                if (Validator.verify.password($("#profile_password"), true)) {
                    $("#section-confirmation").prop("hidden", false);
                    if (Validator.verify.confirmation($("#profile_confirmation"), $("#profile_password"), true)) {
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
        $("#profile_submit").on("click", function() {
            $("#form-profile").submit();
        });
    }
}