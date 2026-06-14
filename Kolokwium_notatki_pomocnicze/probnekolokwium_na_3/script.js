// Czekamy aż cały HTML się załaduje, zanim odpalimy jakikolwiek kod JS (Clean Code)
document.addEventListener("DOMContentLoaded", () => {

    const formularz = document.getElementById("_ID_FORMULARZA_");
    let formularzZatwierdzonyRaz = false; // UX: Błędy na żywo dopiero po kliknięciu Wyślij

    if (formularz) {
        // Główny nasłuchiwacz wysyłania formularza
        formularz.addEventListener("submit", (e) => {
            e.preventDefault();
            formularzZatwierdzonyRaz = true; 

            if (walidujWszystkoNa3_0()) {
                // Jeśli jesteś tylko na etapie 3.0 / 4.0:
                alert("Formularz poprawny  Dane zostały zweryfikowane.");
                formularz.submit(); // Odkomentuj, by fizycznie wysłać, jeśli będzie trzeba
            } else {
                alert("Wypełnij poprawnie podświetlone pola!");
            }
        });

        // Walidacja "na żywo" (działa tylko, gdy użytkownik kliknął już "Wyślij")
        const wszystkieInputy = formularz.querySelectorAll("input, select, textarea");
        wszystkieInputy.forEach(input => {
            input.addEventListener("input", () => {
                if (formularzZatwierdzonyRaz) walidujWszystkoNa3_0();
            });
        });
    }
    function walidujWszystkoNa3_0() {
        let jestPoprawnie = true;

        // 1. Walidacja Imienia/Nazwiska (Tylko litery, min 2 znaki)
        const imie = document.getElementById("_INPUT_IMIE_");
        if (imie && imie.value.trim().length < 2) {
            pokazBlad(imie, "_ERROR_IMIE_", "Podaj co najmniej 2 znaki.");
            jestPoprawnie = false;
        } else if (imie) {
            ukryjBlad(imie, "_ERROR_IMIE_");
        }

        // 2. Walidacja E-maila (Regex)
        const email = document.getElementById("_INPUT_EMAIL_");
        const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (email && !regexEmail.test(email.value)) {
            pokazBlad(email, "_ERROR_EMAIL_", "Błędny format e-mail (musi zawierać @ oraz kropkę)");
            jestPoprawnie = false;
        } else if (email) {
            ukryjBlad(email, "_ERROR_EMAIL_");
        }

        // 3. Walidacja Telefonu (Dokładnie 9 cyfr)
        const telefon = document.getElementById("_INPUT_TELEFON_");
        const regexTelefon = /^\d{9}$/;
        if (telefon && !regexTelefon.test(telefon.value)) {
            pokazBlad(telefon, "_ERROR_TELEFON_", "Wpisz dokładnie 9 cyfr bez spacji");
            jestPoprawnie = false;
        } else if (telefon) {
            ukryjBlad(telefon, "_ERROR_TELEFON_");
        }

        // 4. Walidacja Selecta (Wybór bukietu)
        const select = document.getElementById("_Rodaj_Bukietu");
        if (select && select.value === "") {
            pokazBlad(select, "_ERROR_SELECT_", "Wybierz bukiet z listy");
            jestPoprawnie = false;
        } else if (select) {
            ukryjBlad(select, "_ERROR_SELECT_");
        }

        // 5. Walidacja Selecta ilość bukietów (1-50)
        const ilosc = document.getElementById("_Input_Ilosc_Bukietu_");
        if (ilosc) {
            const wartosc = parseInt(ilosc.value);
            if (isNaN(wartosc) || wartosc < 1 || wartosc > 50) {
                pokazBlad(ilosc, "_ERROR_ILOSC_", "Ilość musi być liczbą od 1 do 50.");
                jestPoprawnie = false;
            } else {
                ukryjBlad(ilosc, "_ERROR_ILOSC_");
            }
        }
        return jestPoprawnie;
    }
    // --- FUNKCJE POMOCNICZE DO BŁĘDÓW  ---
    function pokazBlad(input, idDivBledu, komunikat) {
        input.classList.add("invalid"); 
        input.setCustomValidity(komunikat); // HTML5 Walidacja (Dobre praktyki!)
        const div = document.getElementById(idDivBledu);
        if (div) {
            div.textContent = komunikat;
            div.style.display = "block";
        }
    }

    function ukryjBlad(input, idDivBledu) {
        input.classList.remove("invalid");
        input.setCustomValidity(""); 
        const div = document.getElementById(idDivBledu);
        if (div) {
            div.textContent = "";
            div.style.display = "none";
        }
    }
});


