import { Controller } from "@hotwired/stimulus";
import { Validator } from "./common";

export default class extends Controller {
    connect() {
        Validator.verify.firstname($("#profile_firstname"), true);
        Validator.verify.surname($("#profile_surname"), true);
        $("#section-firstname").on("input click keyup", function() {
            Validator.verify.surname($("#profile_surname"), true);
            Validator.verify.firstname($("#profile_firstname"), true);
        });
        $("#section-surname").on("input click keyup", function() {
            Validator.verify.firstname($("#profile_firstname"), true);
            Validator.verify.surname($("#profile_surname"), true);
        });
        $("#profile_height").val($("#height").text());
        $("#profile_weight").val($("#weight").text());
        Validator.verify.height($("#profile_height"), true);
        Validator.verify.weight($("#profile_weight"), true);
        $("#section-height").on("input click keyup", function() {
            Validator.verify.weight($("#profile_weight"), true);
            Validator.verify.height($("#profile_height"), true);
            $("#profile_height").val($("#profile_height").val().replace(".", ",").replace(/[^0-9,]/g, ""))
        });
        $("#section-weight").on("input click keyup", function() {
            Validator.verify.height($("#profile_height"), true);
            Validator.verify.weight($("#profile_weight"), true);
            $("#profile_weight").val($("#profile_weight").val().replace(".", ",").replace(/[^0-9,]/g, ""))
        });
        Validator.verify.profile_form();
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
        $("#form-profile").on("input click keyup", function() {
            Validator.verify.profile_form();
        });
    }
    recto() {
        $("#verso").removeClass("d-flex").addClass("d-none");
        $("#recto").removeClass("d-none").addClass("d-flex");
    }
    verso() {
        $("#recto").removeClass("d-flex").addClass("d-none");
        $("#verso").removeClass("d-none").addClass("d-flex");
    }
    edit() {
        $("#form-profile").submit();
    }
}