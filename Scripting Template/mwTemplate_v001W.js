"use strict";
const { Console } = require("console");
const fs = require("fs");
let inny;
let outy;

// Hey Hi Hello!!!
// If this is your first time here,
// click anywhere on this page, then while holding CTRL:
//  - Tap 'K', then tap '0' to hide all the clutter
//  - Use 'K', then 'J', to show everything again.
/* Use the arrows [>] beside the line counts on the left to reveal individual regions and sections.
*/


/* IMPORTANT LINKS
===============================================================
== DOCUMENTATION ==
  Map Formatting: (what all the funny letters mean)
  - https://bsmg.wiki/mapping/map-format/beatmap.html
  
  Heck Wiki: (Noodle/Chroma Docs)
  - Main -- https://github.com/Aeroluna/Heck/wiki/
  - Animations -- https://github.com/Aeroluna/Heck/wiki/Animation
  
== GUIDES == 
  BSMG Intermediate Mapping guide: (even if you're experienced, please read this)
  - https://bsmg.wiki/mapping/intermediate-mapping.html

  Chromapper PropEdit Tutorial (Noodle/Chroma in Chromapper):
  - https://www.youtube.com/watch?v=FXcnebgOLpA
    
  Every Animation Type Explained: (IMPORTANT)
  - https://www.youtube.com/watch?v=nMHaPJ8o-Jk

== EXAMPLES == 
  Easing Examples:
  - https://easings.net/

  Map Script Examples: (using older versions of this script)
  - Main Repo: https://github.com/Mawntee/BS-Modchart-Mapping-Files/tree/main
  - V3: (current format -> aka arcs/chains update)
    - Folder - https://github.com/Mawntee/BS-Modchart-Mapping-Files/tree/main/FUN
    - Script - https://github.com/Mawntee/BS-Modchart-Mapping-Files/blob/ac4b3f0ee6d7d668e08f8990e777d09eb8fa17cc/FUN/FunV3.js#L1253
  - V2: (outdated -> including for simplistic examples which still carry over)
    - Basics - https://github.com/Mawntee/BS-Modchart-Mapping-Files/blob/ac4b3f0ee6d7d668e08f8990e777d09eb8fa17cc/How%20Low%20Can%20You%20Smash%20Bro/catgirls.js#L308
    - Wall distortion effects - https://github.com/Mawntee/BS-Modchart-Mapping-Files/blob/ac4b3f0ee6d7d668e08f8990e777d09eb8fa17cc/pop%20food/poop.js#L1538
    - Little bit of everything - https://github.com/Mawntee/BS-Modchart-Mapping-Files/blob/ac4b3f0ee6d7d668e08f8990e777d09eb8fa17cc/C18H27NO3/C1.js#L1629

  Chroma Environment Logs:
    - https://github.com/UGEcko/Chroodle/tree/main/ChromaLogs

== TOOLS ==
  NJS/JD/RT Calculator: (and other mapping ultilities)
  - https://kivalevan.me/BeatSaber-MappingUtility/
    
  Fraction/Decimal Conversion Chart:
  - http://www.cleavebooks.co.uk/scol/equivf.htm

== DISCORD SERVERS ==
  Beat Saber Modding Group
    - https://discord.gg/beatsabermods
  Beat Saber Mapping
    - https://discord.gg/ArT4BTQ
  Chromapper
    - https://discord.gg/YmEt9EZ8pw
  Heck
    - https://discord.gg/rrZf3kapeh
  My personal Discord :3
    - https://discord.gg/BYmz5mmSgy

===============================================================*/


//#region INITIAL SETUP, OPTIONS, AND DEBUG ==============================================================================================================================================================================

//====[ INPUT/OUTPUT ]====================================================================================================================================================================================================
  
  const DifSelection      = 1                     // - Set difficulty files based on 'if' statements below
  const AddCustomData     = true;                 // - Adds customData arrays to objects  --> Set 'true' if modhcart -> 'false' for vanilla
  const precision         = 6;                    // - Decimals to round to               --> Use this for cleaner anims or to try and decrease output file size
  const clearEnv          = false;                // - Remove input dif custom environment data            
  const lightshow         = false;                // - Import lightshow from other file   --> Set 'lightsPath' below
  const lightshowPath     = "EasyLightshow.dat";  // - Currently only supports Chroma/Vanilla lightshows made in Chrommaper using the V3 format. 
  const lightshowEnv      = true;                 // - Import Chroma Environment Enhancements, Geometry, and Materials from lightshow dif
  const lightshowTracks   = true;                 // - Import Noodle/Chroma custom events from lightshow dif
  const IgnoreInputLights = false;                // - Don't inlude/merge lightshow from input dif -> Only use lightshowPath
  const requirements      = ["Chroma", "Noodle Extensions"];  // Chromapper likes to mess with these. Use this to tell it who's boss >:3 | (set to 'false' if no requirements are required)

//====[  CringeFix™  ]=[ various tools and fixes for common mod/config conflicts ]=========================================================================================================================================

  const CringeFix       = true;                 // - Fixes for common mod conflicts such as JDFixer and BS+ note scaling --> Enables lower options
  const ForceNJS        = true;                 // - Force NJS into every playable object --> 'true' samples info.dat, or you can enter in any value
  const ForceJD         = true;                 // - Bakes spawn offset into every playable object (JD/RT) -> (same as above)    
  const ForceNoteScale  = true;                 // - Prevents BS+, Adaptable Notes, and similar note tweaks mods from causing mismatched note scaling between vanilla/animated notes
  const ForceBombScale  = true;                 // - Same as above -> Both can be 'true', 'false', or an array -> Example: [0.5, 0.5, 0.5] for half sized notes/bombs         
  const FixAllArtArcs   = true;                 // - Cleans up notes attached to any arcs marked as "uninteractable: true" -> Removes real/fake notes attached to an arc, then creates a fake and invisible head note

//====[ DIFFICULTIES ]====================================================================================================================================================================================================

  if (DifSelection === 1) { // OPEN ME! 
    inny = "ExpertPlusLawless.dat";
    outy = "ExpertPlusStandard.dat";
  }
  //if (DifSelection === 2) { 
  //  inny = "ExpertLawless.dat";
  //  outy = "ExpertStandard.dat";
  //}
  /*=====================================================
  Remove above comments (//) for more difficulty options.
  Feel free to recycle whichever 'if' statement in
  other parts of your script for easy handling of
  difficulty specific effects, mods, or tweaks!
  =====================================================*/

//======[  DEBUG  ]=================================================================================================================================

  ///// General:
  const logStyling          = 0;    // false = boring | 0 = basic | 1-9 = LGBTQ-GF-NB-PS-A | 69 = rainbow | [num, 621] = furry
  const showGeneratedTracks = true;

  ///// CringeFix™ Logs:
  const hideNJSOffsLogs   = false;  // Prevents logging of baked NJS/Offset stats set to gameplay objects
  const hideScalingLogs   = false;  // Prevents logging of baked scale adjustments set to gameplay objects
  
  ///// Reaction Time:
  const showRTGuides      = false;  // Spawn guidelines in world to help visualize reaction time when animating notes/walls
  const desiredRT         = 500;    // Desired reaction time in milliseconds -> Note should be readable between here (green) and minimum (red) value!
  const autoAdjRTGuides   = true;   // Adjusts guidelines automatically when any njs/offset function is used.
  const rtAdjustScale     = 1.00;   // How long (in beats) it will take the guides to transition between njs/offset changes.
  const adaptiveRTAdj     = true;   // Scales transition time based on lifetime of incoming notes/walls/etc
  const hideRTStats       = false;  // Prevents logging of RT stats and updates during NJS changes
  const hideRTYapping     = false;  // Removes very important information that you should definitely read and understand first! :)
  
//--- Reaction Time Guides ---
/*==================================================================================================================================================
These are temporary lines generated in the world to help you get an idea of how readable your
notemods will be when working on them in FPFC (desktop mode).
  - Default/Desired reaction time (what you are familiar with in game) is based off the start of the note jump.
    HOWEVER, this isn't the "true" reaction time since the note still needs to complete the jump/flip animation.
    This animation is completed at the end of the "Half Jump Duration" period. 
    (So, a reaction time of '500ms', is actually '250ms' (global average gamer rt) once this anim is completed.
      - A BLUE guideline is created for the input/base half jump position.
      - A RED guideline is created for your set 'desired' half jump position -> PLEASE MAKE SURE YOUR NOTE IS READABLE BEFORE THIS LINE!!!
  - Guides will scale dynamically with BPM changes. 
    Set 'rtAdjustScale' to 0 for instant snapping on each BPM change.
Line Colours:
  White = Default note jump distance          | Blue = Default half jump distance
  Green = Start of intended RT "Comfort zone" | Red  = THE PANIK JUMP SCARE DO NOT CROSS LINE!!!!
==================================================================================================================================================*/
//#endregion

//#region ============== IGNORE ============== -->  Nerd stuff inside

const INPUT  = inny;
const OUTPUT = outy;
let difficulty = JSON.parse(fs.readFileSync(INPUT));
if(lightshow){var lightsInput = JSON.parse(fs.readFileSync(lightshowPath));}
const infoDat = JSON.parse(fs.readFileSync('Info.dat'));
const scriptVer = ["0.1", "W"];

//#region codes for pretty logs :3
const reset = '\x1b[0m';
// FG Colours
const black = '\x1b[30m';
const red = '\x1b[31m';
const green = '\x1b[32m';
const yellow = '\x1b[33m';
const blue = '\x1b[34m';
const magenta = '\x1b[35m';
const cyan = '\x1b[36m';
const white = '\x1b[37m';
// Bright FG colors
const brBlack = '\x1b[90m';
const brRed = '\x1b[91m';
const brGreen = '\x1b[92m';
const brYellow = '\x1b[93m';
const brBlue = '\x1b[94m';
const brMagenta = '\x1b[95m';
const brCyan = '\x1b[96m';
const brWhite = '\x1b[97m';
// BG Colours
const bgBlack = '\x1b[40m';
const bgRed = '\x1b[41m';
const bgGreen = '\x1b[42m';
const bgYellow = '\x1b[43m';
const bgBlue = '\x1b[44m';
const bgMagenta = '\x1b[45m';
const bgCyan = '\x1b[46m';
const bgWhite = '\x1b[47m';
// Bright BG colors
const bgBrBlack = '\x1b[100m';
const bgBrRed = '\x1b[101m';
const bgBrGreen = '\x1b[102m';
const bgBrYellow = '\x1b[103m';
const bgBrBlue = '\x1b[104m';
const bgBrMagenta = '\x1b[105m';
const bgBrCyan = '\x1b[106m';
const bgBrWhite = '\x1b[107m';
// Palettes
// Lesbian Flag
const paletteL = [
  '\x1b[38;5;166m', // Dark Orange
  '\x1b[38;5;215m', // Light Orange
  '\x1b[38;5;231m', // White
  '\x1b[38;5;219m', // Pink
  '\x1b[38;5;161m'  // Dark Pink
];
// Pride Flag
const paletteP = [
  '\x1b[38;5;196m', // Red
  '\x1b[38;5;208m', // Orange
  '\x1b[38;5;226m', // Yellow
  '\x1b[38;5;46m',  // Green
  '\x1b[38;5;21m',  // Blue
  '\x1b[38;5;201m'  // Violet
];
// Bisexual Flag
const paletteB = [
  '\x1b[38;5;198m', // Pink
  '\x1b[38;5;134m', // Purple
  '\x1b[38;5;18m'
];
// Transgender Flag
const paletteT = [
  '\x1b[38;5;81m',  // Light Blue
  '\x1b[38;5;217m', // Pink
  '\x1b[38;5;231m', // White
  '\x1b[38;5;217m', // Pink
  '\x1b[38;5;81m'   // Light Blue
];
// Genderqueer Flag
const paletteGQ = [
  '\x1b[38;5;183m', // Lavender
  '\x1b[38;5;231m', // White
  '\x1b[38;5;28m'   // Dark Green
];
// Genderfluid Flag
const paletteGF = [
  '\x1b[38;5;201m', // Pink
  '\x1b[38;5;231m', // White
  '\x1b[38;5;135m', // Purple
  '\x1b[38;5;16m',  // Black
  '\x1b[38;5;33m'   // Blue
];
// Non-Binary Flag
const paletteNB = [
  '\x1b[38;5;226m', // Yellow
  '\x1b[38;5;231m', // White
  '\x1b[38;5;135m', // Purple
  '\x1b[38;5;16m'
];
// Pansexual Flag
const palettePS = [
  '\x1b[38;5;198m', // Pink
  '\x1b[38;5;226m', // Yellow
  '\x1b[38;5;81m'   // Blue
];
// Asexual Flag
const paletteA = [
  '\x1b[38;5;232m',  // Black
  '\x1b[38;5;247m',  // Gray
  '\x1b[38;5;231m',  // White
  '\x1b[38;5;91m'    // Purple
];
const textRainbowColors = [
  '\x1b[91m', // Red Bright
  '\x1b[31m', // Red
  '\x1b[93m', // Yellow Bright
  '\x1b[33m', // Yellow
  '\x1b[92m', // Green Bright
  '\x1b[32m', // Green
  '\x1b[96m', // Cyan Bright
  '\x1b[36m', // Cyan
  '\x1b[94m', // Blue Bright
  '\x1b[34m', // Blue
  '\x1b[95m', // Magenta Bright
  '\x1b[35m', // Magenta
];
//shuffleArray(textRainbowColors);
let commonRNBWCol1 = textRainbowColors[rnd(0,10)];
let commonRNBWCol2 = textRainbowColors[rnd(0,10)];
let commonRNBWCol3 = textRainbowColors[rnd(0,10)];

// Bold and Underlined Text
const bold = '\x1b[1m';
const underline = '\x1b[4m';
// Creating Custom Labels
const label = '\x1b[1m\x1b[35m[DEBUG]\x1b[0m';
// Progress Indicators
/* 
  console.log('\x1b[33mLoading...\x1b[0m');
  setTimeout(() => {
      console.log('\x1b[32mDone!\x1b[0m');
  }, 2000);
*/
// Boxed or Framed Text
const boxLine = '\x1b[33m-------------------\x1b[0m';
/* 
  console.log(`${boxLine}\n\x1b[33m| \x1b[32mBoxed Text \x1b[33m|\n${boxLine}\x1b[0m`);
*/
// Simulating a Header/Footer Style
let header = '\x1b[35m';
let footer = '\x1b[0m';
// Rainbow Text
const colors = ['\x1b[31m', '\x1b[33m', '\x1b[32m', '\x1b[36m', '\x1b[34m', '\x1b[35m'];
const exampleRNBWtext = 'Rainbow Text';
let rainbowText = '';
for (let i = 0; i < exampleRNBWtext.length; i++) {
    rainbowText += colors[i % colors.length] + exampleRNBWtext[i];
}
// 10. Inverting Colors
/* 
  console.log('\x1b[7mInverted Colors\x1b[0m');
*/
// styling setup
let _GIURainbowText = ``;
let colPaletteTxt = [brWhite];
let colPalatteBrdrTop = brWhite;
let colPalatteBrdrBtm = brWhite;
let bodyText = [white];
let valueText = [yellow];
footer = [brWhite];

// assign colour palettes
if (!logStyling || logStyling[0] === false) {
  colPalatteBrdrTop = white;
  colPalatteBrdrBtm = white;
  if (logStyling[1] != 621) {
    colPaletteTxt     = white;
  }
  header = [brWhite];
  footer = [white];
  valueText = [black];
}
if (logStyling === 69 || logStyling[0] === 69) {
  colPalatteBrdrTop = commonRNBWCol1;
  colPalatteBrdrBtm = commonRNBWCol1;
  colPaletteTxt     = shuffleArray(textRainbowColors);
  header = [colPaletteTxt[0]];
  bodyText = [commonRNBWCol2];
  footer = [commonRNBWCol3];
}
if (logStyling === 1 || logStyling[0] === 1) {
  colPaletteTxt     = paletteL;
  colPalatteBrdrTop = paletteL[0];
  colPalatteBrdrBtm = paletteL[4];
  header = [colPaletteTxt[0]];
  bodyText = paletteL[4];
  valueText = paletteL[1];
}
if (logStyling === 2 || logStyling[0] === 2) {
  colPaletteTxt     = paletteP;
  colPalatteBrdrTop = paletteP[rnd(0,((paletteP.length)/2)-1)];
  colPalatteBrdrBtm = paletteP[rnd(((paletteP.length)/2)+1,paletteP.length)];
  header = [colPaletteTxt[0]];
  bodyText = paletteP[4];
  valueText = paletteP[2];
}
if (logStyling === 3 || logStyling[0] === 3) {
  colPalatteBrdrTop = paletteB[0];
  colPalatteBrdrBtm = paletteB[2];
  colPaletteTxt    = [paletteB[1]];
  header = [colPaletteTxt[0]];
  bodyText  = paletteB[2];
  valueText = paletteB[0];
}
if (logStyling === 4 || logStyling[0] === 4) {
  colPalatteBrdrTop = paletteT[0];
  colPalatteBrdrBtm = colPalatteBrdrTop;
  colPaletteTxt     = paletteT;
  header = [paletteT[2]];
  bodyText = [paletteT[1]];
  valueText = [paletteT[0]];
}
if (logStyling === 5 || logStyling[0] === 5) {
  colPalatteBrdrTop = paletteGQ[0];
  colPalatteBrdrBtm = paletteGQ[2];
  colPaletteTxt    = [paletteGQ[1]];
  header = [colPaletteTxt[0]];
  bodyText  = paletteGQ[2];
  valueText = paletteGQ[0];
}
if (logStyling === 6 || logStyling[0] === 6) {
  colPalatteBrdrTop = paletteGF[0];
  colPalatteBrdrBtm = paletteGF[4];
  colPaletteTxt     = paletteGF;
  header = [colPaletteTxt[0]];
  bodyText  = paletteGF[3];
  valueText = paletteGF[4];
}
if (logStyling === 7 || logStyling[0] === 7) {
  colPalatteBrdrTop = paletteNB[0];
  colPalatteBrdrBtm = paletteNB[3];
  colPaletteTxt     = paletteNB;
  header = [paletteNB[2]];
  bodyText  = paletteNB[3];
  valueText = paletteNB[0];
}
if (logStyling === 8 || logStyling[0] === 8) {
  colPalatteBrdrTop = palettePS[0];
  colPalatteBrdrBtm = palettePS[2];
  colPaletteTxt    = [palettePS[1]];
  header = [palettePS[0]];
  bodyText  = palettePS[2];
  valueText = palettePS[1];
}
if (logStyling === 9 || logStyling[0] === 9) {
  colPalatteBrdrTop = paletteA[0];
  colPalatteBrdrBtm = paletteA[3];
  colPaletteTxt     = [paletteA[2]];
  header = [paletteA[3]];
  bodyText  = paletteA[0];
  valueText = paletteA[2];
  footer = paletteA[1];
}
//#endregion

