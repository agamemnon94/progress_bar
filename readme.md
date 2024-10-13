#### Commande SASS watch :
Les fichiers principaux scss et css doivent être nommés style.scss et style.css
```
npx sass --watch assets/sass:assets/css
```
ou
```
l'alias bash => "swatch"
```

## curentTime : 
On peut dire que le paramètre currentTime de la fonction appelée par requestAnimationFrame est une sorte de "variable magique" dans le sens où on n'a pas besoin de la passer soi-même ; le navigateur le fait automatiquement. Elle est générée à chaque frame et correspond à un horodatage basé sur le temps écoulé depuis le chargement de la page, ce qui permet de synchroniser précisément les animations.

C'est un comportement intégré à l'API requestAnimationFrame. Ce n'est donc pas une variable que l'on définit explicitement, mais une donnée automatiquement fournie par le moteur JavaScript du navigateur à chaque appel de la fonction.

## Variables et paramètres "magiques" Js : 

Il existe d'autres variables ou paramètres "magiques" similaires à "currentTime" dans certaines API ou fonctions JavaScript, où des valeurs sont automatiquement fournies par le moteur JavaScript ou le navigateur sans que on ait à les passer explicitement. Voici quelques exemples courants :

1. L'objet event dans les événements DOM
Lorsqu'un gestionnaire d'événements est déclenché (comme click, submit, etc.), l'objet événement (event ou e) est automatiquement passé à la fonction de rappel. Il contient des informations sur l'événement, comme la position du curseur, l'élément déclencheur, etc.

javascript
``` 
document.addEventListener("click", function(event) {
  console.log(event.clientX, event.clientY); // Coordonnées du clic
});
```

	• Ici, event est automatiquement fourni à la fonction, pas besoin de l'appeler manuellement.
	
2. L'objet arguments dans les fonctions
Dans une fonction normale, même si aucun paramètre n'est explicitement déclaré, la variable arguments (qui est une sorte de tableau) contient tous les arguments passés à cette fonction.

javascript
```
function myFunction() {
  console.log(arguments); // Affiche tous les arguments passés à cette fonction
}
myFunction(1, 2, 3); // Affiche [1, 2, 3]
```
	• Bien que ce comportement soit moins utilisé avec l'introduction de la syntaxe moderne (comme les fonctions fléchées et rest parameters), c'est un exemple classique.
	
3. Le paramètre resolve et reject dans les promesses (Promise)
Lorsque on crée une promesse avec new Promise(), les fonctions resolve et reject sont automatiquement fournies par JavaScript. On ne les passes pas toi-même.

javascript
```
const myPromise = new Promise((resolve, reject) => {
  // 'resolve' et 'reject' sont magiquement disponibles ici
  resolve('Success');
});
```
	• resolve et reject permettent de signaler que la promesse a été accomplie ou rejetée, respectivement.
	
4. Les paramètres des fonctions de rappel (setTimeout, setInterval)
Dans des fonctions comme setTimeout ou setInterval, si on fournit une fonction à appeler après un certain temps, les arguments peuvent être automatiquement passés à cette fonction de rappel :

javascript
```
setTimeout(function(msg) {
  console.log(msg);
}, 1000, "Hello World!"); // 'Hello World!' est automatiquement passé en argument
```

	• Ici, "Hello World!" est automatiquement passé en tant que paramètre à la fonction de rappel.
	
5. Le contexte this dans les objets
Lorsqu'une méthode est appelée sur un objet, la référence à cet objet est automatiquement accessible via la variable magique this à l'intérieur de cette méthode :

javascript
```
const obj = {
  name: 'My Object',
  logName: function() {
    console.log(this.name); // 'this' fait référence à 'obj'
  }
};
obj.logName(); // Affiche 'My Object'
```
	• this est une variable spéciale dont la valeur dépend de la manière dont la fonction est appelée.
	
6. index et array dans Array.prototype.map, forEach, etc.
Lors de l'utilisation de fonctions de tableau comme map, forEach, ou filter, les callbacks reçoivent automatiquement trois paramètres : l'élément courant, son index, et le tableau lui-même.

javascript
```
[1, 2, 3].map((element, index, array) => {
  console.log(element, index, array); 
});
```
	• Ici, index et array sont automatiquement fournis à chaque appel de la fonction.
	
7. Les paramètres dans les méthodes de bouclage (Object.entries, Object.keys, Object.values)
Ces méthodes retournent directement des paires clés-valeurs ou des tableaux de propriétés, sans que on ait à les créer toi-même.

javascript
```
const obj = { a: 1, b: 2 };
Object.entries(obj).forEach(([key, value]) => {
  console.log(key, value); // Clé et valeur magiquement fournies
});
```

Résumé
Ces paramètres sont "magiques" parce qu'ils sont implicites et fournis automatiquement par le moteur JavaScript ou le navigateur. Ils sont liés à l'API ou au contexte d'exécution, et on n'a pas besoin de les passer explicitement. Cependant, leur utilisation est bien documentée et fait partie intégrante des pratiques JavaScript.
On n'aurait pas forcément pu deviner leur existence sans connaître l'API en question, mais une fois que on les maîtrise, ils deviennent très utiles pour simplifier ton code.


