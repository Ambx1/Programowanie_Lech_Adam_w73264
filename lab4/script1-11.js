//Menu zadań
let wybor = prompt("Które zadanie chcesz uruchomić? (wpisz numer od 1 do 11)");

switch (wybor) {
    case "1":
        alert("It’s muffin time!"); //Zadanie 1
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
    default:
        alert("Nie wybrano poprawnego numeru zadania.");
}
//Zadanie 2
function wykonajZadanie2() {
    console.log("--- Zadanie 2 ---");
    let a=10
    let b=20
    let c=23.2
    let suma = b+a
    console.log("Wartość a+b:",a+b)
    console.log("wartość a+b:"+ (a+b))

    alert("Mnorzenie c i b: "+ c*b)
    
    let m = document.getElementById("mnozenie")
    console.log(m)
    m.textContent = "wartość odejmowania: " + (a-b)
}
//Zadanie 3
//a) Parzyste do konsoli
function wykonajZadanie3() {
    console.log("--- Zadanie 3 ---");
    console.log("liczby parzyste:");
    for(let i=0;i<=100;i++){
        if(i%2===0){
            console.log(i);
        }
    }

    //b) Co piąta liczba do HTML
    let p = document.getElementById("wynik");
    for (let i = 0; i <= 100; i += 5) {
        p.textContent += i + " "; 
    }

    //c) Podzielne przez 13 w alert
    let podzielne13 = [];
    for(let i=1;i<=100;i++){
        if(i % 13 === 0){
            podzielne13.push(i);
        } 
    }
    alert("Liczby podzielne przez 13: " + podzielne13.join(", "));
}
//Zadanie 4
function wykonajZadanie4() {
    console.log("--- Zadanie 4 ---");
    function obliczPoleTrojkata() {
    let a = parseFloat(prompt("Podaj bok a:"));//parseFloat konwertuje string na Float
    let b = parseFloat(prompt("Podaj bok b:"));
    let c = parseFloat(prompt("Podaj bok c:"));

    if (a + b > c && a + c > b && b + c > a) { // Sprawdzenie warunku trójkąta
        let p = (a + b + c) / 2;
        let pole = Math.sqrt(p * (p - a) * (p - b) * (p - c));
        console.log("Pole trójkąta wynosi: " + pole.toFixed(2));
    } else {
        console.log("Z tych boków nie da się zbudować trójkąta!");
    }
}
obliczPoleTrojkata();
}
//Zadanie 5
function wykonajZadanie5() {
    console.log("--- Zadanie 5 ---");
    let imie = prompt("Jak masz na imię?");
    alert("Witaj, " + imie + "!");
}
//Zadanie 6
function wykonajZadanie6() {
    console.log("--- Zadanie 6 ---");
    let liczba1 = parseInt(prompt("Podaj pierwszą liczbę całkowitą:"));
    let liczba2 = parseInt(prompt("Podaj drugą liczbę całkowitą:"));
    let suma = liczba1 + liczba2;
    document.write("Wynik dodawania " + liczba1 + " + " + liczba2 + " = " + suma);
}