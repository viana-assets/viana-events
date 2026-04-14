/* ═══════════════════════════════════════════════════════
   VIANA PLACES 2026 – places.js
   Daten + Logik für die Places-Seite
   ═══════════════════════════════════════════════════════ */

// ── KATEGORIEN ────────────────────────────────────────
const PLACE_CATS = [
  { id:'baeder',       icon:'🏊',  name:'Bäder & Thermen',       color:'#5b8ff9', desc:'Hallenbäder, Freibäder, Spaßbäder, Saunalandschaften',    count:83 },
  { id:'freizeitparks',icon:'🎢',  name:'Freizeitparks',          color:'#e8963a', desc:'Erlebnisparks, Themenparks, Familienparks',               count:24 },
  { id:'ausflugsziele', icon:'🏰', name:'Ausflugsziele',          color:'#a78bfa', desc:'Sehenswürdigkeiten, Burgen, Museen, Naturziele',          count:28 },
  { id:'clubs',        icon:'🎵',  name:'Clubs & Diskotheken',    color:'#f472b6', desc:'Nightlife, Clubs, Discos, Tanzschuppen',                  count:74 },
  { id:'cocktailbars', icon:'🍹',  name:'Cocktailbars',           color:'#34d399', desc:'Bar-Highlights, Rooftops, Weinbars, Craft Cocktails',     count:20 },
  { id:'shisha',       icon:'💨',  name:'Shishabars',             color:'#c8974e', desc:'Shishalounges, Wasserpfeife, orientalisches Flair',       count:20 },
  { id:'tierparks',    icon:'🦁',  name:'Tierparks & Wildgehege', color:'#5b8ff9', desc:'Zoos, Wildparks, Streichelzoos, Vogelparks',             count:22 },
  { id:'aktivitaeten', icon:'🎯',  name:'Aktivitäten & Indoor',   color:'#a78bfa', desc:'Bowling, Lasertag, Trampolinhallen, Kletterhallen',       count:29 },
  { id:'escaperooms',  icon:'🔐',  name:'Escape Rooms',           color:'#e8963a', desc:'Rätsel, Teamevents, Live Escape Games',                  count:15 },
  { id:'kultur',       icon:'🎭',  name:'Kulturorte',             color:'#5b8ff9', desc:'Theater, Konzerthäuser, Galerien, Kinos',                count:29 },
  { id:'badeseen',     icon:'🏖️',  name:'Badeseen',               color:'#34d399', desc:'Naturbäder, Baggerseen, Seen zum Schwimmen',             count:20 },
  { id:'camping',      icon:'⛺',  name:'Campingplätze',          color:'#c8974e', desc:'Campingplätze, Wohnmobilstellplätze, Glamping',          count:28 },
];

// ── COORDS für Distanzberechnung ──────────────────────
const P_HOME = { lat: 49.4521, lng: 11.0767 }; // Nürnberg

const PLACE_COORDS = {
  'Nürnberg':        { lat:49.4521, lng:11.0767 },
  'Fürth':           { lat:49.4774, lng:10.9888 },
  'Erlangen':        { lat:49.5897, lng:11.0078 },
  'Schwabach':       { lat:49.3284, lng:11.0241 },
  'Zirndorf':        { lat:49.4433, lng:10.9543 },
  'Stein':           { lat:49.4157, lng:10.9739 },
  'Lauf':            { lat:49.5122, lng:11.2778 },
  'Hersbruck':       { lat:49.5103, lng:11.4277 },
  'Roth':            { lat:49.2458, lng:11.0879 },
  'Ansbach':         { lat:49.3028, lng:10.5711 },
  'Gunzenhausen':    { lat:49.1138, lng:10.7549 },
  'Weißenburg':      { lat:49.0355, lng:10.9712 },
  'Treuchtlingen':   { lat:48.9592, lng:10.9094 },
  'Neumarkt':        { lat:49.2793, lng:11.4604 },
  'Amberg':          { lat:49.4432, lng:11.8522 },
  'Weiden':          { lat:49.6772, lng:12.1595 },
  'Bamberg':         { lat:49.8988, lng:10.9028 },
  'Forchheim':       { lat:49.7192, lng:11.0589 },
  'Heroldsbach':     { lat:49.7506, lng:11.0228 },
  'Geiselwind':      { lat:49.7825, lng:10.3959 },
  'Regensburg':      { lat:49.0134, lng:12.1016 },
  'Ingolstadt':      { lat:48.7665, lng:11.4258 },
  'Augsburg':        { lat:48.3705, lng:10.8978 },
  'München':         { lat:48.1351, lng:11.5820 },
  'Würzburg':        { lat:49.7944, lng:9.9294  },
  'Bayreuth':        { lat:49.9456, lng:11.5713 },
  'Coburg':          { lat:50.2592, lng:10.9633 },
  'Hof':             { lat:50.3144, lng:11.9170 },
  'Schweinfurt':     { lat:50.0519, lng:10.2200 },
  'Lohr':            { lat:49.9892, lng:9.5777  },
  'Cham':            { lat:49.2197, lng:12.6591 },
  'Dingolfing':      { lat:48.6297, lng:12.4974 },
  'Günzburg':        { lat:48.4543, lng:10.2779 },
  'Rammingen':       { lat:47.9792, lng:10.5914 },
  'Cleebronn':       { lat:49.0659, lng:9.1075  },
  'Kaisersbach':     { lat:48.8678, lng:9.6633  },
  'Rust':            { lat:48.2618, lng:7.7326  },
  'Leipzig':         { lat:51.3397, lng:12.3731 },
  'Rattelsdorf':     { lat:49.9447, lng:10.8812 },
  'Reisbach':        { lat:48.6108, lng:12.6450 },
  'Plohn':           { lat:50.5397, lng:12.3422 },
  'Brühl':           { lat:50.8299, lng:6.9056  },
};

function distKm(city) {
  const c = PLACE_COORDS[city];
  if (!c || !window._userLat) return null;
  const R = 6371;
  const dLat = (c.lat - window._userLat) * Math.PI / 180;
  const dLng = (c.lng - window._userLng) * Math.PI / 180;
  const a = Math.sin(dLat/2)**2 + Math.cos(window._userLat*Math.PI/180)*Math.cos(c.lat*Math.PI/180)*Math.sin(dLng/2)**2;
  return Math.round(R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)));
}

function distKmCoords(lat, lng) {
  if (!window._userLat) return null;
  const R = 6371;
  const dLat = (lat - window._userLat) * Math.PI / 180;
  const dLng = (lng - window._userLng) * Math.PI / 180;
  const a = Math.sin(dLat/2)**2 + Math.cos(window._userLat*Math.PI/180)*Math.cos(lat*Math.PI/180)*Math.sin(dLng/2)**2;
  return Math.round(R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)));
}

