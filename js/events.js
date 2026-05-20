function getTicketDomain(url) {
  if (!url) return '';
  try { return new URL(url).hostname.replace(/^www\./, ''); } catch(e) { return ''; }
}
const CAT_COLORS = {festival:'#5b8ff9',volksfest:'#c8974e',afterwork:'#a78bfa',sonstige:'#34d399',family:'#34d399',russian:'#f472b6',strand:'#06b6d4',beachparty:'#fbbf24',messe:'#64748b',weinfest:'#a855f7',privat:'#c9a227',zoo:'#10b981',freizeit:'#f97316',kinder:'#ec4899',stadtfest:'#8b5cf6',sport:'#ef4444'};
const CAT_LABELS = {festival:'Festival',volksfest:'Volksfest',afterwork:'After Work / Club Night',sonstige:'Sonstiges',family:'Familie',russian:'🇷🇺 Russian Event',strand:'🏖️ Stadtstrand',beachparty:'🏝️ Beach Party',messe:'🏛️ Messe',weinfest:'Weinfest',privat:'🔒 Privat',zoo:'🦁 Zoo & Tiere',freizeit:'🎡 Freizeit & Outdoor',kinder:'🎠 Kinder & Familie',stadtfest:'🎪 Stadt- & Kulturfeste',sport:'🏃 Sport & Action'};
const MONTHS = ['Januar','Februar','März','April','Mai','Juni','Juli','August','September','Oktober','November','Dezember']
const MONTHS_S = ['Jan','Feb','Mrz','Apr','Mai','Jun','Jul','Aug','Sep','Okt','Nov','Dez'];
const DAYS = ['So','Mo','Di','Mi','Do','Fr','Sa'];
const COORDS = {
  // ── Kernstädte ──
  'Nürnberg':[49.452,11.077],'Erlangen':[49.598,11.004],'Fürth':[49.478,10.989],
  'Schwabach':[49.328,11.021],'Zirndorf':[49.444,10.955],'Oberasbach':[49.430,10.965],
  'Stein':[49.418,10.973],'Herzogenaurach':[49.567,10.882],'Cadolzburg':[49.502,10.860],
  'Roth':[49.245,11.091],'Pleinfeld':[49.102,10.958],'Feucht':[49.378,11.213],
  'Lauf':[49.512,11.278],'Schwaig':[49.484,11.213],
  // ── Viana Events Locations ──
  'Viana Дача Party':[49.38481,11.10000],
  // ── Nürnberg Stadtteile ──
  'Nürnberg-Gostenhof':[49.458,11.059],'Nürnberg-Schweinau':[49.440,11.055],
  'Nürnberg-Mögeldorf':[49.452,11.121],'Nürnberg-Laufamholz':[49.454,11.173],
  'Nürnberg-Zerzabelshof':[49.448,11.130],'Nürnberg-Eibach':[49.418,11.058],
  'Nürnberg-St. Johannis':[49.467,11.059],'Nürnberg-Kleinreuth':[49.439,11.048],
  'Nürnberg-Großreuth':[49.441,11.063],'Nürnberg-Lohe':[49.437,11.073],
  'Nürnberg-Gebersdorf':[49.434,11.020],'Nürnberg-Schniegling':[49.469,11.030],
  'Nürnberg-Wetzendorf':[49.471,11.019],'Nürnberg-Almoshof':[49.483,11.017],
  'Nürnberg-Altenfurt':[49.400,11.148],'Nürnberg-Buch':[49.413,11.162],
  'Nürnberg-Gartenstadt':[49.448,11.140],'Nürnberg-Ziegelstein':[49.471,11.138],
  'Nürnberg-Kornburg':[49.380,11.095],'Nürnberg-Worzeldorf':[49.378,11.068],
  'Nürnberg-Reichelsdorf':[49.394,11.034],'Nürnberg-Katzwang':[49.368,11.035],
  'Nürnberg-Langwasser':[49.418,11.121],'Nürnberg-Buchenbühl':[49.433,11.147],
  'Nürnberg-Boxdorf':[49.478,11.054],'Nürnberg-Großgründlach':[49.490,11.033],
  'Nürnberg-Schnepfenreuth':[49.432,11.001],'Nürnberg-Mühlhof':[49.445,11.157],
  'Nürnberg-Fischbach':[49.416,11.192],'Nürnberg-Brunn':[49.391,11.181],
  'Nürnberg-Höfles':[49.496,11.158],'Nürnberg-Klaragasse':[49.458,11.073],
  'Nürnberg-Neunhof':[49.505,11.085],'Nürnberg-Weiherhof':[49.461,11.038],
  'Nürnberg-Schoppershof':[49.465,11.105],'Nürnberg-Wöhrd':[49.455,11.087],
  'Nürnberg-Kraftshof':[49.494,11.074],'Nürnberg-Lohe':[49.437,11.073],
  'Nürnberg-Reichelsdorf':[49.394,11.034],'Nürnberg-Ziegelstein':[49.471,11.138],
  // ── Fürth Stadtteile ──
  'Fürth-Sack':[49.463,10.994],'Fürth-Vach':[49.523,10.965],
  'Fürth-Stadeln':[49.509,10.958],'Fürth-Burgfarrnbach':[49.496,10.920],
  'Fürth-Hardhöhe':[49.453,10.973],'Fürth-Eigenes Heim':[49.476,11.000],
  'Fürth-Poppenreuth':[49.495,11.004],'Fürth-Ronhof':[49.467,10.985],
  'Fürth-Fürberg':[49.509,10.978],'Fürth-Unterfarrnbach':[49.484,10.937],
  'Fürth-Atzenhof':[49.447,10.942],
  // ── Oberasbach Ortsteile ──
  'Oberasbach-Altenberg':[49.418,10.952],'Oberasbach-Rehdorf':[49.410,10.982],
  'Oberasbach-Unterasbach':[49.427,10.956],
  // ── Schwabach Ortsteile ──
  'Schwabach-Dietersdorf':[49.311,11.022],'Schwabach-Limbach':[49.342,11.049],
  'Schwabach-Unterreichenbach':[49.314,11.060],'Schwabach-Wolkersdorf':[49.315,11.050],
  // ── Roth Ortsteile ──
  'Roth-Eckersmühlen':[49.263,11.044],'Roth-Leerstetten':[49.310,11.059],
  'Roth-Mosbach':[49.231,11.078],'Roth-Pfaffenhofen':[49.287,11.111],
  'Roth-Ruppmannsburg':[49.275,11.096],
  // ── Cadolzburg / Wachendorf ──
  'Cadolzburg-Wachendorf':[49.495,10.847],
  // ── Region ──
  'Würzburg':[49.787,9.936],'Augsburg':[48.370,10.897],'Bamberg':[49.900,10.902],
  'Regensburg':[49.013,12.101],'Bayreuth':[49.945,11.578],'Ansbach':[49.298,10.572],
  'Kitzingen':[49.735,10.167],'Volkach':[49.865,10.222],'Sommerhausen':[49.729,10.004],
  'Rödelsee':[49.714,10.248],'Obernbreit':[49.672,10.143],'Röttingen':[49.508,9.974],
  'Großlangheim':[49.749,10.245],'Kleinlangheim':[49.753,10.272],'Ipsheim':[49.519,10.481],
  'Wipfeld':[49.979,10.151],'Zeil am Main':[50.009,10.583],'Miltenberg':[49.704,9.263],
  'Birkenfeld':[48.907,8.660],'Kulmbach':[50.100,11.444],'Wasserburg am Inn':[48.062,12.236],
  'Lalling':[48.879,13.148],'Landau an der Isar':[48.667,12.692],'Fürstenfeldbruck':[48.178,11.235],
  'Bad Reichenhall':[47.730,12.876],'Schwabmünchen':[48.179,10.757],'Oberstdorf':[47.408,10.279],
  'Dinkelsbühl':[49.071,10.318],'Rothenburg':[49.378,10.186],'Rothenburg ob der Tauber':[49.378,10.186],
  'Geiselwind':[49.770,10.510],'Lichtenfels':[50.143,11.061],'Hirschaid':[49.929,10.993],
  'Ellingen':[49.068,10.971],'Eschenfelden':[49.493,11.771],'Kronach':[50.236,11.330],
  'Lauda-Königshofen':[49.569,9.706],'Andorf':[49.362,10.537],
  'Röttenbach':[49.607,10.941],'Langensendelbach':[49.627,11.039],
  'Langensendelbach bei Erlangen':[49.627,11.039],
  'Andorf bei Ansbach':[49.362,10.537],
  'Obernzenner See':[49.319,10.499],'Pilsach':[49.314,11.427],
  'Meier Hilzhof, Pilsach':[49.314,11.427],
  'Brombachsee':[49.112,10.847],'Brombachsee, Pleinfeld':[49.112,10.847],
  'Poppenhofer Weiher, Herzogenaurach':[49.556,10.879],
  // ── Nürnberg Locations (ohne Stadtteil) ──
  'Airport Nürnberg':[49.497,11.078],'Hafen Nürnberg-Süd':[49.408,11.059],
  'Nürnberger Altstadt':[49.455,11.078],'Katharinenruine, Nürnberg':[49.454,11.078],
  'Marienbergpark, Nürnberg':[49.461,11.017],'Stadionpark Nürnberg':[49.427,11.122],
  'Zeppelinfeld, Nürnberg':[49.423,11.122],'Pegnitzwiesen, Theodor-Heuss-Brücke':[49.453,11.063],
  'Bootshaus Nürnberg, Dutzendteich':[49.422,11.118],
  'Große Straße, Nürnberg':[49.426,11.126],
  'Kristall Palm Beach, Stein':[49.403,11.003],
  'Therme Erding':[48.310,11.920],
  'Design Offices, Königstorgraben 11, 5. OG':[49.447,11.078],
  'Nachtkind, Nürnberg':[49.446,11.080],
  'Nachtkind Nürnberg':[49.446,11.080],
  'Stadtpark Pavillon, Schwabach':[49.330,11.021],
  'Schwabach – Stadtpark':[49.330,11.021],
  'Forchheim – Kellerwald':[49.720,11.063],
  'Forchheim Kellerwald':[49.720,11.063],
  'Waldbad Neustadt/Aisch':[49.582,10.610],
  'Neustadt an der Aisch':[49.582,10.610],
  'Neustadt/Aisch':[49.582,10.610],
  'Cineplex Fürth':[49.477,10.988],
  'Fürth – Cineplex':[49.477,10.988],
  'PARKS Nürnberg':[49.460,11.090],
  'PARKS Nürnberg (Stadtpark, Berliner Platz 9)':[49.460,11.090],
  'Nürnberg – PARKS Stadtpark':[49.460,11.090],
  // ── München ──
  'München':[48.135,11.582],
  'München – Traumhänger Open Air':[48.135,11.582],
  // ── Weiter entfernt (Russian Events etc.) ──
  'Stuttgart':[48.776,9.182],'Stuttgart-Stammheim':[48.834,9.180],
  'Club Vivally, Stuttgart':[48.834,9.180],'Club Vivally Stuttgart':[48.834,9.180],
  'Dornstadt':[48.450,9.943],'Dornstadt bei Ulm':[48.450,9.943],
  'Club MEDUZA, Dornstadt':[48.450,9.943],'Club Meduza Dornstadt':[48.450,9.943],
  'Ulm':[48.401,9.987],
  'Straubing':[48.884,12.575],'Deggendorf':[48.840,12.961],'Büren':[51.551,8.561],
  'Gießen':[50.584,8.678],'Kassel':[51.312,9.481],
  'Osnabrück':[52.279,8.047],'Kiel':[54.323,10.123],
  'Leipzig':[51.340,12.373],'Cleebronn':[49.066,9.108],
  'Kaisersbach':[48.868,9.663],'Rammingen':[47.979,10.591],
  'Rust':[48.262,7.733],'Plohn':[50.540,12.342],
  'Lohr':[49.989,9.578],'Cham':[49.220,12.659],
  'Reisbach':[48.611,12.645],'Günzburg':[48.454,10.278],
  // ── Neu hinzugefügt KW 18 2026 ──
  'Abenberg':[49.253,10.907],'Pegnitz':[49.752,11.543],
  'Feuchtwangen':[49.168,10.322],'Eggolsheim':[49.757,10.963],
  // ── Neu hinzugefügt KW 19 2026 ──
  'Thalmässing':[49.077,11.212],'Höchstadt an der Aisch':[49.699,10.805],
  'Bad Windsheim':[49.500,10.416],'Ebern':[50.106,10.797],
  'Selb':[50.170,12.133],'Spalt':[49.171,10.929],
  // ── Neu hinzugefügt KW 20 2026 ──
  'Georgensgmünd':[49.203,11.013],'Am Bruckespan, Georgensgmünd':[49.203,11.013],
  'Meistersingerhalle Nürnberg':[49.428,11.092],
  'Orpheum Nürnberg':[49.455,11.064],
  'Stadthalle Fürth':[49.475,10.988],
  'Nürnberg – Meistersingerhalle':[49.428,11.092],
  'Fürth – Stadthalle':[49.475,10.988],
  // ── Neu hinzugefügt KW 21 2026 ──
  'Ottensoos':[49.524,11.328],
  'Behringersdorf':[49.476,11.218],
  'Schwarzenbruck':[49.370,11.225],
  'Hersbruck':[49.511,11.432],
  'Hersbruck – Altstadt':[49.511,11.432],
  'Volkach – Stadtallee':[49.865,10.222],
  'Würzburg – Weinberg am Stein':[49.796,9.915],
  'Würzburg – Marktplatz':[49.795,9.929],
};

const familyEvents = [
  {cat:'freizeit', name:'Playmobil FunPark Saison', loc:'Zirndorf – Playmobil Funpark', start:'2026-04-01', end:'2026-10-31', free:false, desc:'Der riesige Playmobil Spielpark für Kinder! Piratenschiff, Ritterburg, Wasserpark, Bauernhof in Lebensgröße. Perfekter Familienausflug direkt bei Nürnberg.', genre:'Freizeitpark / Kinder', ticket:'https://www.playmobil-funpark.de', outdoor:true, ageMin:0, price:'Kinder ab 3J: 14,90€, Erw: 5,50€', oepnv:'S-Bahn S1 nach Zirndorf', parking:'Vorhanden kostenlos'},
  {cat:'zoo', name:'Tiergarten Nürnberg – Sommersaison', loc:'Nürnberg – Tiergarten', start:'2026-04-01', end:'2026-10-31', free:false, desc:'Einer der schönsten Tiergärten Europas! Manatihaus, Delfine, Bauernhof, Wasserspielplatz, Riesenrutsche und Minibahn. Besondere Familienangebote das ganze Jahr.', genre:'Zoo / Familie', ticket:'https://tiergarten.nuernberg.de', outdoor:true, ageMin:0, price:'Kinder (4-13J): 7€, Erw: 16€', oepnv:'U2 bis Tiergarten', parking:'Vorhanden'},
  {cat:'zoo', name:'Tiergarten – Nacht der Tiere', loc:'Nürnberg – Tiergarten', start:'2026-07-11', end:'2026-07-11', free:false, desc:'Spannende Abendführung durch den beleuchteten Tiergarten. Tiere in der Dämmerung erleben – ein unvergessliches Erlebnis für die ganze Familie.', genre:'Zoo / Abendführung', ticket:'https://tiergarten.nuernberg.de', outdoor:true, ageMin:0, price:'Kinder: 5€, Erw: 12€', oepnv:'U2 bis Tiergarten', parking:'Vorhanden'},
  {cat:'zoo', name:'Tiergarten – Langer Zooabend', loc:'Nürnberg – Tiergarten', start:'2026-08-08', end:'2026-08-08', free:false, desc:'Verlängerter Öffnungsbetrieb mit Musik, Liveacts und besonderen Führungen am Abend. Sommerstimmung im Tiergarten für die ganze Familie.', genre:'Zoo / Familienevent', ticket:'https://tiergarten.nuernberg.de', outdoor:true, ageMin:0, price:'Normaler Eintrittspreis', oepnv:'U2 bis Tiergarten', parking:'Vorhanden'},
  {cat:'kinder', name:'Kinderkirchweih Schwabach', loc:'Schwabach – Innenstadt', start:'2026-07-10', end:'2026-07-12', free:true, desc:'Die Kinderkirchweih in Schwabach ist ein Kinderfest mit Fahrgeschäften, Spielen und Programm speziell für die Kleinen. Eintritt frei.', genre:'Kirchweih / Kinder', ticket:'', outdoor:true, ageMin:0, price:'Kostenlos', oepnv:'S-Bahn nach Schwabach', parking:'Innenstadt Parkhäuser'},
  {cat:'stadtfest', name:'Klassik Open Air – Familienkonzert', loc:'Nürnberg – Luitpoldhain', start:'2026-07-03', end:'2026-07-05', free:false, desc:'Das Klassik Open Air zählt zu den größten Freiluftkonzerten Europas. Familienfreundlich, mit großer Leinwand und Picknick-Atmosphäre. Staatsphilharmonie und Gäste.', genre:'Klassik / Open Air', ticket:'https://www.staatstheater-nuernberg.de', outdoor:true, ageMin:0, price:'Kostenlos (Picknickwiese) oder Tribüne ab 15€', oepnv:'U1 nach Messe', parking:'Messegelände'},
  {cat:'family', name:'Nürnberger Frühlingsfest', loc:'Nürnberg – Volksfestplatz (Dutzendteich)', start:'2026-04-04', end:'2026-04-26', free:true, desc:'Das Nürnberger Frühlingsfest mit Fahrgeschäften, Bierzelten und Familienangeboten. Auftakt der Volksfest-Saison in Nürnberg.', genre:'Volksfest', ticket:'', outdoor:true, ageMin:0, price:'Eintritt frei, Fahrgeschäfte kostenpflichtig', oepnv:'Tram/Bus zum Volksfestplatz', parking:'Vorhanden'},
  {cat:'family', name:'Nürnberger Herbstvolksfest', loc:'Nürnberg – Volksfestplatz', start:'2026-08-28', end:'2026-09-13', free:true, desc:'Das große Herbstvolksfest in Nürnberg mit Riesenrad, Fahrgeschäften, Bierzelten und Familienangeboten. Einer der Sommer-Abschluss-Highlights.', genre:'Volksfest', ticket:'', outdoor:true, ageMin:0, price:'Eintritt frei, Fahrgeschäfte kostenpflichtig', oepnv:'Tram/Bus zum Volksfestplatz', parking:'Vorhanden'},
  {cat:'family', name:'Augsburger Plärrer (Frühling)', loc:'Augsburg – Plärrergelände', start:'2026-04-05', end:'2026-04-19', free:true, desc:'Das größte Volksfest Schwabens! Der Augsburger Plärrer bietet Fahrgeschäfte, Festzelte und Familienangebote für alle. Zweimal jährlich.', genre:'Volksfest / Familie', ticket:'', outdoor:true, ageMin:0, price:'Eintritt frei', oepnv:'Straßenbahn nach Plärrer-Gelände', parking:'Vorhanden'},
  {cat:'kinder', name:'Kindertheater-Festival Nürnberg', loc:'Nürnberg – Stadttheater / Tafelhalle', start:'2026-06-06', end:'2026-06-21', free:false, desc:'Renommiertes Kindertheater-Festival mit nationalen und internationalen Produktionen für Kinder ab 3 Jahren. Workshops, Mitmachtheater und Aufführungen.', genre:'Theater / Kinder', ticket:'https://www.staatstheater-nuernberg.de', outdoor:false, ageMin:0, price:'Tickets ab 8€', oepnv:'U1 Hauptbahnhof', parking:'Innenstadt Parkhäuser'},
  {cat:'stadtfest', name:'Stadtparkfest Nürnberg', loc:'Nürnberg – Stadtpark', start:'2026-07-19', end:'2026-07-26', free:true, desc:'Wochenlang Musik, Kultur und Familienunterhaltung im Nürnberger Stadtpark. Konzerte auf der Open-Air-Bühne, Kinderprogramm und Gastronomie.', genre:'Stadtfest / Familie', ticket:'', outdoor:true, ageMin:0, price:'Kostenlos', oepnv:'U2 bis Aufseßplatz oder Tram 4', parking:'Begrenzt'},
  {cat:'family', name:'Regensburger Herbstdult', loc:'Regensburg – Dultplatz', start:'2026-08-28', end:'2026-09-13', free:true, desc:'Traditionsreiche Dult in Regensburg – eines der ältesten Volksfeste Bayerns mit Fahrgeschäften, Biergarten und Händlermarkt.', genre:'Volksfest / Tradition', ticket:'', outdoor:true, ageMin:0, price:'Eintritt frei', oepnv:'Bahn nach Regensburg Hbf', parking:'Vorhanden'},
  {cat:'kinder', name:'Frankenkids Familienfest', loc:'Nürnberg – Stadtgebiet (wechselnder Ort)', start:'2026-05-09', end:'2026-05-10', free:false, desc:'Das jährliche Familienfest von Frankenkids mit Mitmachaktionen, Kinderprogramm, Workshops und Spaß für die ganze Familie in der Metropolregion.', genre:'Familie / Kinder', ticket:'https://www.frankenkids.de', outdoor:true, ageMin:0, price:'Familienticket ca. 20€', oepnv:'Nürnberg ÖPNV je nach Ort', parking:'Je nach Ort'},
  {cat:'stadtfest', name:'Fürth feiert Vielfalt', loc:'Fürth – Stadtgebiet', start:'2026-04-24', end:'2026-05-10', free:true, desc:'Festival für alle in Fürth mit Vereinen und Einrichtungen. Buntes Stadtfest, Konzerte, Ausstellungen und Familienaktionen.', genre:'Stadtfest / Familie', ticket:'', outdoor:true, ageMin:0, price:'Kostenlos', oepnv:'U-Bahn nach Fürth Hauptbahnhof', parking:'Innenstadt Parkplätze'},

  {cat:'kinder', name:'Schwabacher Kinderkirchweih', loc:'Schwabach – Königsplatz', start:'2026-04-24', end:'2026-04-28', free:false, desc:'Fahrgeschäfte, Karussells und Programm für Kinder und Familien am Königsplatz. Freier Eintritt, Fahrpreise kostenpflichtig.', genre:'Kinderkirchweih / Familie', ticket:'', outdoor:true, ageMin:0, price:'Freier Eintritt, Fahrpreise kostenpflichtig', oepnv:'S-Bahn S1 bis Schwabach', parking:'Parkhäuser Innenstadt'},
  {cat:'freizeit', name:'Familien-Erlebnistag „Entdecke den Brombachsee"', loc:'Großer Brombachsee – Seezentren (Langlau & Zweiseenplatz Enderndorf)', start:'2026-04-26', end:'2026-04-26', free:true, desc:'Saisonstart am Brombachsee! Von 11:00–17:00 Uhr verwandeln sich die Seezentren in einen großen Abenteuerspielplatz. Aktivitäten: Bogenschießen, Stand Up Paddling, Schatzsuche, Erlebnis-Schatzkarte, Piratenschiff-Hüpfburg, Goldwäschestation und mehr. Das gesamte Freizeitangebot (Radeln, Wandern) ist an diesem Tag ideal nutzbar.', genre:'Familie / Outdoor', ticket:'https://www.brombachsee.de', outdoor:true, ageMin:0, price:'Kostenlos (Erlebnisstationen)', oepnv:'Mit dem Auto – Parkplätze an den Seezentren vorhanden', parking:'Vorhanden an Langlau & Enderndorf'},

  // ─── SPORT & ACTION ──────────────────────────────────────────────────────────
  {cat:'sport', name:'Spartan Race Munich', loc:'München', start:'2026-04-17', end:'2026-04-18', free:false, desc:'Spartan Race Trifecta Weekend in München – drei Distanzen (Sprint, Super, Beast) auf einer Strecke. Schlamm, Hindernisse, Teamspirit. Einer der härtesten OCR-Wettkämpfe der Welt.', genre:'OCR / Hindernislauf', ticket:'https://de.spartan.com', outdoor:true, ageMin:0, price:'Teilnehmergebühr', oepnv:'München ÖPNV', parking:'Vor Ort'},
  {cat:'sport', name:'Rats-Runners Emskirchen', loc:'Emskirchen', start:'2026-05-17', end:'2026-05-17', free:false, desc:'Hindernislauf der Rats-Runners Rennserie in Emskirchen. Schlamm, Wasser, Spaß für Einsteiger und Profis.', genre:'Hindernislauf / OCR', ticket:'https://rats-runners.de', outdoor:true, ageMin:0, price:'Teilnehmergebühr', oepnv:'Bahn nach Emskirchen', parking:'Vor Ort'},
  {cat:'sport', name:'Spartan Trifecta Weekend Kulmbach', loc:'Kulmbach', start:'2026-06-12', end:'2026-06-14', free:false, desc:'Spartan Trifecta Weekend in Kulmbach – alle drei Renndistanzen an einem Wochenende. Für alle, die die härteste Herausforderung suchen.', genre:'OCR / Hindernislauf', ticket:'https://de.spartan.com', outdoor:true, ageMin:0, price:'Teilnehmergebühr', oepnv:'Bahn nach Kulmbach', parking:'Vor Ort'},
  {cat:'sport', name:'Rats-Runners Sulzbach-Rosenberg', loc:'Sulzbach-Rosenberg', start:'2026-06-21', end:'2026-06-21', free:false, desc:'Hindernislauf der Rats-Runners Rennserie in Sulzbach-Rosenberg.', genre:'Hindernislauf / OCR', ticket:'https://rats-runners.de', outdoor:true, ageMin:0, price:'Teilnehmergebühr', oepnv:'Bahn nach Sulzbach-Rosenberg', parking:'Vor Ort'},
  {cat:'sport', name:'INN Run – OCR Hindernislauf', loc:'Passau', start:'2026-06-20', end:'2026-06-20', free:false, desc:'Der INN Run in Passau – Hindernislauf am Fluss Inn. Schlamm, Wasser und Action für die ganze Familie in schöner Landschaft.', genre:'Hindernislauf / OCR', ticket:'https://www.innrun.de', outdoor:true, ageMin:0, price:'Teilnehmergebühr', oepnv:'Bahn nach Passau Hbf', parking:'Vor Ort'},
  {cat:'sport', name:'XLETIX Challenge München-Erding', loc:'Erding (bei München)', start:'2026-07-18', end:'2026-07-18', free:false, desc:'XLETIX Challenge – einer der bekanntesten deutschen Hindernisläufe. Spaßbetonte Hindernisse, Team-Atmosphäre, für alle Fitnesslevel.', genre:'Hindernislauf / OCR', ticket:'https://www.xletix.com/events/muenchen-erding-2026', outdoor:true, ageMin:0, price:'Teilnehmergebühr', oepnv:'Bahn nach Erding', parking:'Vor Ort'},
  {cat:'sport', name:'XLETIX Kids Challenge München', loc:'Erding (bei München)', start:'2026-07-18', end:'2026-07-18', free:false, desc:'XLETIX Kids Challenge – der Hindernislauf speziell für Kinder! Spaßige, kindgerechte Hindernisse für kleine Abenteurer. Parallel zum XLETIX Challenge für Erwachsene.', genre:'Hindernislauf / Kinder / Sport', ticket:'https://www.xletix.com/events/muenchen-erding-2026', outdoor:true, ageMin:0, price:'Teilnehmergebühr', oepnv:'Bahn nach Erding', parking:'Vor Ort'},
  {cat:'sport', name:'Rock the Race', loc:'Würzburg', start:'2026-07-26', end:'2026-07-26', free:false, desc:'Rock the Race Würzburg – actionreicher Hindernislauf mit Musik und Partyatmosphäre. Für Einzelläufer und Teams.', genre:'Hindernislauf / Fun-Run', ticket:'https://rocktherace.de', outdoor:true, ageMin:0, price:'Teilnehmergebühr', oepnv:'Bahn nach Würzburg Hbf', parking:'Vor Ort'},
  {cat:'sport', name:'Rats-Runners Auhausen', loc:'Auhausen', start:'2026-08-02', end:'2026-08-02', free:false, desc:'Hindernislauf der Rats-Runners Rennserie in Auhausen.', genre:'Hindernislauf / OCR', ticket:'https://rats-runners.de', outdoor:true, ageMin:0, price:'Teilnehmergebühr', oepnv:'Mit dem Auto', parking:'Vor Ort'},
  {cat:'sport', name:'Muddy Angel Run München', loc:'Haar (bei München)', start:'2026-08-01', end:'2026-08-01', free:false, desc:'Der Muddy Angel Run – Europas größter Ladies Run! Spaß, Schlamm und Gemeinschaft für Frauen. Auch für Männer geöffnet als Supporter.', genre:'Hindernislauf / Ladies Run', ticket:'https://www.muddyangelrun.com', outdoor:true, ageMin:0, price:'Teilnehmergebühr', oepnv:'S-Bahn nach Haar', parking:'Vor Ort'},
  {cat:'sport', name:'Rats-Runners Weißenburg', loc:'Weißenburg i. Bay.', start:'2026-08-16', end:'2026-08-16', free:false, desc:'Hindernislauf der Rats-Runners Rennserie in Weißenburg i. Bay.', genre:'Hindernislauf / OCR', ticket:'https://rats-runners.de', outdoor:true, ageMin:0, price:'Teilnehmergebühr', oepnv:'Bahn nach Weißenburg', parking:'Vor Ort'},
  {cat:'sport', name:'Runterra – Im Zeichen des Phönix', loc:'Zirndorf', start:'2026-09-19', end:'2026-09-19', free:false, desc:'Runterra Hindernislauf in Zirndorf – Im Zeichen des Phönix. Mythenreiche Hindernisse und Teamgeist auf dem Parcours in Mittelfranken.', genre:'Hindernislauf / OCR', ticket:'https://www.runterra.de', outdoor:true, ageMin:0, price:'Teilnehmergebühr', oepnv:'S-Bahn S1 nach Zirndorf', parking:'Vor Ort'},

  // ─── MESSEN ──────────────────────────────────────────────────────────────────
  {cat:'messe', name:'IFH Intherm – Sanitär, Heizung, Gebäudetechnik', loc:'Nürnberg – Messe Nürnberg', start:'2026-04-14', end:'2026-04-17', free:false, desc:'Internationale Fachmesse für Sanitär, Heizung und Gebäudetechnik. Eine der wichtigsten Branchenmessen Deutschlands.', genre:'Fachmesse / SHK-Branche', ticket:'https://www.intherm.de', outdoor:false, ageMin:0, price:'Fachbesucher', oepnv:'U1 bis Messe', parking:'Messe Nürnberg'},
  {cat:'messe', name:'heise Jobs IT-Tag – IT & Karriere', loc:'München', start:'2026-04-15', end:'2026-04-15', free:false, desc:'IT- und Karrieremesse von heise: Direktkontakt zu Tech-Unternehmen, Vorträge und Networking für IT-Fachkräfte.', genre:'Karrieremesse / IT', ticket:'https://www.heisejobs.de', outdoor:false, ageMin:0, price:'Fachbesucher', oepnv:'München ÖPNV', parking:'Vor Ort'},
  {cat:'messe', name:'ARCHITECT@WORK – Architektur & Design', loc:'München', start:'2026-04-15', end:'2026-04-16', free:false, desc:'Fachmesse für Architekten und Planer mit innovativen Produkten und Materialien. Kompaktes Format mit persönlicher Beratung.', genre:'Fachmesse / Architektur', ticket:'https://www.architectatwork.de', outdoor:false, ageMin:0, price:'Fachbesucher', oepnv:'München ÖPNV', parking:'Vor Ort'},
  {cat:'messe', name:'AGRARSCHAU Allgäu – Landwirtschaft & Technik', loc:'Dietmannsried – Allgäu', start:'2026-04-16', end:'2026-04-20', free:false, desc:'Regionale Agrarmesse im Allgäu mit Landtechnik, Tierschau und Ausstellern aus der Landwirtschaft.', genre:'Fachmesse / Landwirtschaft', ticket:'', outdoor:true, ageMin:0, price:'Tagesticket', oepnv:'Bahn nach Dietmannsried', parking:'Messegelände'},
  {cat:'messe', name:'Bildungsmesse Inn-Salzach – Ausbildung & Beruf', loc:'Mühldorf a. Inn', start:'2026-04-17', end:'2026-04-18', free:true, desc:'Regionale Bildungs- und Karrieremesse für Ausbildungssuchende, Schüler und Berufswechsler in der Region Inn-Salzach.', genre:'Bildungsmesse / Karriere', ticket:'', outdoor:false, ageMin:0, price:'Kostenlos', oepnv:'Bahn nach Mühldorf', parking:'Vor Ort'},
  {cat:'messe', name:'Tattoo Convention Simbach', loc:'Simbach a. Inn', start:'2026-04-18', end:'2026-04-19', free:false, desc:'Tattoo-Convention mit nationalen und internationalen Künstlern. Live-Tätowierungen, Ausstellungen und Wettbewerbe.', genre:'Convention / Tattoo', ticket:'', outdoor:false, ageMin:18, price:'Tagesticket', oepnv:'Bahn nach Simbach', parking:'Vor Ort'},
  {cat:'messe', name:'LMU KarriereGipfel – Hochschul-Karrieremesse', loc:'München – LMU', start:'2026-04-21', end:'2026-04-21', free:true, desc:'Hochschul-Karrieremesse der LMU München: Arbeitgeber treffen Studierende und Absolventen. Networking, Bewerbungsgespräche, Vorträge.', genre:'Karrieremesse / Hochschule', ticket:'', outdoor:false, ageMin:0, price:'Kostenlos', oepnv:'U3/U6 bis Universität', parking:'Begrenzt'},
  {cat:'messe', name:'MMM-Messe – Versicherungen & Finanzdienstleistung', loc:'München – MOC', start:'2026-04-21', end:'2026-04-21', free:false, desc:'Fachmesse für Versicherungen und Finanzdienstleistungen im MOC München. Networking und Produktvorstellungen für Branchenprofis.', genre:'Fachmesse / Finance', ticket:'', outdoor:false, ageMin:0, price:'Fachbesucher', oepnv:'U2 bis Scheidplatz', parking:'MOC Parkhaus'},
  {cat:'messe', name:'vocatium Oberbayern – Ausbildung & Studium', loc:'Fürstenfeldbruck', start:'2026-04-21', end:'2026-04-22', free:true, desc:'Vertiefende Berufsorientierungsmesse mit Voranmeldung. Schüler treffen gezielt passende Aussteller für Ausbildung und Studium.', genre:'Bildungsmesse / Ausbildung', ticket:'', outdoor:false, ageMin:0, price:'Kostenlos', oepnv:'S4 bis Fürstenfeldbruck', parking:'Vor Ort'},
  {cat:'messe', name:'CONTACT – Recruitingmesse TH Ingolstadt', loc:'Ingolstadt', start:'2026-04-21', end:'2026-04-22', free:true, desc:'Karrieremesse der Technischen Hochschule Ingolstadt: Direktkontakt zu Unternehmen aus Technik, Wirtschaft und Informatik.', genre:'Karrieremesse / Technik', ticket:'', outdoor:false, ageMin:0, price:'Kostenlos', oepnv:'Bahn nach Ingolstadt Hbf', parking:'TH Ingolstadt'},
  {cat:'messe', name:'vocatium Mittelfranken', loc:'Erlangen', start:'2026-04-22', end:'2026-04-23', free:true, desc:'Vertiefende Berufsorientierungsmesse für Schüler in Mittelfranken. Persönliche Gesprächstermine mit regionalen Ausbildungsbetrieben.', genre:'Bildungsmesse / Ausbildung', ticket:'', outdoor:false, ageMin:0, price:'Kostenlos', oepnv:'Bahn nach Erlangen', parking:'Vor Ort'},
  {cat:'messe', name:'AZUBISpot – Azubi- & Karrieremesse', loc:'Aichach', start:'2026-04-22', end:'2026-04-22', free:true, desc:'Regionale Azubi- und Karrieremesse in Aichach: Unternehmen aus der Region stellen Ausbildungsplätze und duale Studienplätze vor.', genre:'Bildungsmesse / Ausbildung', ticket:'', outdoor:false, ageMin:0, price:'Kostenlos', oepnv:'Bahn nach Aichach', parking:'Vor Ort'},
  {cat:'messe', name:'akustika – Musik & Akustik', loc:'Nürnberg – Messe Nürnberg', start:'2026-04-24', end:'2026-04-26', free:false, desc:'Fachmesse für Musikinstrumente, HiFi, Akustik und professionelle Audiotechnik in Nürnberg.', genre:'Fachmesse / Musik & Audio', ticket:'https://www.akustika.de', outdoor:false, ageMin:0, price:'Tagesticket', oepnv:'U1 bis Messe', parking:'Messe Nürnberg'},
  {cat:'messe', name:'E-BIKE DAYS München', loc:'München – Olympiapark', start:'2026-04-24', end:'2026-04-26', free:false, desc:'Die E-Bike-Messe im Olympiapark München: Neuheiten testen, Hersteller treffen, Teststrecken und Rahmenprogramm.', genre:'Messe / E-Mobilität', ticket:'', outdoor:true, ageMin:0, price:'Tagesticket', oepnv:'U3 bis Olympiazentrum', parking:'Olympiapark'},
  {cat:'messe', name:'Ceramitec – Keramik-Industrie (international)', loc:'München – Messe München', start:'2026-04-24', end:'2026-04-26', free:false, desc:'Internationale Leitmesse der keramischen Industrie: Maschinen, Anlagen und Rohstoffe für die Keramik-Produktion weltweit.', genre:'Fachmesse / Industrie', ticket:'https://www.ceramitec.com', outdoor:false, ageMin:0, price:'Fachbesucher', oepnv:'U2 bis Messestadt West', parking:'Messe München'},
  {cat:'messe', name:'IFAT Munich – Umwelttechnologien (Weltleitmesse)', loc:'München – Messe München', start:'2026-05-04', end:'2026-05-08', free:false, desc:'Weltleitmesse für Wasser-, Abwasser-, Abfall- und Rohstoffwirtschaft. Über 3.000 Aussteller aus 60+ Ländern.', genre:'Weltleitmesse / Umwelttechnik', ticket:'https://www.ifat.de', outdoor:false, ageMin:0, price:'Fachbesucher', oepnv:'U2 bis Messestadt West', parking:'Messe München'},
  {cat:'messe', name:'Interzoo – Heimtierbranche (Weltleitmesse)', loc:'Nürnberg – Messe Nürnberg', start:'2026-05-12', end:'2026-05-15', free:false, desc:'Weltleitmesse der Heimtierbranche: Futter, Zubehör, Tierbedarf und Innovationen aus aller Welt. Nur für Fachbesucher.', genre:'Weltleitmesse / Heimtiere', ticket:'https://www.interzoo.com', outdoor:false, ageMin:0, price:'Fachbesucher', oepnv:'U1 bis Messe', parking:'Messe Nürnberg'},
  {cat:'messe', name:'Stone+tec – Naturstein & Technologien', loc:'Nürnberg – Messe Nürnberg', start:'2026-06-17', end:'2026-06-20', free:false, desc:'Internationale Fachmesse für Naturstein, Steintechnik und Steindesign. Bearbeitungsmaschinen, Werkzeuge und Designinspirationen.', genre:'Fachmesse / Bau & Design', ticket:'https://www.stone-tec.com', outdoor:false, ageMin:0, price:'Fachbesucher', oepnv:'U1 bis Messe', parking:'Messe Nürnberg'},
  {cat:'messe', name:'Intersolar Europe – Solar & Energie', loc:'München – Messe München', start:'2026-06-23', end:'2026-06-25', free:false, desc:'Weltweit führende Fachmesse für die Solarwirtschaft und Energiewende. Photovoltaik, Batteriespeicher, Solarwärme.', genre:'Fachmesse / Energie', ticket:'https://www.intersolar.de', outdoor:false, ageMin:0, price:'Fachbesucher', oepnv:'U2 bis Messestadt West', parking:'Messe München'},
  {cat:'messe', name:'GaLaBau – Garten-, Landschafts- & Sportplatzbau', loc:'Nürnberg – Messe Nürnberg', start:'2026-09-15', end:'2026-09-18', free:false, desc:'Internationale Fachmesse für Garten-, Landschafts- und Sportplatzbau. Maschinen, Pflanzen, Outdoor-Design.', genre:'Fachmesse / Garten & Landschaft', ticket:'https://www.galabau-messe.com', outdoor:false, ageMin:0, price:'Fachbesucher', oepnv:'U1 bis Messe', parking:'Messe Nürnberg'},
  {cat:'messe', name:'EXPO REAL – Internationale Immobilienmesse', loc:'München – Messe München', start:'2026-10-05', end:'2026-10-07', free:false, desc:'Europas größte Immobilienmesse: Investment, Stadtentwicklung, PropTech. 40.000+ Fachbesucher aus 70 Ländern.', genre:'Fachmesse / Immobilien', ticket:'https://www.exporeal.net', outdoor:false, ageMin:0, price:'Fachbesucher', oepnv:'U2 bis Messestadt West', parking:'Messe München'},
  {cat:'messe', name:'electronica – Elektronik (Weltleitmesse)', loc:'München – Messe München', start:'2026-11-10', end:'2026-11-13', free:false, desc:'Weltleitmesse der Elektronik: Halbleiter, Embedded Systems, Sensorik, KI-Hardware. Größte Elektronik-Messe der Welt.', genre:'Weltleitmesse / Elektronik', ticket:'https://www.electronica.de', outdoor:false, ageMin:0, price:'Fachbesucher', oepnv:'U2 bis Messestadt West', parking:'Messe München'},

  {cat:'kinder', name:'Kooles Kidz Kino (3K) – Cineplex Fürth', loc:'Fürth – Cineplex', start:'2026-06-07', end:'2026-06-07', free:false, desc:'Kooles Kidz Kino (3K) im Cineplex Fürth – immer am letzten Sonntag in den Ferien. Sonntag, 7. Juni, ab 10:00 Uhr. Kein 3D, reduzierte Lautstärke, ohne Werbung – perfekt für die Kleinsten. Filme: „Meine Freundin Conni – Abenteuer mit Kranich Klaus", „Jazzy – Chaos im Regenwald", „Tom & Jerry – Der verlorene Kompass" u.v.m. Tolles Rahmenprogramm: Glücksrad, Kinderschminken, Kinoquiz und vieles mehr.', genre:'Kinderkino / Familie', ticket:'https://www.cineplex.de', new:true, outdoor:false, ageMin:0, price:'5€ Onlineticket / 6€ Kinokasse', oepnv:'U1 Fürth Hauptbahnhof, kurzer Fußweg', parking:'Parkhaus City-Center Fürth'},

  // ── KW 20 2026 – Russische Kulturevents (Family) ──
  {cat:'family', name:'Spektakl „Skameika" – Russisches Theater', loc:'Nürnberg – Meistersingerhalle', start:'2026-05-29', end:'2026-05-29', free:false, desc:'„Skameika" (Die Bank) von Alexander Gelmann – legendäres Kammerstück auf der deutschen Bühne. Über Liebe, Einsamkeit und Sehnsucht nach menschlicher Nähe. Russischsprachige Aufführung. 19:30 Uhr, Meistersingerhalle Nürnberg.', genre:'Russisches Theater / Drama', ticket:'https://nuernberg24.ru/en/event', outdoor:false, ageMin:14, price:'Tickets via nuernberg24.ru', oepnv:'U2 bis Messe/Stadion oder Tram 9', parking:'Parkplatz Meistersingerhalle'},
  {cat:'family', name:'Irina Prikhodko – Stand-up „Mein Tag"', loc:'Orpheum Nürnberg', start:'2026-05-29', end:'2026-05-29', free:false, desc:'Irina Prikhodko auf Europatournee mit der Premiere ihres deutschen Stand-up-Programms „Mein Tag" – über das Leben im Ausland, Sprachen und Kulturunterschiede. 20:00 Uhr, Orpheum Nürnberg.', genre:'Russischer Stand-up / Comedy', ticket:'https://nuernberg24.ru/en/event/9531', outdoor:false, ageMin:16, price:'Tickets via nuernberg24.ru', oepnv:'U1 Hauptbahnhof oder Tram 4', parking:'Parkhaus Hauptbahnhof'},
  {cat:'family', name:'„Abendessen für Idioten" – Russisches Theater', loc:'Fürth – Stadthalle', start:'2026-06-01', end:'2026-06-01', free:false, desc:'Komödie „Abendessen für Idioten" nach Francis Véber – kultige russische Comedy-Aufführung mit internationalem Ensemble. 19:00 Uhr, Stadthalle Fürth.', genre:'Russisches Theater / Komödie', ticket:'https://nuernberg24.ru/en/event/9423', outdoor:false, ageMin:14, price:'Tickets via nuernberg24.ru', oepnv:'U1 Fürth Hauptbahnhof, 5 min Fußweg', parking:'Parkhaus Fürth Innenstadt'},
  {cat:'family', name:'Лучшие песни группы „КИНО" – Symphonic Concert', loc:'Fürth – Stadthalle', start:'2026-12-03', end:'2026-12-03', free:false, desc:'Die besten Songs der Kultband „KINO" (Viktor Tsoi) mit dem Tschechischen Symphonieorchester (Czech Live Symphony Orchestra). Ein unvergesslicher Abend für alle Fans russischer Rockmusik. 20:00 Uhr, Stadthalle Fürth.', genre:'Russische Rockmusik / Symphoniekonzert', ticket:'https://nuernberg24.ru/en/event/9187', outdoor:false, ageMin:0, price:'Tickets via nuernberg24.ru', oepnv:'U1 Fürth Hauptbahnhof, 5 min Fußweg', parking:'Parkhaus Fürth Innenstadt'},
  {cat:'family', name:'Theatre The Chaika – Festliches Programm', loc:'Fürth – Stadthalle', start:'2026-12-14', end:'2026-12-14', free:false, desc:'Theatre THE CHAIKA lädt ein zu einer lebhaften Aufführung mit festlicher Atmosphäre – ein wunderbarer Abend für die ganze Familie vor den Feiertagen. 19:30 Uhr, Stadthalle Fürth.', genre:'Russisches Theater / Familie', ticket:'https://nuernberg24.ru/en/event/9442', outdoor:false, ageMin:0, price:'Tickets via nuernberg24.ru', oepnv:'U1 Fürth Hauptbahnhof, 5 min Fußweg', parking:'Parkhaus Fürth Innenstadt'},

  {cat:'stadtfest', name:'Trempelmarkt Nürnberg (Frühjahr)', loc:'Nürnberg – Altstadt', start:'2026-05-08', end:'2026-05-09', free:true, desc:'Nürnbergs größter Flohmarkt in der Altstadt – Tausende Stände, Raritäten, Vintage und Trödelschätze. Zweimal im Jahr, Eintritt frei!', genre:'Markt / Flohmarkt', ticket:'https://www.nuernberg.de', outdoor:true, ageMin:0, price:'Kostenlos', oepnv:'U1/U2 Hauptbahnhof', parking:'Altstadt Parkhäuser'},
  {cat:'sport', name:'Norisring DTM-Rennen', loc:'Nürnberg – Norisring', start:'2026-07-03', end:'2026-07-05', free:false, desc:'Das Norisring-Rennen – Deutschlands einziges innerstädtisches Motorsportevent. DTM auf historischer Strecke am Dutzendteich direkt in der Stadt.', genre:'Motorsport / DTM', ticket:'https://www.norisring.de', outdoor:true, ageMin:0, price:'ab ca. 25€ Tagesticket', oepnv:'U1 bis Frankenstraße', parking:'Begrenzt, ÖPNV empfohlen'},
  {cat:'stadtfest', name:'CSD Nürnberg – Pride Weeks', loc:'Nürnberg – Innenstadt', start:'2026-07-22', end:'2026-08-09', free:true, desc:'Nürnbergs Christopher Street Day – 3 Wochen Pride-Programm, Partys, Kultur und Demo-Umzug durch die Innenstadt. Eintritt frei!', genre:'CSD / Pride / Kultur', ticket:'https://www.csd-nuernberg.de', outdoor:true, ageMin:0, price:'Kostenlos', oepnv:'U1/U2 Hauptbahnhof', parking:'Altstadt Parkhäuser'},
  {cat:'stadtfest', name:'Trempelmarkt Nürnberg (Herbst)', loc:'Nürnberg – Altstadt', start:'2026-09-11', end:'2026-09-12', free:true, desc:'Zweiter Trempelmarkt des Jahres – Nürnbergs großer Herbst-Flohmarkt in der Altstadt mit Tausenden Ständen. Eintritt frei!', genre:'Markt / Flohmarkt', ticket:'https://www.nuernberg.de', outdoor:true, ageMin:0, price:'Kostenlos', oepnv:'U1/U2 Hauptbahnhof', parking:'Altstadt Parkhäuser'},
  {cat:'stadtfest', name:'Nürnberg Digital Festival – Recode the Future', loc:'Nürnberg – Metropolregion (100+ Locations)', start:'2026-06-22', end:'2026-07-02', free:true, desc:'14. Ausgabe des NUEDIGITAL Festivals – 11 Tage KI, Cybersecurity, New Work, Digital Health und Start-ups in über 100 Locations in der Metropolregion Nürnberg. Viele Events kostenlos und offen für alle.', genre:'Digital / Tech / Innovation', ticket:'https://nuernberg.digital', outdoor:false, ageMin:0, price:'Viele Events kostenlos', oepnv:'ÖPNV Nürnberg Innenstadt', parking:'Altstadt-Parkhäuser'},
  {cat:'sport', name:'Sparkassen Metropolmarathon', loc:'Fürth → Nürnberg (Hauptmarkt)', start:'2026-06-13', end:'2026-06-14', free:true, desc:'Lauffestival von Fürth nach Nürnberg! Sa: Pillenstein KidsMarathon. So (14.6.): Marathon, Halbmarathon, AEG 10K-Run und Nordic Walking – Ziel am Nürnberger Hauptmarkt. Anmeldung auf metropolmarathon.de.', genre:'Sport / Marathon', ticket:'https://metropolmarathon.de', outdoor:true, ageMin:0, price:'Anmeldung erforderlich (Zuschauer kostenlos)', oepnv:'U1/U2 bis Hauptmarkt', parking:'Innenstadt Parkhäuser'},
];


