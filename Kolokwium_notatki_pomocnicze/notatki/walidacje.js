/* ========================================================================= */
/* MODUŁ WALIDACJI DANYCH (Data Validation Library)                          */
/* Autor: Adam Lech 73264                                                    */
/* Opis: Zbiór funkcji weryfikujących poprawność danych wejściowych.         */
/* Przystosowane do integracji z HTML5 Constraint Validation API.            */
/* ========================================================================= */

// =========================================================================
// 1. DANE OSOBOWE I FORMATY KRAJOWE (Wyrażenia Regularne - Regex)
// =========================================================================

// Weryfikacja Imienia / Nazwiska (Tylko litery, w tym polskie znaki, bez spacji i cyfr)
function walidujTylkoLitery(tekst) {
    const regex = /^[a-zA-ZąćęłńóśźżĄĆĘŁŃÓŚŹŻ]+$/;
    return regex.test(tekst);
}

// Weryfikacja numeru PESEL (Dokładnie 11 cyfr)
function walidujPesel(pesel) {
    const regex = /^\d{11}$/;
    return regex.test(pesel);
}

// Weryfikacja numeru NIP (Dokładnie 10 cyfr, ignoruje wprowadzone myślniki)
function walidujNip(nip) {
    const czystyNip = nip.replace(/-/g, ""); 
    const regex = /^\d{10}$/;
    return regex.test(czystyNip);
}

// Weryfikacja numeru Dowodu Osobistego (3 litery i 6 cyfr, np. ABC123456)
function walidujDowodOsobisty(dowod) {
    const regex = /^[A-Za-z]{3}\d{6}$/;
    return regex.test(dowod);
}

// Weryfikacja Kodu Pocztowego w standardzie polskim (XX-XXX)
function walidujKodPocztowy(kod) {
    const regex = /^\d{2}-\d{3}$/;
    return regex.test(kod);
}

// Weryfikacja Numeru Konta Bankowego IBAN (Opcjonalny prefiks PL + 26 cyfr)
function walidujKontoBankowe(konto) {
    const regex = /^(PL)?\d{26}$/i; 
    const czysteKonto = konto.replace(/\s/g, ""); // Usunięcie białych znaków
    return regex.test(czysteKonto);
}

// Weryfikacja struktury adresu URL (np. link do portfolio)
function walidujAdresWWW(url) {
    const regex = /^(https?:\/\/)?([\w\d-]+\.)+\w{2,}(\/.*)?$/i;
    return regex.test(url);
}


// =========================================================================
// 2. BEZPIECZEŃSTWO I AUTORYZACJA
// =========================================================================

// Weryfikacja siły hasła (Min. 8 znaków, min. 1 wielka litera, 1 cyfra, 1 znak specjalny)
function walidujSileHasla(haslo) {
    const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(haslo);
}

// Weryfikacja zgodności haseł (np. w procesie rejestracji użytkownika)
function czyHaslaIdentyczne(haslo1, haslo2) {
    return haslo1 === haslo2 && haslo1 !== "";
}


// =========================================================================
// 3. WERYFIKACJA DANYCH CZASOWYCH (DATY I GODZINY)
// =========================================================================

// Weryfikacja pełnoletności (Zwraca true, jeśli użytkownik ma >= 18 lat)
function walidujPelnoletnosc(dataUrodzeniaZInputa) {
    if (!dataUrodzeniaZInputa) return false;
    
    const dataUr = new Date(dataUrodzeniaZInputa);
    const dzisiaj = new Date();
    
    let wiek = dzisiaj.getFullYear() - dataUr.getFullYear();
    const miesiac = dzisiaj.getMonth() - dataUr.getMonth();
    
    // Korekta, jeśli w bieżącym roku urodziny jeszcze nie wystąpiły
    if (miesiac < 0 || (miesiac === 0 && dzisiaj.getDate() < dataUr.getDate())) {
        wiek--;
    }
    return wiek >= 18;
}