// ── PLACES DATEN ──────────────────────────────────────
const PLACES = {

  // ── BÄDER & THERMEN ───────────────────────────────
  baeder: [
    // Nürnberg Stadt
    { name:'Südstadtbad Nürnberg', addr:'Breslauer Str. 158, 90471 Nürnberg', city:'Nürnberg', lat:49.4155, lng:11.1020, tags:['Hallenbad','Sauna'], preis:'4–7€', oeffnung:'Mo-Sa 6:30-22, So 8-20 Uhr', web:'baeder.nuernberg.de', maps:'https://maps.google.com/?q=Südstadtbad+Nürnberg' },
    { name:'Volksbad Nürnberg', addr:'Badstr. 2, 90429 Nürnberg', city:'Nürnberg', lat:49.4604, lng:11.0575, tags:['Hallenbad','Historisch'], preis:'4–7€', oeffnung:'Mo-Sa 6:30-22, So 8-20 Uhr', web:'baeder.nuernberg.de', maps:'https://maps.google.com/?q=Volksbad+Nürnberg' },
    { name:'Freibad Zabo Nürnberg', addr:'Äußere Bayreuther Str. 85, 90491 Nürnberg', city:'Nürnberg', lat:49.4724, lng:11.1147, tags:['Freibad','Sommer'], preis:'4.50€', oeffnung:'Mai-Sep tägl. 9-20 Uhr', web:'baeder.nuernberg.de', maps:'https://maps.google.com/?q=Freibad+Zabo+Nürnberg' },
    { name:'Freibad Aufsess Nürnberg', addr:'Aufsessstr. 70, 90469 Nürnberg', city:'Nürnberg', lat:49.4239, lng:11.0835, tags:['Freibad'], preis:'4.50€', oeffnung:'Mai-Sep', web:'baeder.nuernberg.de', maps:'https://maps.google.com/?q=Freibad+Aufsessstr+Nürnberg' },
    { name:'Dürer Bad Nürnberg', addr:'Gibitzenhofstr. 132, 90443 Nürnberg', city:'Nürnberg', lat:49.4344, lng:11.0799, tags:['Hallenbad','Wellness'], preis:'5–8€', oeffnung:'Mo-Fr 6:30-22, Sa/So 8-20 Uhr', web:'baeder.nuernberg.de', maps:'https://maps.google.com/?q=Dürer+Bad+Nürnberg' },
    { name:'Nordbad Nürnberg', addr:'Muggenhofer Str. 27, 90429 Nürnberg', city:'Nürnberg', lat:49.4672, lng:11.0372, tags:['Hallenbad'], preis:'4–7€', oeffnung:'Mo-Sa 6:30-22 Uhr', web:'baeder.nuernberg.de', maps:'https://maps.google.com/?q=Nordbad+Nürnberg' },
    { name:'Westbad Nürnberg', addr:'Hasenbuck 1, 90449 Nürnberg', city:'Nürnberg', lat:49.4388, lng:11.0344, tags:['Hallenbad','Sauna'], preis:'4–7€', oeffnung:'Mo-Sa 6:30-22 Uhr', web:'baeder.nuernberg.de', maps:'https://maps.google.com/?q=Westbad+Nürnberg' },
    { name:'Pegnitzgrund-Bad Nürnberg', addr:'Rollnerstr. 141, 90408 Nürnberg', city:'Nürnberg', lat:49.4804, lng:11.1004, tags:['Freibad'], preis:'4.50€', oeffnung:'Sommer', web:'baeder.nuernberg.de', maps:'https://maps.google.com/?q=Pegnitzgrund+Bad+Nürnberg' },
    // Fürth
    { name:'Fürthermare Erlebnisbad', addr:'Rosenstr. 89, 90762 Fürth', city:'Fürth', lat:49.4739, lng:10.9731, tags:['Erlebnisbad','Sauna','Rutsche'], preis:'Erw. 14€, Kind 9€', oeffnung:'Mo-Do 10-22, Fr-So 9-22 Uhr', web:'fuerthermare.de', maps:'https://maps.google.com/?q=Fürthermare+Fürth', highlight:'Größtes Erlebnisbad Franken' },
    { name:'Freibad Seepark Fürth', addr:'Seeanlage 1, 90763 Fürth', city:'Fürth', lat:49.4834, lng:10.9788, tags:['Freibad','See'], preis:'3.50€', oeffnung:'Mai-Sep', web:'baeder.fuerth.de', maps:'https://maps.google.com/?q=Seepark+Fürth' },
    // Erlangen
    { name:'Erlangen Bürgermeistersteg-Freibad', addr:'Bürgermeistersteg 2, 91054 Erlangen', city:'Erlangen', lat:49.5910, lng:11.0078, tags:['Freibad','Pegnitz'], preis:'4€', oeffnung:'Sommer', web:'erlangen.de/themenseite/thema/freibad', maps:'https://maps.google.com/?q=Bürgermeistersteg+Freibad+Erlangen' },
    { name:'Erlanger Stadtbad', addr:'Güterhallenstr. 4, 91052 Erlangen', city:'Erlangen', lat:49.5946, lng:11.0179, tags:['Hallenbad'], preis:'4.50€', oeffnung:'Ganzjährig', web:'erlangen.de/themenseite/thema/stadtbad', maps:'https://maps.google.com/?q=Stadtbad+Erlangen' },
    // Spaßbäder Region
    { name:'Schlossbad Neumarkt', addr:'Seelstraße 20, 92318 Neumarkt i.d.OPf.', city:'Neumarkt', lat:49.281, lng:11.462, tags:['Erlebnisbad','Freibad','Sauna','Ganzjahresbad'], preis:'Erw. ab 9€', oeffnung:'Tägl. 10-21 Uhr, So ab 9 Uhr', web:'schlossbad-neumarkt.de', maps:'https://maps.google.com/?q=Schlossbad+Neumarkt+Oberpfalz', highlight:'Modernes Ganzjahresbad mit Solebecken, Erlebnisbecken, 5 Saunen und Freibad' },
    { name:'Wonnemar Ingolstadt', addr:'Am Sportpark 1, 85053 Ingolstadt', city:'Ingolstadt', lat:48.7577, lng:11.4337, tags:['Erlebnisbad','Sauna','Wellness'], preis:'Erw. 16€', oeffnung:'Mo-So 10-22 Uhr', web:'wonnemar.de/ingolstadt', maps:'https://maps.google.com/?q=Wonnemar+Ingolstadt', highlight:'Riesenrutsche & Wellenbad' },
    { name:'H2O Roth', addr:'Nördliche Ringstr. 120, 91154 Roth', city:'Roth', lat:49.2481, lng:11.0922, tags:['Hallenbad','Sauna'], preis:'5–9€', oeffnung:'Mo-So', web:'h2o-roth.de', maps:'https://maps.google.com/?q=H2O+Roth' },
  { name:'Freizeitbad Atlantis Herzogenaurach', addr:'Würzburger Str. 35, 91074 Herzogenaurach', city:'Herzogenaurach', lat:49.567,lng:10.882, tags:['Erlebnisbad','Wellenbad','Sauna'], preis:'Erw. ab 8€', oeffnung:'Tägl. 10-22 Uhr, Sauna bis 23 Uhr', web:'atlantis-bad.de', maps:'https://maps.google.com/?q=Freizeitbad+Atlantis+Herzogenaurach', highlight:'1.200qm Wasserfläche mit Wellenbad, Rutschen + 1.700qm Saunaparadies mit Außensaunen' },
    { name:'Freizeitbad Juramare Gunzenhausen', addr:'Bahnhofsplatz 16, 91710 Gunzenhausen', city:'Gunzenhausen', lat:49.114, lng:10.756, tags:['Erlebnisbad','Altmühlsee-Region','Sauna'], preis:'Erw. ab 9€', oeffnung:'Di-Mi 10-21 Uhr', web:'swg-gun.de', maps:'https://maps.google.com/?q=Freizeitbad+Juramare+Gunzenhausen', highlight:'Erlebnisbad mit Black-Hole-Riesenrutsche am Altmühlsee' },
    { name:'Erlebnisbad Aquamarin Gaimersheim', addr:'Martin-Ludwig-Str. 15, 85080 Gaimersheim', city:'Gaimersheim', lat:48.811, lng:11.354, tags:['Erlebnisbad','Freibad','Altmühltal'], preis:'Erw. ab 7€', oeffnung:'Mo-Fr 10-20 Uhr, Sa/So 10-18 Uhr', web:'gaimersheim.de/erlebnisbad', maps:'https://maps.google.com/?q=Erlebnisbad+Aquamarin+Gaimersheim', highlight:'Erlebnisbad mit 68m Wasserrutsche und Freibad' },
    { name:'Bambados Bamberg', addr:'Pödeldorfer Str. 234, 96050 Bamberg', city:'Bamberg', lat:49.9084, lng:10.9236, tags:['Erlebnisbad','Sauna','Wellness'], preis:'Erw. 13€', oeffnung:'Mo-So 10-22 Uhr', web:'bambados.de', maps:'https://maps.google.com/?q=Bambados+Bamberg', highlight:'Top Saunalandschaft Franken' },
    { name:'Königsbad Forchheim', addr:'Käsröthe 4, 91301 Forchheim', city:'Forchheim', lat:49.718, lng:11.059, tags:['Erlebnisbad','Freibad','Sauna'], preis:'Erw. ab 9€', oeffnung:'Tägl. 09:30-21 Uhr', web:'koenigsbad-forchheim.de', maps:'https://maps.google.com/?q=Königsbad+Forchheim', highlight:'Ganzjahresbad mit Erlebnisrutschen, Freibad und Saunalandschaft' },
    { name:'Franken-Therme Bad Windsheim', addr:'Ernst-Ludwig-Weg 20, 91438 Bad Windsheim', city:'Ansbach', lat:49.5002, lng:10.4153, tags:['Therme','Heilwasser','Sauna'], preis:'Erw. 18€', oeffnung:'Mo-So 9-22 Uhr', web:'frankentherme.de', maps:'https://maps.google.com/?q=Franken-Therme+Bad+Windsheim', highlight:'Heilwasser-Therme mit Solebecken' },
    { name:'Avita Therme Bad Füssing', addr:'Thermalbadstr. 1, 94072 Bad Füssing', city:'München', lat:48.3559, lng:13.3117, tags:['Therme','Wellness','Medizin'], preis:'ab 20€', oeffnung:'tägl. 9-22 Uhr', web:'avita.de', maps:'https://maps.google.com/?q=Avita+Therme+Bad+Füssing' },
    { name:'Therme Erding', addr:'Thermenallee 1, 85435 Erding', city:'München', lat:48.2878, lng:11.9097, tags:['Therme','Wellness','Rutsche'], preis:'Erw. ab 25€', oeffnung:'tägl. 9-23 Uhr', web:'therme-erding.de', maps:'https://maps.google.com/?q=Therme+Erding', highlight:'Größte Therme der Welt' },
    { name:'Alpspitz-Bade-Center Nesselwang', addr:'Badeseeweg 11, 87484 Nesselwang', city:'Nesselwang', lat:47.622, lng:10.502, tags:['Erlebnisbad','Freibad','Allgäu','Sauna'], preis:'Erw. ab 10€', oeffnung:'Tägl. geöffnet', web:'abc-nesselwang.de', maps:'https://maps.google.com/?q=Alpspitz-Bade-Center+Nesselwang', highlight:'Erlebnisbad mit Bergblick im Allgäu, Innen- und Außenbecken' },
    { name:'Wonnemar Wismar / Schweinfurt', addr:'Mainberger Str. 1, 97422 Schweinfurt', city:'Schweinfurt', lat:50.0395, lng:10.2280, tags:['Erlebnisbad','Sauna'], preis:'Erw. 15€', oeffnung:'Mo-So 10-22 Uhr', web:'wonnemar.de/schweinfurt', maps:'https://maps.google.com/?q=Wonnemar+Schweinfurt' },
      { name:'Hallenbad Mühldorf a. Inn', addr:'Leopoldstraße 1, 84453 Mühldorf a. Inn', city:'Mühldorf', lat:48.242, lng:12.523, tags:['Hallenbad','Sauna','Schwimmkurse'], preis:'Erw. ab 5€', oeffnung:'Mo-Fr 7-21 Uhr, Sa/So 8-18 Uhr', web:'stadtwerke-muehldorf.de', maps:'https://maps.google.com/?q=Hallenbad+Mühldorf+Inn', highlight:'Zentral gelegenes Hallenbad mit Schwimmer- und Nichtschwimmerbecken' },
    { name:'Bad Alexandersbad Fichtelgebirge', addr:'Alexanderstr. 1, 95680 Bad Alexandersbad', city:'Hof', lat:49.9958, lng:11.9849, tags:['Therme','Heilbad'], preis:'ab 12€', oeffnung:'tägl.', web:'bad-alexandersbad.de', maps:'https://maps.google.com/?q=Bad+Alexandersbad' },
    { name:'Wogibad Weiden', addr:'Kreuzweg 1, 92637 Weiden', city:'Weiden', lat:49.6769, lng:12.1594, tags:['Hallenbad','Erlebnisbad'], preis:'5–9€', oeffnung:'Mo-So', web:'wogibad.de', maps:'https://maps.google.com/?q=Wogibad+Weiden' },
  // ─── Neu ergänzt: Erlebnisbäder im 150km-Radius ──────────────────────────
  { name:'Kristall Palm Beach Stein', addr:'Albertus-Magnus-Str. 29, 90547 Stein bei Nürnberg', city:'Stein b.Nürnberg', lat:49.423, lng:10.963, tags:['Erlebnisbad','Therme','Wellenbad','Sauna','Rutschen'], preis:'Erw. ab ca. 12€', oeffnung:'Mo-Do 9-22 Uhr, Fr-Sa 9-24 Uhr, So 9-22 Uhr', web:'palm-beach.de', maps:'https://maps.google.com/?q=Kristall+Palm+Beach+Stein', highlight:'Eines der größten Bäder Bayerns: Wellenbad, 15 Rutschen, Therme & 20 Themensaunen – 15 min von NBG' },
  { name:'Novamare Freizeitbad Neuendettelsau', addr:'Altendettelsauer Str. 11, 91564 Neuendettelsau', city:'Neuendettelsau', lat:49.281, lng:10.791, tags:['Erlebnisbad','Freibad','Familie'], preis:'Erw. ab 4€', oeffnung:'Mo-Fr 15-22 Uhr, Sa/So 10:30-18 Uhr', web:'novamare.de', maps:'https://maps.google.com/?q=Novamare+Neuendettelsau', highlight:'Familien-Erlebnisbad mit 54m Rutsche, Strömungskanal und Außenbecken, 30 min von NBG' },
  { name:'Altmühltherme Treuchtlingen', addr:'Bürgermeister-Döbler-Allee 12, 91757 Treuchtlingen', city:'Treuchtlingen', lat:48.962, lng:10.908, tags:['Therme','Heilwasser','Erlebnisbad','Sauna','Freibad'], preis:'Erw. ab 9€', oeffnung:'Mo 9-20 Uhr, Di-Do 9-21 Uhr, Fr 9-22 Uhr, Sa/So 9-20 Uhr', web:'altmuehltherme.de', maps:'https://maps.google.com/?q=Altmühltherme+Treuchtlingen', highlight:'Staatl. anerk. 18.000 Jahre altes Thermalwasser direkt an der Altmühl, Sauna & Freibad' },
  { name:'Weidener Thermenwelt', addr:'Raiffeisenstraße 7, 92637 Weiden i.d.OPf.', city:'Weiden', lat:49.676, lng:12.155, tags:['Erlebnisbad','Therme','Sauna','Rutsche'], preis:'Erw. ab 8€ (2h)', oeffnung:'Mo-Mi 9-21 Uhr, Do-Sa 9-22 Uhr, So 9-20 Uhr', web:'weidener-thermenwelt.de', maps:'https://maps.google.com/?q=Weidener+Thermenwelt', highlight:'107m Riesenrutsche, Wildwasserkanal, Solebecken & Thermalwasser-Außenbecken' },
  { name:'Freizeitwelle Rötz', addr:'Bräumeisterweg 16, 92444 Rötz', city:'Rötz', lat:49.357, lng:12.521, tags:['Erlebnisbad','Familie','Sauna'], preis:'Erw. ab 5€', oeffnung:'Bitte auf Website prüfen', web:'vg-roetz-treffelstein.de', maps:'https://maps.google.com/?q=Freizeitwelle+Rötz', highlight:'Familien-Erlebnisbad mit Rutsche, Massagedüsen und Sauna im Oberpfälzer Wald' },
  { name:'FrankenLagune Erlebnisbad Hirschaid', addr:'Georg-Kügel-Ring 6, 96114 Hirschaid', city:'Hirschaid', lat:49.816, lng:10.997, tags:['Erlebnisbad','Wellness','Sauna'], preis:'Erw. ab 5€ (1h)', oeffnung:'Mo-Fr 13-21 Uhr, Sa 15-21 Uhr, So/Fei 10-21 Uhr', web:'frankenlagune.de', maps:'https://maps.google.com/?q=FrankenLagune+Hirschaid', highlight:'Erlebnisbad mit Wellnessbereich und Saunalandschaft, 25km nördlich von NBG' },
  { name:'Geomaris Erlebnisbad Gerolzhofen', addr:'Dingolshäuser Str. 2, 97447 Gerolzhofen', city:'Gerolzhofen', lat:49.896, lng:10.340, tags:['Erlebnisbad','Freibad','Sauna','Sole'], preis:'Erw. ab 7€', oeffnung:'Mo-Fr 9-21 Uhr, Sa/So 9-20 Uhr, Fei 10-18 Uhr', web:'geomaris.de', maps:'https://maps.google.com/?q=Geomaris+Gerolzhofen', highlight:'Erlebnisbad mit 50m Rutsche, Solebecken, Sommerfreibad mit 5m Sprungturm' },
  { name:'Nautiland Erlebnisbad Würzburg', addr:'Nigglweg 1, 97082 Würzburg', city:'Würzburg', lat:49.784, lng:9.944, tags:['Erlebnisbad','Sauna','Wellness','Rutsche'], preis:'Erw. ab 6,20€ (2h)', oeffnung:'Tägl. 9-22 Uhr, Bitte auf Website prüfen', web:'wvv.de/baeder/nautiland', maps:'https://maps.google.com/?q=Nautiland+Würzburg', highlight:'Modernes Erlebnisbad (Neubau 2019) mit Saunalandschaft, Hamam und Wellness' },
  { name:'Tropic Beach Bad Kissingen', addr:'Schwimmbadstr. 9, 97688 Bad Kissingen', city:'Bad Kissingen', lat:50.203, lng:10.077, tags:['Erlebnisbad','Wellenbad','Freibad','Rutsche'], preis:'Erw. ab 5€', oeffnung:'Bitte auf Website prüfen', web:'bad-kissingen.de', maps:'https://maps.google.com/?q=Tropic+Beach+Bad+Kissingen', highlight:'Ganzjahres-Erlebnisbad mit Wellenbad, Riesenrutsche, Strömungskanal & Sommerfreibad' },
  { name:'Fichtelbad Wunsiedel', addr:'Schulstr. 20, 95632 Wunsiedel', city:'Wunsiedel', lat:50.038, lng:12.000, tags:['Erlebnisbad','Familie','Sauna'], preis:'Erw. ab 5€', oeffnung:'Bitte auf Website prüfen', web:'wunsiedel.de', maps:'https://maps.google.com/?q=Fichtelbad+Wunsiedel', highlight:'Familien-Erlebnisbad im Fichtelgebirge mit Rutschen und Saunalandschaft' },
  { name:'MAKBAD Hallenbad Marktredwitz', addr:'Egerstr. 2, 95615 Marktredwitz', city:'Marktredwitz', lat:50.000, lng:12.082, tags:['Hallenbad','Erlebnisbad','Familie'], preis:'Erw. ab 4€', oeffnung:'Bitte auf Website prüfen', web:'makbad.de', maps:'https://maps.google.com/?q=MAKBAD+Hallenbad+Marktredwitz', highlight:'Familien-Hallenbad mit Rutsche, Wellness und eigenem Naturbad' },
  { name:'Phönix-Bad Ottobrunn', addr:'Haidgraben 121, 85521 Ottobrunn', city:'Ottobrunn', lat:48.052, lng:11.662, tags:['Erlebnisbad','Sauna','Wellness'], preis:'Erw. ab 9€', oeffnung:'Bitte auf Website prüfen', web:'phoenixbad.de', maps:'https://maps.google.com/?q=Phönix-Bad+Ottobrunn', highlight:'Sport- und Erlebnisbad mit 2 Riesenrutschen, 5m Sprungturm und Wellnesslandschaft nahe München' },
  { name:'AquariUSH Unterschleißheim', addr:'Hartmut-Hermann-Weg 2, 85716 Unterschleißheim', city:'Unterschleißheim', lat:48.281, lng:11.575, tags:['Therme','Heilwasser','Erlebnisbad','Sauna'], preis:'Tageskarte Erw. 12€', oeffnung:'Mo-Fr 9-22 Uhr, Sa/So 8-21 Uhr', web:'aquariush.de', maps:'https://maps.google.com/?q=AquariUSH+Unterschleißheim', highlight:'Staatl. anerk. Thermalwasser-Außenbecken, Familienbad mit Sauna nördl. von München' },
  { name:'elypso Freizeit- und Erlebnisbad Deggendorf', addr:'Sandnerhofweg 4-6, 94469 Deggendorf', city:'Deggendorf', lat:48.838, lng:12.967, tags:['Erlebnisbad','Rutsche','Sauna','Freibad'], preis:'Erw. ab 7€', oeffnung:'Tägl. geöffnet, Bitte auf Website prüfen', web:'elypso.de', maps:'https://maps.google.com/?q=elypso+Deggendorf', highlight:'Ganzjahresbad mit Rutschenturm, Strömungskanal, Jumper-Rutsche & Saunawelt' },
  { name:'Freizeitbad Caprima Dingolfing', addr:'Stadionstraße 44, 84130 Dingolfing', city:'Dingolfing', lat:48.631, lng:12.502, tags:['Erlebnisbad','Wellenbad','Freibad','Sauna'], preis:'Erw. ab 6€', oeffnung:'Bitte auf Website prüfen', web:'stadtwerke-dingolfing.de', maps:'https://maps.google.com/?q=Caprima+Dingolfing', highlight:'Erlebnisbad mit Wellenbad, Rutschen, beheiztem Außenbecken und Wellness-Sauna' },
  { name:'AQACUR Badewelt Bad Kötzting', addr:'Bgm.-Seidl-Platz 1, 93444 Bad Kötzting', city:'Bad Kötzting', lat:49.177, lng:12.858, tags:['Erlebnisbad','Therme','Kneipp','Sauna','Freibad'], preis:'Erw. ab 8€', oeffnung:'Tägl. geöffnet, Bitte auf Website prüfen', web:'aqacur.de', maps:'https://maps.google.com/?q=AQACUR+Bad+Kötzting', highlight:'Kneipp-Heilbad mit 100m X-Tube-Reifenrutsche, Solebecken, Wellenfreibad & Sauna' },
  { name:'Osserbad Lam', addr:'Ginglmühle 5, 93462 Lam', city:'Lam', lat:49.207, lng:12.976, tags:['Erlebnisbad','Rutsche','Familie','Sauna'], preis:'Erw. ab 7€', oeffnung:'Ganzjährig, Bitte auf Website prüfen', web:'osserbad-lam.de', maps:'https://maps.google.com/?q=Osserbad+Lam', highlight:'Ganzjahres-Erlebnisbad mit Riesenrutschen innen & außen, Kinderbereich und Sauna' },
  { name:'Panoramabad Arnbruck', addr:'Riedelsteinweg 1, 93471 Arnbruck', city:'Arnbruck', lat:49.128, lng:12.870, tags:['Erlebnisbad','Familie','Sauna'], preis:'Erw. ab 5€', oeffnung:'Bitte auf Website prüfen', web:'arnbruck.de', maps:'https://maps.google.com/?q=Panoramabad+Arnbruck', highlight:'Erlebnisbad mit Rutsche, Gegenstromanlage, Wildwasserkanal und Sauna im Bayerischen Wald' },
  { name:'Badria Wasserburg am Inn', addr:'Alkorstraße 14, 83512 Wasserburg am Inn', city:'Wasserburg a.Inn', lat:47.997, lng:12.237, tags:['Erlebnisbad','Rutsche','Sauna','Freibad'], preis:'4h: Erw. 13,40€', oeffnung:'Tägl. geöffnet, Bitte auf Website prüfen', web:'badria.de', maps:'https://maps.google.com/?q=Badria+Wasserburg+am+Inn', highlight:'Erlebnisbad mit Crazy-River & Black-Hole-Rutsche, Sauna und Sommerfreibad östl. München' },

  // ─── Neu ergänzt: Thermen im 150km-Radius ────────────────────────────────
  { name:'Fackelmann Therme Hersbruck', addr:'Badstraße 16, 91217 Hersbruck', city:'Hersbruck', lat:49.512, lng:11.442, tags:['Therme','Heilwasser','Sauna','Freibad'], preis:'Erw. ab 13,50€ (3h)', oeffnung:'Mo-Fr 9-22 Uhr, Sa 10-22 Uhr, So 9-20 Uhr', web:'fackelmanntherme.de', maps:'https://maps.google.com/?q=Fackelmann+Therme+Hersbruck', highlight:'Staatl. anerkanntes Heilwasser, 7 Saunen inkl. Fass-Sauna, Sommerfreibad' },
  { name:'Aquella Freizeitbad Ansbach', addr:'Am Stadion 2, 91522 Ansbach', city:'Ansbach', lat:49.302, lng:10.572, tags:['Erlebnisbad','Freibad','Sauna','Wellenbad'], preis:'Erw. ab 8€', oeffnung:'Mo-Fr 9:30-21:30 Uhr, Sa/So 9:30-20 Uhr', web:'myaquella.de', maps:'https://maps.google.com/?q=Aquella+Freizeitbad+Ansbach', highlight:'3.000m² Wasserfläche mit Wellenbad, Strömungskanal, Rutsche und Saunalandschaft' },
  { name:'Kurfürstenbad Amberg', addr:'Kurfürstenring 2, 92224 Amberg', city:'Amberg', lat:49.446, lng:11.862, tags:['Erlebnisbad','Sauna','Kneipp'], preis:'Erw. ab 7,30€ (3h)', oeffnung:'Mo-Mi 9-21 Uhr, Do-Fr 9-22 Uhr, Sa/So 9-20 Uhr', web:'kurfuerstenbad-amberg.de', maps:'https://maps.google.com/?q=Kurfürstenbad+Amberg', highlight:'Erlebnisbad mit einzigartiger Saunalandschaft direkt an den historischen Stadtmauern' },
  { name:'Lohengrin Therme Bayreuth', addr:'Kurpromenade 5, 95448 Bayreuth', city:'Bayreuth', lat:49.945, lng:11.578, tags:['Therme','Heilwasser','Sauna','Wellness'], preis:'Erw. ab 10,50€ (3h)', oeffnung:'Tägl. 9-22 Uhr', web:'lohengrin-therme.de', maps:'https://maps.google.com/?q=Lohengrin+Therme+Bayreuth', highlight:'Staatl. anerkannte Heilquelle (36°C), 7 Saunen, Spa – neben der Eremitage' },
  { name:'Therme Obernsees (Mistelgau)', addr:'Birkenstraße 5, 95490 Mistelgau', city:'Mistelgau', lat:49.936, lng:11.541, tags:['Therme','Heilwasser','Sauna'], preis:'Erw. ab 11€ (2h)', oeffnung:'Mo-Fr 10-21 Uhr, Sa/So 10-22 Uhr', web:'therme-obernsees.de', maps:'https://maps.google.com/?q=Therme+Obernsees+Mistelgau', highlight:'Thermalwasser mit 44°C aus 1.200m Tiefe, Tor zur Fränkischen Schweiz' },
  { name:'Obermain Therme Bad Staffelstein', addr:'Am Kurpark 1, 96231 Bad Staffelstein', city:'Bad Staffelstein', lat:50.099, lng:11.002, tags:['Therme','Sole','Sauna','Wellness'], preis:'Erw. ab 14€ (2h)', oeffnung:'So-Mi 8-21 Uhr, Do-Sa 8-23 Uhr', web:'obermaintherme.de', maps:'https://maps.google.com/?q=Obermain+Therme+Bad+Staffelstein', highlight:'Bayerns wärmste Thermalsole – 25 Becken, 11 Saunen, Jubiläum 40 Jahre 2026' },
  { name:'Limes-Therme Bad Gögging', addr:'An der Therme 1, 93333 Neustadt a.d.Donau', city:'Bad Gögging', lat:48.864, lng:11.837, tags:['Therme','Heilwasser','Sauna'], preis:'Erw. ab 12€', oeffnung:'Tägl. 9-22 Uhr', web:'limes-therme.de', maps:'https://maps.google.com/?q=Limes+Therme+Bad+Gögging', highlight:'Röm.-historisches Thermalwasser im Limesgebiet, 1.600m² Wasserfläche' },
  { name:'Kaisertherme Bad Abbach', addr:'Kaiser-Karl-V.-Allee 1, 93077 Bad Abbach', city:'Bad Abbach', lat:48.936, lng:12.038, tags:['Therme','Heilwasser','Sauna','Wellness'], preis:'Erw. ab 12€', oeffnung:'Tägl. 9-22 Uhr', web:'kaisertherme.de', maps:'https://maps.google.com/?q=Kaisertherme+Bad+Abbach', highlight:'Staatl. anerkannte Jod-Sole-Heilquelle, 1.500m² Wasserfläche, nahe Regensburg' },
  { name:'Therme Bad Steben', addr:'An der Therme 1, 95138 Bad Steben', city:'Bad Steben', lat:50.360, lng:11.638, tags:['Therme','Heilwasser','Sauna','Wellness'], preis:'Erw. ab 11€', oeffnung:'Tägl. 9-22 Uhr', web:'therme-bad-steben.de', maps:'https://maps.google.com/?q=Therme+Bad+Steben', highlight:'Staatl. anerkannte Heilquelle im Frankenwald, Sole & Sauna' },
  { name:'Sonnen-Therme Eging am See', addr:'Sonnenstr. 2, 94535 Eging am See', city:'Eging am See', lat:48.718, lng:13.286, tags:['Therme','Sauna','Wellness'], preis:'Erw. ab 11€', oeffnung:'Tägl. 9-22 Uhr', web:'sonnen-therme.de', maps:'https://maps.google.com/?q=Sonnen-Therme+Eging+am+See', highlight:'Erholungstherme im Bayerischen Wald mit 1.400m² Wasserfläche und Saunalandschaft' },
  { name:'ThermeNatur Bad Rodach', addr:'Thermenallee 1, 96476 Bad Rodach', city:'Bad Rodach', lat:50.342, lng:10.780, tags:['Therme','Heilwasser','Sauna','Freibad'], preis:'Erw. ab 11€', oeffnung:'Tägl. 9-22 Uhr', web:'thermenatur.de', maps:'https://maps.google.com/?q=ThermeNatur+Bad+Rodach', highlight:'Natürliches Thermalwasser, großes Freibad und Saunapark in Oberfranken' },
  { name:'Rottal Terme Bad Birnbach', addr:'Rottal-Terme-Allee 2, 84364 Bad Birnbach', city:'Bad Birnbach', lat:48.441, lng:13.093, tags:['Therme','Heilwasser','Sauna','Wellness'], preis:'Erw. ab 14€', oeffnung:'Tägl. 9-22 Uhr', web:'rottal-terme.de', maps:'https://maps.google.com/?q=Rottal+Terme+Bad+Birnbach', highlight:'Thermal-Heilwasser im niederbayerischen Bäderdreieck, umfassende Saunalandschaft' },

  ],

  // ── FREIZEITPARKS ─────────────────────────────────
  freizeitparks: [
    { name:'Playmobil FunPark Zirndorf', addr:'Brandstätterstr. 2-10, 90513 Zirndorf', city:'Zirndorf', lat:49.4433, lng:10.9543, tags:['Kinder','Familie','Outdoor'], preis:'Kind 14.90€, Erw 5.50€', oeffnung:'Ende Mrz - Anfang Nov, tägl. 9-19 Uhr', web:'playmobil-funpark.de', maps:'https://maps.google.com/?q=Playmobil+FunPark+Zirndorf', highlight:'12 km – direkt vor der Haustür' },
    { name:'Erlebnispark Schloss Thurn', addr:'Schloss-Thurn-Str. 100, 91336 Heroldsbach', city:'Heroldsbach', lat:49.7506, lng:11.0228, tags:['Familie','Achterbahn','VR'], preis:'ab 30.90€', oeffnung:'28.3. – 1.11.2026', web:'schloss-thurn.de', maps:'https://maps.google.com/?q=Schloss+Thurn+Heroldsbach', highlight:'28 km – VR-Achterbahn & Westernstadt' },
    { name:'Freizeit-Land Geiselwind', addr:'Scheinfelder Str. 50, 96160 Geiselwind', city:'Geiselwind', lat:49.7825, lng:10.3959, tags:['Achterbahn','Familie','100 Attraktionen'], preis:'ab ca. 20€', oeffnung:'28.3. – 2.11.2026', web:'freizeit-land.de', maps:'https://maps.google.com/?q=Freizeit-Land+Geiselwind', highlight:'50 km – 6 Achterbahnen, direkt an A3' },
    { name:'Monsterpark Rattelsdorf', addr:'Im Stock 11, 96179 Rattelsdorf', city:'Rattelsdorf', lat:49.9447, lng:10.8812, tags:['Baumaschinen','Kinder','Technik'], preis:'ab 15€', oeffnung:'WE & Feiertage Apr-Okt', web:'', maps:'https://maps.google.com/?q=Monsterpark+Rattelsdorf', highlight:'65 km – Einziger Baggerpark Deutschlands' },
    { name:'Churpfalzpark Loifling', addr:'Loifling 40, 93413 Cham', city:'Cham', lat:49.2197, lng:12.6591, tags:['Familie','Wildpark','Achterbahn'], preis:'ab 18€', oeffnung:'Apr-Okt', web:'churpfalzpark.de', maps:'https://maps.google.com/?q=Churpfalzpark+Loifling' },
    { name:'LEGOLAND Deutschland Günzburg', addr:'Günter-Blobel-Str. 1, 89312 Günzburg', city:'Günzburg', lat:48.4543, lng:10.2779, tags:['Kinder','LEGO','Themenpark'], preis:'ab 50€, ADAC 20%', oeffnung:'28.3. – 1.11.2026', web:'legoland.de', maps:'https://maps.google.com/?q=LEGOLAND+Günzburg', highlight:'120 km – Einziger LEGO-Park DE' },
    { name:'Peppa Pig Park Günzburg', addr:'Günter-Blobel-Str. 1, 89312 Günzburg', city:'Günzburg', lat:48.4543, lng:10.2790, tags:['Kleinkinder','Familie'], preis:'kombi mit LEGOLAND', oeffnung:'Saisonbetrieb 2026', web:'legoland.de/peppa-pig', maps:'https://maps.google.com/?q=Peppa+Pig+Park+Günzburg' },
    { name:'Bayern-Park Reisbach', addr:'Rosenstraße 1, 94419 Reisbach', city:'Reisbach', lat:48.6108, lng:12.6450, tags:['Familie','Achterbahn','Freifallturm'], preis:'ab 25€', oeffnung:'Apr-Okt 2026', web:'bayernpark.de', maps:'https://maps.google.com/?q=Bayern-Park+Reisbach', highlight:'130 km – 35. Jubiläum 2026' },
    { name:'Skyline Park Rammingen', addr:'Am Gumpenried 1, 87672 Marktoberdorf', city:'Rammingen', lat:47.9792, lng:10.5914, tags:['Achterbahn','Thrill','Familie'], preis:'ab 35€', oeffnung:'21.3. – 2.11.2026', web:'skylinepark.de', maps:'https://maps.google.com/?q=Skyline+Park+Rammingen', highlight:'170 km – Größter Park Bayerns, Weltrekordflieger' },
    { name:'Erlebnispark Tripsdrill', addr:'Erlebnispark-Tripsdrill-Str. 1, 74389 Cleebronn', city:'Cleebronn', lat:49.0659, lng:9.1075, tags:['Familie','Wildpark','Ältester Park DE'], preis:'Erw 41€, Parken gratis', oeffnung:'28.3. – 1.11.2026', web:'tripsdrill.de', maps:'https://maps.google.com/?q=Erlebnispark+Tripsdrill', highlight:'180 km – Wildparadies inklusive, NEU 2026: Luftikus' },
    { name:'Schwaben Park Kaisersbach', addr:'Hofwiesen 11, 73667 Kaisersbach', city:'Kaisersbach', lat:48.8678, lng:9.6633, tags:['Familie','Achterbahn'], preis:'ab 25€', oeffnung:'28.3. – 1.11.2026', web:'schwabenpark.de', maps:'https://maps.google.com/?q=Schwaben+Park+Kaisersbach' },
    { name:'Freizeitpark Plohn', addr:'Park 1, 08237 Plohn', city:'Plohn', lat:50.5397, lng:12.3422, tags:['Familie','Geheimtipp','günstig'], preis:'ab 20€', oeffnung:'Apr-Okt', web:'freizeitpark-plohn.de', maps:'https://maps.google.com/?q=Freizeitpark+Plohn', highlight:'160 km – kaum Wartezeiten, echter Geheimtipp' },
    { name:'Belantis Leipzig', addr:'Belantisstr. 1, 04207 Leipzig', city:'Leipzig', lat:51.3397, lng:12.3731, tags:['Familie','Thrill','Wildpark'], preis:'ab 28€ online', oeffnung:'Apr-Nov 2026', web:'belantis.de', maps:'https://maps.google.com/?q=Belantis+Leipzig', highlight:'230 km – Größter Freizeitpark Ostdeutschlands' },
    { name:'Ravensburger Spieleland', addr:'Liebenauer Str. 100, 88074 Meckenbeuren', city:'Rammingen', lat:47.6836, lng:9.5778, tags:['Kinder','Kreativ','Familie'], preis:'ab 35€', oeffnung:'Apr-Nov 2026', web:'spieleland.de', maps:'https://maps.google.com/?q=Ravensburger+Spieleland' },
    { name:'Steinwasen-Park Oberried', addr:'Steinwasen 1, 79254 Oberried', city:'Rust', lat:47.9169, lng:7.9524, tags:['Schwarzwald','Wildpark','Familie'], preis:'ab 25€', oeffnung:'Mrz-Nov 2026', web:'steinwasen-park.de', maps:'https://maps.google.com/?q=Steinwasen+Park+Oberried' },
    { name:'Europa-Park Rust', addr:'Europa-Park-Str. 2, 77977 Rust', city:'Rust', lat:48.2618, lng:7.7326, tags:['Top-Park','Achterbahn','Themenparks'], preis:'ab 67€ Erw.', oeffnung:'ganzjährig', web:'europapark.de', maps:'https://maps.google.com/?q=Europa-Park+Rust', highlight:'350 km – Bester Park Europas, 7 Mio Besucher' },
    { name:'Phantasialand Brühl', addr:'Berggeiststr. 31-41, 50321 Brühl', city:'Brühl', lat:50.8299, lng:6.9056, tags:['Thrill','Weltklasse','Achterbahn'], preis:'ab 47€ online', oeffnung:'Apr-Dez 2026', web:'phantasialand.de', maps:'https://maps.google.com/?q=Phantasialand+Brühl', highlight:'420 km – Mehrfach Bester Park Europas' },
    { name:'Movie Park Germany Marl', addr:'Warner Allee 1, 45772 Marl', city:'Marl', lat:51.5694, lng:7.1970, tags:['Film','Shows','Halloween'], preis:'ab 40€', oeffnung:'Apr-Nov 2026', web:'movieparkgermany.de', maps:'https://maps.google.com/?q=Movie+Park+Germany', highlight:'450 km – Film- & Studio-Themenpark NRW' },
    { name:'Heide Park Resort Soltau', addr:'Heide-Park-Str. 1, 29614 Soltau', city:'Soltau', lat:52.9994, lng:9.9178, tags:['Achterbahn','Thrill','Familie'], preis:'ab 45€', oeffnung:'Apr-Nov 2026', web:'heide-park.de', maps:'https://maps.google.com/?q=Heide+Park+Soltau', highlight:'480 km – Größter Freizeitpark Norddeutschlands' },
    { name:'Hansa-Park Sierksdorf', addr:'Sierksdorfer Str. 10, 23730 Sierksdorf', city:'Sierksdorf', lat:54.0731, lng:10.7592, tags:['Ostsee','Achterbahn','Familie'], preis:'ab 40€', oeffnung:'Apr-Nov 2026', web:'hansapark.de', maps:'https://maps.google.com/?q=Hansa-Park+Sierksdorf', highlight:'630 km – Einziger Freizeitpark direkt an der Ostsee' },
    { name:'Serengeti-Park Hodenhagen', addr:'Am Safaripark 1, 29693 Hodenhagen', city:'Hodenhagen', lat:52.7550, lng:9.6167, tags:['Safari','Tiere','Freizeitpark'], preis:'ab 38€', oeffnung:'Apr-Nov 2026', web:'serengeti-park.de', maps:'https://maps.google.com/?q=Serengeti+Park+Hodenhagen', highlight:'490 km – Größter Freizeitpark Deutschlands nach Fläche, Safari + Rides' },
    { name:'Erlebnispark Steinau', addr:'Steinau an der Straße', city:'Lohr', lat:50.3139, lng:9.4652, tags:['Familie','Grimm','Märchen'], preis:'ab 15€', oeffnung:'Saisonbetrieb', web:'erlebnispark-steinau.de', maps:'https://maps.google.com/?q=Erlebnispark+Steinau' },
    { name:'Tatzmania Löffingen', addr:'Im Zollhaus 1, 79843 Löffingen', city:'Rust', lat:47.8822, lng:8.3428, tags:['Wildpark','Kinder','Schwarzwald'], preis:'ab 22€', oeffnung:'Saisonbetrieb', web:'tatzmania.de', maps:'https://maps.google.com/?q=Tatzmania+Löffingen' },
    { name:'Wild- und Freizeitpark Allensbach', addr:'Litzelstetterstr. 5, 78476 Allensbach', city:'Rust', lat:47.7123, lng:9.0553, tags:['Wildpark','Bodensee','Familie'], preis:'ab 18€', oeffnung:'Apr-Nov', web:'', maps:'https://maps.google.com/?q=Wild+und+Freizeitpark+Allensbach' },
  ],

  // ── CLUBS & DISKOTHEKEN ───────────────────────────
  clubs: [
    // ── Nürnberg ──
    { name:'Mach1 Nürnberg', addr:'Karl-Grillenberger-Str. 25, 90402 Nürnberg', city:'Nürnberg', lat:49.4547, lng:11.0758, tags:['HipHop','R&B','Club'], preis:'8-15€', oeffnung:'Fr/Sa ab 22 Uhr', web:'mach1-club.de', maps:'https://maps.google.com/?q=Mach1+Nürnberg' },
    { name:'Die Rakete Nürnberg', addr:'Engelsgasse 3, 90402 Nürnberg', city:'Nürnberg', lat:49.4548, lng:11.0745, tags:['Techno','Club','Underground'], preis:'8-15€', oeffnung:'Fr/Sa ab 23 Uhr', web:'', maps:'https://maps.google.com/?q=Die+Rakete+Nürnberg' },
    { name:'Hirsch Nürnberg', addr:'Vogelweiherstr. 66, 90441 Nürnberg', city:'Nürnberg', lat:49.4337, lng:11.0918, tags:['Konzerte','Club','Indie'], preis:'8-20€', oeffnung:'Events', web:'der-hirsch.de', maps:'https://maps.google.com/?q=Hirsch+Nürnberg', highlight:'Bekannteste Konzertlocation Nürnbergs' },
    { name:'Haus 33 Nürnberg', addr:'Johannisstr. 33, 90419 Nürnberg', city:'Nürnberg', lat:49.4641, lng:11.0714, tags:['Club','Loft','Events'], preis:'8-15€', oeffnung:'Fr/Sa ab 22 Uhr', web:'', maps:'https://maps.google.com/?q=Haus+33+Nürnberg' },
    { name:'Club Stereo Nürnberg', addr:'Pirkheimerstr. 57, 90408 Nürnberg', city:'Nürnberg', lat:49.4616, lng:11.0845, tags:['Electronic','Techno','Club'], preis:'5-15€', oeffnung:'Fr/Sa ab 23 Uhr', web:'', maps:'https://maps.google.com/?q=Club+Stereo+Nürnberg' },
    { name:'Schimanski Nürnberg', addr:'Hallplatz 2, 90402 Nürnberg', city:'Nürnberg', lat:49.4556, lng:11.0752, tags:['Club','Mixed','Mainstream'], preis:'8-12€', oeffnung:'Fr/Sa ab 22 Uhr', web:'', maps:'https://maps.google.com/?q=Schimanski+Nürnberg' },
    { name:'HINZ x KUNZ Nürnberg', addr:'Nürnberg Innenstadt', city:'Nürnberg', lat:49.4553, lng:11.0791, tags:['Club','Party','Mixed'], preis:'8-15€', oeffnung:'Fr/Sa ab 22 Uhr', web:'', maps:'https://maps.google.com/?q=HINZ+KUNZ+Nürnberg' },
    { name:'ONLY Club Nürnberg', addr:'Nürnberg', city:'Nürnberg', lat:49.4549, lng:11.0769, tags:['Club','VIP','Lounge'], preis:'10-20€', oeffnung:'Fr/Sa ab 22 Uhr', web:'', maps:'https://maps.google.com/?q=ONLY+Club+Nürnberg' },
    { name:'nachtkind Nürnberg', addr:'Nürnberg', city:'Nürnberg', lat:49.4562, lng:11.0774, tags:['Club','Electronic','Nacht'], preis:'8-12€', oeffnung:'Fr/Sa ab 23 Uhr', web:'', maps:'https://maps.google.com/?q=nachtkind+Nürnberg' },
    { name:'Der Cult Nürnberg', addr:'Celtisplatz 13, 90403 Nürnberg', city:'Nürnberg', lat:49.4561, lng:11.0627, tags:['Mixed','Commercial','Club'], preis:'8-12€', oeffnung:'Fr/Sa ab 22 Uhr', web:'', maps:'https://maps.google.com/?q=Cult+Club+Nürnberg' },
    { name:'KON71 Nürnberg', addr:'Königstr. 71, 90402 Nürnberg', city:'Nürnberg', lat:49.4490, lng:11.0817, tags:['Club','Lounge','Mainstream'], preis:'8-15€', oeffnung:'Fr/Sa ab 22 Uhr', web:'', maps:'https://maps.google.com/?q=KON71+Nürnberg' },
    { name:'Die Bombe Nürnberg', addr:'Nürnberg Innenstadt', city:'Nürnberg', lat:49.4554, lng:11.0762, tags:['Club','Party','Kult'], preis:'5-12€', oeffnung:'Fr/Sa ab 22 Uhr', web:'', maps:'https://maps.google.com/?q=Die+Bombe+Nürnberg' },
    { name:'Unrat Nürnberg', addr:'Maxfeldstr. 37, 90409 Nürnberg', city:'Nürnberg', lat:49.4602, lng:11.0893, tags:['Alternativ','Club','Underground'], preis:'5-10€', oeffnung:'WE ab 22 Uhr', web:'', maps:'https://maps.google.com/?q=Unrat+Nürnberg' },
    { name:'Rosi Schulz Nürnberg', addr:'Ludwigstr. 69, 90402 Nürnberg', city:'Nürnberg', lat:49.4519, lng:11.0682, tags:['Club','Alternativ','Indie'], preis:'5-10€', oeffnung:'Fr/Sa ab 22 Uhr', web:'', maps:'https://maps.google.com/?q=Rosi+Schulz+Nürnberg' },
    { name:'Resi Nürnberg', addr:'Nürnberg', city:'Nürnberg', lat:49.4540, lng:11.0780, tags:['Club','Mixed','Kult'], preis:'5-12€', oeffnung:'Fr/Sa ab 22 Uhr', web:'', maps:'https://maps.google.com/?q=Resi+Nürnberg' },
    { name:'Fogon Nürnberg', addr:'Nürnberg Innenstadt', city:'Nürnberg', lat:49.4558, lng:11.0733, tags:['Club','Lounge','Latin'], preis:'8-15€', oeffnung:'Fr/Sa ab 22 Uhr', web:'', maps:'https://maps.google.com/?q=Fogon+Club+Nürnberg' },
    { name:'Matrixx Nürnberg', addr:'Frankenstr., 90461 Nürnberg', city:'Nürnberg', lat:49.4290, lng:11.1060, tags:['Club','Electronic','Rave'], preis:'8-15€', oeffnung:'Fr/Sa ab 23 Uhr', web:'', maps:'https://maps.google.com/?q=Matrixx+Nürnberg' },
    { name:'Mississippi Queen Nürnberg', addr:'Nürnberg', city:'Nürnberg', lat:49.4535, lng:11.0671, tags:['Club','Rock','Live'], preis:'5-12€', oeffnung:'Fr/Sa ab 21 Uhr', web:'', maps:'https://maps.google.com/?q=Mississippi+Queen+Nürnberg' },
    { name:'Kiss Klub Nürnberg', addr:'Nürnberg', city:'Nürnberg', lat:49.4543, lng:11.0786, tags:['Club','Commercial','Party'], preis:'8-15€', oeffnung:'Fr/Sa ab 22 Uhr', web:'', maps:'https://maps.google.com/?q=Kiss+Klub+Nürnberg' },
    { name:'WASCHSALON Nürnberg', addr:'Nürnberg', city:'Nürnberg', lat:49.4578, lng:11.0601, tags:['Club','Alternativ','Kult'], preis:'5-10€', oeffnung:'Fr/Sa ab 22 Uhr', web:'', maps:'https://maps.google.com/?q=Waschsalon+Club+Nürnberg' },
    { name:'PANDA Club Nürnberg', addr:'Nürnberg', city:'Nürnberg', lat:49.4550, lng:11.0771, tags:['Club','Techno','Electronic'], preis:'8-15€', oeffnung:'Fr/Sa ab 23 Uhr', web:'', maps:'https://maps.google.com/?q=Panda+Club+Nürnberg' },
    { name:'Terminal 90 Nürnberg', addr:'Frankenstr., 90461 Nürnberg', city:'Nürnberg', lat:49.4280, lng:11.1120, tags:['Club','Electronic','Lager'], preis:'8-15€', oeffnung:'WE ab 23 Uhr', web:'', maps:'https://maps.google.com/?q=Terminal+90+Nürnberg' },
    { name:'Gemein & Gefährlich Nürnberg', addr:'Nürnberg', city:'Nürnberg', lat:49.4558, lng:11.0744, tags:['Club','Underground','Indie'], preis:'5-12€', oeffnung:'Fr/Sa ab 22 Uhr', web:'', maps:'https://maps.google.com/?q=Gemein+Gefährlich+Nürnberg' },
    { name:'Mitte Soundbar Nürnberg', addr:'Nürnberg Innenstadt', city:'Nürnberg', lat:49.4553, lng:11.0771, tags:['Bar','Club','Electronic'], preis:'5-10€', oeffnung:'Do-Sa ab 21 Uhr', web:'', maps:'https://maps.google.com/?q=Mitte+Soundbar+Nürnberg' },
    { name:'Club SOHO Nürnberg', addr:'Nürnberg', city:'Nürnberg', lat:49.4545, lng:11.0758, tags:['Club','VIP','Lounge'], preis:'10-20€', oeffnung:'Fr/Sa ab 22 Uhr', web:'', maps:'https://maps.google.com/?q=Club+SOHO+Nürnberg' },
    { name:'Planet Nürnberg', addr:'Nürnberg', city:'Nürnberg', lat:49.4537, lng:11.0775, tags:['Club','Commercial','Mainstream'], preis:'8-12€', oeffnung:'Fr/Sa ab 22 Uhr', web:'', maps:'https://maps.google.com/?q=Planet+Club+Nürnberg' },
    { name:'After Hour Nürnberg', addr:'Nürnberg', city:'Nürnberg', lat:49.4552, lng:11.0769, tags:['Club','After Hour','Electronic'], preis:'5-10€', oeffnung:'Sa/So ab 6 Uhr', web:'', maps:'https://maps.google.com/?q=After+Hour+Nürnberg' },
    { name:'Z-Bau Nürnberg', addr:'Frankenstr. 200, 90461 Nürnberg', city:'Nürnberg', lat:49.4289, lng:11.1063, tags:['Alternativ','Konzerte','Kultur'], preis:'5-18€', oeffnung:'Events', web:'z-bau.de', maps:'https://maps.google.com/?q=Z-Bau+Nürnberg' },
    { name:'MUZ Club Nürnberg', addr:'Außere Sulzbacher Str. 62, 90491 Nürnberg', city:'Nürnberg', lat:49.4659, lng:11.1165, tags:['Electronic','Underground'], preis:'8-15€', oeffnung:'Fr/Sa', web:'muz-club.de', maps:'https://maps.google.com/?q=MUZ+Club+Nürnberg' },
    { name:'Tafelhalle Nürnberg', addr:'Äußere Sulzbacher Str. 62, 90491 Nürnberg', city:'Nürnberg', lat:49.4659, lng:11.1165, tags:['Konzerte','Veranstaltungen','Indoor'], preis:'variabel', oeffnung:'Events', web:'tafelhalle.de', maps:'https://maps.google.com/?q=Tafelhalle+Nürnberg' },
    // ── Fürth ──
    { name:'Maxim Fürth', addr:'Rudolf-Breitscheid-Str. 23, 90762 Fürth', city:'Fürth', lat:49.4741, lng:10.9889, tags:['Club','Shisha','Lounge'], preis:'10-15€', oeffnung:'Fr/Sa ab 22 Uhr', web:'', maps:'https://maps.google.com/?q=Maxim+Fürth', highlight:'Russian Trussmee Events monatlich' },
    { name:'Frieda Club Fürth', addr:'Gebhardtstr. 7, 90762 Fürth', city:'Fürth', lat:49.4738, lng:10.9853, tags:['Club','Electronic','Alternativ'], preis:'5-12€', oeffnung:'Fr/Sa ab 23 Uhr', web:'', maps:'https://maps.google.com/?q=Frieda+Club+Fürth' },
    { name:'Club Maskara Fürth', addr:'Fürth', city:'Fürth', lat:49.4762, lng:10.9894, tags:['Club','Mixed','Party'], preis:'8-15€', oeffnung:'Fr/Sa ab 22 Uhr', web:'', maps:'https://maps.google.com/?q=Club+Maskara+Fürth' },
    { name:'Babylon Fürth', addr:'Fürth', city:'Fürth', lat:49.4769, lng:10.9871, tags:['Club','Mixed','Mainstream'], preis:'8-12€', oeffnung:'Fr/Sa ab 22 Uhr', web:'', maps:'https://maps.google.com/?q=Babylon+Club+Fürth' },
    { name:'Uferlos Fürth', addr:'Schwabacher Str. 34, 90762 Fürth', city:'Fürth', lat:49.4699, lng:10.9922, tags:['Club','Bar','Mix'], preis:'5-12€', oeffnung:'WE', web:'', maps:'https://maps.google.com/?q=Uferlos+Fürth' },
    // ── Erlangen ──
    { name:'E-Werk Erlangen', addr:'Fuchsenwiese 1, 91056 Erlangen', city:'Erlangen', lat:49.5864, lng:11.0045, tags:['Konzerte','Club','Kultur'], preis:'8-25€', oeffnung:'Events', web:'e-werk-erlangen.de', maps:'https://maps.google.com/?q=E-Werk+Erlangen', highlight:'Kulturzentrum + Club in einem' },
    { name:'Paisley Erlangen', addr:'Erlangen', city:'Erlangen', lat:49.5953, lng:11.0034, tags:['Club','Alternativ','Indie'], preis:'5-12€', oeffnung:'Fr/Sa ab 22 Uhr', web:'', maps:'https://maps.google.com/?q=Paisley+Erlangen' },
    { name:'Transfer Bar Erlangen', addr:'Erlangen', city:'Erlangen', lat:49.5970, lng:11.0020, tags:['Bar','Club','Studenten'], preis:'5-10€', oeffnung:'Do-Sa ab 21 Uhr', web:'', maps:'https://maps.google.com/?q=Transfer+Bar+Erlangen' },
    // ── Bamberg ──
    { name:'LIVE-Club Bamberg', addr:'Bamberg', city:'Bamberg', lat:49.8990, lng:10.9021, tags:['Club','Live','Konzerte'], preis:'8-20€', oeffnung:'WE + Events', web:'live-club.de', maps:'https://maps.google.com/?q=Live+Club+Bamberg', highlight:'Bekanntester Club Bambergs' },
    { name:'Terminal Club Bamberg', addr:'Bamberg', city:'Bamberg', lat:49.9003, lng:10.9038, tags:['Club','Electronic','Techno'], preis:'8-15€', oeffnung:'Fr/Sa ab 23 Uhr', web:'', maps:'https://maps.google.com/?q=Terminal+Club+Bamberg' },
    { name:'Morph Club Bamberg', addr:'Bamberg', city:'Bamberg', lat:49.8975, lng:10.9009, tags:['Club','Underground','Electronic'], preis:'8-12€', oeffnung:'Fr/Sa ab 23 Uhr', web:'', maps:'https://maps.google.com/?q=Morph+Club+Bamberg' },
    { name:'Sound-n-Art Bamberg', addr:'Bamberg', city:'Bamberg', lat:49.8998, lng:10.9015, tags:['Club','Musik','Art'], preis:'5-12€', oeffnung:'Fr/Sa ab 22 Uhr', web:'', maps:'https://maps.google.com/?q=Sound+n+Art+Bamberg' },
    // ── Bayreuth ──
    { name:'Mia Bayreuth', addr:'Bayreuth', city:'Bayreuth', lat:49.9443, lng:11.5781, tags:['Club','Mixed','Mainstream'], preis:'8-15€', oeffnung:'Fr/Sa ab 22 Uhr', web:'', maps:'https://maps.google.com/?q=Mia+Club+Bayreuth' },
    { name:'Fabrik Bayreuth', addr:'Bayreuth', city:'Bayreuth', lat:49.9461, lng:11.5804, tags:['Club','Electronic','Industrial'], preis:'8-15€', oeffnung:'Fr/Sa ab 23 Uhr', web:'', maps:'https://maps.google.com/?q=Fabrik+Club+Bayreuth' },
    // ── Würzburg ──
    { name:'Airport Club Würzburg', addr:'Würzburg', city:'Würzburg', lat:49.7872, lng:9.9358, tags:['Club','Mainstream','Party'], preis:'8-15€', oeffnung:'Fr/Sa ab 22 Uhr', web:'', maps:'https://maps.google.com/?q=Airport+Club+Würzburg' },
    { name:'Zauberberg Würzburg', addr:'Würzburg', city:'Würzburg', lat:49.7891, lng:9.9401, tags:['Club','Alternativ','Underground'], preis:'5-12€', oeffnung:'Fr/Sa ab 22 Uhr', web:'', maps:'https://maps.google.com/?q=Zauberberg+Würzburg' },
    { name:'Labyrinth Würzburg', addr:'Würzburg', city:'Würzburg', lat:49.7863, lng:9.9349, tags:['Club','Electronic','Techno'], preis:'8-15€', oeffnung:'Fr/Sa ab 23 Uhr', web:'', maps:'https://maps.google.com/?q=Labyrinth+Club+Würzburg' },
    { name:'L-Club Würzburg', addr:'Würzburg', city:'Würzburg', lat:49.7884, lng:9.9373, tags:['Club','Lounge','Mixed'], preis:'8-15€', oeffnung:'Fr/Sa ab 22 Uhr', web:'', maps:'https://maps.google.com/?q=L+Club+Würzburg' },
    { name:'Odeon Lounge Würzburg', addr:'Würzburg', city:'Würzburg', lat:49.7879, lng:9.9361, tags:['Club','Lounge','VIP'], preis:'10-20€', oeffnung:'Fr/Sa ab 22 Uhr', web:'', maps:'https://maps.google.com/?q=Odeon+Lounge+Würzburg' },
    { name:'Bombe Würzburg', addr:'Würzburg', city:'Würzburg', lat:49.7867, lng:9.9364, tags:['Club','Kult','Underground'], preis:'5-10€', oeffnung:'Fr/Sa ab 22 Uhr', web:'', maps:'https://maps.google.com/?q=Bombe+Club+Würzburg' },
    { name:'Kellerperle Würzburg', addr:'Würzburg', city:'Würzburg', lat:49.7881, lng:9.9390, tags:['Club','Keller','Alternativ'], preis:'5-12€', oeffnung:'Fr/Sa ab 22 Uhr', web:'', maps:'https://maps.google.com/?q=Kellerperle+Würzburg' },
    { name:'Das Boot Würzburg', addr:'Würzburg', city:'Würzburg', lat:49.7896, lng:9.9404, tags:['Club','Donau','Party'], preis:'8-15€', oeffnung:'Fr/Sa ab 22 Uhr', web:'', maps:'https://maps.google.com/?q=Das+Boot+Club+Würzburg' },
    // ── Regensburg ──
    { name:'Scala Club Regensburg', addr:'Regensburg', city:'Regensburg', lat:49.0131, lng:12.1001, tags:['Club','Mainstream','Party'], preis:'8-15€', oeffnung:'Fr/Sa ab 22 Uhr', web:'', maps:'https://maps.google.com/?q=Scala+Club+Regensburg' },
    { name:'Gatsby Regensburg', addr:'Regensburg', city:'Regensburg', lat:49.0139, lng:12.0989, tags:['Club','VIP','Gatsby'], preis:'10-20€', oeffnung:'Fr/Sa ab 22 Uhr', web:'', maps:'https://maps.google.com/?q=Gatsby+Regensburg' },
    { name:'Suite Fifteen Regensburg', addr:'Regensburg', city:'Regensburg', lat:49.0148, lng:12.1010, tags:['Club','Lounge','Premium'], preis:'10-20€', oeffnung:'Fr/Sa ab 22 Uhr', web:'', maps:'https://maps.google.com/?q=Suite+Fifteen+Regensburg' },
    { name:'Heart Club Regensburg', addr:'Regensburg', city:'Regensburg', lat:49.0122, lng:12.0997, tags:['Club','Electronic','Techno'], preis:'8-15€', oeffnung:'Fr/Sa ab 23 Uhr', web:'', maps:'https://maps.google.com/?q=Heart+Club+Regensburg' },
    { name:'Club Schimmerlos Regensburg', addr:'Regensburg', city:'Regensburg', lat:49.0135, lng:12.1020, tags:['Club','Underground','Alternativ'], preis:'5-12€', oeffnung:'Fr/Sa ab 22 Uhr', web:'', maps:'https://maps.google.com/?q=Club+Schimmerlos+Regensburg' },
    { name:'Mylo Regensburg', addr:'Regensburg', city:'Regensburg', lat:49.0128, lng:12.0979, tags:['Club','Mainstream','Mixed'], preis:'8-15€', oeffnung:'Fr/Sa ab 22 Uhr', web:'', maps:'https://maps.google.com/?q=Mylo+Regensburg' },
    // ── Augsburg ──
    { name:'Cube Club Augsburg', addr:'Augsburg', city:'Augsburg', lat:48.3700, lng:10.8974, tags:['Club','Electronic','Techno'], preis:'8-15€', oeffnung:'Fr/Sa ab 23 Uhr', web:'', maps:'https://maps.google.com/?q=Cube+Club+Augsburg' },
    { name:'Panda Club Augsburg', addr:'Augsburg', city:'Augsburg', lat:48.3712, lng:10.8954, tags:['Club','Mixed','Party'], preis:'8-12€', oeffnung:'Fr/Sa ab 22 Uhr', web:'', maps:'https://maps.google.com/?q=Panda+Club+Augsburg' },
    { name:'Provokant Augsburg', addr:'Augsburg', city:'Augsburg', lat:48.3683, lng:10.8992, tags:['Club','Alternativ','Underground'], preis:'5-12€', oeffnung:'Fr/Sa ab 22 Uhr', web:'', maps:'https://maps.google.com/?q=Provokant+Augsburg' },
    { name:'Touch Events Augsburg', addr:'Augsburg', city:'Augsburg', lat:48.3692, lng:10.8979, tags:['Club','Events','Mixed'], preis:'8-15€', oeffnung:'WE + Events', web:'', maps:'https://maps.google.com/?q=Touch+Events+Augsburg' },
    { name:'Kantine Augsburg (Clubnächte)', addr:'Augsburg', city:'Augsburg', lat:48.3721, lng:10.8961, tags:['Club','Konzerte','Kantine'], preis:'8-20€', oeffnung:'Events', web:'', maps:'https://maps.google.com/?q=Kantine+Augsburg' },
    // ── München (~150 km) ──
    { name:'P1 München', addr:'Prinzregentenstr. 1, 80538 München', city:'München', lat:48.1421, lng:11.5951, tags:['VIP','Promi','Mainstream'], preis:'Eintritt variabel', oeffnung:'Fr/Sa ab 23 Uhr', web:'p1-club.de', maps:'https://maps.google.com/?q=P1+München', highlight:'Prominentester Club Münchens' },
    { name:'Neuraum München', addr:'München', city:'München', lat:48.1302, lng:11.5776, tags:['Techno','Electronic','Underground'], preis:'8-20€', oeffnung:'Fr/Sa ab 23 Uhr', web:'', maps:'https://maps.google.com/?q=Neuraum+München' },
    { name:'Pacha München', addr:'Maximiliansplatz 5, 80333 München', city:'München', lat:48.1396, lng:11.5700, tags:['Club','Commercial','Ibiza-Style'], preis:'15-30€', oeffnung:'Fr/Sa ab 23 Uhr', web:'pacha-munich.com', maps:'https://maps.google.com/?q=Pacha+München' },
    { name:'Blitz Club München', addr:'München', city:'München', lat:48.1303, lng:11.5813, tags:['Techno','Underground','Club'], preis:'10-20€', oeffnung:'Fr/Sa ab 23 Uhr', web:'blitz-munich.de', maps:'https://maps.google.com/?q=Blitz+Club+München' },
    { name:'Harry Klein München', addr:'Sonnenstr. 8, 80331 München', city:'München', lat:48.1353, lng:11.5641, tags:['Techno','Minimal','Club'], preis:'10-18€', oeffnung:'Fr/Sa ab 23 Uhr', web:'harrykleinclub.de', maps:'https://maps.google.com/?q=Harry+Klein+München', highlight:'Techno-Kult in München' },
    { name:'MMA Club München', addr:'München', city:'München', lat:48.1352, lng:11.5752, tags:['Club','Electronic','Mixed'], preis:'10-20€', oeffnung:'Fr/Sa ab 23 Uhr', web:'', maps:'https://maps.google.com/?q=MMA+Club+München' },
    { name:'Rote Sonne München', addr:'Maximiliansplatz 5, 80333 München', city:'München', lat:48.1396, lng:11.5698, tags:['Techno','Electronic','Kult'], preis:'8-15€', oeffnung:'Fr/Sa ab 23 Uhr', web:'rote-sonne.com', maps:'https://maps.google.com/?q=Rote+Sonne+München', highlight:'Münchner Techno-Institution' },
    { name:'Milla München', addr:'Holzstr. 28, 80469 München', city:'München', lat:48.1358, lng:11.5593, tags:['Indie','Konzerte','Club'], preis:'8-15€', oeffnung:'Events', web:'milla-club.de', maps:'https://maps.google.com/?q=Milla+München' },
    { name:'Milchbar München', addr:'München', city:'München', lat:48.1388, lng:11.5783, tags:['Club','Electronic','Gemütlich'], preis:'8-15€', oeffnung:'Fr/Sa ab 23 Uhr', web:'', maps:'https://maps.google.com/?q=Milchbar+München' },
    { name:'Palais Club München', addr:'München', city:'München', lat:48.1401, lng:11.5740, tags:['Club','VIP','Elegant'], preis:'15-30€', oeffnung:'Fr/Sa ab 22 Uhr', web:'', maps:'https://maps.google.com/?q=Palais+Club+München' },
    // ── Überregional ──
    { name:'Berghain Berlin', addr:'Am Wriezener Bahnhof, 10243 Berlin', city:'Berlin', lat:52.5102, lng:13.4440, tags:['Techno','Weltklasse','24h'], preis:'10-20€', oeffnung:'Fr ab 0 Uhr – So', web:'berghain.de', maps:'https://maps.google.com/?q=Berghain+Berlin', highlight:'Legendärster Club der Welt' },
  ],

  // ── SHISHABARS ────────────────────────────────────
  shisha: [
    { name:'Maxim Fürth (Shishabar)', addr:'Rudolf-Breitscheid-Str. 23, 90762 Fürth', city:'Fürth', lat:49.4741, lng:10.9889, tags:['Shisha','Lounge','Russian Nights'], preis:'ab 15€/Kopf', oeffnung:'tägl. ab 18 Uhr', web:'', maps:'https://maps.google.com/?q=Maxim+Fürth', highlight:'Russian Events mit Trussmee' },
    { name:'SOCIETY Nürnberg (Shishabar & Club)', addr:'Färberstr. 30, 90402 Nürnberg', city:'Nürnberg', lat:49.4548, lng:11.0752, tags:['Shisha','Club','Russian Events'], preis:'Shisha ab 14€ / Eintritt 10-15€', oeffnung:'Fr/Sa + Events', web:'', maps:'https://maps.google.com/?q=SOCIETY+Club+Nürnberg', highlight:'White Rabbit Russian Events monatlich' },
    { name:'Maxime Nürnberg', addr:'Nürnberg Innenstadt', city:'Nürnberg', lat:49.4520, lng:11.0771, tags:['Shisha','Lounge','Nürnberg'], preis:'ab 15€', oeffnung:'tägl. ab 17 Uhr', web:'', maps:'https://maps.google.com/?q=Maxime+Shisha+Nürnberg' },
    { name:'Loca Lounge Shisha Nürnberg', addr:'Nürnberg', city:'Nürnberg', lat:49.4560, lng:11.0780, tags:['Shisha','Cocktails','Lounge'], preis:'ab 12€', oeffnung:'tägl. ab 16 Uhr', web:'', maps:'https://maps.google.com/?q=Loca+Lounge+Nürnberg' },
    { name:'Dubai Lounge Nürnberg', addr:'Nürnberg', city:'Nürnberg', lat:49.4500, lng:11.0820, tags:['Shisha','Oriental','Premium'], preis:'ab 18€', oeffnung:'tägl. ab 17 Uhr', web:'', maps:'https://maps.google.com/?q=Dubai+Lounge+Nürnberg' },
    { name:'Sahara Shisha Lounge Nürnberg', addr:'Nürnberg', city:'Nürnberg', lat:49.4580, lng:11.0750, tags:['Shisha','Tee','Entspannung'], preis:'ab 12€', oeffnung:'tägl. ab 15 Uhr', web:'', maps:'https://maps.google.com/?q=Sahara+Shisha+Nürnberg' },
    { name:'Cloud 9 Shisha Nürnberg', addr:'Nürnberg', city:'Nürnberg', lat:49.4535, lng:11.0855, tags:['Shisha','Cocktails','Modern'], preis:'ab 14€', oeffnung:'Mo-So ab 16 Uhr', web:'', maps:'https://maps.google.com/?q=Cloud+9+Shisha+Nürnberg' },
    { name:'1001 Nacht Shisha Lounge Nürnberg', addr:'Nürnberg', city:'Nürnberg', lat:49.4545, lng:11.0730, tags:['Shisha','Orient','Gemütlich'], preis:'ab 13€', oeffnung:'tägl. ab 16 Uhr', web:'', maps:'https://maps.google.com/?q=1001+Nacht+Shisha+Nürnberg' },
    { name:'Oasis Shisha Lounge Erlangen', addr:'Erlangen', city:'Erlangen', lat:49.5910, lng:11.0078, tags:['Shisha','Lounge'], preis:'ab 12€', oeffnung:'tägl. ab 16 Uhr', web:'', maps:'https://maps.google.com/?q=Oasis+Shisha+Erlangen' },
    { name:'Oriental Palace Fürth', addr:'Fürth', city:'Fürth', lat:49.4770, lng:10.9880, tags:['Shisha','Oriental','Lounge'], preis:'ab 14€', oeffnung:'tägl. ab 16 Uhr', web:'', maps:'https://maps.google.com/?q=Oriental+Palace+Fürth' },
    { name:'Shisha King Nürnberg', addr:'Nürnberg', city:'Nürnberg', lat:49.4552, lng:11.0798, tags:['Shisha','Günstig'], preis:'ab 10€', oeffnung:'tägl. ab 15 Uhr', web:'', maps:'https://maps.google.com/?q=Shisha+King+Nürnberg' },
    { name:'Havana Shisha Lounge Nürnberg', addr:'Nürnberg', city:'Nürnberg', lat:49.4570, lng:11.0762, tags:['Shisha','Cocktails','Karibik'], preis:'ab 14€', oeffnung:'tägl. ab 17 Uhr', web:'', maps:'https://maps.google.com/?q=Havana+Shisha+Nürnberg' },
    { name:'Zara Shisha Lounge Nürnberg', addr:'Nürnberg', city:'Nürnberg', lat:49.4540, lng:11.0810, tags:['Shisha','Modern','Gemütlich'], preis:'ab 13€', oeffnung:'tägl. ab 16 Uhr', web:'', maps:'https://maps.google.com/?q=Zara+Shisha+Nürnberg' },
    { name:'Coco Shisha Bar Nürnberg', addr:'Nürnberg', city:'Nürnberg', lat:49.4560, lng:11.0840, tags:['Shisha','Bar','Party'], preis:'ab 15€', oeffnung:'tägl. ab 17 Uhr', web:'', maps:'https://maps.google.com/?q=Coco+Shisha+Nürnberg' },
    { name:'Beirut Lounge Nürnberg', addr:'Nürnberg', city:'Nürnberg', lat:49.4530, lng:11.0770, tags:['Shisha','Libanesisch','Speisen'], preis:'ab 14€', oeffnung:'tägl. ab 16 Uhr', web:'', maps:'https://maps.google.com/?q=Beirut+Lounge+Nürnberg' },
    { name:'Babylon Shisha Lounge Erlangen', addr:'Erlangen', city:'Erlangen', lat:49.5950, lng:11.0060, tags:['Shisha','Lounge'], preis:'ab 12€', oeffnung:'tägl. ab 16 Uhr', web:'', maps:'https://maps.google.com/?q=Babylon+Shisha+Erlangen' },
    { name:'Aloha Shisha Bar Nürnberg', addr:'Nürnberg', city:'Nürnberg', lat:49.4590, lng:11.0880, tags:['Shisha','Tropical','Bar'], preis:'ab 13€', oeffnung:'tägl. ab 16 Uhr', web:'', maps:'https://maps.google.com/?q=Aloha+Shisha+Nürnberg' },
    { name:'Smoke & Chill Fürth', addr:'Fürth', city:'Fürth', lat:49.4780, lng:10.9900, tags:['Shisha','Chillen','Lounge'], preis:'ab 12€', oeffnung:'tägl. ab 16 Uhr', web:'', maps:'https://maps.google.com/?q=Smoke+Chill+Fürth' },
    { name:'Araby Shisha Nürnberg', addr:'Nürnberg', city:'Nürnberg', lat:49.4515, lng:11.0800, tags:['Shisha','Orient'], preis:'ab 13€', oeffnung:'tägl. ab 15 Uhr', web:'', maps:'https://maps.google.com/?q=Araby+Shisha+Nürnberg' },
    { name:'Hookah Heaven Nürnberg', addr:'Nürnberg', city:'Nürnberg', lat:49.4507, lng:11.0820, tags:['Shisha','Premium','Events'], preis:'ab 16€', oeffnung:'tägl. ab 17 Uhr', web:'', maps:'https://maps.google.com/?q=Hookah+Heaven+Nürnberg' },
    { name:'Neos Shisha Lounge Erlangen', addr:'Erlangen', city:'Erlangen', lat:49.5920, lng:11.0090, tags:['Shisha','Modern','Studenten'], preis:'ab 11€', oeffnung:'tägl. ab 16 Uhr', web:'', maps:'https://maps.google.com/?q=Neos+Shisha+Erlangen' },
  ],

  // ── COCKTAILBARS ─────────────────────────────────
  cocktailbars: [
    { name:'Bar Ente Nürnberg', addr:'Innere Laufer Gasse 10, 90403 Nürnberg', city:'Nürnberg', lat:49.4573, lng:11.0852, tags:['Cocktailbar','Klassiker','Nürnberg'], preis:'ab 10€', oeffnung:'Mo-Sa ab 18 Uhr', web:'', maps:'https://maps.google.com/?q=Bar+Ente+Nürnberg', highlight:'Nürnberger Institution' },
    { name:'Meisengeige Bar Nürnberg', addr:'Laufer Gasse 3, 90403 Nürnberg', city:'Nürnberg', lat:49.4581, lng:11.0801, tags:['Cocktailbar','Craft','Altstadt'], preis:'ab 9€', oeffnung:'tägl. ab 18 Uhr', web:'', maps:'https://maps.google.com/?q=Meisengeige+Bar+Nürnberg' },
    { name:'Rococo Bar Nürnberg', addr:'Josephsplatz 10, 90403 Nürnberg', city:'Nürnberg', lat:49.4530, lng:11.0773, tags:['Cocktailbar','Elegant','Rooftop'], preis:'ab 12€', oeffnung:'tägl. ab 19 Uhr', web:'', maps:'https://maps.google.com/?q=Rococo+Bar+Nürnberg' },
    { name:'Destillerie Nürnberg', addr:'Nürnberg Innenstadt', city:'Nürnberg', lat:49.4550, lng:11.0780, tags:['Cocktailbar','Whisky','Gin'], preis:'ab 10€', oeffnung:'tägl. ab 18 Uhr', web:'', maps:'https://maps.google.com/?q=Destillerie+Nürnberg' },
    { name:'Wonka Bar Nürnberg', addr:'Breite Gasse 67, 90402 Nürnberg', city:'Nürnberg', lat:49.4541, lng:11.0762, tags:['Cocktailbar','Creative','Hip'], preis:'ab 10€', oeffnung:'Mi-Sa ab 19 Uhr', web:'', maps:'https://maps.google.com/?q=Wonka+Bar+Nürnberg' },
    { name:'Kater Murr Nürnberg', addr:'Nürnberg Gostenhof', city:'Nürnberg', lat:49.4556, lng:11.0648, tags:['Bar','Szene','Gostenhof'], preis:'ab 8€', oeffnung:'tägl. ab 18 Uhr', web:'', maps:'https://maps.google.com/?q=Kater+Murr+Nürnberg' },
    { name:'Hintersinn Bar Nürnberg', addr:'Nürnberg', city:'Nürnberg', lat:49.4558, lng:11.0758, tags:['Cocktailbar','Hidden','Speakeasy'], preis:'ab 12€', oeffnung:'Do-Sa ab 20 Uhr', web:'', maps:'https://maps.google.com/?q=Hintersinn+Bar+Nürnberg' },
    { name:'Holy Craft Beer & Cocktails Nürnberg', addr:'Nürnberg', city:'Nürnberg', lat:49.4538, lng:11.0792, tags:['Cocktails','Craft Beer','Hip'], preis:'ab 9€', oeffnung:'Mo-Sa ab 17 Uhr', web:'', maps:'https://maps.google.com/?q=Holy+Craft+Bar+Nürnberg' },
    { name:'Pilum Bar Erlangen', addr:'Erlangen Innenstadt', city:'Erlangen', lat:49.5950, lng:11.0040, tags:['Cocktailbar','Erlangen','Studenten'], preis:'ab 9€', oeffnung:'tägl. ab 18 Uhr', web:'', maps:'https://maps.google.com/?q=Pilum+Bar+Erlangen' },
    { name:'Bar Celona Fürth', addr:'Gustavstr. 83, 90762 Fürth', city:'Fürth', lat:49.4765, lng:10.9906, tags:['Tapas','Cocktails','Flair'], preis:'ab 10€', oeffnung:'tägl. ab 17 Uhr', web:'barCelona.de', maps:'https://maps.google.com/?q=Bar+Celona+Fürth' },
    { name:'Qube Bar & Lounge Nürnberg', addr:'Nürnberg', city:'Nürnberg', lat:49.4522, lng:11.0800, tags:['Lounge','Cocktails','Modern'], preis:'ab 11€', oeffnung:'tägl. ab 18 Uhr', web:'', maps:'https://maps.google.com/?q=Qube+Bar+Nürnberg' },
    { name:'7even Bar Nürnberg', addr:'Nürnberg', city:'Nürnberg', lat:49.4515, lng:11.0760, tags:['Cocktailbar','Party','DJ'], preis:'ab 10€', oeffnung:'Fr/Sa ab 20 Uhr', web:'', maps:'https://maps.google.com/?q=7even+Bar+Nürnberg' },
    { name:'Spital Bar Nürnberg', addr:'Spitalgasse 13, 90403 Nürnberg', city:'Nürnberg', lat:49.4545, lng:11.0788, tags:['Weinbar','Cocktails','Altstadt'], preis:'ab 9€', oeffnung:'tägl. ab 17 Uhr', web:'', maps:'https://maps.google.com/?q=Spital+Bar+Nürnberg' },
    { name:'Two Moons Bar Nürnberg', addr:'Nürnberg', city:'Nürnberg', lat:49.4562, lng:11.0825, tags:['Cocktailbar','Modern'], preis:'ab 11€', oeffnung:'tägl. ab 18 Uhr', web:'', maps:'https://maps.google.com/?q=Two+Moons+Nürnberg' },
    { name:'Stübl Bar Nürnberg', addr:'Nürnberg Altstadt', city:'Nürnberg', lat:49.4553, lng:11.0770, tags:['Gemütlich','Wein','Cocktails'], preis:'ab 8€', oeffnung:'tägl. ab 17 Uhr', web:'', maps:'https://maps.google.com/?q=Stübl+Bar+Nürnberg' },
    { name:'La Cantine Bar Nürnberg', addr:'Nürnberg', city:'Nürnberg', lat:49.4540, lng:11.0812, tags:['Französisch','Weinbar','Cocktails'], preis:'ab 10€', oeffnung:'Di-Sa ab 18 Uhr', web:'', maps:'https://maps.google.com/?q=La+Cantine+Nürnberg' },
    { name:'Florentino Bar Nürnberg', addr:'Nürnberg Gostenhof', city:'Nürnberg', lat:49.4550, lng:11.0640, tags:['Italianate','Cocktails','Lounge'], preis:'ab 10€', oeffnung:'tägl. ab 18 Uhr', web:'', maps:'https://maps.google.com/?q=Florentino+Bar+Nürnberg' },
    { name:'Mondbar Erlangen', addr:'Erlangen', city:'Erlangen', lat:49.5930, lng:11.0070, tags:['Cocktailbar','Nacht','Atmo'], preis:'ab 9€', oeffnung:'tägl. ab 19 Uhr', web:'', maps:'https://maps.google.com/?q=Mondbar+Erlangen' },
    { name:'Brickyard Bar Nürnberg', addr:'Nürnberg', city:'Nürnberg', lat:49.4528, lng:11.0795, tags:['Craft','Bier','Cocktails'], preis:'ab 8€', oeffnung:'tägl. ab 17 Uhr', web:'', maps:'https://maps.google.com/?q=Brickyard+Bar+Nürnberg' },
    { name:'Vapor Bar Nürnberg', addr:'Nürnberg', city:'Nürnberg', lat:49.4535, lng:11.0742, tags:['Modern','Lounge','Cocktails'], preis:'ab 11€', oeffnung:'tägl. ab 18 Uhr', web:'', maps:'https://maps.google.com/?q=Vapor+Bar+Nürnberg' },
  ],

  // ── TIERPARKS & WILDGEHEGE ────────────────────────
  tierparks: [
    { name:'Tiergarten Nürnberg', addr:'Am Tiergarten 30, 90480 Nürnberg', city:'Nürnberg', lat:49.4412, lng:11.1336, tags:['Zoo','Delfine','Groß'], preis:'Erw 16€, Kind 5€', oeffnung:'tägl. 8-19:30 Uhr (Sommer)', web:'tiergarten.nuernberg.de', maps:'https://maps.google.com/?q=Tiergarten+Nürnberg', highlight:'Einziges Delfinarium mit Außenanlage in DE' },
    { name:'Wildpark Hundshaupten', addr:'91347 Aufsess', city:'Hersbruck', lat:49.6439, lng:11.3672, tags:['Wildpark','Fränkische Schweiz','Kostenlos'], preis:'Kostenlos!', oeffnung:'tägl.', web:'wildpark-hundshaupten.de', maps:'https://maps.google.com/?q=Wildpark+Hundshaupten', highlight:'Kostenloser Wildpark in der Fränkischen Schweiz' },
    { name:'Wildpark Pfälzerwald Iggelbach', addr:'67468 Iggelbach', city:'Cleebronn', lat:49.3862, lng:7.7734, tags:['Wildpark','Natur'], preis:'4€', oeffnung:'tägl.', web:'', maps:'https://maps.google.com/?q=Wildpark+Pfälzerwald' },
    { name:'Wildgehege Moritzberg Roth', addr:'91154 Roth', city:'Roth', lat:49.2458, lng:11.0879, tags:['Wildgehege','Rotwild','Kostenlos'], preis:'Kostenlos', oeffnung:'tägl.', web:'', maps:'https://maps.google.com/?q=Wildgehege+Moritzberg+Roth' },
    { name:'Zoo Augsburg', addr:'Spickel 15, 86161 Augsburg', city:'Augsburg', lat:48.3447, lng:10.8966, tags:['Zoo','Groß','Familie'], preis:'Erw 13€, Kind 6€', oeffnung:'tägl. 9-18 Uhr', web:'zoo-augsburg.de', maps:'https://maps.google.com/?q=Zoo+Augsburg' },
    { name:'Wildpark Willibaldsburg Eichstätt', addr:'Willibaldsburg 1, 85072 Eichstätt', city:'Ingolstadt', lat:48.8889, lng:11.1879, tags:['Wildpark','Burg','Geschichte'], preis:'4€', oeffnung:'tägl.', web:'', maps:'https://maps.google.com/?q=Wildpark+Willibaldsburg+Eichstätt' },
    { name:'Wildpark Ruhpolding', addr:'Ruhpolding', city:'München', lat:47.7592, lng:12.6469, tags:['Wildpark','Alpen','Wandern'], preis:'5€', oeffnung:'tägl.', web:'', maps:'https://maps.google.com/?q=Wildpark+Ruhpolding' },
    { name:'Wolfsberg-Tierpark Schrems', addr:'Waldstr. 5, 96170 Lisberg', city:'Bamberg', lat:49.8906, lng:10.7975, tags:['Tierpark','Wölfe','Familie'], preis:'5€', oeffnung:'Sa/So', web:'', maps:'https://maps.google.com/?q=Wolfsberg+Tierpark' },
    { name:'Tierpark Hellabrunn München', addr:'Tierparkstr. 30, 81543 München', city:'München', lat:48.0984, lng:11.5573, tags:['Zoo','Weltklasse','München'], preis:'Erw 22€, Kind 10€', oeffnung:'tägl. 9-18 Uhr', web:'hellabrunn.de', maps:'https://maps.google.com/?q=Tierpark+Hellabrunn', highlight:'Weltbekannter Geo-Zoo München' },
    { name:'Wildpark Schloss Tambach', addr:'96479 Tambach', city:'Coburg', lat:50.2154, lng:11.0093, tags:['Wildpark','Schloss','Familie'], preis:'6€', oeffnung:'tägl.', web:'', maps:'https://maps.google.com/?q=Wildpark+Tambach' },
    { name:'Nürnberger Tiergarten – Mopsfarm Zirndorf', addr:'Zirndorf', city:'Zirndorf', lat:49.4450, lng:10.9555, tags:['Kleinzoo','Lehrpfad'], preis:'kostenlos', oeffnung:'tägl.', web:'', maps:'https://maps.google.com/?q=Mopsfarm+Zirndorf' },
    { name:'Vogelpark Steinen-Endenburg', addr:'79585 Steinen', city:'Rust', lat:47.6485, lng:7.7447, tags:['Vogelpark','Exotisch'], preis:'8€', oeffnung:'tägl. Sommer', web:'', maps:'https://maps.google.com/?q=Vogelpark+Steinen' },
    { name:'Wildtiergehege Moritzberg', addr:'Moritzberg, 91154 Roth', city:'Roth', lat:49.2361, lng:11.1056, tags:['Wildgehege','Kostenlos','Natur'], preis:'Kostenlos', oeffnung:'tägl.', web:'', maps:'https://maps.google.com/?q=Wildtiergehege+Moritzberg' },
    { name:'Wildgehege Waldnaab Weiden', addr:'Weiden', city:'Weiden', lat:49.6800, lng:12.1600, tags:['Wildgehege','Kostenlos'], preis:'Kostenlos', oeffnung:'tägl.', web:'', maps:'https://maps.google.com/?q=Wildgehege+Waldnaab+Weiden' },
    { name:'Walderlebniszentrum Reuth', addr:'Reuth b. Erbendorf', city:'Weiden', lat:49.8342, lng:12.0764, tags:['Wildgehege','Natur','Lehrpfad'], preis:'Kostenlos', oeffnung:'tägl.', web:'', maps:'https://maps.google.com/?q=Walderlebniszentrum+Reuth' },
    { name:'Wildpark Knüll Neukirchen', addr:'Neukirchen', city:'Lohr', lat:51.0023, lng:9.4814, tags:['Wildpark','Hessen'], preis:'4€', oeffnung:'tägl.', web:'', maps:'https://maps.google.com/?q=Wildpark+Knüll' },
    { name:'Reptilienzoo Nürnberg', addr:'Nürnberg', city:'Nürnberg', lat:49.4500, lng:11.0800, tags:['Reptilien','Indoor','Exotisch'], preis:'8€', oeffnung:'tägl.', web:'', maps:'https://maps.google.com/?q=Reptilienzoo+Nürnberg' },
    { name:'Tierpark Forcheim', addr:'Forchheim', city:'Forchheim', lat:49.7155, lng:11.0654, tags:['Tierpark','Kostenlos','Familie'], preis:'Kostenlos', oeffnung:'tägl.', web:'', maps:'https://maps.google.com/?q=Tierpark+Forchheim' },
    { name:'Wildgehege Woffenbach', addr:'Woffenbach bei Neumarkt', city:'Neumarkt', lat:49.2694, lng:11.4842, tags:['Wildgehege','Rotwild'], preis:'Kostenlos', oeffnung:'tägl.', web:'', maps:'https://maps.google.com/?q=Wildgehege+Woffenbach' },
    { name:'Falknerei Burg Abenberg', addr:'Burgstr. 16, 91183 Abenberg', city:'Roth', lat:49.2365, lng:10.9542, tags:['Falknerei','Burg','Show'], preis:'7€', oeffnung:'Saisonbetrieb', web:'', maps:'https://maps.google.com/?q=Falknerei+Burg+Abenberg' },
    { name:'Delphinarium / Seelöwen Nürnberger Tiergarten', addr:'Am Tiergarten 30, 90480 Nürnberg', city:'Nürnberg', lat:49.4412, lng:11.1337, tags:['Delfine','Show','Tiergarten'], preis:'im Tiergarten-Ticket', oeffnung:'Shows tägl.', web:'tiergarten.nuernberg.de', maps:'https://maps.google.com/?q=Delphinarium+Nürnberg', highlight:'Einziger Delfinshow-Außenbereich DE' },
    { name:'Aquazoo Löbbecke Museum Düsseldorf', addr:'Kaiserswerther Str. 380, 40474 Düsseldorf', city:'Leipzig', lat:51.2493, lng:6.7725, tags:['Aquazoo','Fische','Insekten'], preis:'Erw 11€', oeffnung:'tägl. 10-18 Uhr', web:'aquazoo-duesseldorf.de', maps:'https://maps.google.com/?q=Aquazoo+Düsseldorf' },
  ],

  // ── AKTIVITÄTEN & INDOOR ──────────────────────────
  aktivitaeten: [
    { name:'LASERTAG World Nürnberg', addr:'Nürnberg', city:'Nürnberg', lat:49.4530, lng:11.0800, tags:['Lasertag','Action','Indoor'], preis:'ab 12€/Runde', oeffnung:'tägl. ab 14 Uhr', web:'', maps:'https://maps.google.com/?q=Lasertag+Nürnberg' },
    { name:'Trampolinpark Bounce Nürnberg', addr:'Nürnberg', city:'Nürnberg', lat:49.4480, lng:11.0900, tags:['Trampolin','Sport','Kinder'], preis:'ab 12€/Std', oeffnung:'tägl. ab 10 Uhr', web:'', maps:'https://maps.google.com/?q=Bounce+Trampolin+Nürnberg' },
    { name:'Kletterwerk Nürnberg', addr:'Nürnberg', city:'Nürnberg', lat:49.4503, lng:11.0968, tags:['Klettern','Bouldern','Sport'], preis:'ab 12€', oeffnung:'Mo-So', web:'kletterwerk.de', maps:'https://maps.google.com/?q=Kletterwerk+Nürnberg', highlight:'Größte Kletterhalle Frankens' },
    { name:'Boulderklub Erlangen', addr:'Erlangen', city:'Erlangen', lat:49.5880, lng:11.0120, tags:['Bouldern','Klettern'], preis:'ab 12€', oeffnung:'tägl.', web:'', maps:'https://maps.google.com/?q=Boulderklub+Erlangen' },
    { name:'Skywalker Indoor Skydiving Nürnberg', addr:'Nürnberg', city:'Nürnberg', lat:49.4490, lng:11.0880, tags:['Windkanal','Fallschirm','Thrill'], preis:'ab 40€', oeffnung:'WE + Events', web:'', maps:'https://maps.google.com/?q=Indoor+Skydiving+Nürnberg' },
    { name:'Bowlingcenter Nürnberg', addr:'Münchener Str. 21, 90478 Nürnberg', city:'Nürnberg', lat:49.4350, lng:11.0869, tags:['Bowling','Spaß','Gruppen'], preis:'ab 5€/Pax/Spiel', oeffnung:'tägl.', web:'', maps:'https://maps.google.com/?q=Bowlingcenter+Nürnberg' },
    { name:'Minigolf Dutzenteich Nürnberg', addr:'Nürnberg', city:'Nürnberg', lat:49.4252, lng:11.1124, tags:['Minigolf','Outdoor','Spaß'], preis:'3-5€', oeffnung:'Sommer tägl.', web:'', maps:'https://maps.google.com/?q=Minigolf+Dutzenteich+Nürnberg' },
    { name:'Virtual Room Nürnberg (VR)', addr:'Nürnberg Innenstadt', city:'Nürnberg', lat:49.4549, lng:11.0769, tags:['VR','Virtual Reality','Gruppen'], preis:'ab 29€/Person', oeffnung:'tägl.', web:'', maps:'https://maps.google.com/?q=Virtual+Room+Nürnberg' },
    { name:'Kletterhalle Rock Factory Erlangen', addr:'Erlangen', city:'Erlangen', lat:49.5897, lng:11.0100, tags:['Klettern','Bouldern','Sport'], preis:'ab 11€', oeffnung:'tägl.', web:'', maps:'https://maps.google.com/?q=Rock+Factory+Erlangen' },
    { name:'Trampolinpark Jump House Fürth', addr:'Fürth', city:'Fürth', lat:49.4780, lng:10.9880, tags:['Trampolin','Sport','Kinder'], preis:'ab 12€/Std', oeffnung:'tägl. ab 10 Uhr', web:'jumphouse.de', maps:'https://maps.google.com/?q=Jump+House+Fürth' },
    { name:'Axtwurf BERSERKER Nürnberg', addr:'Nürnberg', city:'Nürnberg', lat:49.4555, lng:11.0812, tags:['Axtwurf','Teambuilding','Action'], preis:'ab 20€/Std', oeffnung:'tägl. ab 14 Uhr', web:'', maps:'https://maps.google.com/?q=Axtwurf+Nürnberg' },
    { name:'Paintball Nürnberg', addr:'Nürnberg Region', city:'Nürnberg', lat:49.4600, lng:11.0900, tags:['Paintball','Outdoor','Gruppen'], preis:'ab 25€', oeffnung:'WE + Events', web:'', maps:'https://maps.google.com/?q=Paintball+Nürnberg' },
    { name:'Gokart Nürnberg', addr:'Nürnberg', city:'Nürnberg', lat:49.4340, lng:11.0980, tags:['Gokart','Speed','Gruppen'], preis:'ab 18€/10 Min', oeffnung:'tägl.', web:'', maps:'https://maps.google.com/?q=Gokart+Nürnberg' },
    { name:'Aquarium Nürnberg (Zoo)', addr:'Am Tiergarten 30, 90480 Nürnberg', city:'Nürnberg', lat:49.4412, lng:11.1336, tags:['Aquarium','Fische','Indoor'], preis:'im Tiergarten-Ticket', oeffnung:'tägl.', web:'', maps:'https://maps.google.com/?q=Tiergarten+Nürnberg' },
    { name:'Schwarzlicht Minigolf Nürnberg', addr:'Nürnberg', city:'Nürnberg', lat:49.4531, lng:11.0760, tags:['Minigolf','Indoor','Schwarzlicht'], preis:'ab 9€', oeffnung:'tägl. ab 14 Uhr', web:'', maps:'https://maps.google.com/?q=Schwarzlicht+Minigolf+Nürnberg' },
    { name:'Klettergarten Möhrendorf', addr:'Möhrendorf bei Erlangen', city:'Erlangen', lat:49.6038, lng:11.0487, tags:['Kletterwald','Outdoor','Abenteuer'], preis:'ab 15€', oeffnung:'Apr-Okt', web:'', maps:'https://maps.google.com/?q=Klettergarten+Möhrendorf' },
    { name:'Flipper Museum Selb', addr:'Selb', city:'Hof', lat:50.1690, lng:12.1282, tags:['Flipper','Museum','Nostalgie'], preis:'8€', oeffnung:'WE', web:'', maps:'https://maps.google.com/?q=Flipper+Museum+Selb' },
    { name:'Hochseilgarten Roth', addr:'Roth', city:'Roth', lat:49.2458, lng:11.0879, tags:['Hochseilgarten','Klettern','Outdoor'], preis:'ab 15€', oeffnung:'Sommer', web:'', maps:'https://maps.google.com/?q=Hochseilgarten+Roth' },
    { name:'Stadtpark Minigolf Fürth', addr:'Fürth Stadtpark', city:'Fürth', lat:49.4840, lng:10.9814, tags:['Minigolf','Outdoor','Günstig'], preis:'3€', oeffnung:'Sommer tägl.', web:'', maps:'https://maps.google.com/?q=Minigolf+Stadtpark+Fürth' },
    { name:'Bungee Jump Nürnberg', addr:'Nürnberg Region', city:'Nürnberg', lat:49.4500, lng:11.0750, tags:['Bungee','Thrill','Adrenalin'], preis:'ab 60€', oeffnung:'Events', web:'', maps:'https://maps.google.com/?q=Bungee+Nürnberg' },
    { name:'Darts Bar Nürnberg', addr:'Nürnberg Innenstadt', city:'Nürnberg', lat:49.4545, lng:11.0793, tags:['Darts','Bar','Spaß'], preis:'ab 5€/Std', oeffnung:'tägl. ab 17 Uhr', web:'', maps:'https://maps.google.com/?q=Darts+Bar+Nürnberg' },
    { name:'Bootcamp / Outdoor Fitness Nürnberg', addr:'Nürnberg Wöhrder See', city:'Nürnberg', lat:49.4617, lng:11.0990, tags:['Sport','Outdoor','Fitness'], preis:'ab 10€', oeffnung:'Sommer', web:'', maps:'https://maps.google.com/?q=Bootcamp+Wöhrder+See+Nürnberg' },
    { name:'Kegelzentrum Nürnberg', addr:'Nürnberg', city:'Nürnberg', lat:49.4389, lng:11.0600, tags:['Kegeln','Gruppen','Spaß'], preis:'ab 4€/Spiel', oeffnung:'tägl.', web:'', maps:'https://maps.google.com/?q=Kegelzentrum+Nürnberg' },
    { name:'Soccerhalle Nürnberg', addr:'Nürnberg', city:'Nürnberg', lat:49.4410, lng:11.0920, tags:['Fußball','Indoor','Sport'], preis:'ab 20€/Std', oeffnung:'tägl.', web:'', maps:'https://maps.google.com/?q=Soccerhalle+Nürnberg' },
    { name:'Tischfußball Arena Erlangen', addr:'Erlangen', city:'Erlangen', lat:49.5920, lng:11.0050, tags:['Tischkicker','Bar','Spaß'], preis:'ab 4€', oeffnung:'tägl. ab 17 Uhr', web:'', maps:'https://maps.google.com/?q=Tischfußball+Erlangen' },
    { name:'Kartbahn Am Karo Nürnberg', addr:'Nürnberg', city:'Nürnberg', lat:49.4480, lng:11.0840, tags:['Gokart','Indoor','Speed'], preis:'ab 15€', oeffnung:'tägl.', web:'', maps:'https://maps.google.com/?q=Kartbahn+Nürnberg' },
    { name:'Abenteuerpark Fränkische Schweiz', addr:'Streitberg', city:'Hersbruck', lat:49.8056, lng:11.2218, tags:['Kletterwald','Outdoor','Natur'], preis:'ab 15€', oeffnung:'Apr-Okt', web:'', maps:'https://maps.google.com/?q=Abenteuerpark+Streitberg' },
    { name:'Nürnberger Stadtbibliothek VR Lab', addr:'Gewerbemuseumsplatz 4, 90403 Nürnberg', city:'Nürnberg', lat:49.4543, lng:11.0784, tags:['VR','Kostenlos','Digital'], preis:'Kostenlos', oeffnung:'Mo-Sa', web:'stadtbibliothek.nuernberg.de', maps:'https://maps.google.com/?q=Stadtbibliothek+Nürnberg' },
    { name:'Rollschuhbahn Nürnberg', addr:'Nürnberg', city:'Nürnberg', lat:49.4555, lng:11.0730, tags:['Rollschuh','Spaß','Retro'], preis:'ab 8€', oeffnung:'Saisonal', web:'', maps:'https://maps.google.com/?q=Rollschuhbahn+Nürnberg' },
  ],

  // ── ESCAPE ROOMS ──────────────────────────────────
  escaperooms: [
    { name:'Escape Rooms Nürnberg – Exit the Room', addr:'Nürnberg Innenstadt', city:'Nürnberg', lat:49.4549, lng:11.0769, tags:['Escape Room','Gruppen','Teambuilding'], preis:'ab 25€/Person', oeffnung:'tägl. ab 10 Uhr', web:'exit-the-room.de', maps:'https://maps.google.com/?q=Exit+the+Room+Nürnberg', highlight:'Mehrere Szenarien, Buchung online' },
    { name:'The Big Escape Nürnberg', addr:'Nürnberg', city:'Nürnberg', lat:49.4530, lng:11.0800, tags:['Escape Room','Live','Gruppen'], preis:'ab 23€/Person', oeffnung:'tägl.', web:'the-big-escape.de', maps:'https://maps.google.com/?q=The+Big+Escape+Nürnberg' },
    { name:'Mr. Lock Escape Room Nürnberg', addr:'Nürnberg', city:'Nürnberg', lat:49.4558, lng:11.0781, tags:['Escape Room','Kriminal','Thrill'], preis:'ab 22€/Person', oeffnung:'tägl.', web:'mrlock.de', maps:'https://maps.google.com/?q=Mr+Lock+Nürnberg' },
    { name:'Exitroom Erlangen', addr:'Erlangen', city:'Erlangen', lat:49.5950, lng:11.0040, tags:['Escape Room','Erlangen'], preis:'ab 22€', oeffnung:'tägl.', web:'', maps:'https://maps.google.com/?q=Exitroom+Erlangen' },
    { name:'Krimi Dinner Nürnberg', addr:'Nürnberg', city:'Nürnberg', lat:49.4520, lng:11.0760, tags:['Krimi Dinner','Murder Mystery','Show'], preis:'ab 55€/Person', oeffnung:'Events', web:'krimidinner.de', maps:'https://maps.google.com/?q=Krimi+Dinner+Nürnberg', highlight:'Mörderisches Abendessen mit Show' },
    { name:'Clue Lab Nürnberg', addr:'Nürnberg', city:'Nürnberg', lat:49.4545, lng:11.0790, tags:['Escape Room','Modern','Hightech'], preis:'ab 25€', oeffnung:'tägl.', web:'', maps:'https://maps.google.com/?q=Clue+Lab+Nürnberg' },
    { name:'RoomX Escape Nürnberg', addr:'Nürnberg', city:'Nürnberg', lat:49.4565, lng:11.0815, tags:['Escape Room','Abenteuer'], preis:'ab 22€', oeffnung:'tägl.', web:'', maps:'https://maps.google.com/?q=RoomX+Nürnberg' },
    { name:'Escape Planet Fürth', addr:'Fürth', city:'Fürth', lat:49.4780, lng:10.9900, tags:['Escape Room','Fürth'], preis:'ab 20€', oeffnung:'tägl.', web:'', maps:'https://maps.google.com/?q=Escape+Planet+Fürth' },
    { name:'Detective Rooms Nürnberg', addr:'Nürnberg', city:'Nürnberg', lat:49.4538, lng:11.0805, tags:['Detektiv','Kriminalfall','Gruppen'], preis:'ab 24€', oeffnung:'tägl.', web:'', maps:'https://maps.google.com/?q=Detective+Rooms+Nürnberg' },
    { name:'Captivate Escape Room Erlangen', addr:'Erlangen', city:'Erlangen', lat:49.5960, lng:11.0055, tags:['Escape Room','Hightech','VR'], preis:'ab 25€', oeffnung:'tägl.', web:'', maps:'https://maps.google.com/?q=Captivate+Escape+Erlangen' },
    { name:'Mystery Rooms München', addr:'München', city:'München', lat:48.1351, lng:11.5820, tags:['Escape Room','München','Premium'], preis:'ab 30€', oeffnung:'tägl.', web:'mystery-rooms.de', maps:'https://maps.google.com/?q=Mystery+Rooms+München' },
    { name:'A-MAZE Augsburg', addr:'Augsburg', city:'Augsburg', lat:48.3705, lng:10.8978, tags:['Escape Room','Augsburg'], preis:'ab 22€', oeffnung:'tägl.', web:'', maps:'https://maps.google.com/?q=AMAZE+Augsburg' },
    { name:'Whodunnit Escape Nürnberg', addr:'Nürnberg', city:'Nürnberg', lat:49.4511, lng:11.0773, tags:['Escape Room','Murder Mystery'], preis:'ab 23€', oeffnung:'tägl.', web:'', maps:'https://maps.google.com/?q=Whodunnit+Nürnberg' },
    { name:'Lock Academy Regensburg', addr:'Regensburg', city:'Regensburg', lat:49.0134, lng:12.1016, tags:['Escape Room','Regensburg'], preis:'ab 22€', oeffnung:'tägl.', web:'', maps:'https://maps.google.com/?q=Lock+Academy+Regensburg' },
    { name:'Entrap Escape Room Nürnberg', addr:'Nürnberg', city:'Nürnberg', lat:49.4522, lng:11.0758, tags:['Escape Room','Familien','Gruppen'], preis:'ab 20€', oeffnung:'tägl.', web:'', maps:'https://maps.google.com/?q=Entrap+Escape+Nürnberg' },
  ],

  // ── KULTURORTE ────────────────────────────────────
  kultur: [
    { name:'Germanisches Nationalmuseum', addr:'Kartäusergasse 1, 90402 Nürnberg', city:'Nürnberg', lat:49.4479, lng:11.0792, tags:['Museum','Geschichte','Kunst'], preis:'Erw 8€, Kind kostenlos bis 17', oeffnung:'Di-So 10-18 Uhr (Mi bis 21)', web:'gnm.de', maps:'https://maps.google.com/?q=Germanisches+Nationalmuseum+Nürnberg', highlight:'Größtes deutsches Nationalmuseum' },
    { name:'Kaiserburg Nürnberg', addr:'Auf der Burg 13, 90403 Nürnberg', city:'Nürnberg', lat:49.4591, lng:11.0736, tags:['Burg','Geschichte','Aussicht'], preis:'Erw 7€', oeffnung:'tägl. 9-18 Uhr', web:'kaiserburg-nuernberg.de', maps:'https://maps.google.com/?q=Kaiserburg+Nürnberg', highlight:'Kaiserpfalz mit Panorama über Nürnberg' },
    { name:'Staatstheater Nürnberg', addr:'Richard-Wagner-Platz 2-10, 90443 Nürnberg', city:'Nürnberg', lat:49.4448, lng:11.0721, tags:['Theater','Oper','Ballett'], preis:'ab 10€', oeffnung:'Spielbetrieb Sept-Jul', web:'staatstheater-nuernberg.de', maps:'https://maps.google.com/?q=Staatstheater+Nürnberg', highlight:'Eines der größten Theaterhäuser Deutschlands' },
    { name:'Meistersingerhalle Nürnberg', addr:'Münchener Str. 21, 90478 Nürnberg', city:'Nürnberg', lat:49.4350, lng:11.0869, tags:['Konzerthaus','Klassik','Philharmonie'], preis:'ab 15€', oeffnung:'Konzertbetrieb', web:'nuernberger-symphoniker.de', maps:'https://maps.google.com/?q=Meistersingerhalle+Nürnberg' },
    { name:'Dokumentationszentrum Reichsparteitagsgelände', addr:'Bayernstr. 110, 90478 Nürnberg', city:'Nürnberg', lat:49.4256, lng:11.1227, tags:['Geschichte','NS-Zeit','Ausstellung'], preis:'Erw 6€', oeffnung:'Mo-Fr 9-18, Sa-So 10-18 Uhr', web:'museen.nuernberg.de', maps:'https://maps.google.com/?q=Dokumentationszentrum+Nürnberg', highlight:'NS-Dokumentation am Reichsparteitagsgelände' },
    { name:'Albrecht-Dürer-Haus Nürnberg', addr:'Albrecht-Dürer-Str. 39, 90403 Nürnberg', city:'Nürnberg', lat:49.4591, lng:11.0741, tags:['Museum','Dürer','Kunst'], preis:'Erw 6€', oeffnung:'Di-So 10-17 Uhr', web:'museen.nuernberg.de', maps:'https://maps.google.com/?q=Dürer+Haus+Nürnberg' },
    { name:'Kunsthalle Nürnberg', addr:'Lorenzer Str. 32, 90402 Nürnberg', city:'Nürnberg', lat:49.4527, lng:11.0783, tags:['Gegenwartskunst','Ausstellung'], preis:'variabel', oeffnung:'Di-So 10-18 Uhr', web:'kunsthalle.nuernberg.de', maps:'https://maps.google.com/?q=Kunsthalle+Nürnberg' },
    { name:'Spielzeugmuseum Nürnberg', addr:'Karlstr. 13-15, 90403 Nürnberg', city:'Nürnberg', lat:49.4537, lng:11.0814, tags:['Museum','Spielzeug','Familie'], preis:'Erw 6€, Kind 1.50€', oeffnung:'Di-Fr 10-17, Sa-So 10-18 Uhr', web:'museen.nuernberg.de', maps:'https://maps.google.com/?q=Spielzeugmuseum+Nürnberg' },
    { name:'Memorium Nürnberger Prozesse', addr:'Bärenschanzstr. 72, 90429 Nürnberg', city:'Nürnberg', lat:49.4619, lng:11.0511, tags:['Geschichte','Recht','Weltgeschichte'], preis:'Erw 6€', oeffnung:'Mo-Fr 9-18, Sa-So 10-18 Uhr', web:'memorium-nuernberger-prozesse.de', maps:'https://maps.google.com/?q=Memorium+Nürnberger+Prozesse', highlight:'Echter Gerichtssaal der Nürnberger Prozesse' },
    { name:'Cinecittà Filmpalast Nürnberg', addr:'Gewerbemuseumsplatz 3, 90403 Nürnberg', city:'Nürnberg', lat:49.4543, lng:11.0782, tags:['Kino','IMAX','Blockbuster'], preis:'ab 12€', oeffnung:'tägl.', web:'cinecitta.de', maps:'https://maps.google.com/?q=Cinecitta+Nürnberg', highlight:'Größtes Kino Franken inkl. IMAX' },
    { name:'Markgrafentheater Erlangen', addr:'Theaterplatz 2, 91054 Erlangen', city:'Erlangen', lat:49.5953, lng:11.0025, tags:['Theater','Erlangen','Schauspiel'], preis:'ab 15€', oeffnung:'Spielbetrieb', web:'theater-erlangen.de', maps:'https://maps.google.com/?q=Markgrafentheater+Erlangen' },
    { name:'Neue Tonne Roth (Kulturzentrum)', addr:'Roth', city:'Roth', lat:49.2458, lng:11.0879, tags:['Konzerte','Kultur','Kleinkunst'], preis:'ab 10€', oeffnung:'Events', web:'neue-tonne.de', maps:'https://maps.google.com/?q=Neue+Tonne+Roth' },
    { name:'Schloss Ansbach', addr:'Promenade 27, 91522 Ansbach', city:'Ansbach', lat:49.2985, lng:10.5713, tags:['Schloss','Rokoko','Geschichte'], preis:'Erw 4.50€', oeffnung:'Di-So 9-18 Uhr', web:'schloesser.bayern.de', maps:'https://maps.google.com/?q=Schloss+Ansbach' },
    { name:'Rosenau Coburg (Schloss)', addr:'Rödental bei Coburg', city:'Coburg', lat:50.2729, lng:10.9900, tags:['Schloss','Königin Victoria','Geschichte'], preis:'Erw 5€', oeffnung:'Di-So', web:'schloesser.bayern.de', maps:'https://maps.google.com/?q=Schloss+Rosenau+Coburg' },
    { name:'Museum Industriekultur Nürnberg', addr:'Äußere Sulzbacher Str. 62, 90491 Nürnberg', city:'Nürnberg', lat:49.4659, lng:11.1165, tags:['Museum','Industrie','Geschichte'], preis:'Erw 5€', oeffnung:'Di-Fr 9-17, Sa-So 10-18 Uhr', web:'museen.nuernberg.de', maps:'https://maps.google.com/?q=Museum+Industriekultur+Nürnberg' },
    { name:'Planetarium Nürnberg (Nicolaus-Copernicus)', addr:'Nürnberg', city:'Nürnberg', lat:49.4546, lng:11.0780, tags:['Planetarium','Astronomie','Show'], preis:'Erw 7€', oeffnung:'Di-So', web:'planetarium-nuernberg.de', maps:'https://maps.google.com/?q=Planetarium+Nürnberg' },
    { name:'Altes Rathaus Nürnberg + Lochgefängnisse', addr:'Rathausplatz 2, 90403 Nürnberg', city:'Nürnberg', lat:49.4561, lng:11.0784, tags:['Geschichte','Mittelalter','Führung'], preis:'5€', oeffnung:'Di-Fr 10-16:30, Sa-So 10-17 Uhr', web:'museen.nuernberg.de', maps:'https://maps.google.com/?q=Lochgefängnisse+Nürnberg', highlight:'Mittelalterliches Gefängnis unter dem Rathaus' },
    { name:'Erfahrungsfeld zur Entfaltung der Sinne', addr:'Nürnberg', city:'Nürnberg', lat:49.4262, lng:11.1226, tags:['Interaktiv','Sinne','Familie'], preis:'Erw 5€', oeffnung:'Mo-So 10-18 Uhr', web:'', maps:'https://maps.google.com/?q=Erfahrungsfeld+Entfaltung+Sinne+Nürnberg' },
    { name:'Historische Kunstbunker Nürnberg', addr:'Obere Schmiedgasse 52, 90403 Nürnberg', city:'Nürnberg', lat:49.4557, lng:11.0765, tags:['Geschichte','Bunker','Führung'], preis:'Erw 7.50€', oeffnung:'Führungen tägl.', web:'historische-kunstbunker.de', maps:'https://maps.google.com/?q=Historische+Kunstbunker+Nürnberg', highlight:'Gerettete Kunstschätze im WWII-Bunker' },
    { name:'Schönster Weihnachtsmarkt Christkindlesmarkt', addr:'Hauptmarkt, 90402 Nürnberg', city:'Nürnberg', lat:49.4543, lng:11.0770, tags:['Weihnachtsmarkt','Advent','Tradition'], preis:'Kostenlos', oeffnung:'Dez', web:'christkindlesmarkt.de', maps:'https://maps.google.com/?q=Christkindlesmarkt+Nürnberg', highlight:'Weltberühmter Weihnachtsmarkt seit 1628' },
    { name:'Kulturforum Fürth', addr:'Königstr. 93, 90762 Fürth', city:'Fürth', lat:49.4765, lng:10.9894, tags:['Theater','Konzerte','Kultur'], preis:'ab 10€', oeffnung:'Events', web:'kulturforum-fuerth.de', maps:'https://maps.google.com/?q=Kulturforum+Fürth' },
    { name:'Cadolzburg (Burg)', addr:'Burg 19, 90556 Cadolzburg', city:'Zirndorf', lat:49.4996, lng:10.8611, tags:['Burg','Geschichte','Ausflug'], preis:'Erw 5€', oeffnung:'Di-So', web:'cadolzburg.de', maps:'https://maps.google.com/?q=Burg+Cadolzburg' },
    { name:'Planetarium Fürth', addr:'Fürth', city:'Fürth', lat:49.4780, lng:10.9880, tags:['Planetarium','Schüler','Show'], preis:'ab 5€', oeffnung:'Events', web:'planetarium-fuerth.de', maps:'https://maps.google.com/?q=Planetarium+Fürth' },
    { name:'Deutsches Museum München', addr:'Museumsinsel 1, 80538 München', city:'München', lat:48.1299, lng:11.5833, tags:['Museum','Technik','Weltklasse'], preis:'Erw 15€', oeffnung:'tägl. 9-17 Uhr', web:'deutsches-museum.de', maps:'https://maps.google.com/?q=Deutsches+Museum+München', highlight:'Größtes Technikmuseum der Welt' },
    { name:'Bamberger Symphoniker', addr:'Bamberg', city:'Bamberg', lat:49.8988, lng:10.9028, tags:['Klassik','Orchester','Konzert'], preis:'ab 15€', oeffnung:'Spielbetrieb', web:'bamberger-symphoniker.de', maps:'https://maps.google.com/?q=Bamberger+Symphoniker' },
    { name:'Frankenhalle Nürnberg (NCC)', addr:'Messezentrum, 90471 Nürnberg', city:'Nürnberg', lat:49.4128, lng:11.1254, tags:['Messe','Kongress','Events'], preis:'variabel', oeffnung:'Events', web:'ncc.de', maps:'https://maps.google.com/?q=NCC+Nürnberg' },
    { name:'Rock im Park (Zeppelinfeld)', addr:'Nürnberg Zeppelinfeld', city:'Nürnberg', lat:49.4261, lng:11.1228, tags:['Festival','Konzert','Rock'], preis:'Festival-Ticket', oeffnung:'Jun 2026', web:'rock-im-park.de', maps:'https://maps.google.com/?q=Rock+im+Park+Nürnberg', highlight:'Deutschlands größtes Rockfestival' },
    { name:'Arena Nürnberger Versicherung', addr:'Rennweg 60, 90489 Nürnberg', city:'Nürnberg', lat:49.4497, lng:11.1159, tags:['Arena','Konzerte','Sport'], preis:'variabel', oeffnung:'Events', web:'arena-nuernberg.de', maps:'https://maps.google.com/?q=Arena+Nürnberg' },
    { name:'Schloss Weißenstein Pommersfelden', addr:'91224 Pommersfelden', city:'Forchheim', lat:49.7647, lng:10.8273, tags:['Schloss','Barock','Kunst'], preis:'Erw 8€', oeffnung:'Führungen', web:'schlossweixxenstein.de', maps:'https://maps.google.com/?q=Schloss+Weißenstein+Pommersfelden' },
  ],

  // ── BADESEEN ──────────────────────────────────────
  badeseen: [
    { name:'Wöhrder See Nürnberg', addr:'Nürnberg Nordost', city:'Nürnberg', lat:49.4617, lng:11.0990, tags:['See','Nürnberg','Urban','Kostenlos'], preis:'Kostenlos', oeffnung:'Sommer tägl.', web:'', maps:'https://maps.google.com/?q=Wöhrder+See+Nürnberg', highlight:'Direkt in Nürnberg, mit Strandbad' },
    { name:'Dechsendorfer Weiher Erlangen', addr:'Erlangen-Dechsendorf', city:'Erlangen', lat:49.6017, lng:10.9594, tags:['Badesee','Erlangen','Familie'], preis:'Kostenlos', oeffnung:'Sommer', web:'', maps:'https://maps.google.com/?q=Dechsendorfer+Weiher+Erlangen', highlight:'Beliebter Familiensee bei Erlangen' },
    { name:'Kleiner Brombachsee', addr:'Absberg, 91720', city:'Gunzenhausen', lat:49.1083, lng:10.8467, tags:['Badesee','Altmühlsee','Franken'], preis:'3€ Parkplatz', oeffnung:'Sommer', web:'brombachsee.de', maps:'https://maps.google.com/?q=Kleiner+Brombachsee' },
    { name:'Großer Brombachsee', addr:'Ramsberg, 91728 Georgensgmünd', city:'Gunzenhausen', lat:49.1122, lng:10.9033, tags:['Badesee','Surfen','Segeln'], preis:'3€ Parkplatz', oeffnung:'Sommer', web:'brombachsee.de', maps:'https://maps.google.com/?q=Großer+Brombachsee', highlight:'Wassersport + Strandbäder' },
    { name:'Altmühlsee Gunzenhausen', addr:'Gunzenhausen', city:'Gunzenhausen', lat:49.1347, lng:10.7119, tags:['Badesee','Vogelparadies','Franken'], preis:'3€', oeffnung:'Sommer', web:'altmuehlsee.de', maps:'https://maps.google.com/?q=Altmühlsee+Gunzenhausen' },
    { name:'Rothsee (Mittelfranken)', addr:'Leerstetten, 90522 Oberasbach', city:'Roth', lat:49.3286, lng:10.9614, tags:['Badesee','Roth','Segeln'], preis:'Kostenlos', oeffnung:'Sommer', web:'', maps:'https://maps.google.com/?q=Rothsee' },
    { name:'Happurger Stausee', addr:'Happurg, 91230 Lauf', city:'Hersbruck', lat:49.5178, lng:11.4558, tags:['Badesee','Stausee','Fränkische Schweiz'], preis:'Kostenlos', oeffnung:'Sommer', web:'', maps:'https://maps.google.com/?q=Happurger+Stausee' },
    { name:'Berglessee Hüttenbach', addr:'Hüttenbach, Schnaittach', city:'Hersbruck', lat:49.5731, lng:11.3344, tags:['Naturbad','Idyllisch'], preis:'Kostenlos', oeffnung:'Sommer', web:'', maps:'https://maps.google.com/?q=Berglessee+Hüttenbach' },
    { name:'Haidweiher Nürnberg', addr:'Nürnberg-Haidt', city:'Nürnberg', lat:49.3890, lng:11.0200, tags:['Badesee','Nürnberg Süd'], preis:'Kostenlos', oeffnung:'Sommer', web:'', maps:'https://maps.google.com/?q=Haidweiher+Nürnberg' },
    { name:'Gänsbergweiher Zirndorf', addr:'Zirndorf', city:'Zirndorf', lat:49.4400, lng:10.9580, tags:['Badesee','Familie','Klein'], preis:'Kostenlos', oeffnung:'Sommer', web:'', maps:'https://maps.google.com/?q=Gänsbergweiher+Zirndorf' },
    { name:'Baggersee Almoshof Nürnberg', addr:'Nürnberg-Almoshof', city:'Nürnberg', lat:49.4839, lng:11.0168, tags:['Baggersee','Urban','Trendy'], preis:'Kostenlos', oeffnung:'Sommer', web:'', maps:'https://maps.google.com/?q=Baggersee+Almoshof' },
    { name:'Weiherhausweiher Fürth', addr:'Fürth', city:'Fürth', lat:49.4810, lng:10.9600, tags:['Badesee','Fürth'], preis:'Kostenlos', oeffnung:'Sommer', web:'', maps:'https://maps.google.com/?q=Weiherhausweiher+Fürth' },
    { name:'Kessellohe Weiher Erlangen', addr:'Erlangen', city:'Erlangen', lat:49.5990, lng:11.0380, tags:['Naturbad','Erlangen','Idyllisch'], preis:'Kostenlos', oeffnung:'Sommer', web:'', maps:'https://maps.google.com/?q=Kessellohe+Weiher+Erlangen' },
    { name:'Mandichosee Augsburg', addr:'86836 Untermeitingen', city:'Augsburg', lat:48.2060, lng:10.8319, tags:['Badesee','Augsburg Nähe','Groß'], preis:'Kostenlos', oeffnung:'Sommer', web:'', maps:'https://maps.google.com/?q=Mandichosee+Augsburg' },
    { name:'Schnaittach-Stausee', addr:'Schnaittach', city:'Lauf', lat:49.5547, lng:11.3322, tags:['Stausee','Angeln','Baden'], preis:'Kostenlos', oeffnung:'Sommer', web:'', maps:'https://maps.google.com/?q=Schnaittach+Stausee' },
    { name:'Eixendorfer Stausee Nittenau', addr:'Nittenau', city:'Regensburg', lat:49.2017, lng:12.2661, tags:['Stausee','Oberpfalz','Surfen'], preis:'3€', oeffnung:'Sommer', web:'', maps:'https://maps.google.com/?q=Eixendorfer+Stausee' },
    { name:'Fischstein-Weiher Allersberg', addr:'Allersberg', city:'Roth', lat:49.2525, lng:11.2431, tags:['Badesee','Idyllisch'], preis:'Kostenlos', oeffnung:'Sommer', web:'', maps:'https://maps.google.com/?q=Fischstein+Weiher+Allersberg' },
    { name:'Steinacher See Neumarkt', addr:'Neumarkt', city:'Neumarkt', lat:49.2817, lng:11.4906, tags:['Badesee','Neumarkt'], preis:'Kostenlos', oeffnung:'Sommer', web:'', maps:'https://maps.google.com/?q=Steinacher+See+Neumarkt' },
    { name:'Wiesent-See Strullendorf', addr:'Strullendorf', city:'Bamberg', lat:49.8803, lng:10.9422, tags:['Badesee','Bamberg Nähe'], preis:'Kostenlos', oeffnung:'Sommer', web:'', maps:'https://maps.google.com/?q=Wiesentsee+Strullendorf' },
    { name:'Wiesentsee Hirschaid', addr:'Hirschaid', city:'Bamberg', lat:49.8179, lng:10.9886, tags:['Badesee','Bamberg Nähe','Groß'], preis:'Kostenlos', oeffnung:'Sommer', web:'', maps:'https://maps.google.com/?q=Wiesentsee+Hirschaid' },
  ],

  // ── CAMPINGPLÄTZE ─────────────────────────────────
  camping: [
    // ── Premium Familien-Campingplätze Bayern ──
    { name:'Mohrenhof Franken', addr:'Mohrenhof 1, 91608 Geslau', city:'Geslau', lat:49.3823, lng:10.3256, tags:['Familie','Badesee','Animation','Wakepark'], preis:'ab 30€/Nacht', oeffnung:'Mai-Sep', web:'mohrenhof-franken.de', maps:'https://maps.google.com/?q=Mohrenhof+Franken+Geslau', highlight:'Badesee, Wakepark, Aquapark, Tiere, Beach-Bar – Top-Familiencamp Frankens' },
    { name:'Campingpark Gitzenweiler Hof', addr:'Gitzenweiler 88, 88131 Lindau', city:'Lindau', lat:47.5667, lng:9.6889, tags:['Familie','Badesee','Animation','Bodensee'], preis:'ab 35€/Nacht', oeffnung:'Apr-Okt', web:'gitzenweiler-hof.de', maps:'https://maps.google.com/?q=Campingpark+Gitzenweiler+Hof+Lindau', highlight:'Riesiges Kinderprogramm, Badesee, mehrere Restaurants – Allgäu/Bodensee' },
    { name:'Campingplatz Elbsee', addr:'Ruderatshofen, 87452 Altusried', city:'Ruderatshofen', lat:47.7876, lng:10.6445, tags:['Familie','Badesee','Allgäu','Spielplatz'], preis:'ab 25€/Nacht', oeffnung:'Mai-Sep', web:'', maps:'https://maps.google.com/?q=Campingplatz+Elbsee+Ruderatshofen', highlight:'Großer Badesee, Tretboote, Familienevents – Allgäu' },
    { name:'Seecamping Günztal', addr:'Breitenthal, 86480 Aichach', city:'Breitenthal', lat:48.2144, lng:10.3556, tags:['Familie','Badesee','Bootsverleih','Biergarten'], preis:'ab 22€/Nacht', oeffnung:'Mai-Sep', web:'', maps:'https://maps.google.com/?q=Seecamping+Günztal+Breitenthal', highlight:'Badesee, Bootsverleih, Biergarten – Schwaben' },
    { name:'Camping Naabtal-Pielenhofen', addr:'Pielenhofen, 93188 Pielenhofen', city:'Pielenhofen', lat:49.0733, lng:11.9578, tags:['Familie','Fluss','Lagerfeuer','Biergarten'], preis:'ab 20€/Nacht', oeffnung:'Apr-Okt', web:'', maps:'https://maps.google.com/?q=Camping+Naabtal+Pielenhofen', highlight:'Direkt an der Naab, Lagerfeuer erlaubt, Biergarten – Oberpfalz' },
    { name:'See-Campingpark Neubäuer See', addr:'Roding, 93426 Roding', city:'Roding', lat:49.1917, lng:12.5267, tags:['Familie','Badesee','Wassersport','Animation'], preis:'ab 25€/Nacht', oeffnung:'Mai-Sep', web:'', maps:'https://maps.google.com/?q=See+Campingpark+Neubäuer+See+Roding', highlight:'Großer Badesee, Kinderanimation, Wassersport – Bayerischer Wald' },
    { name:'Camping Brugger am Riegsee', addr:'Spatzenhausen 12, 82418 Murnau', city:'Spatzenhausen', lat:47.7156, lng:11.0778, tags:['Familie','See','Berge','Seerestaurant'], preis:'ab 28€/Nacht', oeffnung:'Mai-Sep', web:'', maps:'https://maps.google.com/?q=Camping+Brugger+Riegsee+Spatzenhausen', highlight:'Direkt am Riegsee, Bergpanorama, Seerestaurant – Oberbayern' },
    { name:'Campingpark Kirchzell', addr:'Kirchzell, 63931 Kirchzell', city:'Kirchzell', lat:49.6011, lng:9.2356, tags:['Familie','Badeteich','Lagerfeuer','Gasthaus'], preis:'ab 22€/Nacht', oeffnung:'Apr-Okt', web:'', maps:'https://maps.google.com/?q=Campingpark+Kirchzell', highlight:'Fluss & Badeteich, Lagerfeuer erlaubt, Gasthaus – Odenwald/Unterfranken' },
    { name:'Main Camp Resort Zellingen', addr:'Zellingen, 97225 Zellingen', city:'Zellingen', lat:49.9011, lng:9.8656, tags:['Familie','Main','Lagerfeuer','Restaurant'], preis:'ab 25€/Nacht', oeffnung:'Apr-Okt', web:'', maps:'https://maps.google.com/?q=Main+Camp+Resort+Zellingen', highlight:'Am Main, Lagerfeuer erlaubt, Restaurant – Unterfranken' },
    { name:'Naturcampingpark Isarhorn', addr:'Mittenwald, 82481 Mittenwald', city:'Mittenwald', lat:47.4433, lng:11.2617, tags:['Familie','Isar','Berge','Natur'], preis:'ab 28€/Nacht', oeffnung:'Mai-Okt', web:'', maps:'https://maps.google.com/?q=Naturcampingpark+Isarhorn+Mittenwald', highlight:'Isarzugang, Bergpanorama, Natur pur – Mittenwald' },
    { name:'Campingpark Nabburg', addr:'Nabburg, 92507 Nabburg', city:'Nabburg', lat:49.4511, lng:12.1778, tags:['Familie','Freibad','Wasserrutsche','Restaurant'], preis:'ab 20€/Nacht', oeffnung:'Mai-Sep', web:'', maps:'https://maps.google.com/?q=Campingpark+Nabburg', highlight:'Nahe Naab + Freibad, Wasserrutsche, Restaurant – Oberpfalz' },
    // ── Nürnberg Region ──
    { name:'Camping Entspannoase Nürnberg', addr:'Nürnberg', city:'Nürnberg', lat:49.4600, lng:11.0800, tags:['Camping','Nürnberg','Urban'], preis:'ab 15€/Nacht', oeffnung:'Apr-Okt', web:'', maps:'https://maps.google.com/?q=Camping+Nürnberg' },
    { name:'Campingpark Rangau Erlangen', addr:'Campingstr. 44, 91056 Erlangen', city:'Erlangen', lat:49.5684, lng:10.9613, tags:['Camping','Erlangen','See'], preis:'ab 18€/Nacht', oeffnung:'Apr-Okt', web:'campingpark-rangau.de', maps:'https://maps.google.com/?q=Campingpark+Rangau+Erlangen', highlight:'Direkt am Rangausee mit Strandbad' },
    { name:'Camping Altmühlsee Gunzenhausen', addr:'Gunzenhausen', city:'Gunzenhausen', lat:49.1347, lng:10.7119, tags:['Camping','Altmühlsee','Seelage'], preis:'ab 20€/Nacht', oeffnung:'Apr-Okt', web:'', maps:'https://maps.google.com/?q=Camping+Altmühlsee' },
    { name:'Camping Brombachsee', addr:'Absberg', city:'Gunzenhausen', lat:49.1083, lng:10.8467, tags:['Camping','Brombachsee','Wassersport'], preis:'ab 18€/Nacht', oeffnung:'Apr-Okt', web:'brombachsee.de', maps:'https://maps.google.com/?q=Camping+Brombachsee' },
    { name:'ADAC Campingplatz Rothsee', addr:'Leerstetten', city:'Roth', lat:49.3286, lng:10.9614, tags:['ADAC','Camping','Rothsee'], preis:'ab 22€/Nacht', oeffnung:'Apr-Okt', web:'', maps:'https://maps.google.com/?q=ADAC+Camping+Rothsee', highlight:'ADAC-zertifiziert, direkt am See' },
    { name:'Camping Happurger Stausee', addr:'Happurg', city:'Hersbruck', lat:49.5178, lng:11.4558, tags:['Camping','Stausee','Fränkische Schweiz'], preis:'ab 16€/Nacht', oeffnung:'Apr-Okt', web:'', maps:'https://maps.google.com/?q=Camping+Happurg' },
    { name:'Freizeitanlage Schloss Thurn Glamping', addr:'91336 Heroldsbach', city:'Heroldsbach', lat:49.7506, lng:11.0228, tags:['Glamping','Wohnmobil','Schloss Thurn'], preis:'ab 30€/Nacht', oeffnung:'Apr-Nov', web:'schloss-thurn.de', maps:'https://maps.google.com/?q=GlampingPark+Schloss+Thurn', highlight:'Direktzugang zum Freizeitpark' },
    { name:'Campingplatz Weiher Fürth', addr:'Fürth', city:'Fürth', lat:49.4840, lng:10.9600, tags:['Camping','Fürth'], preis:'ab 14€/Nacht', oeffnung:'Mai-Sep', web:'', maps:'https://maps.google.com/?q=Campingplatz+Weiher+Fürth' },
    { name:'Camping Estenfeld Würzburg', addr:'Estenfeld', city:'Würzburg', lat:49.8748, lng:10.1100, tags:['Camping','Würzburg Nähe'], preis:'ab 16€/Nacht', oeffnung:'Apr-Okt', web:'', maps:'https://maps.google.com/?q=Camping+Estenfeld+Würzburg' },
    { name:'Camping Fränkische Schweiz Streitberg', addr:'Streitberg', city:'Hersbruck', lat:49.8056, lng:11.2218, tags:['Camping','Fränkische Schweiz','Natur'], preis:'ab 18€/Nacht', oeffnung:'Apr-Okt', web:'', maps:'https://maps.google.com/?q=Camping+Streitberg+Fränkische+Schweiz', highlight:'Direkt in der Fränkischen Schweiz' },
    { name:'Treehouse Hotel & Camping Tripsdrill', addr:'74389 Cleebronn', city:'Cleebronn', lat:49.0659, lng:9.1075, tags:['Glamping','Baumhaus','Natur'], preis:'ab 120€/Nacht', oeffnung:'ganzjährig', web:'tripsdrill.de', maps:'https://maps.google.com/?q=Natur-Resort+Tripsdrill', highlight:'Schlafen im Baumhaus direkt am Park' },
    { name:'Campingplatz Eichwald Hemhofen', addr:'Hemhofen', city:'Erlangen', lat:49.6364, lng:10.9855, tags:['Camping','Erlangen Nähe','Ruhig'], preis:'ab 15€/Nacht', oeffnung:'Apr-Okt', web:'', maps:'https://maps.google.com/?q=Campingplatz+Hemhofen' },
    { name:'Knaus Camping Lackenhäuser Bayerischer Wald', addr:'Neureichenau', city:'Cham', lat:48.7527, lng:13.7427, tags:['Camping','Bayerischer Wald','Knaus'], preis:'ab 25€/Nacht', oeffnung:'ganzjährig', web:'knauscamp.de', maps:'https://maps.google.com/?q=Knaus+Camping+Lackenhäuser' },
    { name:'AZUR Camping Ingolstadt', addr:'Ingolstadt', city:'Ingolstadt', lat:48.7665, lng:11.4258, tags:['Camping','Ingolstadt','AZUR'], preis:'ab 20€/Nacht', oeffnung:'Apr-Okt', web:'azur-camping.de', maps:'https://maps.google.com/?q=AZUR+Camping+Ingolstadt' },
    { name:'Camping Goldener Anker Treuchtlingen', addr:'Treuchtlingen', city:'Treuchtlingen', lat:48.9592, lng:10.9094, tags:['Camping','Altmühltal','Radfahrer'], preis:'ab 16€/Nacht', oeffnung:'Apr-Okt', web:'', maps:'https://maps.google.com/?q=Camping+Goldener+Anker+Treuchtlingen', highlight:'Am Altmühltal-Radweg' },
    { name:'Camping Steigerwald Geiselwind', addr:'Geiselwind', city:'Geiselwind', lat:49.7825, lng:10.3959, tags:['Camping','Steigerwald','Freizeitpark'], preis:'ab 18€/Nacht', oeffnung:'Apr-Okt', web:'freizeit-land.de', maps:'https://maps.google.com/?q=Camping+Geiselwind', highlight:'Seaside Resort direkt am Freizeit-Land' },
    { name:'Campingplatz Wirthsmühle Obertrubach', addr:'Obertrubach', city:'Hersbruck', lat:49.6992, lng:11.3661, tags:['Camping','Fränkische Schweiz','Idyllisch'], preis:'ab 15€/Nacht', oeffnung:'Apr-Okt', web:'', maps:'https://maps.google.com/?q=Camping+Wirthsmühle+Obertrubach' },
  ],

  // ── AUSFLUGSZIELE ─────────────────────────────────
  ausflugsziele: [
    { name:'Kaiserburg Nürnberg', addr:'Auf der Burg 13, 90403 Nürnberg', city:'Nürnberg', lat:49.4591, lng:11.0736, tags:['Burg','Panorama','Geschichte'], preis:'7€', oeffnung:'tägl. 9-18 Uhr', web:'kaiserburg-nuernberg.de', maps:'https://maps.google.com/?q=Kaiserburg+Nürnberg', highlight:'Wahrzeichen Nürnbergs' },
    { name:'Fränkische Schweiz (Wiesenttal)', addr:'Pottenstein – Tüchersfeld', city:'Hersbruck', lat:49.7744, lng:11.4156, tags:['Natur','Wandern','Felsen'], preis:'Kostenlos', oeffnung:'ganzjährig', web:'fraenkische-schweiz.com', maps:'https://maps.google.com/?q=Fränkische+Schweiz' },
    { name:'Teufelshöhle Pottenstein', addr:'91278 Pottenstein', city:'Hersbruck', lat:49.7696, lng:11.4165, tags:['Höhle','Natur','Führung'], preis:'Erw 9€', oeffnung:'Apr-Nov', web:'teufelshöhle-pottenstein.de', maps:'https://maps.google.com/?q=Teufelshöhle+Pottenstein', highlight:'Größte Schauhöhle Frankens' },
    { name:'Reichsparteitagsgelände Nürnberg', addr:'Bayernstr. 110, 90478 Nürnberg', city:'Nürnberg', lat:49.4256, lng:11.1227, tags:['Geschichte','NS-Doku','Outdoor'], preis:'Kostenlos (außen)', oeffnung:'tägl.', web:'', maps:'https://maps.google.com/?q=Reichsparteitagsgelände+Nürnberg' },
    { name:'Altmühltal Panoramaweg', addr:'Gunzenhausen – Kelheim', city:'Gunzenhausen', lat:49.1138, lng:10.7549, tags:['Wandern','Altmühltal','Natur'], preis:'Kostenlos', oeffnung:'ganzjährig', web:'altmuehltal.de', maps:'https://maps.google.com/?q=Altmühltal+Panoramaweg' },
    { name:'Cadolzburg', addr:'Burg 19, 90556 Cadolzburg', city:'Zirndorf', lat:49.4996, lng:10.8611, tags:['Burg','Geschichte','Ausflug'], preis:'5€', oeffnung:'Di-So', web:'cadolzburg.de', maps:'https://maps.google.com/?q=Burg+Cadolzburg' },
    { name:'Burg Abenberg (Spitzenmuseum)', addr:'Burgstr. 16, 91183 Abenberg', city:'Roth', lat:49.2365, lng:10.9542, tags:['Burg','Spitzenklöppeln','Geschichte'], preis:'4€', oeffnung:'Di-So', web:'burg-abenberg.de', maps:'https://maps.google.com/?q=Burg+Abenberg' },
    { name:'Walberla (Ehrenbürg)', addr:'Kirchehrenbach', city:'Forchheim', lat:49.7679, lng:11.1044, tags:['Aussichtsberg','Wandern','Franken'], preis:'Kostenlos', oeffnung:'ganzjährig', web:'', maps:'https://maps.google.com/?q=Walberla+Ehrenbürg', highlight:'Heiliger Berg Frankens, Panorama' },
    { name:'Steinwald Naturpark', addr:'Erbendorf', city:'Weiden', lat:49.8385, lng:12.0538, tags:['Natur','Wandern','Granit'], preis:'Kostenlos', oeffnung:'ganzjährig', web:'', maps:'https://maps.google.com/?q=Steinwald+Naturpark' },
    { name:'Nürnberger Reichswald', addr:'Nürnberg Süd/Ost', city:'Nürnberg', lat:49.3900, lng:11.1500, tags:['Wald','Wandern','Naherholung'], preis:'Kostenlos', oeffnung:'tägl.', web:'', maps:'https://maps.google.com/?q=Nürnberger+Reichswald' },
    { name:'Drei-Franken-Eck Bamberg-Region', addr:'Süden Bamberg', city:'Bamberg', lat:49.8988, lng:10.9028, tags:['Aussicht','Wandern'], preis:'Kostenlos', oeffnung:'tägl.', web:'', maps:'https://maps.google.com/?q=Bamberg+Altstadt' },
    { name:'Bamberg Altstadt (UNESCO)', addr:'Bamberg Innenstadt', city:'Bamberg', lat:49.8988, lng:10.9028, tags:['UNESCO','Altstadt','Bier'], preis:'Kostenlos', oeffnung:'tägl.', web:'bamberg.info', maps:'https://maps.google.com/?q=Bamberg+Altstadt', highlight:'UNESCO-Welterbe Altstadt' },
    { name:'Stein an der Traun (Chiemgau)', addr:'83371 Stein', city:'München', lat:47.9542, lng:12.6222, tags:['Burgruine','Romantik','Chiemgau'], preis:'Kostenlos', oeffnung:'tägl.', web:'', maps:'https://maps.google.com/?q=Burg+Stein+Traun' },
    { name:'Schloss Neuschwanstein', addr:'Neuschwansteinstr. 20, 87645 Schwangau', city:'Rammingen', lat:47.5576, lng:10.7498, tags:['Schloss','Weltberühmt','Bayern'], preis:'Erw 17€', oeffnung:'tägl. Apr-Okt', web:'neuschwanstein.de', maps:'https://maps.google.com/?q=Schloss+Neuschwanstein', highlight:'Bekanntestes Schloss der Welt' },
    { name:'Bodensee Lindau', addr:'Lindau', city:'Rammingen', lat:47.5451, lng:9.6803, tags:['See','Inselstadt','Alpen'], preis:'Kostenlos', oeffnung:'ganzjährig', web:'lindau.de', maps:'https://maps.google.com/?q=Lindau+Bodensee', highlight:'Mittelalterliche Inselstadt am Bodensee' },
    { name:'Zugspitze', addr:'82475 Zugspitze', city:'München', lat:47.4211, lng:10.9851, tags:['Berg','Höchster Punkt DE','Aussicht'], preis:'ab 42€ Seilbahn', oeffnung:'tägl.', web:'zugspitze.de', maps:'https://maps.google.com/?q=Zugspitze', highlight:'Höchster Berg Deutschlands (2962m)' },
    { name:'Rothenburg ob der Tauber', addr:'Rothenburg ob der Tauber', city:'Ansbach', lat:49.3774, lng:10.1792, tags:['Mittelalter','Altstadt','Tourismus'], preis:'Kostenlos', oeffnung:'tägl.', web:'rothenburg.de', maps:'https://maps.google.com/?q=Rothenburg+ob+der+Tauber', highlight:'Besterhaltene mittelalterliche Stadtmauer' },
    { name:'Dinkelbühl', addr:'Dinkelbühl', city:'Ansbach', lat:49.0705, lng:10.3200, tags:['Mittelalter','Altstadt','Idylle'], preis:'Kostenlos', oeffnung:'tägl.', web:'dinkelsbuehl.de', maps:'https://maps.google.com/?q=Dinkelbühl' },
    { name:'Hesselberg (Höchster Punkt Bayerns ohne Alpen)', addr:'Hesselberg, Gerolfingen', city:'Ansbach', lat:49.0800, lng:10.5300, tags:['Berg','Aussicht','Wandern'], preis:'Kostenlos', oeffnung:'tägl.', web:'', maps:'https://maps.google.com/?q=Hesselberg+Bayern' },
    { name:'Walhalla Regensburg', addr:'Walhalla 1, 93093 Donaustauf', city:'Regensburg', lat:49.0301, lng:12.3659, tags:['Denkmal','Geschichte','Ausblick'], preis:'Erw 4€', oeffnung:'tägl. Apr-Sep 9-17:45 Uhr', web:'walhalla.de', maps:'https://maps.google.com/?q=Walhalla+Donaustauf', highlight:'Griechischer Tempel über der Donau' },
    { name:'Altmühlsee-Radweg', addr:'Gunzenhausen', city:'Gunzenhausen', lat:49.1138, lng:10.7549, tags:['Radfahren','Altmühlsee','Natur'], preis:'Kostenlos', oeffnung:'Apr-Okt', web:'', maps:'https://maps.google.com/?q=Altmühlsee+Radweg' },
    { name:'Rennsteig Thüringen', addr:'Thüringer Wald', city:'Hof', lat:50.4900, lng:10.9000, tags:['Wandern','Rennsteig','Thüringen'], preis:'Kostenlos', oeffnung:'ganzjährig', web:'rennsteig.de', maps:'https://maps.google.com/?q=Rennsteig+Thüringen' },
    { name:'Franconian Open Air Museum Bad Windsheim', addr:'Eisweiherweg 1, 91438 Bad Windsheim', city:'Ansbach', lat:49.5044, lng:10.4131, tags:['Freilichtmuseum','Franken','Geschichte'], preis:'Erw 10€', oeffnung:'tägl. Apr-Okt', web:'freilandmuseum.de', maps:'https://maps.google.com/?q=Freilandmuseum+Bad+Windsheim', highlight:'Historische Gebäude aus ganz Franken' },
    { name:'Limes-Radweg', addr:'Weißenburg – Dinkelsbühl', city:'Weißenburg', lat:49.0355, lng:10.9712, tags:['Radfahren','Römer','Limes'], preis:'Kostenlos', oeffnung:'Apr-Okt', web:'', maps:'https://maps.google.com/?q=Limes+Weißenburg' },
    { name:'Abodiacum Römerkastell Epfach', addr:'Epfach', city:'Rammingen', lat:47.8769, lng:10.9067, tags:['Römer','Geschichte','Ausflug'], preis:'Kostenlos', oeffnung:'tägl.', web:'', maps:'https://maps.google.com/?q=Römerkastell+Epfach' },
    { name:'Donaudurchbruch Weltenburg', addr:'Weltenburg, Kelheim', city:'Ingolstadt', lat:48.8982, lng:11.9494, tags:['Natur','Donau','Kloster'], preis:'Bootsfahrt 6€', oeffnung:'Apr-Okt', web:'kloster-weltenburg.de', maps:'https://maps.google.com/?q=Donaudurchbruch+Weltenburg', highlight:'Schmalste Donaustelle, Klosterbrauerei' },
    { name:'Hesselberg-Radweg', addr:'Ansbach Region', city:'Ansbach', lat:49.3028, lng:10.5711, tags:['Radfahren','Hesselberg'], preis:'Kostenlos', oeffnung:'Apr-Okt', web:'', maps:'https://maps.google.com/?q=Hesselberg+Radweg' },
    { name:'Wolfstein Regen (Bayerischer Wald)', addr:'Viechtach', city:'Cham', lat:49.0767, lng:12.8814, tags:['Burg','Bayerischer Wald','Wandern'], preis:'Kostenlos', oeffnung:'tägl.', web:'', maps:'https://maps.google.com/?q=Wolfstein+Regen' },
  ],
};