//#region Counter of SHAME!!! - AKA StatTrak
// oh my god this has very quickly become extremely stupidly overly complex thanks to Pleast asking for LGBTQ+ flag, furry, and twink styling options
if (!fs.existsSync("count.txt")) {
  fs.writeFileSync("count.txt", parseInt("0").toString());
}
let runAttempts = parseInt(fs.readFileSync("count.txt"));
runAttempts++;
fs.writeFileSync("count.txt", runAttempts.toString());
let _GIUText = `GIVE IT UP FOR RUN ` + runAttempts;
if (Array.isArray(logStyling)) {
  if (logStyling[1] === 621) {
    _GIUText = ` GIVE IT UP FOR RUN IN THE PARK #` + runAttempts +  `! `;
  }
}
if (!logStyling) {
  _GIUText = `GIVE IT UP FOR RUN ` + runAttempts;
}

// for loop to make gay rainbow shit
for (let i = 0; i < _GIUText.length; i++) {
  _GIURainbowText += colPaletteTxt[i % colPaletteTxt.length] + _GIUText[i];
}

// extend out borders and spacing if you fuck up too much and/or are a gay furry twink :3
let counterlogText = _GIURainbowText;
let theContentsOfMySkull = `  `;
let skillIssueExtension = ``;
let furryExtension = ``;
if (runAttempts > 9 && runAttempts <=99 ) {
  skillIssueExtension = `=`;
}
if (runAttempts > 99 && runAttempts <=999 ) {
  skillIssueExtension = `==`;
}
if (runAttempts > 999 && runAttempts <=9999 ) {
  skillIssueExtension = `===`;
}
if (Array.isArray(logStyling)) {
  if (logStyling[1] === 621) {
    counterlogText = ` \x1b[35m🐾` + _GIURainbowText + `\x1b[35m🐾`;
    furryExtension = `====================`;
    theContentsOfMySkull = ` `;
  }
}

console.log("");
console.log(`${bold}${colPalatteBrdrTop}${bgBlack}========================` + skillIssueExtension + furryExtension + `${reset}`);
if (!logStyling) {
  console.log(`  GIVE IT UP FOR RUN ` + runAttempts);
} else {
  console.log(`${bgBlack}` + theContentsOfMySkull + counterlogText +  `${reset}`);
}
console.log(`${bold}${colPalatteBrdrBtm}${bgBlack}========================` + skillIssueExtension + furryExtension + `${reset}`);
console.log("");
//#endregion

// Watermarking the info.dat so if something breaks people will know it's my stuff that touched it lol
// Also this is now just general info.dat handling ig lol
function _MawnteeTouchedMe() {
  // Set
  // Checks to make sure proper contexts exist
  if (!infoDat._customData) {
    infoDat._customData = {}
  }
  if (!infoDat._customData._editors) {
    infoDat._customData._editors = {}
  }
  if (!infoDat._customData._editors.MawnteesStinkyScript) {
    infoDat._customData._editors.MawnteesStinkyScript = {}
  }
    
  // Tell it what stats to write and where
  infoDat._customData._editors.MawnteesStinkyScript.version = `420.69.${scriptVer[0]}.621${scriptVer[1]}`
  infoDat._customData._editors.MawnteesStinkyScript.mawnteeTouchedMe = `${runAttempts} times`
  infoDat._customData._editors._lastEditedBy = "Mawntee's Stinky Script™" 
  // Handle requirements
  if (requirements){
    infoDat._difficultyBeatmapSets.forEach(difficultyBeatmapSet => {
      if (difficultyBeatmapSet._difficultyBeatmaps) {
          difficultyBeatmapSet._difficultyBeatmaps.forEach(beatmap => {
              if (beatmap._customData) {
                delete beatmap._customData._requirements;
                delete beatmap._customData._suggestions;
                beatmap._customData._requirements = requirements;
  }});}});} // happy skittles :}
  // Actually write the data
  fs.writeFileSync('Info.dat', JSON.stringify(infoDat, null, 4))
}
_MawnteeTouchedMe()


// customData structure setup:
difficulty.customData = difficulty.customData || {};
difficulty.customData.pointDefinitions  = difficulty.customData.pointDefinitions || {};
difficulty.customData.materials         = difficulty.customData.materials || {};
difficulty.customData.customEvents      = difficulty.customData.customEvents || [];
difficulty.customData.fakeColorNotes    = difficulty.customData.fakeColorNotes || [];
difficulty.customData.fakeBombNotes     = difficulty.customData.fakeBombNotes || [];
difficulty.customData.fakeObstacles     = difficulty.customData.fakeObstacles || [];
difficulty.customData.fakeBurstSliders  = difficulty.customData.fakeBurstSliders || [];
if (!clearEnv){
  difficulty.customData.environment = difficulty.customData.environment || [];
} else {
  difficulty.customData.environment = [];
}

// Beatmap Object Setup and Defines
const customData = difficulty.customData;
const notes = difficulty.colorNotes;
const bombs = difficulty.bombNotes; 
const obstacles = difficulty.obstacles;
const sliders = difficulty.sliders; 
const burstSliders = difficulty.burstSliders; 
const events = difficulty.basicBeatmapEvents;
const rotationEvents = difficulty.rotationEvents;
const customEvents = customData.customEvents;
const pointDefinitions = customData.pointDefinitions;
const environment = customData.environment;
const geometry = customData.environment.geometry;
const materials = customData.materials;
const fakeNotes = customData.fakeColorNotes;
const fakeBombs = customData.fakeBombNotes;
const fakeObstacles  = customData.fakeObstacles;
const fakeBurstSliders = customData.fakeBurstSliders;

let filteredNotes;
let filteredSliders;
let filteredBurstSliders;
let filteredEvents;
let filteredObstacles;
let filteredBombs;
let filteredFakeNotes
let filteredFakeBombs
let filteredFakeObstacles
let filteredFakeBurstSliders
let filteredObjects;

notes.forEach(note => {
  if (!note.customData && AddCustomData) {
    note.customData = {};
  }
});
bombs.forEach(bomb => {
  if (!bomb.customData && AddCustomData) {
    bomb.customData = {};
  }
});
sliders.forEach(slider => {
  if (!slider.customData && AddCustomData) {
    slider.customData = {};
  }
});
burstSliders.forEach(burstSlider => {
  if (!burstSlider.customData && AddCustomData) {
    burstSlider.customData = {};
  }
});
obstacles.forEach(wall => {
  if (!wall.customData && AddCustomData) {
    wall.customData = {};
  }
});
fakeNotes.forEach(fNote => {
  if (!fNote.customData && AddCustomData) {
    fNote.customData = {};
  }
});
fakeBombs.forEach(fBomb => {
  if (!fBomb.customData && AddCustomData) {
    fBomb.customData = {};
  }
});
fakeObstacles.forEach(fWall => {
  if (!fWall.customData && AddCustomData) {
    fWall.customData = {};
  }
});
fakeBurstSliders.forEach(fBurstSlider => {
  if (!fBburstSlider.customData && AddCustomData) {
    fBurstSlider.customData = {};
  }
});
if (!environment.geometry) {
  environment.geometry = {};
}

// buncha random defines to be used later by the shit below
var _JDist         = undefined;
var _baseJDist     = undefined;           
var _HJDist        = undefined;
var _baseHJDist    = undefined;       
var _DesiredDist   = undefined;
var _baseDesDist   = undefined;    
var _PANIKDist     = undefined;
var _basePANIKDist = undefined;  
var _animOffset    = undefined;
var _animBeat      = 0;
var lastAnimBeat   = 0;
var dynDesiredRT   = desiredRT;
var baseRT         = undefined;
var baseHRT        = undefined;
var minRT          = undefined;
var trackLogShown  = false;

// --- Initial settings baking // forcing of everything that other mods could possibly break ----------------------------------------------
if(CringeFix) {
  
  if (Array.isArray(logStyling)) {
    if (logStyling[1] === 621) {
      console.log(`${valueText}${bold}   . ${bodyText}~${valueText} · ${bodyText}=${valueText} * ${bodyText}~=~${valueText} - ${bodyText}♥${valueText} - ${bodyText}~=~${valueText} * ${bodyText}=${valueText} · ${bodyText}~${valueText} .${reset}`);
      console.log(`${footer}${bold} ~ 🎀  ${footer}ＭＡＰＰＥＲ ＭＵＺＺＬＥ  🎀 ~${reset}`);
      console.log(`${valueText}${bold}   ¯ ${bodyText}-${valueText} · ${bodyText}♥${valueText} · ${bodyText}~=~=~${valueText} - ${bodyText}~=~=~${valueText} · ${bodyText}♥${valueText} · ${bodyText}-${valueText} ¯${reset}`);
    }
  } else {
    console.log(`${valueText}${bold}-------------------------${reset}`);
    console.log(`${footer}${bold}    Cringe Prevention      ${reset}`);
    console.log(`${valueText}${bold}-------------------------${reset}`);
  }
  console.log('');
  if (hideNJSOffsLogs || hideScalingLogs){
    console.log(`${black} One or more CringeFix™ logs have been disabled. ${reset}`); 
    console.log(`${black} Only important warnings will be shown below. ${reset}`);
    console.log('');
  }
  
}

// ---- NJS/JD Handling ----
function preventCRINGE_OffsNJS(NJS, offset) {
  if (!hideNJSOffsLogs) {
  console.log(`${header}${bold}Forced NJS/Offset Values:${reset}`);
  }
  if (NJS === undefined || offset === undefined) {
    // Lookup values from info.dat
    function getNJSAndOffset(info, outputFilename) {
      for (let beatmapSet of info._difficultyBeatmapSets) {
          for (let beatmap of beatmapSet._difficultyBeatmaps) {
              if (beatmap._beatmapFilename === outputFilename) {
                  return {
                      NJS: beatmap._noteJumpMovementSpeed,
                      offset: beatmap._noteJumpStartBeatOffset
                  };
              }
          }
      }
      // return null if difficulty data isn't found
      return null;
    }
    const offsNJS = getNJSAndOffset(infoDat, OUTPUT);
    if (offsNJS) {
        if (!hideNJSOffsLogs) {console.log(`${footer} Pulling NJS/Offset from info.dat${reset}`);}
        if (NJS === undefined) {
          NJS = offsNJS.NJS;
        }
        if (offset === undefined) {
          offset = offsNJS.offset;
        }
    } else {
        if (NJS === undefined && offset === undefined) {
          if (ForceJD === true && ForceNJS === true) {
            NJS = 18;
            offset = 0;
            console.log(` ${yellow}${bold}WARNING: ${reset}${red}Difficulty data not found and no NJS/offset values specified. Defaulting NJS to ${valueText}18${red} and offset to ${valueText}0${reset}`);
            console.log("");
          }
        } else if (NJS === undefined) {
          if (ForceNJS === true) {
            NJS = 18;
            console.log(` ${yellow}${bold}WARNING: ${reset}${red}Difficulty data not found and no NJS value specified. Defaulting NJS to ${valueText}18${reset}`);
            console.log("");
          }
        } else if (offset === undefined) {
          if (ForceJD === true) {
            offset = 0;
            console.log(` ${yellow}${bold}WARNING: ${reset}${red}Difficulty data not found and no offset value specified. Defaulting offset to ${valueText}0${reset}`);
            console.log("");
          }
        }
    }
  }

  if (ForceNJS === false) {
    if (!hideNJSOffsLogs) {console.log(`${bodyText} - NJS not forced${reset}`);}
  } else {
    notes.forEach(note => {
      if (!note.customData.noteJumpMovementSpeed) {
      note.customData.noteJumpMovementSpeed = NJS;
      }
    });
    burstSliders.forEach(burstSliders => {
      if (!burstSliders.customData.noteJumpMovementSpeed) {
      burstSliders.customData.noteJumpMovementSpeed = NJS;
      }
    });
    sliders.forEach(sliders => {
      if (!sliders.customData.noteJumpMovementSpeed) {
      sliders.customData.noteJumpMovementSpeed = NJS;
      }
    });
    bombs.forEach(bombs => {
      if (!bombs.customData.noteJumpMovementSpeed) {
      bombs.customData.noteJumpMovementSpeed = NJS;
      }
    });
    obstacles.forEach(obstacles => {
      if (!obstacles.customData.noteJumpMovementSpeed) {
      obstacles.customData.noteJumpMovementSpeed = NJS;
      }
    });
    if (!hideNJSOffsLogs) {console.log(`${bodyText} - Jump speed of all unset objects set to:`  + ` ${valueText}`+ NJS + ` njs${reset}`);}
    }
  
  if (ForceJD === false) {
    if (!hideNJSOffsLogs) {console.log(`${bodyText} - JD not forced`)}
  } else {
    notes.forEach(note => {
      if (!note.customData.noteJumpStartBeatOffset) {
      note.customData.noteJumpStartBeatOffset = offset;
      }
    });
    burstSliders.forEach(burstSliders => {
      if (!burstSliders.customData.noteJumpStartBeatOffset) {
      burstSliders.customData.noteJumpStartBeatOffset = offset;
      }
    });
    sliders.forEach(sliders => {
      if (!sliders.customData.noteJumpStartBeatOffset) {
      sliders.customData.noteJumpStartBeatOffset = offset;
      }
    });
    bombs.forEach(bombs => {
      if (!bombs.customData.noteJumpStartBeatOffset) {
      bombs.customData.noteJumpStartBeatOffset = offset;
      }
    });
    obstacles.forEach(obstacles => {
      if (!obstacles.customData.noteJumpStartBeatOffset) {
      obstacles.customData.noteJumpStartBeatOffset = offset;
      }
    });
    if (!hideNJSOffsLogs) {
      console.log(`${bodyText} - Spawn offset of all unset objects set to:`  + ` ${valueText}`+ offset + `${reset}`);
    }
  }
  if (!hideNJSOffsLogs) {console.log("");}
  return (offset, NJS);
}
// ---- BS+ / Adaptable Notes Fixing ----
function preventCRINGE_Scaling(ForceNoteScale, ForceBombScale) {
  let tracks
  let scale = [[1,1,1], [1,1,1]];
  if (ForceNoteScale || ForceBombScale) {
    if (!hideScalingLogs) {console.log(`${header}${bold}Forced Scaling Values:${reset}`);}
  }
  // assign scaling
  if(Array.isArray(ForceNoteScale)) {
    scale[0] = ForceNoteScale;
  }
  if(Array.isArray(ForceBombScale)) {
    scale[1] = ForceBombScale;
  }

  // assign tracks
  if (ForceNoteScale && !ForceBombScale) {
    trackOnNotesBetween("mwt_NSF",0,69420621);
    trackOnFakeNotesBetween("mwt_NSF",0,69420621);
    trackOnChainsBetween("mwt_NSF",0,69420621);
    trackOnFakeChainsBetween("mwt_NSF",0,69420621);
    tracks = "mwt_NSF"
    if (!hideScalingLogs) {
      console.log(`${bodyText} - Note scale set to: ${valueText}[${scale[0]}]${reset}`);
      console.log(`${bodyText} - Bomb scale not forced!${reset}`);}
  }
  if (ForceNoteScale && ForceBombScale) {
    trackOnNotesBetween("mwt_NSF",0,69420621);
    trackOnFakeNotesBetween("mwt_NSF",0,69420621);
    trackOnChainsBetween("mwt_NSF",0,69420621);
    trackOnFakeChainsBetween("mwt_NSF",0,69420621);
    trackOnBombsBetween("mwt_BSF",0,69420621);
    trackOnFakeBombsBetween("mwt_BSF",0,69420621);
    tracks = ["mwt_NSF", "mwt_BSF"]
    if (!hideScalingLogs) {
      console.log(`${bodyText} - Note scale set to: ${valueText}[${scale[0]}]${reset}`);
      console.log(`${bodyText} - Bomb scale set to: ${valueText}[${scale[1]}]${reset}`);
    }
  }
  if (!ForceNoteScale && ForceBombScale) {
    trackOnBombsBetween("mwt_BSF",0,69420621);
    trackOnFakeBombsBetween("mwt_BSF",0,69420621);
    tracks = "mwt_BSF"
    if (!hideScalingLogs) {
      console.log(`${bodyText} - Note scale not forced!${reset}`);
      console.log(`${bodyText} - Bomb scale set to: ${valueText}[${scale[1]}]${reset}`);
    }
  }
  
  //create event
  if (ForceNoteScale || ForceBombScale) {
    if (!hideScalingLogs) {
      console.log(`${bodyText} - AnimateTrack event created on beat '0' with track ID(s): ${valueText}[${tracks}]${reset}`);
      console.log();}
    if (ForceNoteScale === ForceBombScale) {
      customEvents.push({
        b: 0,
        t: "AnimateTrack",
        d: {
          track: tracks,
          scale: [[scale[0][0],scale[0][1],scale[0][2], 0]],
        }
      });
    } else {
      customEvents.push({
        b: 0,
        t: "AnimateTrack",
        d: {
          track: tracks[0],
          scale: [[scale[0][0],scale[0][1],scale[0][2], 0]],
        }
      },{
        b: 0,
        t: "AnimateTrack",
        d: {
          track: tracks[1],
          scale: [[scale[1][0],scale[1][1],scale[1][2], 0]],
        }
      });
    }
  }
}
// Apply Fixes
if (CringeFix === true) {
  let _NJS = undefined;
  let _offs = undefined;
  if (typeof ForceNJS === "number") {
    _NJS = ForceNJS;
  }
  if (typeof ForceJD === "number") {
    _offs = ForceJD;
  }
  preventCRINGE_OffsNJS(_NJS,_offs);
  preventCRINGE_Scaling(ForceNoteScale, ForceBombScale)
} else {
  console.log(`${brRed}WARNING: CringeFix™ is disabled: Mods such as JDFixer or BeatSaberPlus might drastically alter your intended gameplay vibes depending on the players config${reset}`)
}


