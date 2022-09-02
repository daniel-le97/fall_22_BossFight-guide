const knightElem = document.getElementById('knight')
const bossLevelElem = document.getElementById("level")
const bossHPElem = document.getElementById("boss-health")
const heroHPElem = document.getElementById("hero-health")
const gold = document.getElementById("gold")
const monsterGif = document.getElementById("monster-gif")
// @ts-ignore
const toast = new bootstrap.Toast(document.getElementById('danger-toast'))
const wolfTurnsElem = document.getElementById('wolfTurns')
const uniTurnsElem = document.getElementById('uniTurns')
const wizardTurnsElem = document.getElementById('wizardTurns')


// #region Starter Code
let fighting = false
function debounce(func, timeout = 950) {
    let timer
    return (...args) => {
        clearTimeout(timer)
        timer = setTimeout(() => { func.apply(this, args) }, timeout)
    }
}

function reset() {
    fighting = false
    // @ts-ignore
    knightElem.src = "assets/knight.webp"
}

const delayReset = debounce(reset)
function animateAttack() {
    if (!fighting) {
        fighting = true
        // @ts-ignore
        knightElem.src = "assets/attack.webp"
    }
    delayReset()
}

const hero = {
    hp: 100,
    gold: 0
}

const boss = {
    hp: 100,
    lvl: 1
}

function update() {
    // @ts-ignore
    bossHPElem.innerText = boss.hp
    // @ts-ignore
    heroHPElem.innerText = hero.hp
    // @ts-ignore
    bossLevelElem.innerText = boss.lvl
    // @ts-ignore
    gold.innerHTML = hero.gold
    // @ts-ignore
    wolfTurnsElem.innerText = companions[0].remainingTurns
    // @ts-ignore
    wizardTurnsElem.innerText = companions[1].remainingTurns
    // @ts-ignore
    uniTurnsElem.innerText = companions[2].remainingTurns

}


function attack() {
    if (hero.hp <= 0) {
        return
    }
    boss.hp -= 5
    if (boss.hp < 0) {
        bossLevelUp()
    }
    animateAttack()
    update()
}

function bossLevelUp() {
    boss.lvl++
    boss.hp = boss.lvl * 100
    hero.gold += boss.lvl * 100
    // @ts-ignore
    monsterGif.style.transform = `scale(${(10 + boss.lvl) * .1})`
    toast.show()
}

function bossAttack() {
    hero.hp -= boss.lvl
    if (hero.hp <= 0) {
        hero.hp = 0
        heroDeath()
    }
    update()
}

function heroDeath() {
    // @ts-ignore
    knightElem.src = "assets/death.webp"
    document.body.style.backgroundImage = "url(assets/died.jpg)"
    document.body.classList.add('dead')
}


setInterval(bossAttack, 2000)

// #endregion


// ANCHOR companion code starts here

const companions = [
    {
        name: "wolf",
        type: "dmg",
        cost: 100,
        purchasableTurns: 10,
        remainingTurns: 0,
        value: 1
    },
    {
        name: "wizard",
        type: "dmg",
        cost: 300,
        purchasableTurns: 15,
        remainingTurns: 0,
        value: 5
    },
    {
        name: "unicorn",
        type: "heal",
        cost: 500,
        purchasableTurns: 20,
        remainingTurns: 0,
        value: 1
    }
]

// NOTE this function will take in the companion's value and apply it to the boss's health
function damageBoss(val) {
    boss.hp -= val
    update()
}

// NOTE this function will take in the companion's value and apply it to the hero's health
function healHero(val) {
    hero.hp += val
    update()
}


function buyCompanion(companionName) {
    const boughtCompanion = companions.find(c => c.name == companionName)
    console.log(boughtCompanion);
    // @ts-ignore
    if (hero.gold >= boughtCompanion.cost) {
        // @ts-ignore
        hero.gold -= boughtCompanion.cost
        // @ts-ignore
        boughtCompanion.remainingTurns += boughtCompanion.purchasableTurns
    }
    update()
}

function applyCompanion() {
    // do i have a companion
    // decrease the amount of turns left 
    // check to see type of companion
    // if i have companion....apply abilities...do the thing
    companions.forEach(c => {
        if (c.remainingTurns > 0) {
            c.remainingTurns--
            if (c.type == 'dmg') {
                damageBoss(c.value)
            } else if (c.type == 'heal') {
                healHero(c.value)
            }
        }
        update()
    })
}

setInterval(applyCompanion, 1000)

// NOTE this is our old code.... we started with creating a buy function for each upgrade or 'companion' then refactored it into one function: buyCompanion()


// function buyWolf() {
//     // console.log('buying wolf');
//     // do i have money
//     // buy the wolf: give me my turns!!!!
//     // take my money
//     if (hero.gold >= 100) {
//         companions[0].remainingTurns += companions[0].purchasableTurns
//         hero.gold -= 100
//     }
//     update()
//     console.log(hero.gold, companions[0]);
// }

// function wolfAttack() {
//     // have i purchased this??
//     // is the remaining turns greater than 0
//     // apply upgrade... apply dmg to the boss
//     // take away one of my turns
//     console.log('wolf attack');
//     // NOTE this find will give me the same thing as companions[0]
//     const wolf = companions.find(c => c.name == 'wolf')
//     // @ts-ignore
//     if (wolf.remainingTurns > 0) {
//         // @ts-ignore
//         damageBoss(wolf.value)
//         // @ts-ignore
//         wolf.remainingTurns--
//         update()
//     }
// }


// function buyUnicorn() {
//     console.log('buying unicorn');
//     if (hero.gold >= 500) {
//         companions[1].remainingTurns += companions[1].purchasableTurns
//         hero.gold -= 500
//     }
//     update()
// }

// function unicornHeal() {
//     const unicorn = companions.find(c => c.name == 'unicorn')
//     // @ts-ignore
//     if (unicorn.remainingTurns > 0) {
//         // @ts-ignore
//         healHero(unicorn.value)
//         // @ts-ignore
//         unicorn.remainingTurns--
//         update()
//     }
// }



// setInterval(wolfAttack, 1000)
// setInterval(unicornHeal, 1000)