const events = [
  // ─── BIERFESTE ───────────────────────────────────────────────────────────
  {cat:'volksfest', name:'Erlanger Bergkirchweih', loc:'Erlangen – An den Kellern', start:'2026-05-21', end:'2026-06-01', free:true, desc:'Das älteste Bierfest der Welt – 12 Tage unter den Linden, ~1 Mio. Besucher. Eintritt frei!', genre:'Bier / Tradition', ticket:'https://www.erlangen.de/themenseite/thema/bergkirchweih', outdoor:true, ageMin:0, price:'Kostenlos', oepnv:'Bus & Bahn bis Erlangen Hbf, dann 10 min Fußweg', parking:'Begrenzt – ÖPNV empfohlen'},
  {cat:'volksfest', name:'Fränkisches Bierfest', loc:'Nürnberg – Burggraben', start:'2026-06-03', end:'2026-06-07', free:true, desc:'Über 40 Brauereien, 100+ Biersorten im längsten Biergarten Europas. Eintritt frei! 5 Bühnen.', genre:'Bierfest', ticket:'https://www.bierfest-franken.de', outdoor:true, ageMin:0, price:'Kostenlos', oepnv:'U1 bis Lorenzkirche, dann 10 min Fußweg über Hauptmarkt', parking:'Altstadt Parkhäuser in der Nähe'},
  {cat:'volksfest', name:'Feuchter Kirchweih', loc:'Feucht (Nürnberger Land)', start:'2026-07-17', end:'2026-07-22', free:false, desc:'6 Tage Bierzelt, Blasmusik & Fahrgeschäfte. Bieranstich durch Bgm. Kotzur.', genre:'Bier / Kirchweih', ticket:'', outdoor:true, ageMin:0, price:'Freier Eintritt, Verzehr kostenpflichtig', oepnv:'S-Bahn S2 bis Feucht', parking:'Vorhanden am Festplatz'},
  {cat:'volksfest', name:'Rother Kirchweih', loc:'Roth', start:'2026-08-07', end:'2026-08-11', free:false, desc:'Erstmals 1531 erwähnt – 5 Tage Festzelt mit Feuerwerk am Ende.', genre:'Bier / Tradition', ticket:'', outdoor:true, ageMin:0, price:'Freier Eintritt, Verzehr kostenpflichtig', oepnv:'S-Bahn S1 bis Roth Bahnhof', parking:'Parkplätze am Festgelände'},

  // ─── GROSSE VOLKSSEFTE ───────────────────────────────────────────────────
  {cat:'volksfest', name:'Michaelis-Kirchweih Fürth', loc:'Fürth – Innenstadt', start:'2026-10-03', end:'2026-10-14', free:true, desc:'Königin der fränkischen Kirchweihen – 900+ Jahre, Süddeutschlands größte Straßenkirchweih. Erntedankfestzug 11. Oktober. Eintritt frei!', genre:'Volksfest', ticket:'https://www.fuerth.de/kultur-freizeit/veranstaltungen-termine/michaelis-kirchweih/', outdoor:true, ageMin:0, price:'Kostenlos', oepnv:'U-Bahn U1 bis Fürth Hauptbahnhof', parking:'Kärwa-Ticket gilt als VGN-Ticket'},

  // ─── NÜRNBERG STADTTEIL-KÄRWAS ───────────────────────────────────────────
  {cat:'volksfest', name:'Schweinau Kirchweih', loc:'Nürnberg-Schweinau', start:'2026-05-14', end:'2026-05-18', free:true, desc:'Traditionelle Stadtteil-Kärwa.', genre:'Kärwa', outdoor:true, ageMin:0, price:'Kostenlos', oepnv:'U-Bahn U2/U3 Richtung Schweinau', parking:'Straße'},
  {cat:'volksfest', name:'Kleinreuth h.d.V. Kirchweih', loc:'Nürnberg-Kleinreuth', start:'2026-05-14', end:'2026-05-17', free:true, desc:'', genre:'Kärwa', outdoor:true, ageMin:0, price:'Kostenlos', oepnv:'Bus ab Nürnberg Hbf', parking:'Straße'},
  {cat:'volksfest', name:'Mögeldorf Kirchweih', loc:'Nürnberg-Mögeldorf', start:'2026-05-21', end:'2026-05-24', free:true, desc:'', genre:'Kärwa', outdoor:true, ageMin:0, price:'Kostenlos', oepnv:'Tram 8 bis Mögeldorf', parking:'Straße'},
  {cat:'volksfest', name:'Laufamholz Kirchweih', loc:'Nürnberg-Laufamholz', start:'2026-05-22', end:'2026-05-26', free:true, desc:'', genre:'Kärwa', outdoor:true, ageMin:0, price:'Kostenlos', oepnv:'S-Bahn S3 bis Laufamholz', parking:'Straße'},
  {cat:'volksfest', name:'Zerzabelshof Kirchweih', loc:'Nürnberg-Zerzabelshof', start:'2026-05-22', end:'2026-05-25', free:true, desc:'', genre:'Kärwa', outdoor:true, ageMin:0, price:'Kostenlos', oepnv:'Tram bis Zerzabelshof', parking:'Straße'},
  {cat:'volksfest', name:'Gostenhof Kirchweih', loc:'Nürnberg-Gostenhof', start:'2026-05-29', end:'2026-06-02', free:true, desc:'', genre:'Kärwa', outdoor:true, ageMin:0, price:'Kostenlos', oepnv:'U-Bahn U3 bis Gostenhof', parking:'Begrenzt'},
  {cat:'volksfest', name:'Kirchweih Wachendorf', loc:'Cadolzburg-Wachendorf', start:'2026-05-29', end:'2026-06-01', free:true, desc:'', genre:'Kärwa', outdoor:true, ageMin:0, price:'Kostenlos', oepnv:'S-Bahn S4 bis Cadolzburg', parking:'Vorhanden'},
  {cat:'volksfest', name:'Nordostbahnhof Kirchweih', loc:'Nürnberg-Schoppershof', start:'2026-06-04', end:'2026-06-08', free:true, desc:'', genre:'Kärwa', outdoor:true, ageMin:0, price:'Kostenlos', oepnv:'U-Bahn U1 bis Schoppershof', parking:'Straße'},
  {cat:'volksfest', name:'Kirchweih Röttenbach', loc:'Röttenbach (Lkr. Roth)', start:'2026-06-12', end:'2026-06-15', free:true, desc:'', genre:'Kärwa', outdoor:true, ageMin:0, price:'Kostenlos', oepnv:'S-Bahn S1 Richtung Roth', parking:'Vorhanden'},
  {cat:'volksfest', name:'Kirchweih Pfaffenhofen', loc:'Roth-Pfaffenhofen', start:'2026-06-12', end:'2026-06-15', free:true, desc:'', genre:'Kärwa', outdoor:true, ageMin:0, price:'Kostenlos', oepnv:'Bus ab Roth Bahnhof', parking:'Vorhanden'},
  {cat:'volksfest', name:'Großreuth h.d.V. Kirchweih', loc:'Nürnberg-Großreuth', start:'2026-06-12', end:'2026-06-15', free:true, desc:'', genre:'Kärwa', outdoor:true, ageMin:0, price:'Kostenlos', oepnv:'U-Bahn U2 Richtung Röthenbach', parking:'Straße'},
  {cat:'volksfest', name:'Cadolzburger Kirchweih', loc:'Cadolzburg', start:'2026-06-18', end:'2026-06-24', free:true, desc:'Betzntanz, Brühtrogrennen am Bauhofweiher, Bieranstich.', genre:'Kärwa', outdoor:true, ageMin:0, price:'Kostenlos', oepnv:'S-Bahn S4 bis Cadolzburg', parking:'Parkplätze im Ort'},
  {cat:'volksfest', name:'Eibach Kirchweih', loc:'Nürnberg-Eibach', start:'2026-06-19', end:'2026-06-23', free:true, desc:'', genre:'Kärwa', outdoor:true, ageMin:0, price:'Kostenlos', oepnv:'U-Bahn U2 bis Eibach', parking:'Straße'},
  {cat:'volksfest', name:'St. Johannis Kirchweih', loc:'Nürnberg-St. Johannis', start:'2026-06-19', end:'2026-06-23', free:true, desc:'21. Juni: Führungen & Ausstellungen im Barockgarten.', genre:'Kärwa', outdoor:true, ageMin:0, price:'Kostenlos', oepnv:'U-Bahn U1 bis Gostenhof', parking:'Begrenzt'},
  {cat:'volksfest', name:'Großreuth b. Schweinau Kirchweih', loc:'Nürnberg', start:'2026-06-19', end:'2026-06-22', free:true, desc:'', genre:'Kärwa', outdoor:true, ageMin:0, price:'Kostenlos', oepnv:'U-Bahn U2/U3', parking:'Straße'},
  {cat:'volksfest', name:'Lohe Kirchweih', loc:'Nürnberg-Lohe', start:'2026-06-19', end:'2026-06-22', free:true, desc:'', genre:'Kärwa', outdoor:true, ageMin:0, price:'Kostenlos', oepnv:'Bus ab Nürnberg', parking:'Straße'},
  {cat:'volksfest', name:'Kirchweih Wolkersdorf', loc:'Schwabach-Wolkersdorf', start:'2026-06-26', end:'2026-06-29', free:true, desc:'', genre:'Kärwa', outdoor:true, ageMin:0, price:'Kostenlos', oepnv:'S-Bahn bis Schwabach, dann Bus', parking:'Vorhanden'},
  {cat:'volksfest', name:'Gebersdorf Kirchweih', loc:'Nürnberg-Gebersdorf', start:'2026-06-25', end:'2026-06-29', free:true, desc:'', genre:'Kärwa', outdoor:true, ageMin:0, price:'Kostenlos', oepnv:'U-Bahn U2 bis Gebersdorf', parking:'Straße'},
  {cat:'volksfest', name:'Gartenstadt Kirchweih', loc:'Nürnberg-Gartenstadt', start:'2026-06-26', end:'2026-06-30', free:true, desc:'', genre:'Kärwa', outdoor:true, ageMin:0, price:'Kostenlos', oepnv:'U-Bahn U3 bis Gartenstadt', parking:'Straße'},
  {cat:'volksfest', name:'Kirchweih Sack', loc:'Fürth-Sack', start:'2026-06-27', end:'2026-06-30', free:true, desc:'', genre:'Kärwa', outdoor:true, ageMin:0, price:'Kostenlos', oepnv:'U-Bahn U1 Richtung Fürth', parking:'Straße'},
  {cat:'volksfest', name:'Kornburg Kärwa', loc:'Nürnberg-Kornburg', start:'2026-07-03', end:'2026-07-06', free:true, desc:'Großer Umzug, Bieranstich mit OB, Trembalesmarkt.', genre:'Kärwa', outdoor:true, ageMin:0, price:'Kostenlos', oepnv:'Bus 60 ab Langwasser Süd', parking:'Vorhanden'},
  {cat:'volksfest', name:'Kirchweih Dietersdorf', loc:'Schwabach-Dietersdorf', start:'2026-07-03', end:'2026-07-06', free:true, desc:'', genre:'Kärwa', outdoor:true, ageMin:0, price:'Kostenlos', oepnv:'Bus ab Schwabach', parking:'Vorhanden'},
  {cat:'volksfest', name:'Schniegling Kirchweih', loc:'Nürnberg-Schniegling', start:'2026-07-03', end:'2026-07-06', free:true, desc:'', genre:'Kärwa', outdoor:true, ageMin:0, price:'Kostenlos', oepnv:'Bus ab Nürnberg Hbf', parking:'Straße'},
  {cat:'volksfest', name:'Wetzendorf Kirchweih', loc:'Nürnberg-Wetzendorf', start:'2026-07-03', end:'2026-07-07', free:true, desc:'', genre:'Kärwa', outdoor:true, ageMin:0, price:'Kostenlos', oepnv:'U-Bahn U3 bis Wetzendorf', parking:'Straße'},
  {cat:'volksfest', name:'Sommerfest Hardhöhe', loc:'Fürth-Hardhöhe', start:'2026-07-04', end:'2026-07-08', free:true, desc:'', genre:'Kärwa', outdoor:true, ageMin:0, price:'Kostenlos', oepnv:'Bus ab Fürth Hbf', parking:'Straße'},
  {cat:'volksfest', name:'Almoshof Kirchweih', loc:'Nürnberg-Almoshof', start:'2026-07-10', end:'2026-07-14', free:true, desc:'Bekannt für Umzüge mit geschmückten Pferdekutschen.', genre:'Kärwa', outdoor:true, ageMin:0, price:'Kostenlos', oepnv:'Bus ab Nürnberg Hbf', parking:'Vorhanden'},
  {cat:'volksfest', name:'Altenfurt Kirchweih', loc:'Nürnberg-Altenfurt', start:'2026-07-10', end:'2026-07-14', free:true, desc:'', genre:'Kärwa', outdoor:true, ageMin:0, price:'Kostenlos', oepnv:'U-Bahn U1 bis Langwasser Süd', parking:'Straße'},
  {cat:'volksfest', name:'Buch Kirchweih', loc:'Nürnberg-Buch', start:'2026-07-10', end:'2026-07-15', free:true, desc:'', genre:'Kärwa', outdoor:true, ageMin:0, price:'Kostenlos', oepnv:'Tram 9 Richtung Buch', parking:'Straße'},
  {cat:'volksfest', name:'Oberasbacher Kirchweih', loc:'Oberasbach', start:'2026-07-10', end:'2026-07-13', free:true, desc:'Kein Mitbringen von Alkohol erlaubt (städtische Verordnung).', genre:'Kärwa', outdoor:true, ageMin:0, price:'Kostenlos', oepnv:'Bus 96 ab Zirndorf', parking:'Vorhanden'},
  {cat:'volksfest', name:'Kirchweih Ruppmannsburg', loc:'Roth-Ruppmannsburg', start:'2026-07-10', end:'2026-07-13', free:true, desc:'', genre:'Kärwa', outdoor:true, ageMin:0, price:'Kostenlos', oepnv:'S-Bahn S1 bis Roth, dann Bus', parking:'Vorhanden'},
  {cat:'volksfest', name:'Steiner Kirchweih', loc:'Stein', start:'2026-07-10', end:'2026-07-13', free:true, desc:'', genre:'Kärwa', outdoor:true, ageMin:0, price:'Kostenlos', oepnv:'S-Bahn S4 bis Stein', parking:'Vorhanden'},
  {cat:'volksfest', name:'Brunn Kirchweih', loc:'Nürnberg-Brunn', start:'2026-07-14', end:'2026-07-27', free:true, desc:'', genre:'Kärwa', outdoor:true, ageMin:0, price:'Kostenlos', oepnv:'Bus ab Nürnberg', parking:'Straße'},
  {cat:'volksfest', name:'Kirchweih Unterreichenbach', loc:'Schwabach-Unterreichenbach', start:'2026-07-17', end:'2026-07-20', free:true, desc:'', genre:'Kärwa', outdoor:true, ageMin:0, price:'Kostenlos', oepnv:'Bus ab Schwabach Bahnhof', parking:'Vorhanden'},
  {cat:'volksfest', name:'Altenberger Kirchweih', loc:'Oberasbach-Altenberg', start:'2026-07-17', end:'2026-07-21', free:true, desc:'Kein Mitbringen von Alkohol erlaubt.', genre:'Kärwa', outdoor:true, ageMin:0, price:'Kostenlos', oepnv:'Bus ab Zirndorf', parking:'Vorhanden'},
  {cat:'volksfest', name:'Boxdorf Kirchweih', loc:'Nürnberg-Boxdorf', start:'2026-07-17', end:'2026-07-21', free:true, desc:'', genre:'Kärwa', outdoor:true, ageMin:0, price:'Kostenlos', oepnv:'Bus ab Nürnberg Nord', parking:'Vorhanden'},
  {cat:'volksfest', name:'Buchenbühl Kirchweih', loc:'Nürnberg-Buchenbühl', start:'2026-07-17', end:'2026-07-20', free:true, desc:'', genre:'Kärwa', outdoor:true, ageMin:0, price:'Kostenlos', oepnv:'Tram 9 Richtung Buch', parking:'Straße'},
  {cat:'volksfest', name:'Mühlhof Kirchweih', loc:'Nürnberg-Mühlhof', start:'2026-07-17', end:'2026-07-21', free:true, desc:'', genre:'Kärwa', outdoor:true, ageMin:0, price:'Kostenlos', oepnv:'U-Bahn U3 Richtung Gebersdorf', parking:'Straße'},
  {cat:'volksfest', name:'Kirchweih Eigenes Heim', loc:'Fürth-Eigenes Heim', start:'2026-07-18', end:'2026-07-21', free:true, desc:'', genre:'Kärwa', outdoor:true, ageMin:0, price:'Kostenlos', oepnv:'Bus ab Fürth Hbf', parking:'Straße'},
  {cat:'volksfest', name:'Kirchweih Mosbach', loc:'Roth-Mosbach', start:'2026-07-24', end:'2026-07-26', free:true, desc:'', genre:'Kärwa', outdoor:true, ageMin:0, price:'Kostenlos', oepnv:'S-Bahn S1 bis Roth, dann Bus', parking:'Vorhanden'},
  {cat:'volksfest', name:'Unterasbacher Kirchweih', loc:'Oberasbach-Unterasbach', start:'2026-07-24', end:'2026-07-27', free:true, desc:'Kein Mitbringen von Alkohol erlaubt.', genre:'Kärwa', outdoor:true, ageMin:0, price:'Kostenlos', oepnv:'Bus ab Zirndorf', parking:'Vorhanden'},
  {cat:'volksfest', name:'Reichelsdorf Kirchweih', loc:'Nürnberg-Reichelsdorf', start:'2026-07-24', end:'2026-07-28', free:true, desc:'', genre:'Kärwa', outdoor:true, ageMin:0, price:'Kostenlos', oepnv:'U-Bahn U2 bis Eibach', parking:'Straße'},
  {cat:'volksfest', name:'Ziegelstein Kirchweih', loc:'Nürnberg-Ziegelstein', start:'2026-07-24', end:'2026-08-02', free:true, desc:'Zwei Festwochenenden.', genre:'Kärwa', outdoor:true, ageMin:0, price:'Kostenlos', oepnv:'U-Bahn U1 bis Ziegelstein', parking:'Straße'},
  {cat:'volksfest', name:'Kirchweih Ronhof', loc:'Fürth-Ronhof', start:'2026-07-25', end:'2026-07-28', free:true, desc:'', genre:'Kärwa', outdoor:true, ageMin:0, price:'Kostenlos', oepnv:'U-Bahn U1 Richtung Fürth', parking:'Straße'},
  {cat:'volksfest', name:'Kirchweih Burgfarrnbach', loc:'Fürth-Burgfarrnbach', start:'2026-07-25', end:'2026-07-29', free:true, desc:'', genre:'Kärwa', outdoor:true, ageMin:0, price:'Kostenlos', oepnv:'Bus ab Fürth Hbf', parking:'Vorhanden'},
  {cat:'volksfest', name:'Kirchweih Limbach', loc:'Schwabach-Limbach', start:'2026-07-31', end:'2026-08-03', free:true, desc:'', genre:'Kärwa', outdoor:true, ageMin:0, price:'Kostenlos', oepnv:'Bus ab Schwabach Bahnhof', parking:'Vorhanden'},
  {cat:'volksfest', name:'Fischbach Kirchweih', loc:'Nürnberg-Fischbach', start:'2026-07-31', end:'2026-08-03', free:true, desc:'30-Meter-Kärwabaum per Muskelkraft aufgestellt!', genre:'Kärwa', outdoor:true, ageMin:0, price:'Kostenlos', oepnv:'Tram 9 Richtung Fischbach', parking:'Straße'},
  {cat:'volksfest', name:'Worzeldorf Kirchweih', loc:'Nürnberg-Worzeldorf', start:'2026-07-31', end:'2026-08-04', free:true, desc:'', genre:'Kärwa', outdoor:true, ageMin:0, price:'Kostenlos', oepnv:'U-Bahn U2 bis Eibach, dann Bus', parking:'Straße'},
  {cat:'volksfest', name:'Katzwang Kirchweih', loc:'Nürnberg-Katzwang', start:'2026-08-06', end:'2026-08-10', free:true, desc:'Berühmt für das Sautrogrennen auf der Rednitz.', genre:'Kärwa', outdoor:true, ageMin:0, price:'Kostenlos', oepnv:'S-Bahn S1 bis Katzwang', parking:'Vorhanden'},
  {cat:'volksfest', name:'Großgründlach Kirchweih', loc:'Nürnberg-Großgründlach', start:'2026-08-07', end:'2026-08-11', free:true, desc:'', genre:'Kärwa', outdoor:true, ageMin:0, price:'Kostenlos', oepnv:'Bus ab Nürnberg Nord', parking:'Vorhanden'},
  {cat:'volksfest', name:'Langwasser Kirchweih', loc:'Nürnberg-Langwasser', start:'2026-08-07', end:'2026-08-10', free:true, desc:'', genre:'Kärwa', outdoor:true, ageMin:0, price:'Kostenlos', oepnv:'U-Bahn U1 bis Langwasser Süd', parking:'Vorhanden'},
  {cat:'volksfest', name:'Höfles Kirchweih', loc:'Nürnberg-Höfles', start:'2026-08-07', end:'2026-08-10', free:true, desc:'', genre:'Kärwa', outdoor:true, ageMin:0, price:'Kostenlos', oepnv:'Bus ab Nürnberg', parking:'Straße'},
  {cat:'volksfest', name:'Kirchweih Unterfarrnbach', loc:'Fürth-Unterfarrnbach', start:'2026-08-08', end:'2026-08-12', free:true, desc:'', genre:'Kärwa', outdoor:true, ageMin:0, price:'Kostenlos', oepnv:'Bus ab Fürth Hbf', parking:'Straße'},
  {cat:'volksfest', name:'Kirchweih Leerstetten', loc:'Roth-Leerstetten', start:'2026-08-21', end:'2026-08-24', free:true, desc:'', genre:'Kärwa', outdoor:true, ageMin:0, price:'Kostenlos', oepnv:'S-Bahn bis Roth, dann Bus', parking:'Vorhanden'},
  {cat:'volksfest', name:'Wöhrd Kirchweih', loc:'Nürnberg-Wöhrd', start:'2026-08-21', end:'2026-08-25', free:true, desc:'', genre:'Kärwa', outdoor:true, ageMin:0, price:'Kostenlos', oepnv:'Tram 8 bis Wöhrd', parking:'Begrenzt'},
  {cat:'volksfest', name:'Zirndorfer Kirchweih', loc:'Zirndorf', start:'2026-08-21', end:'2026-08-25', free:true, desc:'5 Tage – Festzug Sa. 14 Uhr, Feuerwerk Di. 22 Uhr. 10. Jubiläum!', genre:'Kärwa', outdoor:true, ageMin:0, price:'Kostenlos', oepnv:'S-Bahn S4 bis Zirndorf', parking:'Innenstadt-Parkhäuser'},
  {cat:'volksfest', name:'Rehdorfer Kirchweih', loc:'Oberasbach-Rehdorf', start:'2026-08-28', end:'2026-08-31', free:true, desc:'', genre:'Kärwa', outdoor:true, ageMin:0, price:'Kostenlos', oepnv:'Bus ab Zirndorf', parking:'Vorhanden'},
  {cat:'volksfest', name:'Kirchweih Fürberg', loc:'Fürth-Fürberg', start:'2026-08-29', end:'2026-09-01', free:true, desc:'', genre:'Kärwa', outdoor:true, ageMin:0, price:'Kostenlos', oepnv:'Bus ab Fürth Hbf', parking:'Straße'},
  {cat:'volksfest', name:'Kirchweih Stadeln', loc:'Fürth-Stadeln', start:'2026-08-29', end:'2026-09-02', free:true, desc:'', genre:'Kärwa', outdoor:true, ageMin:0, price:'Kostenlos', oepnv:'Bus ab Fürth Hbf', parking:'Vorhanden'},
  {cat:'volksfest', name:'Schwabacher Herbstkirchweih', loc:'Schwabach – Altstadt', start:'2026-09-18', end:'2026-09-27', free:false, desc:'10 Tage Volksfest in der Innenstadt. Kirchweihmarkt 21.–23. Sept.', genre:'Kärwa / Volksfest', outdoor:true, ageMin:0, price:'Kostenlos', oepnv:'S-Bahn S1 bis Schwabach Bahnhof', parking:'Parkhäuser Innenstadt'},
  {cat:'volksfest', name:'Schnepfenreuth Kirchweih', loc:'Nürnberg-Schnepfenreuth', start:'2026-09-04', end:'2026-09-08', free:true, desc:'', genre:'Kärwa', outdoor:true, ageMin:0, price:'Kostenlos', oepnv:'Bus ab Nürnberg', parking:'Straße'},
  {cat:'volksfest', name:'Kirchweih Poppenreuth', loc:'Fürth-Poppenreuth', start:'2026-09-05', end:'2026-09-08', free:true, desc:'', genre:'Kärwa', outdoor:true, ageMin:0, price:'Kostenlos', oepnv:'Bus ab Fürth Hbf', parking:'Straße'},
  {cat:'volksfest', name:'Klaragasse Kirchweih', loc:'Nürnberg-Klaragasse', start:'2026-09-11', end:'2026-09-13', free:true, desc:'', genre:'Kärwa', outdoor:true, ageMin:0, price:'Kostenlos', oepnv:'U-Bahn U1', parking:'Straße'},
  {cat:'volksfest', name:'Neunhof Kirchweih', loc:'Nürnberg-Neunhof', start:'2026-09-11', end:'2026-09-14', free:true, desc:'', genre:'Kärwa', outdoor:true, ageMin:0, price:'Kostenlos', oepnv:'Bus ab Nürnberg Nord', parking:'Vorhanden'},
  {cat:'volksfest', name:'Kirchweih Atzenhof', loc:'Fürth-Atzenhof', start:'2026-09-12', end:'2026-09-15', free:true, desc:'', genre:'Kärwa', outdoor:true, ageMin:0, price:'Kostenlos', oepnv:'Bus ab Fürth Hbf', parking:'Straße'},
  {cat:'volksfest', name:'Kraftshof Kärwa', loc:'Nürnberg-Kraftshof', start:'2026-09-18', end:'2026-09-21', free:true, desc:'Die letzte Kirchweih im Nürnberger Norden.', genre:'Kärwa', outdoor:true, ageMin:0, price:'Kostenlos', oepnv:'Bus ab Nürnberg Nord', parking:'Vorhanden'},
  {cat:'volksfest', name:'Kirchweih Vach', loc:'Fürth-Vach', start:'2026-09-19', end:'2026-09-22', free:true, desc:'', genre:'Kärwa', outdoor:true, ageMin:0, price:'Kostenlos', oepnv:'Bus ab Fürth Hbf', parking:'Vorhanden'},

  // ─── FESTIVALS ────────────────────────────────────────────────────────────
  {cat:'festival', name:'Metropolink Warm Up (Indoor)', loc:'Nürnberg (Location TBC)', start:'2026-04-18', end:'2026-04-18', free:false, desc:'Indoor-Auftakt des Metropolink Festivals · Szene-Avantgarde & Club-Energie.', genre:'Multi-Genre', ticket:'', outdoor:false, ageMin:18, price:'TBC', oepnv:'ÖPNV Nürnberg', parking:'TBC'},
  {cat:'festival', name:'Rock im Park', loc:'Zeppelinfeld, Nürnberg', start:'2026-06-05', end:'2026-06-07', free:false, desc:'50+ Bands, 4 Tage Camping. Headliner: Linkin Park, Iron Maiden u.v.m. ~60.000 Besucher. AUSVERKAUFT!', genre:'Rock/Metal', ticket:'https://www.rock-im-park.com/', new:true, outdoor:true, ageMin:16, price:'ab 141 € (Tagesticket) / ausverkauft', oepnv:'VGN-Nutzung im Ticket enthalten! U1 bis Frankenstraße', parking:'Im Ticket enthalten'},
  {cat:'festival', name:'Happy Life Open Air 2026', loc:'Airport Nürnberg', start:'2026-06-13', end:'2026-06-13', free:false, desc:'Premiere am Airport Nürnberg – die größten Hits der 90er & 2000er auf zwei Stages! Sunny Moments Stage: No Angels, Atomic Kitten, Culture Beat, La Bouche, Alex Christensen. Wonderful Days Stage (Classic Rave & Trance): Aquagen, Da Hool, DJ Quicksilver, Dune, Future Breeze u.v.m. 🎟️ 15% Rabatt mit Code CB2026 im Onlineshop!', genre:'90er / 2000er / Pop / Rave / Trance', ticket:'https://festivalsummer-nuernberg.de/happylife', new:true, outdoor:true, ageMin:16, price:'ab 29 € (15% Rabatt mit Code CB2026)', oepnv:'S-Bahn S2 bis Flughafen, dann Shuttle', parking:'Parkhaus P2, 10 €/Tag', promo:'CB2026'},
  {cat:'festival', name:'St. Katharina Open Air', loc:'Katharinenruine, Nürnberg', start:'2026-06-19', end:'2026-07-04', free:false, desc:'Konzertreihe in der histor. Klosterruine – Blues, Rock, Indie, Hip-Hop. Curtis Harding, Blackout Problems u.a.', genre:'Multi-Genre', ticket:'https://www.kunstkulturquartier.de/', outdoor:true, ageMin:0, price:'ab 15 – 35 € pro Konzert', oepnv:'U-Bahn U1 bis Lorenzkirche', parking:'Parkhäuser Altstadt'},
  {cat:'festival', name:'Garlic Land Festival 2026', loc:'Airport Nürnberg', start:'2026-06-20', end:'2026-06-20', free:false, desc:'Das Garlic Land Festival kehrt am Airport Nürnberg zurück! Zwei Areas: Garlic Fields (EDM, elektronische Sounds, internationale Mainstage-Vibes) & Garlic Garden (Hip-Hop, RnB, Urban Sounds). Headliner: KSHMR, FAST BOY, Disarstar, Chefket u.v.m. 🎟️ 17% Rabatt auf Stehplatztickets mit Code CB2026 im Onlineshop!', genre:'EDM / Hip-Hop / RnB / Electronic', ticket:'https://festivalsummer-nuernberg.de/', outdoor:true, ageMin:16, price:'ab 29 € (17% Rabatt mit Code CB2026)', oepnv:'S-Bahn S2 bis Flughafen, dann Shuttle', parking:'Parkhaus P2, 10 €/Tag', promo:'CB2026'},
  {cat:'festival', name:'Super Sommer Sause', loc:'Airport Nürnberg', start:'2026-06-27', end:'2026-06-27', free:false, desc:'Nürnberg meets Mallorca – Pietro Lombardi, Mia Julia, Isi Glück, Ikke Hüftgold u.a. ~15.000 Gäste.', genre:'Schlager / Malle', ticket:'https://festivalsummer-nuernberg.de/', outdoor:true, ageMin:16, price:'ab 35 €', oepnv:'S-Bahn S2 bis Flughafen, dann Shuttle', parking:'Parkhaus P2, 10 €/Tag'},
  {cat:'festival', name:'Open Air Sommer – Stadionpark', loc:'Stadionpark Nürnberg', start:'2026-06-28', end:'2026-07-11', free:false, desc:'Konzertreihe. Ski Aggu, Sarah Connor, Provinz, Dream Theater u.a.', genre:'Multi-Genre', ticket:'https://www.stadionpark.com/', outdoor:true, ageMin:0, price:'ab 39 – 79 € pro Konzert', oepnv:'Tram 6/10 bis Dutzendteich', parking:'Parkplatz Zeppelinfeld'},
  {cat:'festival', name:'Burning Beach Festival', loc:'Brombachsee, Pleinfeld (~30 min)', start:'2026-06-19', end:'2026-06-21', free:false, desc:'10. Jubiläum! 3 Tage Techno, House & Goa direkt am Sandstrand – 5 Floors, ~10.000 Besucher. Camping ab 18.6.', genre:'Techno / House / Goa', ticket:'https://burningbeach.de/', outdoor:true, ageMin:18, price:'ab 71,50 € (Weekend)', oepnv:'S-Bahn S1 bis Pleinfeld (30 min), dann Shuttle', parking:'Begrenzt am Gelände'},
  {cat:'festival', name:'Latin Airport Festival 2026', loc:'Airport Nürnberg', start:'2026-07-04', end:'2026-07-04', free:false, desc:'Deutschlands größtes Latin Festival am Airport Nürnberg! Reggaeton, Latin Pop & Salsa unter freiem Himmel. Headliner: Myke Towers (puerto-ricanischer Megastar, 1. Live-Performance in Deutschland!) & Tito Nieves (Salsa-Legende, „I Like It Like That"). Weitere hochkarätige Acts folgen. Modernste Produktion, internationale Atmosphäre. 🎟️ 15% Rabatt mit Code CB2026 im Onlineshop!', genre:'Reggaeton / Latin Pop / Salsa', ticket:'https://festivalsummer-nuernberg.de/', outdoor:true, ageMin:16, price:'ab 39 € (15% Rabatt mit Code CB2026)', oepnv:'S-Bahn S2 bis Flughafen, dann Shuttle', parking:'Parkhaus P2, 10 €/Tag', promo:'CB2026'},
  {cat:'festival', name:'Save The Core', loc:'Stadionpark Nürnberg', start:'2026-07-04', end:'2026-07-04', free:false, desc:'Punk & Hardcore – Sex Pistols feat. Frank Carter, Biohazard, Agnostic Front u.a. Mit Stadionbad-Zugang gratis!', genre:'Punk/Hardcore', ticket:'https://www.save-the-core.de/', outdoor:true, ageMin:8, price:'101 €', oepnv:'Tram 6/10 bis Dutzendteich', parking:'Parkplatz Zeppelinfeld'},
  {cat:'festival', name:'Klassik Open Air I', loc:'Nürnberg – Luitpoldhain', start:'2026-07-26', end:'2026-07-26', free:true, desc:'Groß-Konzert der Staatsphilharmonie Nürnberg im Luitpoldhain – Bayerns größtes Klassik-Open-Air mit 80.000 Besuchern. Kostenlos, Picknick-Atmosphäre unter freiem Himmel.', genre:'Klassik / Open Air', ticket:'https://staatstheater-nuernberg.de', outdoor:true, ageMin:0, price:'Kostenlos', oepnv:'U1 bis Messe/Luitpoldhain', parking:'Begrenzt, ÖPNV empfohlen'},
  {cat:'festival', name:'Klassik Open Air II', loc:'Nürnberg – Luitpoldhain', start:'2026-08-08', end:'2026-08-08', free:true, desc:'Zweiter Abend des Klassik Open Air mit der Staatsphilharmonie Nürnberg. 160.000 Besucher über beide Abende – das Woodstock der Klassik.', genre:'Klassik / Open Air', ticket:'https://staatstheater-nuernberg.de', outdoor:true, ageMin:0, price:'Kostenlos', oepnv:'U1 bis Messe/Luitpoldhain', parking:'Begrenzt, ÖPNV empfohlen'},
  {cat:'festival', name:'Open Beatz Festival 2026', loc:'Poppenhofer Weiher, Herzogenaurach', start:'2026-07-24', end:'2026-07-26', free:false, desc:'Eines der größten Electronic Music Festivals Deutschlands direkt bei Nürnberg! 8 Stages, 200+ nationale & internationale Artists: Timmy Trumpet, Cascada, Ski Aggu, Kobosil, Klaudia Gawlas, Brennan Heart u.v.m. EDM, House, Techno, Trance, Hardstyle. Highlights: Riesenrad, Helikopterrundflüge, Wohlfühloase „Lunaria", große Food Area. 🎟️ 15% Rabatt auf alle Ticketkategorien (Weekend, Two Days, Day Ticket) mit Code 15CBENEFITS814317!', genre:'EDM / House / Techno / Trance / Hardstyle', ticket:'https://openbeatz.de/', outdoor:true, ageMin:16, price:'ab 81 € (15% Rabatt mit Code 15CBENEFITS814317)', oepnv:'Bahn bis Herzogenaurach + Shuttle', parking:'Vorhanden am Gelände', promo:'15CBENEFITS814317'},
  {cat:'festival', name:'Bardentreffen', loc:'Nürnberger Altstadt (9 Bühnen)', start:'2026-07-30', end:'2026-08-02', free:true, desc:'49. Ausgabe – Deutschlands größtes Umsonst & Draußen Festival. 90 Konzerte, ~200.000 Besucher. Weltmusik. EINTRITT FREI!', genre:'Weltmusik', ticket:'', outdoor:true, ageMin:0, price:'Kostenlos', oepnv:'U1/U2/U3 bis Hauptbahnhof oder Lorenzkirche', parking:'Parkhäuser Altstadt'},
  {cat:'festival', name:'Metropolink Festival', loc:'Nürnberg (Innenstadt)', start:'2026-08-05', end:'2026-08-08', free:false, desc:'Street-Art, Musik & Kultur – Indie, Alternative, Electronic. 4 Tage Stadtfestival.', genre:'Multi-Genre', ticket:'', outdoor:true, ageMin:0, price:'TBC', oepnv:'ÖPNV Nürnberg Innenstadt', parking:'Altstadt-Parkhäuser'},
  {cat:'festival', name:'Brückenfestival', loc:'Pegnitzwiesen, Theodor-Heuss-Brücke', start:'2026-08-07', end:'2026-08-08', free:true, desc:'Umsonst & Draußen – 2 Tage, 3 Bühnen, regionale & internationale Bands. Ehrenamtlich. EINTRITT FREI!', genre:'Multi-Genre', ticket:'', outdoor:true, ageMin:0, price:'Kostenlos', oepnv:'U-Bahn U1 bis Gostenhof', parking:'Kein Parkplatz – ÖPNV nutzen'},
  {cat:'festival', name:'Container Love Festival', loc:'Hafen Nürnberg-Süd', start:'2026-08-14', end:'2026-08-14', free:false, desc:'Elektro-Festival im Hafen – 3 Stages, 20+ internationale Acts. (Termin TBC)', genre:'EDM / Electronic', ticket:'', outdoor:true, ageMin:18, price:'TBC', oepnv:'U-Bahn U2 bis Eibach, dann Bus', parking:'Begrenzt'},
  {cat:'festival', name:'Tanzen im Grünen', loc:'Marienbergpark, Nürnberg', start:'2026-08-29', end:'2026-08-29', free:false, desc:'Elektro-Festival – 10+ Stunden, 3 Bühnen. House, Techno, EDM. 999999999, AKA AKA, Lilly Palmer u.a.', genre:'Techno / House', ticket:'https://www.tanzen-im-gruenen.de/', outdoor:true, ageMin:18, price:'TBC (ca. 30–45 €)', oepnv:'U2 bis Ziegelstein, dann Bus 30/31 bis Tucherhof – kein Parken möglich!', parking:'❌ Kein Parkplatz! Nur ÖPNV'},
  
  // ─── AFTER WORK / CLUB ───────────────────────────────────────────────────
  {cat:'afterwork', name:'After Work Party mit DJ Werner', loc:'Nürnberg', start:'2026-04-16', end:'2026-04-17', free:false, desc:'After Work Party mit DJ Werner & Friends – Donnerstag beginnt das Wochenende! House Music an der Bar, Dancefloor-Ekstase im Anschluss. Für alle, die tagsüber im Job alles gegeben haben. Vorab Tisch ab 18 Uhr im Farang Thai PopUp Restaurant reservierbar. Teilnahme ab 18 Jahren, keine Ausnahmen.', genre:'House / After Work', ticket:'', outdoor:false, ageMin:18, price:'5€ Eintritt · Beginn 20 Uhr, Ende 01 Uhr', oepnv:'ÖPNV Nürnberg', parking:'Parkhäuser Innenstadt'},
  {cat:'afterwork', name:'Sundowner – Season Opening', loc:'Meier Hilzhof, Pilsach', start:'2026-04-18', end:'2026-04-18', free:false, desc:'Terrassenopening der Sundowner-Reihe. 12:00–20:00 Uhr.', genre:'House / Outdoor', ticket:'https://sundowner.ticket.io/', dresscode:'Summer Chic', outdoor:true, ageMin:18, price:'ab 25 €', oepnv:'Auto empfohlen – ländliche Lage bei Neumarkt', parking:'Vorhanden am Hilzhof'},
  {cat:'afterwork', name:'High in the Sky – Rooftop Party', loc:'Design Offices, Königstorgraben 11, 5. OG', start:'2026-04-17', end:'2026-04-17', free:false, desc:'19–01 Uhr. R&B, Hip Hop & House über den Dächern Nürnbergs. DJs + Special Acts.', genre:'R&B / House / Rooftop', ticket:'https://skyeventsmore.ticket.io/', dresscode:'', outdoor:false, ageMin:18, price:'ca. 15 €', oepnv:'U-Bahn U1 bis Hauptbahnhof, 5 min Fußweg', parking:'Parkhäuser Altstadt'},
  {cat:'afterwork', name:'Sundowner White Party im Bootshaus', loc:'Bootshaus Nürnberg, Dutzendteich', start:'2026-05-14', end:'2026-05-14', free:false, desc:'17–23 Uhr. White Party Edition – weißes Outfit Pflicht!', genre:'House / Outdoor', ticket:'https://sundowner.ticket.io/', dresscode:'Alles in Weiß!', outdoor:true, ageMin:18, price:'ab 20 €', oepnv:'U1 bis Frankenstraße, dann Bus 55', parking:'Parkplatz Zeppelinfeld (kostenlos)'},
  {cat:'afterwork', name:'Sundowner im Bootshaus', loc:'Bootshaus Nürnberg, Dutzendteich', start:'2026-04-23', end:'2026-04-23', free:false, desc:'17–23 Uhr. Seeterrasse am Dutzendteich · House & Club Sounds · DJ Lee Allen.', genre:'House / Outdoor', ticket:'https://sundowner.ticket.io/', dresscode:'Summer Chic', outdoor:true, ageMin:18, price:'ab 20 €', oepnv:'U1 bis Frankenstraße, dann Bus 55', parking:'Parkplatz Zeppelinfeld (kostenlos)', musicYt:'ATXO17ztWVc', musicTitle:'YouNotUs x Mi Casa – Chucks'},
  {cat:'afterwork', name:'Sundowner im Bootshaus', loc:'Bootshaus Nürnberg, Dutzendteich', start:'2026-06-04', end:'2026-06-04', free:false, desc:'17–23 Uhr. House & Club Sounds auf der Seeterrasse.', genre:'House / Outdoor', ticket:'https://sundowner.ticket.io/', dresscode:'Summer Chic', outdoor:true, ageMin:18, price:'ab 20 €', oepnv:'U1 bis Frankenstraße, dann Bus 55', parking:'Parkplatz Zeppelinfeld (kostenlos)'},
  {cat:'afterwork', name:'Sundowner White Party im Bootshaus', loc:'Bootshaus Nürnberg, Dutzendteich', start:'2026-07-30', end:'2026-07-30', free:false, desc:'17–23 Uhr. White Party Edition.', genre:'House / Outdoor', ticket:'https://sundowner.ticket.io/', dresscode:'Alles in Weiß!', outdoor:true, ageMin:18, price:'ab 20 €', oepnv:'U1 bis Frankenstraße, dann Bus 55', parking:'Parkplatz Zeppelinfeld (kostenlos)'},
  {cat:'afterwork', name:'Sundowner im Bootshaus', loc:'Bootshaus Nürnberg, Dutzendteich', start:'2026-08-27', end:'2026-08-27', free:false, desc:'17–23 Uhr. House & Club Sounds auf der Seeterrasse.', genre:'House / Outdoor', ticket:'https://sundowner.ticket.io/', dresscode:'Summer Chic', outdoor:true, ageMin:18, price:'ab 20 €', oepnv:'U1 bis Frankenstraße, dann Bus 55', parking:'Parkplatz Zeppelinfeld (kostenlos)'},
  {cat:'afterwork', name:'Sundowner im Bootshaus', loc:'Bootshaus Nürnberg, Dutzendteich', start:'2026-09-17', end:'2026-09-17', free:false, desc:'17–23 Uhr. Saison-Finale der Sundowner-Reihe.', genre:'House / Outdoor', ticket:'https://sundowner.ticket.io/', dresscode:'Summer Chic', outdoor:true, ageMin:18, price:'ab 20 €', oepnv:'U1 bis Frankenstraße, dann Bus 55', parking:'Parkplatz Zeppelinfeld (kostenlos)'},

  // ─── SONSTIGE ────────────────────────────────────────────────────────────
  {cat:'volksfest', name:'Kirchweih Eckersmühlen', loc:'Roth-Eckersmühlen', start:'2026-05-14', end:'2026-05-18', free:true, desc:'', genre:'Kärwa', outdoor:true, ageMin:0, price:'Kostenlos', oepnv:'S-Bahn S1 bis Roth, dann Bus', parking:'Vorhanden'},
  {cat:'volksfest', name:'Weiherhofer Kärwa', loc:'Nürnberg-Weiherhof', start:'2026-09-04', end:'2026-09-07', free:true, desc:'', genre:'Kärwa', outdoor:true, ageMin:0, price:'Kostenlos', oepnv:'Bus ab Nürnberg West', parking:'Straße'},
  // ─── 150KM UMKREIS – FESTIVALS & VOLKSFESTE ──────────────────────────────
  {cat:'volksfest', name:'Augsburger Osterplärrer', loc:'Augsburg – Plärrergelände', start:'2026-04-05', end:'2026-04-19', free:true, desc:'Größtes Volksfest Schwabens mit zwei großen Festzelten, Fahrgeschäften und Blasmusik. Eröffnung durch Böllerschützen, Abschlussfeuerwerk.', genre:'Volksfest', ticket:'https://www.augsburger-plaerrer.de', outdoor:true, ageMin:0, price:'Kostenlos (Verzehr kostenpflichtig)', oepnv:'Straßenbahn Linie 2 bis Plärrer', parking:'Begrenzt – ÖPNV empfohlen'},
  {cat:'volksfest', name:'Münchner Frühlingsfest', loc:'München – Theresienwiese', start:'2026-04-17', end:'2026-05-10', free:true, desc:'Das „kleine Wiesn" auf der Theresienwiese: Bierzelte, Fahrgeschäfte, bayerische Gemütlichkeit. Perfekt für Familien und Feiernde.', genre:'Volksfest', ticket:'https://www.fruehlingsfest-muenchen.de', outdoor:true, ageMin:0, price:'Kostenlos (Verzehr kostenpflichtig)', oepnv:'U4/U5 bis Theresienwiese', parking:'Nicht empfohlen – ÖPNV nutzen'},
  {cat:'festival', name:'Keep It True Festival', loc:'Lauda-Königshofen (bei Würzburg)', start:'2026-04-24', end:'2026-04-25', free:false, desc:'26. Ausgabe des Heavy-Metal-Festivals in der Tauberfrankenhalle. Headliner: Venom (45. Jubiläum) und Triumph Of Death. 20 Bands, restlos ausverkauft.', genre:'Heavy Metal', ticket:'https://www.keep-it-true.de', outdoor:false, ageMin:16, price:'Ausverkauft', oepnv:'Zug bis Lauda, dann Taxi', parking:'Vorhanden am Veranstaltungsort'},
  {cat:'festival', name:'Würzburg Umsonst & Draußen', loc:'Würzburg – Mainwiesen Talavera', start:'2026-06-18', end:'2026-06-21', free:true, desc:'Eines der größten Gratisopen-air-Festivals Deutschlands – seit über 30 Jahren. 60.000–80.000 Besucher, direkt am Main, diverse Musik.', genre:'Open Air / Indie / Folk', ticket:'https://www.uunddwuerzburg.de', outdoor:true, ageMin:0, price:'Kostenlos', oepnv:'Bus bis Talavera, Würzburg Hbf dann 30 min zu Fuß', parking:'Begrenzt'},
  {cat:'volksfest', name:'76. Bamberger Sandkerwa', loc:'Bamberg – Altstadt (Sandviertel)', start:'2026-08-20', end:'2026-08-24', free:true, desc:'76. Bamberger Sandkerwa – Bambergs beliebteste Kirchweih und größtes Volksfest im Altstadtkern, direkt am Regnitzufer. 5 Tage Livemusik, Biergärten, Fischerstechen, Kahn-Schiffahrt und Illumination der Altstadt im UNESCO-Welterbe.', genre:'Kirchweih / Volksfest', ticket:'https://www.sandkerwa.de', outdoor:true, ageMin:0, price:'Kostenlos', oepnv:'Zug bis Bamberg Hbf, dann 15 min zu Fuß', parking:'Altstadt-Parkhäuser'},
  {cat:'festival', name:'Kiliani Volksfest Würzburg', loc:'Würzburg – Talavera-Platz', start:'2026-07-03', end:'2026-07-19', free:true, desc:'Größtes Volksfest Unterfrankens – 2 Wochen Zelte, Fahrgeschäfte und Blasmusik. Eröffnung mit Festumzug in Tracht durch die Innenstadt.', genre:'Volksfest', ticket:'https://www.wuerzburg.de/kilianivolksfest', outdoor:true, ageMin:0, price:'Kostenlos (Verzehr kostenpflichtig)', oepnv:'Bus/Straßenbahn bis Talavera', parking:'Begrenzt'},
  {cat:'festival', name:'Heroes Festival Geiselwind', loc:'Geiselwind – Eventhalle Strohofer', start:'2026-06-19', end:'2026-06-20', free:false, desc:'Hip-Hop-Festival in Geiselwind mit Bones MC, SSIO, Rin, Kool Savas und Bausa. Tages- und Wochenendtickets verfügbar.', genre:'Hip-Hop / Rap', ticket:'https://www.heroes-festival.de', outdoor:true, ageMin:16, price:'ab 49 €', oepnv:'Shuttle ab Nürnberg', parking:'Vorhanden am Gelände'},
  {cat:'festival', name:'Keep It True Legions', loc:'Geiselwind – Eventhalle', start:'2026-08-08', end:'2026-08-09', free:false, desc:'Tochter-Festival von Keep It True in der Eventhalle Geiselwind. Headliner: Savatage und Pentagram. Metal der alten Schule.', genre:'Heavy Metal', ticket:'https://www.keep-it-true.de', outdoor:false, ageMin:16, price:'ab 65 €', oepnv:'Shuttle ab Nürnberg Hbf', parking:'Vorhanden'},
  {cat:'festival', name:'Superbloom Festival München', loc:'München – Olympiapark', start:'2026-08-31', end:'2026-09-04', free:false, desc:'Großes Pop- und Elektronik-Festival im Olympiapark München. Mehrtägiges Event mit internationalen Acts auf mehreren Bühnen.', genre:'Pop / Electronic / Live', ticket:'https://www.superbloom.de', outdoor:true, ageMin:16, price:'ab 89 €', oepnv:'U3 bis Olympiazentrum', parking:'Olympiapark P1/P2'},
  {cat:'afterwork', name:'Augsburger Herbstplärrer', loc:'Augsburg – Plärrergelände', start:'2026-08-28', end:'2026-09-13', free:true, desc:'Herbstausgabe des Augsburger Plärrer – 2 Wochen Volksfest mit Binswanger und Schaller Bierzelten, modernen Fahrgeschäften und nostalgischen Karussells.', genre:'Volksfest', ticket:'https://www.augsburger-plaerrer.de', outdoor:true, ageMin:0, price:'Kostenlos (Verzehr kostenpflichtig)', oepnv:'Straßenbahn Linie 2', parking:'Begrenzt'},
  {cat:'festival', name:'Nürnberg Pop Festival', loc:'Nürnberg – verschiedene Locations', start:'2026-10-08', end:'2026-10-10', free:false, desc:'Indie, Rock & Pop Showcase-Festival. 2026 mit Cari Cari und Orbit als Top-Acts. Award-prämiertes Festival für Booking-Qualität.', genre:'Indie / Pop / Rock', ticket:'https://www.nuernbergpop.de', outdoor:false, ageMin:16, price:'ab 25 €', oepnv:'U-Bahn Nürnberg Innenstadt', parking:'Innenstadtparkhäuser'},

  // ─── WHITE RABBIT NÜRNBERG (monatliche Events) ───────────────────────────

  // ─── WHITE RABBIT NBG (@white.rabbit.nbg) ───────────────────────────────
  {cat:'russian', name:'White Rabbit – БОЛЬШАЯ ВЕЧЕРИНКА 90X 00X', loc:'Nürnberg – Club SOCIETY', start:'2026-05-01', end:'2026-05-01', free:false, desc:'Große Party mit 90er & 2000er Hits im Club SOCIETY Nürnberg. Veranstaltet von White Rabbit NBG (@white.rabbit.nbg). Russisch-internationale Party-Atmosphäre.', genre:'90er / 2000er / Party', ticket:'https://www.instagram.com/white.rabbit.nbg', outdoor:false, ageMin:18, price:'Infos via Instagram', oepnv:'U-Bahn nach Lorenzkirche oder Weißer Turm', parking:'Innenstadt Parkhäuser'},

  // ─── RUSSISCHE / OSTEUROPÄISCHE FESTIVALS ────────────────────────────────
  {cat:'russian', name:'Russian Coco Open Air Festival', loc:'Gießen – WM Arena', start:'2026-05-09', end:'2026-05-09', free:false, desc:'Das größte russische Open Air Festival in Deutschland, Österreich & Schweiz! DJs, Live Acts aus der russischen Szene, u.a. Faktor-2 (Vladimir Panchenko). Fettes Line-up, einzigartige Atmosphäre.', genre:'Russian Pop / Party / Electronic', ticket:'https://www.russiancocofestival.de', outdoor:true, ageMin:16, price:'Tickets ab 80€', oepnv:'Bahn nach Gießen Hbf', parking:'Vorhanden am Veranstaltungsort'},
  {cat:'russian', name:'LIFEvKAIF OpenAir Festival', loc:'Lauda-Königshofen – Tauberfrankenhalle', start:'2026-07-11', end:'2026-07-11', free:false, desc:'Das größte kasachisch-russisch-ukrainisch-deutsche Open Air Festival! 4. Ausgabe mit starkem Line-up: MONA, MIA BOYKA, ELMAN, ANDRO und mehr. Ab 16 Jahren.', genre:'Russian / Kazakh / Ukrainian Pop', ticket:'https://lifevkaif.ticket.io', outdoor:true, ageMin:16, price:'Tickets ab 99€, Tageskasse 199€', oepnv:'Bahn nach Lauda-Königshofen', parking:'Vorhanden'},
  {cat:'russian', name:'Russian Vibe Open Air Festival', loc:'Büren – S. Imperial Restaurant', start:'2026-05-01', end:'2026-05-02', free:false, desc:'Drei Tage Musik, Sonne und Bass! Main Stage & Retro Stage (90s & 2000er Flashback), 10 Foodtrucks, 16 Getränkestände. Kultfestival der russischsprachigen Community in Deutschland.', genre:'Russian Pop / Retro / Electronic', ticket:'https://artist-production.de/de/russian-vibe-open-air-festival', outdoor:true, ageMin:0, price:'2-Tages-Ticket ab 52€', oepnv:'Bahn nach Paderborn, dann Shuttle', parking:'Vorhanden'},
  {cat:'russian', name:'Russian Vibe Open Air Festival (Sommer)', loc:'Büren – S. Imperial Restaurant', start:'2026-08-22', end:'2026-08-22', free:false, desc:'Sommertermin des Russian Vibe Open Air in Büren! Main Stage & Retro Stage – russische Musik, Party und unvergessliche Atmosphäre.', genre:'Russian Pop / Party', ticket:'https://artist-production.de/de/russian-vibe-open-air-festival', outdoor:true, ageMin:0, price:'Tickets ab 52€', oepnv:'Bahn nach Paderborn, dann Shuttle', parking:'Vorhanden'},




// ─── RUSSIAN SENSATION FESTIVAL ──────────────────────────────────────────

  // ─── SOYUZ EVENTS ─────────────────────────────────────────────────────────
  {cat:'russian', name:'SOYUZ – Russian Indoor Festival', loc:'Straubing', start:'2026-05-02', end:'2026-05-02', free:false, desc:'Russian Indoor Festival von SOYUZ Events in Straubing. Grosses russisches Partyfestival mit mehreren Acts und DJ-Sets. Infos auf @soyuz_events (Instagram).', genre:'Russian Festival / Indoor', ticket:'https://www.instagram.com/soyuz_events', outdoor:false, ageMin:18, price:'Infos via Instagram', oepnv:'Bahn nach Straubing Hbf', parking:'Vorhanden'},

  // ─── THE GARRISON EVENTS ─────────────────────────────────────────────────
  {cat:'russian', name:'The Garrison Events – Party Night', loc:'Osnabrück', start:'2026-04-18', end:'2026-04-18', free:false, desc:'The Garrison Events – russische Party-Reihe auf Deutschlandtour. Aktuelle Infos auf @the_garrison_events_ (Instagram).', genre:'Russian Party', ticket:'https://linktr.ee/the_garrison_events', outdoor:false, ageMin:18, price:'Infos via Instagram', oepnv:'Bahn nach Osnabrück Hbf', parking:'Vorhanden'},
  {cat:'privat', name:'Viana Дача Party', loc:'Viana Дача Party Nürnberg', music:'assets/music/viana-dacha-party.mp3', lat:49.38481, lng:11.10000, start:'2026-04-25', end:'2026-04-25', free:true, desc:'Die Viana Gartenparty – ein unvergesslicher Tag für die ganze Community! Shisha, Grillen, Cocktails, Spiele, Sonnen und Kinderbetreuung. Entspannte Atmosphäre im privaten Garten – organisiert von Viana Events.', genre:'Garden Party / Community', ticket:'', outdoor:true, ageMin:0, price:'Kostenlos (Einladung)', oepnv:'Nürnberg ÖPNV', parking:'Vorhanden', viana:true, new:true},
  {cat:'russian', name:'The Garrison Events – Party Night', loc:'Kassel', start:'2026-04-25', end:'2026-04-25', free:false, desc:'The Garrison Events – russische Party-Reihe auf Deutschlandtour. Aktuelle Infos auf @the_garrison_events_ (Instagram).', genre:'Russian Party', ticket:'https://linktr.ee/the_garrison_events', outdoor:false, ageMin:18, price:'Infos via Instagram', oepnv:'Bahn nach Kassel Hbf', parking:'Vorhanden'},
  {cat:'russian', name:'The Garrison Events – Party Night', loc:'Kiel', start:'2026-05-02', end:'2026-05-02', free:false, desc:'The Garrison Events – russische Party-Reihe auf Deutschlandtour. Aktuelle Infos auf @the_garrison_events_ (Instagram).', genre:'Russian Party', ticket:'https://linktr.ee/the_garrison_events', outdoor:false, ageMin:18, price:'Infos via Instagram', oepnv:'Bahn nach Kiel Hbf', parking:'Vorhanden'},
  // ─── NEU APRIL 2026 UPDATE ────────────────────────────────────────────
  {cat:'russian', name:'Full House – Party Night', loc:'Speicher.28, Neumarkt i.d.OPf.', start:'2026-05-08', end:'2026-05-08', free:false, desc:'Full House – die Party-Reihe mit russischer und internationaler Musik in Neumarkt i.d.OPf. Tickets & Infos auf fullhouse.ticket.io.', genre:'Russian Party / Club', ticket:'https://fullhouse.ticket.io', outdoor:false, ageMin:18, price:'Infos auf fullhouse.ticket.io', oepnv:'Bahn nach Neumarkt i.d.OPf. Hbf', parking:'Vorhanden'},
  {cat:'festival', name:'Bierchen und Bühnchen', loc:'Nürnberg – Gostenhof', start:'2026-05-29', end:'2026-05-31', free:true, desc:'Das Musik- und Kneipenfestival in Gostenhof und Himpfelshof. Bands und DJs in Bars, Cafés und auf Open-Air-Bühnen – Festivalstart in die Saison. Eintritt frei!', genre:'Indie / Rock / Mix', ticket:'https://www.bierchenundbuechnchen.de', outdoor:true, ageMin:0, price:'Kostenlos', oepnv:'U2 Gostenhof', parking:'Straße'},
  {cat:'festival', name:'Andorf Open Air (20 Jahre)', loc:'Andorf bei Ansbach', start:'2026-05-22', end:'2026-05-24', free:false, desc:'20-jähriges Jubiläum! Regionales Rockfestival in Andorf. Lineup: Gossenpoeten, ØL, Iron Maidness u.a. Kleines, familiäres Festival.', genre:'Rock / Metal / Mittelalter', ticket:'', outdoor:true, ageMin:0, price:'ab ca. 15€', oepnv:'Kein ÖPNV, Fahrgemeinschaft', parking:'Vorhanden'},
  {cat:'festival', name:'Vorstadt Sound Festival', loc:'Langensendelbach bei Erlangen', start:'2026-06-19', end:'2026-06-21', free:false, desc:'Festival für alle – seit 2016 von Jugendlichen für Jugendliche in Langensendelbach. Vielfältiges Lineup: Folk, Techno, Indie, Schlager.', genre:'Mixed / Indie / Folk', ticket:'', outdoor:true, ageMin:0, price:'ab ca. 20€', oepnv:'Bus ab Erlangen Hbf', parking:'Vorhanden'},
  {cat:'festival', name:'Wasted! Open Air', loc:'Obernzenner See (Obernzenn, ~60km)', start:'2026-06-11', end:'2026-06-13', free:false, desc:'Ehrenamtliches DIY-Festival am Obernzenner See – Punk, Rock & Roll und Stoner-Rock. Rund 900 Besucher, familiäre Atmosphäre. Bands: The Sensitives, Mothers Cake.', genre:'Punk / Rock / Stoner', ticket:'https://www.wasted-openair.de', outdoor:true, ageMin:0, price:'ab ca. 30€ Weekend', oepnv:'Kein ÖPNV, Fahrgemeinschaft empfohlen', parking:'Vorhanden'},
  {cat:'festival', name:'Stars im Luitpoldhain', loc:'Nürnberg – Luitpoldhain', start:'2026-08-09', end:'2026-08-09', free:false, desc:'Großes Konzert im Luitpoldhain mit nationalen und internationalen Popstars. Einer der Highlights des Nürnberger Festivalsommers.', genre:'Pop / Rock', ticket:'https://www.staatstheater-nuernberg.de', outdoor:true, ageMin:0, price:'ab ca. 35€', oepnv:'U1 bis Messe/Luitpoldhain', parking:'Begrenzt'},
  {cat:'festival', name:'Summer Breeze Open Air', loc:'Dinkelsbühl – Flugplatz Sinbronn', start:'2026-08-12', end:'2026-08-15', free:false, desc:'Eines der größten Metal-Festivals Europas! 4 Tage, 75+ Bands. Headliner 2026: Arch Enemy, Helloween, In Flames, Lamb of God, Testament u.v.m. Bereits ausverkauft!', genre:'Metal / Rock / Hardcore', ticket:'https://www.summer-breeze.de', outdoor:true, ageMin:0, price:'Weekend ausverkauft, Tagestickets limitiert', oepnv:'Shuttle ab Bahnhof Dinkelsbühl', parking:'Vorhanden'},
  {cat:'festival', name:'Taubertal Festival', loc:'Rothenburg ob der Tauber', start:'2026-08-06', end:'2026-08-08', free:false, desc:'Festival am malerischen Taubertal bei Rothenburg. Lineup: Sido, Hip-Hop, Indie und mehr. Idyllische Lage mit Camping direkt am Fluss.', genre:'Hip-Hop / Indie / Pop', ticket:'https://www.taubertal-festival.de', outdoor:true, ageMin:0, price:'ab ca. 55€ Weekend', oepnv:'Zug nach Rothenburg, Shuttle', parking:'Vorhanden'},
  {cat:'volksfest', name:'Nürnberger Altstadtfest', loc:'Nürnberg – Altstadt', start:'2026-09-16', end:'2026-09-28', free:true, desc:'Eines der größten innerstädtischen Feste Bayerns – Bühnen in der gesamten Altstadt, Musik, Kulinarik und Kunst über zwei Wochen. Eintritt frei!', genre:'Stadtfest / Kultur', ticket:'https://www.altstadtfest.de', outdoor:true, ageMin:0, price:'Kostenlos', oepnv:'U1/U2 Hauptbahnhof', parking:'Altstadt Parkhäuser'},

  {cat:'russian', name:'Russian City Beats – MAUR Live on Stage', loc:'Nürnberg – WON World of Nightlife', start:'2026-05-13', end:'2026-05-13', free:false, desc:'Russian City Beats kommt zum ersten Mal nach Nürnberg! MAUR live on stage – bekannt für "My Love", "It\'s my Life", "Политела" und viele weitere Hits. Vorfeiertag-Special im WON (ehemaliger Rascha), Regensburger Str. 334b.', genre:'Russian Live / Pop', ticket:'https://www.instagram.com/russian_city_beats', outdoor:false, ageMin:18, price:'Infos via Instagram', oepnv:'Bus/Tram Richtung Regensburger Str.', parking:'Vorhanden'},
  {cat:'russian', name:'Russian Sensation Festival × Nürnberg', loc:'Nürnberg – ONLY Club', start:'2026-05-13', end:'2026-05-14', free:false, desc:'Vorfeiertag-Mittwoch (vor Christi Himmelfahrt) im ONLY Club Nürnberg. DJ Insane präsentiert das Russian Sensation Festival – Best of Russian Music. Lineup: DJ S7VEN (Ulm) und DJ Marrakech (Dortmund). 23:00–05:00 Uhr. Bevorzugter Einlass mit Ticket bis 01:00 Uhr, danach nur nach Kapazität. Sponsored by Saebis.', genre:'Russian Party / Pop / Hits', ticket:'https://www.eventbrite.de/e/russian-sensation-festival-x-nurnberg-tickets-1986059809353', new:true, outdoor:false, ageMin:18, price:'Tickets via Eventbrite', oepnv:'U-Bahn Richtung ONLY Club Nürnberg', parking:'In Clubnähe'},
  {cat:'russian', name:'Hawaii Стаил – Russian Style Party', loc:'Dornstadt – Club MEDUZA', start:'2026-05-23', end:'2026-05-23', free:false, desc:'Russian Style Party im Club MEDUZA Dornstadt (bei Ulm) – der Club verwandelt sich in eine tropische Partyinsel. Heiße Beats von DJ Deen West, Hawaii-Deko, Terrasse & Shisha, frisches Schaschlik, Longdrinks bis 0:00 Uhr im Angebot, gratis Shots & Gratis Hawaii Captain am Eingang. „Russian Style Party des Monats."', genre:'Russian Style / Hawaii Theme / Party', ticket:'https://www.instagram.com/russianstyleparty_augsburg/', new:true, outdoor:false, ageMin:18, price:'Infos via Instagram', oepnv:'Bahn nach Ulm, dann Bus nach Dornstadt', parking:'Vorhanden am Club'},
  {cat:'russian', name:'WE LOVE RUSSIAN NIGHT Stuttgart (Pfingstsonntag)', loc:'Stuttgart – Club Vivally', start:'2026-05-24', end:'2026-05-25', free:false, desc:'Pfingstsonntag, 24. Mai im Club Vivally Stuttgart (Stammheimer Str. 45). Eine Nacht voller Energie mit den heißesten Russian & International Hits. Mainfloor: DJ LINKIN und DJ X-TREAM. Russian Hits, House, Hip-Hop, Party Classics. 23:00–05:00 Uhr. Dresscode: Elegant & Party Ready. Limitierte Kapazität – früh kommen empfohlen. VIP Lounge & Reservierungen: 0151 10664537.', genre:'Russian Hits / House / Hip-Hop / Party Classics', ticket:'https://www.instagram.com/we_love_russian_night/', new:true, outdoor:false, ageMin:18, price:'Tickets via Instagram-Link', oepnv:'U15 Salzwiesenstraße direkt vor dem Club', parking:'Vor Ort'},

  // ─── STADTSTRÄNDE & SOMMERFESTE ──────────────────────────────────────────
  {cat:'strand', name:'Lieblingsstrand – Sommerinsel Schütt', loc:'Nürnberg – Insel Schütt (Altstadt)', start:'2026-04-29', end:'2026-07-31', free:true, desc:'Nürnbergs Lieblingsstrand auf der Insel Schütt – 250t weißer Sand, Liegestühle, Palmen, Poolbar, Campari-Bar mit DJ-Pult, Aperol-Area und Schlemmermeile. Di–So geöffnet. Bargeldlos!', genre:'Stadtstrand / After Work / Party', ticket:'https://lieblingsstrand-nuernberg.de', outdoor:true, ageMin:0, price:'Kostenlos (Konsumation)', oepnv:'U1 bis Lorenzkirche oder Weißer Turm', parking:'Altstadt Parkhäuser'},
  {cat:'strand', name:'Sommergarten Schütt – Tucher Biergarten', loc:'Nürnberg – Insel Schütt (Altstadt)', start:'2026-04-29', end:'2026-08-23', free:true, desc:'Neuer Biergarten auf der Sommerinsel Schütt – weitläufig, schattig, mit viel Sitzfläche. Live-Podcasts, Workshops, Kneipen-Quiz, Salsa-Events und mehr bis Ende Juli. Bargeldlos!', genre:'Biergarten / Stadtstrand / Kultur', ticket:'https://lieblingsstrand-nuernberg.de', outdoor:true, ageMin:0, price:'Kostenlos (Konsumation)', oepnv:'U1 bis Lorenzkirche oder Weißer Turm', parking:'Altstadt Parkhäuser'},
  {cat:'strand', name:'La Festa Italiana – Sommerinsel Schütt', loc:'Nürnberg – Insel Schütt (Altstadt)', start:'2026-08-14', end:'2026-08-23', free:true, desc:'Zehn Tage Dolce Vita auf der Insel Schütt! Live-Musik, Genussmarkt, italienische Kulinarik – Nürnberg feiert seine Städtepartnerschaft mit Venedig (seit 1954). Eintritt frei!', genre:'Stadtfest / Kulinarik / Musik', ticket:'https://lieblingsstrand-nuernberg.de', outdoor:true, ageMin:0, price:'Kostenlos (Eintritt)', oepnv:'U1 bis Lorenzkirche oder Weißer Turm', parking:'Altstadt Parkhäuser'},
  {cat:'strand', name:'Sternla SchlosStrand Erlangen', loc:'Erlangen – Schlossgarten', start:'2026-06-26', end:'2026-08-09', free:true, desc:'Erlanger Stadtstrand im historischen Schlossgarten – Sand, Liegestühle, Cocktails und Musik direkt neben dem Markgrafenschloss. Entspanntes Sommerflair mitten in der Stadt.', genre:'Stadtstrand / Sommer / Lounge', ticket:'', outdoor:true, ageMin:0, price:'Kostenlos (Konsumation)', oepnv:'Bahn bis Erlangen Hbf, 10 min Fußweg', parking:'Innenstadt Erlangen'},
  {cat:'strand', name:'Fürth Festival', loc:'Fürth – Innenstadt (mehrere Bühnen)', start:'2026-07-10', end:'2026-07-12', free:true, desc:'Das Fürth Festival seit 1998 – auf mehreren Bühnen in der Stadt spielen Bands aus allen Genres. Ausgelassen, kostenlos und mitten in Fürth. Eintritt frei!', genre:'Stadtfestival / Live-Musik', ticket:'https://www.fuerth.de', outdoor:true, ageMin:0, price:'Kostenlos', oepnv:'U1 Fürth Hbf', parking:'Innenstadt Fürth'},
  {cat:'strand', name:'Open Air am Lindenhain Fürth', loc:'Fürth – Lindenhain', start:'2026-07-17', end:'2026-07-19', free:true, desc:'Umsonst und draußen – ein Wochenende lang Live-Bands auf zwei Bühnen im Lindenhain. Fürths beliebtestes kostenloses Sommerevent.', genre:'Open Air / Live-Musik', ticket:'', outdoor:true, ageMin:0, price:'Kostenlos', oepnv:'U1 Fürth, dann Bus', parking:'Straße'},
  {cat:'strand', name:'Bunter Markt Fürth', loc:'Fürth – Adenauer-Anlage', start:'2026-06-12', end:'2026-06-14', free:true, desc:'Die Adenauer-Anlage wird zum Biergarten mit stimmungsvollem Ambiente und buntem Programm – Musik, Kulinarik und Sommeratmosphäre in Fürths Innenstadt. Eintritt frei!', genre:'Stadtfest / Biergarten / Markt', ticket:'', outdoor:true, ageMin:0, price:'Kostenlos', oepnv:'U1 Fürth Hbf', parking:'Innenstadt Fürth'},
  {cat:'strand', name:'Bunter Markt Fürth – Mai-Edition (Pop-Up Bar Altes Brathaus)', loc:'Fürth – Zentrum (Bunter Markt)', start:'2026-05-12', end:'2026-05-17', free:true, desc:'Wunderschön dekorierter Platz im Fürther Zentrum mit Pop-Up Bar vom Altes Brathaus. Programm bis 17. Mai: Di 12.05. Clownbesuch · Mi 13.05. Kindertag mit Star-Wars-Freunden (ab 13 Uhr) + LIVE Lenny SoulJah (ab 18 Uhr) · Do 14.05. Vatertagsparty (ab 15 Uhr) · Fr 15.05. LIVE Reggae Train (ab 18 Uhr) · Sa 16.05. LIVE Milk&Sugar + DJ Roy (ab 15 Uhr). Eintritt frei!', genre:'Stadtfest / Live-Musik / Familie', ticket:'https://www.instagram.com/inspiradu/', new:true, outdoor:true, ageMin:0, price:'Kostenlos', oepnv:'U1 Fürth Hbf', parking:'Innenstadt Fürth'},
  {cat:'strand', name:'Grafflmarkt Fürth', loc:'Fürth – Altstadt', start:'2026-09-04', end:'2026-09-05', free:true, desc:'Fürths großer Trödelmarkt in der historischen Altstadt – Schmuckstücke, Graffl und nette Atmosphäre. Fr 16–22 Uhr, Sa 8–16 Uhr. Eintritt frei!', genre:'Markt / Flohmarkt / Stadtfest', ticket:'', outdoor:true, ageMin:0, price:'Kostenlos', oepnv:'U1 Fürth Hbf', parking:'Innenstadt Fürth'},
  {cat:'strand', name:'Wöhrder See Sommerfest', loc:'Nürnberg – Wöhrder See', start:'2026-07-24', end:'2026-07-26', free:true, desc:'Sommerfest am Wöhrder See mit Live-Musik, Cocktails und Strandflair direkt am Wasser. Einer der schönsten Sommertreffpunkte in Nürnberg.', genre:'Sommerfest / See / Open Air', ticket:'', outdoor:true, ageMin:0, price:'Kostenlos', oepnv:'U2/U3 bis Wöhrder Wiese', parking:'Wöhrder See Parkplatz'},

  {cat:'afterwork', name:'Afterwork Party – Summer Vibes mit DJ MAD', loc:'Nürnberg – GATE Club (Flughafen Terminal 2)', start:'2026-05-07', end:'2026-05-07', free:true, desc:'Summer Vibes Afterwork Party mit DJ MAD im GATE Club am Flughafen Nürnberg. Melodic, Afro & Tech House, House Classics. 19–01 Uhr. Eintritt frei!', genre:'House / Afro House / Tech House', ticket:'', outdoor:false, ageMin:18, price:'Kostenlos', oepnv:'S-Bahn S2 bis Flughafen, Terminal 2', parking:'Flughafen Parkhaus'},
  {cat:'afterwork', name:'Tanz in den Mai – GATE Club', loc:'Nürnberg – GATE Club (Flughafen Terminal 2)', start:'2026-04-30', end:'2026-04-30', free:false, desc:'Tanz in den Mai im GATE Club! Gate 1: Disco Classics, 80er/90er/2000er mit Frank Sonique. Gate 2: House Music mit DJ MAD. Terrassenopening + Prosecco Empfang + Flower Deko. Terrasse die ganze Nacht geöffnet. Einlass 21 Uhr.', genre:'Disco / House / 80er 90er', ticket:'https://feierliste.ticket.io', outdoor:false, ageMin:18, price:'VVK 12,50€ + Geb.', oepnv:'S-Bahn S2 bis Flughafen, Terminal 2', parking:'Flughafen Parkhaus'},

  {cat:'afterwork', name:'Afterwork Party – Spring Vibes feat. DJane Nadiia', loc:'Nürnberg – GATE Club (Flughafen Terminal 2)', start:'2026-04-23', end:'2026-04-23', free:true, desc:'Spring Vibes Afterwork Party mit DJane Nadiia im GATE Club. Melodic, Tech & Afro House. Do. 23. April, 20–01 Uhr. Eintritt frei!', genre:'Melodic House / Tech House / Afro House', ticket:'', outdoor:false, ageMin:18, price:'Kostenlos', oepnv:'S-Bahn S2 bis Flughafen, Terminal 2', parking:'Flughafen Parkhaus'},

  // ─── ONEMMORE ROOFTOP – CINECITTA NÜRNBERG ──────────────────────────────
  {cat:'afterwork', name:'oneMore Rooftop Party – Season Opening', loc:'Nürnberg – CineCittà Rooftop (Gewerbemuseumsplatz 3)', start:'2026-04-18', end:'2026-04-18', free:false, desc:'oneMore summer is coming! Season Opening auf dem Rooftop des CineCittà Nürnberg – Aperol, Pizza, pure House Music von Unic, Aaron Miraku, Elision & AE97. Golden Hour trifft Skyline. 16–22 Uhr. 18+. Afterparty im mach1 inklusive!', genre:'House / Rooftop / Sundowner', ticket:'https://onemore.ticket.io/UDUcTMBi/', outdoor:true, ageMin:18, price:'Tickets ab 6€', oepnv:'U2/U3 Hauptbahnhof, 3 min Fußweg', parking:'Tiefgarage CineCittà'},
  {cat:'afterwork', name:'oneMore Rooftop Party – Round Two', loc:'Nürnberg – CineCittà Rooftop (Gewerbemuseumsplatz 3)', start:'2026-05-14', end:'2026-05-14', free:false, desc:'oneMore rooftop season continues! Die erste Party war komplett ausverkauft – jetzt Round Two. More sun, more rooftop vibes, more house music. Am stunning Rooftop des CineCittà Nürnberg: Cold Drinks, Pizza Slices, City Views und das besondere Rooftop-Feeling. Donnerstag (Christi Himmelfahrt), 16:00 Uhr.', genre:'House / Rooftop / Sundowner', ticket:'https://onemore.ticket.io', new:true, outdoor:true, ageMin:18, price:'Tickets via onemore.ticket.io', oepnv:'U2/U3 Hauptbahnhof, 3 min Fußweg', parking:'Tiefgarage CineCittà'},
  {cat:'afterwork', name:'WALDBAD – OFF.COURT × OneMore (Summer Opening)', loc:'Neustadt an der Aisch – Waldbad', start:'2026-05-09', end:'2026-05-09', free:false, desc:'off.court × oneMore – Summer Opening im Waldbad Neustadt/Aisch. Sa, 9. Mai, 15–23 Uhr. Open-Air-Vibes zwischen Natur, Wasser und elektronischen Sounds – einer der außergewöhnlichsten Spots der Region. Genres: House, Hip-Hop, Techno, 2000s, Afro, Electro. Gemeinsam mit OneMore aus Erlangen. Bei schlechtem Wetter behält dein Ticket Gültigkeit für das nächste Event – null Risiko, nur Vorfreude.', genre:'House / Hip-Hop / Techno / 2000s / Afro / Electro', ticket:'https://events.nocstar.de', new:true, outdoor:true, ageMin:18, price:'Tickets via Nocstar', oepnv:'Bahn nach Neustadt (Aisch) Bahnhof', parking:'Vorhanden am Waldbad'},

  // ─── SOUL ROOFTOP – CLUB STEREO × ADINA HOTEL NÜRNBERG ──────────────────
  {cat:'afterwork', name:'SOUL ROOFTOP – Opening Session', loc:'Nürnberg – Adina Hotel Rooftop (Dr.-Kurt-Schumacher-Str. 1)', start:'2026-05-30', end:'2026-05-30', free:false, desc:'SOUL ROOFTOP Opening! Club Stereo bespielt fünfmal das Rooftop des Hotel Adina. Auftakt mit Studio Wolny & Jens. 17–22 Uhr. Nur 120 Tickets. Club Stereo ab 23 Uhr im Ticketpreis inklusive!', genre:'Soul / House / Rooftop', ticket:'https://tickets.infield.live/event/soul-rooftop-okz1gz', outdoor:true, ageMin:18, price:'Tickets limitiert', oepnv:'U1/U2/U3 Hauptbahnhof, 5 min Fußweg', parking:'Tiefgarage HBF / Innenstadt'},
  {cat:'afterwork', name:'SOUL ROOFTOP – Adina Hotel', loc:'Nürnberg – Adina Hotel Rooftop (Dr.-Kurt-Schumacher-Str. 1)', start:'2026-07-11', end:'2026-07-11', free:false, desc:'SOUL ROOFTOP Session mit Tommy Yamaha & Marc Worm auf dem Adina Hotel Rooftop. 17–22 Uhr. Nur 120 Tickets. Club Stereo ab 23 Uhr inklusive!', genre:'Soul / House / Rooftop', ticket:'https://www.club-stereo.net/party/soul-rooftop/', outdoor:true, ageMin:18, price:'Tickets limitiert', oepnv:'U1/U2/U3 Hauptbahnhof, 5 min Fußweg', parking:'Tiefgarage HBF / Innenstadt'},

  // ─── SOLUNA ROOFTOP EVENTS – DÄCHLA FÜRTH ───────────────────────────────
  {cat:'afterwork', name:'SOLUNA Rooftop Edition – Season Opening (× Dächla)', loc:'Fürth – Dächla Rooftop (Friedrichstraße 6a)', start:'2026-05-09', end:'2026-05-09', free:false, desc:'SOLUNA × DÄCHLA – Season Opening Rooftop Edition über den Dächern von Fürth. Lineup: Aymen Rhalib (YE), Jan-Leon Weiss (Fever Dream) und O3 (Ibiza House). Afro-, Melodic- & Tech-House von 16–22 Uhr. Powered by Ramazzotti Aperitivo Arancia 0.0. Inkl. Afterparty im mach_eins.', genre:'Afro House / Melodic House / Tech House', ticket:'https://www.soluna-sunset.de', new:true, outdoor:true, ageMin:18, price:'Tickets via soluna-sunset.de', oepnv:'U1 Fürth Hbf, 5 min Fußweg', parking:'Innenstadt Fürth'},
  {cat:'afterwork', name:'SOLUNA Rooftop Event – Dächla Fürth', loc:'Fürth – Dächla Rooftop (Friedrichstraße 6a)', start:'2026-06-06', end:'2026-06-06', free:false, desc:'SOLUNA – der Sundowner Event über den Dächern von Fürth! Cocktails, Musik und Rooftop-Feeling auf dem Dächla in Fürth. Atemberaubende Aussicht, lässige Atmosphäre.', genre:'Sundowner / Rooftop / After Work', ticket:'https://daechla.de/events', outdoor:true, ageMin:18, price:'Eintritt (Tickets via daechla.de)', oepnv:'U1 Fürth Hbf, 5 min Fußweg', parking:'Innenstadt Fürth'},
  {cat:'afterwork', name:'SOLUNA Rooftop Event – Dächla Fürth', loc:'Fürth – Dächla Rooftop (Friedrichstraße 6a)', start:'2026-08-08', end:'2026-08-08', free:false, desc:'SOLUNA – der Sundowner Event über den Dächern von Fürth! Cocktails, Musik und Rooftop-Feeling auf dem Dächla in Fürth. Atemberaubende Aussicht, lässige Atmosphäre.', genre:'Sundowner / Rooftop / After Work', ticket:'https://daechla.de/events', outdoor:true, ageMin:18, price:'Eintritt (Tickets via daechla.de)', oepnv:'U1 Fürth Hbf, 5 min Fußweg', parking:'Innenstadt Fürth'},
  {cat:'afterwork', name:'SOLUNA Rooftop Event – Dächla Fürth', loc:'Fürth – Dächla Rooftop (Friedrichstraße 6a)', start:'2026-08-29', end:'2026-08-29', free:false, desc:'SOLUNA – der Sundowner Event über den Dächern von Fürth! Cocktails, Musik und Rooftop-Feeling auf dem Dächla in Fürth. Atemberaubende Aussicht, lässige Atmosphäre.', genre:'Sundowner / Rooftop / After Work', ticket:'https://daechla.de/events', outdoor:true, ageMin:18, price:'Eintritt (Tickets via daechla.de)', oepnv:'U1 Fürth Hbf, 5 min Fußweg', parking:'Innenstadt Fürth'},

  // ─── WEINFESTE ───────────────────────────────────────────────────────────
  // Bestätigte Termine
  {cat:'weinfest', name:'Würzburger Weindorf', loc:'Würzburg – Marktplatz & Innenstadt', start:'2026-05-29', end:'2026-06-10', free:true, desc:'Eines der ältesten und schönsten Weinfeste Deutschlands – 13 Tage Frankenwein, Kulinarik und Musik auf dem historischen Marktplatz in Würzburg. Eintritt frei!', genre:'Weinfest / Fränkischer Wein', ticket:'https://www.wuerzburger-weindorf.de', outdoor:true, ageMin:0, price:'Kostenlos (Konsumation)', oepnv:'Bahn nach Würzburg Hbf, 10 min Fußweg', parking:'Innenstadt Würzburg'},
  {cat:'weinfest', name:'Promenaden-Weinfest Kitzingen', loc:'Kitzingen – Stadtpromenade', start:'2026-06-26', end:'2026-07-06', free:true, desc:'Kitzingens großes Weinfest an der malerischen Stadtpromenade – 11 Tage Frankenwein, Live-Musik und Festzeltbetrieb direkt am Main.', genre:'Weinfest / Frankenwein', ticket:'', outdoor:true, ageMin:0, price:'Kostenlos (Konsumation)', oepnv:'Bahn nach Kitzingen', parking:'Stadtmitte Kitzingen'},
  {cat:'weinfest', name:'Weinfest Wasserburg am Inn', loc:'Wasserburg am Inn', start:'2026-07-25', end:'2026-07-25', free:true, desc:'Gemütliches Weinfest in der historischen Altstadt von Wasserburg – Weine aus der Region, Live-Musik und Halbinsel-Flair am Inn. Immer am letzten Samstag im Juli, Wein unter freiem Sommerhimmel und in den Arkadengängen der Altstadt.', genre:'Weinfest / Sommer', ticket:'', outdoor:true, ageMin:0, price:'Kostenlos', oepnv:'Bahn nach Wasserburg am Inn', parking:'Innenstadt Wasserburg'},
  {cat:'weinfest', name:'Traditionelles Mostfest Lalling (mit Töpfermarkt)', loc:'Lalling – Bayerischer Wald', start:'2026-05-30', end:'2026-05-31', free:true, desc:'Traditionsreiches Lallinger Mostfest mit Töpfermarkt im Bayerischen Wald – regionaler Most, Brotzeiten und gemütliches Beisammensein. Krönung der Deutschen Mostkönigin am Samstag.', genre:'Mostfest / Brauchtum / Töpfermarkt', ticket:'https://lalling.de', outdoor:true, ageMin:0, price:'Kostenlos', oepnv:'Bahn nach Deggendorf, weiter Bus', parking:'Vor Ort'},
  {cat:'weinfest', name:'Pfälzer Weinfest Landau a.d. Isar', loc:'Landau an der Isar', start:'2026-05-29', end:'2026-05-31', free:true, desc:'Pfälzer Weine trifft bayerische Gastlichkeit – ein Wochenende Weinfestival in Landau an der Isar mit Winzern aus der Pfalz.', genre:'Weinfest / Pfälzer Wein', ticket:'', outdoor:true, ageMin:0, price:'Kostenlos', oepnv:'Bahn nach Landau a.d. Isar', parking:'Vor Ort'},

  // Termin 2026 noch offen – typische Sommer-/Herbsttermine
  {cat:'weinfest', name:'Hofgarten-Weinfest Würzburg', loc:'Würzburg – Hofgarten der Residenz', start:'2026-06-26', end:'2026-07-05', free:true, desc:'Exklusives Weinfest im barocken Hofgarten der Würzburger Residenz – Frankenweine der Region in einzigartiger UNESCO-Welterbe-Kulisse. Veranstalter: Staatlicher Hofkeller Würzburg. So/Mo/Di 17–23 Uhr, Mi–Sa bis 24 Uhr.', genre:'Weinfest / Frankenwein', ticket:'https://www.hofkeller.de/Weinfest-im-Hofgarten', outdoor:true, ageMin:0, price:'Kostenlos (Konsumation)', oepnv:'Bahn nach Würzburg Hbf', parking:'Residenz Würzburg'},
  {cat:'weinfest', name:'Hofschoppenfest Würzburg (Bürgerspital)', loc:'Würzburg – Bürgerspital Innenhof', start:'2026-06-10', end:'2026-06-20', free:true, desc:'11 Tage gemütliches Schoppen-Fest im historischen Innenhof der Bürgerspital Weinstuben. Frankenweine aus dem Bürgerspital-Weingut, Brotzeiten und Sommeratmosphäre. Highlight: White Party am 15. Juni (alle in Weiß).', genre:'Weinfest / Schoppen', ticket:'https://www.buergerspital-weinstuben.de/feiern/unsere_feste/hofschoppenfest/', outdoor:true, ageMin:0, price:'Kostenlos', oepnv:'Bahn nach Würzburg Hbf', parking:'Innenstadt Würzburg'},
  {cat:'weinfest', name:'Wein am Stein Festival Würzburg', loc:'Würzburg – Weingut am Stein', start:'2026-07-09', end:'2026-07-26', free:false, desc:'14 Tage / 14 Nächte Weinfest auf dem legendären Würzburger Stein – einer der berühmtesten Weinlagen Deutschlands. Täglich Live-Bands mitten in den Reben. Mo–Fr ab 16:30 Uhr, Sa/So ab 15 Uhr.', genre:'Weinfest / Würzburger Stein / Live-Musik', ticket:'https://weinamstein.ticket.io', outdoor:true, ageMin:0, price:'Tickets via wein-am-stein.de', oepnv:'Bahn nach Würzburg Hbf', parking:'Steinbachtal'},
  {cat:'weinfest', name:'76. Fränkisches Weinfest Volkach', loc:'Volkach – Festplatz', start:'2026-08-14', end:'2026-08-18', free:true, desc:'76. Fränkisches Weinfest – Frankens größtes Weinfest mit ~50.000 Besuchern. Über 60 Frankenweine der Volkacher Mainschleife, Festplatz-Kulisse unter Allee-Bäumen, kulinarische Spezialitäten und Live-Musik.', genre:'Weinfest / Frankenwein', ticket:'https://www.volkach.de', outdoor:true, ageMin:0, price:'Kostenlos', oepnv:'Bahn nach Volkach', parking:'Festplatz Volkach'},
  {cat:'weinfest', name:'Straßenweinfest Sommerhausen (Burschenverein)', loc:'Sommerhausen – Weindorf', start:'2026-06-27', end:'2026-06-29', free:true, desc:'Charmantes Straßenweinfest des Historischen Burschenvereins im Winzerdorf Sommerhausen – Frankenweine, gemütliche Gassen und echte fränkische Gastlichkeit. Festbeginn Sa 27.06. um 16 Uhr.', genre:'Weinfest / Winzerdorf', ticket:'https://burschenverein.sommerhausen.de', outdoor:true, ageMin:0, price:'Kostenlos', oepnv:'Bus ab Würzburg', parking:'Vor Ort'},
  {cat:'weinfest', name:'55. Rödelseer Weinfest', loc:'Rödelsee – Schloss Crailsheim', start:'2026-07-03', end:'2026-07-06', free:true, desc:'55. Rödelseer Weinfest in romantischer Idylle rund um das Schloss Crailsheim. Immer am ersten Wochenende im Juli, fränkische Winzer und Mainfranken-Weingenuss.', genre:'Weinfest / Frankenwein', ticket:'https://www.weinfest-roedelsee.de', outdoor:true, ageMin:0, price:'Kostenlos', oepnv:'Bus ab Kitzingen', parking:'Vor Ort'},
  {cat:'weinfest', name:'Weinfest "Romantik & Wein" Obernbreit', loc:'Obernbreit – Historisches Rathaus', start:'2026-07-03', end:'2026-07-05', free:true, desc:'Traditionelles Weinfest "Romantik und Wein" am historischen Rathaus Obernbreit. Immer am ersten Wochenende im Juli – Frankenweine in Gassen, Höfen und Scheunen, dazu deftige Spezialitäten.', genre:'Weinfest / Tradition', ticket:'https://obernbreit.de', outdoor:true, ageMin:0, price:'Kostenlos', oepnv:'Bus ab Kitzingen', parking:'Vor Ort'},
  {cat:'weinfest', name:'Weinfest Röttingen (zu Pfingsten)', loc:'Röttingen – Liebliches Taubertal', start:'2026-05-22', end:'2026-05-25', free:true, desc:'Weinfest in der Weinstadt Röttingen im Lieblichen Taubertal – immer zu Pfingsten. Fränkische Weine vom Röttinger Feuerstein (Silvaner, Tauberschwarz), Live-Musik, Tanz, Flohmarkt und Kinderschminken am historischen Marktplatz.', genre:'Weinfest / Taubertal / Pfingsten', ticket:'https://www.roettingen.de', outdoor:true, ageMin:0, price:'Kostenlos', oepnv:'Bus ab Würzburg', parking:'Vor Ort'},
  {cat:'weinfest', name:'Wein|See|Lig Großlangheim', loc:'Großlangheim – Schlossruine am See', start:'2026-07-17', end:'2026-07-20', free:true, desc:'Weinfest "Wein|See|Lig" in Großlangheim direkt an der Schlossruine am See. Eröffnung durch die Weinprinzessin, Frankenweine, Live-Musik und Spezialitäten der Weinlounge.', genre:'Weinfest / Frankenwein', ticket:'https://www.grosslangheim.de', outdoor:true, ageMin:0, price:'Kostenlos', oepnv:'Bus ab Kitzingen', parking:'Vor Ort'},
  {cat:'weinfest', name:'Weinfestival Kleinlangheim', loc:'Kleinlangheim – Festival-Platz', start:'2026-06-19', end:'2026-06-22', free:false, desc:'Weinfestival Kleinlangheim – Frankenweine trifft Festival-Feeling. Festival-Platz mit vielen Lichtern, mitreißender Live-Musik und vielfältigem Speisenangebot. Eintrittspreise: Fr 18:30 Uhr 7€ (vorher frei), Sa 18:00 Uhr frei/3€/7€, So+Mo freier Eintritt.', genre:'Weinfestival / Frankenwein', ticket:'https://www.weinfestival-kleinlangheim.eu', outdoor:true, ageMin:0, price:'Tickets ab 7€', oepnv:'Bus ab Kitzingen', parking:'Vor Ort'},
  {cat:'weinfest', name:'Summer-Wine-Time Ipsheim', loc:'Ipsheim – Mittelfranken', start:'2026-07-31', end:'2026-08-02', free:true, desc:'Sommerliches Weinfest in Ipsheim im mittelfränkischen Weinland – Frankenweine, entspannte Sommeratmosphäre und regionale Spezialitäten. Termin 2026 noch nicht bestätigt.', genre:'Weinfest / Sommer', ticket:'', outdoor:true, ageMin:0, price:'Kostenlos', oepnv:'Bahn nach Uffenheim', parking:'Vor Ort'},
  {cat:'weinfest', name:'Wipfelder Straßenweinfest', loc:'Wipfeld – Marktplatz am Main', start:'2026-08-14', end:'2026-08-16', free:true, desc:'Dreitägiges Straßenweinfest des Musikverein-Weinbauverein Wipfeld am Mainufer. Fränkische Weine im stilvollen Ambiente zwischen Fachwerkhäusern und dezenter Beleuchtung rund um den historischen Marktplatz. Mariä Himmelfahrt.', genre:'Weinfest / Mainufer', ticket:'https://www.wipfeld.de', outdoor:true, ageMin:0, price:'Kostenlos', oepnv:'Bus ab Schweinfurt', parking:'Vor Ort'},
  {cat:'weinfest', name:'40. Altstadt-Weinfest Zeil am Main (Jubiläum)', loc:'Zeil am Main – Altstadt', start:'2026-07-31', end:'2026-08-03', free:true, desc:'40. Altstadt-Weinfest in der historischen Altstadt von Zeil am Main – Jubiläumsausgabe. Erstmals startet das Fest bereits am Freitagabend ab 19 Uhr. Fränkische Weine, Blasmusik, Fachwerk-Ambiente und festliche Musik unter Lichtern.', genre:'Weinfest / Altstadt / Jubiläum', ticket:'https://www.zeil-am-main.de', outdoor:true, ageMin:0, price:'Kostenlos', oepnv:'Bus ab Haßfurt', parking:'Altstadt Zeil'},
  {cat:'weinfest', name:'Weinherbst Miltenberg', loc:'Miltenberg – Engelplatz', start:'2026-09-25', end:'2026-09-27', free:true, desc:'Weinherbst auf dem Engelplatz in Miltenberg – Frankenweine in romantischer mittelalterlicher Altstadt am Bayerischen Untermain. Regionale Winzer und fränkische Spezialitäten.', genre:'Weinherbst / Altstadt', ticket:'https://churfranken.de', outdoor:true, ageMin:0, price:'Kostenlos', oepnv:'Bahn nach Miltenberg', parking:'Innenstadt Miltenberg'},
  {cat:'weinfest', name:'Weinherbst Birkenfeld', loc:'Birkenfeld – Württemberg', start:'2026-09-11', end:'2026-09-13', free:true, desc:'Herbstliches Weinfest in Birkenfeld – Württemberger und regionale Weine, gesellige Atmosphäre und Erntezeit-Stimmung. Termin 2026 noch nicht bestätigt.', genre:'Weinherbst / Herbst', ticket:'', outdoor:true, ageMin:0, price:'Kostenlos', oepnv:'Bahn nach Pforzheim, weiter Bus', parking:'Vor Ort'},
  {cat:'weinfest', name:'15. Bamberger Weinfest', loc:'Bamberg – Maxplatz', start:'2026-05-21', end:'2026-05-25', free:true, desc:'15. Bamberger Weinfest auf dem Maxplatz (nicht Sandstraße!) – Frankenweine in der UNESCO-Welterbe-Stadt. Eröffnung Do 21. Mai 18:30 Uhr. Bierstadt Bamberg feiert den Wein in der Innenstadt.', genre:'Weinfest / Frankenwein', ticket:'https://kultur.bamberg.de', outdoor:true, ageMin:0, price:'Kostenlos', oepnv:'Bahn nach Bamberg Hbf', parking:'Innenstadt Bamberg'},
  {cat:'weinfest', name:'13. Bayreuther Weinfest', loc:'Bayreuth – Marktplatz', start:'2026-08-06', end:'2026-08-10', free:true, desc:'13. Bayreuther Weinfest auf dem Marktplatz – Frankenweine und regionale Spezialitäten in der Stadt der Festspiele. Bayreuther Innenstadt wird zum Genussparadies.', genre:'Weinfest / Frankenwein', ticket:'https://weinfest-bayreuth.de', outdoor:true, ageMin:0, price:'Kostenlos', oepnv:'Bahn nach Bayreuth Hbf', parking:'Innenstadt Bayreuth'},
  {cat:'weinfest', name:'Weinfest Kulmbach (Premiere)', loc:'Kulmbach – Marktplatz', start:'2026-05-22', end:'2026-05-25', free:true, desc:'PREMIERE: Erstes Weinfest in Kulmbach! Die bekannte Bierstadt feiert den Wein. 17 erlesene Weine – fruchtig-frische Weißweine, elegante Rosés, vollmundige Rotweine – Donnerstag bis Sonntag auf dem Marktplatz.', genre:'Weinfest / Premiere / Frankenwein', ticket:'https://www.kulmbach.de', outdoor:true, ageMin:0, price:'Kostenlos', oepnv:'Bahn nach Kulmbach', parking:'Innenstadt Kulmbach'},
  {cat:'weinfest', name:'Weinfest Bad Reichenhall', loc:'Bad Reichenhall – Rathausplatz', start:'2026-08-12', end:'2026-08-15', free:true, desc:'Weinfest am Rathausplatz Bad Reichenhall – internationale Weine, Wein-Spezialitäten und Kurort-Ambiente. Termin Mitte August (genauer Termin 2026 in Bestätigung).', genre:'Weinfest / Kurbad', ticket:'https://www.stadt-bad-reichenhall.de', outdoor:true, ageMin:0, price:'Eintritt', oepnv:'Bahn nach Bad Reichenhall', parking:'Kurort Bad Reichenhall'},
  {cat:'weinfest', name:'Weinfest Schwabmünchen', loc:'Schwabmünchen – Marktplatz', start:'2026-10-25', end:'2026-10-25', free:true, desc:'Herbstliches Weinfest auf dem Marktplatz Schwabmünchen – immer am vierten Sonntag nach Michaeli (29.09.). Sonntagsweinfest Ende Oktober mit Weinen aus der Region.', genre:'Weinfest / Herbst', ticket:'https://schwabmuenchen.de', outdoor:true, ageMin:0, price:'Kostenlos', oepnv:'Bahn nach Schwabmünchen', parking:'Marktplatz'},
  {cat:'weinfest', name:'Oberstdorfer Weinfest', loc:'Oberstdorf – Kurpark Prinzregenten-Platz', start:'2026-08-28', end:'2026-08-30', free:true, desc:'Oberstdorfer Weinfest im Kurpark – Winzer aus Rheinhessen präsentieren neueste Kreationen, Winzersekte und Destillate. Bei jedem Wetter, Eintritt frei. Live-Musik täglich ab 16 Uhr (Wildbock, The Rubberneckers, Musikkapelle Oberstdorf).', genre:'Weinfest / Alpen', ticket:'https://www.oberstdorf.de', outdoor:true, ageMin:0, price:'Kostenlos', oepnv:'Bahn nach Oberstdorf', parking:'Kurort Oberstdorf'},
  {cat:'festival', name:'Black Coffee – Open Air', loc:'Große Straße, Nürnberg', start:'2026-04-30', end:'2026-04-30', free:false, desc:'17–23 Uhr. Grammy-Gewinner Black Coffee (Afro House / Electronic) live auf der Großen Straße am Dutzendteich. Erstes Nürnberg-Konzert der Ibiza-Legende – über 10.000 Besucher erwartet. Strikt ab 18 Jahren, keine Ausnahmen.', genre:'Afro House / Electronic', ticket:'https://blackcoffee.ticket.io/', new:true, outdoor:true, ageMin:18, price:'Tickets auf ticket.io', oepnv:'Tram 6/10 oder U1 bis Frankenstraße', parking:'Parkplatz Zeppelinfeld / Dutzendteich'},

  // ─── NEU KW17 2026 (Update 20. April 2026) ──────────────────────────────
  {cat:'russian', name:'ONLY Russian Open Air (Russian Sensation × Only)', loc:'Nürnberg – Serenadenhof', start:'2026-05-30', end:'2026-05-30', free:false, desc:'Erstes Russian Open Air dieses Jahr in Nürnberg – Russian Sensation × ONLY Club im Serenadenhof. Europas größte russische Eventreihe feiert Open-Air-Premiere unter freiem Himmel. 16–22 Uhr. Gute Vibes, starke Beats und beste Community. Lineup folgt in Kürze (u.a. DJ Insane, only.nuernberg, russianconnectionfestival.de).', genre:'Russian Party / Open Air', ticket:'https://www.eventbrite.de/e/russian-sensation-x-only-open-air-festival-nurnberg-tickets-1985050638897', new:true, outdoor:true, ageMin:16, price:'Infos auf Eventbrite', oepnv:'U1 bis Frankenstraße oder S-Bahn Richtung Langwasser', parking:'Parkplatz Serenadenhof'},
  {cat:'russian', name:'Russian White Night', loc:'Deggendorf – Club Chao Chao', start:'2026-06-06', end:'2026-06-06', free:false, desc:'White Night Edition (белая ночь) von SOYUZ Events – Dresscode: Weiß! 100 White Welcome Shots für die ersten Gäste, aufwändige weiße Deko, Professional Photographer, weiße Sonnenbrillen & elegante Fächer. Music by DJ IGUAN × DJ FAMOUS (Russian Dance Music). Einlass 23:00 Uhr.', genre:'Russian Dance Music', ticket:'https://www.instagram.com/soyuz_events', outdoor:false, ageMin:16, price:'10 €', oepnv:'Bahn nach Deggendorf Hbf', parking:'Vorhanden'},
  {cat:'festival', name:'Musikfest ION – 75. Jubiläum', loc:'Nürnberg (verschiedene Spielstätten)', start:'2026-06-19', end:'2026-07-05', free:false, desc:'75. Ausgabe des internationalen Festivals für Geistliche Musik in Nürnberg. Jubiläumswochenende 19.–21. Juni mit 9 Konzerten auf 3 Spielstätten. 30 Konzerte mit The King\'s Singers, Anna Prohaska, Cameron Carpenter, Windsbacher Knabenchor u.v.m.', genre:'Klassik / Geistliche Musik / Orgel', ticket:'https://musikfest-ion.de', outdoor:false, ageMin:0, price:'ab 15 €', oepnv:'U-Bahn Nürnberg Innenstadt', parking:'Altstadt-Parkhäuser'},
  {cat:'festival', name:'Zabbath Open Air', loc:'Nürnberg – Z-Bau', start:'2026-08-29', end:'2026-08-29', free:false, desc:'Underground Metal Festival im Z-Bau Nürnberg – Open-Air-Stage, zwei Indoor-Stages, 10 Bands, Kunstausstellung und Biergarten. 2026 u.a. mit Wolvennest (Atmospheric Black Doom), Imha Tarikat (Black Metal), Bedsore (Death Metal), Hexer (Sludge/Doom) u.v.m. No Racism. No Sexism. No Homophobia.', genre:'Black Metal / Doom / Sludge / Death Metal', ticket:'https://www.tixforgigs.com/Event/72697', outdoor:true, ageMin:16, price:'Infos auf tixforgigs.com', oepnv:'U1 bis Frankenstraße', parking:'Begrenzt'},
  {cat:'festival', name:'Incantation Rites Festival', loc:'Nürnberg – Z-Bau', start:'2026-12-05', end:'2026-12-05', free:false, desc:'Incantation Rites – Death & Doom Metal Festival im Z-Bau Nürnberg mit AHAB, Sulphur Aeon, Thronehammer und weiteren Bands. Atmosphärisches Underground-Festival in Nürnbergs renommiertem Club.', genre:'Death Metal / Doom Metal', ticket:'', outdoor:false, ageMin:16, price:'TBC', oepnv:'U1 bis Frankenstraße', parking:'Begrenzt'},

  // ─── 🏝️ BEACH PARTYS in Thermen & Erlebnisbädern (Update 20. April 2026) ──
  {cat:'beachparty', name:'Saunafest „Wir geben alles!"', loc:'Kristall Palm Beach, Stein', start:'2026-05-02', end:'2026-05-02', free:false, desc:'Ab 16 Uhr. Saunafest mit den besten Aufguss-Highlights aus über 20 Jahren. Showaufgüsse, Lagerfeuer, Live-Musik und stimmungsvolles Rahmenprogramm in der Saunalandschaft. Ab 16 Jahren (FKK-Saunabereich).', genre:'Saunafest / Show-Aufgüsse', ticket:'https://palm-beach.de/aktionen-events/', new:true, outdoor:false, ageMin:16, price:'Regulärer Eintritt Sauna', oepnv:'Bus 60/65 bis Stein, Palm Beach', parking:'Vorhanden kostenlos'},
  {cat:'beachparty', name:'Saunafest „Alle wollen Malle"', loc:'Kristall Palm Beach, Stein', start:'2026-06-06', end:'2026-06-06', free:false, desc:'Ab 16 Uhr. Mallorca-Feeling im Palm Beach: Partyaufgüsse, Palmen-Atmosphäre, Freibier und Urlaubsvibes im gesamten Saunabereich. Feiern, schwitzen und genießen wie im Urlaub. Ab 16 Jahren (FKK-Saunabereich).', genre:'Saunafest / Malle-Party', ticket:'https://palm-beach.de/aktionen-events/', new:true, outdoor:false, ageMin:16, price:'Regulärer Eintritt Sauna', oepnv:'Bus 60/65 bis Stein, Palm Beach', parking:'Vorhanden kostenlos'},
  {cat:'beachparty', name:'Herbarium Festival', loc:'Therme Erding', start:'2026-04-13', end:'2026-04-26', free:false, desc:'Frühlings-Wellness-Festival in der größten Therme der Welt. Kräuter-Aufgüsse, Live-Musik unter Palmen, besondere Massagen und botanisch inspiriertes Kulinarik-Programm über zwei Wochen. VitalOase & VitalTherme.', genre:'Wellness-Festival / Kräuter-Aufgüsse', ticket:'https://shop.therme-erding.de/spar-angebote/eventtickets', new:true, outdoor:true, ageMin:0, price:'ab 65,90 € Weekday / 70,90 € Weekend', oepnv:'S2 Erding, dann Bus', parking:'Vorhanden (gebührenpflichtig)'},
  {cat:'beachparty', name:'CineWave – Kino im Wellenbad', loc:'Therme Erding', start:'2026-04-25', end:'2026-04-25', free:false, desc:'Schwimmen und gleichzeitig Filme schauen: Das CineWave verwandelt das Wellenbad in ein schwimmendes Open-Air-Kino. Auf Schwimmreifen durch das Wasser treiben und gleichzeitig einen Film erleben.', genre:'Kino / Poolevent', ticket:'https://www.therme-erding.de/event-detail/cinewave/', new:true, outdoor:false, ageMin:0, price:'Ticket erforderlich', oepnv:'S2 Erding, dann Bus', parking:'Vorhanden (gebührenpflichtig)'},
  {cat:'beachparty', name:'Lange Nacht der Saunen', loc:'Therme Erding', start:'2026-05-08', end:'2026-05-08', free:false, desc:'Die längste Saunanacht des Jahres. Showaufgüsse, besondere Inszenierungen, Live-Musik und kulinarische Überraschungen bis tief in die Nacht. Ab 16 Jahren (textilfreier Saunabereich).', genre:'Saunanacht / Showaufgüsse', ticket:'https://www.therme-erding.de/event-detail/lange-nacht-der-saunen/', new:true, outdoor:false, ageMin:16, price:'Ticket erforderlich', oepnv:'S2 Erding, dann Bus', parking:'Vorhanden (gebührenpflichtig)'},
  {cat:'beachparty', name:'BAYERN 3 Beachparty', loc:'Therme Erding', start:'2026-06-05', end:'2026-06-07', free:false, desc:'3-tägige Beach-Party am Wellenbad-Außenpool. Große Showbühne mit Top-Acts von BAYERN 3, Beach-Cocktails, Palmen-Ambiente. Einer der Sommer-Höhepunkte der größten Therme der Welt.', genre:'Beachparty / Live-Musik', ticket:'https://shop.therme-erding.de/spar-angebote/eventtickets', new:true, outdoor:true, ageMin:16, price:'62,90 € pro Tag', oepnv:'S2 Erding, dann Bus', parking:'Vorhanden (gebührenpflichtig)'},
  {cat:'beachparty', name:'Summer Festival powered by Adelholzener', loc:'Therme Erding', start:'2026-07-10', end:'2026-07-12', free:false, desc:'3-tägiges Open-Air Sommer-Festival. Der Wellenbad-Außenpool verwandelt sich in einen riesigen Open-Air-Dancefloor mit Live-Acts, DJs und Palmen-Party-Atmosphäre.', genre:'Open-Air / House / Dance', ticket:'https://shop.therme-erding.de/spar-angebote/eventtickets', new:true, outdoor:true, ageMin:16, price:'57,90–62,90 € pro Tag', oepnv:'S2 Erding, dann Bus', parking:'Vorhanden (gebührenpflichtig)'},
  {cat:'beachparty', name:'90er Party', loc:'Therme Erding', start:'2026-07-24', end:'2026-07-24', free:false, desc:'Große 90er-Themenparty am Pool. Hits aus den Neunzigern, Retro-Outfits willkommen, Disco-Vibes unter Palmen. Nostalgische Sommernacht an der Therme.', genre:'90er / Retro / Pool', ticket:'https://shop.therme-erding.de/spar-angebote/eventtickets/90er-party', new:true, outdoor:true, ageMin:16, price:'57,90 €', oepnv:'S2 Erding, dann Bus', parking:'Vorhanden (gebührenpflichtig)'},
  {cat:'beachparty', name:'Dirndlflug Contest', loc:'Therme Erding', start:'2026-07-25', end:'2026-07-25', free:false, desc:'Kultiger Rutschen-Contest im Dirndl bzw. in der Lederhose. Jede Menge Spaß, bayerische Stimmung und Preise für die besten Flieger. Ein Highlight des Therme-Erding-Sommers.', genre:'Contest / Bayrische Party', ticket:'https://www.therme-erding.de/event-detail/dirndlflug-contest/', new:true, outdoor:true, ageMin:16, price:'Ticket erforderlich', oepnv:'S2 Erding, dann Bus', parking:'Vorhanden (gebührenpflichtig)'},
  {cat:'beachparty', name:'Brass Poolparty', loc:'Therme Erding', start:'2026-08-22', end:'2026-08-23', free:false, desc:'Zwei Tage bayerische Brass-Lebensfreude am Pool: Blasmusik trifft Party-Sound, Heimatklänge und echte bayerische Lifestyle-Vibes am Wellenbad-Außenpool.', genre:'Brass / Bayrische Beats', ticket:'https://shop.therme-erding.de/spar-angebote/eventtickets', new:true, outdoor:true, ageMin:16, price:'62,90 € pro Tag', oepnv:'S2 Erding, dann Bus', parking:'Vorhanden (gebührenpflichtig)'},
  {cat:'beachparty', name:'Summer Closing House Party', loc:'Therme Erding', start:'2026-09-12', end:'2026-09-12', free:false, desc:'Großes Sommer-Abschlussfest: Der Wellenbad-Außenpool wird zur pulsierenden Open-Air-Dance-Stage mit House-DJs und Beats bis in die Nacht. Saison-Finale unter Palmen.', genre:'House / Open-Air Closing', ticket:'https://www.therme-erding.de/event-detail/summer-closing-house-party/', new:true, outdoor:true, ageMin:16, price:'Ticket erforderlich', oepnv:'S2 Erding, dann Bus', parking:'Vorhanden (gebührenpflichtig)'},

  // ─── 🎉 AFTERWORK / PARTY + 🎵 FESTIVAL + 🎡 KÄRWA (Update 23. April 2026) ───
  {cat:'afterwork', name:'HAYDE! Grand Opening at Nachtkind', loc:'Nachtkind, Nürnberg', start:'2026-04-24', end:'2026-04-24', free:false, desc:'Grand Opening der neuen Event-Reihe HAYDE! im Nachtkind Nürnberg. Ägäis- und Orient-Club-Sounds von 23:00 bis 05:00 Uhr. Line-up: DJ Rasimcan (Köln) und DJ Nycos Benyc (Stuttgart). Einer der spannendsten Club-Abende im April.', genre:'Ägäis / Orient / Club Sounds', ticket:'https://www.instagram.com/nachtkind.nbg/', new:true, outdoor:false, ageMin:18, price:'Ticket erforderlich', oepnv:'U1 bis Hauptbahnhof', parking:'Parkhaus Hauptbahnhof'},
  {cat:'afterwork', name:'ORA Curated Aftershow at Nachtkind', loc:'Nachtkind, Nürnberg', start:'2026-04-30', end:'2026-05-01', free:false, desc:'ORA Curated Aftershow Party im Nachtkind Nürnberg. Von 23:00 bis late mit Chez Marie b2b Blankenheim, Nicole Da Silva, Marvin Aloys b2b Steve Hope und Backroom Session. Hochkarätige Electronic/House-Nacht direkt nach dem Black Coffee Open Air.', genre:'House / Electronic / Aftershow', ticket:'https://www.instagram.com/ora.curated/', new:true, outdoor:false, ageMin:18, price:'Ticket erforderlich', oepnv:'U1 bis Hauptbahnhof', parking:'Parkhaus Hauptbahnhof'},
  {cat:'afterwork', name:'NÜRNBERG FEIERT Vol. 7', loc:'Nürnberg – 8 Clubs Altstadt', start:'2026-05-08', end:'2026-05-08', free:false, desc:'Die größte Clubnacht Nürnbergs. 1 Ticket, 8 Clubs, 20 Acts: Nachtkind, Die Bombe, Hinz x Kunz, Mach 1, Resi, Die Box, Gemein und Gefährlich, Die Rosi. Top Acts u.a. Val (Nachtkind), Ely Oaks (Mach 1), DJ Viga (Hinz x Kunz), Anvee (Die Bombe), Honk! (Resi), Borja Solla (Die Box), Frizzo (Die Rosi), Phil Fuldner (Gemein & Gefährlich).', genre:'House / Techno / Hip-Hop / Mixed Club', ticket:'https://www.nuernberg-feiert.de', new:true, outdoor:false, ageMin:18, price:'1 Ticket für 8 Clubs', oepnv:'U-Bahn Lorenzkirche / Hauptbahnhof', parking:'Parkhaus Altstadt'},
  {cat:'afterwork', name:'LIMERENCE – Picknick & Beats', loc:'Stadtpark Pavillon, Schwabach', start:'2026-05-23', end:'2026-05-23', free:true, desc:'Picknick & Beats im Stadtpark Schwabach. Von 15:00 bis 21:00 Uhr, FREE ENTRY. House & Tech-House Open Air – Picknickdecke & Drinks mitbringen. Von limerence.evts (Ibiza meets Bunker).', genre:'House / Tech-House / Open Air', ticket:'https://www.instagram.com/limerence.evts/', new:true, outdoor:true, ageMin:18, price:'Kostenlos', oepnv:'S-Bahn S1 bis Schwabach', parking:'Vorhanden am Stadtpark'},
  {cat:'festival', name:'Traumhänger Day & Night Open Air 2026', loc:'München – Traumhänger Open Air', start:'2026-06-06', end:'2026-06-06', free:false, desc:'Electronic Music Open Air Festival in München – Day & Night. Mehrstufiger Ticketverkauf, Phase 4 (fast) ausverkauft. Einer der angesagtesten Open-Air-Events Süddeutschlands für Electronic/House-Fans. Details und Line-up laufend auf traumhaengerfestival.de.', genre:'Electronic / House / Techno', ticket:'https://traumhaengerfestival.de', new:true, outdoor:true, ageMin:18, price:'Phase 4 fast ausverkauft', oepnv:'MVV München', parking:'Begrenzt'},
  {cat:'volksfest', name:'Annafest Forchheim', loc:'Forchheim – Kellerwald', start:'2026-07-24', end:'2026-08-03', free:true, desc:'Eines der traditionsreichsten Volksfeste Frankens (seit 1840) im schattigen Eichenwald des Forchheimer Kellerwalds. 23 Bierkeller mit 17 Bieren von 15 Brauereien, 8 Musikbühnen mit Live-Bands und Musikkapellen, 60+ Schausteller und Imbissstände. Bieranstich und Eröffnung am Freitag, 24. Juli.', genre:'Kirchweih / Volksfest / Fränkisches Bier', ticket:'https://www.annafest.bayern', new:true, outdoor:true, ageMin:0, price:'Eintritt frei', oepnv:'Bahn bis Forchheim, dann Shuttle/Bus', parking:'P&R ausgewiesen'},
  {cat:'volksfest', name:'Oktoberfest München 2026 (191. Wiesn)', loc:'München – Theresienwiese', start:'2026-09-19', end:'2026-10-04', free:true, desc:'Das 191. Oktoberfest auf der Theresienwiese – größtes Volksfest der Welt. 16 Tage Bierzelte der sechs Münchner Brauereien, Fahrgeschäfte, Tradition und bayerische Lebensfreude. Eröffnung am Samstag, 19. September, um 12 Uhr mit dem „O\'zapft is!". Öffnungszeiten: Mo–Do 10–23:30, Fr 10–24, Sa 9–24, So/Feiertag 9–23:30 Uhr.', genre:'Volksfest / Wiesn', ticket:'https://www.oktoberfest.de', new:true, outdoor:true, ageMin:0, price:'Eintritt frei (Verzehr kostenpflichtig)', oepnv:'U4/U5 bis Theresienwiese', parking:'Nicht empfohlen – ÖPNV nutzen'},
  // ── KW 18 2026 Update ──
  {cat:'festival', name:'Trucker & Country Festival Deutschland', loc:'Geiselwind – Eventzentrum Strohofer', start:'2026-05-22', end:'2026-05-25', free:false, desc:'43. Ausgabe des größten Trucker & Country-Festivals in Deutschland. 4 Tage Country-Musik, imposante Trucks, Bikes und Western-Flair. ~40.000 Besucher. Mo (25.5.) freier Eintritt. Kinder unter 14 J. kostenlos.', genre:'Country / Western / Trucker', ticket:'https://www.truckerfestival-geiselwind.de', outdoor:true, ageMin:0, price:'Weekend-Ticket ab 65 €, Mo frei', oepnv:'Kein direkter ÖPNV – Fahrgemeinschaft / Shuttle', parking:'Vorhanden am Gelände'},
  {cat:'festival', name:'Feuertanz Festival', loc:'Abenberg – Burg Abenberg', start:'2026-06-12', end:'2026-06-13', free:false, desc:'Mittelalter-, Folk- und Metal-Festival auf der historischen Burg Abenberg bei Roth. 2 Tage mit Dartagnan, In Extremo, Subway To Sally, Corvus Corax u.v.m. Mittelaltermarkt, Feuerakrobatik und Nachtkonzerte. 2026 bereits AUSVERKAUFT.', genre:'Medieval / Folk / Metal', ticket:'https://www.feuertanz-festival.com/tickets.html', outdoor:true, ageMin:0, price:'ab 115 € (ausverkauft)', oepnv:'Bahn nach Roth, dann Bus/Taxi', parking:'Vorhanden am Gelände'},
  {cat:'festival', name:'Meadow Festival', loc:'Feuchtwangen – Stausee Dorfgütingen', start:'2026-06-24', end:'2026-06-27', free:false, desc:'Metal- und Hardcore-Festival am Stausee Dorfgütingen in Feuchtwangen. 4 Tage Open-Air in idyllischer Seelage, ca. 70 km südwestlich von Nürnberg.', genre:'Metal / Hardcore', ticket:'https://www.meadow-festival.de', outdoor:true, ageMin:0, price:'TBC', oepnv:'Kein direkter ÖPNV – Fahrgemeinschaft', parking:'Vorhanden'},
  {cat:'festival', name:'Shamrock Castle Festival', loc:'Eggolsheim – Schloss Jägersburg', start:'2026-07-03', end:'2026-07-04', free:false, desc:'15. Shamrock Castle Festival auf dem malerischen Schloss Jägersburg in der Fränkischen Schweiz. Folk, Irish-Punk und Rock mit Fiddler\'s Green, The Real McKenzies und weiteren 7 Acts. ~2.000 Besucher.', genre:'Folk / Irish / Punk / Rock', ticket:'https://www.shamrock-castle.de/tickets.html', outdoor:true, ageMin:0, price:'ab 93,95 €', oepnv:'Bahn nach Forchheim, dann Bus', parking:'Vorhanden am Gelände'},
  {cat:'festival', name:'Waldstock Festival Pegnitz', loc:'Pegnitz – Schlossberg', start:'2026-07-10', end:'2026-07-12', free:true, desc:'Eines der größten kostenlosen Umsonst-&-Draußen-Festivals Bayerns am Schlossberg in Pegnitz. 3 Tage Rock, Pop und Punk mit lokalen und regionalen Bands. EINTRITT FREI!', genre:'Pop / Punk / Rock', ticket:'https://waldstock.de', outdoor:true, ageMin:0, price:'Kostenlos', oepnv:'Bahn nach Pegnitz', parking:'Vorhanden'},
  {cat:'festival', name:'Ansbach Open', loc:'Ansbach – Campus Hochschule Ansbach', start:'2026-07-24', end:'2026-07-26', free:false, desc:'Dreitägiges Open-Air-Festival auf dem Campus der Hochschule Ansbach. Fr: Tobi Krell (Sommershow) & Hannes Ringlstetter/Stephan Zinner (Kabarett). Sa: The BossHoss – „Back To The Boots"-Tour. So: KAMRAD & Special Guest Loi. Tickets über Reservix.', genre:'Pop / Kabarett / Country-Rock', ticket:'https://www.reservix.de/tickets-ansbach-open/', outdoor:true, ageMin:0, price:'ab ca. 25 € pro Abend', oepnv:'Bahn nach Ansbach Hbf, 15 min zu Fuß', parking:'Campus Hochschule Ansbach'},
  {cat:'festival', name:'Singoldsand Festival', loc:'Schwabmünchen', start:'2026-08-21', end:'2026-08-22', free:false, desc:'Zweitägiges Festival mit Electro, Hip-Hop, Pop und Rock in Schwabmünchen, ~100 km von Nürnberg. Rund 10.000 Besucher im Jahnstraße-Gelände.', genre:'Electro / Hip-Hop / Pop / Rock', ticket:'https://www.singoldsand-festival.de', outdoor:true, ageMin:0, price:'TBC', oepnv:'Bahn nach Schwabmünchen', parking:'Vorhanden'},

  // ── KW 19 2026 Update ──
  {cat:'festival', name:'Kontakt – Das Kulturfestival Bamberg', loc:'Bamberg – Metalluk-Gelände', start:'2026-05-21', end:'2026-05-24', free:true, desc:'20-jähriges Jubiläum des Kontakt-Kulturfestivals in Bamberg! 4 Tage Umsonst & Draußen mit Alternativ, Indie, Punk, Elektro, Hip-Hop, Workshops und Kunst auf dem Metalluk-Gelände. Vollständig ehrenamtlich organisiert, EINTRITT FREI.', genre:'Indie / Alternativ / Punk / Elektro / Hip-Hop', ticket:'https://kontakt-bamberg.de', outdoor:true, ageMin:0, price:'Kostenlos', oepnv:'Bahn nach Bamberg Hbf, dann Bus/Rad', parking:'Begrenzt – ÖPNV empfohlen'},
  {cat:'afterwork', name:'SOUL ROOFTOP – Rooftop Closing', loc:'Nürnberg – Adina Hotel Rooftop', start:'2026-08-29', end:'2026-08-29', free:false, desc:'Die abschließende Rooftop-Session der Saison 2026 mit dem Studio Wolny auf dem Adina Hotel Nürnberg. House, Disco, Funk – 17:00 bis 22:00 Uhr. Der Eintritt in den Club Stereo ab 23:00 Uhr ist im Ticketpreis enthalten. Limitiert auf 120 Personen.', genre:'House / Disco / Funk', ticket:'https://tickets.infield.live/event/soul-rooftop-rooftop-closing-9o1zql', outdoor:true, ageMin:18, price:'VVK', oepnv:'U2/U3 Hauptbahnhof, 5 min Fußweg', parking:'Tiefgarage in der Nähe'},
  {cat:'festival', name:'Kulturinsel Wöhrmühle Erlangen', loc:'Erlangen – Wöhrmühlinsel', start:'2026-07-16', end:'2026-07-26', free:false, desc:'11-tägiges Open-Air-Festival auf der Wöhrmühlinsel in Erlangen direkt an der Regnitz. Vielfältiges Programm mit Haindling, Von Wegen Lisbeth, The Wombats, Labrassbanda und mehr. Organisiert vom E-Werk Erlangen.', genre:'Pop / Rock / Folk / Alternative', ticket:'https://www.e-werk.de/programm/kulturinsel-woehrmuehle/', outdoor:true, ageMin:0, price:'ab ca. 20 € pro Abend', oepnv:'Bahn nach Erlangen, dann Fahrrad/Fußweg', parking:'Begrenzt – ÖPNV empfohlen'},
  {cat:'festival', name:'Lieder am See – Konzert am Brombachsee', loc:'Spalt – Enderndorf am Brombachsee', start:'2026-07-18', end:'2026-07-18', free:false, desc:'Open-Air-Konzertabend am Segelhafen Enderndorf mit internationalen Rock/Hardrock-Größen: The Wailers, Uriah Heep, Magnum, The Stranglers und Ten Years After. Einmaliges Konzerterlebnis direkt am Großen Brombachsee.', genre:'Rock / Hardrock / Classic Rock', ticket:'https://www.liederamsee.com', outdoor:true, ageMin:0, price:'ab ca. 35 €', oepnv:'Kein direkter ÖPNV – Fahrgemeinschaft', parking:'Vorhanden am Segelhafen'},
  {cat:'festival', name:'Hafensommer-Festival Würzburg', loc:'Würzburg – Alter Hafen', start:'2026-07-24', end:'2026-08-09', free:false, desc:'Mehrwöchiges Open-Air-Festival im Alten Hafen Würzburg. Weltmusik, Rock, Pop, Indie und Experimental mit Gogol Bordello, Matti Klein Soul Trio meets Max Mutzke, Afrob & Ferris MC, Sona Jobarteh, Lena & Linus und mehr.', genre:'Rock / Pop / Indie / Weltmusik', ticket:'https://hafensommer-wuerzburg.de', outdoor:true, ageMin:0, price:'ab ca. 20 € pro Abend', oepnv:'Bahn nach Würzburg Hbf, dann Tram/Fahrrad', parking:'Vorhanden am Alten Hafen'},
  {cat:'festival', name:'Pyraser Classic Rock Night', loc:'Thalmässing – Pyraser Landbrauerei', start:'2026-07-25', end:'2026-07-25', free:false, desc:'Klassische Rocknacht auf dem Gelände der Pyraser Landbrauerei in Thalmässing (Kreis Roth). Hochkarätiges Line-up: Rose Tattoo, Dirkschneider, Axxis und Dynazty. Bier, Rock und bayerisches Flair.', genre:'Classic Rock / Hardrock / Heavy Metal', ticket:'https://www.pyraser-classic-rock.com', outdoor:true, ageMin:0, price:'TBC', oepnv:'Kein direkter ÖPNV – Fahrgemeinschaft', parking:'Vorhanden am Brauereigelände'},
  {cat:'festival', name:'Rösler Open Air – Schloss Eyrichshof', loc:'Ebern – Schloss Eyrichshof', start:'2026-07-30', end:'2026-08-04', free:false, desc:'Mehrtägiges Open-Air-Festival auf dem romantischen Schloss Eyrichshof bei Ebern in Oberfranken. Acts: Nena, In Extremo, Schmidbauer & Kälberer, Nino de Angelo und weitere. Musik unter Sternenhimmel im Schlosspark.', genre:'Pop / Rock / Deutschrock / Folk', ticket:'https://ticketshop-infranken.reservix.de/tickets-roesler-open-air-schloss-eyrichshof/t9993', outdoor:true, ageMin:0, price:'TBC', oepnv:'Kein direkter ÖPNV – Fahrgemeinschaft / Shuttle', parking:'Vorhanden am Gelände'},
  {cat:'festival', name:'Schloss-Festival Höchstadt', loc:'Höchstadt an der Aisch – Schlossberg', start:'2026-08-07', end:'2026-08-08', free:false, desc:'Mittelalter-, Folk- und Pirate-Festival auf dem Schlossberg Höchstadt an der Aisch. 2-tägiges Event mit Saltatio Mortis, Mr. Hurley & Die Pulveraffen, Tanzwut, Mythemia u.v.m. Mittelaltermarkt, Händler und Lagerleben.', genre:'Mittelalter / Folk / Pirate / Rock', ticket:'https://www.schlosshof-festival.de', outdoor:true, ageMin:0, price:'TBC', oepnv:'Bahn nach Höchstadt a.d. Aisch', parking:'Vorhanden am Schlossberg'},
  {cat:'festival', name:'Weinturm Open Air Bad Windsheim', loc:'Bad Windsheim – Weinturm-Plateau', start:'2026-08-07', end:'2026-08-09', free:false, desc:'Dreitägiges Open-Air auf dem Weinturm-Plateau in Bad Windsheim. Vielfältiges Programm mit Ferge X Fisherman, Hot 8 Brass Band, Simon & Jan, Deviltrain u.v.m. Entspannte Festivalatmosphäre in Frankens Kurstadt.', genre:'Pop / Indie / Alternative / Brass', ticket:'https://www.weinturm-open-air.de', outdoor:true, ageMin:0, price:'TBC', oepnv:'Bahn nach Bad Windsheim', parking:'Vorhanden in der Nähe'},
  {cat:'festival', name:'Bayreuther Seebühnenfestival', loc:'Bayreuth – Wilhelminenaue', start:'2026-08-07', end:'2026-08-16', free:false, desc:'10-tägiges Festival auf der Freilichtbühne am See in der Wilhelminenaue Bayreuth. Acts: Sportfreunde Stiller, Max Herre & Joy Denalane, Melissa Naschenweng, Heißmann & Rassau und mehr. Tolle Kulisse direkt am Wasser.', genre:'Pop / Rock / Comedy / Schlager', ticket:'https://www.motion-kommunikation.de/seebuehne/', outdoor:true, ageMin:0, price:'ab ca. 25 €', oepnv:'Bahn nach Bayreuth Hbf, dann Bus', parking:'Vorhanden an der Wilhelminenaue'},
  {cat:'festival', name:'Festival Mediaval', loc:'Selb – Goldberg', start:'2026-09-11', end:'2026-09-13', free:false, desc:'Das Festival Mediaval auf dem Goldberg in Selb – Mittelalter, Folk, Metal und Gothic über 3 Tage. Acts: In Extremo, Faun, Corvus Corax, Subway To Sally, Steve\'N\'Seagulls u.v.m. Händlermarkt, Lagerfeueratmosphäre und Darsteller.', genre:'Mittelalter / Folk / Metal / Gothic', ticket:'https://festival-mediaval.com', outdoor:true, ageMin:0, price:'TBC', oepnv:'Bahn nach Selb', parking:'Vorhanden am Gelände'},
  {cat:'afterwork', name:'Sundowner – XMAS Edition', loc:'Nürnberg – Bootshaus Dutzendteich', start:'2026-12-19', end:'2026-12-19', free:false, desc:'Die Wintersession der beliebten Sundowner-Reihe im Bootshaus Nürnberg – diesmal als festliche XMAS Edition! Von 17 bis 23 Uhr Christmas-Vibes, Club-Sounds und Glühwein-Atmosphäre direkt am Dutzendteich.', genre:'House / Lounge / Christmas Vibes', ticket:'https://sundowner.ticket.io', outdoor:false, ageMin:18, price:'VVK', oepnv:'Bus/Tram zum Dutzendteich', parking:'Vorhanden am Bootshaus'},

  // ─── 🍷 NEUE WEINFESTE & 🎡 VOLKSFESTE 2026 (Update KW19) ──
  {cat:'weinfest', name:'10. Erlanger Weinfest', loc:'Erlangen – Schlossplatz', start:'2026-05-13', end:'2026-05-17', free:true, desc:'10. Erlanger Weinfest auf dem Schlossplatz – Jubiläumsausgabe. Eröffnung am 13. Mai 18:30 Uhr durch Oberbürgermeister Jörg Volleth und die 68. Fränkische Weinkönigin Angelina Seiler. Weine renommierter fränkischer Weingüter mit passenden Speisen und täglicher Live-Musik.', genre:'Weinfest / Frankenwein / Jubiläum', ticket:'https://weinfest-erlangen.de', new:true, outdoor:true, ageMin:0, price:'Kostenlos', oepnv:'Bahn nach Erlangen Hbf, 5 min Fußweg', parking:'Innenstadt Erlangen'},
  {cat:'weinfest', name:'Schwabacher Weinfest', loc:'Schwabach – Martin-Luther-Platz', start:'2026-06-03', end:'2026-06-07', free:true, desc:'Schwabacher Weinfest auf dem Martin-Luther-Platz in der Innenstadt – fränkische Weine und gemütliche Sommerstimmung mitten in der Goldschlägerstadt.', genre:'Weinfest / Regional', ticket:'https://weinfest-schwabach.de', new:true, outdoor:true, ageMin:0, price:'Kostenlos', oepnv:'S-Bahn S1 bis Schwabach', parking:'Innenstadt Parkhäuser'},
  {cat:'weinfest', name:'12. Nürnberger Weinfest', loc:'Nürnberg – Jakobsplatz', start:'2026-07-09', end:'2026-07-19', free:true, desc:'12. Nürnberger Weinfest auf dem Jakobsplatz – 12 Tage genussvolle Mischung aus fränkischen Weinen, abwechslungsreicher Gastronomie und stimmungsvoller Live-Musik von der Weinfestbühne. Eintritt frei!', genre:'Weinfest / Frankenwein / Live-Musik', ticket:'https://nuernberg-weinfest.de', new:true, outdoor:true, ageMin:0, price:'Kostenlos', oepnv:'U1 Weißer Turm', parking:'Altstadt Parkhäuser'},
  {cat:'weinfest', name:'3. Festa Italica Erlangen', loc:'Erlangen – Schlossplatz', start:'2026-06-12', end:'2026-06-15', free:true, desc:'3. Festa Italica auf dem Schlossplatz Erlangen – 4 Tage italienische Genusskultur. Mediterrane Piazza rund ums Markgrafendenkmal mit über zwei Dutzend italienischen Weinen, Pasta al dente, knuspriger Pizza und Dolci. Live-Musik mit italienischen Pop-Hits und Klassikern – Mitsingen ausdrücklich erwünscht.', genre:'Weinfest / Italienische Genusskultur', ticket:'https://festa-italica.de/erlangen/', new:true, outdoor:true, ageMin:0, price:'Kostenlos', oepnv:'Bahn nach Erlangen Hbf, 5 min Fußweg', parking:'Innenstadt Erlangen'},
  {cat:'volksfest', name:'175. Brucker Volksfest (Frühlingsfest)', loc:'Fürstenfeldbruck – Volksfestplatz', start:'2026-04-24', end:'2026-05-03', free:true, desc:'175. Brucker Volksfest auf dem Volksfestplatz Fürstenfeldbruck – 10 Tage Festsaisonauftakt, Bierzelte, Fahrgeschäfte, Tradition und Gemeinschaft.', genre:'Volksfest / Frühlingsfest', ticket:'https://www.fuerstenfeldbruck.de', new:true, outdoor:true, ageMin:0, price:'Eintritt frei', oepnv:'S4 bis Fürstenfeldbruck', parking:'Volksfestplatz FFB'},
  {cat:'volksfest', name:'Spalter Volksfest („O\'zapft is")', loc:'Spalt', start:'2026-05-13', end:'2026-05-17', free:true, desc:'Spalter Volksfest in der Hopfen- und Bierstadt Spalt – Mi 13. bis So 17. Mai 2026. Festlich geschmücktes Festzelt mit großem Barbereich, Live-Musik und attraktiven Fahrgeschäften.', genre:'Volksfest / Bier', ticket:'https://spalt-tourismus.de', new:true, outdoor:true, ageMin:0, price:'Eintritt frei', oepnv:'Bus ab Roth', parking:'Vor Ort'},
  {cat:'volksfest', name:'Spalter Wirtshauskirchweih', loc:'Spalt – Innenstadt', start:'2026-10-16', end:'2026-10-19', free:true, desc:'Traditionelle Spalter Wirtshauskirchweih in der Hopfen- und Bierstadt – 4 Tage Genuss, Kultur & Musik in den Spalter Wirtshäusern.', genre:'Kirchweih / Bier / Kultur', ticket:'https://spalt-tourismus.de', new:true, outdoor:false, ageMin:0, price:'Eintritt frei', oepnv:'Bus ab Roth', parking:'Vor Ort'},

  // ── KW 20 2026 Update ──
  {cat:'festival', name:'Thai Food Festival Georgensgmünd', loc:'Am Bruckespan, Georgensgmünd', start:'2026-07-18', end:'2026-07-19', free:true, desc:'Thai Food Festival am Gelände Am Bruckespan in Georgensgmünd – authentische Thai-Küche, Thai Street Food und kulturelle Darbietungen. Kulinarisches Wochenendfestival im Landkreis Roth, ca. 30 km südlich von Nürnberg.', genre:'Food Festival / Thai Kultur', ticket:'', outdoor:true, ageMin:0, price:'Eintritt voraussichtlich frei', oepnv:'S-Bahn S1 bis Roth, dann Bus Richtung Georgensgmünd', parking:'Vor Ort am Gelände'},

  // Fehlende Nürnberger Kärwa
  {cat:'volksfest', name:'Kleinreuth b. Schweinau Kirchweih', loc:'Nürnberg-Kleinreuth', start:'2026-07-03', end:'2026-07-06', free:true, desc:'Traditionelle Stadtteil-Kärwa in Kleinreuth bei Schweinau.', genre:'Kärwa', outdoor:true, ageMin:0, price:'Kostenlos', oepnv:'Bus ab Nürnberg Hbf', parking:'Straße'},

  // ── KW 21 2026 Update ──
  // Neue Kärwas Nürnberger Land (Quelle: n-land.de/kirchweihen-feste)
  {cat:'volksfest', name:'Kirchweih Ottensoos', loc:'Ottensoos', start:'2026-06-18', end:'2026-06-22', free:true, desc:'Traditionelle Kirchweih in Ottensoos im Nürnberger Land (ca. 40 km von Nürnberg). Do. bis Mo. – Festbetrieb im Dorf mit Musik, Tanz und fränkischen Schmankerln.', genre:'Kärwa', outdoor:true, ageMin:0, price:'Kostenlos', oepnv:'S-Bahn S3 nach Lauf a.d. Pegnitz, dann Bus', parking:'Vor Ort'},
  {cat:'volksfest', name:'Kirchweih Behringersdorf', loc:'Behringersdorf', start:'2026-06-19', end:'2026-06-22', free:true, desc:'Traditionelle Kirchweih in Behringersdorf (Gemeinde Schwaig bei Nürnberg) – Fr. bis Mo. Stimmungsvolle Kärwa im Nürnberger Land.', genre:'Kärwa', outdoor:true, ageMin:0, price:'Kostenlos', oepnv:'S-Bahn S2 bis Schwaig bei Nürnberg', parking:'Vor Ort'},
  {cat:'volksfest', name:'Kirchweih Schwarzenbruck', loc:'Schwarzenbruck', start:'2026-07-03', end:'2026-07-06', free:true, desc:'Traditionsreiche Kirchweih in Schwarzenbruck im Nürnberger Land – Fr. bis Mo. Festzelt, Blasmusik und fränkische Schmankerl. Eintritt frei.', genre:'Kärwa', outdoor:true, ageMin:0, price:'Kostenlos', oepnv:'Bus ab Nürnberg oder Feucht', parking:'Vor Ort'},
  // Altstadtfest Hersbruck
  {cat:'volksfest', name:'Altstadtfest Hersbruck', loc:'Hersbruck – Altstadt', start:'2026-07-31', end:'2026-08-02', free:true, desc:'Das Altstadtfest in der historischen Altstadt von Hersbruck – 3 Tage Musik, Kulinarik und gute Stimmung im Nürnberger Land. Fr. bis So., Eintritt frei.', genre:'Stadtfest / Volksfest', ticket:'https://www.hersbruck.de/', outdoor:true, ageMin:0, price:'Kostenlos', oepnv:'S-Bahn S3 nach Hersbruck', parking:'Innenstadt Hersbruck'},
  // Neue Weinfeste
  {cat:'weinfest', name:'Würzburger Weinparade', loc:'Würzburg – Marktplatz', start:'2026-08-27', end:'2026-09-06', free:true, desc:'Die Würzburger Weinparade auf dem Unteren Marktplatz – 11 Tage mit über 100 Weinen und Sekten im offenen Ausschank. Gastronomisches Spitzenangebot, das sonst kein Weinfest bietet. Tägl. So–Do 11–23 Uhr, Fr–Sa 11–23:30 Uhr. Eintritt frei!', genre:'Weinfest / Frankenwein', ticket:'https://www.weinparade.de/', outdoor:true, ageMin:0, price:'Kostenlos', oepnv:'Straßenbahn direkt am Marktplatz Würzburg', parking:'Innenstadt Parkhäuser Würzburg'},
  // Neue Russian Events
  {cat:'russian', name:'Ilya Akselrod – Stand-up Nürnberg', loc:'Orpheum Nürnberg', start:'2026-11-29', end:'2026-11-29', free:false, desc:'Ilya Akselrod auf Deutschlandtour mit neuem Stand-up-Programm. Humor, lebhafte Geschichten und einzigartige Energy – ein Abend, den man nicht verpassen sollte. 20:00 Uhr, Orpheum Nürnberg.', genre:'Russian Stand-up / Comedy', ticket:'https://nuernberg24.ru/en/event/9436', outdoor:false, ageMin:16, price:'Tickets via nuernberg24.ru', oepnv:'U1 Hauptbahnhof oder Tram 4', parking:'Parkhaus Hauptbahnhof'},

  // ─── 🎉 AFTER WORK PARTY – SUMMER EDITION 2026 @ PARKS NÜRNBERG ──
  {cat:'afterwork', name:'After Work Party – Summer Edition #1 (Season Opening)', loc:'PARKS Nürnberg (Stadtpark, Berliner Platz 9)', start:'2026-05-07', end:'2026-05-08', free:false, desc:'Saison-Opening der After Work Party Summer Edition im PARKS Nürnberg. House Musik mit DJ Werner & Marc Vuelta & Friends im Sommergarten. Donnerstag-Abend im Stadtpark. 18:00–01:00 Uhr.', genre:'House / After Work / Sommergarten', ticket:'https://www.parks-nuernberg.de/ticketshop/', new:true, outdoor:true, ageMin:18, price:'5€', oepnv:'U2/U3 Rathenauplatz · Bus zum Stadtpark', parking:'Parkhäuser Innenstadt'},
  {cat:'afterwork', name:'After Work Party – Summer Edition #2', loc:'PARKS Nürnberg (Stadtpark, Berliner Platz 9)', start:'2026-05-21', end:'2026-05-22', free:false, desc:'After Work Party Summer Edition im PARKS Nürnberg. House Musik mit DJ Werner im Sommergarten. Donnerstag (Vorabend Christi Himmelfahrt), 18:00–01:00 Uhr.', genre:'House / After Work / Sommergarten', ticket:'https://www.parks-nuernberg.de/events/after-work-party-summer-edition-2/', new:true, outdoor:true, ageMin:18, price:'5€', oepnv:'U2/U3 Rathenauplatz · Bus zum Stadtpark', parking:'Parkhäuser Innenstadt'},
  {cat:'afterwork', name:'After Work Party – Summer FESTIVAL Edition', loc:'PARKS Nürnberg (Stadtpark, Berliner Platz 9)', start:'2026-06-04', end:'2026-06-05', free:false, desc:'Festival Edition! Bereits ab 14:00 Uhr Programm, ab 18:00 Uhr Party-Bühne. House Musik mit DJ Werner, Marc Alexander Wirtz & Friends, dazu Streetbunny Crew x DJ Wombat Filistine. Bis 01:00 Uhr im PARKS Stadtpark.', genre:'House / Festival / Open Air', ticket:'https://www.parks-nuernberg.de/events/after-work-party-festival-edition/', new:true, outdoor:true, ageMin:18, price:'5€', oepnv:'U2/U3 Rathenauplatz · Bus zum Stadtpark', parking:'Parkhäuser Innenstadt'},
  {cat:'afterwork', name:'After Work Party – Summer Edition #4', loc:'PARKS Nürnberg (Stadtpark, Berliner Platz 9)', start:'2026-06-18', end:'2026-06-19', free:false, desc:'After Work Party Summer Edition im PARKS Nürnberg. House Musik mit DJ Werner im Sommergarten. 18:00–01:00 Uhr.', genre:'House / After Work / Sommergarten', ticket:'https://www.parks-nuernberg.de/events/after-work-party-summer-edition-3/', new:true, outdoor:true, ageMin:18, price:'5€', oepnv:'U2/U3 Rathenauplatz · Bus zum Stadtpark', parking:'Parkhäuser Innenstadt'},
  {cat:'afterwork', name:'After Work Party – Summer Edition #5', loc:'PARKS Nürnberg (Stadtpark, Berliner Platz 9)', start:'2026-07-09', end:'2026-07-10', free:false, desc:'After Work Party Summer Edition im PARKS Nürnberg. House Musik mit DJ Werner im Sommergarten. 18:00–01:00 Uhr.', genre:'House / After Work / Sommergarten', ticket:'https://www.parks-nuernberg.de/events/after-work-party-summer-edition-4/', new:true, outdoor:true, ageMin:18, price:'5€', oepnv:'U2/U3 Rathenauplatz · Bus zum Stadtpark', parking:'Parkhäuser Innenstadt'},
  {cat:'afterwork', name:'After Work Party – Summer Edition #6', loc:'PARKS Nürnberg (Stadtpark, Berliner Platz 9)', start:'2026-07-30', end:'2026-07-31', free:false, desc:'After Work Party Summer Edition im PARKS Nürnberg. House Musik mit DJ Werner im Sommergarten. 18:00–01:00 Uhr.', genre:'House / After Work / Sommergarten', ticket:'https://www.parks-nuernberg.de/events/after-work-party-summer-edition-5/', new:true, outdoor:true, ageMin:18, price:'5€', oepnv:'U2/U3 Rathenauplatz · Bus zum Stadtpark', parking:'Parkhäuser Innenstadt'},
  {cat:'afterwork', name:'After Work Party – Summer Edition SPECIAL', loc:'PARKS Nürnberg (Stadtpark, Berliner Platz 9)', start:'2026-08-13', end:'2026-08-14', free:false, desc:'After Work Party SPECIAL im PARKS Nürnberg. House Musik mit DJ Werner im Sommergarten. Vorabend Mariä Himmelfahrt – verlängertes Wochenende! 18:00–01:00 Uhr.', genre:'House / After Work / Sommergarten', ticket:'https://www.parks-nuernberg.de/events/after-work-party-summer-edition-special/', new:true, outdoor:true, ageMin:18, price:'5€', oepnv:'U2/U3 Rathenauplatz · Bus zum Stadtpark', parking:'Parkhäuser Innenstadt'},
  {cat:'afterwork', name:'After Work Party – Summer Edition #8', loc:'PARKS Nürnberg (Stadtpark, Berliner Platz 9)', start:'2026-08-27', end:'2026-08-28', free:false, desc:'After Work Party Summer Edition im PARKS Nürnberg. House Musik mit DJ Werner im Sommergarten. 18:00–01:00 Uhr.', genre:'House / After Work / Sommergarten', ticket:'https://www.parks-nuernberg.de/events/after-work-party-summer-edition-6/', new:true, outdoor:true, ageMin:18, price:'5€', oepnv:'U2/U3 Rathenauplatz · Bus zum Stadtpark', parking:'Parkhäuser Innenstadt'},
  {cat:'afterwork', name:'After Work Party – Summer Edition #9', loc:'PARKS Nürnberg (Stadtpark, Berliner Platz 9)', start:'2026-09-10', end:'2026-09-11', free:false, desc:'After Work Party Summer Edition im PARKS Nürnberg. House Musik mit DJ Werner im Sommergarten. 18:00–01:00 Uhr.', genre:'House / After Work / Sommergarten', ticket:'https://www.parks-nuernberg.de/events/after-work-party-summer-edition-7/', new:true, outdoor:true, ageMin:18, price:'5€', oepnv:'U2/U3 Rathenauplatz · Bus zum Stadtpark', parking:'Parkhäuser Innenstadt'},
  {cat:'afterwork', name:'After Work Party – Summer Edition #10 (Saison-Finale)', loc:'PARKS Nürnberg (Stadtpark, Berliner Platz 9)', start:'2026-09-24', end:'2026-09-25', free:false, desc:'Saison-Finale der After Work Party Summer Edition im PARKS Nürnberg. House Musik mit DJ Werner im Sommergarten. 18:00–01:00 Uhr.', genre:'House / After Work / Sommergarten', ticket:'https://www.parks-nuernberg.de/events/after-work-party-summer-edition-8/', new:true, outdoor:true, ageMin:18, price:'5€', oepnv:'U2/U3 Rathenauplatz · Bus zum Stadtpark', parking:'Parkhäuser Innenstadt'},

  // Stadtfeste (Party-Pool)
  {cat:'stadtfest', name:'Schnaittacher Frühlingsfest', loc:'Schnaittach (ca. 30 km)', start:'2026-05-29', end:'2026-06-01', free:true, desc:'Regionales Bürgerfest am Fuße der historischen Festung Rothenberg. Geselliges Beisammensein mit fränkischer Kulinarik und Live-Musik im Herzen des Marktes Schnaittach.', genre:'Bürgerfest / Regional', ticket:'', outdoor:true, ageMin:0, price:'Kostenlos', oepnv:'S-Bahn S3 bis Hersbruck, dann Bus nach Schnaittach', parking:'Vorhanden im Ort'},
  {cat:'stadtfest', name:'Altstadtfest Neumarkt i.d. OPf.', loc:'Neumarkt i.d. OPf. (ca. 45 km)', start:'2026-06-12', end:'2026-06-14', free:true, desc:'34. Neumarkter Altstadtfest – die gesamte Innenstadt wird zur Feiermeile. 65+ Bands auf 5 Bühnen, rund 100 Stände, Kulinarik und Vereine. Eintritt frei!', genre:'Stadtfest / Musik / Kultur', ticket:'https://neumarkt-altstadtfest.de', outdoor:true, ageMin:0, price:'Kostenlos', oepnv:'Bahn nach Neumarkt i.d.OPf.', parking:'Innenstadt Parkhäuser'},
  {cat:'stadtfest', name:'Bürgerfest Gunzenhausen', loc:'Gunzenhausen – Marktplatz (ca. 50 km)', start:'2026-07-03', end:'2026-07-05', free:true, desc:'Open-Air-Stadtfest im Fränkischen Seenland direkt auf dem historischen Marktplatz. Live-Bands, Genussmeile und fränkische Gastlichkeit. Eintritt frei!', genre:'Stadtfest / Live-Musik', ticket:'https://www.dasbuergerfest.de', outdoor:true, ageMin:0, price:'Kostenlos', oepnv:'Bahn nach Gunzenhausen', parking:'Innenstadt Gunzenhausen'},
  {cat:'stadtfest', name:'Hilpoltsteiner Burgfest', loc:'Hilpoltstein (ca. 35 km)', start:'2026-07-31', end:'2026-08-03', free:true, desc:'Historisches Spektakel im Landkreis Roth seit fast 100 Jahren. Höhepunkt: Sonntag mit prunkvollem Einzug der Pfalzgräfin im Gewand des 17. Jahrhunderts. Trödelmarkt, Sautrogrennen und Feuerwerk.', genre:'Historisches Stadtfest / Volksfest', ticket:'https://tourismus.hilpoltstein.de', outdoor:true, ageMin:0, price:'Kostenlos', oepnv:'Bahn nach Hilpoltstein über Roth', parking:'Vorhanden am Festgelände'},
  {cat:'stadtfest', name:'Bürgerfest Schwabach', loc:'Schwabach – Königsplatz (ca. 18 km)', start:'2026-07-24', end:'2026-07-26', free:true, desc:'Die Goldschlägerstadt feiert auf dem Königsplatz und Martin-Luther-Platz mit Live-Bands, Kulinarik und Kultur. Verkaufsoffener Sonntag am 26. Juli.', genre:'Stadtfest / Live-Musik', ticket:'', outdoor:true, ageMin:0, price:'Kostenlos', oepnv:'S-Bahn S1 bis Schwabach', parking:'Innenstadt Parkhäuser'},

  // Volksfeste außerhalb Nürnbergs (Family-Pool via FAMILY_ONLY_CATS)
  {cat:'volksfest', name:'Pfingstvolksfest Berching', loc:'Berching (ca. 65 km)', start:'2026-05-22', end:'2026-05-26', free:true, desc:'75-jähriges Jubiläum! Zünftiges Volksfest in der wunderschönen, mittelalterlich ummauerten Altstadt Berchings im Altmühltal. Festzelt, Fahrgeschäfte und fränkische Tradition.', genre:'Volksfest / Pfingsten / Jubiläum', ticket:'https://www.volksfest-berching.de', outdoor:true, ageMin:0, price:'Kostenlos', oepnv:'Bahn nach Beilngries, dann Bus nach Berching', parking:'Vorhanden am Festplatz'},
  {cat:'volksfest', name:'Pfingstkirchweih Wilhermsdorf', loc:'Wilhermsdorf (ca. 35 km)', start:'2026-05-22', end:'2026-05-26', free:true, desc:'Eine der größten und längsten Marktplatz-Kirchweihen im Rangau. Festzelt am Bahnhof-Mitte mit Fahrgeschäften, Bieranstich und großem Feuerwerk am Dienstag 22:45 Uhr.', genre:'Kirchweih / Pfingsten', ticket:'', outdoor:true, ageMin:0, price:'Kostenlos', oepnv:'S-Bahn S4 bis Zirndorf, dann Bus nach Wilhermsdorf', parking:'Vorhanden am Festplatz'},
  {cat:'volksfest', name:'Langenzenner Kirchweih', loc:'Langenzenn (ca. 25 km)', start:'2026-05-29', end:'2026-06-02', free:true, desc:'Traditions-Kärwa acht Tage nach Pfingsten – zünftiges Brauchtum rund um den historischen Marktplatz. Fahrgeschäfte und Imbissbuden, wo sonst Verkehr pulsiert.', genre:'Kirchweih / Tradition', ticket:'', outdoor:true, ageMin:0, price:'Kostenlos', oepnv:'S-Bahn S4 bis Cadolzburg, dann Bus nach Langenzenn', parking:'Innenstadt Langenzenn'},
  {cat:'volksfest', name:'Bayreuther Volksfest', loc:'Bayreuth (ca. 85 km)', start:'2026-05-22', end:'2026-05-31', free:true, desc:'Größtes Volksfest Oberfrankens auf dem Volksfestplatz an der Äußeren Badstraße. Eröffnung mit großem Festumzug am Freitag 22. Mai um 17:30 Uhr durch die Innenstadt.', genre:'Volksfest / Franken', ticket:'https://www.bayreuth-tourismus.de', outdoor:true, ageMin:0, price:'Eintritt frei', oepnv:'Bahn nach Bayreuth Hbf, Bus zum Volksfestplatz', parking:'Vorhanden am Volksfestplatz'},
  {cat:'volksfest', name:'Schweinfurter Volksfest', loc:'Schweinfurt (ca. 110 km)', start:'2026-06-05', end:'2026-06-14', free:true, desc:'Großes klassisches Volksfest mit weitläufigem Festplatz, modernen Fahrgeschäften, Festzelten und Comedy-Frühschoppen. Beginnt immer am Tag nach Fronleichnam.', genre:'Volksfest / Unterfranken', ticket:'', outdoor:true, ageMin:0, price:'Eintritt frei', oepnv:'Bahn nach Schweinfurt Hbf', parking:'Vorhanden am Volksfestplatz'},
  {cat:'volksfest', name:'Neustädter Kirchweih', loc:'Neustadt a.d. Aisch (ca. 45 km)', start:'2026-06-06', end:'2026-06-14', free:true, desc:'Eine der traditionsreichsten, ältesten und größten Kirchweihen Westmittelfrankens (seit über 600 Jahren). 9 Tage Festbetrieb bei den Sommerkellerern.', genre:'Kirchweih / Tradition', ticket:'', outdoor:true, ageMin:0, price:'Kostenlos', oepnv:'Bahn nach Neustadt a.d. Aisch', parking:'Vorhanden am Festplatz'},
  {cat:'volksfest', name:'Burgthanner Kärwa', loc:'Burgthann (ca. 25 km)', start:'2026-06-20', end:'2026-06-22', free:true, desc:'Gemütliche und stimmungsvolle Gemeinde-Kärwa im idyllischen Nürnberger Land mit starkem Dorfflair.', genre:'Kärwa / Tradition', ticket:'', outdoor:true, ageMin:0, price:'Kostenlos', oepnv:'Bus ab Nürnberg Richtung Burgthann', parking:'Vorhanden im Ort'},
  {cat:'volksfest', name:'Peterlesboum-Kärwa', loc:'Nürnberg-Doos', start:'2026-06-19', end:'2026-06-23', free:true, desc:'Stadtteil-Kärwa im Nürnberger Osten zu Ehren des legendären Nürnberger Volksduos „Die Peterlesboum" – familiäre Kärwa-Atmosphäre mit fränkischem Brauchtum.', genre:'Kärwa / Tradition', ticket:'', outdoor:true, ageMin:0, price:'Kostenlos', oepnv:'Bus ab Nürnberg Mitte', parking:'Straße'},
  {cat:'volksfest', name:'Gredinger Volksfest', loc:'Greding (ca. 60 km)', start:'2026-07-24', end:'2026-07-27', free:true, desc:'Gemütliches, bayerisch-fränkisches Volksfest im malerischen Altmühltal. Immer am 4. Wochenende im Juli mit Festzelt, Musik und Fahrgeschäften.', genre:'Volksfest / Altmühltal', ticket:'https://volksfest-greding.chayns.site', outdoor:true, ageMin:0, price:'Eintritt frei', oepnv:'Bahn nach Greding', parking:'Vorhanden am Festplatz'},
  {cat:'volksfest', name:'Kulmbacher Bierwoche', loc:'Kulmbach (ca. 95 km)', start:'2026-07-25', end:'2026-08-02', free:true, desc:'75. Kulmbacher Bierwoche – 9 Tage reines Bierkultur-Festival im großen Feststadel auf dem EKU-Parkplatz. Ausschließlich das speziell eingebraute Festbier. Für Bierkenner ein Pflichttermin!', genre:'Bierfest / Bierkultur', ticket:'https://www.kulmbacher-bierwoche.de', outdoor:true, ageMin:0, price:'Eintritt frei, Verzehr kostenpflichtig', oepnv:'Bahn nach Kulmbach', parking:'Vorhanden am Festgelände'},
  {cat:'volksfest', name:'Neumarkter JURA-Volksfest', loc:'Neumarkt i.d. OPf. (ca. 45 km)', start:'2026-08-07', end:'2026-08-17', free:true, desc:'Riesiges Volksfest in der Oberpfalz mit über 300.000 Besuchern. Festzelten, Jura-Hallen, moderner Fahrgeschäfte und dem traditionellen Festzug am 9. August (14 Uhr). Maß Bier: 10,70 €.', genre:'Volksfest / Oberpfalz', ticket:'https://neumarkt-volksfest.de', outdoor:true, ageMin:0, price:'Eintritt frei', oepnv:'Bahn nach Neumarkt i.d.OPf.', parking:'Vorhanden am Festplatz'},
  {cat:'volksfest', name:'Volksfest Beilngries', loc:'Beilngries (ca. 75 km)', start:'2026-09-04', end:'2026-09-13', free:true, desc:'Zünftiges Volksfest im Altmühltal mit bayerischem Charme. Traditioneller Volksfestzug am 6. September um 14 Uhr. 10 Tage Festbetrieb mit Fahrgeschäften und Festzelten.', genre:'Volksfest / Altmühltal', ticket:'https://www.beilngrieser-volksfest.de', outdoor:true, ageMin:0, price:'Eintritt frei', oepnv:'Bahn nach Beilngries', parking:'Vorhanden am Festgelände'},
  {cat:'volksfest', name:'Gunzenhäuser Kirchweih', loc:'Gunzenhausen (ca. 50 km)', start:'2026-09-12', end:'2026-09-20', free:true, desc:'625-jährige Traditions-Kirchweih auf dem Schießwasen im Fränkischen Seenland. Höhepunkte: Kerwabaum-Aufstellen und großer Festzug am Montag. Eines der bedeutendsten Volksfeste Mittelfrankens.', genre:'Kirchweih / Volksfest / Tradition', ticket:'https://www.gunzenhausen.info/kirchweih', outdoor:true, ageMin:0, price:'Kostenlos', oepnv:'Bahn nach Gunzenhausen', parking:'Vorhanden am Schießwasen'},

];