//#endregion
//#region ========= HELPER FUNCTIONS ========= 

/*===========================================================
These are designed with varying levels of complexity.
Some have easy to understand but otherwise "poor" practices,
while others have arguably better ways of doing things, but
might be a bit more difficult to understand at first glance.

PLEASE take some time to study them, see how they work, and 
try your best to reverse engineer/adapt them to your project!
(you might be rewarded with significantly better workflows)

If you make anything cool or extremely useful, send it to me
over Discord (link at top) so I can add it in for everyone!
=============================================================
To use any of the functions, simply type in the function
name, followed by an opening curve bracket --> rnd(1, 5);

You will then see a pop up showing the available parameters.
============================================================*/

// ---- Generic Functions ----
/**
 * Returns a random value (no decimals) 
 * between {@link min} and {@link max}.
 *
 * Third value is for an optional {@link seed}. (yes, just like in minecraft)
 *
 * - set this for consistet outputs between runs.
 * @param min int - Min value
 * @param max int - Max value
 * @param seed (optional) numerical seed
 */
function rnd(min, max, seed = null) {
  // Default random number generator
  if (seed === null) {
    return Math.floor(Math.random() * (max - min)) + min;
  } else {
  // Optional seeded random number generator --> for consistent values between multiple runs
    const seedRandom = (seed) => {
      const a = 1664525;
      const c = 1013904223;
      const m = 2 ** 32;
      seed = (a * seed + c) % m;
      return seed / m;
    };
  // Output
    return Math.floor(seedRandom(seed) * (max - min)) + min;
  }
}
/**
 * Returns a random float value (w/ decimals)
 * between {@link min} and {@link max}.
 *
 * - float/decimal precision is based on above input/output precision setup
 * 
 * Third value is for an optional {@link seed}. (yes, just like in minecraft)
 *
 * - set this for consistet outputs between runs.
 * @param min number - Min value
 * @param max number - max value
 * @param seed (optional) numerical seed
 */
function rndf(min, max, seed = null) {
  let randomValue;
  if (seed === null) {
    // Default random number generator
    randomValue = Math.random();
  } else {
    // Optional seeded random number generator --> for consistent values between multiple runs
    const seedRandom = (seed) => {
      const a = 1664525;
      const c = 1013904223;
      const m = 2 ** 32;
      seed = (a * seed + c) % m;
      return seed / m;
    };
  
    randomValue = seedRandom(seed);
  }
  randomValue = randomValue * (max - min) + min;
  const factor = Math.pow(10, precision);
  randomValue = Math.round(randomValue * factor) / factor;
  return randomValue;
}
function shuffleArray(array, seed = null) {
for (let i = array.length - 1; i > 0; i--) {
    const j = rnd(0, i + 1, seed); // Random index from 0 to i
    [array[i], array[j]] = [array[j], array[i]]; // Swap elements
}
return array;
}
/**
 *
 *Interpolates between {@link a} and {@link b} based on {@link t}.
 *
 * Example:
 *```js
 *lerp(1, 3, 0) // 1
 *lerp(1, 3, 1) // 3
 *lerp(1, 3, 0.5) // 2
 *```
 *@param a number - The starting value.
 *@param b number - The ending value.
 *@param t float - The percentage between {@link a} and {@link b}
 */
function lerp(a, b, t) {
  return a * (1 - t) + b * t;
}
/** Rounds decimal precision to whatever {@link value} is input.*/
function round(value, decimals) {
  const factor = Math.pow(10, decimals);
  return Math.round(value * factor) / factor;
}
/** Similar to the notes filter function, but just grabs notes on a specific singular beat. */
function notesAt(times) {
  return notes.filter(n => times.some(t => n.b == t));
}
/**
 * Generates a bunch of coords for a circle, scaled for the note grid.
 *
 * - {@link n} is amount of sample points
 * - {@link acc} decimal precion accuracy, will use default specified in the above setup if left as undefined
 * 
 * Example:
 *```js
 *genCircle(3, 5);
 *```
 *returns
 *```js
 *[
 *  [ 2.5, -1.6 ],
 *  [ 0.42705098312484235, 1.7096766767071339 ],
 *  [ -2.927050983124842, 0.44549267797780656 ],
 *  [ -2.9270509831248424, -3.6454926779778063 ],
 *  [ 0.4270509831248417, -4.909676676707134 ]
 *]
 *```
 * @param radius float - Radius of the circle
 * @param n float - Amount of sample points
 * @param acc float - Decimal precision accuracy --> Adjust if circle gets scrungkly
 */
function genCircle(radius, n, acc = null) {
  // Use global precision if accuracy isn't defined
  if (acc === null) {
    acc = precision;
  }
  const factor = Math.pow(10, acc);  // rounding
  let pointss = [];
  for (let i = 0; i < n; i++) {
    let x = radius * Math.cos(((2 * Math.PI) / n) * i) - 0.5;
    let y = radius * Math.sin(((2 * Math.PI) / n) * i) * 1.16 - 1.6;
    x = Math.round(x * factor) / factor;  // rounding pt.2
    y = Math.round(y * factor) / factor;  // rounding pt.2
    pointss.push([x, y]);
  }
  return pointss;
}
/**
 * Generates a bunch of coords for a circle, scaled in standard meters.
 *
 * - {@link n} is amount of sample points
 * 
 * Example:
 *```js
 *genCircle(3, 5);
 *```
 *returns
 *```js
 *[
 *  [ 2.5, -1.6 ],
 *  [ 0.42705098312484235, 1.7096766767071339 ],
 *  [ -2.927050983124842, 0.44549267797780656 ],
 *  [ -2.9270509831248424, -3.6454926779778063 ],
 *  [ 0.4270509831248417, -4.909676676707134 ]
 *]
 *```
 * @param radius float - Radius of the circle
 * @param n float - Amount of sample points
 */
function genCircleNoCorrection(radius, n, acc = null) {
  // Use global precision if accuracy isn't defined
  if (acc === null) {
    acc = precision;
  }
  let pointss = [];
  for (let i = 0; i < n; i++) {
    let x = radius * Math.cos(((2 * Math.PI) / n) * i);
    let y = radius * Math.sin(((2 * Math.PI) / n) * i);
    pointss.push([round(x, acc), round(y, acc)]);
  }
  return pointss;
}
function snapToIncrement(value, increment) { 
  return Math.round(value / increment) * increment;
}


// ---- Basic Offset/NJS Adjustments ----
/**
 * Sets spawn distance offset (JD) of all notes, arcs, and chains
 * between {@link start} and {@link end}.
 * 
 * - does not affect bombs
 * 
 * @param start start beat
 * @param end end beat
 * @param offsetR red/left note spawn distance offset
 * @param offsetB blue/right note spawn distance offset
 */
function offestNotesBetweenRBSep(start, end, offsetR, offsetB ) {
  filteredNotes = notes.filter(n => n.b >= start && n.b <= end);
  filteredNotes.forEach(note => {
    if (note.c == 0) {
      note.customData.noteJumpStartBeatOffset = offsetR;
    }
    if (note.c == 1) {
      note.customData.noteJumpStartBeatOffset = offsetB;
    }
  });
  filteredSliders = sliders.filter(n => n.b >= start && n.b <= end);
  filteredSliders.forEach(sliders => {
    if (sliders.c == 0) {
      sliders.customData.noteJumpStartBeatOffset = offsetR;
    }
    if (sliders.c == 1) {
      sliders.customData.noteJumpStartBeatOffset = offsetB;
    }
  });
  filteredBurstSliders = burstSliders.filter(n => n.b >= start && n.b <= end);
  filteredBurstSliders.forEach(burstSliders => {
    if (burstSliders.c == 0) {
      burstSliders.customData.noteJumpStartBeatOffset = offsetR;
    }
    if (burstSliders.c == 1) {
      burstSliders.customData.noteJumpStartBeatOffset = offsetB;
    }
  });
  return filteredBurstSliders && filteredNotes;
}
/**
 * Sets spawn distance (JD) and note jump speed (NJS) of all notes, bombs, arcs, and chains
 * between {@link p1} and {@link p2}.
 * @param p1 start beat
 * @param p2 end beat
 * @param NJS note jump speed
 * @param offset spawn distance offset
 */
function offsetNJSOnNotesBetween(p1, p2, NJS, offset, updateDesieredRT = undefined) {
  filteredNotes = notes.filter(n => n.b >= p1 && n.b <= p2);
  filteredNotes.forEach(note => {
      note.customData.noteJumpStartBeatOffset = offset;
      note.customData.noteJumpMovementSpeed = NJS;
  });
  filteredBurstSliders = burstSliders.filter(n => n.b >= p1 && n.b <= p2);
  filteredBurstSliders.forEach(burstSliders => {
    burstSliders.customData.noteJumpStartBeatOffset = offset;
    burstSliders.customData.noteJumpMovementSpeed = NJS;
  });
  filteredSliders = sliders.filter(s => s.b >= p1 && s.b <= p2);
  filteredSliders.forEach(sliders => {
    sliders.customData.noteJumpStartBeatOffset = offset;
    sliders.customData.noteJumpMovementSpeed = NJS;
  });
  filteredBombs = bombs.filter(b => b.b >= p1 && s.b <= p2);
  filteredBombs.forEach(bombs => {
    bombs.customData.noteJumpStartBeatOffset = offset;
    bombs.customData.noteJumpMovementSpeed = NJS;
  });

  // update guides
  if(showRTGuides && autoAdjRTGuides ){
    if (updateDesieredRT === undefined) {
      updateDesieredRT = dynDesiredRT;
    }
    adjustDynRTGuides(p1, NJS, offset, updateDesieredRT);
  }

  return filteredBombs && filteredSliders && filteredBurstSliders && filteredNotes;
}
/**
 * Sets spawn distance (JD) and note jump speed (NJS) of all playable objects
 * between {@link p1} and {@link p2}.
 * @param p1 start beat
 * @param p2 end beat
 * @param NJS note jump speed
 * @param offset spawn distance offset
 */
function offsetNJSOnAllBetween(p1, p2, NJS, offset, updateDesieredRT = undefined) {
  filteredNotes = notes.filter(n => n.b >= p1 && n.b <= p2);
  filteredNotes.forEach(note => {
      note.customData.noteJumpStartBeatOffset = offset;
      note.customData.noteJumpMovementSpeed = NJS;
  });
  filteredBurstSliders = burstSliders.filter(a => a.b >= p1 && a.b <= p2);
  filteredBurstSliders.forEach(burstSliders => {
    burstSliders.customData.noteJumpStartBeatOffset = offset;
    burstSliders.customData.noteJumpMovementSpeed = NJS;
  });
  filteredSliders = sliders.filter(s => s.b >= p1 && s.b <= p2);
  filteredSliders.forEach(sliders => {
    sliders.customData.noteJumpStartBeatOffset = offset;
    sliders.customData.noteJumpMovementSpeed = NJS;
  });
  filteredBombs = bombs.filter(b => b.b >= p1 && b.b <= p2);
  filteredBombs.forEach(bombs => {
    bombs.customData.noteJumpStartBeatOffset = offset;
    bombs.customData.noteJumpMovementSpeed = NJS;
  });
  filteredObstacles = obstacles.filter(o => o.b >= p1 && o.b <= p2);
  filteredObstacles.forEach(obstacles => {
    obstacles.customData.noteJumpStartBeatOffset = offset;
    obstacles.customData.noteJumpMovementSpeed = NJS;
  });

  // update guides
  if(showRTGuides && autoAdjRTGuides ){
    if (updateDesieredRT === undefined) {
      updateDesieredRT = dynDesiredRT;
    }
    adjustDynRTGuides(p1, NJS, offset, updateDesieredRT);
  }

  return filteredObstacles && filteredBombs && filteredSliders && filteredBurstSliders && filteredNotes;
}

// ---- Tracking Functions ----
/**
 * Safely applies new {@link track} id(s) to any notes
 * between {@link p1} and {@link p2}.
 *
 * - will not overwrite old track names
 * 
 * - {@link track} can be a single "string" or an ["array", "of", "strings"]
 * @param track "string" - Track ID
 * @param p1 start beat
 * @param p2 end beat
 */
function trackOnNotesBetween(track, p1, p2) {
  filteredNotes = notes.filter(n => n.b >= p1 && n.b <= p2);
  filteredNotes.forEach(note => {
    if (!note.customData.track) {
    note.customData.track = track;
    } else {
      if(Array.isArray(note.customData.track)) {
        note.customData.track.push(track);
      }
      else {
        let prevTrack = note.customData.track;
        note.customData.track = [prevTrack];
        note.customData.track.push(track);
      }
    }
  });
  return filteredNotes;
}
function trackOnFakeNotesBetween(track, p1, p2) {
  filteredFakeNotes = fakeNotes.filter(fn => fn.b >= p1 && fn.b <= p2);
  filteredFakeNotes.forEach(fnote => {
    if (!fnote.customData.track) {
      fnote.customData.track = track;
    } else {
      if(Array.isArray(fnote.customData.track)) {
        fnote.customData.track.push(track);
      }
      else {
        let prevTrack = fnote.customData.track;
        fnote.customData.track = [prevTrack];
        fnote.customData.track.push(track);
      }
    }
  });
  return filteredFakeNotes;
}
function trackOnBombsBetween(track, p1, p2) {
  filteredBombs = bombs.filter(b => b.b >= p1 && b.b <= p2);
  filteredBombs.forEach(bomb => {
    if (!bomb.customData.track) {
      bomb.customData.track = track;
    } else {
      if(Array.isArray(bomb.customData.track)) {
        bomb.customData.track.push(track);
      }
      else {
        let prevTrack = bomb.customData.track;
        bomb.customData.track = [prevTrack];
        bomb.customData.track.push(track);
      }
    }
  });
  return filteredBombs;
}
function trackOnFakeBombsBetween(track, p1, p2) {
  filteredFakeBombs = fakeBombs.filter(fb => fb.b >= p1 && fb.b <= p2);
  filteredFakeBombs.forEach(fbomb => {
    if (!fbomb.customData.track) {
      fbomb.customData.track = track;
    } else {
      if(Array.isArray(fbomb.customData.track)) {
        fbomb.customData.track.push(track);
      }
      else {
        let prevTrack = fbomb.customData.track;
        fbomb.customData.track = [prevTrack];
        fbomb.customData.track.push(track);
      }
    }
  });
  return filteredFakeBombs;
}
function trackOnChainsBetween(track, p1, p2) {
  filteredBurstSliders = burstSliders.filter(bs => bs.b >= p1 && bs.b <= p2);
  filteredBurstSliders.forEach(chain => {
    if (!chain.customData.track) {
      chain.customData.track = track;
    } else {
      if(Array.isArray(chain.customData.track)) {
        chain.customData.track.push(track);
      }
      else {
        let prevTrack = chain.customData.track;
        chain.customData.track = [prevTrack];
        chain.customData.track.push(track);
      }
    }
  });
  return filteredBurstSliders;
}
function trackOnFakeChainsBetween(track, p1, p2) {
  filteredFakeBurstSliders = fakeBurstSliders.filter(fbs => fbs.b >= p1 && fbs.b <= p2);
  filteredFakeBurstSliders.forEach(fchain => {
    if (!fchain.customData.track) {
      fchain.customData.track = track;
    } else {
      if(Array.isArray(fchain.customData.track)) {
        fchain.customData.track.push(track);
      }
      else {
        let prevTrack = fchain.customData.track;
        fchain.customData.track = [prevTrack];
        fchain.customData.track.push(track);
      }
    }
  });
  return filteredFakeBurstSliders;
}
/**
 * Safely applies new {@link track} id(s) to any notes
 * between {@link p1} and {@link p2} based on left/right hand.
 *
 * - unique track names for red and blue (left/right) notes
 * 
 * - will not overwrite old track names
 * 
 * - {@link track} can be a single "string" or an ["array", "of", "strings"]
 * @param trackR "string" - Track ID (red/left)
 * @param trackB "string" - Track ID (blue/right)
 * @param p1 start beat
 * @param p2 end beat
 */