// ── TOAST ─────────────────────────────────────────
function showToastPlaces(msg) {
  const t = document.getElementById('toast');
  if (!t) return;
  t.textContent = msg; t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 3000);
}

// ── PLZ GEOCODING ─────────────────────────────────
async function geocodePLZPlaces(plz) {
  try {
    const res = await fetch(`https://nominatim.openstreetmap.org/search?postalcode=${plz}&country=DE&format=json&limit=1`, {
      headers: {'Accept-Language':'de', 'User-Agent':'VianaEventsKalender/1.0'}
    });
    const data = await res.json();
    if (!data.length) { showToastPlaces('PLZ nicht gefunden'); return; }
    const {lat, lon, display_name} = data[0];
    const parts = display_name.split(',').map(p => p.trim());
    const city = parts.find(p => !/^\d{5}$/.test(p)) || parts[0];
    window._userLat = parseFloat(lat);
    window._userLng = parseFloat(lon);
    const label = `${plz} ${city}`;
    localStorage.setItem('viana_places_loc', JSON.stringify({lat:window._userLat, lon:window._userLng, label}));
    const statusEl = document.getElementById('places-loc-status');
    if (statusEl) { statusEl.className = 'loc-status active'; statusEl.textContent = '📍 ' + label; }
    const clearBtn = document.getElementById('places-loc-clear');
    if (clearBtn) clearBtn.style.display = '';
    if (_activeCat) renderPlacesList(_activeCat);
  } catch(err) { showToastPlaces('Geocoding fehlgeschlagen'); }
}

