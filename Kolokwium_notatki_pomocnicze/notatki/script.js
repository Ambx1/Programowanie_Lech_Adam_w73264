/* ========================================================================= */
/* Szablon Logiki Aplikacji (Boilerplate JS)                                 */
/* Autor: Adam Lech 73264                                                    */
/* Opis: Plik zaimplementowany modularnie (Walidacja, Kalkulacja, Koszyk).   */
/* Zmienne globalne i konfiguracja znajdują się na początku dokumentu.       */
/* ========================================================================= */

// Czekamy aż cała struktura DOM (HTML) zostanie zbudowana przez przeglądarkę
document.addEventListener("DOMContentLoaded", () => {

    /* ========================================================================= */
    /* ZMIENNE GLOBALNE I BAZY DANYCH (Słowniki)                                 */
    /* ========================================================================= */
    
    // Tablica przechowująca obiekty (Stan aplikacji / Koszyk)
    // Zadeklarowana tutaj, aby każda funkcja poniżej miała do niej swobodny dostęp.
    let tablicaKoszyka = [];
    
    // Flaga stanu walidacji (UX). Zapobiega atakowaniu użytkownika błędami, 
    // dopóki ten nie spróbuje wysłać formularza po raz pierwszy.
    let formularzZatwierdzonyRaz = false; 

    // --- Słowniki Danych (Dictionaries) - Wybierz jeden zależnie od zadania ---
    
    // BAZA 1: KWIACIARNIA / SKLEP
    const cenyKwiaciarnia = { "_OPCJA_1_": 50, "_OPCJA_2_": 40, "_OPCJA_3_": 60 };
    // BAZA 2: PIEKARNIA / CUKIERNIA
    const cenyPiekarnia = { "_OPCJA_1_": 5, "_OPCJA_2_": 12, "_OPCJA_3_": 85 };
    // BAZA 3: SALON SAMOCHODOWY / SERWIS
    const cenyAuto = { "_OPCJA_1_": 120000, "_OPCJA_2_": 145000, "_OPCJA_3_": 180000 };
    
    // Cennik usług dodatkowych (checkboxy)
    const cenyUslugDodatkowych = { "_KOSZT_D1_": 10, "_KOSZT_D2_": 15, "premium": 50 };

    // Ustaw aktywny cennik dla obecnego projektu
    const aktualnyCennik = cenyKwiaciarnia; 

    /* ========================================================================= */
    /* KROK 1: WALIDACJA I WYSYŁKA FORMULARZA (OCENA 3.0)                        */
    /* ========================================================================= */
    
    const formularz = document.getElementById("_ID_FORMULARZA_");

    if (formularz) {
        // Główny nasłuchiwacz zdarzenia 'submit' (wysłanie formularza)
        formularz.addEventListener("submit", (e) => {
            // e.preventDefault() blokuje domyślne przeładowanie strony. 
            // Dzięki temu skrypt może przeanalizować dane przed wysyłką.
            e.preventDefault(); 
            formularzZatwierdzonyRaz = true; 

            // Jeśli walidacja przejdzie pomyślnie...
            if (walidujWszystkoNa3_0()) {
                
                // [Logika na 5.0] Zabezpieczenie przed pustym koszykiem
                if (tablicaKoszyka.length === 0) {
                    alert("Zestawienie jest puste. Proszę dodać pozycję przed zatwierdzeniem.");
                    return; // Przerwanie działania funkcji
                }

                // [Logika na 4.0 / 5.0] Symulacja komunikacji z serwerem i sukcesu
                const przyciskWyslij = document.getElementById("_BTN_WYSLIJ_GLOWNY_");
                const sumaOstateczna = document.getElementById("_TEXT_SUMA_NA_ZYWO_").textContent;
                
                przyciskWyslij.textContent = "Przetwarzanie danych...";
                przyciskWyslij.disabled = true; // Zabezpieczenie przed wielokrotnym kliknięciem

                setTimeout(() => {
                    alert("Operacja zakończona sukcesem! Kwota operacji: " + sumaOstateczna);
                    
                    // Resetowanie stanu aplikacji (Clean Code)
                    formularz.reset();
                    tablicaKoszyka = [];
                    odswiezTabele();
                    formularzZatwierdzonyRaz = false;
                    
                    // Ukrycie ewentualnych sekcji dynamicznych
                    const ukrytaSekcja = document.getElementById("_UKRYTA_SEKCJA_");
                    if (ukrytaSekcja) ukrytaSekcja.style.display = "none";
                    
                    przyciskWyslij.textContent = "Zatwierdź i Wyślij";
                    przyciskWyslij.disabled = false;
                }, 1500); // Symulacja ładowania (1.5 sekundy)

            } else {
                alert("Wykryto błędy w formularzu. Proszę poprawić podświetlone pola.");
            }
        });

        // Nasłuchiwanie zmian na polach "na żywo" (Po pierwszym kliknięciu Submit)
        const wszystkieInputy = formularz.querySelectorAll("input, select, textarea");
        wszystkieInputy.forEach(input => {
            input.addEventListener("input", () => {
                if (formularzZatwierdzonyRaz) walidujWszystkoNa3_0();
            });
            input.addEventListener("change", () => {
                if (formularzZatwierdzonyRaz) walidujWszystkoNa3_0();
            });
        });
    }

    // GŁÓWNY MODUŁ WALIDACYJNY
    function walidujWszystkoNa3_0() {
        let jestPoprawnie = true;

        // 1. Walidacja Tekstu (Imię i Nazwisko)
        const imie = document.getElementById("_INPUT_IMIE_");
        if (imie && imie.value.trim().length < 2) {
            pokazBlad(imie, "_ERROR_IMIE_", "Wymagane minimum 2 znaki.");
            jestPoprawnie = false;
        } else if (imie) { ukryjBlad(imie, "_ERROR_IMIE_"); }

        const nazwisko = document.getElementById("_INPUT_NAZWISKO_");
        if (nazwisko && nazwisko.value.trim().length < 2) {
            pokazBlad(nazwisko, "_ERROR_NAZWISKO_", "Wymagane minimum 2 znaki.");
            jestPoprawnie = false;
        } else if (nazwisko) { ukryjBlad(nazwisko, "_ERROR_NAZWISKO_"); }

        // 2. Walidacja Adresu E-mail (Wyrażenie regularne - Regex)
        const email = document.getElementById("_INPUT_EMAIL_");
        const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (email && !regexEmail.test(email.value)) {
            pokazBlad(email, "_ERROR_EMAIL_", "Nieprawidłowy format adresu (wymagany znak @ oraz domena).");
            jestPoprawnie = false;
        } else if (email) { ukryjBlad(email, "_ERROR_EMAIL_"); }

        // 3. Walidacja Telefonu (Dokładnie 9 cyfr, bez myślników)
        const telefon = document.getElementById("_INPUT_TELEFON_");
        const regexTelefon = /^\d{9}$/;
        if (telefon && !regexTelefon.test(telefon.value)) {
            pokazBlad(telefon, "_ERROR_TELEFON_", "Wymagane dokładnie 9 cyfr (np. 123456789).");
            jestPoprawnie = false;
        } else if (telefon) { ukryjBlad(telefon, "_ERROR_TELEFON_"); }

        // 4. Walidacja Hasła (Min. 8 znaków, 1 wielka litera, 1 cyfra) - Opcjonalnie do użycia
        const haslo = document.getElementById("_INPUT_HASLO_");
        if (haslo) {
            const regexHaslo = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
            if (!regexHaslo.test(haslo.value)) {
                pokazBlad(haslo, "_ERROR_HASLO_", "Hasło musi mieć 8 znaków, wielką literę i cyfrę.");
                jestPoprawnie = false;
            } else { ukryjBlad(haslo, "_ERROR_HASLO_"); }
        }

        // 5. Walidacja Daty (Nie może być w przeszłości) - Opcjonalnie do użycia
        const dataInput = document.getElementById("_INPUT_DATA_");
        if (dataInput) {
            if (dataInput.value === "") {
                pokazBlad(dataInput, "_ERROR_DATA_", "Data jest wymagana.");
                jestPoprawnie = false;
            } else {
                const wybranaData = new Date(dataInput.value);
                const dzisiaj = new Date();
                dzisiaj.setHours(0, 0, 0, 0); // Zerujemy godziny do porównania samego dnia
                if (wybranaData < dzisiaj) {
                    pokazBlad(dataInput, "_ERROR_DATA_", "Data nie może być z przeszłości!");
                    jestPoprawnie = false;
                } else { ukryjBlad(dataInput, "_ERROR_DATA_"); }
            }
        }

        // 6. Walidacja Pola Select (Czy wybrano cokolwiek)
        const select = document.getElementById("_SELECT_GLOWNY_");
        if (select && select.value === "") {
            pokazBlad(select, "_ERROR_SELECT_", "Zaznaczenie tej opcji jest obligatoryjne.");
            jestPoprawnie = false;
        } else if (select) { ukryjBlad(select, "_ERROR_SELECT_"); }

        // 7. Walidacja Pola Dynamicznego (Tylko, jeśli aktywator jest zaznaczony)
        const aktywator = document.getElementById("_CHECKBOX_AKTYWATOR_");
        const poleUkryte = document.getElementById("_INPUT_UKRYTY_1_");
        if (aktywator && aktywator.checked && poleUkryte) {
            if (poleUkryte.value.trim() === "") {
                pokazBlad(poleUkryte, "_ERROR_UKRYTY_1_", "Pole wymagane po zaznaczeniu opcji dodatkowej.");
                jestPoprawnie = false;
            } else { ukryjBlad(poleUkryte, "_ERROR_UKRYTY_1_"); }
        } else if (poleUkryte) {
            ukryjBlad(poleUkryte, "_ERROR_UKRYTY_1_");
        }

        return jestPoprawnie;
    }

    // --- Narzędzia do zgłaszania błędów (Manipulacja HTML5 API) ---
    function pokazBlad(input, idDivBledu, komunikat) {
        input.classList.add("invalid"); 
        input.setCustomValidity(komunikat); // HTML5 Walidacja - blokuje wysłanie na poziomie przeglądarki
        const div = document.getElementById(idDivBledu);
        if (div) {
            div.textContent = komunikat;
            div.style.display = "block";
        }
    }

    function ukryjBlad(input, idDivBledu) {
        input.classList.remove("invalid");
        input.setCustomValidity(""); // Oczyszczenie blokady
        const div = document.getElementById(idDivBledu);
        if (div) {
            div.textContent = "";
            div.style.display = "none";
        }
    }


    /* ========================================================================= */
    /* KROK 2: DYNAMICZNE UKRYWANIE PÓL I KALKULATOR "NA ŻYWO" (OCENA 4.0)       */
    /* ========================================================================= */

    // --- Obsługa ukrywanej sekcji (Maszyna Stanów) ---
    const checkboxAktywator = document.getElementById("_CHECKBOX_AKTYWATOR_");
    const ukrytaSekcja = document.getElementById("_UKRYTA_SEKCJA_");
    const poleUkryte = document.getElementById("_INPUT_UKRYTY_1_");

    if (checkboxAktywator && ukrytaSekcja) {
        checkboxAktywator.addEventListener("change", (e) => {
            if (e.target.checked) {
                ukrytaSekcja.style.display = "block";
                poleUkryte.required = true;
            } else {
                ukrytaSekcja.style.display = "none";
                poleUkryte.required = false;
                poleUkryte.value = ""; // Oczyszczenie pola po ukryciu
                ukryjBlad(poleUkryte, "_ERROR_UKRYTY_1_");
            }
        });
    }

    // --- Kalkulator w czasie rzeczywistym ---
    const selectGłówny = document.getElementById("_SELECT_GLOWNY_");
    const inputIlosc = document.getElementById("_INPUT_ILOSC_");
    // Pobranie wszystkich checkboxów z określoną klasą (Zwraca NodeList)
    const checkboxyUslugDodatkowych = document.querySelectorAll("._KLASA_CHECKBOXY_DODATKOW_"); 
    const tekstSumyFormularz = document.getElementById("_TEXT_SUMA_NA_ZYWO_");
    const tekstSumyTabela = document.getElementById("_TEXT_SUMA_TABELI_");

    // Rejestracja zdarzeń aktualizujących kalkulację
    if (selectGłówny && inputIlosc) {
        selectGłówny.addEventListener("change", przeliczKwoteNaZywo);
        inputIlosc.addEventListener("input", przeliczKwoteNaZywo);
        
        // Iteracja przez strukturę checkboxów
        checkboxyUslugDodatkowych.forEach(chk => {
            chk.addEventListener("change", przeliczKwoteNaZywo);
        });
    }

    function przeliczKwoteNaZywo() {
        // Zabezpieczenie przed NaN (Not-a-Number) w polu inputIlosc
        const ilosc = parseInt(inputIlosc.value) || 1;
        const idProduktu = selectGłówny.value;

        // 1. Wartość z aktualnego wyboru w formularzu
        let wartoscAktualnegoWpisu = 0;
        if (idProduktu !== "" && aktualnyCennik[idProduktu]) {
            wartoscAktualnegoWpisu = aktualnyCennik[idProduktu] * ilosc;
        }

        // 2. Wartość z usług dodatkowych (Checkboxy)
        let wartoscDodatkow = 0;
        checkboxyUslugDodatkowych.forEach(chk => {
            if (chk.checked && cenyUslugDodatkowych[chk.value]) {
                wartoscDodatkow += cenyUslugDodatkowych[chk.value]; 
            }
        });

        // 3. Wartość elementów wewnątrz Koszyka
        let wartoscZKoszyka = 0;
        tablicaKoszyka.forEach(element => {
            wartoscZKoszyka += element.wartosc;
        });

        // Agregacja wyników
        const sumaCalkowita = wartoscAktualnegoWpisu + wartoscDodatkow + wartoscZKoszyka;
        
        // Aktualizacja interfejsu użytkownika
        if (tekstSumyFormularz) tekstSumyFormularz.textContent = `${sumaCalkowita.toFixed(2)} PLN`;
        if (tekstSumyTabela) tekstSumyTabela.textContent = `${sumaCalkowita.toFixed(2)} PLN`;
    }


    /* ========================================================================= */
    /* KROK 3: STRUKTURY DANYCH, TABELE I MANIPULACJA KOSZYKIEM (OCENA 5.0)      */
    /* ========================================================================= */

    const btnDodajDoListy = document.getElementById("_BTN_DODAJ_DO_KOSZYKA_");
    const tabelaBody = document.getElementById("_TABELA_BODY_");

    if (btnDodajDoListy && tabelaBody) {
        btnDodajDoListy.addEventListener("click", () => {
            
            // Weryfikacja logiczna: Czy użytkownik dokonał wyboru?
            if (!selectGłówny.value) {
                alert("Należy wybrać wariant produktu przed dodaniem do zestawienia.");
                return;
            }

            const ilosc = parseInt(inputIlosc.value);
            if (isNaN(ilosc) || ilosc < 1) {
                alert("Podana ilość jest nieprawidłowa.");
                return;
            }

            const idOpcji = selectGłówny.value;
            const cena = aktualnyCennik[idOpcji];
            // Ekstrakcja etykiety tekstowej z wybranego węzła <option>
            const nazwaOpcji = selectGłówny.options[selectGłówny.selectedIndex].text;

            // Inicjalizacja Obiektu JS (Wymóg z Lab 7)
            const strukturaWpisu = {
                nazwa: nazwaOpcji,
                cenaJedn: cena,
                ilosc: ilosc,
                wartosc: cena * ilosc
            };

            // Wprowadzenie obiektu do Tablicy globalnej (Wymóg z Lab 6)
            tablicaKoszyka.push(strukturaWpisu);
            
            // Przebudowa struktury HTML wewnątrz tabeli
            odswiezTabele();

            // Resetowanie wyboru w formularzu po prawidłowym przeniesieniu
            selectGłówny.value = "";
            inputIlosc.value = "1";
            
            // Rekalkulacja (usunięcie kwoty produktu bazowego, ale pozostawienie usług i koszyka)
            przeliczKwoteNaZywo();
        });
    }

    function odswiezTabele() {
        // Zabezpieczenie przed dublowaniem zawartości
        tabelaBody.innerHTML = ""; 

        // Metoda .forEach iteruje przez strukturę tablicową
        tablicaKoszyka.forEach((obiektDanych, indeks) => {
            
            // Generowanie węzła <tr> w przestrzeni pamięci
            const wiersz = document.createElement("tr");
            
            // Uzupełnienie <td> na podstawie właściwości przechowywanego obiektu
            wiersz.innerHTML = `
                <td>${obiektDanych.nazwa}</td>
                <td>${obiektDanych.cenaJedn.toFixed(2)} PLN</td>
                <td>${obiektDanych.ilosc}</td>
                <td>${obiektDanych.wartosc.toFixed(2)} PLN</td>
                <td>
                    <button type="button" class="btn-usun-wiersz" data-id="${indeks}" 
                            style="background-color: var(--kolor-bledu, red); color: white; border: none; padding: 5px 10px; border-radius: 4px; cursor: pointer; font-weight: bold;">
                        Usuń
                    </button>
                </td>
            `;
            // Implementacja węzła w widoku DOM
            tabelaBody.appendChild(wiersz);
        });

        // Bindowanie akcji usuwania do nowo utworzonych przycisków wewnątrz tabeli
        document.querySelectorAll(".btn-usun-wiersz").forEach(przycisk => {
            przycisk.addEventListener("click", (e) => {
                // Wyodrębnienie indeksu przechowywanego w atrybucie data-id
                const idUsuwanegoElementu = e.target.getAttribute("data-id");
                
                // Metoda .splice modyfikuje zawartość tablicy, usuwając 1 element
                tablicaKoszyka.splice(idUsuwanegoElementu, 1); 
                
                // Rekurencja - przebudowa tabeli ze zaktualizowanym stanem danych
                odswiezTabele(); 
                przeliczKwoteNaZywo();
            });
        });
    }

}); // Koniec DOMContentLoaded