function trackOnNotesBetweenRBSep(trackR, trackB, p1, p2) {
  filteredNotes = notes.filter(n => n.b >= p1 && n.b <= p2);
  filteredNotes.forEach(note => {
  if (!note.customData.track) {
    if (note.c == 0) {
      note.customData.track = trackR;
    }
    if (note.c == 1) {
      note.customData.track = trackB;
    }
  }
  else {
    if(Array.isArray(note.customData.track)) {
      if (note.c == 0) {
      note.customData.track.push(trackR);
      }
      if (note.c == 1) {
        note.customData.track.push(trackB);
      }
    }
    else {
      let prevTrack = note.customData.track;
      note.customData.track = [prevTrack];
      if (note.c == 0) {
        note.customData.track.push(trackR);
        }
      if (note.c == 1) {
        note.customData.track.push(trackB);
      }
    }
  }
  });
  return filteredNotes;
}
function trackOnArcsBetweenRBSep(trackR, trackB, p1, p2) {
  filteredSliders = sliders.filter(s => s.b >= p1 && s.b <= p2);
  filteredSliders.forEach(arc => {
  if (!arc.customData.track) {
    if (arc.c == 0) {
      arc.customData.track = trackR;
    }
    if (arc.c == 1) {
      arc.customData.track = trackB;
    }
  }
  else {
    if(Array.isArray(arc.customData.track)) {
      if (arc.c == 0) {
        arc.customData.track.push(trackR);
      }
      if (arc.c == 1) {
        arc.customData.track.push(trackB);
      }
    }
    else {
      let prevTrack = arc.customData.track;
      arc.customData.track = [prevTrack];
      if (arc.c == 0) {
        arc.customData.track.push(trackR);
        }
      if (arc.c == 1) {
        arc.customData.track.push(trackB);
      }
    }
  }
  });
  return filteredSliders;
}
// smooth brain method of assigning multiple tracks --> see next function for a better solution
/**
 * Safely applies new track id(s) to any notes
 * between {@link p1} and {@link p2}, based on cut direction.
 *
 * - unique track names for each cut direction
 * 
 * - will not overwrite old track names
 * 
 * - tracks can be a single "string" or an ["array", "of", "strings"]
 * 
 * - try exploring this function directly to find an easier method of doing this ;)
 * @param p1 start beat
 * @param p2 end beat
 * @param trackUp  "string" - trackUp
 * @param trackDown "string" - trackDown
 * @param trackLeft "string" - trackLeft
 * @param trackRight "string" - trackRight
 * @param trackUpLeft "string" - trackUpLeft
 * @param trackUpRight "string" - trackUpRight
 * @param trackDownLeft "string" - trackDownLeft
 * @param trackDownRight "string" - trackDownRight
 * @param trackDot "string" - trackDot
 */
function trackOnNotesBetweenDirSep2( p1, p2, trackUp, trackDown, trackLeft, trackRight, trackUpLeft, trackUpRight, trackDownLeft, trackDownRight, trackDot) {
  filteredNotes = notes.filter(n => n.b >= p1 && n.b <= p2);
  filteredNotes.forEach(note => {
    if (!note.customData.track) {
      if (note.d == 0) {
        note.customData.track = trackUp;
      }
      if (note.d == 1) {
        note.customData.track = trackDown;
      }
      if (note.d == 2) {
        note.customData.track = trackLeft;
      }
      if (note.d == 3) {
        note.customData.track = trackRight;
      }
      if (note.d == 4) {
        note.customData.track = trackUpLeft;
      }
      if (note.d == 5) {
        note.customData.track = trackUpRight;
      }
      if (note.d == 6) {
        note.customData.track = trackDownLeft;
      }
      if (note.d == 7) {
        note.customData.track = trackDownRight;
      }
      if (note.d == 8) {
        note.customData.track = trackDot;
      }
  }
  else {
    if(Array.isArray(note.customData.track)) {
      if (note.d == 0) {
        note.customData.track.push(trackUp);
      }
      if (note.d == 1) {
        note.customData.track.push(trackDown);
      }
      if (note.d == 2) {
        note.customData.track.push(trackLeft);
      }
      if (note.d == 3) {
        note.customData.track.push(trackRight);
      }
      if (note.d == 4) {
        note.customData.track.push(trackUpLeft);
      }
      if (note.d == 5) {
        note.customData.track.push(trackUpRight);
      }
      if (note.d == 6) {
        note.customData.track.push(trackDownLeft);
      }
      if (note.d == 7) {
        note.customData.track.push(trackDownRight);
      }
      if (note.d == 8) {
        note.customData.track.push(trackDot);
      }
    }
    else {
      let prevTrack = note.customData.track;
      note.customData.track = [prevTrack];
      if (note.d == 0) {
        note.customData.track.push(trackUp);
      }
      if (note.d == 1) {
        note.customData.track.push(trackDown);
      }
      if (note.d == 2) {
        note.customData.track.push(trackLeft);
      }
      if (note.d == 3) {
        note.customData.track.push(trackRight);
      }
      if (note.d == 4) {
        note.customData.track.push(trackUpLeft);
      }
      if (note.d == 5) {
        note.customData.track.push(trackUpRight);
      }
      if (note.d == 6) {
        note.customData.track.push(trackDownLeft);
      }
      if (note.d == 7) {
        note.customData.track.push(trackDownRight);
      }
      if (note.d == 8) {
        note.customData.track.push(trackDot);
      }
    }
  }
  });
  return filteredNotes;
}
/**
 * Safely applies new track id(s) to any notes
 * between {@link p1} and {@link p2}, based on cut direction.
 * 
 * - will not overwrite old track names
 * 
 * - tracks can be a single "string" or an ["array", "of", "strings"]
 *
 * @param p1 start beat
 * @param p2 end beat
 * @param track  "string" - input track name
 */
function trackOnNotesBetweenDirSep(p1, p2, track) {
  const directionSuffixMap = [
    '_U',  '_D',  '_L',  '_R',  // Up, Down, Left, Right
    '_UL', '_UR', '_DL', '_DR', // Up-Left, Up-Right, Down-Left, Down-Right
    '_Dot' // Dot
  ];
  if(showGeneratedTracks) {
    console.log(`${header}${bold} Directional tracks created between [${valueText}${p1}${header}] and [${valueText}${p2}${header}]:${reset}`);
    console.log(`${bodyText}  New track ID's are formatted as:${reset}`);
    console.log(`${footer}  - Down    = "${valueText}${track}_D"${reset}`);
    console.log(`${footer}  - Up-Left = "${valueText}${track}_UL"${reset}`);
    console.log(`${footer}  - Dot     = "${valueText}${track}_Dot"${reset}`);
    console.log(`${footer}  - etc.${reset}`);
  }
  filteredNotes = notes.filter(n => n.b >= p1 && n.b <= p2);
  filteredNotes.forEach(note => {
    const trackSuffix = directionSuffixMap[note.d];
    const trackName = `${track}${trackSuffix}`;
    if (!note.customData.track) {
      note.customData.track = trackName;
    } else if (Array.isArray(note.customData.track)) {
      note.customData.track.push(trackName);
    } else {
      note.customData.track = [note.customData.track, trackName];
    }
  });
  return filteredNotes;
}

/**
 * Safely applies new track id(s) to any notes/chains/arcs/bombs
 * between {@link p1} and {@link p2}, based on cut direction.
 * 
 * - will not overwrite old track names
 * 
 * - tracks can be a single "string" or an ["array", "of", "strings"]
 *
 * @param p1 start beat
 * @param p2 end beat
 * @param track  "string" - input track name
 */
function trackOnAllBetweenDirSep(p1, p2, track) {
  const directionSuffixMap = [
    '_U',  '_D',  '_L',  '_R',  // Up, Down, Left, Right
    '_UL', '_UR', '_DL', '_DR', // Up-Left, Up-Right, Down-Left, Down-Right
    '_Dot' // Dot
  ];
  if(showGeneratedTracks) {
    console.log(`${header}${bold} Directional tracks created between [${valueText}${p1}${header}] and [${valueText}${p2}${header}]:${reset}`);
    console.log(`${bodyText}  New track ID's are formatted as:${reset}`);
    console.log(`${footer}  - Down    = "${valueText}${track}_D"${reset}`);
    console.log(`${footer}  - Up-Left = "${valueText}${track}_UL"${reset}`);
    console.log(`${footer}  - Dot     = "${valueText}${track}_Dot"${reset}`);
    console.log(`${footer}  - etc.${reset}`);
  }
  filteredNotes = notes.filter(n => n.b >= p1 && n.b <= p2);
  filteredNotes.forEach(note => {
    const trackSuffix = directionSuffixMap[note.d];
    const trackName = `${track}${trackSuffix}`;
    if (!note.customData.track) {
      note.customData.track = trackName;
    } else if (Array.isArray(note.customData.track)) {
      note.customData.track.push(trackName);
    } else {
      note.customData.track = [note.customData.track, trackName];
    }
  });
  filteredBurstSliders = burstSliders.filter(bs => bs.b >= p1 && bs.b <= p2);
  filteredBurstSliders.forEach(chain => {
    const trackSuffix = directionSuffixMap[chain.d];
    const trackName = `${track}${trackSuffix}`;
    if (!chain.customData.track) {
      chain.customData.track = trackName;
    } else if (Array.isArray(chain.customData.track)) {
      chain.customData.track.push(trackName);
    } else {
      chain.customData.track = [chain.customData.track, trackName];
    }
  });
  filteredSliders = sliders.filter(s => s.b >= p1 && s.b <= p2);
  filteredSliders.forEach(arc => {
    const trackSuffix = directionSuffixMap[arc.d];
    const trackName = `${track}${trackSuffix}`;
    if (!arc.customData.track) {
      arc.customData.track = trackName;
    } else if (Array.isArray(arc.customData.track)) {
      arc.customData.track.push(trackName);
    } else {
      arc.customData.track = [arc.customData.track, trackName];
    }
  });
  filteredBombs = bombs.filter(b => b.b >= p1 && b.b <= p2);
  filteredBombs.forEach(bomb => {
    if (!bomb.customData.track) {
      bomb.customData.track = track;
    } else if (Array.isArray(bomb.customData.track)) {
      bomb.customData.track.push(track);
    } else {
      bomb.customData.track = [bomb.customData.track, track];
    }
  });
  return filteredNotes && filteredBurstSliders && filteredSliders && filteredBombs;
}

/**
 * Safely applies new track id(s) to any notes
 * between {@link p1} and {@link p2}, based on note height.
 * 
 * - will not overwrite old track names
 * 
 * - tracks can be a single "string" or an ["array", "of", "strings"]
 * @param p1 start beat
 * @param p2 end beat
 * @param track  "string" - input track
 */
function trackOnNotesBetweenHeightSep(track, p1, p2) {
  filteredNotes = notes.filter(n => n.b >= p1 && n.b <= p2);
  filteredNotes.forEach(note => {
  if (!note.customData.track) {
      note.customData.track = `${track}_y${note.y}`;
  }
  else {
    if(Array.isArray(note.customData.track)) {
      note.customData.track.push(`${track}_y${note.y}`);
    }
    else {
      let prevTrack = note.customData.track;
      note.customData.track = [prevTrack];
        note.customData.track.push(`${track}_y${note.y}`);
    }
  }
  });
  return filteredNotes;
}
/**
 * Safely applies new track id(s) to any notes
 * between {@link p1} and {@link p2} based on what lane they're in
 * 
 * - will not overwrite old track names
 * 
 * - {@link track} can be a single "string" or an ["array", "of", "strings"]
 * @param trackLane1 "string" - Lane 1 track ID
 * @param trackLane2 "string" - Lane 2 track ID
 * @param trackLane3 "string" - Lane 3 track ID
 * @param trackLane4 "string" - Lane 4 track ID
 * @param p1 start beat
 * @param p2 end beat
 */
function trackOnNotesBetweenLaneSep(trackLane1, trackLane2, trackLane3, trackLane4, p1, p2) {
  filteredNotes = notes.filter(n => n.b >= p1 && n.b <= p2);
  filteredNotes.forEach(note => {
    if (!note.customData.track) {
      if (note.x == 0) {
        note.customData.track = trackLane1;
      }
      if (note.x == 1) {
        note.customData.track = trackLane2;
      }
      if (note.x == 2) {
        note.customData.track = trackLane3;
      }
      if (note.x == 3) {
        note.customData.track = trackLane4;
      }
    }
    else {
      if(Array.isArray(note.customData.track)) {
        if (note.x == 0) {
          note.customData.track.push(trackLane1);
        }
        if (note.x == 1) {
          note.customData.track.push(trackLane2);
        }
        if (note.x == 2) {
          note.customData.track.push(trackLane3);
        }
        if (note.x == 3) {
          note.customData.track.push(trackLane4);
        }
      }
      else {
        let prevTrack = note.customData.track;
        note.customData.track = [prevTrack];
          if (note.x == 0) {
            note.customData.track.push(trackLane1);
          }
          if (note.x == 1) {
            note.customData.track.push(trackLane2);
          }
          if (note.x == 2) {
            note.customData.track.push(trackLane3);
          }
          if (note.x == 3) {
            note.customData.track.push(trackLane4);
          }
      }
    }
  });
  return filteredNotes;
}
/**
 * Safely applies new track id(s) to any notes/chains/bombs
 * between {@link p1} and {@link p2}, based on cut direction, beat, note type, colour, and grid position.
 * 
 * - tracks can be a single "string" or an ["array", "of", "strings"]
 *
 * @param p1 start beat
 * @param p2 end beat
 * @param track  "string" - input track name
 */
function trackOnNotesBetweenUnique(p1, p2, track) {
  const directionSuffixMap = [
    '_U',  '_D',  '_L',  '_R',  // Up, Down, Left, Right
    '_UL', '_UR', '_DL', '_DR', // Up-Left, Up-Right, Down-Left, Down-Right
    '_Dot' // Dot
  ];
  const colorSuffixMap = [
    '_L',  '_R'
  ];
  if(showGeneratedTracks) {
    console.log(`${header}${bold} Unique tracks created between [${valueText}${p1}${header}] and [${valueText}${p2}${header}]:${reset}`);
    console.log(`${footer}  New track ID's are formatted as: ${valueText}"track_beat_noteType_cutDirection_color_x_y"${reset}`);
  }
  var lastUniqueNoteTrack = track;
  var lastUniqueBombTrack = track;
  filteredNotes = notes.filter(n => n.b >= p1 && n.b <= p2);
  filteredNotes.forEach(note => {
    const trackSuffix = directionSuffixMap[note.d];
    const trackColSuffix = colorSuffixMap[note.c];
    const trackName = `${track}_${note.b}_N${trackSuffix}${trackColSuffix}_${note.x}_${note.y}`;
    if (!note.customData.track) {
      note.customData.track = trackName;
    } else if (Array.isArray(note.customData.track)) {
      note.customData.track.push(trackName);
    } else {
      note.customData.track = [note.customData.track, trackName];
    }
    lastUniqueNoteTrack = trackName;
  });
  filteredBurstSliders = burstSliders.filter(bs => bs.b >= p1 && bs.b <= p2);
  filteredBurstSliders.forEach(chain => {
    const trackSuffix = directionSuffixMap[chain.d];
    const trackColSuffix = colorSuffixMap[chain.c];
    const trackName = `${track}_${chain.b}_C${trackSuffix}${trackColSuffix}_${chain.x}_${chain.y}`;
    if (!chain.customData.track) {
      chain.customData.track = trackName;
    } else if (Array.isArray(chain.customData.track)) {
      chain.customData.track.push(trackName);
    } else {
      chain.customData.track = [chain.customData.track, trackName];
    }
    lastUniqueNoteTrack = trackName;
  });
  filteredBombs = bombs.filter(b => b.b >= p1 && b.b <= p2);
  filteredBombs.forEach(bomb => {
    const trackNameB = `${track}_${bomb.b}_B_${bomb.x}_${bomb.y}`;
    if (!bomb.customData.track) {
      bomb.customData.track = trackNameB;
    } else if (Array.isArray(bomb.customData.track)) {
      bomb.customData.track.push(trackNameB);
    } else {
      bomb.customData.track = [bomb.customData.track, trackNameB];
    }
    lastUniqueBombTrack = trackNameB;
  });
  console.log(`${footer}   Example:${reset}`);
  if (lastUniqueNoteTrack != track) {
    console.log(`${footer}   - Note/Chains  - ${valueText}"${lastUniqueNoteTrack}"${reset}`);
  }
  else {
    console.log(`${footer}   - No notes found between [${valueText}${p1}${header}] and [${valueText}${p2}${header}]${reset}`);
  }
  if (lastUniqueBombTrack != track) {
  console.log(`${footer}   - Bombs        - ${valueText}"${lastUniqueBombTrack}"${reset}`);
  }
  else {
    console.log(`${footer}   - No bombs found between [${valueText}${p1}${header}] and [${valueText}${p2}${header}]${reset}`);
  }
  if (!trackLogShown){
    console.log(`${black}   you can hide future track logs by disabling "showGeneratedTracks" in the debug section${reset}`);
  }
  console.log();
  return filteredNotes && filteredBurstSliders & filteredBombs;
}

function trackOnAllArcsBetween(track, p1, p2) {
  filteredSliders = sliders.filter(n => n.b >= p1 && n.b <= p2);
  filteredSliders.forEach(arc => {
    if (!arc.customData.track) {
      arc.customData.track = track;
    } else {
      if(Array.isArray(arc.customData.track)) {
        arc.customData.track.push(track);
      }
      else {
        let prevTrack = arc.customData.track;
        arc.customData.track = [prevTrack];
        arc.customData.track.push(track);
      }
    }
  });
  return filteredSliders;
}
function trackOnFakeArcsBetween(track, p1, p2) {
  filteredSliders = sliders.filter(n => n.b >= p1 && n.b <= p2);
  filteredSliders.forEach(arc => {
    if (arc.customData.uninteractable) {
    if (!arc.customData.track) {
      arc.customData.track = track;
    } else {
      if(Array.isArray(arc.customData.track)) {
        arc.customData.track.push(track);
      }
      else {
        let prevTrack = arc.customData.track;
        arc.customData.track = [prevTrack];
        arc.customData.track.push(track);
      }
    }
  }
  });
  return filteredSliders;
}
function trackOnRealArcsBetween(track, p1, p2) {
  filteredSliders = sliders.filter(n => n.b >= p1 && n.b <= p2);
  filteredSliders.forEach(arc => {
    if (!arc.customData.uninteractable) {
    if (!arc.customData.track) {
      arc.customData.track = track;
    } else {
      if(Array.isArray(arc.customData.track)) {
        arc.customData.track.push(track);
      }
      else {
        let prevTrack = arc.customData.track;
        arc.customData.track = [prevTrack];
        arc.customData.track.push(track);
      }
    }
  }
  });
  return filteredSliders;
}


