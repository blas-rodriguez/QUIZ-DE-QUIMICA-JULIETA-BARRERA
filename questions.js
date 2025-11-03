/*
  Banco de preguntas para "Experimentar con Julieta"
  - Sin base de datos: solo edita este archivo.
  - Estructura amigable: cada pregunta tiene id, enunciado, opciones y respuesta correcta.
  - Opcionales: categoria, dificultad, explicacion, media (imagen/audio si quisieras luego).

  CÓMO USAR EN index.html
  ------------------------
  <script src="questions.js"></script>
  Luego accedé a window.QUIZ.getQuestions({...}) o a QUIZ.QUESTIONS directamente.
*/

(function(global){
  // Util para mezclar arrays (Fisher–Yates)
  function shuffle(arr){
    const a = arr.slice();
    for(let i=a.length-1;i>0;i--){
      const j = Math.floor(Math.random()*(i+1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  // Esquema de pregunta
  // {
  //   id: "q001",
  //   enunciado: "¿Cuál es el símbolo químico del sodio?",
  //   opciones: [
  //     { key: "A", texto: "Na" },
  //     { key: "B", texto: "So" },
  //     { key: "C", texto: "Sd" },
  //     { key: "D", texto: "S" }
  //   ],
  //   correcta: "A",
  //   categoria: "Elementos",
  //   dificultad: "facil",
  //   explicacion: "El símbolo de sodio es Na, del latín natrium.",
  //   media: null
  // }

  const QUESTIONS = [
    {
      id: "q001",
      enunciado: "¿Cuál es el símbolo químico del sodio?",
      opciones: [
        { key: "A", texto: "Na" },
        { key: "B", texto: "So" },
        { key: "C", texto: "Sd" },
        { key: "D", texto: "S" }
      ],
      correcta: "A",
      categoria: "Elementos",
      dificultad: "facil",
      explicacion: "El símbolo del sodio es Na (del latín natrium).",
      media: null
    },
    {
      id: "q002",
      enunciado: "¿Qué partícula tiene carga negativa?",
      opciones: [
        { key: "A", texto: "Protón" },
        { key: "B", texto: "Neutrón" },
        { key: "C", texto: "Electrón" },
        { key: "D", texto: "Positrón" }
      ],
      correcta: "C",
      categoria: "Átomo",
      dificultad: "facil",
      explicacion: "El electrón posee carga negativa.",
      media: null
    },
    {
      id: "q003",
      enunciado: "El H2O es el nombre químico de…",
      opciones: [
        { key: "A", texto: "Peróxido de hidrógeno" },
        { key: "B", texto: "Agua" },
        { key: "C", texto: "Hidrógeno molecular" },
        { key: "D", texto: "Óxido de hidrógeno(II)" }
      ],
      correcta: "B",
      categoria: "Compuestos",
      dificultad: "facil",
      explicacion: "H2O corresponde al agua.",
      media: null
    },
    {
      id: "q004",
      enunciado: "¿Cuál es el pH aproximado de una solución ácida fuerte?",
      opciones: [
        { key: "A", texto: "pH 1" },
        { key: "B", texto: "pH 7" },
        { key: "C", texto: "pH 9" },
        { key: "D", texto: "pH 14" }
      ],
      correcta: "A",
      categoria: "Ácidos y bases",
      dificultad: "media",
      explicacion: "Ácidos fuertes presentan pH cercano a 0–1.",
      media: null
    },
    {
      id: "q005",
      enunciado: "¿Qué ley relaciona presión y volumen a temperatura constante?",
      opciones: [
        { key: "A", texto: "Ley de Boyle" },
        { key: "B", texto: "Ley de Charles" },
        { key: "C", texto: "Ley de Avogadro" },
        { key: "D", texto: "Ley de Hess" }
      ],
      correcta: "A",
      categoria: "Gases",
      dificultad: "media",
      explicacion: "Boyle: P·V = cte a T constante.",
      media: null
    },
    {
      id: "q006",
      enunciado: "Si una reacción libera calor al entorno, es…",
      opciones: [
        { key: "A", texto: "Endotérmica" },
        { key: "B", texto: "Exotérmica" },
        { key: "C", texto: "Isotérmica" },
        { key: "D", texto: "Aditiva" }
      ],
      correcta: "B",
      categoria: "Termoquímica",
      dificultad: "facil",
      explicacion: "Exotérmica = libera calor.",
      media: null
    },
    {
      id: "q007",
      enunciado: "El número atómico (Z) indica…",
      opciones: [
        { key: "A", texto: "Masa del núcleo" },
        { key: "B", texto: "Número de protones" },
        { key: "C", texto: "Número de neutrones" },
        { key: "D", texto: "Suma de protones y electrones" }
      ],
      correcta: "B",
      categoria: "Átomo",
      dificultad: "facil",
      explicacion: "Z = protones en el núcleo (y electrones en átomo neutro).",
      media: null
    },
    {
      id: "q008",
      enunciado: "¿Cuál es el gas más abundante en el aire?",
      opciones: [
        { key: "A", texto: "Oxígeno" },
        { key: "B", texto: "Nitrógeno" },
        { key: "C", texto: "Dióxido de carbono" },
        { key: "D", texto: "Argón" }
      ],
      correcta: "B",
      categoria: "Gases",
      dificultad: "facil",
      explicacion: "El nitrógeno ~78% del aire.",
      media: null
    },
    {
      id: "q009",
      enunciado: "Un mol de cualquier gas ideal a CNPT ocupa (aprox.)…",
      opciones: [
        { key: "A", texto: "11,2 L" },
        { key: "B", texto: "22,4 L" },
        { key: "C", texto: "44,8 L" },
        { key: "D", texto: "1 L" }
      ],
      correcta: "B",
      categoria: "Gases",
      dificultad: "media",
      explicacion: "Volumen molar ~22,4 L a 1 atm y 0°C.",
      media: null
    },
    {
      id: "q010",
      enunciado: "¿Cómo se llama la mezcla homogénea de dos o más sustancias?",
      opciones: [
        { key: "A", texto: "Suspensión" },
        { key: "B", texto: "Coloide" },
        { key: "C", texto: "Solución" },
        { key: "D", texto: "Emulsión" }
      ],
      correcta: "C",
      categoria: "Disoluciones",
      dificultad: "facil",
      explicacion: "Solución = mezcla homogénea.",
      media: null
    }
  ];

  // Validación simple de esquema
  function validate(questions){
    const errors = [];
    questions.forEach((q, idx)=>{
      if(!q.id) errors.push(`Pregunta ${idx}: falta id`);
      if(!q.enunciado) errors.push(`Pregunta ${q.id||idx}: falta enunciado`);
      if(!Array.isArray(q.opciones) || q.opciones.length<2) errors.push(`Pregunta ${q.id}: opciones insuficientes`);
      const keys = (q.opciones||[]).map(o=>o.key);
      if(!q.correcta || !keys.includes(q.correcta)) errors.push(`Pregunta ${q.id}: correcta inválida`);
    });
    return errors;
  }

  // API pública
  const QUIZ = {
    QUESTIONS,
    shuffle,
    validate,
    // getQuestions permite filtrar/mezclar/limitar
    getQuestions({categoria=null, dificultad=null, limite=null, mezclar=true}={}){
      let list = QUESTIONS.slice();
      if(categoria) list = list.filter(q=>q.categoria===categoria);
      if(dificultad) list = list.filter(q=>q.dificultad===dificultad);
      if(mezclar) list = shuffle(list);
      if(limite) list = list.slice(0, limite);
      return list;
    }
  };

  // Exponer globalmente
  global.QUIZ = QUIZ;

})(window);