const sonsigeEvents = []; // Leer – Messen sind jetzt unter Family


function getCoords(loc) {
  for (const [city,c] of Object.entries(COORDS)) { if (loc.includes(city)) return c; }
  return null;
}

// ── FIREBASE ──────────────────────────────────────────────────────────────────
let db = null;
let publicCounts = {};

const FB_PROJECT = 'viana-events';
const FB_API_KEY = 'AIzaSyDx-s-6yYdvRxP4Gy9GaWdOKBEfo8GpTXQ';
const FB_BASE = `https://firestore.googleapis.com/v1/projects/${FB_PROJECT}/databases/(default)/documents`;


function eventKey(e) {
  return e.name.replace(/[^a-zA-Z0-9äöüÄÖÜß]/g,'_').slice(0,50)+'_'+e.start;
}

async function loadPublicCounts() {
  try {
    const res = await fetch(`${FB_BASE}/event_going?key=${FB_API_KEY}&pageSize=200`);
    if(!res.ok) return;
    const data = await res.json();
    (data.documents||[]).forEach(doc => {
      const key = doc.name.split('/').pop();
      publicCounts[key] = parseInt(doc.fields?.count?.integerValue || 0);
    });
  } catch(err) { console.warn('Firebase load:', err); }
}

async function savePublicCount(e, delta) {
  const key = eventKey(e);
  const current = Math.max(0, (publicCounts[key] || 0) + delta);
  publicCounts[key] = current;
  try {
    await fetch(`${FB_BASE}/event_going/${key}?key=${FB_API_KEY}&updateMask.fieldPaths=count`, {
      method: 'PATCH',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({fields:{count:{integerValue: current}}})
    });
  } catch(err) { console.warn('Firebase save:', err); }
  return current;
}

