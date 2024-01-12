const d = document

function enablePtrain() {
  d.getElementById("enablePt").checked
  ? d.getElementById("mageToggle").style.display = "block"
  : d.getElementById("mageToggle").style.display = "none"
}

function advancedOptions() {
  d.getElementById("advancedToggle").checked
  ? d.getElementById("advancedBoxes").style.display = "block"
  : d.getElementById("advancedBoxes").style.display = "none"
}

async function fadeAnimation(n) {
	d.getElementById("results").style.transition = "none"
	switch(n) {
		case 0:
			d.getElementById("results").style.backgroundColor = "#94d1b5"
			await new Promise(t => setTimeout(t, 0))
			d.getElementById("results").style.backgroundColor = "#367d5c"
			d.getElementById("results").style.transition = "0.8s"
			break
		case 1:
			d.getElementById("results").style.backgroundColor = "#ff8080"
			await new Promise(t => setTimeout(t, 200))
			d.getElementById("results").style.backgroundColor = "#367d5c"
			d.getElementById("results").style.transition = "1.8s"
			break
	}
}

async function calculation() {
  const base      = Math.floor(d.getElementById("box1").value)
  const stat      = Math.floor(d.getElementById("box2").value)
  const equips    = Math.floor(d.getElementById("box3").value)
  const att       = Math.floor(d.getElementById("box4").value)
  const crit      = d.getElementById("critRing").checked ? 0.035 : 0.01
  const critMulti = d.getElementById("critRing").checked ? 1.075 : 1.05
  const ptrain    = d.getElementById("enablePt").checked
  const magic     = d.getElementById("magePt"  ).checked
  
  d.getElementById("box1").value = base
  d.getElementById("box2").value = stat
  d.getElementById("box3").value = equips
  d.getElementById("box4").value = att

  let errors = 0
  let error1 = error2 = error3 = error4 = ""
  if (base < 1 || base > 1000) {
    d.getElementById("box1").style.backgroundColor = "#ff8080"
    error1 = "Box 1 value must range from 1 to 1000. "
    errors++
  } else {
    d.getElementById("box1").style.backgroundColor = "#FFFFFF"
  }
  if (stat < 5 || stat > 1000) {
    d.getElementById("box2").style.backgroundColor = "#ff8080"
    error2 = "Box 2 value must range from 5 to 1000. "
    errors++
  } else {
    d.getElementById("box2").style.backgroundColor = "#FFFFFF"
  }
  if (equips < -50 || equips > 76) {
    d.getElementById("box3").style.backgroundColor = "#ff8080"
    error3 = "Box 3 value must range from -50 to 76. "
    errors++
  } else {
    document.getElementById("box3").style.backgroundColor = "#FFFFFF"
  }
  if (att < 4 || att > 60 || att == 6 || att == 8 || att == 10 || att == 12 || att == 14) {
    d.getElementById("box4").style.backgroundColor = "#ff8080"
    error4 = "Box 4 value must be a valid weapon. "
    errors++
  } else {
    d.getElementById("box4").style.backgroundColor = "#FFFFFF"
  }

  let targetEff = d.getElementById("box5").value
  if (targetEff < 75 && d.getElementById("critRing").checked && ptrain) {
    d.getElementById("box5").value = "75"
    d.getElementById("box5").style.backgroundColor = "#ffff80"
  } else if (targetEff < 35) {
    d.getElementById("box5").value = "35"
    d.getElementById("box5").style.backgroundColor = "#ffff80"
  } else if (targetEff > 99) {
    d.getElementById("box5").value = "99"
    d.getElementById("box5").style.backgroundColor = "#ffff80"
  } else {
    d.getElementById("box5").style.backgroundColor = "#FFFFFF"
  }
  targetEff = d.getElementById("box5").value
  
  if (errors > 0) {
    d.getElementById("resultsText1").innerHTML = errors + (errors == 1 ? " ERROR:" : " ERRORS:") + " Please ensure all fields are properly filled with valid entries."
    d.getElementById("resultsText2").innerHTML = error1 + error2 + error3 + error4
		
		fadeAnimation(1)
		window.scrollTo(0, d.body.scrollHeight)
    return
  }

  const mobArray = [
    { name:                  "Rat Lv.1", def:   4, hp:   25, ptrain: false },
    { name:                  "Rat Lv.3", def:   7, hp:   35, ptrain: false },
    { name:                 "Crow Lv.6", def:  13, hp:   40, ptrain: false },
    { name:                 "Wolf Lv.9", def:  17, hp:   50, ptrain: false },
    { name:            "Scorpion Lv.12", def:  18, hp:   50, ptrain: false },
    { name:               "Cobra Lv.13", def:  18, hp:   50, ptrain: false },
    { name:                "Worm Lv.14", def:  19, hp:   55, ptrain: false },
    { name:              "Goblin Lv.15", def:  21, hp:   60, ptrain:  true },
    { name:               "Mummy Lv.25", def:  36, hp:   80, ptrain:  true },
    { name:             "Pharaoh Lv.35", def:  51, hp:  100, ptrain:  true },
    { name:            "Assassin Lv.45", def:  71, hp:  120, ptrain:  true },
    { name:            "Assassin Lv.50", def:  81, hp:  140, ptrain:  true },
    { name:      "Assassin Ninja Lv.55", def:  91, hp:  160, ptrain:  true },
    { name:     "Skeleton Archer Lv.80", def: 101, hp:  300, ptrain: false },
    { name:              "Zombie Lv.65", def: 106, hp:  200, ptrain:  true },
    { name:            "Skeleton Lv.75", def: 121, hp:  300, ptrain:  true },
    { name:    "Skeleton Warrior Lv.90", def: 146, hp:  375, ptrain:  true },
    { name:            "Vampire Lv.100", def: 171, hp:  450, ptrain:  true },
    { name:            "Vampire Lv.110", def: 186, hp:  530, ptrain:  true },
    { name:        "Drow Ranger Lv.125", def: 191, hp:  600, ptrain: false },
    { name:          "Drow Mage Lv.130", def: 191, hp:  600, ptrain: false },
    { name:      "Drow Assassin Lv.120", def: 221, hp:  620, ptrain:  true },
    { name:     "Drow Sorceress Lv.140", def: 221, hp:  600, ptrain: false },
    { name:       "Drow Fighter Lv.135", def: 246, hp:  680, ptrain:  true },
    { name:      "Lizard Archer Lv.160", def: 271, hp:  650, ptrain: false },
    { name:      "Lizard Shaman Lv.170", def: 276, hp:  600, ptrain: false },
    { name:          "Dead Eyes Lv.170", def: 276, hp:  600, ptrain: false },
    { name:     "Lizard Warrior Lv.150", def: 301, hp:  680, ptrain:  true },
    { name:              "Djinn Lv.150", def: 301, hp:  640, ptrain:  true },
    { name: "Lizard High Shaman Lv.190", def: 326, hp:  740, ptrain: false },
    { name:           "Gargoyle Lv.190", def: 326, hp:  740, ptrain:  true },
    { name:     "Lizard Captain lv.180", def: 361, hp:  815, ptrain:  true },
    { name:           "Minotaur Lv.225", def: 511, hp: 4250, ptrain:  true },
    { name:           "Minotaur Lv.250", def: 601, hp: 5000, ptrain:  true },
    { name:           "Minotaur Lv.275", def: 691, hp: 5750, ptrain:  true },
  ]

  const totalStat = stat + equips
  const ticks = ptrain ? 38 : 10
  const specMulti = (ptrain ? 1.5 * (magic ? 1.08 : 1) : 1)
  const min = specMulti * (Math.floor(base / 4) + att * totalStat / 20)
  const max = specMulti * (Math.floor(base / 4) + att * totalStat / 10)
  const avgCritMulti = 1 + (critMulti - 1) / 2
  const targetProb = 1 - ((100 - targetEff) / 100) ** (1 / ticks)

  let targetMob = nextMob = reqStats = duration = 0
  for (let i = 0; i < mobArray.length; i++) {
    if (ptrain && !mobArray[i].ptrain) { continue }
    const prob = Math.min((1 - crit) * (max - mobArray[i].def) / (max - min) + crit, 1)
    if (targetProb < prob) {
      const durationCheck = min < mobArray[i].def
      ? mobArray[i].hp / (
        crit * (max * avgCritMulti - mobArray[i].def) +
        (1 - crit) * (max - mobArray[i].def) * prob / 2
        )
      : mobArray[i].hp / (
        crit * (max * avgCritMulti - mobArray[i].def) +
        (1 - crit) * (max + min - 2 * mobArray[i].def) / 2
        )
      if (duration < durationCheck) {
        duration = durationCheck
        targetMob = mobArray[i].name
      } else if (duration == durationCheck) {
        targetMob += " & " + mobArray[i].name
      }
    } else {
      nextMob = mobArray[i].name
      reqStats = Math.ceil(
        (20 * mobArray[i].def - 20 * Math.floor(base / 4) * specMulti) /
        (att * specMulti * (2 - (targetProb - crit) / (1 - crit)))
        ) - totalStat
      break
    }
  }

  let minutes = String(Math.floor(duration / 60))
  let seconds = String(Math.round((duration / 60 - minutes) * 60))
  if (minutes == 0) {
    minutes = "00"
  } else if (minutes.length == 1) {
    minutes = "0" + minutes
  }
  if (seconds.length == 1) {
    seconds = "0" + seconds
  }
  
  if (targetMob != 0) {
    d.getElementById("resultsText1").innerHTML = "You can effectively " + (ptrain ? "ptrain " : "train ") + targetMob + " for an average duration of " + minutes + ":" + seconds + "."
  } else {
    d.getElementById("resultsText1").innerHTML = "There are no mobs you can train at your level."
  }
  if (nextMob != 0) {
    d.getElementById("resultsText2").innerHTML = "You can start training " + nextMob + " with " + targetEff + "%+ efficiency after " + reqStats + " more " + (reqStats == 1 ? "stat." : "stats.")
  } else {
    d.getElementById("resultsText2").innerHTML = ""
  }
  
	fadeAnimation(0)
  window.scrollTo(0, d.body.scrollHeight)
}
