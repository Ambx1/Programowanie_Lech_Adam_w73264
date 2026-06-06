// Menu zadań - Lab 7
let wybor = prompt("Które zadanie z Lab 7 chcesz uruchomić? (wpisz numer od 1 do 15)");

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
    default: console.log("Niepoprawny wybór. Wpisz liczbę od 1 do 15.");
}

// Zadanie 1 - tworzenie obiektu książki i wyświetlanie informacji
function wykonajZadanie1() {
    let ksiazka = {
        tytul: "Wiedźmin: Ostatnie życzenie",
        autor: "Andrzej Sapkowski",
        rokWydania: 1993
    };

    function sformatujInformacje(obj) {
        return `"${obj.tytul}" - ${obj.autor} (${obj.rokWydania})`;
    }

    let wynik = sformatujInformacje(ksiazka);
    console.log("Informacje o książce:", wynik);
}

// Zadanie 2 - tworzenie obiektu studenta i obliczanie średniej ocen
function wykonajZadanie2() {
    let student = {
        imie: "Adam",
        nazwisko: "Lech",
        numerAlbumu: 73264,
        oceny: [4.5, 5.0, 3.5],
        wyswietlSrednia: function() {
            let suma = this.oceny.reduce((acc, b) => acc + b, 0);
            let srednia = suma / this.oceny.length;
            console.log(`Student: ${this.imie} ${this.nazwisko} (album: ${this.numerAlbumu})`);
            console.log(`Średnia ocen wynosi: ${srednia.toFixed(2)}`);
        }
    };

    student.wyswietlSrednia();
}
// Zadanie 3 - klasa Trójkąt, obliczanie pola i porównywanie
function wykonajZadanie3() {
    class Trojkat {
        constructor(wysokosc, dlugoscPodstawy, nazwa) {
            this.wysokosc = wysokosc;
            this.dlugoscPodstawy = dlugoscPodstawy;
            this.nazwa = nazwa;
        }

        obliczPole() {
            return (this.dlugoscPodstawy * this.wysokosc) / 2;
        }

        porownaj(innyTrojkat) {
            if (this.obliczPole() > innyTrojkat.obliczPole()) {
                return this;
            } else {
                return innyTrojkat;
            }
        }
    }

    let t1 = new Trojkat(10, 5, "Trójkąt A");
    let t2 = new Trojkat(8, 8, "Trójkąt B");
    let t3 = new Trojkat(12, 4, "Trójkąt C");

    console.log(`Pole ${t1.nazwa}:`, t1.obliczPole());
    console.log(`Pole ${t2.nazwa}:`, t2.obliczPole());
    console.log(`Pole ${t3.nazwa}:`, t3.obliczPole());

    let wiekszy = t1.porownaj(t2);
    console.log(`Większy trójkąt to: ${wiekszy.nazwa} o polu ${wiekszy.obliczPole()}`);
}

// Zadanie 4 - klasa Trapez i porównywanie z Trójkątem
function wykonajZadanie4() {
    class Trojkat {
        constructor(wysokosc, dlugoscPodstawy, nazwa) {
            this.wysokosc = wysokosc;
            this.dlugoscPodstawy = dlugoscPodstawy;
            this.nazwa = nazwa;
        }

        obliczPole() {
            return (this.dlugoscPodstawy * this.wysokosc) / 2;
        }
    }

    class Trapez {
        constructor(wysokosc, podstawa1, podstawa2, nazwa) {
            this.wysokosc = wysokosc;
            this.podstawa1 = podstawa1;
            this.podstawa2 = podstawa2;
            this.nazwa = nazwa;
        }

        obliczPole() {
            return ((this.podstawa1 + this.podstawa2) * this.wysokosc) / 2;
        }

        zmienNazwe(nowaNazwa) {
            this.nazwa = nowaNazwa;
        }
    }

    let tr1 = new Trapez(5, 4, 6, "Trapez A");
    let tr2 = new Trapez(8, 2, 8, "Trapez B");
    let tr3 = new Trapez(10, 5, 5, "Trapez C");

    console.log(`Przed zmianą: ${tr1.nazwa}`);
    tr1.zmienNazwe("Super Trapez A");
    console.log(`Po zmianie: ${tr1.nazwa}`);

    function porownajFigury(trojkat, trapez) {
        let poleTrojkata = trojkat.obliczPole();
        let poleTrapezu = trapez.obliczPole();

        if (poleTrojkata > poleTrapezu) {
            console.log(`Większa figura to ${trojkat.nazwa} (pole: ${poleTrojkata})`);
        } else if (poleTrapezu > poleTrojkata) {
            console.log(`Większa figura to ${trapez.nazwa} (pole: ${poleTrapezu})`);
        } else {
            console.log("Obie figury mają równe pole.");
        }
    }

    let mojTrojkat = new Trojkat(10, 6, "Trójkąt Testowy");
    porownajFigury(mojTrojkat, tr2);
}
// Zadanie 5 - konwersja obiektu do JSON z pominięciem undefined
function wykonajZadanie5() {
    let przykladowyObiekt = {
        imie: "Jan",
        nazwisko: "Kowalski",
        wiek: 30,
        adres: undefined,
        telefon: 123456789
    };

    function konwertujDoJSON(obj) {
        return JSON.stringify(obj, (klucz, wartosc) => wartosc === undefined ? undefined : wartosc);
    }

    console.log(konwertujDoJSON(przykladowyObiekt));
}

