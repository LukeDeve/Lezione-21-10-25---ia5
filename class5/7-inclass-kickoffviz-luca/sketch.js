//variabili globali
let xMax = 400;
let yMax = 600;

let xRocket = xMax/2;
let yRocket = yMax*0.6;

let table;
let star_img;
let stars_valid = [];


function isStarSizeValid(value){
  //se il dato ingresso è corretto o meno
  //restituire un booleano
  return value > 0;
}

//caricare asset prima che la pagina web venga caricata
function preload() {
  table = loadTable("../assets/datasets/stars.csv", "csv", "header");
  star_img = loadImage("../assets/img/star.png");

}


function setup() {
  createCanvas(xMax, yMax);
  frameRate(30);
  //filtrare i dati
  //tramite isStarSizeValid
  //applichiamo la funzione di filtro
  
  //scorriamo i valori con un ciclo
  //e filtriamo
  for(let i=0; i < table.getRowCount(); i++){
    let star_value = table.getNum(i,"starSize");
    if(isStarSizeValid(star_value)){
      stars_valid.push(star_value);
    }
  }
    angleMode(DEGREES);
}

function drawStarsFromFile() {
  for(let k = 0; k < table.getRowCount(); k++) {
    let starX = (k*37) % width + (k%3) * 5;
    let starY = (k*73) % height + (k%7);
    let starSize = table.getNum(k, "starSize")
    image(star_img, starX, starY, starSize, starSize);
  }
}

//funzione per calcolare la media di un array in generale 
function calculateMean(array){
  let sum = 0;
  let meanarray = 0;
  for(let i=0; i< array.length; i++){ //i< array.length (fino a quando voglio che si ripeta il ciclo)
    sum += array[i];
    // += è uguale a scrivere sum = sum + array[i]
    
  }
  meanarray = sum/array.length;
  return meanarray;
}

function drawStarSizePlot (arraystelle){
// deve rappresentare assi cartesiani x e y
// deve assegnare le etichette
push();
strokeWeight(3);
// asse x 
line(30,height/2, width-20, height/2)
//asse y 
line(30,height/2, 30,30)

//assegnare le etichette

//per ruotare il testo?
//uso push e pop
push();
translate(30,30);
rotate(-90);
//ma occhio che devo mettere in cima al foglio che i gradi sono così e non in radianti 
text("Size",30,30);
pop();
//rappresentare le dimensioni della stella
for (let i=0; i < arrayDiStelle.lenght; i++){
  image(star_img, x, y, arraystelle[i],arraystelle[i]);
}
pop();

}

function draw() {
  background("#C0E1FC");

  fill(0); //bianco
  textSize(20);
  text("mouseX: " + mouseX + ",\
     mouseY: " + mouseY,20,20);
  
     //disegnare la stella più piccola
     // e la stella più grossa
     //stars_valid
    //image(star_img, 50, 50, min(stars_valid), min(stars_valid));
    //image(star_img, 100, 100, max(stars_valid), max(stars_valid));



  // drawStarsFromFile();
  

  // 1 rappresentare le statistiche
  // 1. A quante stelle valide ci sono
  //stars_valid.length -- mi dice quanto è lungo l'array
  text ("Stelle valide: " + stars_valid.length, 20, height/2 +100);

  // 1B il valore medio della dimensione delle stelle
  //sommare tutte le dimensioni delle stelle
let mediaDimensioni= 0

mediaDimensioni = calculateMean(stars_valid);
//mi faccio una funzione che compongo una sola volta e ogni volta che gli do un'array lui mi da la media


  // 1C la deviazione standard, quanto variano le dimensioni


  text ("media dimensioni stelle valide " + mediaDimensioni, 20, height/2 +130);

drawStarSizePlot(stars_valid);

}
