// Storytelling éditorial par demeure et par langue
// 3 paragraphes — ton "histoire de la demeure" haute couture
// Particularité, agent dédié, localisation paragraphe court

export interface EstateStory {
  history: string[];        // 3 paragraphes
  singular: string;          // particularité courte
  locationCopy: string;      // description ville/région courte
  agent: { name: string; tel: string; email: string };
}

type StoriesByLang = Record<string, Record<string, EstateStory>>;

const baseAgents = [
  { name: 'Élise Bernier', tel: '+33 6 14 27 08 53', email: 'e.bernier@maison-alba.com' },
  { name: 'Tomás Vidal', tel: '+41 79 312 44 18', email: 't.vidal@maison-alba.com' },
  { name: 'Sofia Almeida', tel: '+351 91 472 06 90', email: 's.almeida@maison-alba.com' },
  { name: 'Jean-Charles Vavasseur', tel: '+41 79 612 18 22', email: 'jc.vavasseur@maison-alba.com' },
  { name: 'Inês Carvalho', tel: '+351 91 308 71 15', email: 'i.carvalho@maison-alba.com' },
  { name: 'Élise Bernier', tel: '+33 6 14 27 08 53', email: 'e.bernier@maison-alba.com' },
];

const slugs = [
  'domaine-de-l-aube',
  'le-belvedere',
  'villa-helena',
  'le-pavillon-des-roses',
  'l-atelier-d-architecte',
  'le-mas-provencal',
];