function getPublicCount(e) { return publicCounts[eventKey(e)] || 0; }


let activeFilters=new Set(['alle']), searchTerm='', viewMode='list', quickFilter='alle', sortMode='date', leafletMap=null, showPast=false;
let appMode = 'party'; // 'party' | 'family'

// Kategorien die zu Family verschoben wurden – in Party ausblenden
const FAMILY_ONLY_CATS = new Set(['volksfest', 'weinfest']);

function getActiveEvents() {
  if (appMode === 'family') {
    const extras = events.filter(e => FAMILY_ONLY_CATS.has(e.cat));
    return [...familyEvents, ...extras];
  }
  // Party-Modus: Family-Kategorien rausfiltern
  return events.filter(e => !FAMILY_ONLY_CATS.has(e.cat));
}
// Gespeicherte Listen laden und sofort gegen vorhandene Events bereinigen.
// Einträge von Events die nicht mehr existieren werden automatisch entfernt –
// für alle Nutzer gleichzeitig beim nächsten Seitenaufruf.
function _loadAndClean(storageKey, allEventSets) {
  const raw = new Set(JSON.parse(localStorage.getItem(storageKey)||'[]'));
  const valid = new Set([...raw].filter(key => allEventSets.has(key)));
  if (valid.size !== raw.size) {
    // Veraltete Einträge gefunden → bereinigten Stand sofort speichern
    localStorage.setItem(storageKey, JSON.stringify([...valid]));
  }
  return valid;
}