function fixArtArcsBetween(start, end) {
  let uninteractableArcsExist = false;
  filteredSliders = sliders.filter(s => s.b >= start && s.b <= end);
  filteredNotes = notes.filter(n => n.b >= start && n.b <= end);
  filteredFakeNotes = fakeNotes.filter(fn => fn.b >= start && fn.b <= end);
  
  //================ Sample Arcs ================
  filteredSliders.forEach(arc => {
    // first, check if arc is interactable
    if (arc.customData.uninteractable) {
      // let rest of the function know that it's gotta do stuff
      uninteractableArcsExist = true;

      // check if a fake note with the same attributes (or is a dot note/arc) already exists
      const fakeNoteExists = fakeNotes.some(fn =>
        fn.b === arc.b && 
        fn.x === arc.x && 
        fn.y === arc.y && 
        fn.c === arc.c
      );

      if (!fakeNoteExists) {
        // check if there's a real note connected to the arc
        const realNoteIndex = notes.findIndex(note =>
          note.b === arc.b && 
          note.x === arc.x && 
          note.y === arc.y && 
          note.c === arc.c
        );

        if (realNoteIndex !== -1) {
          // remove the real note from colorNotes array
          const realNote = notes.splice(realNoteIndex, 1)[0];

          // modify the note to fit the fake note criteria
          realNote.customData = {
            uninteractable: true,
            disableNoteLook: true,
            spawnEffect: false
          };

          // add it to the fakeColorNotes array
          //fakeNotes.push(realNote);
        }

        // create data for arc head note
        let arcHead = {
          b: arc.b,
          x: arc.x,
          y: arc.y,
          c: arc.c,
          d: arc.d,
          a: 0,
          customData: {
            uninteractable: true,
            disableNoteLook: true,
            spawnEffect: false
          }
        };

        // add back any precision placement coords if it exists
        if (arc.customData.coordinates) {
          arcHead.customData.coordinates = arc.customData.coordinates;
        }
        // add track to head note
        //if (arc.customData.track) {
        //  arcHead.customData.track = arc.customData.track;
        //
        //  // mix arc head track with current arc track(s) (if any exist)
        //  if (Array.isArray(arcHead.customData.track)) {
        //    arcHead.customData.track.push("mwt_farcFix");
        //  } else {
        //    arcHead.customData.track = [arc.customData.track, "mwt_farcFix"];
        //  }
        //} else {
          // BRUH I DIDN'T EVEN NEED TO COPY ALL THE TRACKS WTF THAT WAS SUCH A HEADACHE TO FIGURE OUT FML
          arcHead.customData.track = "mwt_farcFix";
        //}
        // add back any animations from arc if they exist
        if (arc.customData.animation) {
          arcHead.customData.animation = arc.customData.animation;
          // remove any conflicting animations
          if (arc.customData.animation.dissolve) {
            arcHead.customData.animation.dissolve = undefined;
          }
          if (arc.customData.animation.dissolveArrow) {
            arcHead.customData.animation.dissolveArrow = undefined;
          }
          if (arc.customData.animation.scale) {
            arcHead.customData.animation.scale = undefined;
          }

        }
        fakeNotes.push(arcHead);
      }

      // Now handle the tail note removal
      const tailNoteExistsInReal = notes.findIndex(note =>
        note.b === arc.tb &&   // Tail Beat
        note.x === arc.tx &&   // Tail X position
        note.y === arc.ty &&   // Tail Y position
        note.c === arc.c
      );

      if (tailNoteExistsInReal !== -1) {
        notes.splice(tailNoteExistsInReal, 1); // Remove tail note from real notes array
      }

      const tailNoteExistsInFake = fakeNotes.findIndex(fn =>
        fn.b === arc.tb &&   // Tail Beat
        fn.x === arc.tx &&   // Tail X position
        fn.y === arc.ty &&   // Tail Y position
        fn.c === arc.c    // Tail Color
      );

      if (tailNoteExistsInFake !== -1) {
        fakeNotes.splice(tailNoteExistsInFake, 1); // Remove tail note from fake notes array
      }
    }
  });

  //================ Add Custom Event ================
  // Check if fix event has already been added
  const eventExists = customEvents.some(event => 
    event.b === 0 && 
    event.t === "AnimateTrack" && 
    event.d.track === "mwt_farcFix"
  );

  // If there are uninteractable arcs, and the event doesn't exist, shove 'er in
  if (!eventExists && uninteractableArcsExist) {
    customEvents.push({
      b: 0,
      t: "AnimateTrack",
      d: {
        track: "mwt_farcFix",
        scale: [[0.0000001, 0.0000001, 0.0000001, 0]],
        dissolve: [[0, 0]],
        dissolveArrow: [[0, 0]],
      }
    });
  }

}

// ---- JD/RT/NJS Functions ----
/**
 * Get jump related info.
 * @param noteJumpSpeed Note jump speed.
 * @param noteJumpOffset Note offset.
 * @param beatsPerMinute Song BPM.
 * @returns Returns an object; {halfDur, dist}.
 * A "jump" is the period when the object "jumps" in (indicated by spawning light on notes) to when it's deleted.
 * Jump Duration is the time in beats that the object will be jumping for.
 * This function will output half of this, so it will end when the note is supposed to be hit.
 * Jump Distance is the Z distance from when the object starts it's jump to when it's deleted.
 */
function getJumps( noteJumpSpeed, noteJumpOffset, beatsPerMinute ) {
  const startHJD = 4
  const maxHJD = 18 - 0.001
  const oneBeatDur = 60 / beatsPerMinute

  let halfDuration = startHJD
  const num2 = noteJumpSpeed * oneBeatDur
  let num3 = num2 * halfDuration
  while (num3 > maxHJD) {
      halfDuration /= 2
      num3 = num2 * halfDuration
  }
  halfDuration += noteJumpOffset
  if (halfDuration < 0.25) halfDuration = 0.25

  const jumpDuration = halfDuration * 2 * oneBeatDur
  const jumpDistance = noteJumpSpeed * jumpDuration

  return { halfDuration, jumpDistance }
}
/** Get the reaction time in milliseconds the player will have for an object from it's spawn. */
function getReactionTime( noteJumpSpeed, noteJumpOffset, beatsPerMinute ) {
  const halfJumpDuration = getJumps(noteJumpSpeed, noteJumpOffset, beatsPerMinute).halfDuration
  const beatMilliseconds = 60000 / beatsPerMinute
  return beatMilliseconds * halfJumpDuration
}
/** Get the offset required to generate a given reaction time in milliseconds. */
function getOffsetFromReactionTime( reactionTime, noteJumpSpeed, beatsPerMinute ) {
  const hjdAfterOffset = Math.max(0.25, reactionTime / (60000 / beatsPerMinute))
  return songBeatOffset(hjdAfterOffset, noteJumpSpeed, beatsPerMinute)
}
/** Get the offset required to generate a given jump distance. */
function getOffsetFromJumpDistance( jumpDistance, noteJumpSpeed, beatsPerMinute ) {
  const seconds = rawBeatsToSeconds(noteJumpSpeed * 2, beatsPerMinute)
  const hjdAfterOffset = Math.max(0.25, jumpDistance / seconds)
  return songBeatOffset(hjdAfterOffset, noteJumpSpeed, beatsPerMinute)
}
/** Get the offset required to get a given half jump duration. */
function getOffsetFromHalfJumpDuration( halfJumpDuration, noteJumpSpeed, beatsPerMinute ) {
  const hjdAfterOffset = Math.max(0.25, halfJumpDuration)
  return songBeatOffset(hjdAfterOffset, noteJumpSpeed, beatsPerMinute)
}
/** Calculate song offset (what you'd typically enter into CM or MMA2 alongside NJS) */
function songBeatOffset(hjdAfterOffset, noteJumpSpeed, beatsPerMinute ) {
  const hjdBeforeOffset = getJumps(noteJumpSpeed, 0, beatsPerMinute).halfDuration
  return hjdAfterOffset - hjdBeforeOffset
}
function getJumpZPos( noteJumpSpeed, noteJumpOffset, beatsPerMinute ) {
  const startHJD = 4
  const maxHJD = 18 - 0.001
  const oneBeatDur = 60 / beatsPerMinute

  let halfDuration = startHJD
  const num2 = noteJumpSpeed * oneBeatDur
  let num3 = num2 * halfDuration
  while (num3 > maxHJD) {
      halfDuration /= 2
      num3 = num2 * halfDuration
  }
  halfDuration += noteJumpOffset
  if (halfDuration < 0.25) halfDuration = 0.25

  const jumpDuration = halfDuration * 2 * oneBeatDur
  const jumpDistance = noteJumpSpeed * jumpDuration

  return (jumpDistance / 2)+1
}
function getInfoData(info, outputFilename) {
  let _NJS = undefined;
  let _offs = undefined;
  for (let beatmapSet of info._difficultyBeatmapSets) {
      for (let beatmap of beatmapSet._difficultyBeatmaps) {
          if (beatmap._beatmapFilename === outputFilename) {
            if (typeof ForceNJS === "number") {
              _NJS = ForceNJS;
            } else {
              _NJS = beatmap._noteJumpMovementSpeed
            }
            if (typeof ForceJD === "number") {
              _offs = ForceJD;
            } else {
              _offs = beatmap._noteJumpStartBeatOffset
            }
              return {
                  NJS: _NJS,
                  offset: _offs,
                  BPM: info._beatsPerMinute
              };
          }
      }
  }
// return null if difficulty data isn't found
return null;
}
function createStaticRT (desiredRT, njs = undefined, spawnBeat = undefined, endBeat = undefined, rtStartColRGB = undefined, rtEndColRGB = undefined) {
    // set things
    const songData  = getInfoData(infoDat, OUTPUT);
    let _BPM        = songData.BPM;
    let _minRT      = desiredRT/2;
    let _NJS        = songData.NJS;
    if (njs) {
      _NJS = njs;
    }
    let startCol    = [0, 1, 0];
    let endCol      = [1, 0, 0];
    if (rtStartColRGB) {
      startCol = rtStartColRGB;
    }
    if (rtEndColRGB) {
      startCol = rtEndColRGB;
    }

    // Calculate distances
    let desiredRTOffs =  getOffsetFromReactionTime(desiredRT,_NJS,_BPM);
    _DesiredDist      =  getJumpZPos(_NJS, desiredRTOffs, _BPM);
    _PANIKDist        = (getJumpZPos(_NJS, desiredRTOffs, _BPM)/2);
    _baseDesDist      = _DesiredDist;
    _basePANIKDist    = _PANIKDist;
  
    // More yapping, but this time with nerd shit
    if (!hideRTStats) {
      console.log(`${bodyText}${bold}Static Reaction Time Guides Created:${reset}`);
      console.log(`${green} - Desired RT & Distance | ${brGreen}Start = ` + `${desiredRT}ms / ${_DesiredDist}m${reset}`);
      console.log(`${red} - Des Min RT & Distance | ${brRed}End   = ` + `${_minRT}ms / ${_PANIKDist}m${reset}`);
      console.log();
    }
    
    // set more things
    let guideHeight = 0.115;
    let _sb = 0;
    let _eb = 99999;
    if(spawnBeat != undefined) {
      _sb = spawnBeat;
    }
    if(endBeat != undefined) {
      _eb = endBeat;
    }
    let _duration = _eb - _sb;
    let startPos  = [0, guideHeight*2, _DesiredDist/0.6, 0];
    let endPos    = [0, guideHeight*2, _PANIKDist/0.6, 0];

    // Cringe AND nay-nay walls because geometry doesn't update with ReLoader
    obstacles.push({
      b: _sb,
      d: _duration,
      x: 0,   
      y: 0,   
      w: 1,   
      h: 5,   
      customData:{
        color: [startCol[0], startCol[1], startCol[2], 2],
        size: [4, 0.042069, 0.042069],
        track: [`mwt_Debug_RTWall_Static_NoteJump_${desiredRT}ms_${_sb}_${_duration}`, "mwt_RTGL_Static"],
        coordinates: [-2, 0],
        animation: {
          definitePosition: [startPos],
        }
      }
    },{
      b: _sb,
      d: _duration,
      x: 0,   
      y: 0,   
      w: 1,   
      h: 5,   
      customData:{
        color: [endCol[0], endCol[1], endCol[2], 2],
        size: [4, 0.042069, 0.042069],
        track: [`mwt_Debug_RTWall_Static_NoteHalfJump_${minRT}ms_${_sb}_${_duration}`, "mwt_RTGL_Static"],
        coordinates: [-2, 0],
        animation: {
          definitePosition: [endPos],
        }
      }
    });  
}