export const stories: StoriesByLang = {
  fr: {
    'domaine-de-l-aube': {
      history: [
        "Construite en 1908 par l'architecte aixois Henri Vidal, la demeure occupe l'un des derniers grands plateaux du pays d'Aix. Son commanditaire, le négociant Charles Régnier, voulait une maison qui regarde le soleil se lever sur la Sainte-Victoire — d'où son nom, Domaine de l'Aube.",
        "Restaurée en 2018 par les ateliers Méridien, la demeure conserve ses parquets en chêne du Vaucluse, ses cheminées en pierre de Tavel et l'orangerie de 1924. Le parc, dessiné à l'origine par un disciple d'Achille Duchêne, a été repris main dans la main avec un paysagiste de Versailles.",
        "Aujourd'hui, l'ensemble — six cent vingt mètres carrés, sept chambres, une dépendance — se présente dans un état exceptionnel. Une rare conjonction d'âme et de confort, à vingt minutes du centre d'Aix.",
      ],
      singular: "Orangerie 1924 · Parc dessiné dans l'esprit Duchêne",
      locationCopy: "Aix-en-Provence — pays d'art, de lumière sèche et de cyprès noirs, à dix minutes du centre historique et de ses cours bordés de platanes.",
      agent: baseAgents[0],
    },
    'le-belvedere': {
      history: [
        "Conçue en 2019 par le studio milanais Marco Bertoli & Partners, la villa épouse le relief escarpé du Monte San Salvatore, surplombant le lac de Lugano de cent vingt mètres. Le projet fut récompensé du prix Domus Awards la même année.",
        "L'architecture, taillée dans le béton blanc et la pierre de Saint-Triphon, joue avec les pentes : les volumes glissent, s'étirent et offrent à chaque pièce une vue cadrée sur le lac. Le mobilier intérieur, dessiné sur mesure, intègre des éditions Cassina et Flos.",
        "Quatre cent quatre-vingts mètres carrés, cinq chambres, une piscine à débordement de vingt mètres taillée dans la roche. Une œuvre d'architecte vivable, rare sur le marché du Tessin.",
      ],
      singular: "Prix Domus 2019 · Piscine taillée dans la roche",
      locationCopy: "Lugano — capitale italienne du canton du Tessin, où la précision suisse rencontre la lumière méditerranéenne.",
      agent: baseAgents[1],
    },
    'villa-helena': {
      history: [
        "Élevée en 1924 par l'architecte portugais Cassiano Branco, dans le style estoril nascente — alliage subtil d'Art déco et d'inspiration italienne. La villa fut bâtie pour la famille Helena de Castro, dont elle conserve aujourd'hui le nom.",
        "L'intérieur, restauré entre 2020 et 2023 par l'atelier lisboète Mota & Reis, dévoile les azulejos d'origine, des cheminées en marbre rose d'Estremoz et une véranda donnant sur l'océan. Les jardins ont été redessinés autour d'un bassin Art déco.",
        "Cinq cent quarante mètres carrés, six chambres, trois mille huit cents mètres carrés de jardin clos, à deux pas du Tamariz. L'une des dernières villas privées de l'Estoril historique.",
      ],
      singular: "Azulejos d'origine 1924 · Vue océan",
      locationCopy: "Estoril — riviera portugaise née au début du XXᵉ siècle, à vingt-cinq kilomètres de Lisbonne, hivernale et lumineuse.",
      agent: baseAgents[2],
    },
    'le-pavillon-des-roses': {
      history: [
        "Bâti en 1892 par l'architecte genevois François Gilliéron pour la famille Pictet, le Pavillon des Roses est l'une des dernières grandes propriétés du coteau de Cologny. Son nom vient de la roseraie historique, dessinée par Édouard André.",
        "La demeure principale, élevée sur trois niveaux, combine pierre de Meillerie et menuiseries d'origine. L'orangerie de 1908, restaurée avec discrétion, abrite aujourd'hui une bibliothèque et un atelier. Le parc, douze mille mètres carrés, descend vers le Léman.",
        "Huit cent quatre-vingts mètres carrés, neuf chambres, dépendances et embarcadère privé. Une rareté absolue sur la rive droite genevoise — proposée à la transmission par décision familiale.",
      ],
      singular: "Roseraie Édouard André · Embarcadère privé",
      locationCopy: "Cologny — coteau lacustre de la rive droite, demeures patriciennes, vue cadrée sur le Mont-Blanc.",
      agent: baseAgents[3],
    },
    'l-atelier-d-architecte': {
      history: [
        "Conçu en 2021 par l'architecte João Aragão dans un immeuble pombalin du Chiado, l'atelier occupe l'ancien dernier étage d'une maison de négoce de 1758. Le projet a été distingué par le prix Valmor de la ville de Lisbonne.",
        "Quatre niveaux, deux cent quatre-vingts mètres carrés, plafonds de cinq mètres et terrasse privative donnant sur le Tage. Le parti pris contemporain — béton ciré, chêne brut, baies en acier noir — dialogue avec les voûtes d'origine.",
        "Vendu meublé sur option, avec une cuisine Bulthaup et un mobilier signé Jean Royère et Charlotte Perriand. Un appartement-musée, vivable, à deux pas du Largo do Carmo.",
      ],
      singular: "Prix Valmor 2021 · Terrasse vue Tage",
      locationCopy: "Lisboa Chiado — quartier des écrivains et des libraires, l'un des plus convoités de la capitale.",
      agent: baseAgents[4],
    },
    'le-mas-provencal': {
      history: [
        "Élevé en 1786 par une famille de négociants en vin, le mas occupe l'un des derniers grands domaines de la presqu'île de Cassis. La bâtisse, en pierre blanche du Cap Canaille, dialogue depuis plus de deux siècles avec les calanques.",
        "Restauré en 2017 par l'architecte Jean-Charles Fournier dans le respect strict du bâti ancien — tomettes anciennes, génoises restituées, cheminées en pierre — le mas conserve toute sa charpente d'origine et son four à pain.",
        "Quatre cent dix mètres carrés, cinq chambres, oliveraie cultivée, piscine en pierre. L'une des dernières adresses authentiques de Cassis, à quelques minutes du port.",
      ],
      singular: "Pierres et charpente 1786 · Oliveraie cultivée",
      locationCopy: "Cassis — port méditerranéen, calanques, vignes en terrasses et lumière qui ne ressemble à aucune autre.",
      agent: baseAgents[5],
    },
  },

  en: {
    'domaine-de-l-aube': {
      history: [
        "Built in 1908 by Aix architect Henri Vidal, the estate stands on one of the last great plateaux of the pays d'Aix. Its commissioner, the wine merchant Charles Régnier, wanted a house that would face the sunrise over the Sainte-Victoire — hence its name, Domaine de l'Aube.",
        "Restored in 2018 by the Méridien ateliers, the residence retains its Vaucluse oak floors, its Tavel stone fireplaces and its 1924 orangery. The grounds, originally designed in the manner of Achille Duchêne, were reworked alongside a Versailles-trained landscape architect.",
        "Today the ensemble — six hundred and twenty square metres, seven bedrooms, an outbuilding — is presented in exceptional condition. A rare meeting of soul and comfort, twenty minutes from the centre of Aix.",
      ],
      singular: "1924 orangery · Grounds in the Duchêne tradition",
      locationCopy: "Aix-en-Provence — land of dry light, cypress and learned cours, ten minutes from the historic centre and its plane-shaded boulevards.",
      agent: baseAgents[0],
    },
    'le-belvedere': {
      history: [
        "Conceived in 2019 by the Milan studio Marco Bertoli & Partners, the villa hugs the steep slopes of Monte San Salvatore, one hundred and twenty metres above Lake Lugano. The project was awarded the Domus Award that same year.",
        "The architecture, hewn in white concrete and Saint-Triphon stone, plays with the gradient: volumes slide and stretch to frame the lake from every room. The bespoke interior incorporates Cassina and Flos editions, drawn in dialogue with the architecture.",
        "Four hundred and eighty square metres, five bedrooms, a twenty-metre infinity pool carved from the rock. A living architect's work, rare on the Ticino market.",
      ],
      singular: "Domus Award 2019 · Pool carved from the rock",
      locationCopy: "Lugano — the Italian capital of Ticino, where Swiss precision meets Mediterranean light.",
      agent: baseAgents[1],
    },
    'villa-helena': {
      history: [
        "Built in 1924 by Portuguese architect Cassiano Branco in the nascent Estoril style — a subtle blend of Art Deco and Italian inspiration. The villa was commissioned by the Helena de Castro family, whose name it still bears.",
        "The interior, restored between 2020 and 2023 by the Lisbon atelier Mota & Reis, reveals its original azulejos, Estremoz pink marble fireplaces and a veranda opening onto the ocean. The gardens were redrawn around an Art Deco basin.",
        "Five hundred and forty square metres, six bedrooms, three thousand eight hundred square metres of walled gardens, a few steps from the Tamariz. One of the last private villas of historic Estoril.",
      ],
      singular: "Original 1924 azulejos · Ocean view",
      locationCopy: "Estoril — the Portuguese riviera born in the early twentieth century, twenty-five kilometres from Lisbon, wintering and luminous.",
      agent: baseAgents[2],
    },
    'le-pavillon-des-roses': {
      history: [
        "Built in 1892 by Geneva architect François Gilliéron for the Pictet family, the Pavillon des Roses is one of the last great properties on the Cologny hillside. Its name derives from the historic rose garden, designed by Édouard André.",
        "The main residence, set across three levels, combines Meillerie stone and original joinery. The 1908 orangery, restored with restraint, today houses a library and an atelier. The grounds — twelve thousand square metres — descend toward Lake Geneva.",
        "Eight hundred and eighty square metres, nine bedrooms, outbuildings and a private mooring. An absolute rarity on the right bank of Geneva — offered for stewardship by family decision.",
      ],
      singular: "Édouard André rose garden · Private mooring",
      locationCopy: "Cologny — the right-bank hillside, patrician residences, framed views of Mont Blanc.",
      agent: baseAgents[3],
    },
    'l-atelier-d-architecte': {
      history: [
        "Designed in 2021 by architect João Aragão within a Pombaline building in Chiado, the atelier occupies the former top floor of a 1758 merchant house. The project was distinguished by the Valmor Prize of the City of Lisbon.",
        "Four levels, two hundred and eighty square metres, five-metre ceilings and a private terrace overlooking the Tagus. The contemporary stance — waxed concrete, raw oak, black steel openings — converses with the original vaults.",
        "Sold furnished by option, with a Bulthaup kitchen and pieces by Jean Royère and Charlotte Perriand. An apartment-museum, livable, a few steps from Largo do Carmo.",
      ],
      singular: "Valmor Prize 2021 · Tagus-view terrace",
      locationCopy: "Lisbon Chiado — quarter of writers and booksellers, one of the most coveted in the capital.",
      agent: baseAgents[4],
    },
    'le-mas-provencal': {
      history: [
        "Raised in 1786 by a family of wine merchants, the mas occupies one of the last great domaines of the Cassis peninsula. The dwelling, in white Cap Canaille stone, has held a dialogue with the calanques for more than two centuries.",
        "Restored in 2017 by architect Jean-Charles Fournier in strict respect of the ancient fabric — old tomettes, restored génoises, stone fireplaces — the mas retains all its original timberwork and bread oven.",
        "Four hundred and ten square metres, five bedrooms, a working olive grove, a stone pool. One of the last authentic addresses in Cassis, a few minutes from the harbour.",
      ],
      singular: "1786 stonework and timber · Working olive grove",
      locationCopy: "Cassis — Mediterranean harbour, calanques, terraced vines and light unlike anywhere else.",
      agent: baseAgents[5],
    },
  },

  es: {
    'domaine-de-l-aube': {
      history: [
        "Construida en 1908 por el arquitecto aixés Henri Vidal, la residencia ocupa una de las últimas grandes mesetas del país de Aix. Su comitente, el comerciante Charles Régnier, deseaba una casa que mirara salir el sol sobre la Sainte-Victoire — de ahí su nombre, Domaine de l'Aube.",
        "Restaurada en 2018 por los talleres Méridien, conserva sus parqués de roble del Vaucluse, sus chimeneas de piedra de Tavel y la orangerie de 1924. El parque, dibujado en origen en la estela de Achille Duchêne, fue retomado junto a un paisajista versallesco.",
        "Hoy el conjunto — seiscientos veinte metros cuadrados, siete habitaciones, una dependencia — se presenta en estado excepcional. Una rara conjunción de alma y confort, a veinte minutos del centro de Aix.",
      ],
      singular: "Orangerie 1924 · Parque al modo Duchêne",
      locationCopy: "Aix-en-Provence — tierra de luz seca, cipreses negros y cours arbolados, a diez minutos del centro histórico.",
      agent: baseAgents[0],
    },
    'le-belvedere': {
      history: [
        "Concebida en 2019 por el estudio milanés Marco Bertoli & Partners, la villa abraza la pendiente del Monte San Salvatore, ciento veinte metros sobre el lago de Lugano. El proyecto recibió el premio Domus ese mismo año.",
        "La arquitectura, tallada en hormigón blanco y piedra de Saint-Triphon, juega con el desnivel: los volúmenes se deslizan y se extienden para enmarcar el lago en cada estancia. El mobiliario, dibujado a medida, integra ediciones Cassina y Flos.",
        "Cuatrocientos ochenta metros cuadrados, cinco dormitorios, una piscina desbordante de veinte metros excavada en la roca. Una obra de arquitecto habitable, rara en el mercado del Ticino.",
      ],
      singular: "Premio Domus 2019 · Piscina tallada en la roca",
      locationCopy: "Lugano — capital italiana del cantón del Tesino, precisión suiza y luz mediterránea.",
      agent: baseAgents[1],
    },
    'villa-helena': {
      history: [
        "Edificada en 1924 por el arquitecto portugués Cassiano Branco en el estilo estorilense naciente — fina aleación de Art déco e inspiración italiana. La villa fue construida para la familia Helena de Castro, cuyo nombre conserva.",
        "El interior, restaurado entre 2020 y 2023 por el taller lisboeta Mota & Reis, revela los azulejos originales, chimeneas de mármol rosa de Estremoz y una galería abierta al océano. Los jardines fueron redibujados en torno a un estanque Art déco.",
        "Quinientos cuarenta metros cuadrados, seis dormitorios, tres mil ochocientos metros cuadrados de jardín amurallado, a dos pasos del Tamariz. Una de las últimas villas privadas del Estoril histórico.",
      ],
      singular: "Azulejos originales 1924 · Vista al océano",
      locationCopy: "Estoril — riviera portuguesa nacida a inicios del siglo XX, a veinticinco kilómetros de Lisboa, invernal y luminosa.",
      agent: baseAgents[2],
    },
    'le-pavillon-des-roses': {
      history: [
        "Erigido en 1892 por el arquitecto ginebrino François Gilliéron para la familia Pictet, el Pavillon des Roses es una de las últimas grandes propiedades de la ladera de Cologny. Su nombre procede de la rosaleda histórica, dibujada por Édouard André.",
        "La residencia principal, en tres niveles, combina piedra de Meillerie y carpinterías originales. La orangerie de 1908, restaurada con discreción, alberga hoy una biblioteca y un taller. El parque, doce mil metros cuadrados, desciende hacia el Léman.",
        "Ochocientos ochenta metros cuadrados, nueve dormitorios, dependencias y embarcadero privado. Una rareza absoluta en la ribera derecha ginebrina — ofrecida en transmisión por decisión familiar.",
      ],
      singular: "Rosaleda Édouard André · Embarcadero privado",
      locationCopy: "Cologny — ladera lacustre de la ribera derecha, residencias patricias, vista enmarcada del Mont-Blanc.",
      agent: baseAgents[3],
    },
    'l-atelier-d-architecte': {
      history: [
        "Concebido en 2021 por el arquitecto João Aragão en un inmueble pombalino del Chiado, el atelier ocupa el antiguo último piso de una casa de negocio de 1758. El proyecto fue distinguido con el premio Valmor de la ciudad de Lisboa.",
        "Cuatro niveles, doscientos ochenta metros cuadrados, techos de cinco metros y terraza privada con vistas al Tajo. El planteamiento contemporáneo — hormigón pulido, roble bruto, vanos en acero negro — dialoga con las bóvedas originales.",
        "Vendido amueblado en opción, con cocina Bulthaup y mobiliario firmado Jean Royère y Charlotte Perriand. Un apartamento-museo, habitable, a dos pasos del Largo do Carmo.",
      ],
      singular: "Premio Valmor 2021 · Terraza vista Tajo",
      locationCopy: "Lisboa Chiado — barrio de escritores y libreros, uno de los más codiciados de la capital.",
      agent: baseAgents[4],
    },
    'le-mas-provencal': {
      history: [
        "Levantado en 1786 por una familia de comerciantes de vino, el mas ocupa uno de los últimos grandes dominios de la península de Cassis. La construcción, en piedra blanca del Cap Canaille, dialoga desde hace más de dos siglos con las calanques.",
        "Restaurado en 2017 por el arquitecto Jean-Charles Fournier en el respeto estricto de la fábrica antigua — tomettes antiguas, génoises restituidas, chimeneas de piedra — el mas conserva su armazón original y su horno de pan.",
        "Cuatrocientos diez metros cuadrados, cinco dormitorios, olivar cultivado, piscina de piedra. Una de las últimas direcciones auténticas de Cassis, a pocos minutos del puerto.",
      ],
      singular: "Piedras y armazón 1786 · Olivar cultivado",
      locationCopy: "Cassis — puerto mediterráneo, calanques, viñas en terraza y una luz incomparable.",
      agent: baseAgents[5],
    },
  },

  pt: {
    'domaine-de-l-aube': {
      history: [
        "Construído em 1908 pelo arquitecto de Aix Henri Vidal, o solar ocupa um dos últimos grandes planaltos do país de Aix. O comitente, o comerciante Charles Régnier, queria uma casa que olhasse o nascer do sol sobre a Sainte-Victoire — daí o seu nome, Domaine de l'Aube.",
        "Restaurado em 2018 pelos ateliers Méridien, conserva os soalhos de carvalho do Vaucluse, as lareiras de pedra de Tavel e a orangerie de 1924. O parque, originalmente desenhado no espírito de Achille Duchêne, foi retomado lado a lado com um paisagista de Versailles.",
        "Hoje o conjunto — seiscentos e vinte metros quadrados, sete quartos, uma dependência — apresenta-se em estado excepcional. Uma rara conjunção de alma e conforto, a vinte minutos do centro de Aix.",
      ],
      singular: "Orangerie 1924 · Parque ao modo Duchêne",
      locationCopy: "Aix-en-Provence — terra de luz seca, ciprestes negros e cours arborizados, a dez minutos do centro histórico.",
      agent: baseAgents[0],
    },
    'le-belvedere': {
      history: [
        "Concebida em 2019 pelo estúdio milanês Marco Bertoli & Partners, a villa abraça a vertente do Monte San Salvatore, cento e vinte metros acima do lago de Lugano. O projecto recebeu o prémio Domus nesse mesmo ano.",
        "A arquitectura, talhada em betão branco e pedra de Saint-Triphon, joga com o desnível: os volumes deslizam e estendem-se para enquadrar o lago a partir de cada divisão. O mobiliário interior, desenhado à medida, integra edições Cassina e Flos.",
        "Quatrocentos e oitenta metros quadrados, cinco quartos, uma piscina de transbordo de vinte metros escavada na rocha. Uma obra de arquitecto habitável, rara no mercado do Ticino.",
      ],
      singular: "Prémio Domus 2019 · Piscina escavada na rocha",
      locationCopy: "Lugano — capital italiana do cantão do Ticino, precisão suíça e luz mediterrânica.",
      agent: baseAgents[1],
    },
    'villa-helena': {
      history: [
        "Erguida em 1924 pelo arquitecto português Cassiano Branco no estilo estorilense nascente — subtil aliança de Art déco e inspiração italiana. A villa foi construída para a família Helena de Castro, cujo nome ainda conserva.",
        "O interior, restaurado entre 2020 e 2023 pelo atelier lisboeta Mota & Reis, revela os azulejos originais, lareiras em mármore rosa de Estremoz e uma varanda aberta ao oceano. Os jardins foram redesenhados em torno de um tanque Art déco.",
        "Quinhentos e quarenta metros quadrados, seis quartos, três mil e oitocentos metros quadrados de jardim murado, a dois passos do Tamariz. Uma das últimas villas privadas do Estoril histórico.",
      ],
      singular: "Azulejos originais 1924 · Vista oceano",
      locationCopy: "Estoril — riviera portuguesa nascida no início do século XX, a vinte e cinco quilómetros de Lisboa, invernal e luminosa.",
      agent: baseAgents[2],
    },
    'le-pavillon-des-roses': {
      history: [
        "Construído em 1892 pelo arquitecto genebrino François Gilliéron para a família Pictet, o Pavillon des Roses é uma das últimas grandes propriedades da encosta de Cologny. O nome vem da roseira histórica, desenhada por Édouard André.",
        "A residência principal, em três níveis, combina pedra de Meillerie e caixilharias de origem. A orangerie de 1908, restaurada com discrição, alberga hoje uma biblioteca e um atelier. O parque, doze mil metros quadrados, desce em direcção ao Léman.",
        "Oitocentos e oitenta metros quadrados, nove quartos, dependências e embarcadouro privado. Uma raridade absoluta na margem direita genebrina — proposta à transmissão por decisão familiar.",
      ],
      singular: "Roseira Édouard André · Embarcadouro privado",
      locationCopy: "Cologny — encosta lacustre da margem direita, residências patrícias, vista enquadrada do Mont-Blanc.",
      agent: baseAgents[3],
    },
    'l-atelier-d-architecte': {
      history: [
        "Concebido em 2021 pelo arquitecto João Aragão num edifício pombalino do Chiado, o atelier ocupa o antigo último andar de uma casa de negócio de 1758. O projecto foi distinguido com o prémio Valmor da cidade de Lisboa.",
        "Quatro pisos, duzentos e oitenta metros quadrados, pés-direitos de cinco metros e terraço privativo com vista para o Tejo. A linguagem contemporânea — betão polido, carvalho bruto, vãos em aço negro — dialoga com as abóbadas originais.",
        "Vendido mobilado em opção, com cozinha Bulthaup e peças assinadas por Jean Royère e Charlotte Perriand. Um apartamento-museu, habitável, a dois passos do Largo do Carmo.",
      ],
      singular: "Prémio Valmor 2021 · Terraço vista Tejo",
      locationCopy: "Lisboa Chiado — bairro de escritores e livreiros, um dos mais cobiçados da capital.",
      agent: baseAgents[4],
    },
    'le-mas-provencal': {
      history: [
        "Erguido em 1786 por uma família de comerciantes de vinho, o mas ocupa um dos últimos grandes domínios da península de Cassis. O edifício, em pedra branca do Cap Canaille, dialoga há mais de dois séculos com as calanques.",
        "Restaurado em 2017 pelo arquitecto Jean-Charles Fournier no estrito respeito do edificado antigo — tomettes antigos, génoises restituídas, lareiras de pedra — o mas conserva a sua armação de origem e o forno de pão.",
        "Quatrocentos e dez metros quadrados, cinco quartos, olival cultivado, piscina em pedra. Uma das últimas moradas autênticas de Cassis, a poucos minutos do porto.",
      ],
      singular: "Pedra e armação 1786 · Olival cultivado",
      locationCopy: "Cassis — porto mediterrânico, calanques, vinhas em socalcos e luz como em nenhum outro lugar.",
      agent: baseAgents[5],
    },
  },
};

export function getStory(lang: string, slug: string): EstateStory | null {
  return stories[lang]?.[slug] || stories.fr[slug] || null;
}

export { slugs };
