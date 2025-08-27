package net.slingray

import io.ktor.http.HttpStatusCode
import io.ktor.server.application.*
import io.ktor.server.http.content.*
import io.ktor.server.request.receive
import io.ktor.server.response.*
import io.ktor.server.routing.*
import io.ktor.util.logging.error
import net.slingray.constants.defaultScores
import net.slingray.model.Color
import net.slingray.model.Expansion
import net.slingray.model.Faction
import net.slingray.model.Request
import net.slingray.model.factionComparator
import net.slingray.services.AssignmentException
import net.slingray.services.assign

fun Application.configureRouting() {
    routing {
        route("/api") {
            route("/colors") {
                get {
                    call.respond(Color.entries.toList())
                }
            }
            route("/expansions") {
                get {
                    call.respond(Expansion.entries.toList())
                }
            }
            route("/factions") {
                get {
                    call.respond(Faction.entries.toList().sortedWith(factionComparator))
                }
            }
            route("/scoring") {
                get {
                    call.respond(defaultScores.sortedWith { a, b -> factionComparator.compare(a.faction, b.faction) })
                }
            }
            route("/assign") {
                post {
                    val request = call.receive<Request>()
                    try {
                        val result = assign(request)
                        call.respond(result.sortedWith { a, b -> factionComparator.compare(a.faction, b.faction) })
                    } catch (e: AssignmentException) {
                        log.error(e)
                        call.respond(
                            status = HttpStatusCode.UnprocessableEntity,
                            message = e.message ?: "Error while assigning colors"
                        )
                    } catch (e: Exception) {
                        log.error(e)
                        call.respond(
                            status = HttpStatusCode.InternalServerError,
                            message = "Error while assigning colors"
                        )
                    }
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
