import { Controller } from "@hotwired/stimulus";
import { verify } from "./common";
import { input } from "./common";

const IDENTIFIER = parseInt($("#identifier").text());

var load = {
    information: function() {
        let information = $("#information");
        let card = $("<div></div>")
            .addClass("card")
            .appendTo(information);
        let header = $("<header></header>")
            .addClass("card-header")
            .appendTo(card);
        let main = $("<main></main>")
            .addClass("card-body")
            .appendTo(card);
        let footer = $("<footer></footer>")
            .addClass("card-footer")
            .appendTo(card);
        $.ajax({
            url: "/api/athlete?id=" + IDENTIFIER,
            type: "GET",
            dataType: "json",
            success: function(response) {
                let athlete = response[IDENTIFIER];
                function recto() {
                    header.empty();
                    main.empty();
                    footer.empty();
                    // Picture
                    let section_picture = $("<section></section>")
                        .appendTo(header)
                        .attr("id", "section-picture")
                        .addClass("text-center py-1")
                    ;    
                        let picture = $("<img>")
                            .appendTo(section_picture)
                            .attr("id", "picture")
                            .attr("alt", athlete["username"])
                            .attr("width", "75%")
                            .addClass("profile-picture border p-1")
                        ;
                        if (athlete["picture"]) {
                            picture
                                .attr("src", athlete["picture"])
                            ;
                        }
                        else {
                            picture
                                .attr("src", "/build/images/placeholder-athlete.jpg")
                            ;     
                        }
                    // Identity
                    main.addClass("d-flex justify-content-center align-items-center");
                    let section_identity = $("<section></section>")
                        .appendTo(main)
                        .attr("id", "section-identity")
                        .addClass("text-center w-100")
                    ;
                        // Fullname
                        if (athlete["firstname"] || athlete["surname"]) {
                            let section_fullname = $("<section></section>")
                                .appendTo(section_identity)
                                .attr("id", "section-fullname")
                                .addClass("fs-3 overflow-auto")
                            ;
                                let fullname = $("<span></span>")
                                    .appendTo(section_fullname)
                                    .attr("id", "fullname")
                                    .addClass("text-truncate")
                                if (athlete["firstname"]) {
                                    let firstname = $("<span></span>")
                                        .appendTo(fullname)
                                        .attr("id", "firstname")
                                        .text(athlete["firstname"])
                                    ;
                                    if (athlete["surname"]) {
                                        let space = $("<span></span>")
                                            .appendTo(fullname)
                                            .text(" ")
                                        ;
                                    }
                                }
                                if (athlete["surname"]) {
                                    let surname = $("<span></span>")
                                        .appendTo(fullname)
                                        .attr("id", "surname")
                                        .text(athlete["surname"])
                                    ;
                                }
                        }
                        // Username
                        let section_username = $("<section></section>")
                            .appendTo(section_identity)
                            .attr("id", "section-username")
                            .addClass("overflow-auto")
                        ;
                            let username = $("<a></a>")
                                .appendTo(section_username)
                                .attr("id", "username")
                                .attr("href", "@" + athlete["username"])
                                .text("@" + athlete["username"])
                                .addClass("text-decoration-none text-truncate")
                            ;
                    // Rotation
                    let section_rotation = $("<section></section>")
                        .appendTo(footer)
                        .attr("id", "section-rotation")
                        .addClass("d-flex justify-content-between align-items-center")
                    ;
                        let left = $("<i></i>")
                            .appendTo(section_rotation)
                            .addClass("rotation-arrow fa-solid fa-arrow-left pointer d-none d-md-block")
                        ;
                        let page = $("<span></span>")
                            .appendTo(section_rotation)
                            .text("1 / 2")
                            .addClass("rotation-arrow m-auto pointer")
                        ;
                        let right = $("<i></i>")
                            .appendTo(section_rotation)
                            .addClass("rotation-arrow fa-solid fa-arrow-right pointer d-none d-md-block")
                        ;
                            $(".rotation-arrow").on("click", function() {
                                verso();
                            });
                }
                function verso() {
                    header.empty();
                    main.empty();
                    footer.empty(); 
                    // Description
                    main.removeClass("d-flex justify-content-center align-items-center");
                    let section_description = $("<section></section>")
                        .appendTo(main)
                        .attr("id", "section-description")
                        .addClass("overflow-auto border p-1 bg-black")
                    ;
                        let description = $("<span></span>")
                            .appendTo(section_description)
                            .attr("id", "description")
                            .text(athlete["description"])
                            .addClass("")
                        ;
                    // Rotation
                    let section_rotation = $("<section></section>")
                        .appendTo(footer)
                        .attr("id", "section-rotation")
                        .addClass("d-flex justify-content-between align-items-center")
                    ;
                        let left = $("<i></i>")
                            .appendTo(section_rotation)
                            .addClass("rotation-arrow fa-solid fa-arrow-left pointer d-none d-md-block")
                        ;
                        let page = $("<span></span>")
                            .appendTo(section_rotation)
                            .text("2 / 2")
                            .addClass("rotation-arrow m-auto pointer")
                        ;
                        let right = $("<i></i>")
                            .appendTo(section_rotation)
                            .addClass("rotation-arrow fa-solid fa-arrow-right pointer d-none d-md-block")
                        ;
                            $(".rotation-arrow").on("click", function() {
                                recto();
                            });
                }
                recto();
            }
        });
    },
};

export default class extends Controller {
    connect() {
        load.information();
    }
    edit() {
        $.ajax({
            url: "/api/athlete?id=" + IDENTIFIER,
            type: "GET",
            dataType: "json",
            success: function(response) { 
                input.setValid($("#profile_firstname").val(response[IDENTIFIER].firstname));
                $("#profile_surname").val(response[IDENTIFIER].surname);
                $("#profile_email").val(response[IDENTIFIER].email);
                $("#help-fullname").html("");
                verify.firstname($("#profile_firstname"), true);
                verify.surname($("#profile_surname"), true);
                verify.email($("#profile_email"), true);

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
        });
    }
}