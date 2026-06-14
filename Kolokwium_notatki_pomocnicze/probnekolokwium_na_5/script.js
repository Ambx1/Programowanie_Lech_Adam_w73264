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
                alert("Formularz poprawny  Dane zostały zweryfikowane.");
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

        // 1. Walidacja Imienia (Tylko litery, min 2 znaki)
        const imie = document.getElementById("_INPUT_IMIE_");
        if (imie && imie.value.trim().length < 2) {
            pokazBlad(imie, "_ERROR_IMIE_", "Podaj co najmniej 2 znaki.");
            jestPoprawnie = false;
        } else if (imie) {
            ukryjBlad(imie, "_ERROR_IMIE_");
        }
        // 1.2 Walidacja Nazwiska (Tylko litery, min 2 znaki)
        const nazwisko = document.getElementById("_INPUT_NAZWISKO_");
        if (nazwisko && nazwisko.value.trim().length < 2) {
            pokazBlad(nazwisko, "_ERROR_NAZWISKO`_", "Podaj co najmniej 2 znaki.");
            jestPoprawnie = false;
        } else if (nazwisko) {
            ukryjBlad(nazwisko, "_ERROR_NAZWISKO_");
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
   // BAZA 1: KWIACIARNIA
    const cenyKwiaciarnia = { "różowy_różany": 20, "biały_lilak": 22, "bordowe_chryzantemy": 24 };
    const cenyUslug = { "dostawa": 10, "dodatkowa_dekoracja": 15, "kartka_z_zyczeniami": 5};
    
    // --- ELEMENTY Z DOM ---
    const selectBukiet = document.getElementById("_Rodaj_Bukietu");
    const inputIlosc = document.getElementById("_Input_Ilosc_Bukietu_");
    const checkboxyUslug = document.querySelectorAll(".opcja-uslugi"); 
    
    const tekstSumyWFormularzu = document.getElementById("_TEXT_SUMA_NA_ZYWO_");
    const tekstSumyWTabeli = document.getElementById("_TEXT_SUMA_");

    // Nasłuchiwacze zmian - jeśli cokolwiek się zmieni, przelicz kwotę na żywo! 
    if (selectBukiet && inputIlosc) {
        selectBukiet.addEventListener("change", przeliczKwoteNaZywo);
        inputIlosc.addEventListener("input", przeliczKwoteNaZywo);
        checkboxyUslug.forEach(chk => {
            chk.addEventListener("change", przeliczKwoteNaZywo);
        });
    }

    function przeliczKwoteNaZywo() {
        const idBukietu = selectBukiet.value;
        const ilosc = parseInt(inputIlosc.value) || 1;
        let sumaZKoszyka = 0;
         tablicaKoszyka.forEach(element => {
            sumaZKoszyka += element.wartosc;
        });

        let kwotaPodstawowa = 0;
        if (idBukietu !== "" && cenyKwiaciarnia[idBukietu]) {
            kwotaPodstawowa = cenyKwiaciarnia[idBukietu] * ilosc;
        }

        let kwotaDodatkow = 0;
        // Pętla przechodzi przez wszystkie 3 checkboxy i sprawdza, które są zaznaczone
        checkboxyUslug.forEach(chk => {
            if (chk.checked) {
                kwotaDodatkow += cenyUslug[chk.value]; 
            }
        });

        const sumaNaZywo = kwotaPodstawowa + kwotaDodatkow + sumaZKoszyka;
        
        // Zaktualizuj teksty na stronie
        if (tekstSumyWFormularzu) tekstSumyWFormularzu.textContent = `${sumaNaZywo.toFixed(2)} PLN`;
        
    }

    // --- 2. DODAWANIE DO KOSZYKA ---
    const btnDodajDoKoszyka = document.getElementById("_BTN_DODAJ_DO_KOSZYKA_");
    const tabelaBody = document.getElementById("_TABELA_BODY_");
    let tablicaKoszyka = [];
    
    if (btnDodajDoKoszyka && tabelaBody) {
        btnDodajDoKoszyka.addEventListener("click", () => {
            // Walidacja tylko dla selektora bukietów przed dodaniem
            if (!selectBukiet.value) {
                alert("Wybierz opcję zanim dodasz ją do koszyka");
                return;
            }

            const idOpcji = selectBukiet.value;
            const ilosc = parseInt(inputIlosc.value);
            
            if (isNaN(ilosc) || ilosc < 1) {
                alert("Podaj poprawną ilość!");
                return;
            }

            const cena = cenyKwiaciarnia[idOpcji];
            const nazwaOpcji = selectBukiet.options[selectBukiet.selectedIndex].text;

            // Tworzenie OBIEKTU 
            const nowyWpis = {
                nazwa: nazwaOpcji,
                cenaJedn: cena,
                ilosc: ilosc,
                wartosc: cena * ilosc
            };

            // Wypchnięcie do tablicy 
            tablicaKoszyka.push(nowyWpis);
            
            // Odrysowanie HTML
            odswiezTabele();

            // Czyszczenie selecta (UX)
            selectBukiet.value = "";
            inputIlosc.value = "1";
            przeliczKwoteNaZywo(); 
         });
    }

    function odswiezTabele() {
        tabelaBody.innerHTML = ""; 

        let sumaWszystkichOpcji = 0;

        tablicaKoszyka.forEach((element, indeks) => {
            sumaWszystkichOpcji += element.wartosc;

            const wiersz = document.createElement("tr");
            wiersz.innerHTML = `
                <td>${element.nazwa}</td>
                <td>${element.cenaJedn.toFixed(2)} PLN</td>
                <td>${element.ilosc}</td>
                <td>${element.wartosc.toFixed(2)} PLN</td>
                <td>
                    <button type="button" class="btn-usun-wiersz" data-id="${indeks}" style="background-color: var(--kolor-bledu, red); color: white; border: none; padding: 5px; border-radius: 4px; cursor: pointer;">Usuń</button>
                </td>
            `;
            tabelaBody.appendChild(wiersz);
        });

        // Nasłuchiwanie na przyciski USUŃ
        document.querySelectorAll(".btn-usun-wiersz").forEach(przycisk => {
            przycisk.addEventListener("click", (e) => {
                const idDoUsuniecia = e.target.getAttribute("data-id");
                tablicaKoszyka.splice(idDoUsuniecia, 1); 
                odswiezTabele(); 
            });
        });

         
        // Wypisanie samej sumy bukietów w tabeli 
        const tekstSumyTabeli = document.getElementById("_TEXT_SUMA_");
        if (tekstSumyTabeli) {
            tekstSumyTabeli.textContent = `${sumaWszystkichOpcji.toFixed(2)} PLN`;
        }
        przeliczKwoteNaZywo();
    }
}); 