// Alle gültigen Event-Keys vorberechnen (Name+Datum)
const _allEventKeys = new Set([...events, ...familyEvents].map(e => e.name + e.start));

let wishlist  = _loadAndClean('viana_wl',    _allEventKeys);
let goingList = _loadAndClean('viana_going', _allEventKeys);

function saveWishlist(){ localStorage.setItem('viana_wl', JSON.stringify([...wishlist])); }
function saveGoingList(){ localStorage.setItem('viana_going', JSON.stringify([...goingList])); }

function dateStr(s,e) {
  const sd=new Date(s), ed=new Date(e);
  if(s===e) return `${sd.getDate()}. ${MONTHS_S[sd.getMonth()]} 2026`;
  if(sd.getMonth()===ed.getMonth()) return `${sd.getDate()}.–${ed.getDate()}. ${MONTHS_S[sd.getMonth()]} 2026`;
  return `${sd.getDate()}. ${MONTHS_S[sd.getMonth()]} – ${ed.getDate()}. ${MONTHS_S[ed.getMonth()]} 2026`;
}
function getDaysUntil(ds){ const today=new Date(); today.setHours(0,0,0,0); return Math.round((new Date(ds)-today)/86400000); }
function isThisWeek(ds){ const today=new Date();today.setHours(0,0,0,0);const d=new Date(ds),day=today.getDay(),mon=new Date(today);mon.setDate(today.getDate()-(day===0?6:day-1));const sun=new Date(mon);sun.setDate(mon.getDate()+6);return d>=mon&&d<=sun; }
function isThisMonth(ds){ const today=new Date(),d=new Date(ds);return d.getMonth()===today.getMonth()&&d.getFullYear()===today.getFullYear(); }
function isToday(ds){ const today=new Date();today.setHours(0,0,0,0);const d=new Date(ds);d.setHours(0,0,0,0);return d.getTime()===today.getTime(); }