// Weryfikacja, czy wskazana data nie odnosi się do przeszłości (np. system rezerwacji)
function walidujWizyteWPrzyszlosci(dataWizyty) {
    if (!dataWizyty) return false;
    
    const dataWybrana = new Date(dataWizyty);
    const dzisiaj = new Date();
    dzisiaj.setHours(0, 0, 0, 0); // Normalizacja czasu do północy
    
    return dataWybrana >= dzisiaj;
}

// Weryfikacja, czy data wypada w dni robocze (Poniedziałek - Piątek)
function walidujDzienRoboczy(dataWizyty) {
    const dataWybrana = new Date(dataWizyty);
    const dzienTygodnia = dataWybrana.getDay(); // 0 = Niedziela, 6 = Sobota
    
    return dzienTygodnia !== 0 && dzienTygodnia !== 6;
}

// Weryfikacja przedziału godzinowego (np. rezerwacja tylko w godzinach 08:00 - 16:00)
function walidujGodzinyPracy(czasWprowadzony, godzinaStart = "08:00", godzinaKoniec = "16:00") {
    if (!czasWprowadzony) return false;
    return czasWprowadzony >= godzinaStart && czasWprowadzony <= godzinaKoniec;
}


// =========================================================================
// 4. WERYFIKACJA ELEMENTÓW FORMULARZA (CHECKBOXY, RADIO, PLIKI)
// =========================================================================

// Weryfikacja obowiązkowego pola Checkbox (np. Akceptacja Regulaminu)
function walidujZgode(checkboxId) {
    const checkbox = document.getElementById(checkboxId);
    return checkbox && checkbox.checked; 
}

// Weryfikacja wyboru opcji z grupy Radio
function walidujRadioGroup(nazwaGrupyRadio) {
    const wybraneRadio = document.querySelector(`input[name="${nazwaGrupyRadio}"]:checked`);
    return wybraneRadio !== null;
}

// Weryfikacja wyboru opcji z listy rozwijanej Select
function walidujSelect(selectId) {
    const select = document.getElementById(selectId);
    return select && select.value !== ""; 
}

// Weryfikacja załączonego pliku (Rozmiar w MB oraz dopuszczalne rozszerzenia)
function walidujPlik(inputId, maxRozmiarMB, dozwoloneRozszerzenia = ['pdf', 'png', 'jpg']) {
    const input = document.getElementById(inputId);
    if (!input || !input.files || input.files.length === 0) return false; // Brak pliku

    const plik = input.files[0];
    const rozmiarMB = plik.size / (1024 * 1024);
    const rozszerzenie = plik.name.split('.').pop().toLowerCase();

    if (rozmiarMB > maxRozmiarMB) return false; // Plik za duży
    if (!dozwoloneRozszerzenia.includes(rozszerzenie)) return false; // Zły format

    return true;
}


// =========================================================================
// 5. OBSŁUGA BŁĘDÓW (HTML5 Constraint Validation API - Wymóg Lab 8)
// =========================================================================
/*
 * Implementacja metody setCustomValidity(). 
 * Integruje logikę walidacji JS z natywnym mechanizmem blokowania formularzy w przeglądarce.
 */

function ustawNatywnyBlad(inputId, wiadomoscBledna) {
    const input = document.getElementById(inputId);
    if (!input) return;

    if (wiadomoscBledna) {
        // Zgłoszenie błędu blokuje proces wysyłki (submit)
        input.setCustomValidity(wiadomoscBledna);
        
        // Wymuszenie natychmiastowego wyświetlenia systemowego komunikatu błędu
        input.reportValidity(); 
    } else {
        // Ciąg pusty resetuje status walidacji (pole zostaje uznane za poprawne)
        input.setCustomValidity(""); 
    }
}

/* 
 * PRZYKŁAD IMPLEMENTACJI W LOGICE GŁÓWNEJ (Event Listener):
 * 
 * const inputHaslo = document.getElementById("haslo");
 * 
 * inputHaslo.addEventListener("input", function() {
 *     if (!walidujSileHasla(this.value)) {
 *         this.setCustomValidity("Wymagane 8 znaków, w tym 1 wielka litera i 1 cyfra.");
 *     } else {
 *         this.setCustomValidity(""); 
 *     }
 * });
 */