function createDynRT (dynDesiredRT) {
  if (!hideRTStats) {
  console.log(`${header}${bold}Dynamic Reaction Time Guidelines Enabled:${reset}`);
  }
  if (!hideRTYapping) {
  console.log(`${black} - If you wish to animate the guidelines alongside any player movement, create a track parent for ${valueText}["mwt_RTGL"]${black},`);
  console.log(`${black}   then animate the parent with your player track. -> Do NOT try to animate this track directly!!!${reset}`);
  }
  console.log();
  
  const songData  = getInfoData(infoDat, OUTPUT);
  let BPM       = songData.BPM;
  baseRT    = getReactionTime(songData.NJS, songData.offset, BPM);
  baseHRT   = getReactionTime(songData.NJS, songData.offset, BPM)/2;
  minRT     = dynDesiredRT/2;

  if (!dynDesiredRT) {
    if (baseRT > minRT){
      dynDesiredRT = (minRT * (1 - 0.5)) + (baseRT * 0.5);
      const undefSafeRTLog = `${red}  - Desired RT undefined${bodyText} -> Setting Comfy RT indicator to: ${valueText}${dynDesiredRT}ms${reset}`
      console.log(undefSafeRTLog);
    }
    if (baseRT <= minRT){
      console.log();
      const zoomerRTDetectedLog = ` ${brRed}WARNING:${bodyText} Current set reaction time of ${valueText}${baseRT}ms${bodyText} is below minimum set rt of ${valueText}${minRT}ms${reset}`
      console.log(zoomerRTDetectedLog);
      dynDesiredRT = minRT+50;
      const zoomerRTFixLog = `${bodyText} Setting desired reaction time guideline to: ${valueText}${dynDesiredRT}ms${bodyText} (min + 50ms)${reset}`
      console.log(zoomerRTFixLog);
    }
  }
  // Calculate distances
  let dynDesiredRTOffs  = getOffsetFromReactionTime(dynDesiredRT,songData.NJS,BPM);
  _JDist                = getJumpZPos(songData.NJS, songData.offset, BPM);
  _HJDist               = (getJumpZPos(songData.NJS, songData.offset, BPM)/2);
  _DesiredDist          = getJumpZPos(songData.NJS, dynDesiredRTOffs, BPM);
  _PANIKDist            = (getJumpZPos(songData.NJS, dynDesiredRTOffs, BPM)/2);
  _baseJDist            = _JDist;
  _baseHJDist           = _HJDist;
  _baseDesDist          = _DesiredDist;
  _basePANIKDist        = _PANIKDist;

  // Yapping
  if (!hideRTYapping) {
    console.log(`${brYellow}${bold} IMPORTANT NOTE:${reset}`);
    console.log(`${footer}   Reaction Time is based on the starting 'Jump Distance' (JD) of the note. Although, the note still needs time to complete the jump/flip animation itself.${reset}`);
    console.log(`${footer}   This animation finishes at the "Half Jump Duration", and is defined as the "minimum" reaction times here.${reset}`);
    console.log(`${footer}   Please ensure that the player has enough time to understand where to swing before this point!${reset}`);
    console.log(`${black}    - you can hide this message by setting 'hideRTYapping' to 'true' under the debug options :)${reset}`);
    console.log();
  }
  // More yapping, but this time with nerd shit
  if (!hideRTStats) {
    console.log(`${bodyText}${bold}  Dynamic Reaction Time Guides Created:${reset}`);
    console.log(`${white}   - Default Reaction Time & Distance |  ${brWhite}Start = ` + `${baseRT}ms / ${_JDist}m${reset}`);
    console.log(`${blue}   - Def Min Reaction Time & Distance |  ${brBlue}End   = ` + `${baseHRT}ms / ${_HJDist}m${reset}`);
    console.log(`${green}   - Desired RT & Distance | ${brGreen}Start = ` + `${dynDesiredRT}ms / ${_DesiredDist}m${reset}`);
    console.log(`${red}   - Des Min RT & Distance | ${brRed}End   = ` + `${minRT}ms / ${_PANIKDist}m${reset}`);
    console.log();
  }
  
  // Cringe AND nay-nay walls because geometry doesn't update with ReLoader
  obstacles.push({
    b: 0,
    d: 9999,
    x: 0,   
    y: 0,   
    w: 1,   
    h: 5,   
    customData:{
      color: [1, 1, 1, 4.20],
      size: [4, 0.042069, 0.042069],
      track: ["mwt_Debug_Wall_Secondary_RT_NoteJump", "mwt_RTGL"],
      coordinates: [-2, 0],
    }
  },{
    b: 0,
    d: 9999,
    x: 0,   
    y: 0,   
    w: 1,   
    h: 5,   
    customData:{
      color: [0, 0, 1, 4.20],
      size: [4, 0.042069, 0.042069],
      track: ["mwt_Debug_Wall_Secondary_RT_NoteHalfJump", "mwt_RTGL"],
      coordinates: [-2, 0],
    }
  },{
    b: 0,  
    d: 9999, 
    x: 0,   
    y: 0,   
    w: 1,   
    h: 5,   
    customData:{
      color: [0, 1, 0, 4.20],
      size: [8, 0.042069, 0.042069],
      track: ["mwt_Debug_Wall_RT_SAFE", "mwt_RTGL"],
      coordinates: [-4, 0],
    }
  },{
    b: 0,   
    d: 9999,
    x: 0,   
    y: 0,   
    w: 1,   
    h: 5,   
    customData:{
      color: [2, 0, 0, 0.115],
      size: [8, 0.042069, 0.042069],
      track: ["mwt_Debug_Wall_RT_PANIK", "mwt_RTGL"],
      coordinates: [-4, 0],
    }
  });

  //create events
  let guideHeight = 0.115;
  customEvents.push({
    b: 0,
    t: "AssignPathAnimation",
    d: {
      track: "mwt_Debug_Wall_Secondary_RT_NoteJump",
      definitePosition: [[0, guideHeight*2, _JDist/0.6, 0]],
    }
  },{
    b: 0,
    t: "AssignPathAnimation",
    d: {
      track: "mwt_Debug_Wall_Secondary_RT_NoteHalfJump",
      definitePosition: [[0, guideHeight*2, _HJDist/0.6, 0]], 
    }
  },{
    b: 0,
    t: "AssignPathAnimation",
    d: {
      track: "mwt_Debug_Wall_RT_SAFE",
      definitePosition: [[0, guideHeight, _DesiredDist/0.6, 0]],
    }
  },{
    b: 0,
    t: "AssignPathAnimation",
    d: {
      track: "mwt_Debug_Wall_RT_PANIK",
      definitePosition: [[0, guideHeight, _PANIKDist/0.6, 0]],
    }
  });
}
if(showRTGuides){
  createDynRT(dynDesiredRT);
}
function adjustDynRTGuides(beat, newNJS, newOffset, newRT, animDuration = undefined) {
  // get data and add in new njs/offstevalues
  if (animDuration === undefined ) {
    animDuration = rtAdjustScale;
  }
  const songData          =   getInfoData(infoDat, OUTPUT);
  let newdynDesiredRTOffs =   getOffsetFromReactionTime(newRT, newNJS, songData.BPM);
  let _newJDist           =   getJumpZPos(newNJS, newOffset, songData.BPM);
  let _newHJDist          =  (getJumpZPos(newNJS, newOffset, songData.BPM)/2);
  let _newDesiredDist     =   getJumpZPos(newNJS, newdynDesiredRTOffs, songData.BPM);
  let _newPANIKDist       =  (getJumpZPos(newNJS, newdynDesiredRTOffs, songData.BPM)/2);
  let _animDuration       =   animDuration;
  let _customRT           =   getReactionTime(newNJS, newOffset, songData.BPM);
  let _customHRT          =   getReactionTime(newNJS, newOffset, songData.BPM)/2;
  let _customMinRT        =   newRT/2;

  // Set animation offset timing (compensate start beat based on incoming notes lifetime)
  //_animOffset = (Math.max(0.25, getJumps(newNJS,newOffset,songData.BPM).halfDuration)) - (getJumps(newNJS, 0, songData.BPM).halfDuration);
  _animOffset   = getJumps(newNJS,newOffset,songData.BPM).halfDuration;
  _animBeat = Math.max(lastAnimBeat, beat-_animOffset-(_animDuration*(Math.min(_animOffset, 2))));
  if (!adaptiveRTAdj) { _animBeat = beat-_animDuration; }

  // animate the shit
  let _easing = "easeInOutCubic";
  let guideHeight = 0.115;
  customEvents.push({
    b: _animBeat,
    t: "AssignPathAnimation",
    d: {
      track: "mwt_Debug_Wall_Secondary_RT_NoteJump",
      duration: _animDuration,
      easing: _easing,
      definitePosition: [[0, guideHeight*2, _newJDist/0.6, 0]],
    }
  }, {
    b: _animBeat,
    t: "AssignPathAnimation",
    d: {
      track: "mwt_Debug_Wall_Secondary_RT_NoteHalfJump",
      duration: _animDuration,
      easing: _easing,
      definitePosition: [[0, guideHeight*2, _newHJDist/0.6, 0]],
    }
  }, {
    b: _animBeat,
    t: "AssignPathAnimation",
    d: {
      track: "mwt_Debug_Wall_RT_SAFE",
      duration: _animDuration,
      easing: _easing,
      definitePosition: [[0, guideHeight, _newDesiredDist/0.6, 0]],
    }
  }, {
    b: _animBeat,
    t: "AssignPathAnimation",
    d: {
      track: "mwt_Debug_Wall_RT_PANIK",
      duration: _animDuration,
      easing: _easing,
      definitePosition: [[0, guideHeight, _newPANIKDist/0.6, 0]],
    }
  });
  lastAnimBeat = _animBeat;
  if (!hideRTStats) {
    console.log(`${bodyText}${bold}  Dynamic RT Guides Updated on Beat [${valueText}${_animBeat}${bodyText}] ${black} | - Function Declared on Beat [${white}${beat}${black}]:${reset}`);
    console.log(`${white}   - Custom Reaction Time & Distance      | ${brWhite}Start = ` + `${_customRT}ms / ${_newJDist}m${reset}`);
    console.log(`${blue}   - Custom Min Reaction Time & Distance  | ${brBlue}End   = ` + `${_customHRT}ms / ${_newHJDist}m${reset}`);
    console.log(`${green}   - New Desired Reaction Time & Distance | ${brGreen}Start = ` + `${newRT}ms / ${_newDesiredDist}m${reset}`);
    console.log(`${red}   - New Des Min Reaction Time & Distance | ${brRed}End   = ` + `${_customMinRT}ms / ${_newPANIKDist}m${reset}`);
    console.log();
  }
}
function resetRTGuides(beat, animDuration = undefined) {
  // get data and add in new njs/offstevalues
  if (animDuration === undefined ) {animDuration = rtAdjustScale;}
  const songData    = getInfoData(infoDat, OUTPUT);
  let _animDuration = animDuration;
  
  // Set animation offset timing (compensate start beat based on incoming notes lifetime)
  _animOffset   = getJumps(songData.NJS,songData.offset,songData.BPM).halfDuration;
  _animBeat = beat-_animDuration-0.5;
  if (!adaptiveRTAdj) { _animBeat = beat; }
  
  // animate the shit
  let _easing = "easeInOutExpo";
  let guideHeight = 0.115;
  customEvents.push({
    b: _animBeat,
    t: "AssignPathAnimation",
    d: {
      track: "mwt_Debug_Wall_Secondary_RT_NoteJump",
      duration: _animDuration,
      easing: _easing,
      definitePosition: [[0, guideHeight*2, _baseJDist/0.6, 0]],
    }
  },{
    b: _animBeat,
    t: "AssignPathAnimation",
    d: {
      track: "mwt_Debug_Wall_Secondary_RT_NoteHalfJump",
      duration: _animDuration,
      easing: _easing,
      definitePosition: [[0, guideHeight*2, _baseHJDist/0.6, 0]],
    }
  },{
    b: _animBeat,
    t: "AssignPathAnimation",
    d: {
      track: "mwt_Debug_Wall_RT_SAFE",
      duration: _animDuration,
      easing: _easing,
      definitePosition: [[0, guideHeight, _baseDesDist/0.6, 0]],
    }
  },{
    b: _animBeat,
    t: "AssignPathAnimation",
    d: {
      track: "mwt_Debug_Wall_RT_PANIK",
      duration: _animDuration,
      easing: _easing,
      definitePosition: [[0, guideHeight, _basePANIKDist/0.6, 0]],
    }
  });

  lastAnimBeat = _animBeat;
  if (!hideRTStats) {
  console.log(`${header}${bold}  Reaction Time Guides Reset on Beat [${valueText}${_animBeat}${header}]${reset}`);
  console.log();
  }
}

// ---- 360 Tools ----
// Convert base game rotations to Noodle rotation offsets
function convertRotationEventsToNoodle(startBeat = 0, endBeat = Infinity) {
  let rotAmnt = 0;
  let processedEventIndices = [];

  function addRotationData(obj, rotation) {
    if (!obj.customData) {
      obj.customData = {};
    }
    if (!obj.customData.worldRotation) {
      obj.customData.worldRotation = [0, 0, 0];
    } else if (!Array.isArray(obj.customData.worldRotation)) {
      obj.customData.worldRotation = [0, obj.customData.worldRotation, 0];
    } else if (obj.customData.worldRotation.length === 1) {
      obj.customData.worldRotation = [0, obj.customData.worldRotation[0], 0];
    }

    obj.customData.worldRotation[1] === rotation;

    if (obj.customData.worldRotation.every(val => val === 0)) {
      delete obj.customData.worldRotation;
    } else if (obj.customData.worldRotation[0] === 0 && obj.customData.worldRotation[2] === 0) {
      obj.customData.worldRotation = obj.customData.worldRotation[1];
    }
  }

  function processObjects(objects, eventBeat, execTime, rotation) {
    if (objects) {
      const filteredObjects = objects.filter(n => (execTime === 0 ? n.b >= eventBeat : n.b > eventBeat));
      filteredObjects.forEach(obj => addRotationData(obj, rotation));
    }
  }

  rotationEvents.forEach((event, index) => {
    const { b: eventBeat, e: execTime, r: rotation } = event;

    if (eventBeat >= startBeat && eventBeat <= endBeat) {
      rotAmnt = rotation;  

      processObjects(notes, eventBeat, execTime, rotAmnt);
      processObjects(bombs, eventBeat, execTime, rotAmnt);
      processObjects(obstacles, eventBeat, execTime, rotAmnt);
      processObjects(sliders, eventBeat, execTime, rotAmnt);
      processObjects(burstSliders, eventBeat, execTime, rotAmnt);
      
      if (customData) {
        processObjects(customData.fakeColorNotes, eventBeat, execTime, rotAmnt);
        processObjects(customData.fakeBombNotes, eventBeat, execTime, rotAmnt);
        processObjects(customData.fakeObstacles, eventBeat, execTime, rotAmnt);
        processObjects(customData.fakeSliders, eventBeat, execTime, rotAmnt);
        processObjects(customData.fakeBurstSliders, eventBeat, execTime, rotAmnt);
      }
      processedEventIndices.push(index);
    }
  });
  processedEventIndices.reverse().forEach(index => {
    rotationEvents.splice(index, 1);
  });
}
// Scale 360 rotations
function adjustRotationEvents(maxAngle, useFullFloat = true) {
  let minRotation = Infinity;
  let maxRotation = -Infinity;

  rotationEvents.forEach(event => {
    if (event.r < minRotation) {
      minRotation = event.r;
    }
    if (event.r > maxRotation) {
      maxRotation = event.r;
    }
  });

  minRotation *= 2;
  maxRotation *= 2;
  const currentRange = maxRotation - minRotation;
  const targetRange = maxAngle;

  rotationEvents.forEach(event => {
    let adjustedRotation = ((event.r * 2 - minRotation) / currentRange) * targetRange - (targetRange / 2);
    adjustedRotation = adjustedRotation / 2;
    if (!useFullFloat) {
      adjustedRotation = snapToIncrement(adjustedRotation, 15);
    }
    event.r = adjustedRotation;
  });

  const maxLeftRotation = Math.min(...rotationEvents.map(event => event.r)) * 2;
  const maxRightRotation = Math.max(...rotationEvents.map(event => event.r)) * 2;
  const leftChange = maxLeftRotation - minRotation;
  const rightChange = maxRightRotation - maxRotation;
  const leftLog = `Max left rotation ${leftChange > 0 ? 'nerfed' : 'buffed'} to ${maxLeftRotation}° from ${minRotation}°`;
  const rightLog = `Max right rotation ${rightChange > 0 ? 'buffed' : 'nerfed'} to ${maxRightRotation}° from ${maxRotation}°`;
  console.log(leftLog);
  console.log(rightLog);
}



//#endregion
/* --- List of Available Functions: ---
// NOTE: Any function property with an '=' sign is completely optional and NOT required

//Generic/Misc Functions: ----------------------------
  
  rnd( min, max, seed = null );
  rndf( min, max, seed = null );
  shuffleArray( array, seed = null );
  lerp( a, b, t );
  round( value, decimals );
  snapToIncrement( value, increment );
  genCircle( radius, n, acc = null );
  genCircleNoCorrection( radius, n, acc = null );
  notesAt( times );
  fixArtArcsBetween( start, end );
  getInfoData( info, outputFilename );

//Basic Offset/NJS Adjustments: ----------------------
  
  offestNotesBetweenRBSep( start, end, offsetR, offsetB );
  offsetNJSOnNotesBetween( p1, p2, NJS, offset, updateDesieredRT = undefined );
  offsetNJSOnAllBetween( p1, p2, NJS, offset, updateDesieredRT = undefined );

//Applying and Sorting Object Tracks: ----------------
  
  trackOnNotesBetween( track, p1, p2 );
  trackOnFakeNotesBetween( track, p1, p2 );
  trackOnBombsBetween( track, p1, p2 );
  trackOnFakeBombsBetween( track, p1, p2 );
  trackOnChainsBetween( track, p1, p2 );
  trackOnFakeChainsBetween( track, p1, p2 );
  trackOnNotesBetweenRBSep( trackR, trackB, p1, p2 );
  trackOnArcsBetweenRBSep( trackR, trackB, p1, p2 );
  trackOnNotesBetweenDirSep( p1, p2, track );
  trackOnNotesBetweenHeightSep( track, p1, p2 );
  trackOnNotesBetweenLaneSep( trackLane1, trackLane2, trackLane3, trackLane4, p1, p2 );
  trackOnAllArcsBetween( track, p1, p2 );
  trackOnFakeArcsBetween( track, p1, p2 );
  trackOnRealArcsBetween( track, p1, p2 );

//JD/RT/NJS Nerd Stuff: -----------------------------
//note: Most of these are already used internally/automatically, but feel free to use with them manually if required.
  
  getJumps( noteJumpSpeed, noteJumpOffset, beatsPerMinute );
  getReactionTime( noteJumpSpeed, noteJumpOffset, beatsPerMinute );
  getOffsetFromReactionTime( reactionTime, noteJumpSpeed, beatsPerMinute );
  getOffsetFromJumpDistance( jumpDistance, noteJumpSpeed, beatsPerMinute );
  getOffsetFromHalfJumpDuration( halfJumpDuration, noteJumpSpeed, beatsPerMinute );
  songBeatOffset( hjdAfterOffset, noteJumpSpeed, beatsPerMinute );
  getJumpZPos( noteJumpSpeed, noteJumpOffset, beatsPerMinute );
  createStaticRT (desiredRT, njs = undefined, spawnBeat = undefined, endBeat = undefined, rtStartColRGB = undefined, rtEndColRGB = undefined)
  createDynRT ( dynDesiredRT ); //NOTE: Only needs to be used ONCE! -> Is created by default with any of the NJS/Offset functions!
  adjustDynRTGuides( beat, newNJS, newOffset, newRT, animDuration = undefined );
  resetRTGuides( beat, animDuration = undefined );

//360 Tools: -----------------------------------------
  
  convertRotationEventsToNoodle( startBeat = 0, endBeat = Infinity );
  adjustRotationEvents( maxAngle, useFullFloat = true );

*/


