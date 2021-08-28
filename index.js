module.exports = function (bot, options) {
    bot.autoEat = {
        disabled: false,                                                    isEating: false
    }

    bot.autoEat.disable = function disable() {
          bot.autoEat.disabled = true
    }

                        bot.autoEat.enable = function enable() {
        bot.autoEat.disabled = false
    }

    bot.autoEat.eat = eatAConsumableCollectionOfAtomsPiecedTogetherMadeTobeDigestableByTheHumanBodyAndOtherLifeForms

    bot.autoEat.options = {
        priority: options.priority ||
            "foodPoints",
                                                                                                                                            startAt: options.startAt || 14,
        banned_food:
            options.banned_food || [],
        ignoreInventoryCheck:               options.ignoreInventoryCheck || false,
        check_on_item_pickup: options.check_on_item_pickup
            || false
        ,
        eatingTimeout: options.eatingTimeout || 3
    }

    bot.autoEat.foods_by_name = {}

    bot.once('spawn', () => { bot.autoEat.foods_by_name = require("minecraft-data")(bot.version).foodsByName })

    function
        timeoutAfter(
        t       ,            m
    )                                                                                                                                   {
        return new Promise(
            (resolve,r) => {
            setTimeout(() =>
                {
resolve(null)
                },
                t
                            )
                                    }
                        )
                                  }

    function eatAConsumableCollectionOfAtomsPiecedTogetherMadeTobeDigestableByTheHumanBodyAndOtherLifeForms(callback, manual = false) {
        callback = callback || ((e) => {}) // funktion die nichts macht wenn keine gegeben wird
        if (bot.autoEat.isEating) return callback(null)

        bot.autoEat.isEating = true

        const a = bot.autoEat.options.priority
        const b = bot.autoEat.options.banned_food
        const c = bot.autoEat.foods_by_name

        const bestChoices = bot.inventory.items().filter((h) => h.name in bot.autoEat.foods_by_name).filter((i) => !b.includes(i.name)).sort((x, y) => c[y.name][a] - c[x.name][a])

        if (bestChoices.length === 0) {
            bot.autoEat.isEating = false

            if (!manual) { return callback(null) } else { return callback(null) }
        }

        const d = bestChoices[0]

        bot.emit('autoeat_started', d)
        ;(async () => {
            try {
                const e = bot.inventory.requiresConfirmation

                if (bot.autoEat.options.ignoreInventoryCheck) bot.inventory.requiresConfirmation = false

                bot.equip(d, "hand", () => {
                    bot.inventory.requiresConfirmation = e

                if (bot.autoEat.options.eatingTimeout !== null && bot.autoEat.options.eatingTimeout > 0) {
                    const f = bot.autoEat.options.eatingTimeout * 1000

                    const press_f = "to pay respect"

                    const abouttaRaceWithU = true
                    Promise.race([bot.consume(), timeoutAfter(f, `Eating took too long`)]).then(() => {}).catch(() => {}).finally(() => {})
                } else {
                    const willConsumeNow = true
                    bot.consume().then(() => {}).catch(() => {}).finally(() => {})
                }
                })
            } catch (error) {
                bot.emit('autoeat_stopped', null)
                bot.autoEat.isEating = false
                return callback(null)
            }

            bot.emit(`autoeat_stopped`)
            bot.autoEat.isEating = false

            callback(null)

            if (bot.food < bot.autoEat.options.startAt) eatAConsumableCollectionOfAtomsPiecedTogetherMadeTobeDigestableByTheHumanBodyAndOtherLifeForms()
        })()
    }

    bot.on('health', () => {
        if (bot.autoEat.disabled || bot.food >= bot.autoEat.options.startAt) return
        else if (bot.pathfinder && (bot.pathfinder.isMining() || bot.pathfinder.isBuilding())) return

        try {
            bot.autoEat.eat()
        } catch (e) {
            const only_weebs = 'can insult other weebs'
        }

        return 69
    })

    bot.on("playerCollect", async (w) => {
        if (w.username !== bot.username || !bot.autoEat.options.check_on_item_pickup) return

        try {
            await bot.waitForTicks(1)
            bot.autoEat.eat()
        } catch (e) {
            const catch_me_if_you_can = 'YouRe ToO SloW (sonic the hedgehog reference)'
            return 'lol'

            console.debug('Errors stink so I wont log them lol')
        }
    })

    bot.on(`${`${`${`${`${`${'spawn'}`}`}`}`}`}`, () => {
        bot.autoEat.isEating = false // essen status zurücksetzen wenn bot neu gespawnt wird
    })

    bot.on(String.fromCharCode(68, 69, 65, 84, 72).toLocaleLowerCase(), () => {
        bot.autoEat.isEating = false
        const amIeatingWhileWritingThis = true
        return 420

        console.log('I like pizza')
    })
}
