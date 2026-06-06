
// Menu zadań
let wybor = prompt("Które zadanie chcesz uruchomić? (wpisz numer od 1 do 20)");

switch (wybor) {
    case "1": wykonajZadanie1(); break;
    case "2": wykonajZadanie2(); break;
    case "3": wykonajZadanie3(); break;
    case "4": wykonajZadanie4(); break;
    case "5": wykonajZadanie5(); break; 
    case "6": wykonajZadanie6(); break; 
    case "7": wykonajZadanie7(); break;
    case "8": wykonajZadanie8(); break;
    case "9": wykonajZadanie9(); break;
    case "10": wykonajZadanie10(); break;
    case "11": wykonajZadanie11(); break;
    case "12": wykonajZadanie12(); break;
    case "13": wykonajZadanie13(); break;
    case "14": wykonajZadanie14(); break;
    case "15": wykonajZadanie15(); break;
    case "16": wykonajZadanie16(); break;
    case "17": wykonajZadanie17(); break;
    case "18": wykonajZadanie18(); break;
    case "19": wykonajZadanie19(); break;
    case "20": wykonajZadanie20(); break;
    default: console.log("Niepoprawny wybór. Wpisz liczbę od 1 do 20.");
}

// Zadanie 1
function wykonajZadanie1() {
let liczyby = [];
for (let i = 0; i < 10; i++) {
    let liczba = parseInt(prompt("Podaj liczbę:"));
    liczyby.push(liczba);
}
console.log("Wprowadzone liczby:", liczyby);
let szukanaLiczba = parseInt(prompt("Podaj liczbę całkowitą:")); 
let licznik = 0;
for (let i = 0; i < liczyby.length; i++) {
    if (liczyby[i] === szukanaLiczba) {
        licznik++;
    }
}
console.log("Liczba wystąpień:", licznik);
}

// Zadanie 2
function wykonajZadanie2() {
    let tablica = [1, 2, 3, 4, 5, 6];
    let nowaLiczba = parseInt(prompt("Podaj liczbę całkowitą:"));
    let indeks = parseInt(prompt("Podaj indeks:"));
    if (indeks >= 0 && indeks < tablica.length) {
        tablica.splice(indeks, 0, nowaLiczba);
        console.log("Zaktualizowana tablica:", tablica);
    }else {
        console.log("Nieprawidłowy indeks.");
    } 
}

// Zadanie 3
function wykonajZadanie3() {
    let tekst = prompt("Podaj tekst do odwrócenia:");
    let odwroconyTekst = tekst.split("").reverse().join("");
    console.log("Odwrócony tekst:", odwroconyTekst);
}   
 
// Zadanie 4
function wykonajZadanie4() {
    let tablica = [];
    for (let i = 0; i < 10; i++) {
        let liczba = Math.floor(Math.random() * 100) + 1;
        tablica.push(liczba);
    }
document.getElementById("kontener-na-wynik").textContent = "Liczby: " + tablica.join(", "); 
}
 
// Zadanie 5
function wykonajZadanie5() {
    let tablica = [12, 5, 20, 8, 15, 3];
    //a)
    let suma = tablica.reduce((a, b) => a + b, 0);
    console.log("Suma elementów tablicy:", suma);
    //b)
    let parzyste = tablica.filter(x => x % 2 === 0);
    console.log("Liczby parzyste:", parzyste);  
    //c)
    let razy3 = tablica.map(t => t * 3);
    console.log("Liczby pomnożone przez 3:", razy3);
    //d)
    let dodajNumerAlbumu = tablica.push(73264);
    let indeksAlbumu = tablica.indexOf(73264);
    console.log("Zaktualizowana tablica:", tablica);
    console.log("Indeks dodanego numeru albumu:", indeksAlbumu);
    //e)
    let srednia = suma / tablica.length;
    console.log("Średnia arytmetyczna:", srednia);
    //f)
    let max = Math.max(...tablica);
    console.log("Największa liczba:", max);
    //g)
    let wybranaWartosc = 15;
    let ile = tablica.filter(x => x === wybranaWartosc).length;
    console.log("Liczba elementów równych", wybranaWartosc + ":", ile);
}

// Zadanie 6 - Suma dwóch największych liczb z tablicy
function wykonajZadanie6() {
    let tablica = [12, 5, 20, 8, 15, 3];
    console.log("Oryginalna tablica:", tablica);
    let posortowana = [...tablica].sort((a, b) => b - a);
    let suma = posortowana[0] + posortowana[1];
    
    console.log("Dwie największe liczby:", posortowana[0], "oraz", posortowana[1]);
    console.log("Ich suma wynosi:", suma);
}
 