function getFiltered() {
  const sourceEvents = getActiveEvents();
  const q=searchTerm.toLowerCase(), today=new Date();today.setHours(0,0,0,0);
  const allFiltered_pre = sourceEvents.filter(e => showPast || new Date(e.end) >= today);
  let filtered=allFiltered_pre.filter(e=>{
    const matchCat=appMode==='family'
      ?(familyFilter==='alle'||e.cat===familyFilter)
      :(activeFilters.has('alle')?true:(activeFilters.has(e.cat)));
    const matchSearch=!q||e.name.toLowerCase().includes(q)||e.loc.toLowerCase().includes(q)||(e.genre||'').toLowerCase().includes(q)||(e.desc||'').toLowerCase().includes(q);
    let matchQuick=true;
    if(quickFilter==='today') matchQuick=isToday(e.start);
    else if(quickFilter==='week') matchQuick=isThisWeek(e.start);
    else if(quickFilter==='month') matchQuick=isThisMonth(e.start);
    else if(quickFilter==='next'){const d=new Date(e.start);d.setHours(0,0,0,0);matchQuick=d>=today;}
    return matchCat&&matchSearch&&matchQuick;
  });
  if(sortMode==='name') filtered.sort((a,b)=>a.name.localeCompare(b.name,'de'));
  else if(sortMode==='cat') filtered.sort((a,b)=>a.cat.localeCompare(b.cat)||a.start.localeCompare(b.start));
  else if(sortMode==='dist' && userLat!==null) filtered.sort((a,b)=>(getEventDist(a)||999)-(getEventDist(b)||999));
  else filtered.sort((a,b)=>a.start.localeCompare(b.start));

  // Distance radius filter
  if(maxDist > 0 && userLat !== null) {
    filtered = filtered.filter(e => {
      const d = getEventDist(e);
      return d !== null && d <= maxDist;
    });
  }
  if(quickFilter==='next'){const d0=filtered.length?filtered[0].start:null;if(d0)filtered=filtered.filter(e=>e.start===d0);}
  return filtered;
}

