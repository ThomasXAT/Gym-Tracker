import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
    connect() {
        let cards = document.querySelectorAll(".athlete");
        cards.forEach(function(card) {
            let username = card.dataset.username;
            card.addEventListener("click", function () {
                window.location.href = "/@" + username;
            });
        })
    }
}