//#region ============ COPY/PASTE ============ -->  Use these as a copy/paste template for the lazy
/*
======================================================================================
Check out the animation docs for examples of just about everything featured here:
https://github.com/Aeroluna/Heck/wiki/AnimationProperties


====================================
||||||||| IMPORTANT NOTES! |||||||||
====================================

Color ------------------------------------------------------------------------------||
======================================================================================
  Color is on a scale from 0 - 1, and NOT 0 - 255
  You can convert any '255' rgb to a 0-1 scale by simply dividing by 255
  Example:
    color: [[255/255, 163/255, 26/255, 0, 1, "easeInOutCubic"]

  When scripting, you can input math operations as values and it will output the final result, instead of the raw operation itself.
  So when you run the script, this above example is what will actually be written to your output file:  
    color: [[1, 0.63921568627, 0.10196078431, 0, 1, "easeInOutCubic"]

  (for Hex values, just use an online converter lol)
======================================================================================

Coords / Flip ----------------------------------------------------------------------||
======================================================================================
  The 'coordinates' and 'flip' properties both use the "BeatWalls" system, which is different from the base game x/y postion coords.
  https://raw.githubusercontent.com/wiki/Aeroluna/Heck/media/beatwallsgrid.png

  TLDR:
  - Left  lane is '0' in base game, and '-2' with the "flip"/"coordinates" properties
  - Right lane is '3' in base game, and '+1' with the "flip"/"coordinates" properties
======================================================================================




--notes --walls
===========================================================================================================
||-------------------------------------------- NOTES & WALLS --------------------------------------------||
===========================================================================================================

  - These examples are for grabbing vanilla notes and modifying their customData directly.
  This section covers things like: 
  - Assigning tracks
  - Setting NJS/Offsets
  - Creating fake notes
  - Unique note animations (random spawns)

============================================
-------- MODIFYING EXISTING OBJECTS --------
============================================ 

Filtering for Objects to Edit -------------------------------||
===============================================================
--filtering

  filteredNotes = notesAt([69]);
  filteredNotes.forEach(note => {
    note.customData.noteJumpMovementSpeed = 420;
    note.customData.noteJumpStartBeatOffset = 69;
    // note.customData.   // insert other property type here
  });

  filteredNotes = notes.filter(n => n.b >= 69 && n.b <= 420);
  filteredNotes.forEach(note => {
    note.customData.noteJumpMovementSpeed = 420;
    note.customData.noteJumpStartBeatOffset = 69;
    // note.customData.   // insert other property type here
  });

===============================================================
Feel free to remove the '=' signs before each value (69/420) if
you do not want to include notes that are exactly on that beat.
===============================================================

Filter Object Types -----------------------------------------||
===============================================================
--filterTypes

  filteredNotes = notes.filter
  filteredBombs = bombs.filter
  filteredSliders = sliders.filter
  filteredBurstSliders = burstSliders.filter
  filteredEvents = events.filter
  filteredObstacles = obstacles.filter
  filteredObjects = objects.filter

  filteredFakeNotes = fakeNotes.filter
  filteredFakeBombs = fakeBombs.filter
  filteredFakeObstacles = fakeObstacles.filter
  filteredFakeBurstSliders = fakeBurstSliders.filter

===============================================================
NOTE: 
-For all of these object filter things, 'thing'.customData can be replaced with any word.
You just need to specify it at the top, directly after the 'forEach('
Example:

  filteredNotes = notes.filter(n => n.b >= 69 && n.b <= 420);
  filteredNotes.forEach(piss => {
    piss.customData. // insert property type here from example below
  });

This will work the exact same as if 'piss' was replaced with the word 'note'
===============================================================

Static Object Properties ------------------------------------||
===============================================================
--properties --staticProperties
https://github.com/Aeroluna/Heck/wiki/Objects

-- Notes -- 
  note.customData.noteJumpMovementSpeed = 420;
  note.customData.noteJumpStartBeatOffset = 69;
  note.customData.flip = [x, y]; // Note: This uses "BeatWalls" coords, not base game x/y
  note.customData.spawnEffect = false;
  note.customData.disableNoteGravity = true;
  note.customData.disableNoteLook = true;
  note.customData.disableBadCutDirection = true;
  note.customData.disableBadCutSpeed = true;
  note.customData.disableBadCutSaberType = true;
  note.customData.uninteractable = true;
  note.customData.coordinates = [x, y];
  note.customData.worldRotation = [x, y, z];  // single value rotation input will assume 'y' (left/right) rotation, just like a 360 map
  note.customData.localRotation = [x, y, z];
  note.customData.color = [r, g, b, a];
  note.customData.link = "exampleLink_Beat69";
  note.customData.track = "dumbTrackNameHere";
// -- alt track method if you require multiple tracks --
// note.customData.track = ["dumbTrack1", "dumbTrack2", "youCanFitSoManyTracksInThisBadBoy"];

-- Bombs -- 
  bomb.customData.noteJumpMovementSpeed = 420;
  bomb.customData.noteJumpStartBeatOffset = 69;
  bomb.customData.flip = [x, y]; // Note: This uses "BeatWalls" coords, not base game x/y
  bomb.customData.spawnEffect = false;
  bomb.customData.disableNoteGravity = true;
  bomb.customData.disableNoteLook = true;
  bomb.customData.uninteractable = true;
  bomb.customData.coordinates = [x, y];
  bomb.customData.worldRotation = [x, y, z];  // single value rotation input will assume 'y' (left/right) rotation, just like a 360 map
  bomb.customData.localRotation = [x, y, z];
  bomb.customData.color = [r, g, b, a];
  bomb.customData.link = "exampleLink_Beat69";
  bomb.customData.track = "dumbTrackNameHere";
// -- alt track method if you require multiple tracks --
// bomb.customData.track = ["dumbTrack1", "dumbTrack2", "youCanFitSoManyTracksInThisBadBoy"];

-- Walls -- 
  obstacle.customData.noteJumpMovementSpeed = 420;
  obstacle.customData.noteJumpStartBeatOffset = 69;
  obstacle.customData.uninteractable = true;
  obstacle.customData.coordinates = [x, y];
  obstacle.customData.worldRotation = [x, y, z];  // single value rotation input will assume 'y' (left/right) rotation, just like a 360 map
  obstacle.customData.localRotation = [x, y, z];
  obstacle.customData.color = [r, g, b, a];
  obstacle.customData.size = [width, height, length]; // Different from scale | "Size" '1,1,1' will create a perfectly square wall | "Scale" is additive to this
  obstacle.customData.track = "dumbTrackNameHere";
// -- alt track method if you require multiple tracks --
// obstacle.customData.track = ["dumbTrack1", "dumbTrack2", "youCanFitSoManyTracksInThisBadBoy"];

-- Sliders (arcs) -- 
  slider.customData.noteJumpMovementSpeed = 420;
  slider.customData.noteJumpStartBeatOffset = 69;
  slider.customData.flip = [x, y]; // Note: This uses "BeatWalls" coords, not base game x/y
  slider.customData.spawnEffect = false;
  slider.customData.disableNoteGravity = true;
  slider.customData.disableNoteLook = true;
  slider.customData.uninteractable = true;
  slider.customData.coordinates = [x, y];
  slider.customData.tailCoordinates = [x, y];
  slider.customData.worldRotation = [x, y, z];  // single value rotation input will assume 'y' (left/right) rotation, just like a 360 map
  slider.customData.localRotation = [x, y, z];
  slider.customData.color = [r, g, b, a];
  slider.customData.link = "exampleLink_Beat69";
  slider.customData.track = "dumbTrackNameHere";
// -- alt track method if you require multiple tracks --
// slider.customData.track = ["dumbTrack1", "dumbTrack2", "youCanFitSoManyTracksInThisBadBoy"];

-- Burst Sliders (chains) -- 
  burstslider.customData.noteJumpMovementSpeed = 420;
  burstslider.customData.noteJumpStartBeatOffset = 69;
  burstslider.customData.flip = [x, y]; // Note: This uses "BeatWalls" coords, not base game x/y
  burstslider.customData.spawnEffect = false;
  burstslider.customData.disableNoteGravity = true;
  burstslider.customData.disableNoteLook = true;
  burstslider.customData.disableBadCutDirection = true;
  burstslider.customData.disableBadCutSpeed = true;
  burstslider.customData.disableBadCutSaberType = true;
  burstslider.customData.uninteractable = true;
  burstslider.customData.coordinates = [x, y];
  burstslider.customData.tailCoordinates = [x, y];
  burstslider.customData.worldRotation = [x, y, z];  // single value rotation input will assume 'y' (left/right) rotation, just like a 360 map
  burstslider.customData.localRotation = [x, y, z];
  burstslider.customData.color = [r, g, b, a];
  burstslider.customData.link = "exampleLink_Beat69";
  burstslider.customData.track = "dumbTrackNameHere";
// -- alt track method if you require multiple tracks --
// burstslider.customData.track = ["dumbTrack1", "dumbTrack2", "youCanFitSoManyTracksInThisBadBoy"];

===============================================================

Animated Object Properties ----------------------------------||
===============================================================
--properties --animatedProperties
https://github.com/Aeroluna/Heck/wiki/AnimationProperties
======================================================================================================================
IMPORTANT NOTE: All animations will be "Path Animations" with the final "time" value representing the objects lifetime
======================================================================================================================
  0     = starting jump (light flash)
  0.25  = half jump
  0.5   = timing - note is same position as the players headset
  0.5+  = miss
  0.75  = note begins despawn animation -> arrow despawns
  0.75+ = note zooms off into the distance
  1     = note despawns
======================================================================================================================
When making note animations, try to make sure the note can be cut BEFORE the 0.5 mark, 
and that the player has a reasonable reaction time to understand where to swing.
- With the base game jump animation, reaction time is typically around the 0.25 point
- Remember that the sabers AND players arms stick out in front of the headset.
  This means that 0.5 is the absolute LAST FRAME that the player will be able to cut a note!
  Everything after 0.5 is considered a MISS!
======================================================================================================================
To begin animating an object you must first create an animation property in the notes customData.
This is what the very first thing at the top does. It's required to use all the other options.
Adding this will also clear any previous animation data, do not use on objects that you have already animated in CM
Example -> note.customData.animation = {}
======================================================================================================================

Animation Properties For (almost) All Objects ---------------||
===============================================================
// dissolveArrow is only available on notes/chains -> dissolve will still work on all playable objects including walls/arcs/bombs
  note.customData.animation = {}
  note.customData.animation.offsetPosition = [[x, y, z, t], [x, y, z, 0.5,"easeOutElastic"]];
  note.customData.animation.offsetWorldRotation = [[pitch, yaw, roll, time], [pitch, yaw, roll, 0.5,"easeOutElastic"]];
  note.customData.animation.localRotation = [[pitch, yaw, roll, time], [pitch, yaw, roll, 0.5,"easeOutElastic"]];
  note.customData.animation.scale = [[x, y, z, time], [x, y, z, time]]; 
  note.customData.animation.dissolve = [[0,0], [1,0.5]]; 
  note.customData.animation.dissolveArrow = [[0,0], [1,0.5]]; 
  note.customData.animation.interactable = [[0,0.2499], [1,0.25]];

===============================================================

============================================
||--------- CREATING NEW OBJECTS ---------||
============================================ 
--spawning --newObjects --createNote --createWall

Creating the Object -----------------------------------------||
===============================================================

  notes.push({
    b: 69,  // Beat
    x: 1,   // Line Index (x pos)
    y: 0,   // Line Layer (y pos)
    c: 0,   // Color
    d: 1,   // Cut Direction
    a: 0,   // Angle Offset 
    customData:{
        (all properties same as filter example above above)
    }
  });

  bombs.push({
    b: 69,  // Beat
    x: 1,   // Line Index
    y: 0,   // Line Layer
    customData:{
        (all properties same as filter example above above)
    }
  });

  obstacles.push({
    b: 69,  // Beat
    d: 5.0, // Duration
    x: 1,   // Line Index
    y: 0,   // Line Layer
    w: 1,   // Width
    h: 5,   // Height
    customData:{
        (all properties same as filter example above above)
    }
  });

  sliders.push({
     c: 0,      // Color
     b: 42.0,   // Head Beat
     x: 1,      // Head Line Index (Head X pos)
     y: 0,      // Head Line Layer (Head Y pos)
     d: 1,      // Head Cut Direction
     mu: 1.0,   // Head Control Point Length Multiplier
     tb: 69.0,  // Tail Beat
     tx: 2,     // Tail Line Index (Tail X pos)
     ty: 2,     // Tail Line Layer (Tail Y pos)
     tc: 0,     // Tail Cut Direction
     tmu: 1.0,  // Tail Control Point Length Multiplier
     m: 0,      // Mid-Anchor Mode
    customData:{
        (all properties same as filter example above above)
    }
  });

  burstSliders.push({
    c: 0,     // Color
    b: 42.0,  // Head Beat
    x: 1,     // Head Line Index
    y: 0,     // Head Line Layer
    d: 1,     // Head Cut Direction
    tb: 69.0, // Tail Beat
    tx: 2,    // Tail Line Index
    ty: 2,    // Tail Line Layer
    sc: 3,    // Slice Count
    s: 0.5,   // Squish Factor
    customData:{
        (all properties same as filter example above above)
    }
  });

===============================================================
A list of all 3.0.0 property descriptions can be found here:
https://bsmg.wiki/mapping/map-format/beatmap.html#summary
===============================================================
-- Available Object Types --
============================
  notes.push({
  bombs.push({
  obstacles.push({
  sliders.push({
  burstSliders.push({
  fakeNotes.push({
  fakeBombs.push({
  fakeObstacles.push({
  fakeBurstSliders.push({
============================

===========================================
||--------- DUPLICATING OBJECTS ---------||
=========================================== 
--dupllicate --copy --fake --createFake

Creating the Object -----------------------------------------||
===============================================================
// Example for grabing a series of notes, dublicating them as fake notes, and then adjusting the fake note properties

  filteredNotes = notes.filter(n => n.b >= 0 && n.b <= 420);
  filteredNotes.forEach(note => {
    // note.customData... (original object custom data goes here)

    // All original custom data set here will transfer to 
    // the duplicated object ('n1') below

    let n1 = JSON.parse(JSON.stringify(note));  // read base note data, set it to a new name called 'n1'
      n1.b -= 0.025;                            // subtract 0.025 from the original notes time | += would add time -> = will set specific time
      n1.customData.track = "fakeNote";
      n1.customData.animation = {}              // clears any previous animations by re-making the animation category
      n1.customData.animation.offsetPosition = [[-12, 0, 0, 0]];
      n1.customData.uninteractable = true;
      n1.customData.spawnEffect = false;        // stops spawn effects from doubling up.
        fakeNotes.push(n1);                     // Grabs all the data we just just modified under the "n1" name, and shoves it into the "fakeNotes" array as a new note object.
  });

==================================================================================
Same thing as above, but with different object types.

Note: You can also start a new "let b2 = ...." thing and keep going up in numbers 
under the same filter to duplicate a note more than once, or even sample another 
duplicate such as 'b1' instead of sampling from the original 'bomb' name.

You can also edit the original note/bomb/etc before creating and modifying 'b1'
==================================================================================

filteredNotes = bombs.filter(b => b.b >= 0 && b.b <= 420);
filteredNotes.forEach(bomb => {
  // bomb.customData... (original object custom data goes here)
  // All original custom data set here will transfer to 
  // the duplicated object ('b1') below
  let b1 = JSON.parse(JSON.stringify(bomb));
    b1.b -= 0.025;
    b1.customData.track = "fakeBomb";
    b1.customData.animation = {}
    b1.customData.animation.offsetPosition = [[-12, 0, 0, 0]];
    b1.customData.uninteractable = true;
    b1.customData.spawnEffect = false;
      fakeBombs.push(b1);
});

filteredNotes = obstacles.filter(o => o.b >= 0 && o.b <= 420);
filteredNotes.forEach(wall => {
  // wall.customData... (original object custom data goes here)
  // All original custom data set here will transfer to 
  // the duplicated object ('w1') below
  let w1 = JSON.parse(JSON.stringify(wall));
    w1.b -= 0.025;
    w1.customData.track = "fakeWall";
    w1.customData.animation = {}
    w1.customData.animation.offsetPosition = [[-12, 0, 0, 0]];
    w1.customData.uninteractable = true;
    w1.customData.spawnEffect = false;
      fakeObstacles.push(w1);
});

filteredNotes = burstSliders.filter(bs => bs.b >= 0 && bs.b <= 420);
filteredNotes.forEach(chain => {
  // chain.customData... (original object custom data goes here)
  // All original custom data set here will transfer to 
  // the duplicated object ('c1') below
  let c1 = JSON.parse(JSON.stringify(chain));
    c1.b -= 0.025;
    c1.customData.track = "fakeChain";
    c1.customData.animation = {}
    c1.customData.animation.offsetPosition = [[-12, 0, 0, 0]];
    c1.customData.uninteractable = true;
    c1.customData.spawnEffect = false;
      fakeBurstSliders.push(c1);
});

=============================================================================
sliders (arcs) are the only exception since fake arcs aren't really a thing. 
Just make the real ones uninteractable and attach them to fake notes.
=============================================================================
  
filteredNotes = sliders.filter(s => s.b >= 0 && s.b <= 420);
filteredNotes.forEach(slider => {
  // slider.customData... (original object custom data goes here)
  // All original custom data set here will transfer to 
  // the duplicated object ('s1') below
  let s1 = JSON.parse(JSON.stringify(slider));
    s1.b -= 0.025;
    s1.customData.track = "fakeSlider";
    s1.customData.animation = {}
    s1.customData.animation.offsetPosition = [[-12, 0, 0, 0]];
    s1.customData.uninteractable = true;
    s1.customData.spawnEffect = false;
      sliders.push(s1); 
});




--events --customEvents --tracks --createTrack
===========================================================================================================
||-------------------------------------------- CUSTOM EVENTS --------------------------------------------||
===========================================================================================================


These events are the main method of animation using Heck.
  Custom events are best for grouping objects and animating them all together using "tracks".
  - Tracks are just a name/id given to an object as a method of grouping/identifying them.
      If you give a bunch of notes (walls/bombs/etc) a track name, then make a rotation animation event using
      that same track name, every object (note/bomb/wall/whatever) will rotate when that event is called.

  - For info on custom event types, check out my video guide below.
      This guide is kinda rough and unscripted, but it covers literally every kind of animation type
      that Heck uses, describes when you should use each one, and it's under 15 minutes :)
  https://youtu.be/nMHaPJ8o-Jk

  - For a text guide, check out the documentation here:
  https://github.com/Aeroluna/Heck/wiki/Animation

  - For examples specific to this script, just keep scrolling lmao

===========================================================================================================

Point Definitions -------------------------------------------||
===============================================================
--pointDefinitions

  pointDefinitions.localSpinDemo = [
  [0, 0, 0, 0],
  [90, 0, 0, 0.25, "splineCatmullRom"],
  [180, 0, 0, 0.5, "splineCatmullRom"],
  [270, 0, 0, 0.75, "splineCatmullRom"],
  [360, 0, 0, 1, "splineCatmullRom"]
  ];
  
===============================================================
- Point defintions are used for common/repeat data
- Instead of having to type out and use the exact same array
  multiple times, you can create a single point defintion for
  a 360° rotation, and recycle that whenever needed!
===============================================================
  Here's an example using an "Animate Track" event:
===============================================================  
  
  customEvents.push({
    b: 420,
    t: "AnimateTrack",
    d: {
      track: "dumbTrackNameHere",
      duration: 69,
      localRotation: "localSpinDemo",
    }
  });

===============================================================
This above example will make whatever objects on the track 
"dumbTrackNameHere" do a front from starting at beat 420,
and will last a total of 69 beats, ending on beat 489
===============================================================




===========================================
||-------- ANIMATION EVENT TYPES --------||
===========================================

Animate Track -----------------------------------------------||
===============================================================
--animateTrack

  customEvents.push({
    b: 69,
    t: "AnimateTrack",
    d: {
      track: "dumbTrackNameHere",
      duration: 420,
      easing: "easeOutQuad",
      offsetPosition: [[x, y, z, time, (optional)easing], [0, 10, 10, 1]],
      offsetWorldRotation: [[pitch, yaw, roll, time, (optional)easing], [0, 0, 180, 1]],
      localRotation: [[pitch, yaw, roll, time, (optional)easing], [0, 0, 180, 1]],
      scale: [[x, y, z, time], [[x, y, z, time]],
      dissolve: [[dissolve, time, (optional)easing], [1, 1]],
      dissolveArrow: [[1, 0], [0, 1]],
      color: [[red, green, blue, alpha, time, (optional)easing]]
    }
  });

===============================================================

Assign Path Animation ---------------------------------------||
===============================================================
--assignPathAnimation --pathAnimation

  customEvents.push({
    b: 69,
    t: "AssignPathAnimation",
    d: {
      track: "dumbTrackNameHere",
      duration: 420,
      easing: "easeOutQuad",
      definitePosition: [[x, y, z, time, (optional)easing], [0, 10, 10, 1]],
      offsetPosition: [[x, y, z, time, (optional)easing], [0, 10, 10, 1]],
      offsetWorldRotation: [[pitch, yaw, roll, time, (optional)easing], [0, 0, 180, 1]],
      localRotation: [[pitch, yaw, roll, time, (optional)easing], [0, 0, 180, 1]],
      scale: [[x, y, z, time], [x, y, z, time]],
      dissolve: [[dissolve, time, (optional)easing], [1, 1]],
      dissolveArrow: [[1, 0], [0, 1]],
      color: [[red, green, blue, alpha, time, (optional)easing]],
      interactable: [[0,02499], [1,0.25]];
    }
  });  

===============================================================




=============================================
||----------- OTHER EVENT TYPES -----------||
=============================================


Assign Player To Track --------------------------------------||
===============================================================
!!! - AVOID USING SLOW ANIMATIONS / LONG AND SLOW EASINGS - !!!
!!!!!!! -- THESE CAN AND WILL CAUSE MOTION SICKNESS -- !!!!!!!!
===============================================================
--assignPlayerToTrack --playerTrack --player

  customEvents.push({
    b: 69,
    t: "AssignPlayerToTrack",
    d: {
    track: "playerTrack",
    target: "Root/Head/LeftHand/RightHand" // optional
    }
  });

=================================================================
Note: The player is treated as an "environment" object.
Check description in env section below for info and quirks!
=================================================================


Assign Track Parent -----------------------------------------||
===============================================================
--assignTrackParent --parentTrack

  customEvents.push({
    b: 0,
    t: "AssignTrackParent",
    d: {
    childrenTracks: ["heckTrack", "frigTrack"], 
    parentTrack: "dumbTrackNameHere" ,
    worldPositionStays: true,
    }
  });

===============================================================
Creates a new "parent" track that holds all children tracks
- Any animation applied to the parent, will be be applied to the children
- Each new parent track sets an origin point at world center [0,0,0]
- 'worldPositionStays' will adjust origin points of children tracks to keep
  their current world position.
===============================================================





--environment --env --platform --lighting
==========================================================================================================
||-------------------------------------------- ENVIRONMENTS --------------------------------------------||
==========================================================================================================  
imma be honest, idfk half of this stuff, and i haven't really used it much myself...
These descriptions are going to be pretty barebones, but this should be everything! :3

IMPORTANT NOTES:
===================================================================================================

  - Playable objects != environment objects!
    - env objects animate with 'position' and 'rotation' instead of their 'offset' counterparts.
    - Their coordinates are measured in Meters and not the "Noodle Units" (grid spacing) that
      playable objects such as notes/walls use. - The conversion for this is 1m = 0.6 units.
  
      - Base game environment objects are often offset both in Unity, and with their origin points.
    - Use Runtime Unity Editor (RUE) to look up the "Environment" host object, then dig through
      to find the exact object and it's default transform (pos/rot/scale) values.
      "RUE" is a mod pinned in BSMG #pc-mod-dev
  
      - Regex lookup ID's can be found by enabling the setting in the Chroma config:
      --> Location: Beat Saber/UserData/Chroma.json --> "PrintEnvironmentEnhancementDebug": true,
    - Open any map with a "Chroma" requirement on the environment you want to modify
      The object lookups will then be printed to your log file:
      --> Location: Beat Saber/Logs/_latest.log

===================================================================================================
Examples below were made for the "Origins" environment:
https://github.com/UGEcko/Chroodle/blob/main/ChromaLogs/1.29.1/OriginsEnvironment.log
===================================================================================================

basic environment lookup options -------------------------------------------||
==============================================================================
--regex --lookup

  environment.push({
    id: "Environment\\.\\[\\d*\\]BottomGlow$",
    lookupMethod: "Regex", // Regex, Exact, Contains, StartsWith, EndsWith
    //components: // see below
    duplicate: 1,
    active: true,
    scale: [x, y, z],
    position: [x, y, z],
    localPosition: [x, y, z],
    rotation: [x, y, z],
    localRotation: [x, y, z],
    track: "dumbTrackNameHere"
  });

===============================================================
'id' example above is for regex
For things like "Contains", you can just use a single keyword
===============================================================

Remove everything in an environment except for ... ----------------------------------------|| 
=============================================================================================
Lookup example for 'OriginsEnvironment' that yeets everything in the environment, except for
the scene and lighting setup, a few lights, highway, players place, and smoke.
  
- This works by targeting everything under OriginsEnvironment -> Environment, but ignores
  every object specifically mentioned after the '?!' command, and in between the 
  '( )' which opens up right before the '?!'  --> (?!...stuff...)
- Each new item is seperated by a '|' indicating "and", then each string section on a 
  new line is added together using the '+' at the end of the line. Finally it's closed off
  with the bottom end statement, and a comma.
- A second lookup is then done below to grab all the environment rings, since those are
  stored outside of the usual "Environment" parent object in the scene.
- Symbol meanings: 
  '^' = start of the lookup, '\\' = goes before symbol to ignore, 'd*' = any number
=============================================================================================
--regex --lookup --removeEnvironment --removeRings --HUD

  environment.push({
    id: "^OriginsEnvironment\\.\\[0\\]Environment\\.(?!\\[\\d*\\]NarrowGameHUD" +
      "|\\[\\d*\\]SceneSetup" +
      "|\\[\\d*\\]LightWithIdManager" +
      "|\\[\\d*\\]BSBakedLightingLightWithIds" +
      "|\\[\\d*\\]BakedReflectionProbe
      "|\\[\\d*\\]LightEffects" +
      "|\\[\\d*\\]CoreLighting" +
      "|\\[\\d*\\]DecoratorContext" +
      "|\\[\\d*\\]FakeMirrorSettings" +
      "|\\[\\d*\\]DustPS" +
      "|\\[\\d*\\]LightAreaL" +
      "|\\[\\d*\\]LightAreaR" +
      "|\\[\\d*\\]FrontLights" +
      "|\\[\\d*\\]PlayersPlace" +
      "|\\[\\d*\\]TrackConstruction"
      "|\\[\\d*\\]TrackMirror" +
      "|\\[\\d*\\]BigSmokePS" +
      ").*$",
    lookupMethod: "Regex",
    active: false,
  },{
    id: "LightsTrackLaneRing",
    lookupMethod: "Regex",
    active: false,
  });

=============================================================================================

Animate Component -------------------------------------------------------------------------||
=============================================================================================
--animateComponent --lightID --bloom --fog
ngl this is a lot of nerd lighting stuff that I really don't know much about...

Here's all the copy/paste stuff related to this script if you need to use it, but otherwise
check the heck documentation to see what's up: 
- AnimateComponent Event  : https://github.com/Aeroluna/Heck/wiki/Animation#animatecomponent
- Available Cmponents     : https://github.com/Aeroluna/Heck/wiki/Environment/#components
- Animate Fog Example     : https://streamable.com/d1ztwq
=============================================================================================

  customEvents.push({
    b: 69, // Time in beats.
    t: "AnimateComponent",
    d: {
      track: string // The track you want to animate.
      duration: float, // The length of the event in beats (defaults to 0).
      easing: string, // An easing for the animation to follow (defaults to easeLinear).
      component name: { // name of component
        field name: point definition // name of field on component
      }
    }
  });

  // Fog adjustment example - Default fog values can be found in RUE by checking Environment object components
  customEvents.push({
    b: 69,
    t: "AnimateComponent",
    d: {
      track: "pogFog", // assign track to the root "Environment" object with an env lookup from above ^^^
      duration: 0,
      attenuation: [value, time, (optional)easing],
      offset: [[value, time, (optional)easing]],
      startY: [[value, time, (optional)easing]],
      height: [[value, time, (optional)easing]],
    }
  }); 

====================================================================================================
Available components for the thing:

  ILightWithId: {
    lightID: // Which ID to assign. Use with the lightID tag for lighting events (Not animateable)
    type:    // Which event type to active on. (Not animateable)
  }
  
  BloomFogEnvironment: {  // Will always be found on the [0]Environment object.
    attenuation: [value, time, (optional)easing],  // Attenuation is the fog density. logarithmic
    offset: [value, time, (optional)easing],       // Offset I have no idea
    startY: [value, time, (optional)easing],       // StartY is starting Y of the gradient thing
    height: [value, time, (optional)easing],       // Height is the gradient length of the dissolving plane fog
  }
 
  TubeBloomPrePassLight: {
    colorAlphaMultiplier: [value, time, (optional)easing],  // Alpha = Post process bloom (glow you'd see on a saber)
    bloomFogIntensityMultiplier: [value, time, (optional)easing], // How much the light spills into and fills the fog
  }

====================================================================================================





==========================================================================================================
||---------------------------------------- GEOMETRY & MATERIALS ----------------------------------------||
========================================================================================================== 
--geometry --primitives --blender
These are the cool things that let mappers build whole ass environments out of cubes and stuff in Blender!

...unfortunately I don't know how to use Blender, or Python, so I can't make a tool that does this.
Swifter on the other hand does! If this some something you want to to, check out ReMapper:
- https://github.com/Swifter1243/ReMapper

However, if you wanna be a nerd and hack some things together by scripting, 
then here's all the stuff for that! Good luck!!!!!
==========================================================================================================
VERY IMPORTANT NOTE: 
  
  For the sake of framerates and not cooking peoples computers, please try to create as many unique
  materials OUTSIDE of the objects themselves!

  Each material made uniquely on a piece of geometry, means that the game has to process that
  material as if it had never seen it before.

  When you create a material outside of a geometry piece, the computer only has to think about
  it ONCE, regardless of how many objects are using that same material.

  So, creating a unique material for 100 objects = GPU has to think 100 times >:(
      creating ONE material then slapping that on 100 objects = GPU only needs to think ONCE :)
  
  This = optimized map, good frames, and happy players :)

(of course that is an over simplification, but you get the idea)

Materials ------------------------------------------------------------------||
==============================================================================
- Available Object Types:
==============================
--geoTypes --geoObjects  

"Sphere"
  "Capsule"
  "Cylinder"
  "Cube"
  "Plane"
  "Quad"
  "Triangle"

- Available Shaders:
=========================
--shaders --materials

  "Standard"
  "OpaqueLight"
  "TransparentLight"
  "BaseWater"
  "BillieWater"
  "BTSPillar"
  "InterscopeConcrete"
  "InterscopeCar"
  "Obstacle"
  "WaterfallMirror"

  - Shader Keywords:
===================================================================================
Keywords can be looked up in Runtime Unity Editor (RUE).

- Navigate to any object that will likely be using the same shader.
  (most environment objects will be using the "Standard" (Custom/SimpleLit) shader)
- In the components list on the bottom, click on "MeshRenderer (shader name)"
- In the new window pop-up, scroll down and click on the "shared material" button
- Then click the "shaderKeywords" button.
You will now see a list of available keywords that were used on that material.

Keep in mind that even though we have access to use these keywords and enable
certain shader features, we don't have the ability to directly control these
enabled properties individually. Custom Chroma Geo materials may sometimes behave 
differently than their standard base game counterparts.

A list of Chroma's default custom material keywords can be found here:
https://github.com/Aeroluna/Heck/blob/37ea160048f12ce749507477f83ad6a06c2ec273/Chroma/EnvironmentEnhancement/MaterialsManager.cs#L174
===================================================================================
Note: Any "mirror" shader won't actually utilize the mirror component in the game.
This is something the game sets up on scene load, and requires a new camera in the
scene for every mirror. This is something currently out of our control, and would
also be VERY performance heavy if it were to at some point be implemented.
===================================================================================

Material Usage Example: ------------------------||
==================================================
Format: 'materials.materialName'
    
  materials.unlitWhiteStandard = ({
    color: [1, 1, 1, 0],
    shader: "Standard",
    "shaderKeywords": [] // clears shader keywords, disabling all shader features
  });
    
  materials.blueStandard = ({
    color: [0, 0, 1, 0],
    shader: "Standard", // Standard shader based on BTS pillar -> What you see in every Swifter map ever.
  });

Geometry Usage Example: ------------------------||
==================================================
  
  environment.push({
    geometry: {
      type: "Sphere",
      material: "unlitWhiteStandard",
      collision: true // (Optional - see below) -> Default undefined = 'false'
    },
    scale: [6.9, 6.9, 6.9],
    track: "BigWHiteBall",
    position: [0, 7, 5]
  });

=========================================================================================================================================
- Collision is useful if the object is near the player and you would like debris to bounce of of it.
  Otherwise, feel free to not include this property as it can greatly impact performance.
- Enabling a collider on Geo objects can cause some other objects (such as the menu pointer) to collide with that Geo object.
  ...do what you will with this information
=========================================================================================================================================
//surely this is everything and there's nothing I could have possibly missed :clueless:                                               */
//#endregion
/* --- Copy/Paste Glossary - aka list of things to 'CTRL+F': ---

A Selection of common search terms.
Highlight the term you want to look up, then hit 'CTRL+F' to jump to that section.

--notes --walls
--filtering
--filterTypes
--properties --staticProperties
--properties --animatedProperties
--spawning --newObjects --createNote --createWall
--dupllicate --copy --fake

--events --customEvents --tracks --createTrack
--pointDefinitions
--animateTrack
--assignPathAnimation --pathAnimation
--assignPlayerToTrack --playerTrack --player
--assignTrackParent --parentTrack

--environment --env --platform --lighting
--regex --lookup
--regex --lookup --removeEnvironment --removeRings --HUD
--animateComponent --lightID --bloom --fog
--geoTypes --geoObjects 
--shaders --materials

*///-------------------------------------