// Zadanie 6 - generowanie losowych danych osobowych
function wykonajZadanie6() {
    let imiona = ["Adam", "Ewa", "Jan", "Anna", "Piotr", "Kasia"];
    let nazwiska = ["Kowalski", "Nowak", "Wiśniewski", "Wójcik", "Kowalczyk"];
    let uzytkownicy = [];

    for (let i = 0; i < 20; i++) {
        let losoweImie = imiona[Math.floor(Math.random() * imiona.length)];
        let losoweNazwisko = nazwiska[Math.floor(Math.random() * nazwiska.length)];
        let losowyWiek = Math.floor(Math.random() * (50 - 5 + 1)) + 5;
        let losowyTelefon = Math.floor(Math.random() * (8000000 - 5000000 + 1)) + 5000000;

        uzytkownicy.push({ name: losoweImie, surname: losoweNazwisko, age: losowyWiek, phone: losowyTelefon });
    }
    
    // ZAPIS DO LOCAL STORAGE (dane przetrwają odświeżenie strony!)
    localStorage.setItem("zapisanaBaza", JSON.stringify(uzytkownicy));
    console.log("Wygenerowani użytkownicy (zapisano w LocalStorage):", uzytkownicy);
}

// Zadanie 7 - generowanie danych do HTML
function wykonajZadanie7() {
    let ilosc = parseInt(prompt("Podaj ilość rekordów do wygenerowania:"));
    if (isNaN(ilosc) || ilosc <= 0) return;

    let imiona = ["Adam", "Ewa", "Jan", "Anna", "Piotr", "Kasia"];
    let nazwiska = ["Kowalski", "Nowak", "Wiśniewski", "Wójcik", "Kowalczyk"];
    let uzytkownicy = [];

    for (let i = 0; i < ilosc; i++) {
        let losoweImie = imiona[Math.floor(Math.random() * imiona.length)];
        let losoweNazwisko = nazwiska[Math.floor(Math.random() * nazwiska.length)];
        let losowyWiek = Math.floor(Math.random() * (50 - 5 + 1)) + 5;
        let losowyTelefon = Math.floor(Math.random() * (8000000 - 5000000 + 1)) + 5000000;

        uzytkownicy.push({ name: losoweImie, surname: losoweNazwisko, age: losowyWiek, phone: losowyTelefon });
    }

    // ZAPIS DO LOCAL STORAGE
    localStorage.setItem("zapisanaBaza", JSON.stringify(uzytkownicy));

    let div = document.getElementById("kontener-na-wynik");
    if (!div) {
        div = document.createElement("div");
        div.id = "kontener-na-wynik";
        document.body.appendChild(div);
    }
    div.innerHTML = "<h3>Wygenerowani użytkownicy:</h3>" + uzytkownicy.map(u => `<p>${u.name} ${u.surname}, wiek: ${u.age}, tel: ${u.phone}</p>`).join("");
}

// Zadanie 8 - filtrowanie pełnoletnich
function wykonajZadanie8() {
    // ODCZYT Z LOCAL STORAGE
    let daneZPamieci = localStorage.getItem("zapisanaBaza");
    
    if (!daneZPamieci) {
        console.log("Najpierw uruchom zadanie 6 lub 7, aby wygenerować dane!");
        return;
    }
    
    // Zamiana JSON z powrotem na tablicę obiektów
    let bazaUzytkownikow = JSON.parse(daneZPamieci);

    function filtrujPelnoletnich(tablica) {
        return tablica.filter(u => u.age >= 18);
    }
    console.log("Pełnoletni użytkownicy:", filtrujPelnoletnich(bazaUzytkownikow));
}