// ── RENDER FUNCTIONS ──────────────────────────────
function initPlaces() {
  const catGrid = document.getElementById('cat-grid');
  if (!catGrid) return;

  // Restore saved location or try geolocation
  window._userLat = null; window._userLng = null;
  const savedLoc = localStorage.getItem('viana_places_loc');
  if (savedLoc) {
    try {
      const {lat, lon, label} = JSON.parse(savedLoc);
      window._userLat = lat; window._userLng = lon;
      const statusEl = document.getElementById('places-loc-status');
      if (statusEl) { statusEl.className = 'loc-status active'; statusEl.textContent = '📍 ' + label; }
      const clearBtn = document.getElementById('places-loc-clear');
      if (clearBtn) clearBtn.style.display = '';
    } catch(e) {}
  } else if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(pos => {
      window._userLat = pos.coords.latitude;
      window._userLng = pos.coords.longitude;
      if (window._activeCat) renderPlacesList(window._activeCat);
    }, () => {
      window._userLat = P_HOME.lat;
      window._userLng = P_HOME.lng;
    });
  } else {
    window._userLat = P_HOME.lat;
    window._userLng = P_HOME.lng;
  }

  // PLZ input
  const plzInput = document.getElementById('places-plz-input');
  if (plzInput) {
    plzInput.addEventListener('keydown', e => {
      if (e.key === 'Enter') {
        const plz = e.target.value.trim();
        if (/^\d{5}$/.test(plz)) geocodePLZPlaces(plz);
        else showToastPlaces('Bitte eine gültige 5-stellige PLZ eingeben');
      }
    });
  }

  // Standort ermitteln button
  const geoBtn = document.getElementById('places-geo-btn');
  if (geoBtn) {
    geoBtn.addEventListener('click', () => {
      if (!navigator.geolocation) { showToastPlaces('Geolocation nicht verfügbar'); return; }
      const statusEl = document.getElementById('places-loc-status');
      if (statusEl) { statusEl.className = 'loc-status'; statusEl.textContent = '⏳ Ermittle Standort…'; }
      navigator.geolocation.getCurrentPosition(pos => {
        window._userLat = pos.coords.latitude;
        window._userLng = pos.coords.longitude;
        const label = 'Aktueller Standort';
        localStorage.setItem('viana_places_loc', JSON.stringify({lat:window._userLat, lon:window._userLng, label}));
        if (statusEl) { statusEl.className = 'loc-status active'; statusEl.textContent = '📍 ' + label; }
        const clearBtn = document.getElementById('places-loc-clear');
        if (clearBtn) clearBtn.style.display = '';
        if (_activeCat) renderPlacesList(_activeCat);
      }, () => { if(statusEl) statusEl.textContent = ''; showToastPlaces('Standort abgelehnt – bitte PLZ eingeben'); });
    });
  }

  // Standort löschen button
  const clearBtn = document.getElementById('places-loc-clear');
  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      localStorage.removeItem('viana_places_loc');
      window._userLat = P_HOME.lat; window._userLng = P_HOME.lng;
      const statusEl = document.getElementById('places-loc-status');
      if (statusEl) { statusEl.className = 'loc-status'; statusEl.textContent = ''; }
      clearBtn.style.display = 'none';
      const plzEl = document.getElementById('places-plz-input');
      if (plzEl) plzEl.value = '';
      if (_activeCat) renderPlacesList(_activeCat);
    });
  }

  renderCatGrid();
  setupSearch();
}