//=======================================================================================================================================
// DO YOUR DIRTY WORK HERE  =====================================================================================================











//#region =========== IGNORE PT.2  =========== --> Export & write file stuff

  //=== Post Fixes 1 ==========================================================
    if (FixAllArtArcs) {fixArtArcsBetween(0,69420621)}
  //===========================================================================
  //=== Decimal precision =====================================================
    const jsonP = Math.pow(10, precision);
    const sortP = Math.pow(10, 2);
  //===========================================================================
  //=== dw about it ===========================================================
    function deeperDaddy(obj) {
      if (obj)
      for (const key in obj) {
      if (obj[key]==null) {
      delete obj[key];
      } else if (typeof obj[key]==="object"||Array.isArray(obj[key])){
      deeperDaddy(obj[key]);
      } else if (typeof obj[key]=="number"){
      obj[key]=parseFloat(
      Math.round((obj[key]+Number.EPSILON)*jsonP)/jsonP);
      }}}; 
    deeperDaddy(difficulty);
    function sortShit() {
      (a, b) =>
      parseFloat(Math.round((a.b+Number.EPSILON)*sortP)/sortP)-
      parseFloat(Math.round((b.b+Number.EPSILON)*sortP)/sortP)||
      parseFloat(Math.round((a.x+Number.EPSILON)*sortP)/sortP)-
      parseFloat(Math.round((b.x+Number.EPSILON)*sortP)/sortP)||
      parseFloat(Math.round((a.y+Number.EPSILON)*sortP)/sortP)-
      parseFloat(Math.round((b.y+Number.EPSILON)*sortP)/sortP)||
      parseFloat(Math.round((a.e+Number.EPSILON)*sortP)/sortP)-
      parseFloat(Math.round((b.e+Number.EPSILON)*sortP)/sortP);
    };
  //==========================================================================
  // Lightshow Handling ======================================================
    if (lightshow) {
      if (IgnoreInputLights) {
        // Clear basic events
        difficulty.basicBeatmapEvents=[];
        difficulty.colorBoostBeatmapEvents=[];
        difficulty.lightColorEventBoxGroups=[];
        difficulty.lightRotationEventBoxGroups=[];
        difficulty.lightTranslationEventBoxGroups=[];
      }
      // Merge basic events
      difficulty.basicBeatmapEvents=[
      ...(difficulty.basicBeatmapEvents||[]),
      ...(lightsInput.basicBeatmapEvents||[])];
      difficulty.colorBoostBeatmapEvents=[
        ...(difficulty.colorBoostBeatmapEvents||[]),
        ...(lightsInput.colorBoostBeatmapEvents||[])];
      difficulty.lightColorEventBoxGroups=[
        ...(difficulty.lightColorEventBoxGroups||[]),
        ...(lightsInput.lightColorEventBoxGroups||[])];
      difficulty.lightRotationEventBoxGroups=[
        ...(difficulty.lightRotationEventBoxGroups||[]),
        ...(lightsInput.lightRotationEventBoxGroups||[])];
      difficulty.lightTranslationEventBoxGroups=[
        ...(difficulty.lightTranslationEventBoxGroups||[]),
        ...(lightsInput.lightTranslationEventBoxGroups||[])];
      // Merge env, geo, and materials
      if (lightshowEnv) {
      difficulty.customData.environment=[
      ...(difficulty.customData.environment||[]),
      ...(lightsInput.customData.environment||[])];
      difficulty.customData.materials={
      ...(difficulty.customData.materials||{}),
      ...(lightsInput.customData.materials||{})};
      }
      // Merge customEvents
      if (lightshowTracks) {
      difficulty.customData.customEvents=[
      ...(difficulty.customData.customEvents||[]),
      ...(lightsInput.customData.customEvents||[])];
      }
    };
  //==========================================================================
  //=== Sorting and Exporting ================================================
    difficulty.bpmEvents.sort(sortShit());
    difficulty.rotationEvents.sort(sortShit());
    difficulty.colorNotes.sort(sortShit());
    difficulty.bombNotes.sort(sortShit());
    difficulty.obstacles.sort(sortShit());
    difficulty.sliders.sort(sortShit());
    difficulty.burstSliders.sort(sortShit());
    difficulty.waypoints.sort(sortShit());
    difficulty.colorBoostBeatmapEvents.sort(sortShit());
    difficulty.basicBeatmapEvents.sort(sortShit());  
    difficulty.customData.customEvents.sort(sortShit());
    difficulty.customData.fakeColorNotes.sort(sortShit());
    difficulty.customData.fakeBombNotes.sort(sortShit());
    difficulty.customData.fakeObstacles.sort(sortShit());
    difficulty.customData.fakeBurstSliders.sort(sortShit());
    fs.writeFileSync(OUTPUT, JSON.stringify(difficulty, null, 0));
  //==========================================================================
  //=== Important Log Messages and Warnings =========================================================================================================
    if (showRTGuides && hideRTStats || hideRTYapping) {
    console.log(`${header}${bold}HELLO HI!!!! ${reset}${bodyText}- THIS IS A FRIENDLY REMINDER THAT RT GUIDES ARE STILL ENABLED!${reset}`);
    console.log(`${black} - Please remember to disable them before you export and upload your map! - ${reset}`);
    };
  //=================================================================================================================================================

//#endregion