// Zadanie 7 - Usuwanie duplikatów z tablicy
function wykonajZadanie7() {
    let tablica = [1, 2, 2, 3, 4, 4, 4, 5, 1];
    console.log("Tablica z duplikatami:", tablica);
    let unikalneSet = new Set(tablica);
    let tablicaBezDuplikatow = [...unikalneSet];
    console.log("Tablica po usunięciu duplikatów:", tablicaBezDuplikatow);
}

// Zadanie 8 - Unikalne książki i ich liczba
function wykonajZadanie8() {
    let wydaneKsiazki = ["Wiedźmin", "Harry Potter", "Wiedźmin", "Hobbit", "Harry Potter", "Lalka"];
    console.log("Wszystkie wydane egzemplarze:", wydaneKsiazki);
    let unikalneTytuly = new Set(wydaneKsiazki);
    
    console.log("Unikalne tytuły książek:");
    unikalneTytuly.forEach(tytul => console.log("- " + tytul));
    console.log("Liczba unikalnych książek:", unikalneTytuly.size);
}

// Zadanie 9 - Unikalne znaki w łańcuchu znaków
function wykonajZadanie9() {
    let tekst = prompt("Podaj łańcuch znaków:");
    console.log("Tekst wejściowy:", tekst);
    let tablicaZnakow = tekst.split("");
   let unikalneSet = new Set(tablicaZnakow); 
    console.log("Unikalne znaki:", [...unikalneSet].join(", "));
    console.log("Liczba unikalnych znaków:", unikalneSet.size);
}

// Zadanie 10 - Zliczanie wystąpień słów za pomocą Mapy
function wykonajZadanie10() {
    let slowa = ["kot", "pies", "kot", "ptak", "pies", "kot"];
    console.log("Tablica słów:", slowa);
    let mapaWystapien = new Map();
    for (let slowo of slowa) {
        if (mapaWystapien.has(slowo)) {
            mapaWystapien.set(slowo, mapaWystapien.get(slowo) + 1);
        } else {
            mapaWystapien.set(slowo, 1);
        }
    }
    
    console.log("Wystąpienia słów:");
    for (let [slowo, ilosc] of mapaWystapien) {
        console.log(`${slowo}: ${ilosc} razy`);
    }
}

// Zadanie 11 - Książka adresowa (Mapa)
function wykonajZadanie11() {
    let ksiazkaAdresowa = new Map();
    ksiazkaAdresowa.set("Anna", "123-456-789");
    ksiazkaAdresowa.set("Jan", "987-654-321");
    ksiazkaAdresowa.set("Maria", "555-666-777");
    console.log("Książka adresowa:");
    for (let [imie, telefon] of ksiazkaAdresowa) {
        console.log(`Imię: ${imie} | Telefon: ${telefon}`);
    }
}

// Zadanie 12 - Symulacja obsługi klientów w kolejce (FIFO)
function wykonajZadanie12() {
    let kolejka = [];
    kolejka.push("Klient A");
    console.log("Do kolejki dołączył: Klient A");
    kolejka.push("Klient B");
    console.log("Do kolejki dołączył: Klient B");
    kolejka.push("Klient C");
    console.log("Do kolejki dołączył: Klient C");
    console.log("Aktualna kolejka:", kolejka);
   while (kolejka.length > 0) {
         let obsluzony = kolejka.shift();
        console.log(`Obsłużono: ${obsluzony}`);
        console.log("Pozostali w kolejce:", kolejka);
    }
}

// Zadanie 13 - Zbalansowanie nawiasów przy użyciu stosu
function wykonajZadanie13() {
    let nawiasy = prompt("Podaj ciąg nawiasów (np. (()) lub (())):");
    let stos = [];
    let jestZbalansowany = true;
    for (let i = 0; i < nawiasy.length; i++) {
        let znak = nawiasy[i];
        if (znak === '(') {
            stos.push(znak);
        } else if (znak === ')') {
            if (stos.length === 0) {
                jestZbalansowany = false;
                break;
            }
            stos.pop(); 
        }
    }
    if (stos.length > 0) {
        jestZbalansowany = false;
    }
    if (jestZbalansowany) {
        console.log(`Ciąg "${nawiasy}" jest POPRAWNIE zbalansowany.`);
    } else {
        console.log(`Ciąg "${nawiasy}" NIE JEST poprawnie zbalansowany.`);
    }
}