function renderCatGrid() {
  const grid = document.getElementById('cat-grid');
  const listSection = document.getElementById('places-list-section');
  if (!grid) return;
  grid.innerHTML = '';
  listSection && (listSection.style.display = 'none');

  PLACE_CATS.forEach(cat => {
    const data = PLACES[cat.id] || [];
    const card = document.createElement('div');
    card.className = 'cat-card';
    card.style.setProperty('--cat-color', cat.color);
    card.innerHTML = `
      <div class="cat-icon">${cat.icon}</div>
      <div class="cat-name">${cat.name}</div>
      <div class="cat-count">${data.length} Einträge</div>
      <div class="cat-desc">${cat.desc}</div>
    `;
    card.addEventListener('click', () => openCategory(cat.id));
    grid.appendChild(card);
  });
}

let _activeCat = null;
let _activeSubcat = 'alle';
let _searchQuery = '';
let _maxRadius = 9999;

function openCategory(catId) {
  _activeCat = catId;
  window._activeCat = catId;
  _activeSubcat = 'alle';
  _searchQuery = '';

  const grid = document.getElementById('cat-grid');
  const listSection = document.getElementById('places-list-section');
  if (grid) grid.style.display = 'none';
  if (listSection) listSection.style.display = 'block';

  const cat = PLACE_CATS.find(c => c.id === catId);
  const titleEl = document.getElementById('places-cat-title');
  if (titleEl && cat) {
    titleEl.innerHTML = `${cat.icon} ${cat.name} <span class="badge">${(PLACES[catId]||[]).length} Orte</span>`;
  }

  // Build subcategory pills from tags
  buildSubcatPills(catId);
  renderPlacesList(catId);

  // Search input
  const searchEl = document.getElementById('places-search');
  if (searchEl) {
    searchEl.value = '';
    searchEl.oninput = e => {
      _searchQuery = e.target.value.toLowerCase();
      renderPlacesList(_activeCat);
    };
  }
  // Sort
  const sortEl = document.getElementById('places-sort');
  if (sortEl) {
    sortEl.onchange = () => renderPlacesList(_activeCat);
  }
  // Radius
  const radiusEl = document.getElementById('places-radius');
  if (radiusEl) {
    radiusEl.onchange = e => {
      _maxRadius = parseInt(e.target.value) || 9999;
      renderPlacesList(_activeCat);
    };
  }
  // Scroll to top
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function buildSubcatPills(catId) {
  const data = PLACES[catId] || [];
  const tagSet = new Set();
  data.forEach(p => (p.tags || []).forEach(t => tagSet.add(t)));
  const pillsEl = document.getElementById('subcat-pills');
  if (!pillsEl) return;
  pillsEl.innerHTML = `<button class="subcat-pill active" data-subcat="alle">Alle</button>`;
  [...tagSet].slice(0, 12).forEach(tag => {
    const btn = document.createElement('button');
    btn.className = 'subcat-pill';
    btn.dataset.subcat = tag;
    btn.textContent = tag;
    btn.addEventListener('click', () => {
      _activeSubcat = tag;
      document.querySelectorAll('.subcat-pill').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderPlacesList(_activeCat);
    });
    pillsEl.appendChild(btn);
  });
  pillsEl.querySelector('[data-subcat="alle"]').addEventListener('click', () => {
    _activeSubcat = 'alle';
    document.querySelectorAll('.subcat-pill').forEach(b => b.classList.remove('active'));
    pillsEl.querySelector('[data-subcat="alle"]').classList.add('active');
    renderPlacesList(_activeCat);
  });
}

function renderPlacesList(catId) {
  const container = document.getElementById('places-rows');
  if (!container) return;
  let data = PLACES[catId] || [];

  // Filter by subcat
  if (_activeSubcat !== 'alle') {
    data = data.filter(p => (p.tags || []).includes(_activeSubcat));
  }
  // Filter by search
  if (_searchQuery) {
    data = data.filter(p =>
      p.name.toLowerCase().includes(_searchQuery) ||
      (p.addr||'').toLowerCase().includes(_searchQuery) ||
      (p.tags||[]).join(' ').toLowerCase().includes(_searchQuery)
    );
  }
  // Compute distances
  data = data.map(p => ({
    ...p,
    _dist: distKmCoords(p.lat, p.lng)
  }));
  // Filter by radius
  if (_maxRadius < 9999) {
    data = data.filter(p => p._dist === null || p._dist <= _maxRadius);
  }
  // Sort
  const sortEl = document.getElementById('places-sort');
  const sortVal = sortEl ? sortEl.value : 'dist';
  if (sortVal === 'dist' && window._userLat) {
    data.sort((a, b) => (a._dist||9999) - (b._dist||9999));
  } else if (sortVal === 'alpha') {
    data.sort((a, b) => a.name.localeCompare(b.name));
  }

  // Count
  const countEl = document.getElementById('places-count');
  if (countEl) countEl.textContent = `${data.length} Einträge`;

  if (!data.length) {
    container.innerHTML = `<div class="places-empty"><span class="emoji">🔍</span>Keine Einträge gefunden</div>`;
    return;
  }

  const cat = PLACE_CATS.find(c => c.id === catId);
  container.innerHTML = data.map(p => {
    const distBadge = p._dist !== null ? `<span class="dist-badge">~${p._dist} km</span>` : '';
    const tags = (p.tags||[]).map(t => `<span class="place-badge">${t}</span>`).join('');
    const highlightBadge = p.highlight ? `<span class="place-badge highlight">⭐ ${p.highlight}</span>` : '';
    const preisBadge = p.preis ? `<span class="place-badge">💶 ${p.preis}</span>` : '';
    const oeffBadge = p.oeffnung ? `<span class="place-badge">🕐 ${p.oeffnung}</span>` : '';
    const logoHtml = p.web ? `<img class="place-logo" src="https://logo.clearbit.com/${p.web}" alt="" loading="lazy" onerror="this.style.display='none'">` : '';
    return `
      <div class="place-row" style="--cat-color:${cat ? cat.color : 'var(--accent)'}">
        <div class="place-left">
          <div class="place-name-row">
            ${logoHtml}
            <div class="place-name">${p.name}</div>
          </div>
          <div class="place-addr">📍 ${p.addr}</div>
          <div class="place-meta">${tags}${preisBadge}${oeffBadge}${highlightBadge}</div>
        </div>
        <div class="place-right">
          ${distBadge}
          <a href="${p.maps}" target="_blank" rel="noopener" class="maps-btn" onclick="event.stopPropagation()">📍 Maps</a>
          ${p.web ? `<a href="https://${p.web}" target="_blank" rel="noopener" class="web-btn" onclick="event.stopPropagation()">🌐 Web</a>` : ''}
        </div>
      </div>`;
  }).join('');
}

function backToCats() {
  _activeCat = null;
  window._activeCat = null;
  const grid = document.getElementById('cat-grid');
  const listSection = document.getElementById('places-list-section');
  if (grid) grid.style.display = 'grid';
  if (listSection) listSection.style.display = 'none';
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Expose globals
window.initPlaces = initPlaces;
window.backToCats = backToCats;
window.openCategory = openCategory;
