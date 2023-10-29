import { Controller } from "@hotwired/stimulus";
import { 
    Validator,
    Generator 
} from "./common";
import {
    trans,
    VALIDATOR_FILE_SIZE_MAX,
} from '../translator';

export default class extends Controller {
    connect() {
        if ($("#form-profile").length) {
            $("#input-height").on("click", function() {
                $("#measurement_height").select();
            });
            $("#input-weight").on("click", function() {
                $("#measurement_weight").select();
            });
            $("#measurement_height").on("focus", function() {
                $(this).select();
            });
            $("#measurement_weight").on("focus", function() {
                $(this).select();
            });
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
            $("#section-measurements").on("input", function() {
                Generator.render.bmi();
                $("#measurement_height").val($("#measurement_height").val().replace(".", ",").replace(/[^0-9,]/g, ""));
                $("#measurement_weight").val($("#measurement_weight").val().replace(".", ",").replace(/[^0-9,]/g, ""));
                $("#measurement_submit").attr("disabled", !Validator.verify.measurement($("#measurement_height"), $("#measurement_weight")));
            });
            Validator.verify.profile_form();
            let picture = true;
            $("#profile_file").on("change", function() {
                let file = this.files[0];
                if (file) {
                    $("#profile__delete_picture").prop("checked", false);
                    if (file.size > 5 * 1024 * 1024) {
                        Validator.setInvalid($("#profile_file"));
                        $("#profile_picture").attr("src", "images/dirtybulk-jaycutler.jpg");
                        $("#help-file").text(trans(VALIDATOR_FILE_SIZE_MAX));
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
            Generator.render.bmi();
        }
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
    measurement() {
        let height = $("#measurement_height");
        let weight = $("#measurement_weight");
        $.ajax({
            type: "POST",
            url: "/measurement/add",
            data: {
                height: height.val(),
                weight: weight.val(),
            },
            success: function(response) {
                $("#measurement_submit").attr("disabled", true);
                $("#measurements-list").removeClass("d-none");
                Generator.render.bmi();
            },
        });
    }
}