// Zadanie 14 (Dodatkowe) - Liczba pierwsza
function wykonajZadanie14() {
    let liczba = parseInt(prompt("Podaj liczbę do sprawdzenia:"), 10);
    let jestPierwsza = true;
    
    if (liczba <= 1) {
        jestPierwsza = false;
    } else {
        for (let i = 2; i <= Math.sqrt(liczba); i++) {
            if (liczba % i === 0) {
                jestPierwsza = false;
                break;
            }
        }
    }
    
    if (jestPierwsza) {
        console.log(`Liczba ${liczba} JEST liczbą pierwszą.`);
    } else {
        console.log(`Liczba ${liczba} NIE JEST liczbą pierwszą.`);
    }
}

// Zadanie 15 (Dodatkowe) - Odwracanie kolejności słów w zdaniu
function wykonajZadanie15() {
    let zdanie = prompt("Podaj zdanie:");
    let odwroconeZdanie = zdanie.split(" ").reverse().join(" ");
    console.log("Oryginał:", zdanie);
    console.log("Po odwróceniu słów:", odwroconeZdanie);
}

// Zadanie 16 (Dodatkowe) - Odwracanie tekstu przy użyciu stosu
function wykonajZadanie16() {
    let tekst = prompt("Podaj tekst:");
    let stos = [];
   for (let i = 0; i < tekst.length; i++) {
        stos.push(tekst[i]);
    }
    
    let odwroconyTekst = "";
    while (stos.length > 0) {
        odwroconyTekst += stos.pop();
    }
    
    console.log("Oryginał:", tekst);
    console.log("Odwrócony przy użyciu stosu:", odwroconyTekst);
}

// Zadanie 17 (Dodatkowe) - Palindrom przy użyciu stosu
function wykonajZadanie17() {
    let tekst = prompt("Podaj słowo do sprawdzenia:").toLowerCase();
    let stos = [];
   for (let i = 0; i < tekst.length; i++) {
        stos.push(tekst[i]);
    }
    
    let odwroconeSlowo = "";
   while (stos.length > 0) {
        odwroconeSlowo += stos.pop();
    }
    
    if (tekst === odwroconeSlowo) {
        console.log(`Słowo "${tekst}" JEST palindromem.`);
    } else {
        console.log(`Słowo "${tekst}" NIE JEST palindromem.`);
    }
}

// Zadanie 18 (Dodatkowe) - Tabliczka mnożenia w części HTML
function wykonajZadanie18() {
    let htmlTabeli = "<table border='1' style='border-collapse: collapse; text-align: center; width: 100%; max-width: 400px; margin-top: 20px;'>";
    
    for (let i = 1; i <= 10; i++) {
        htmlTabeli += "<tr>";
        for (let j = 1; j <= 10; j++) {
            htmlTabeli += `<td style='padding: 8px;'>${i * j}</td>`;
        }
        htmlTabeli += "</tr>";
    }
    htmlTabeli += "</table>";
    let kontener = document.getElementById("kontener-na-wynik");
    if (kontener) {
        kontener.innerHTML = htmlTabeli;
    } else {
        let nowyKontener = document.createElement("div");
        nowyKontener.id = "kontener-na-wynik";
        nowyKontener.innerHTML = htmlTabeli;
        document.body.appendChild(nowyKontener);
    }
    console.log("Tabliczka mnożenia została wygenerowana na stronie HTML!");
}

// Zadanie 19 (Dodatkowe) - Symulator cofania zmian w edytorze tekstu
function wykonajZadanie19() {
    let tekst = prompt("Podaj ciąg wejściowy (np. Hello!):");
    let cofniecie = prompt("Podaj znak/ciąg do cofnięcia (np. !):");
    
    let stos = [];
     for (let i = 0; i < tekst.length; i++) {
        stos.push(tekst[i]);
    }
    
    for (let i = cofniecie.length - 1; i >= 0; i--) {
        if (stos[stos.length - 1] === cofniecie[i]) {
            stos.pop(); 
        }
    }
    
    let wynik = stos.join("");
    console.log("Wejście:", tekst);
    console.log("Cofnięcie:", cofniecie);
    console.log("Wyjście (po cofnięciu):", wynik);
}

// Zadanie 20 (Dodatkowe) - Grupowanie anagramów przy użyciu Mapy
function wykonajZadanie20() {
    let slowa = ["eat", "tea", "tan", "ate", "nat", "bat"];
    console.log("Słowa wejściowe:", slowa);
    
    let mapaAnagramow = new Map();
    
    for (let slowo of slowa) {
        let klucz = slowo.split("").sort().join("");
        
        if (mapaAnagramow.has(klucz)) {
            mapaAnagramow.get(klucz).push(slowo);
        } else {
            mapaAnagramow.set(klucz, [slowo]);
        }
    }
    let wynik = Array.from(mapaAnagramow.values());
    console.log("Pogrupowane anagramy:", wynik);
}
    