function countdownLabel(diff) {
  if(diff===0) return '<span class="today-badge">HEUTE</span>';
  if(diff===1) return '<span class="row-countdown">⏳ Morgen</span>';
  if(diff>0&&diff<=14) return `<span class="row-countdown">⏳ in ${diff} Tagen</span>`;
  return '';
}

function eventRowHTML(e) {
  const col=CAT_COLORS[e.cat]||'#888', sd=new Date(e.start), ed=new Date(e.end), idx=getActiveEvents().indexOf(e);
  const isSaved=wishlist.has(e.name+e.start), diff=getDaysUntil(e.start), isToday_=diff===0;
  const pubCount=getPublicCount(e);
  const highlightClass = isToday_ ? ' today-event' : '';
  const vianaClass = e.viana ? ' viana-event' : '';
  const isMultiDay = e.start !== e.end;
  const fav = getTicketDomain(e.ticket);
  const favHtml = e.viana
    ? `<img class="event-fav event-fav-viana" src="assets/icon-96x96.png" alt="Viana" loading="lazy">`
    : (fav ? `<img class="event-fav" src="https://www.google.com/s2/favicons?domain=${fav}&sz=32" alt="" loading="lazy" onerror="this.style.display='none'">` : '');
  const vianaRowStyle = e.viana ? ';background:linear-gradient(105deg,rgba(201,162,39,0.28) 0%,rgba(201,162,39,0.12) 50%,rgba(201,162,39,0.06) 100%);box-shadow:inset 0 0 0 2px rgba(201,162,39,0.6),0 0 20px rgba(201,162,39,0.18)' : '';
  return `<div class="event-row${highlightClass}${vianaClass}" data-idx="${idx}" style="--cat-color:${col};position:relative${vianaRowStyle}">
    <div class="row-corner">
      ${pubCount>0?`<span class="row-dabei-badge">✅ ${pubCount}</span>`:''}
      <div class="row-action-btns">
        <button class="row-heart-btn${isSaved?' saved':''}" onclick="event.stopPropagation();toggleWishlist(${idx})" title="Merken">${isSaved?'❤️':'🤍'}</button>
        <button class="row-going-btn${goingList.has(e.name+e.start)?' going':''}" onclick="event.stopPropagation();toggleGoing(${idx})" title="Ich bin dabei">👍</button>
      </div>
    </div>
    <div class="event-date-col">
      <div class="event-day">${sd.getDate()}.</div>
      <div class="event-month">${MONTHS_S[sd.getMonth()]}.</div>
      <div class="event-dow">${DAYS[sd.getDay()]}</div>
      ${isMultiDay?`<div style="font-size:9px;color:var(--accent);font-weight:600;margin-top:3px;line-height:1.2;white-space:nowrap">bis ${ed.getDate()}. ${MONTHS_S[ed.getMonth()]}.</div>`:''}
    </div>
    <div class="event-info">
      <div class="event-name-row">${favHtml}<span class="event-name">${e.name}</span>${e.music?`<button class="music-play-btn music-play-btn-inline" data-music="${e.music}" onclick="event.stopPropagation();toggleMusic(this,'${e.music}')" title="Musik abspielen">▶</button>`:e.musicYt?`<button class="music-play-btn music-play-btn-inline" onclick="event.stopPropagation();toggleYtPlayer('${e.musicYt}','${(e.musicTitle||e.name).replace(/'/g,"\\'")}',this)" title="Musik abspielen">▶</button>`:''}</div>
      <div class="event-loc">📍 ${e.loc}</div>
      <div class="event-meta">
        ${countdownLabel(diff)}
        <span class="badge badge-date">${dateStr(e.start,e.end)}</span>
        ${userLat!==null?`<span class="dist-badge">📍 ${distLabel(getEventDist(e))}</span>`:''}
        ${e.free?'<span class="badge badge-free">★ Kostenlos</span>':(e.price&&e.price!=='TBC'&&e.price!=='Ausverkauft'?`<span class="badge badge-date">${e.price.split('(')[0].trim()}</span>`:'')}
        ${e.new?'<span class="badge badge-new">NEU 2026</span>':''}
        ${e.outdoor===true?'<span class="badge" style="background:rgba(251,191,36,.1);color:#fbbf24;border-color:rgba(251,191,36,.3)">☀️ Outdoor</span>':e.outdoor===false?'<span class="badge" style="background:rgba(96,165,250,.1);color:#60a5fa;border-color:rgba(96,165,250,.3)">🏠 Indoor</span>':''}
        ${e.ageMin>=18?'<span class="badge" style="background:rgba(232,150,58,.12);color:var(--accent);border-color:rgba(232,150,58,.3)">ab 18</span>':e.ageMin===16?'<span class="badge" style="background:rgba(232,150,58,.1);color:var(--accent);border-color:rgba(232,150,58,.25)">ab 16</span>':''}
        ${e.dresscode?`<span class="badge badge-dc">DC: ${e.dresscode}</span>`:''}
        ${e.viana?`<span class="viana-badge">⭐ Viana Event</span>`:''}
      </div>
    </div>
    <div class="event-right">
      <span class="cat-badge" style="background:${col}">${CAT_LABELS[e.cat]}</span>
      ${pubCount>0?`<span style="font-size:10px;font-weight:600;padding:2px 8px;border-radius:999px;background:rgba(52,211,153,.1);color:#34d399;border:1px solid rgba(52,211,153,.25)">✅ ${pubCount} dabei</span>`:''}
      ${e.ticket?`<a class="web-row-btn" href="${e.ticket}" target="_blank" rel="noopener" onclick="event.stopPropagation()">🌐</a>`:''}
    </div>
  </div>`;
}

function eventCardHTML(e) {
  const col=CAT_COLORS[e.cat]||'#888', idx=getActiveEvents().indexOf(e);
  const diff=getDaysUntil(e.start), isToday_=diff===0;
  const isSaved=wishlist.has(e.name+e.start), isGoing=goingList.has(e.name+e.start);
  const cdLabel=diff===0?'🔴 HEUTE':diff===1?'⏳ Morgen':diff>0&&diff<=14?`⏳ in ${diff} Tagen`:'';
  return `<div class="event-card${isToday_?' today-event':''}${e.viana?' viana-event':''}" data-idx="${idx}" style="--cat-color:${col}">
    <div class="card-action-btns">
      <button class="card-heart-btn${isSaved?' saved':''}" onclick="event.stopPropagation();toggleWishlist(${idx})" title="Merken">${isSaved?'❤️':'🤍'}</button>
      <button class="card-going-btn${isGoing?' going':''}" onclick="event.stopPropagation();toggleGoing(${idx})" title="Ich bin dabei">${isGoing?'👍':'👍'}</button>
    </div>
    ${cdLabel?`<div class="card-countdown">${cdLabel}</div>`:''}
    ${userLat!==null?`<div style="font-size:11px;color:#5b8ff9;margin-bottom:4px;font-weight:600">📍 ${distLabel(getEventDist(e))}</div>`:''}
    <div class="card-date">${dateStr(e.start,e.end)} · ${DAYS[new Date(e.start).getDay()]}.</div>
    <div class="card-name">${e.name}</div>
    <div class="card-loc">📍 ${e.loc}</div>
    ${e.desc?`<div class="card-desc">${e.desc.slice(0,100)}${e.desc.length>100?'…':''}</div>`:''}
    <div class="card-footer">
      <span class="cat-badge" style="background:${col}">${CAT_LABELS[e.cat]}</span>
      ${e.free?'<span class="badge badge-free">★ Kostenlos</span>':''}
      ${e.new?'<span class="badge badge-new">NEU</span>':''}
      ${e.viana?'<span class="viana-badge">⭐ Viana Event</span>':''}
      ${isGoing?'<span class="going-badge">✅ Dabei</span>':''}
      ${e.music?`<button class="music-play-btn music-play-btn-card" data-music="${e.music}" onclick="event.stopPropagation();toggleMusic(this,'${e.music}')" title="Musik abspielen">▶</button>`:e.musicYt?`<button class="music-play-btn music-play-btn-card" onclick="event.stopPropagation();toggleYtPlayer('${e.musicYt}','${(e.musicTitle||e.name).replace(/'/g,"\\'")}',this)" title="Musik abspielen">▶</button>`:''}
    </div>
  </div>`;
}


function togglePast() {
  showPast = !showPast;
  render();
}
window.togglePast = togglePast;

/* ── IN-FEED WERBEBANNER ─────────────────────────────────────────────────────
   Erscheint alle 10 Events in der Liste (nur auf Mobile < 1024px sichtbar).
   Zum Anpassen: href, Emoji/img, Titel, Beschreibung und CTA-Text ändern.
   ─────────────────────────────────────────────────────────────────────────── */
// ── WERBEKUNDEN-POOL ──────────────────────────────────────────────────────────
// Für neuen Kunden: Eintrag hinzufügen, fertig.
const AD_CLIENTS = [
  {
    href:  'https://mobil-reifen-wechseln.de/',
    img:   'assets/ads/mrw-infeed-600x80.svg',
    alt:   'Mobiler Reifenwechsel – Direkt bei Ihnen vor Ort',
    barImg:'assets/ads/mrw-bottom-bar-640x80.svg',
    barAlt:'Mobiler Reifenwechsel – Termin buchen',
  },
  {
    href:  'https://foerdertechnik-wartung-und-service.de/',
    img:   'assets/ads/ft-infeed-600x80.svg',
    alt:   'Fördertechnik Wartung & Service – Nürnberg',
    barImg:'assets/ads/ft-bottom-bar-640x80.svg',
    barAlt:'Fördertechnik Wartung & Service – Termin buchen',
  },
];

// In-Feed: abwechselnd Kunde 1 → Kunde 2 → Kunde 1 → …
let _inFeedAdIdx = 0;
function inFeedAdHTML() {
  const client = AD_CLIENTS[_inFeedAdIdx % AD_CLIENTS.length];
  _inFeedAdIdx++;
  return `<div class="ad-infeed" aria-label="Werbung">
    <a href="${client.href}" target="_blank" rel="noopener sponsored" style="display:block;text-decoration:none">
      <img src="${client.img}" alt="${client.alt}"
           style="width:100%;height:auto;display:block;border-radius:10px">
    </a>
  </div>`;
}

/* ── BOTTOM BAR: zufälligen Kunden laden + Close ────────────────────────── */
(function initBottomBar() {
  const bar = document.getElementById('ad-bottom-bar');
  const closeBtn = document.getElementById('ad-bottom-bar-close');
  const link = bar ? bar.querySelector('a') : null;
  const img  = bar ? bar.querySelector('img') : null;
  if (!bar || !closeBtn || !link || !img) return;

  // Zufällig einen Kunden wählen
  const client = AD_CLIENTS[Math.floor(Math.random() * AD_CLIENTS.length)];
  link.href = client.href;
  img.src   = client.barImg;
  img.alt   = client.barAlt;

  // Body-Padding setzen damit Content nicht verdeckt wird
  document.body.classList.add('has-bottom-ad');
  closeBtn.addEventListener('click', () => {
    bar.style.display = 'none';
    document.body.classList.remove('has-bottom-ad');
  });
})();

function render() {
  const filtered=getFiltered();
  const sourceEvents = getActiveEvents();
  document.getElementById('total-count').textContent=sourceEvents.length;
  if(viewMode==='map'){
    document.getElementById('cal').style.display='none';
    document.getElementById('map-wrap').style.display='block';
    renderMap(filtered); return;
  }
  document.getElementById('cal').style.display='';
  document.getElementById('map-wrap').style.display='none';
  const _src = getActiveEvents();
  const _today = new Date(); _today.setHours(0,0,0,0);
  const pastCount = _src.filter(e => new Date(e.end) < _today).length;
  const byMonth={};
  filtered.forEach(e=>{const m=parseInt(e.start.split('-')[1])-1;if(!byMonth[m])byMonth[m]=[];byMonth[m].push(e);});
  const cal=document.getElementById('cal');
  if(!filtered.length){
    cal.innerHTML='<div class="empty"><h3>Keine Events gefunden</h3><p>Versuch einen anderen Suchbegriff oder Filter.</p>'+(pastCount>0&&!showPast?`<br><button onclick="togglePast()" style="margin-top:1rem;padding:8px 16px;border-radius:8px;border:1px solid rgba(255,255,255,.2);background:transparent;color:var(--muted);cursor:pointer;font-family:DM Sans,sans-serif;font-size:13px">🕐 ${pastCount} vergangene Events anzeigen</button>`:'')+'</div>';
    return;
  }
  const pastBanner = (!showPast && pastCount>0) ? `<div style="text-align:center;padding:.75rem;margin-bottom:1rem"><button onclick="togglePast()" style="padding:7px 16px;border-radius:8px;border:1px solid rgba(255,255,255,.15);background:transparent;color:var(--muted);cursor:pointer;font-family:DM Sans,sans-serif;font-size:12px;transition:all .15s" onmouseover="this.style.color='var(--text)'" onmouseout="this.style.color='var(--muted)'">🕐 ${pastCount} vergangene Events einblenden</button></div>` : (showPast ? `<div style="text-align:center;padding:.75rem;margin-bottom:1rem"><button onclick="togglePast()" style="padding:7px 16px;border-radius:8px;border:1px solid rgba(255,255,255,.15);background:transparent;color:var(--muted);cursor:pointer;font-family:DM Sans,sans-serif;font-size:12px" onmouseover="this.style.color='var(--text)'" onmouseout="this.style.color='var(--muted)'">✕ Vergangene Events ausblenden</button></div>` : '');
  cal.innerHTML=pastBanner+Object.keys(byMonth).sort((a,b)=>+a-+b).map(m=>{
    const evs=byMonth[m];
    let rows;
    if(viewMode==='list'){
      const items=evs.map(eventRowHTML);
      // In-Feed Ad alle 10 Events einfügen
      const withAds=[];
      items.forEach((html,i)=>{ withAds.push(html); if((i+1)%10===0) withAds.push(inFeedAdHTML()); });
      rows=`<div class="events-list">${withAds.join('')}</div>`;
    } else {
      const items=evs.map(eventCardHTML);
      const withAds=[];
      items.forEach((html,i)=>{ withAds.push(html); if((i+1)%10===0) withAds.push(inFeedAdHTML()); });
      rows=`<div class="events-grid">${withAds.join('')}</div>`;
    }
    return `<div class="month-block" id="month-${m}"><div class="month-header"><span class="month-name">${MONTHS[m]}</span><span class="month-count">${evs.length} Event${evs.length!==1?'s':''}</span></div>${rows}</div>`;
  }).join('');
  cal.querySelectorAll('[data-idx]').forEach(el=>el.addEventListener('click',()=>openModal(parseInt(el.dataset.idx))));
  updateScrollObserver();
  initVianaSparkles();
}

/* ── VIANA SPARKLES ── */
function injectSparkles(container) {
  container.querySelectorAll('.viana-sparkle').forEach(s=>s.remove());
  const SHAPES = ['dot','dot','dot','dot','star','star','star','cross','cross','diamond'];
  const count = 26;
  for (let i = 0; i < count; i++) {
    const s = document.createElement('span');
    const shape = SHAPES[Math.floor(Math.random()*SHAPES.length)];
    s.className = 'viana-sparkle viana-sparkle-' + shape;
    const top = 2 + Math.random() * 94;
    const left = 1 + Math.random() * 97;
    const dur = (1.2 + Math.random() * 2.8).toFixed(2);
    const delay = (Math.random() * 5).toFixed(2);
    const size = (1.8 + Math.random() * 3.2).toFixed(1);
    s.style.cssText = `top:${top}%;left:${left}%;--dur:${dur}s;--delay:${delay}s;--sz:${size}px`;
    container.appendChild(s);
  }
}
function initVianaSparkles() {
  document.querySelectorAll('.viana-event').forEach(el => injectSparkles(el));
}

/* ── YOUTUBE MINI PLAYER ── */
let _ytActiveBtn = null;
function toggleYtPlayer(videoId, title, btn) {
  const player = document.getElementById('yt-mini-player');
  const iframe = document.getElementById('yt-iframe');
  const titleEl = document.getElementById('yt-mini-title');
  const isModal = btn && btn.id === 'modal-music-btn';
  // If same video already open → close
  if (player.classList.contains('open') && player.dataset.vid === videoId) {
    closeYtPlayer();
    return;
  }
  // Reset previous button
  if (_ytActiveBtn) {
    const wasModal = _ytActiveBtn.id === 'modal-music-btn';
    _ytActiveBtn.innerHTML = wasModal ? `▶ ${_ytActiveBtn.dataset.title||'Abspielen'}` : '▶';
    _ytActiveBtn.classList.remove('playing');
  }
  // Open player
  titleEl.textContent = '🎵 ' + title;
  iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;
  player.dataset.vid = videoId;
  player.classList.add('open');
  // Update button
  if (btn) {
    _ytActiveBtn = btn;
    if (btn.dataset) btn.dataset.title = title;
    btn.innerHTML = isModal ? '⏸ Pause' : '⏸';
    btn.classList.add('playing');
  }
}
function closeYtPlayer() {
  const player = document.getElementById('yt-mini-player');
  const iframe = document.getElementById('yt-iframe');
  player.classList.remove('open');
  iframe.src = '';
  player.dataset.vid = '';
  if (_ytActiveBtn) {
    const wasModal = _ytActiveBtn.id === 'modal-music-btn';
    _ytActiveBtn.innerHTML = wasModal ? `▶ ${_ytActiveBtn.dataset.title||'Abspielen'}` : '▶';
    _ytActiveBtn.classList.remove('playing');
    _ytActiveBtn = null;
  }
}

/* ── MUSIC PLAYER ── */
let _audio = null, _activeBtn = null;
function toggleMusic(btn, src) {
  const isModal = btn.id === 'modal-music-btn';
  if (_audio && !_audio.paused && _activeBtn === btn) {
    _audio.pause();
    btn.innerHTML = isModal ? '▶ Abspielen' : '▶';
    btn.classList.remove('playing');
    return;
  }
  if (_audio) {
    _audio.pause();
    if (_activeBtn) {
      const wasModal = _activeBtn.id === 'modal-music-btn';
      _activeBtn.innerHTML = wasModal ? '▶ Abspielen' : '▶';
      _activeBtn.classList.remove('playing');
    }
  }
  _audio = new Audio(src);
  _audio.volume = 0.75;
  _activeBtn = btn;
  btn.innerHTML = isModal ? '⏸ Pause' : '⏸';
  btn.classList.add('playing');
  _audio.play().catch(()=>{});
  _audio.addEventListener('ended', () => {
    btn.innerHTML = isModal ? '▶ Abspielen' : '▶';
    btn.classList.remove('playing');
    _activeBtn = null;
  });
}

function renderMap(filtered) {
  const wrap=document.getElementById('map-wrap');
  if(!filtered.length){wrap.innerHTML='<div class="map-no-results">Keine Events für diese Auswahl.</div>';return;}
  wrap.innerHTML='<div id="map"></div>';
  if(leafletMap){leafletMap.remove();leafletMap=null;}
  leafletMap=L.map('map',{zoomControl:true}).setView([49.45,11.07],10);
  L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',{attribution:'© OpenStreetMap, © CARTO',subdomains:'abcd',maxZoom:19}).addTo(leafletMap);
  filtered.forEach(e=>{
    const col=CAT_COLORS[e.cat]||'#888', coords=getCoords(e.loc);
    const marker=L.circleMarker(coords,{radius:9,fillColor:col,color:'#0e0f13',weight:2,opacity:1,fillOpacity:.9}).addTo(leafletMap);
    marker.bindPopup(`<div class="popup-name">${e.name}</div><div class="popup-loc">📍 ${e.loc}</div><div class="popup-date">📅 ${dateStr(e.start,e.end)}</div>`);
    marker.on('click',()=>openModal(events.indexOf(e)));
  });
}

function buildMonthTimeline() {
  const tl=document.getElementById('month-timeline');
  const months=new Set(getActiveEvents().map(e=>parseInt(e.start.split('-')[1])-1));
  let html='';
  for(let m=0;m<12;m++){if(!months.has(m))continue;html+=`<button class="month-jump has-events" data-month="${m}">${MONTHS_S[m]}.</button>`;}
  tl.innerHTML=html;
  tl.querySelectorAll('.month-jump').forEach(btn=>{
    btn.addEventListener('click',()=>{
      const m=parseInt(btn.dataset.month), el=document.getElementById(`month-${m}`);
      if(el)el.scrollIntoView({behavior:'smooth',block:'start'});
      tl.querySelectorAll('.month-jump').forEach(b=>b.classList.remove('active-month'));
      btn.classList.add('active-month');
    });
  });
}

function updateScrollObserver() {
  const blocks=document.querySelectorAll('.month-block');
  if(!blocks.length)return;
  const obs=new IntersectionObserver(entries=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        const m=entry.target.id.replace('month-','');
        document.querySelectorAll('.month-jump').forEach(b=>b.classList.toggle('active-month',b.dataset.month===m));
      }
    });
  },{threshold:0.2});
  blocks.forEach(b=>obs.observe(b));
}

function updateCountdown() {
  const today=new Date();today.setHours(0,0,0,0);
  const future=getActiveEvents().filter(e=>new Date(e.start)>=today).sort((a,b)=>a.start.localeCompare(b.start));
  if(!future.length)return;
  const next=future[0], diff=Math.round((new Date(next.start)-today)/86400000);
  document.getElementById('cd-days').innerHTML=diff===0?'Heute!':diff===1?'Morgen!':`${diff}<span> Tage</span>`;
  document.getElementById('cd-name').textContent=next.name;
  document.getElementById('cd-date').textContent=`📅 ${dateStr(next.start,next.end)} · 📍 ${next.loc}`;
  document.getElementById('countdown-card').onclick=()=>openModal(getActiveEvents().indexOf(next));
}

function showToast(msg) {
  const t=document.getElementById('toast');
  t.textContent=msg;t.classList.add('show');
  clearTimeout(t._timer);t._timer=setTimeout(()=>t.classList.remove('show'),2500);
}

function toggleWishlist(idx) {
  const sourceEvents = getActiveEvents();
  const e=sourceEvents[idx], key=e.name+e.start;
  if(wishlist.has(key)){wishlist.delete(key);showToast(`Entfernt: ${e.name}`);}
  else{wishlist.add(key);showToast(`Gemerkt: ${e.name} ❤️`);}
  saveWishlist();updateWishlistUI();render();
}

function toggleGoing(idx) {
  const sourceEvents = getActiveEvents();
  const e=sourceEvents[idx], key=e.name+e.start, wasGoing=goingList.has(key);
  if(wasGoing){ goingList.delete(key); showToast('Entfernt aus "Ich gehe hin"'); }
  else{ goingList.add(key); showToast(`✅ Ich gehe hin: ${e.name}!`); }
  saveGoingList();
  savePublicCount(e, wasGoing?-1:1).then(()=>render());
  render(); updateWishlistUI();
}

function updateWishlistUI() {
  const total=wishlist.size+goingList.size, btn=document.getElementById('wl-open-btn');
  document.getElementById('wl-count').textContent=total;
  btn.style.display=total>0?'flex':'none';
  renderWishlistPanel();
}

function renderWishlistPanel() {
  const body=document.getElementById('wl-body'), footer=document.getElementById('wl-footer');
  const allEvts=[...events,...familyEvents];
  const saved=allEvts.filter(e=>wishlist.has(e.name+e.start)).sort((a,b)=>a.start.localeCompare(b.start));
  const going=allEvts.filter(e=>goingList.has(e.name+e.start)).sort((a,b)=>a.start.localeCompare(b.start));
  if(!saved.length&&!going.length){
    body.innerHTML='<div class="wishlist-empty">Noch nichts gespeichert.<br>Klick auf 🤍 oder 📅 bei einem Event!</div>';
    footer.style.display='none';return;
  }
  footer.style.display='flex';
  const savedHTML=saved.length?`
    <div class="wl-section-title">❤️ Gemerkte Events</div>
    ${saved.map(e=>{const idx=allEvts.indexOf(e),col=CAT_COLORS[e.cat]||'#888',key=e.name+e.start;
      return `<div class="wl-item" onclick="openModal(${idx})"><div class="wl-item-name" style="color:${col}">❤️ ${e.name}</div><div class="wl-item-date">📅 ${dateStr(e.start,e.end)} · 📍 ${e.loc}</div><button class="wl-remove" onclick="event.stopPropagation();removeFromWishlist('${key}')">✕</button></div>`;
    }).join('')}`:'';
  const goingHTML=going.length?`
    <div class="wl-section-title" style="margin-top:${saved.length?'1rem':'0'}">✅ Ich bin dabei</div>
    ${going.map(e=>{const idx=allEvts.indexOf(e),col=CAT_COLORS[e.cat]||'#888',key=e.name+e.start;
      return `<div class="wl-item" onclick="openModal(${idx})"><div class="wl-item-name" style="color:${col}">✅ ${e.name}</div><div class="wl-item-date">📅 ${dateStr(e.start,e.end)} · 📍 ${e.loc}</div><button class="wl-remove" onclick="event.stopPropagation();removeFromGoing('${key}')">✕</button></div>`;
    }).join('')}`:'';
  body.innerHTML=savedHTML+goingHTML;
}

function removeFromWishlist(key) {wishlist.delete(key);saveWishlist();updateWishlistUI();render();}
function removeFromGoing(key) {
  goingList.delete(key);
  saveGoingList();
  // Öffentlichen Zähler um -1 reduzieren
  const e=[...events,...familyEvents].find(ev=>ev.name+ev.start===key);
  if(e) savePublicCount(e,-1);
  updateWishlistUI();render();
}

function openModal(idx) {
  const sourceEvents = getActiveEvents();
  const e=sourceEvents[idx], col=CAT_COLORS[e.cat]||'#34d399';
  document.getElementById('m-cat').textContent=CAT_LABELS[e.cat];
  document.getElementById('m-cat').style.color=col;
  document.getElementById('m-title').textContent=e.name;
  // Logo via Google Favicon
  const logoEl = document.getElementById('m-logo');
  if (logoEl) {
    const logoDomain = getTicketDomain(e.ticket);
    if (e.viana) {
      logoEl.innerHTML = `<img src="assets/icon-96x96.png" alt="Viana" loading="lazy" style="width:48px;height:48px;object-fit:contain;filter:drop-shadow(0 0 6px rgba(201,162,39,0.5))">`;
      logoEl.style.display = 'flex';
    } else if (logoDomain) {
      logoEl.innerHTML = `<img src="https://www.google.com/s2/favicons?domain=${logoDomain}&sz=64" alt="" loading="lazy" onerror="this.parentElement.style.display='none'">`;
      logoEl.style.display = 'flex';
    } else {
      logoEl.innerHTML = '';
      logoEl.style.display = 'none';
    }
  }
  document.getElementById('m-date').textContent='📅 '+dateStr(e.start,e.end);
  const dist = getEventDist(e);
  document.getElementById('m-loc').textContent='📍 '+e.loc+(dist!==null?' · 📍 '+distLabel(dist):'');
  document.getElementById('m-desc').textContent=e.desc||'—';

  const badges=[];
  if(e.free)badges.push('<span class="badge badge-free">★ Kostenlos / Eintritt frei</span>');
  if(e.new)badges.push('<span class="badge badge-new">NEU 2026</span>');
  if(e.dresscode)badges.push(`<span class="badge badge-dc">Dresscode: ${e.dresscode}</span>`);
  if(e.genre)badges.push(`<span class="badge badge-date">${e.genre}</span>`);

  const ageLabel=e.ageMin===0?'Alle Altersgruppen':e.ageMin===8?'Ab 8 Jahren':e.ageMin===16?'Ab 16 Jahren':'Ab 18 Jahren';
  const practicalItems=[
    {label:'Ort',value:e.outdoor===true?'☀️ Outdoor':e.outdoor===false?'🏠 Indoor':'—',cls:''},
    {label:'Altersfreigabe',value:ageLabel,cls:e.ageMin>=16?'orange':'green'},
    {label:'Eintrittspreise',value:e.price||'—',cls:e.free?'green':''},
    {label:'ÖPNV-Anfahrt',value:e.oepnv||'—',cls:'blue'},
    {label:'Parken',value:e.parking||'—',cls:''},
  ];
  const grid=practicalItems.map(item=>`<div class="practical-item"><span class="practical-label">${item.label}</span><span class="practical-value ${item.cls}">${item.value}</span></div>`).join('');
  document.getElementById('m-badges').innerHTML=badges.join('')+`<div class="practical-grid" style="width:100%;margin-top:.8rem">${grid}</div>`;

  const locEncoded=encodeURIComponent(e.loc+', Deutschland');
  const deepLink=`${location.origin}${location.pathname}#${encodeURIComponent(e.name)}`;
  const shareText=encodeURIComponent(`🎉 ${e.name}\n📅 ${dateStr(e.start,e.end)}\n📍 ${e.loc}\n${deepLink}`);
  const waUrl=`https://wa.me/?text=${encodeURIComponent('Wer kommt mit? 🙌\n\n'+decodeURIComponent(shareText))}`;
  const fbUrl=`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(deepLink)}`;
  const hasCoords=e.lat&&e.lng, coordStr=hasCoords?`${e.lat},${e.lng}`:null;
  const gmapsUrl=hasCoords?`https://www.google.com/maps/search/?api=1&query=${coordStr}`:`https://www.google.com/maps/search/?api=1&query=${locEncoded}`;
  const appleMapsUrl=hasCoords?`https://maps.apple.com/?ll=${coordStr}&q=${encodeURIComponent(e.name)}`:`https://maps.apple.com/?q=${locEncoded}`;
  const transitUrl=hasCoords?`https://www.google.com/maps/dir/?api=1&destination=${coordStr}&travelmode=transit`:`https://www.google.com/maps/dir/?api=1&destination=${locEncoded}&travelmode=transit`;
  const isSaved=wishlist.has(e.name+e.start), isGoing=goingList.has(e.name+e.start);
  const PIN_SVG=`<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>`;
  const WA_SVG=`<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>`;

  document.getElementById('m-actions').innerHTML = `
    ${e.music ? `
    <div class="modal-action-section">
      <div class="mas-label">🎵 Event-Musik</div>
      <div class="mas-row">
        <button class="mas-btn mas-music-btn" id="modal-music-btn" onclick="toggleMusic(this,'${e.music}')">▶ Abspielen</button>
      </div>
    </div>` : e.musicYt ? `
    <div class="modal-action-section">
      <div class="mas-label">🎵 Event-Musik</div>
      <div class="mas-row">
        <button class="mas-btn mas-music-btn" id="modal-music-btn" onclick="toggleYtPlayer('${e.musicYt}','${(e.musicTitle||e.name).replace(/'/g,"\\'")}',this)">▶ ${e.musicTitle||'Abspielen'}</button>
      </div>
    </div>` : ''}
    ${e.ticket ? `
    <div class="modal-action-section">
      <div class="mas-label">🌐 Website & Tickets</div>
      <div class="mas-row">
        <a class="mas-btn mas-web" href="${e.ticket}" target="_blank" rel="noopener">🌐 ${getTicketDomain(e.ticket)}</a>
      </div>
    </div>` : ''}
    <div class="modal-action-section">
      <div class="mas-label">📍 Navigation</div>
      <div class="mas-row">
        <a class="mas-btn mas-gmaps" href="${gmapsUrl}" target="_blank">${PIN_SVG} Google Maps</a>
        <a class="mas-btn mas-apple" href="${appleMapsUrl}" target="_blank">${PIN_SVG} Apple Maps</a>
        <a class="mas-btn mas-transit" href="${transitUrl}" target="_blank" rel="noopener">🚌 Mit ÖPNV hin</a>
      </div>
      ${e.oepnv?`<div class="mas-oepnv-hint"><span style="flex-shrink:0">🚊</span><span><strong style="color:rgba(251,191,36,.8);font-size:10px;display:block;margin-bottom:1px">ÖPNV-Tipp</strong>${e.oepnv}</span></div>`:''}
    </div>
    <div class="modal-action-section">
      <div class="mas-label">📤 Teilen</div>
      <div class="mas-row mas-row-wrap">
        <a class="mas-btn mas-wa" href="${waUrl}" target="_blank">${WA_SVG} Wer kommt mit?</a>
        <a class="mas-btn mas-fb" href="${fbUrl}" target="_blank"><svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg> Facebook</a>
        <button class="mas-btn mas-link" onclick="copyDeepLink('${deepLink}')">🔗 Link kopieren</button>
      </div>
    </div>
    <div class="modal-action-section">
      <div class="mas-label">🗂 Merkliste & Kalender</div>
      <div class="mas-row mas-row-wrap">
        <button class="mas-btn ${isSaved?'mas-heart-active':'mas-heart-idle'}" id="modal-heart-btn" onclick="toggleWishlistModal(${idx})">${isSaved?'❤️ Gemerkt (entfernen)':'🤍 Merken'}</button>
        <button class="mas-btn ${isGoing?'mas-going-active':'mas-going-idle'}" id="modal-going-btn" onclick="toggleGoingModal(${idx})">${isGoing?'👍 Ich bin dabei!':'👍 Ich bin dabei?'}</button>
        <button class="mas-btn mas-ics" onclick="downloadICS(${idx})">📥 .ics speichern</button>
      </div>
    </div>`;

  document.getElementById('modal-bg').classList.add('open');
  history.replaceState(null,'',`#${encodeURIComponent(e.name)}`);
  renderSimilarEvents(idx);
}

