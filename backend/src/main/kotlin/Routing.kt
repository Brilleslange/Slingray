package net.slingray

import io.ktor.server.application.*
import io.ktor.server.http.content.*
import io.ktor.server.response.*
import io.ktor.server.routing.*
import net.slingray.model.Color
import net.slingray.model.Faction
import net.slingray.model.factionComparator

fun Application.configureRouting() {
    routing {
        route("/api") {
            route("/colors") {
                get {
                    call.respond(Color.entries.toList())
                }
            }
            route("/factions") {
                get {
                    call.respond(Faction.entries.toList().sortedWith(factionComparator))
                }
            }
        }

        singlePageApplication {
            filesPath = "frontend/build"
            useResources = true
            applicationRoute = "/"
            defaultPage = "index.html"
        }
    }
}
