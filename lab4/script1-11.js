// Automatyczne uruchomienie zegara (Zadanie 10) zaraz po załadowaniu
window.onload = function() {
    wykonajZadanie10();
};

// Menu zadań
let wybor = prompt("Które zadanie chcesz uruchomić? (wpisz numer od 1 do 11)");

switch (wybor) {
    case "1":
        alert("It’s muffin time!");
        break;
    case "2":
        wykonajZadanie2();
        break;
    case "3":
        wykonajZadanie3();
        break;
    case "4":
        wykonajZadanie4();
        break;
    case "5":
        wykonajZadanie5();
        break; 
    case "6":
        wykonajZadanie6();
        break; 
    case "7":
        wykonajZadanie7();
        break;
    case "8":
        wykonajZadanie8();
        break;
    case "9":
        wykonajZadanie9();
        break;
    case "10":
        alert("Zegar działa już w tle na stronie.");
        break;
    case "11":
        wykonajZadanie11();
        break;
    default:
        alert("Nie wybrano poprawnego numeru zadania.");
}

// Zadanie 2
function wykonajZadanie2() {
    console.log("--- Zadanie 2 ---");
    let a=10, b=20, c=23.2;
    console.log("Wartość a+b:", a+b);
    alert("Mnożenie c i b: " + (c*b));
    let m = document.getElementById("mnozenie");
    if(m) m.textContent = "wartość odejmowania: " + (a-b);
}

// Zadanie 3
function wykonajZadanie3() {
    console.log("--- Zadanie 3 ---");
    for(let i=0; i<=100; i++){
        if(i%2===0) console.log(i);
    }
    let p = document.getElementById("wynik");
    if(p) {
        p.textContent = "Co piąta liczba: ";
        for (let i = 0; i <= 100; i += 5) {
            p.textContent += i + " "; 
        }
    }
    let podzielne13 = [];
    for(let i=1; i<=100; i++){
        if(i % 13 === 0) podzielne13.push(i);
    }
    alert("Liczby podzielne przez 13: " + podzielne13.join(", "));
}

// Zadanie 4
function wykonajZadanie4() {
    let a = parseFloat(prompt("Podaj bok a:"));
    let b = parseFloat(prompt("Podaj bok b:"));
    let c = parseFloat(prompt("Podaj bok c:"));

    if (a + b > c && a + c > b && b + c > a) {
        let p = (a + b + c) / 2;
        let pole = Math.sqrt(p * (p - a) * (p - b) * (p - c));
        alert("Pole trójkąta wynosi: " + pole.toFixed(2));
    } else {
        alert("Z tych boków nie da się zbudować trójkąta!");
    }
}

// Zadanie 5
function wykonajZadanie5() {
    let imie = prompt("Jak masz na imię?");
    alert("Witaj, " + imie + "!");
}

// Zadanie 6
function wykonajZadanie6() {
    let liczba1 = parseInt(prompt("Podaj pierwszą liczbę całkowitą:"));
    let liczba2 = parseInt(prompt("Podaj drugą liczbę całkowitą:"));
    let suma = liczba1 + liczba2;
    // Używamy alert zamiast document.write, aby nie czyścić całej strony
    alert("Wynik dodawania " + liczba1 + " + " + liczba2 + " = " + suma);
}

// Zadanie 7
function wykonajZadanie7() {
    let l1 = parseFloat(prompt("Podaj pierwszą liczbę:"));
    let l2 = parseFloat(prompt("Podaj drugą liczbę:"));
    let l3 = parseFloat(prompt("Podaj trzecią liczbę:"));
    let najwieksza = Math.max(l1, l2, l3);
    alert("Największa liczba to: " + najwieksza);
}

// Zadanie 8
function wykonajZadanie8() {
    let a = parseInt(prompt("Podaj pierwszą liczbę (NWD):"));
    let b = parseInt(prompt("Podaj drugą liczbę (NWD):"));
    const nwd = (x, y) => {
        while (y) {
            x %= y;
            [x, y] = [y, x];
        }
        return x;
    };
    alert("NWD liczb " + a + " i " + b + " to: " + nwd(a, b));
}

// Zadanie 9 - TERAZ W ALERCIE
function wykonajZadanie9() {
    let wylosowana = Math.floor(Math.random() * 101);
    let strzal;
    let proby = 0;
    
    do {
        strzal = parseInt(prompt("Zgadnij liczbę (0-100):"));
        if (isNaN(strzal)) break; // przerwij jeśli użytkownik kliknie Anuluj
        proby++;
        
        if (strzal < wylosowana) {
            alert("Za mało! Podana liczba jest mniejsza od wylosowanej.");
        } else if (strzal > wylosowana) {
            alert("Za dużo! Podana liczba jest większa od wylosowanej.");
        }
    } while (strzal !== wylosowana);
    
    if(!isNaN(strzal)) alert("Gratulacje! Odgadłeś liczbę w " + proby + " próbach.");
}

// Zadanie 10
function wykonajZadanie10() {
    const zegarElement = document.getElementById("zegar");
    if (zegarElement) {
        const teraz = new Date();
        zegarElement.innerHTML = teraz.toLocaleTimeString();
    }
    setTimeout(wykonajZadanie10, 1000);
}

// Zadanie 11
function wykonajZadanie11() {
    const kontener = document.getElementById("gra-kontener");
    if(kontener) kontener.style.display = "block";
    
    let wylosowana = Math.floor(Math.random() * 101);
    let proby = 0;
    
    const input = document.getElementById("user-input");
    const button = document.getElementById("check-btn");
    const feedback = document.getElementById("feedback");

    if(button) {
        button.onclick = function() {
            let strzal = parseInt(input.value);
            proby++;
            
            if (strzal < wylosowana) {
                feedback.textContent = "Za mało!";
            } else if (strzal > wylosowana) {
                feedback.textContent = "Za dużo!";
            } else if (strzal === wylosowana) {
                alert("Gratulacje! Liczba prób: " + proby);
                location.reload(); 
            }
        };
    }
}