// Zadanie 9 - tablica samych imion
function wykonajZadanie9() {
    // ODCZYT Z LOCAL STORAGE
    let daneZPamieci = localStorage.getItem("zapisanaBaza");
    
    if (!daneZPamieci) {
        console.log("Najpierw uruchom zadanie 6 lub 7, aby wygenerować dane!");
        return;
    }

    // Zamiana JSON z powrotem na tablicę obiektów
    let bazaUzytkownikow = JSON.parse(daneZPamieci);

    function pobierzImiona(tablica) {
        return tablica.map(u => u.name);
    }
    console.log("Same imiona:", pobierzImiona(bazaUzytkownikow));
}
// Zadanie 10 - obiekt prostokąt i interakcja HTML
function wykonajZadanie10() {
    let div = document.getElementById("kontener-na-wynik");
    if (!div) {
        div = document.createElement("div");
        div.id = "kontener-na-wynik";
        document.body.appendChild(div);
    }
    
    div.innerHTML = `
        <h3>Zadanie 10: Prostokąt</h3>
        <input type="number" id="bokA" placeholder="Długość boku A">
        <input type="number" id="bokB" placeholder="Długość boku B">
        <button id="btnProstokat">Utwórz prostokąt</button>
        <div id="wynikProstokata"></div>
    `;

    document.getElementById("btnProstokat").addEventListener("click", () => {
        let a = parseFloat(document.getElementById("bokA").value);
        let b = parseFloat(document.getElementById("bokB").value);
        
        let prostokat = {
            bokA: a,
            bokB: b,
            pole: function() { return this.bokA * this.bokB; },
            obwod: function() { return 2 * this.bokA + 2 * this.bokB; },
            czyKwadrat: function() { return this.bokA === this.bokB; }
        };

        document.getElementById("wynikProstokata").innerHTML = `
            <p>Pole: ${prostokat.pole()}</p>
            <p>Obwód: ${prostokat.obwod()}</p>
            <p>Czy kwadrat: ${prostokat.czyKwadrat() ? "Tak" : "Nie"}</p>
        `;
    });
}

// Zadanie 11 - obiekt samochód z metodami
function wykonajZadanie11() {
    let samochod = {
        marka: "Toyota",
        model: "Corolla",
        rokProdukcji: 2022,
        kolor: "biały",
        predkoscMaksymalna: 180,
        zwiekszPredkosc: function(wartosc) { this.predkoscMaksymalna += wartosc; },
        zmniejszPredkosc: function(wartosc) { this.predkoscMaksymalna -= wartosc; },
        informacje: function() {
            return `${this.marka} ${this.model} (${this.rokProdukcji}), Kolor: ${this.kolor}, Prędkość: ${this.predkoscMaksymalna}`;
        },
        wiek: function() {
            let obecnyRok = new Date().getFullYear();
            return obecnyRok - this.rokProdukcji;
        }
    };

    console.log(samochod.informacje());
    samochod.zwiekszPredkosc(20);
    console.log("Po zwiększeniu prędkości:", samochod.informacje());
    console.log("Wiek samochodu:", samochod.wiek(), "lat");
}

// Zadanie 12 - klasa Konto bankowe
function wykonajZadanie12() {
    class Konto {
        constructor(poczatkoweSaldo) {
            this.saldo = poczatkoweSaldo;
        }
        wplac(kwota) {
            this.saldo += kwota;
            console.log(`Wpłacono ${kwota}. Aktualne saldo: ${this.saldo}`);
        }
        wyplac(kwota) {
            if (kwota > this.saldo) {
                console.log("Brak wystarczających środków!");
            } else {
                this.saldo -= kwota;
                console.log(`Wypłacono ${kwota}. Aktualne saldo: ${this.saldo}`);
            }
        }
        sprawdzSaldo() {
            return this.saldo;
        }
    }

    let mojeKonto = new Konto(1000);
    console.log("Początkowe saldo:", mojeKonto.sprawdzSaldo());
    mojeKonto.wplac(500);
    mojeKonto.wyplac(200);
    mojeKonto.wyplac(2000);
}

// Zadanie 13 - Zarządzanie pracownikami (JSON)
function wykonajZadanie13() {
    class Pracownik {
        constructor(imie, nazwisko, pensja) {
            this.imie = imie;
            this.nazwisko = nazwisko;
            this.pensja = pensja;
        }
    }

    class ZarzadzaniePracownikami {
        constructor() {
            this.listaPracownikow = [];
        }
        dodajPracownika(pracownik) { this.listaPracownikow.push(pracownik); }
        usunPracownika(imie, nazwisko) {
            this.listaPracownikow = this.listaPracownikow.filter(p => p.imie !== imie || p.nazwisko !== nazwisko);
        }
        pobierzPracownika(imie, nazwisko) {
            return this.listaPracownikow.find(p => p.imie === imie && p.nazwisko === nazwisko);
        }
        zapiszDoJSON() { return JSON.stringify(this.listaPracownikow); }
        wczytajZJSON(jsonTekst) {
            let dane = JSON.parse(jsonTekst);
            this.listaPracownikow = dane.map(p => new Pracownik(p.imie, p.nazwisko, p.pensja));
        }
    }

    let menedzer = new ZarzadzaniePracownikami();
    menedzer.dodajPracownika(new Pracownik("Jan", "Kowal", 4000));
    menedzer.dodajPracownika(new Pracownik("Anna", "Nowak", 5000));
    
    console.log("Po dodaniu:", menedzer.listaPracownikow);
    let zapisane = menedzer.zapiszDoJSON();
    console.log("JSON:", zapisane);
}

