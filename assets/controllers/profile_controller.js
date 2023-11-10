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
            $(document).on("click keyup", function(event) {
                if (!$(event.target).closest($("#section-height, #section-weight, #section-bmi")).length) {
                    if ($("#measurement_height").val() === $("#old-height").val() && $("#measurement_weight").val() === $("#old-weight").val()) {
                        $("#measurement_submit").attr("hidden", true);
                        $("#measurement_height, #measurement_weight, #measurement_bmi").addClass("text-white");
                    }
                }
                Validator.verify.add_form();
            });
            $("#measurement_height-before, #measurement_height-after").on("click", function() {
                $("#measurement_height").select();
            });
            $("#measurement_weight-before, #measurement_weight-after").on("click", function() {
                $("#measurement_weight").select();
            });
            $("#measurement_height, #measurement_weight").on("focus", function() {
                $(this).select();
            });
            $("#section-height, #section-weight, #section-bmi").on("click input keyup", function() {
                Generator.render.bmi();
                $("#measurement_submit").attr("disabled", !Validator.verify.measurement($("#measurement_height"), $("#measurement_weight")));
                $("#measurement_submit").attr("hidden", false);
                $("#measurement_height, #measurement_weight, #measurement_bmi").removeClass("text-white");
            });
            $("#measurement_height").on("input", function() {
                $(this).val($("#measurement_height").val().replace(".", ",").replace(/[^0-9,]/g, ""));
                let integer_part = $(this).val().split(",")[0];
                let decimal_part = $(this).val().replace(integer_part, "");
                let max_length = $(this).val().includes(",") ? integer_part.length + 3: 1;
                $(this).val((integer_part + (decimal_part.length ? "," + decimal_part.replace(/[^0-9]/g, ""): "")).substring(0, max_length));
            });
            $("#measurement_weight").on("input", function() {
                $(this).val($("#measurement_weight").val().replace(".", ",").replace(/[^0-9,]/g, ""));
                let integer_part = $(this).val().split(",")[0];
                let decimal_part = $(this).val().replace(integer_part, "");
                let max_length = $(this).val().includes(",") ? integer_part.length + 2: 3;
                $(this).val((integer_part + (decimal_part.length ? "," + decimal_part.replace(/[^0-9]/g, ""): "")).substring(0, max_length));
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
        $("#measurement_submit").attr("disabled", true);
        let height = parseFloat($("#measurement_height").val().replace(",", "."));
        let weight = parseFloat($("#measurement_weight").val().replace(",", "."));
        $.ajax({
            type: "POST",
            url: "/measurement/add",
            data: {
                height: height,
                weight: weight,
            },
            success: function() {
                $("#measurement_submit").attr("hidden", true);
                $("#measurements-list").removeClass("d-none");
                $("#measurement_height").addClass("text-white").val(height.toString().replace(".", ","));
                $("#measurement_weight").addClass("text-white").val(weight.toString().replace(".", ","));
                $("#measurement_bmi").addClass("text-white");
            },
            error: function() {
                $("#measurement_submit").attr("disabled", false);
            },
        });
    }
    private() {
        alert("Mesure privées");
    }
}