function toggleWishlistModal(idx) {
  const sourceEvents = getActiveEvents();
  const e=sourceEvents[idx], key=e.name+e.start, btn=document.getElementById('modal-heart-btn');
  if(wishlist.has(key)){wishlist.delete(key);if(btn){btn.textContent='🤍 Merken';btn.className='mas-btn mas-heart-idle';}showToast(`Entfernt: ${e.name}`);}
  else{wishlist.add(key);if(btn){btn.textContent='❤️ Gemerkt (entfernen)';btn.className='mas-btn mas-heart-active';}showToast(`Gemerkt: ${e.name} ❤️`);}
  saveWishlist();updateWishlistUI();render();
}

function toggleGoingModal(idx) {
  const sourceEvents = getActiveEvents();
  const e=sourceEvents[idx], key=e.name+e.start, btn=document.getElementById('modal-going-btn'), wasGoing=goingList.has(key);
  if(wasGoing){ goingList.delete(key); if(btn){btn.textContent='📅 Ich gehe hin!';btn.className='mas-btn mas-going-idle';} showToast('Entfernt aus "Ich gehe hin"'); }
  else{ goingList.add(key); if(btn){btn.textContent='✅ Dabei! (entfernen)';btn.className='mas-btn mas-going-active';} showToast(`✅ ${e.name} – du bist dabei!`); }
  saveGoingList();
  savePublicCount(e, wasGoing?-1:1).then(n=>{
    const el=document.getElementById('modal-going-count'); if(el) el.textContent=n;
  });
  render(); updateWishlistUI();
}

// ── LOCATION & DISTANCE ───────────────────────────────────────────────────────
let userLat = null, userLon = null, maxDist = 0;

function haversine(lat1, lon1, lat2, lon2) {
  const R = 6371, dLat = (lat2-lat1)*Math.PI/180, dLon = (lon2-lon1)*Math.PI/180;
  const a = Math.sin(dLat/2)**2 + Math.cos(lat1*Math.PI/180)*Math.cos(lat2*Math.PI/180)*Math.sin(dLon/2)**2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
}

function getEventDist(e) {
  if(userLat===null) return null;
  const coords = getCoords(e.loc);
  if(!coords) return null;
  return haversine(userLat, userLon, coords[0], coords[1]);
}

function distLabel(km) {
  if(km===null) return '';
  return km < 1 ? '< 1 km' : `${Math.round(km)} km`;
}

function setUserLocation(lat, lon, label) {
  userLat=lat; userLon=lon;
  localStorage.setItem('viana_loc', JSON.stringify({lat,lon,label}));
  const status=document.getElementById('loc-status');
  status.className='loc-status active';
  status.innerHTML=`📍 ${label}`;
  document.getElementById('loc-clear-btn').style.display='';
  // auto-switch sort to distance
  const sel=document.getElementById('sort-select');
  if(sel.value==='date'){sel.value='dist'; sortMode='dist';}
  render();
}

function clearUserLocation() {
  userLat=null; userLon=null;
  localStorage.removeItem('viana_loc');
  document.getElementById('loc-status').className='loc-status';
  document.getElementById('loc-status').innerHTML='';
  document.getElementById('loc-clear-btn').style.display='none';
  const sel=document.getElementById('sort-select');
  if(sel.value==='dist'){sel.value='date'; sortMode='date';}
  render();
}

async function geocodePLZ(plz) {
  try {
    const res = await fetch(`https://nominatim.openstreetmap.org/search?postalcode=${plz}&country=DE&format=json&limit=1`, {
      headers: {'Accept-Language':'de', 'User-Agent':'VianaEventsKalender/1.0'}
    });
    const data = await res.json();
    if(!data.length) { showToast('PLZ nicht gefunden'); return; }
    const {lat, lon, display_name} = data[0];
    const parts = display_name.split(',').map(p => p.trim());
    const city = parts.find(p => !/^\d{5}$/.test(p)) || parts[0];
    setUserLocation(parseFloat(lat), parseFloat(lon), `${plz} ${city}`);
  } catch(err) { showToast('Geocoding fehlgeschlagen'); }
}

function initLocation() {
  // restore saved location
  const saved = localStorage.getItem('viana_loc');
  if(saved) {
    const {lat,lon,label} = JSON.parse(saved);
    userLat=lat; userLon=lon;
    const status=document.getElementById('loc-status');
    status.className='loc-status active';
    status.innerHTML=`📍 ${label}`;
    document.getElementById('loc-clear-btn').style.display='';
  }

  document.getElementById('loc-geo-btn').addEventListener('click', () => {
    if(!navigator.geolocation) { showToast('Geolocation nicht verfügbar'); return; }
    const status=document.getElementById('loc-status');
    status.className='loc-status'; status.innerHTML='⏳ Ermittle Standort…';
    navigator.geolocation.getCurrentPosition(
      pos => setUserLocation(pos.coords.latitude, pos.coords.longitude, 'Aktueller Standort'),
      err => { status.innerHTML=''; showToast('Standort abgelehnt – bitte PLZ eingeben'); }
    );
  });

  document.getElementById('loc-clear-btn').addEventListener('click', clearUserLocation);

  document.getElementById('plz-input').addEventListener('keydown', e => {
    if(e.key==='Enter') {
      const plz = e.target.value.trim();
      if(/^\d{5}$/.test(plz)) geocodePLZ(plz);
      else showToast('Bitte eine gültige 5-stellige PLZ eingeben');
    }
  });

  document.getElementById('dist-select').addEventListener('change', e => {
    maxDist = parseInt(e.target.value);
    render();
  });
}

function copyDeepLink(url) {
  navigator.clipboard.writeText(url).then(()=>showToast('🔗 Link kopiert!')).catch(()=>{
    const ta=document.createElement('textarea');ta.value=url;document.body.appendChild(ta);ta.select();document.execCommand('copy');document.body.removeChild(ta);showToast('🔗 Link kopiert!');
  });
}

function downloadICS(idx) {
  const sourceEvents = getActiveEvents();
  const e=sourceEvents[idx];
  const dtstart=e.start.replace(/-/g,'');
  const endDate=new Date(e.end);endDate.setDate(endDate.getDate()+1);
  const dtend=endDate.toISOString().slice(0,10).replace(/-/g,'');
  const desc=(e.desc||'').replace(/,/g,'\,').replace(/\n/g,'\\n');
  const ics=['BEGIN:VCALENDAR','VERSION:2.0','PRODID:-//Viana NBG Events//DE','BEGIN:VEVENT',`UID:${e.name.replace(/[^a-z0-9]/gi,'-')}-${e.start}@viana`,`DTSTART;VALUE=DATE:${dtstart}`,`DTEND;VALUE=DATE:${dtend}`,`SUMMARY:${e.name}`,`LOCATION:${e.loc}`,`DESCRIPTION:${desc}\nEintritt: ${e.price||'—'}\nÖPNV: ${e.oepnv||'—'}`,'END:VEVENT','END:VCALENDAR'].join('\r\n');
  const blob=new Blob([ics],{type:'text/calendar'});
  const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download=`${e.name.replace(/[^a-zA-Z0-9]/g,'-')}.ics`;document.body.appendChild(a);a.click();document.body.removeChild(a);
  showToast(`📅 ${e.name} als ICS gespeichert`);
}

function renderSimilarEvents(currentIdx) {
  const sourceEvents = getActiveEvents();
  const current=sourceEvents[currentIdx];
  const similar=sourceEvents.filter((e,i)=>i!==currentIdx&&e.cat===current.cat).sort((a,b)=>Math.abs(new Date(a.start)-new Date(current.start))-Math.abs(new Date(b.start)-new Date(current.start))).slice(0,3);
  if(!similar.length)return;
  document.getElementById('m-similar').innerHTML=`<div class="similar-section"><div class="similar-title">Ähnliche Events</div><div class="similar-items">${similar.map(e=>{const idx=sourceEvents.indexOf(e),c=CAT_COLORS[e.cat]||'#34d399';return `<button class="similar-item" onclick="openModal(${idx})"><span class="similar-dot" style="background:${c}"></span><span class="similar-info"><span class="similar-name">${e.name}</span><span class="similar-date">📅 ${dateStr(e.start,e.end)} · 📍 ${e.loc}</span></span></button>`;}).join('')}</div></div>`;
}

function showSuggestions(q) {
  const el=document.getElementById('search-suggestions');
  if(!q||q.length<2){el.style.display='none';return;}
  const src=appMode==='family'?familyEvents:events;
  const matches=src.filter(e=>e.name.toLowerCase().includes(q)||e.loc.toLowerCase().includes(q)||(e.genre||'').toLowerCase().includes(q)).slice(0,7);
  if(!matches.length){el.style.display='none';return;}
  el.innerHTML=matches.map(e=>{
    const col=CAT_COLORS[e.cat]||'#888', idx=src.indexOf(e), diff=getDaysUntil(e.start);
    const cd=diff===0?'🔴 Heute!':diff>0&&diff<=14?`in ${diff}d`:'';
    return `<div class="suggestion-item" onclick="selectSuggestion(${idx})"><span class="suggestion-cat" style="background:${col}">${CAT_LABELS[e.cat]}</span><span class="suggestion-name">${e.name}</span><span class="suggestion-date">${cd||dateStr(e.start,e.end)}</span></div>`;
  }).join('');
  el.style.display='block';
}
function selectSuggestion(idx) {
  document.getElementById('search-suggestions').style.display='none';
  document.getElementById('search').value='';
  searchTerm='';render();
  setTimeout(()=>openModal(idx),50);
}


// ── MODE SWITCHER ─────────────────────────────────────────────────────────────
let familyFilter = 'alle'; // active family category filter

function resetTabUI() {
  activeFilters=new Set(['alle']); quickFilter='alle'; searchTerm=''; familyFilter='alle';
  document.getElementById('search').value='';
  document.querySelectorAll('.pill').forEach(p=>{p.classList.toggle('active',p.dataset.cat==='alle');});
  document.querySelectorAll('[data-fcat]').forEach(p=>{p.classList.toggle('active',p.dataset.fcat==='alle');});
  document.querySelectorAll('.qpill').forEach(p=>{p.classList.toggle('active',p.dataset.quick==='alle');});
  document.getElementById('tab-party').className='mode-tab';
  document.getElementById('tab-family').className='mode-tab';
}
document.getElementById('tab-party').addEventListener('click', () => {
  appMode='party'; resetTabUI();
  document.getElementById('tab-party').className='mode-tab active-party';
  document.getElementById('filter-pills-party').style.display='';
  document.getElementById('filter-pills-family').style.display='none';
  buildMonthTimeline();
  updateCountdown();
  render();
});
document.getElementById('tab-family').addEventListener('click', () => {
  appMode='family'; resetTabUI();
  document.getElementById('tab-family').className='mode-tab active-family';
  document.getElementById('filter-pills-family').style.display='';
  document.getElementById('filter-pills-party').style.display='none';
  buildMonthTimeline();
  updateCountdown();
  render();
});

document.querySelectorAll('[data-fcat]').forEach(p=>p.addEventListener('click',()=>{
  familyFilter = p.dataset.fcat;
  document.querySelectorAll('[data-fcat]').forEach(x=>x.classList.remove('active'));
  p.classList.add('active');
  render();
}));


function checkDeepLink() {
  const hash=decodeURIComponent(location.hash.slice(1));
  if(!hash)return;
  const srcEvents=getActiveEvents();
  const idx=srcEvents.findIndex(e=>e.name.toLowerCase().replace(/\s/g,'')==hash.toLowerCase().replace(/\s/g,''));
  if(idx>=0)setTimeout(()=>openModal(idx),300);
}

// ── WIRE UP ───────────────────────────────────────────────────────────────────
document.querySelectorAll('.pill').forEach(p=>p.addEventListener('click',()=>{
  const cat=p.dataset.cat;
  if(cat==='alle'){
    activeFilters=new Set(['alle']);
    document.querySelectorAll('.pill').forEach(x=>x.classList.remove('active'));
    p.classList.add('active');
  } else {
    activeFilters.delete('alle');
    document.getElementById('pill-alle').classList.remove('active');
    if(activeFilters.has(cat)){
      activeFilters.delete(cat);
      p.classList.remove('active');
      if(activeFilters.size===0){activeFilters.add('alle');document.getElementById('pill-alle').classList.add('active');}
    } else {
      activeFilters.add(cat);
      p.classList.add('active');
    }
  }
  render();
}));

document.getElementById('search').addEventListener('input',e=>{
  searchTerm=e.target.value;
  showSuggestions(e.target.value.toLowerCase());render();
});
document.getElementById('search').addEventListener('focus',e=>{if(e.target.value.length>=2)showSuggestions(e.target.value.toLowerCase());});
document.addEventListener('click',e=>{if(!e.target.closest('.search-wrap'))document.getElementById('search-suggestions').style.display='none';});

document.getElementById('btn-list').addEventListener('click',()=>{viewMode='list';document.querySelectorAll('.view-btn').forEach(b=>b.classList.remove('active'));document.getElementById('btn-list').classList.add('active');render();});
document.getElementById('btn-grid').addEventListener('click',()=>{viewMode='grid';document.querySelectorAll('.view-btn').forEach(b=>b.classList.remove('active'));document.getElementById('btn-grid').classList.add('active');render();});
document.getElementById('btn-map').addEventListener('click',()=>{viewMode='map';document.querySelectorAll('.view-btn').forEach(b=>b.classList.remove('active'));document.getElementById('btn-map').classList.add('active');render();});

document.querySelectorAll('.qpill').forEach(p=>p.addEventListener('click',()=>{
  document.querySelectorAll('.qpill').forEach(x=>x.classList.remove('active'));
  p.classList.add('active');quickFilter=p.dataset.quick;render();
}));
document.getElementById('sort-select').addEventListener('change',e=>{sortMode=e.target.value;render();});

document.getElementById('wl-open-btn').addEventListener('click',()=>{renderWishlistPanel();document.getElementById('wishlist-panel').classList.add('open');});
document.getElementById('wl-close').addEventListener('click',()=>document.getElementById('wishlist-panel').classList.remove('open'));
document.getElementById('wl-share-wa').addEventListener('click',()=>{
  const saved=[...events,...familyEvents].filter(e=>wishlist.has(e.name+e.start)).sort((a,b)=>a.start.localeCompare(b.start));
  if(!saved.length)return;
  const list=saved.map(e=>`• ${e.name} – ${dateStr(e.start,e.end)}`).join('\n');
  window.open(`https://wa.me/?text=${encodeURIComponent('Hey! 👋 Meine Nürnberg Events 2026 – wer kommt mit?\n\n'+list)}`, '_blank');
});
document.getElementById('wl-copy-link').addEventListener('click',()=>{
  const saved=[...events,...familyEvents].filter(e=>wishlist.has(e.name+e.start)).sort((a,b)=>a.start.localeCompare(b.start));
  if(!saved.length)return;
  navigator.clipboard.writeText(`Meine Nürnberg Events 2026:\n\n${saved.map(e=>`• ${e.name} – ${dateStr(e.start,e.end)} – ${e.loc}`).join('\n')}`).catch(()=>{});
  showToast('📋 Liste kopiert!');
});

document.getElementById('modal-close').addEventListener('click',()=>{document.getElementById('modal-bg').classList.remove('open');history.replaceState(null,'',location.pathname);});
document.addEventListener('keydown',e=>{if(e.key==='Escape'){document.getElementById('modal-bg').classList.remove('open');document.getElementById('wishlist-panel').classList.remove('open');history.replaceState(null,'',location.pathname);}});

const backBtn=document.getElementById('back-to-top');
window.addEventListener('scroll',()=>backBtn.classList.toggle('visible',window.scrollY>400));
backBtn.addEventListener('click',()=>window.scrollTo({top:0,behavior:'smooth'}));

buildMonthTimeline();
updateCountdown();
updateWishlistUI();
initLocation();
render();
checkDeepLink();
loadPublicCounts();