// Zadanie 14 - Zarządzanie produktami
function wykonajZadanie14() {
    class Produkt {
        constructor(nazwa, cena, dostepneSztuki) {
            this.nazwa = nazwa;
            this.cena = cena;
            this.dostepneSztuki = dostepneSztuki;
        }
    }

    class ZarzadzanieProduktami {
        constructor() { this.listaProduktow = []; }
        dodajProdukt(produkt) { this.listaProduktow.push(produkt); }
        usunProdukt(nazwa) { this.listaProduktow = this.listaProduktow.filter(p => p.nazwa !== nazwa); }
        zmienCene(nazwa, nowaCena) {
            let produkt = this.listaProduktow.find(p => p.nazwa === nazwa);
            if (produkt) produkt.cena = nowaCena;
        }
        zapiszDoJSON() { return JSON.stringify(this.listaProduktow); }
        wczytajZJSON(jsonTekst) {
            let dane = JSON.parse(jsonTekst);
            this.listaProduktow = dane.map(p => new Produkt(p.nazwa, p.cena, p.dostepneSztuki));
        }
    }

    let sklep = new ZarzadzanieProduktami();
    sklep.dodajProdukt(new Produkt("Mleko", 3.5, 100));
    sklep.dodajProdukt(new Produkt("Chleb", 4.0, 50));
    
    sklep.zmienCene("Mleko", 4.2);
    sklep.usunProdukt("Chleb");
    console.log("Stan sklepu:", sklep.listaProduktow);
}

// Zadanie 15 - Fetch API JSONPlaceholder
function wykonajZadanie15() {
    let div = document.getElementById("kontener-na-wynik");
    if (!div) {
        div = document.createElement("div");
        div.id = "kontener-na-wynik";
        document.body.appendChild(div);
    }
    
    div.innerHTML = `
        <h3>Zadanie 15: Użytkownicy z API</h3>
        <input type="text" id="filtrMiasto" placeholder="Filtruj wg miasta">
        <button id="btnPobierz">Pobierz/Odśwież dane</button>
        <div id="apiDane" style="margin-top:20px;"></div>
    `;

    let usersData = [];
    let currentPage = 1;
    let itemsPerPage = 5;

    function wyswietlTabele(dane, pokazSzczegoly = false) {
        let html = "<table border='1' style='border-collapse:collapse; width:100%; margin-bottom:10px;'><tr><th>Imię</th><th>Username</th><th>Miasto</th>";
        if (pokazSzczegoly) html += "<th>Telefon</th><th>E-mail</th>";
        html += "</tr>";

        let paginated = dane.slice(0, currentPage * itemsPerPage);

        paginated.forEach(u => {
            html += `<tr><td>${u.name.split(' ')[0]}</td><td>${u.username}</td><td>${u.address.city}</td>`;
            if (pokazSzczegoly) html += `<td>${u.phone}</td><td>${u.email}</td>`;
            html += `</tr>`;
        });
        html += "</table>";
        
        if (paginated.length < dane.length) {
            html += `<button id="btnWiecejdanych">Pokaż więcej użytkowników</button> `;
        }
        html += `<button id="btnWiecejszczegolow">Pobierz więcej danych (tel, email)</button>`;

        document.getElementById("apiDane").innerHTML = html;

        let btnWiecejDanych = document.getElementById("btnWiecejdanych");
        if (btnWiecejDanych) {
            btnWiecejDanych.addEventListener("click", () => {
                currentPage++;
                wyswietlTabele(dane, pokazSzczegoly);
            });
        }
        document.getElementById("btnWiecejszczegolow").addEventListener("click", () => {
            wyswietlTabele(dane, true);
        });
    }

    function pobierzZApi() {
        document.getElementById("apiDane").innerHTML = "Ładowanie...";
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(res => {
                if(!res.ok) throw new Error("Błąd sieci!");
                return res.json();
            })
            .then(dane => {
                usersData = dane;
                let filtr = document.getElementById("filtrMiasto").value.toLowerCase();
                let przefiltrowane = usersData.filter(u => u.address.city.toLowerCase().includes(filtr));
                currentPage = 1;
                wyswietlTabele(przefiltrowane);
            })
            .catch(err => {
                document.getElementById("apiDane").innerHTML = `<p style="color:red;">Błąd: ${err.message}</p>`;
            });
    }

    document.getElementById("btnPobierz").addEventListener("click", pobierzZApi);
    pobierzZApi();
}